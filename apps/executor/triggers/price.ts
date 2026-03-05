import axios from "axios";
import { ExecutionModel } from "@triggerflow/db";
import { execute } from "../execute";

export async function handlePriceTrigger(workflow: any, triggerNode: any) {
    const asset = triggerNode.data?.metadata?.asset;
    const userPrice = Number(triggerNode.data?.metadata?.price);

    if (!asset) throw new Error("Asset missing");

    const symbol = asset.replace("_USDC", "USDT");

    const execution = await ExecutionModel.findOne({
        workflowId: workflow._id,
    })

    if (execution) {
        return;
    }

    const response = await axios.get(
        "https://api.binance.com/api/v3/ticker/price",
        { params: { symbol } }
    );

    const latestPrice = Number(response.data.price);

    if (latestPrice >= userPrice) {

        const newExecution = new ExecutionModel({
            workflowId: workflow._id,
            userId: workflow.userId,
            status: "Pending",
        });

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
