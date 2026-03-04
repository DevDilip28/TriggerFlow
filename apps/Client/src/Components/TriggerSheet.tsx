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

import type { NodeKind, NodeMetadata } from "./CreateWorkflow";
import { useState } from "react";
import {
  type TimerNodeMetadata,
  type PriceNodeMetadata,
  type tradeCredential,
} from "@triggerflow/common";
import { Input } from "./ui/input";

const SUPPORTED_TRIGGERS = [
  {
    id: "time-trigger",
    title: "Time Trigger",
    description: "Run the workflow after a fixed time interval",
  },
  {
    id: "price-trigger",
    title: "Price Trigger",
    description: "Run the workflow when an asset price crosses a threshold",
  },
];

export const SUPPORTED_ASSETS = ["BTC_USDC", "ETH_USDC", "SOL_USDC"] as const;

type TriggerKind = "time-trigger" | "price-trigger";

export const TriggerSheet = ({
  onSelect,
}: {
  onSelect: (
    kind: NodeKind,
    metadata: NodeMetadata,
    credential: tradeCredential,
  ) => void;
}) => {
  const [metadata, setMetadata] = useState<
    TimerNodeMetadata | PriceNodeMetadata
  >({ time: 60, asset: "BTC_USDC", price: 60000 });
  const [selectedTrigger, setSelectedTrigger] = useState<
    TriggerKind | undefined
  >(undefined);

  return (
    <Sheet open={true}>
      <SheetContent side="right" className="w-[300px] p-2">
        <SheetHeader className="space-y-2">
          <SheetTitle className="text-lg font-semibold">
            Select Trigger
          </SheetTitle>
          <SheetDescription className="text-sm text-muted-foreground">
            Choose how this workflow should start
          </SheetDescription>
        </SheetHeader>
        <Select
          value={selectedTrigger}
          onValueChange={(Value) => setSelectedTrigger(Value)}
        >
          <SelectTrigger className="w-full mt-2 space-x-2">
            <SelectValue placeholder="Select a trigger" />
          </SelectTrigger>

          <SelectContent position="popper">
            <SelectGroup>
              {SUPPORTED_TRIGGERS.map(({ id, title }) => (
                <>
                  <SelectItem key={id} value={id}>
                    {" "}
                    {title}{" "}
                  </SelectItem>
                </>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        {selectedTrigger === "time-trigger" && (
          <div>
            Time (in seconds):
            <Input
              className="w-full mt-2 space-x-2"
              value={metadata.time}
              onChange={(e) =>
                setMetadata((m) => ({
                  ...m,
                  time: Number(e.target.value),
                }))
              }
            ></Input>
            <label className="block mt-2">
              After how many seconds should the workflow start?
            </label>
          </div>
        )}
        {selectedTrigger === "price-trigger" && (
          <div>
            Asset:
            <Select
              value={metadata.asset}
              onValueChange={(Value) =>
                setMetadata((metadata) => ({
                  ...metadata,
                  asset: Value,
                }))
              }
            >
              <SelectTrigger className="w-full mt-2 space-x-2">
                <SelectValue placeholder="Select an asset" />
              </SelectTrigger>
              <SelectContent position="popper">
                <SelectGroup>
                  {SUPPORTED_ASSETS.map((id) => (
                    <>
                      <SelectItem key={id} value={id}>
                        {" "}
                        {id}{" "}
                      </SelectItem>
                    </>
                  ))}
                </SelectGroup>
              </SelectContent>
              Price:
              <Input
                className="w-full mt-2 space-x-2"
                type="number"
                placeholder="60,000"
                onChange={(e) =>
                  setMetadata((m) => ({
                    ...m,
                    price: Number(e.target.value),
                  }))
                }
              ></Input>
              <label className="block mt-2">
                At what price do you want to start the workflow?
              </label>
            </Select>
          </div>
        )}
        <SheetFooter className="mt-4">
          <Button
            className="w-full"
            onClick={() => {
              onSelect(selectedTrigger as TriggerKind, metadata);
            }}
            type="submit"
            disabled={!selectedTrigger}
          >
            Create Trigger
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
