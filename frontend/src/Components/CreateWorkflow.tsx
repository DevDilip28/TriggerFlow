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
import { Timer, type TimerNodeMetadata } from "@/nodes/triggers/TimeTrigger";
import { Price, type PriceNodeMetadata } from "@/nodes/triggers/PriceTrigger";
import { ActionSheet } from "./ActionSheet";
import type { ExecuteTradeNodeMetadata } from "@/nodes/actions/ExecuteTrade";
import ExecuteTrade from "@/nodes/actions/ExecuteTrade";

const nodeTypes = {
  "time-trigger": Timer,
  "price-trigger": Price,
  "execute-trade": ExecuteTrade,
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
  | ExecuteTradeNodeMetadata;

interface NodeType {
  id: string;
  position: { x: number; y: number };
  type: NodeKind;
  data: {
    kind: "trigger" | "condition" | "action";
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
        fitView
      >
        <Background variant="dots" gap={10} size={1} />
      </ReactFlow>
    </div>
  );
}
