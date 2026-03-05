import { WorkflowModel } from "@triggerflow/db";
import { handleTimeTrigger } from "./triggers/time.js";
import { handlePriceTrigger } from "./triggers/price.js";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

async function main() {
    await mongoose.connect(process.env.MONGO_URI!);

    while (true) {
        const workflows = await WorkflowModel.find({});

        workflows.map(async workflow => {

            const triggerNode = workflow.nodes.find(x => x.data?.kind === "Trigger");

            if (!triggerNode) {
                return;
            };

            switch (triggerNode?.type) {
                case "time-trigger":
                    await handleTimeTrigger(workflow, triggerNode);
                    break;

                case "price-trigger":
                    await handlePriceTrigger(workflow, triggerNode);
                    break;
            }
        })
        // before checking for workflows again n again, wait 1 sec 
        await new Promise(resolve => setTimeout(resolve, 1000));
    }
}

main();