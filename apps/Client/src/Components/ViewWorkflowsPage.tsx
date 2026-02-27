import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Workflow {
  _id: string;
  name: string;
  nodes: any[];
  edges: any[];
}

export default function ViewWorkflowsPage() {
  const [workflows, setWorkflows] = useState<Workflow[]>([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchWorkflows() {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/workflow/allworkflows",
          { withCredentials: true },
        );
        setWorkflows(response.data.workflows);
      } catch (err) {
        console.error("Failed to load workflows:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchWorkflows();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <p className="text-lg text-gray-600 animate-pulse">
          Loading workflows...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6 sm:p-10">
      <div className="flex flex-col sm:flex-row justify-between items-center sm:items-center mb-8 gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
          Your Workflows
        </h1>

        <button
          onClick={() => navigate("/create-workflow")}
          className="bg-blue-600 text-white px-5 py-2 rounded-lg shadow-sm hover:bg-blue-700 hover:shadow-md transition duration-200"
        >
          Create New
        </button>
      </div>

      {workflows.length === 0 ? (
        <div className="text-center text-gray-500 mt-20">
          No workflows found. Click "Create New" to get started!
        </div>
      ) : (
        <div className="space-y-5">
          {workflows.map((wf) => (
            <div
              key={wf._id}
              className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition duration-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-5"
            >
              <div className="space-y-1">
                <h2 className="font-semibold text-lg break-all text-gray-800">
                  Workflow:
                  <span className="block sm:inline text-sm text-blue-500 ml-1">
                    {wf.name}
                  </span>
                </h2>

                <p className="text-gray-500 text-sm">
                  {wf.nodes.length} Nodes • {wf.edges.length} Edges
                </p>
              </div>

              <div className="flex gap-3 w-full sm:w-auto">
                <button
                    onClick={() => navigate(`/workflow/${wf._id}`)}
                  className="flex-1 sm:flex-none px-4 py-2 border rounded-md hover:bg-gray-100 transition"
                >
                  Open
                </button>

                <button className="flex-1 sm:flex-none px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 transition">
                  Executions
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
