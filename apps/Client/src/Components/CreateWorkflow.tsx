import { useState, useCallback } from "react";
import {
  ReactFlow,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  Background,
  BackgroundVariant 
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { TriggerSheet } from "./TriggerSheet";
import { ActionSheet } from "./ActionSheet";
import ExecuteTrade from "@/nodes/actions/ExecuteTrade";
import {
  type SendEmailNodeMetadata,
  type ExecuteTradeNodeMetadata,
  type TimerNodeMetadata,
  type PriceNodeMetadata,
  type tradeCredential,
} from "@triggerflow/common";
import { Timer } from "@/nodes/triggers/TimeTrigger";
import { Price } from "@/nodes/triggers/PriceTrigger";
import SendEmail from "@/nodes/actions/SendEmail";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const nodeTypes = {
  "time-trigger": Timer,
  "price-trigger": Price,
  "execute-trade": ExecuteTrade,
  "send-email": SendEmail,
};

export type NodeKind =
  | "price-trigger"
  | "time-trigger"
  | "send-email"
  | "execute-trade";

export type NodeMetadata =
  | TimerNodeMetadata
  | PriceNodeMetadata
  | ExecuteTradeNodeMetadata
  | SendEmailNodeMetadata;

interface NodeType {
  id: string;
  position: { x: number; y: number };
  type: NodeKind;
  data: {
    kind: "Trigger" | "Action";
    metadata: NodeMetadata;
    credential: tradeCredential | null;
  };
}

interface EdgeType {
  id: string;
  source: string;
  target: string;
}

export default function CreateWorkflow() {
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const [workflowName, setWorkflowName] = useState("");
  const [saving, setSaving] = useState(false);

  const [nodes, setNodes] = useState<NodeType[]>([]);
  const [edges, setEdges] = useState<EdgeType[]>([]);
  const [selectActionOpen, setSelectActionOpen] = useState<{
    position: {
      x: number;
      y: number;
    };
    startingNodeId: string;
  } | null>(null);

  const onNodesChange = useCallback(
    (changes: any) =>
      setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)),
    [],
  );

  const onEdgesChange = useCallback(
    (changes: any) =>
      setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
    [],
  );

  const onConnect = useCallback(
    (params: any) =>
      setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot)),
    [],
  );

  const POSSITION_OFFSET = 40;

  const onConnectEnd = useCallback((_params: any, connectInfo: any) => {
    if (!connectInfo.isValid) {
      setSelectActionOpen({
        position: {
          x: connectInfo.from.x + POSSITION_OFFSET,
          y: connectInfo.from.y + POSSITION_OFFSET,
        },
        startingNodeId: connectInfo.fromNode.id,
      });
    }
  }, []);

  const payload = {
    nodes: nodes.map((node) => ({
      id: node.id,
      type: node.type,
      position: node.position,
      // nodeId: crypto.randomUUID(),
      data: {
        kind: node.data.kind,
        metadata: node.data.metadata,
        credential: node.data.credential,
      },
    })),
    edges: edges.map((edge) => ({
      id: edge.id,
      source: edge.source,
      target: edge.target,
    })),
  };

  async function publishWorkflow() {
    try {
      setSaving(true);

      const res = await axios.post(
        "https://triggerflow-production.up.railway.app/api/workflow/",
        { name: workflowName, ...payload },
        { withCredentials: true },
      );

      const workflowId = res.data.id;
      navigate(`/workflow/${workflowId}`);
    } catch (err) {
      console.error("Failed to create workflow");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      {!nodes.length && (
        <TriggerSheet
          onSelect={(type, metadata, credential) => {
            setNodes([
              {
                id: crypto.randomUUID(),
                position: { x: 0, y: 0 },
                type,
                data: {
                  kind: "Trigger",
                  metadata,
                  credential,
                },
              },
            ]);
          }}
        />
      )}
      {selectActionOpen && (
        <ActionSheet
          onSelect={(type, metadata, credential) => {
            const nodeId = crypto.randomUUID();
            setNodes([
              ...nodes,
              {
                id: nodeId,
                position: selectActionOpen.position,
                type,
                data: {
                  kind: "Action",
                  metadata,
                  credential,
                },
              },
            ]);
            setEdges([
              ...edges,
              {
                id: crypto.randomUUID(),
                source: selectActionOpen.startingNodeId,
                target: nodeId,
              },
            ]);
            setSelectActionOpen(null);
          }}
        />
      )}

      <ReactFlow
        nodeTypes={nodeTypes}
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onConnectEnd={onConnectEnd}
        minZoom={0.3}
        maxZoom={1.5}
        fitView
        fitViewOptions={{ padding: 0.2 }}
        panOnScroll
        zoomOnPinch
      >
        <Background variant={BackgroundVariant.Dots} gap={10} size={1} />

        <button
          className="bg-blue-600 text-white px-5 py-2 rounded-lg shadow-sm hover:bg-blue-700 hover:shadow-md transition duration-200"
          style={{
            position: "absolute",
            top: 20,
            right: 20,
            zIndex: 1000,
          }}
          onClick={() => setShowModal(true)}
        >
          Publish
        </button>
      </ReactFlow>
      {showModal && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-[2000]">
          <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md space-y-4">
            <h2 className="text-lg font-semibold">Enter workflow name</h2>

            <input
              value={workflowName}
              onChange={(e) => setWorkflowName(e.target.value)}
              placeholder="My Trading Workflow"
              className="w-full border rounded-lg px-4 py-2"
            />

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 border rounded-lg"
              >
                Cancel
              </button>

              <button
                disabled={!workflowName || saving}
                onClick={publishWorkflow}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg"
              >
                {saving ? "Publishing..." : "Publish"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
