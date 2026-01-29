import { Button } from "@/Components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/Components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/Components/ui/select";
import { Input } from "@/Components/ui/input";

import { useState } from "react";
import type { NodeKind, NodeMetadata } from "./CreateWorkflow";
import { SUPPORTED_ASSETS } from "./TriggerSheet";
import { type SendWhatsappNodeMetadata, type SendEmailNodeMetadata, type ExecuteTradeNodeMetadata } from "@triggerflow/common/types";

export const SUPPORTED_ACTIONS = [
  {
    id: "execute-trade",
    title: "Execute Trade",
    description: "Execute a buy or sell trade on a selected trading platform",
  },
  {
    id: "send-email",
    title: "Send Email",
    description: "Send an email notification when the trigger fires",
  },
  {
    id: "send-whatsapp",
    title: "Send WhatsApp Message",
    description: "Send a WhatsApp message when the trigger fires",
  },
] as const;

export type ActionKind = (typeof SUPPORTED_ACTIONS)[number]["id"];

export const TRADE_PLATFORMS = ["Hyperliquid", "Backpack", "Lighter"] as const;

export const ActionSheet = ({
  onSelect,
}: {
  onSelect: (kind: NodeKind, metadata: NodeMetadata) => void;
}) => {
  const [metadata, setMetadata] = useState<
    Partial<
      ExecuteTradeNodeMetadata &
        SendEmailNodeMetadata &
        SendWhatsappNodeMetadata
    >
  >({});

  const [selectedAction, setSelectedAction] = useState<
    ActionKind | undefined
  >();

  const isExecuteTradeValid =
    metadata.platform &&
    metadata.tradeType &&
    metadata.qty &&
    metadata.qty > 0 &&
    metadata.symbol;

  const isSendEmailValid = metadata.to && metadata.subject && metadata.body;

  const isSendWhatsappValid = metadata.to && metadata.body;

  return (
    <Sheet open={true}>
      <SheetContent side="right" className="w-[300px] p-2">
        <SheetHeader className="space-y-2">
          <SheetTitle className="text-lg font-semibold">
            Select Action
          </SheetTitle>
          <SheetDescription className="text-sm text-muted-foreground">
            Choose what should happen after the trigger fires
          </SheetDescription>
        </SheetHeader>

        <Select
          value={selectedAction}
          onValueChange={(value) => setSelectedAction(value)}
        >
          <SelectTrigger className="w-full mt-2 space-x-2">
            <SelectValue placeholder="Select an action" />
          </SelectTrigger>
          <SelectContent position="popper">
            <SelectGroup>
              {SUPPORTED_ACTIONS.map(({ id, title }) => (
                <SelectItem key={id} value={id}>
                  {title}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        {selectedAction === "execute-trade" && (
          <div className="mt-4 space-y-3">
            Platform:
            <Select
              value={metadata.platform}
              onValueChange={(value) =>
                setMetadata((m) => ({ ...m, platform: value }))
              }
            >
              <SelectTrigger className="w-full mt-2">
                <SelectValue placeholder="Select platform" />
              </SelectTrigger>
              <SelectContent position="popper">
                <SelectGroup>
                  {TRADE_PLATFORMS.map((id) => (
                    <SelectItem key={id} value={id}>
                      {id}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            Trade Type:
            <Select
              value={metadata.tradeType}
              onValueChange={(value) =>
                setMetadata((m) => ({
                  ...m,
                  tradeType: value as "Buy" | "Sell",
                }))
              }
            >
              <SelectTrigger className="w-full mt-2">
                <SelectValue placeholder="Buy or Sell" />
              </SelectTrigger>
              <SelectContent position="popper">
                <SelectGroup>
                  <SelectItem value="Buy">Buy</SelectItem>
                  <SelectItem value="Sell">Sell</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            Quantity:
            <Input
              className="w-full mt-2"
              type="number"
              onChange={(e) =>
                setMetadata((m) => ({
                  ...m,
                  qty: Number(e.target.value),
                }))
              }
            />
            Asset:
            <Select
              value={metadata.symbol}
              onValueChange={(value) =>
                setMetadata((m) => ({ ...m, symbol: value }))
              }
            >
              <SelectTrigger className="w-full mt-2">
                <SelectValue placeholder="Select an asset" />
              </SelectTrigger>
              <SelectContent position="popper">
                <SelectGroup>
                  {SUPPORTED_ASSETS.map((asset) => (
                    <SelectItem key={asset} value={asset}>
                      {asset}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        )}

        {selectedAction === "send-email" && (
          <div className="mt-4 space-y-3">
            TO:
            <Input
              className="w-full mt-2"
              type="text"
              placeholder="example@gmail.com"
              onChange={(e) => {
                setMetadata((m) => ({
                  ...m,
                  to: e.target.value,
                }));
              }}
            />
            Subject:
            <Input
              className="w-full mt-2"
              type="text"
              placeholder="Subject of the email"
              onChange={(e) => {
                setMetadata((m) => ({
                  ...m,
                  subject: e.target.value,
                }));
              }}
            />
            Body:
            <Input
              className="w-full mt-2"
              type="text"
              placeholder="Type your message"
              onChange={(e) => {
                setMetadata((m) => ({
                  ...m,
                  body: e.target.value,
                }));
              }}
            />
          </div>
        )}

        {selectedAction === "send-whatsapp" && (
          <div className="mt-4 space-y-3">
            TO:
            <Input
              className="w-full mt-2"
              type="text"
              placeholder="+91XXXXXXXXXX"
              onChange={(e) => {
                setMetadata((m) => ({
                  ...m,
                  to: e.target.value,
                }));
              }}
            />
            Body:
            <Input
              className="w-full mt-2"
              type="text"
              placeholder="Type your message"
              onChange={(e) => {
                setMetadata((m) => ({
                  ...m,
                  body: e.target.value,
                }));
              }}
            />
          </div>
        )}
        <SheetFooter className="mt-4">
          <Button
            className="w-full"
            disabled={
              !selectedAction ||
              (selectedAction === "execute-trade" && !isExecuteTradeValid) ||
              (selectedAction === "send-email" && !isSendEmailValid) ||
              (selectedAction === "send-whatsapp" && !isSendWhatsappValid)
            }
            onClick={() => {
              onSelect(selectedAction as NodeKind, metadata as NodeMetadata);
            }}
          >
            Create Action
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
