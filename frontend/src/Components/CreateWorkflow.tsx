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
import { Timer } from "@/nodes/triggers/TimeTrigger";
import { Price } from "@/nodes/triggers/PriceTrigger";

const nodeTypes = {
  "time-trigger": Timer,
  "price-trigger": Price,
};

export type NodeKind =
  | "price-trigger"
  | "time-trigger"
  | "send-whatsapp"
  | "send-email"
  | "execute-trade";

export type NodeMetadata = any;

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

  const onNodesChange = useCallback(
    (changes: any) =>
      setNodes((nodesSnapshot) =>
        applyNodeChanges(changes, nodesSnapshot)
      ),
    []
  );

  const onEdgesChange = useCallback(
    (changes: any) =>
      setEdges((edgesSnapshot) =>
        applyEdgeChanges(changes, edgesSnapshot)
      ),
    []
  );

  const onConnect = useCallback(
    (params: any) =>
      setEdges((edgesSnapshot) =>
        addEdge(params, edgesSnapshot)
      ),
    []
  );

  const onConnectEnd = useCallback(
    (params, connectinfo) => {
      if (connectinfo.isValid) {
        console.log(connectinfo.fromNode.id);
        console.log(connectinfo.fromNode.to);
      }
    },
    []
  )

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
