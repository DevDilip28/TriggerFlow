import { Router } from "express";
import { authMiddleware } from "../middleware";
import { createWorkflow, getAllWorkflows, getAvailableNodes, getWorkflow, getWorkflowExecutions, updateWorkflow } from "../controllers/workflow.controller";

const workflowRoutes = Router();

workflowRoutes.post("/", authMiddleware, createWorkflow);

workflowRoutes.get("/allWorkflows", authMiddleware, getAllWorkflows);
workflowRoutes.get("/:workflowId", authMiddleware, getWorkflow);

workflowRoutes.put("/:workflowId", authMiddleware, updateWorkflow);

workflowRoutes.get("/execution/:workflowId", authMiddleware, getWorkflowExecutions);
workflowRoutes.get("/node", authMiddleware, getAvailableNodes);

export default workflowRoutes;
