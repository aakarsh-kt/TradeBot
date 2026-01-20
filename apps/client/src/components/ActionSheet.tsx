
import { Sheet, SheetClose, SheetContent, SheetFooter, SheetHeader, SheetTitle } from "./ui/sheet";
import { SUPPORTED_ACTIONS } from "common/types";
import type { ActionNodeMetadata, allAssets, holdingPos, NodeType } from "common/types";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "./ui/select";
import { useState } from "react";
import { Button } from "./ui/button";

export const ActionSheet = ({ onSelect, onClose }: {
    onSelect: (id:string,kind: NodeType, selectedAction: ActionNodeMetadata) => void;
    onClose: () => void
}) => {
    
    const [kind, setKind] = useState<NodeType>(SUPPORTED_ACTIONS[0].id)
    const [selectedAction, setSelectedAction] = useState<ActionNodeMetadata>(SUPPORTED_ACTIONS[0])
    function handleSelect(pro: NodeType) {
        setKind(() => pro);
        const foundAction = SUPPORTED_ACTIONS.find((e) => e.id === pro);
        if (foundAction) {
            setSelectedAction(foundAction);
        }
    }
   
    return (
        <div>
            <Sheet open={true}>
                <SheetContent>
                    <SheetHeader>
                        <SheetTitle>Click on the type of action you want</SheetTitle>

                    </SheetHeader>
                    <div className=" px-4 flex flex-col  h-max  gap-6 ">
                        {/*make styling changes so that when I click on a dropdown, other selects gets pushed down, right now they overlap*/}
                        <div className="relative">
                            <Select value={selectedAction.id} onValueChange={(e: NodeType) => handleSelect(e)} >
                                <SelectTrigger className="w-full p-4 ">
                                    <SelectValue placeholder="Select a Action" />
                                </SelectTrigger>
                                <SelectContent position="popper" sideOffset={8}>
                                    <SelectGroup>
                                        <SelectLabel>Actions</SelectLabel>
                                        {
                                            SUPPORTED_ACTIONS.map((e) => {
                                                return (
                                                    <SelectItem value={e.id} key={e.id} >{e.service}</SelectItem>
                                                )
                                            })
                                        }
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <Select value={selectedAction.pos} onValueChange={(e: holdingPos) => {
                                setSelectedAction((prev) => ({
                                    ...prev,
                                    pos: e,
                                }))
                            }}>
                                <SelectTrigger className="w-full p-4">
                                    <SelectValue placeholder="Select type" />
                                </SelectTrigger>
                                <SelectContent position="popper" sideOffset={8}>
                                    <SelectGroup>
                                        <SelectLabel>Type</SelectLabel>
                                        <SelectItem value="long">LONG</SelectItem>
                                        <SelectItem value="short">SHORT</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="relative">
                            <Select value={selectedAction.asset} onValueChange={(e: allAssets) => {
                                setSelectedAction((prev) => ({
                                    ...prev,
                                    asset: e,
                                }))
                            }} >
                                <SelectTrigger className="w-full p-4">
                                    <SelectValue placeholder="Select symbol" />
                                </SelectTrigger>
                                <SelectContent position="popper" sideOffset={8}>
                                    <SelectGroup>
                                        <SelectLabel>Select Asset</SelectLabel>
                                        <SelectItem value="BTC">BTC</SelectItem>
                                        <SelectItem value="ETH">ETH</SelectItem>
                                        <SelectItem value="SOL">SOL</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>

                        <div>
                            <input type="number" placeholder="Qty" className="p-3" onChange={(e) => setSelectedAction(
                                (prev) => {
                                    return {
                                        ...prev,
                                        qty: e.target.valueAsNumber,
                                    }
                                }
                            )} />
                        </div>
                        <div>
                            <input type="text" placeholder="API KEY" className="p-3"  onChange={(e) => setSelectedAction(
                                (prev) => {
                                    return {
                                        ...prev,
                                        api_key: e.target.value
                                    }
                                }
                            )}/>
                        </div>

                    </div>
                    <SheetFooter>
                        <Button type="submit" onClick={() => {
                            onSelect(
                                Math.random().toString(),
                                kind,
                                selectedAction

                            )
                        }}>Create Node</Button>
                        <SheetClose asChild>
                            <Button variant="outline" onClick={() => {
                                onClose();
                            }}>Close</Button>
                        </SheetClose>
                    </SheetFooter>
                </SheetContent>
            </Sheet>
        </div>
    )
}