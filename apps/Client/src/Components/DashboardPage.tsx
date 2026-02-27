import { Link } from "react-router-dom";

function DashboardPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-gray-800">Welcome to Dashboard</h1>
      <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
        <Link
        to="/create-workflow"
        className="px-8 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-all duration-300 shadow-sm hover:shadow-blue-300/40"
      >
        Create a new workflow
      </Link>
      <Link
        to="/view-workflows"
        className="px-8 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-all duration-300 shadow-sm hover:shadow-blue-300/40"
      >
        View existing workflows
      </Link>
      </div>
    </div>
  );
}

export default DashboardPage;
