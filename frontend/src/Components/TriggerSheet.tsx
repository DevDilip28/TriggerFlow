import { Button } from "@/Components/ui/button"
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/Components/ui/sheet"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select"

import type { NodeKind, NodeMetadata } from "./CreateWorkflow"
import { useState } from "react"
import { Value } from "@radix-ui/react-select"
import type { TimerNodeMetadata } from "@/nodes/triggers/TimeTrigger"
import type { PriceNodeMetadata } from "@/nodes/triggers/PriceTrigger"
import { Input } from "./ui/input"

const SUPPORTED_TRIGGERS = [{
    id: "time-trigger",
    title: "Time Trigger",
    description: "Run the workflow after a fixed time interval",
},
{
    id: "price-trigger",
    title: "Price Trigger",
    description: "Run the workflow when an asset price crosses a threshold",
}];

export const SUPPORTED_ASSETS = ["BTC", "ETH", "SOL", "USDC"];

type TriggerKind = "time-trigger" | "price-trigger";

export const TriggerSheet = ({
    onSelect,
}: {
    onSelect: (kind: NodeKind, metadata: NodeMetadata) => void;
}) => {
    const [metadata, setMetadata] = useState<TimerNodeMetadata | PriceNodeMetadata>({ time: 3600, asset: "BTC", price: 0 });
    const [selectedTrigger, setSelectedTrigger] = useState<TriggerKind | undefined>(undefined);

    return <Sheet open={true}>
        <SheetContent side="right" className="w-[300px] p-2">
            <SheetHeader className="space-y-2">
                <SheetTitle className="text-lg font-semibold">
                    Select Trigger
                </SheetTitle>
                <SheetDescription className="text-sm text-muted-foreground">
                    Choose how this workflow should start
                </SheetDescription>
            </SheetHeader>
            <Select value={selectedTrigger} onValueChange={(Value) => setSelectedTrigger(Value)}>
                <SelectTrigger className="w-full mt-2 space-x-2">
                    <SelectValue placeholder="Select a trigger" />
                </SelectTrigger>

                <SelectContent position="popper">
                    <SelectGroup>
                        {SUPPORTED_TRIGGERS.map(({ id, title }) => <>
                            <SelectItem key={id} value={id}> {title} </SelectItem>
                        </>)}
                    </SelectGroup>
                </SelectContent>
            </Select>
            {selectedTrigger === "time-trigger" && <div>
                Time (in seconds):
                <Input className="w-full mt-2 space-x-2" value={metadata.time} onChange={(e) => setMetadata((m) => ({
                    ...m,
                    time: Number(e.target.value)
                }))}></Input>
            </div>}
            {selectedTrigger === "price-trigger" && <div>
                Asset:
                <Select value={metadata.asset} onValueChange={(Value) => setMetadata(metadata => ({
                    ...metadata,
                    asset: Value
                }))}>
                    <SelectTrigger className="w-full mt-2 space-x-2">
                        <SelectValue placeholder="Select an asset" />
                    </SelectTrigger>

                    <SelectContent position="popper">
                        <SelectGroup>
                            {SUPPORTED_ASSETS.map((id) => <>
                                <SelectItem key={id} value={id}> {id} </SelectItem>
                            </>)}
                        </SelectGroup>
                    </SelectContent>
                    Price:
                    <Input className="w-full mt-2 space-x-2" type="text" onChange={(e) => setMetadata((m) => ({
                        ...m,
                        price: Number(e.target.value),
                    }))}></Input>
                </Select>
            </div>}
            <SheetFooter className="mt-4">
                <Button className="w-full"
                    onClick={() => {
                        onSelect(
                            selectedTrigger,
                            metadata
                        )
                    }} type="submit">
                    Create Trigger
                </Button>
            </SheetFooter>
        </SheetContent>
    </Sheet>
}
