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

import type { NodeKind } from "./CreateWorkflow"
import { useState } from "react"

type NodeMetadata = any;

const SUPPORTED_TRIGGERS = [{
    id: "timer",
    title: "Timer",
    description: "run after every x second"
}, {
    id: "price-trigger",
    title: "Price Trigger",
    description: "run when the price goes above or below the number for an asset"
}]

export const TriggerSheet = ({
    onSelect,
}: {
    onSelect: (kind: NodeKind, metadata: NodeMetadata) => void;
}) => {
    const [metadata, setMetadata] = useState({});

    return <Sheet>
        <SheetTrigger asChild>
            <Button variant="outline">Open</Button>
        </SheetTrigger>
        <SheetContent>
            <SheetHeader>
                <SheetTitle>Select Trigger</SheetTitle>
                <SheetDescription>Select the trigger you want to use
                    <Select>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select a fruit" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                {SUPPORTED_TRIGGERS.map(({ id, title }) => <>
                                    <SelectItem onSelect={() => onSelect(
                                        id,
                                        metadata
                                    )} value={id}>{title}</SelectItem>
                                </>)}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </SheetDescription>
            </SheetHeader>
            <SheetFooter>
                <Button type="submit">Save changes</Button>
                <SheetClose asChild>
                    <Button variant="outline">Close</Button>
                </SheetClose>
            </SheetFooter>
        </SheetContent>
    </Sheet>
}
