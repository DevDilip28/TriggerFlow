import { BpxApiClient, Side, OrderType } from "bpx-api-client";

const ALLOWED_SYMBOLS = [
    "BTC_USDC",
    "ETH_USDC",
    "SOL_USDC",
];

export async function backpack(tradeType: string, qty: number, symbol: string, apiKey: string, apiSecret: string) {

    if (!ALLOWED_SYMBOLS.includes(symbol)) {
        throw new Error(`Unsupported symbol: ${symbol}`);
    }

    if (qty <= 0) {
        throw new Error("Quantity must be greater than 0");
    }

    if (!apiKey || !apiSecret) {
        throw new Error("Missing API credentials");
    }

    const client = new BpxApiClient({
        apiKey: apiKey,
        apiSecret: apiSecret,
        debug: false,
    });

    const side =
        tradeType === "Buy"
            ? Side.Bid
            : Side.Ask;

    const payload = {
        symbol: symbol,
        side,
        orderType: OrderType.Market,
        quantity: qty.toString(),
    };

    const response = await client.order.executeOrder(payload);

    if (response.statusCode !== 200) {
        throw new Error(response.error.message);
    }
    return response.data;
}
