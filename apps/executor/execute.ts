import { sendEmail } from "./executors/email";
import { hyperliquid } from "./executors/trade/hyperliquid";
import { lighter } from "./executors/trade/lighter";
import { sendWhatsapp } from "./executors/whatsapp";

export type NodeType = {
    id: string;
    position: { x: number; y: number };
    type: string;
    data: {
        kind: "Trigger" | "Action";
        credential?: any;
        metadata: any;
    };
}

export type EdgeType = {
    source: string;
    target: string;
}

export async function execute(nodes: NodeType[], edges: EdgeType[]) {
    const trigger = nodes.find(x => x.data.kind === "Trigger");

    if (!trigger) {
        return;
    }

    await executeRecursive(trigger?.id, nodes, edges)
}

export async function executeRecursive(sourceId: string, nodes: NodeType[], edges: EdgeType[]) {
    // starting node ke baad ke nodes ko find kero [x - 1, x -2]
    const nodesToExecute = edges
        .filter(({ source, target }) => source === sourceId)
        .map(({ target }) => target);

    // [1-3, 2-4] 
    await Promise.all(nodesToExecute.map(async (nodeId) => {
        const node = nodes.find(({ id }) => id === nodeId);

        if (!node) {
            return;
        }

        // execute the action node here
        switch (node.type) {
            case "execute-trade":
                switch (node.data.metadata.platform) {
                    case "Lighter":
                        await lighter(node.data.metadata.symbol, node.data.metadata.tradeType, node.data.metadata.qty, node.data.credential.apiKey);
                        break;

                    case "hyperliquid":
                        await hyperliquid();
                        break;
                }
            break;

            case "send-email":
                await sendEmail();
                break;

            case "send-whatsapp":
                await sendWhatsapp();
                break;
        }
    }))
    // execute the next nodes in parallel
    await Promise.all(nodesToExecute.map((id) => executeRecursive(id, nodes, edges)));
};
