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

export type NodeKind =
  | "price-trigger"
  | "time-trigger"
  | "send-whatsapp"
  | "send-email"
  | "place-order";

export type NodeMetadata = any;

interface NodeType {
  id: string;
  position: { x: number; y: number };
  data: {
    type: "trigger" | "condition" | "action";
    kind: NodeKind;
    metadata: NodeMetadata;
    label: string;
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

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      {!nodes.length && (
        <TriggerSheet
          onSelect={(kind, metadata) => {
            setNodes([
              {
                id: crypto.randomUUID(),
                position: { x: 0, y: 0 },
                data: {
                  type: "trigger",
                  kind,
                  metadata,
                  label: kind,
                },
              },
            ]);
          }}
        />
      )}

      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
      >
        <Background variant="dots" gap={10} size={1} />
      </ReactFlow>
    </div>
  );
}
