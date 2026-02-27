import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { ReactFlow, Background } from "@xyflow/react";
import ExecuteTrade from "@/nodes/actions/ExecuteTrade";
import { Timer } from "@/nodes/triggers/TimeTrigger";
import { Price } from "@/nodes/triggers/PriceTrigger";
import SendEmail from "@/nodes/actions/SendEmail";
import SendWhatsapp from "@/nodes/actions/SendWhatsapp";

import type { NodeKind, NodeMetadata } from "./CreateWorkflow";

interface NodeType {
  id: string;
  position: { x: number; y: number };
  type: NodeKind;
  data: {
    kind: "Trigger" | "Action";
    metadata: NodeMetadata;
  };
}

interface EdgeType {
  id: string;
  source: string;
  target: string;
}

const nodeTypes = {
  "time-trigger": Timer,
  "price-trigger": Price,
  "execute-trade": ExecuteTrade,
  "send-email": SendEmail,
  "send-whatsapp": SendWhatsapp,
};

export default function IdWorkflowPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [nodes, setNodes] = useState<NodeType[]>([]);
  const [edges, setEdges] = useState<EdgeType[]>([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState<string>("");

  useEffect(() => {
    async function fetchWorkflow() {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/workflow/${id}`,
          { withCredentials: true },
        );

        setNodes(res.data.nodes);
        setEdges(res.data.edges);
        setName(res.data.name);
      } catch (err) {
        console.error("Failed to fetch workflow");
      } finally {
        setLoading(false);
      }
    }

    if (id) fetchWorkflow();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <p className="text-lg text-gray-600 animate-pulse">
          Loading workflow...
        </p>
      </div>
    );
  }

  return (
    <div className="h-screen w-screen flex flex-col">
      <div className="flex justify-between items-center p-4 border-b bg-white">
        <div>
          <h1 className="text-xl font-bold text-gray-800">Workflow</h1>
          <p className="text-sm text-gray-500 break-all"> {name}</p>
        </div>

        <button
          onClick={() => navigate("/dashboard")}
          className="px-4 py-2 border rounded-md hover:bg-gray-100 transition"
        >
          Back to Dashboard
        </button>
      </div>

      <div className="flex-1">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          fitView
          nodesDraggable={false}
          nodesConnectable={false}
          elementsSelectable={false}
        >
          <Background variant="dots" gap={10} size={1} />
        </ReactFlow>
      </div>
    </div>
  );
}
