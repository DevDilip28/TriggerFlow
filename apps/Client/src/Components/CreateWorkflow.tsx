import { useState, useCallback } from "react";
import {
  ReactFlow,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  Background,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { TriggerSheet } from "./TriggerSheet";
import { ActionSheet } from "./ActionSheet";
import ExecuteTrade from "@/nodes/actions/ExecuteTrade";
import { type SendWhatsappNodeMetadata, type SendEmailNodeMetadata, type ExecuteTradeNodeMetadata, type TimerNodeMetadata, type PriceNodeMetadata } from "@triggerflow/common/types";
import { Timer } from "@/nodes/triggers/TimeTrigger";
import { Price } from "@/nodes/triggers/PriceTrigger";
import SendEmail from "@/nodes/actions/SendEmail";
import SendWhatsapp from "@/nodes/actions/SendWhatsapp";

const nodeTypes = {
  "time-trigger": Timer,
  "price-trigger": Price,
  "execute-trade": ExecuteTrade,
  "send-email": SendEmail,
  "send-whatsapp": SendWhatsapp,
};

export type NodeKind =
  | "price-trigger"
  | "time-trigger"
  | "send-whatsapp"
  | "send-email"
  | "execute-trade";

export type NodeMetadata =
  | TimerNodeMetadata
  | PriceNodeMetadata
  | ExecuteTradeNodeMetadata
  | SendEmailNodeMetadata
  | SendWhatsappNodeMetadata;

interface NodeType {
  id: string;
  position: { x: number; y: number };
  type: NodeKind;
  data: {
    kind: "trigger" | "action";
    metadata: NodeMetadata;
  };
}

interface EdgeType {
  id: string;
  source: string;
  target: string;
}

export default function CreateWorkflow() {
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
    []
  );

  const onEdgesChange = useCallback(
    (changes: any) =>
      setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
    []
  );

  const onConnect = useCallback(
    (params: any) =>
      setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot)),
    []
  );

  const POSSITION_OFFSET = 40;

  const onConnectEnd = useCallback((params, connectInfo) => {
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

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      {!nodes.length && (
        <TriggerSheet
          onSelect={(type, metadata) => {
            setNodes([
              {
                id: crypto.randomUUID(),
                position: { x: 0, y: 0 },
                type,
                data: {
                  kind: "trigger",
                  metadata,
                },
              },
            ]);
          }}
        />
      )}
      {selectActionOpen && (
        <ActionSheet
          onSelect={(type, metadata) => {
            const nodeId = Math.random().toString();
            setNodes([
              ...nodes,
              {
                id: nodeId,
                position: selectActionOpen.position,
                type,
                data: {
                  kind: "action",
                  metadata,
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
        <Background variant="dots" gap={10} size={1} />
      </ReactFlow>
    </div>
  );
}
