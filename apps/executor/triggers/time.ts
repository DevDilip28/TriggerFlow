import { ExecutionModel } from "@triggerflow/db";
import { execute } from "../execute";

export async function handleTimeTrigger(workflow: any, triggerNode: any) {
    const timeInS = triggerNode.data?.metadata.time;

    const execution = await ExecutionModel.findOne({
        workflowId: workflow._id,
    })

    if (execution) {
        return;
    }

    const now = Date.now();
    const createdAt = workflow.createdAt.getTime();

    const diff = now - createdAt;

    if (diff >= timeInS * 1000) {

        const newExecution = new ExecutionModel({
            workflowId: workflow._id,
            userId: workflow.userId,
            status: "Pending",
        })

        try {
            await execute(workflow.nodes, workflow.edges);

            newExecution.status = "Success";
            newExecution.endTime = new Date();
            await newExecution.save();

        } catch (error) {
            newExecution.status = "Failed";
            newExecution.endTime = new Date();
            await newExecution.save();
        }
    }
}
