export type PriceNodeMetadata = {
  asset: string;
  price: number;
};

export type TimerNodeMetadata = {
  time: number;
};

export type ExecuteTradeNodeMetadata = {
  platform: "Backpack";
  tradeType: "Buy" | "Sell";
  qty: number;
  symbol: string;
};

export type SendEmailNodeMetadata = {
  to: string;
  subject: string;
  body: string;
};

export type SendWhatsappNodeMetadata = {
  to: string;
  body: string;
};

export type tradeCredential = {
  apiKey?: string;
  apiSecret?: string;
}
