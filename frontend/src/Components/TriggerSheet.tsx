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

export const TriggerSheet = ({
    onSelect,
}: {
    onSelect: (kind: NodeKind, metadata: NodeMetadata) => void;
}) => {
    const [metadata, setMetadata] = useState({});
    const [selectedTrigger, setSelectedTrigger] = useState<NodeKind | undefined>(undefined);

    return <Sheet open={true}>
        <SheetContent side="right" className="w-[300px] p-3">
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
            <SheetFooter className="mt-5">
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
