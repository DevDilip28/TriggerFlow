import { BrowserRouter, Route, Routes } from "react-router-dom";
import "@xyflow/react/dist/style.css";
import CreateWorkflow from "./Components/CreateWorkflow";
import { SignUpPage } from "./Components/SignUpPage";
import { LoginPage } from "./Components/LoginPage";
import { HomePage } from "./Components/HomePage";
import DashboardPage from "./Components/DashboardPage";
import ViewWorkflowsPage from "./Components/ViewWorkflowsPage";
import IdWorkflowPage from "./Components/IdWorkflowPage";

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />}></Route>

          <Route path="/signup" element={<SignUpPage />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>

          <Route path = "/dashboard" element={<DashboardPage />}></Route>

          <Route path="/create-workflow" element={<CreateWorkflow />} />
          <Route path="/view-workflows" element={<ViewWorkflowsPage />} />
          <Route path="/workflow/:id" element={<IdWorkflowPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
