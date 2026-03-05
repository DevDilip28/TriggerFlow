import { CreateWorkflowSchema, UpdateWorkflowSchema } from "@triggerflow/common";
import {  ExecutionModel, NodeModel, WorkflowModel } from "@triggerflow/db";
import { Request, Response } from "express";

export const createWorkflow = async (req: Request, res: Response) => {
    const userId = req.userId!;

    const { success, data } = CreateWorkflowSchema.safeParse(req.body);

    if (!success) {
        return res.status(400).json({
            message: "Invalid workflow data"
        });
    }

    try {
        const workflow = await WorkflowModel.create({
            userId,
            name: data.name,
            nodes: data.nodes,
            edges: data.edges
        });

        res.json({
            id: workflow._id
        });
    } catch (e) {
        res.status(500).json({
            message: "Failed to create workflow"
        });
    }
};

export const updateWorkflow = async (req: Request, res: Response) => {
    const userId = req.userId!;

    const { success, data } = UpdateWorkflowSchema.safeParse(req.body);

    if (!success) {
        return res.status(400).json({
            message: "Invalid workflow data"
        });
    }

    try {
        const workflow = await WorkflowModel.findOneAndUpdate(
            {
                _id: req.params.workflowId,
                userId
            },
            {
                name: data.name,
                nodes: data.nodes,
                edges: data.edges
            },
            { new: true }
        );

        if (!workflow) {
            return res.status(404).json({
                message: "Workflow not found"
            });
        }

        res.json({
            id: workflow._id
        });
    } catch (e) {
        res.status(500).json({
            message: "Failed to update workflow"
        });
    }
};

export const getWorkflow = async (req: Request, res: Response) => {
    const workflow = await WorkflowModel.findOne({
        _id: req.params.workflowId,
        userId: req.userId
    });

    if (!workflow) {
        return res.status(404).json({ message: "Workflow not found" });
    }

    res.json(workflow);
};

export const getWorkflowExecutions = async (req: Request, res: Response) => {
    const execution = await ExecutionModel
        .findOne({
            workflowId: req.params.workflowId,
            userId: req.userId
        })
        .sort({ startTime: -1 }); // latest first

    if (!execution) {
        return res.json({ status: "Pending" });
    }

    res.json({ status: execution.status });
};

export const getAvailableNodes = async (req: Request, res: Response) => {
    const nodes = await NodeModel.find();

    res.json({
        nodes
    });
};

export const getAllWorkflows = async (req: Request, res: Response) => {
    const workflows = await WorkflowModel.find({
        userId: req.userId
    });

    res.json({
        workflows
    });
};

export const deleteWorkflow = async (req: Request, res: Response) => {
    const workflowId = req.params.workflowId;
    const userId = req.userId;

    try {
        const workflow = await WorkflowModel.findOneAndDelete({
            _id: workflowId,
            userId
        });

        if (!workflow) {
            return res.status(404).json({
                message: "Workflow not found"
            });
        }

        res.json({
            message: "Workflow deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to delete workflow"
        });
    }
};
