import { Button } from "@/components/ui/button"

import {
    Sheet,
    SheetClose,
    SheetContent,

    SheetFooter,
    SheetHeader,
    SheetTitle,

} from "@/components/ui/sheet"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {  useState } from "react"

import  {Assets, SUPPORTED_TRIGGERS, type NodeType, type PriceMetaData, type TimerMetaData} from "common/types"



type assetMetadata={
    asset:string,
    price:number
}
export const TriggerSheet = ({
    onSelect
}: {
    onSelect: (kind: NodeType, metadata: PriceMetaData|TimerMetaData) => void
}) => {
    const [selectedNode, setSetSelectedNode] = useState<NodeType>(SUPPORTED_TRIGGERS[1].id);
    const [metaData, setMetaData] = useState<PriceMetaData|TimerMetaData>({
        time:3600,
        asset:"",
        price:99
    });
    
const [asset,setAsset]=useState<assetMetadata>();

const handleAssetChange = (newAsset: assetMetadata) => {
    setAsset(newAsset);
    setMetaData(prev => {
        if ("price" in prev) {
            return {
                // ...prev,
                price: newAsset.price,
                asset: newAsset.asset
            };
        }
        return prev;
    });
};


    return (
        <Sheet open={true}> 

            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Click on the type of trigger you want</SheetTitle>

                </SheetHeader>
                <div className="grid flex-1 auto-rows-min gap-6 px-4">

                    <Select  value={selectedNode} onValueChange={(value:NodeType)=>setSetSelectedNode(value)}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select a trigger" />
                        </SelectTrigger>

                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Triggers</SelectLabel>
                                {SUPPORTED_TRIGGERS.map(({ id, title }) =>
                                    <SelectItem key={id} value={id} >{title}</SelectItem>
                                )}

                            </SelectGroup>
                        </SelectContent>
                             </Select>
                        {selectedNode==='timer' && 
                        <div className="p-1 w-full">
                           <SheetTitle>Enter Time</SheetTitle>
                            <input className="p-2 w-full" placeholder="time" type="number" onChange={(e)=>setMetaData({time:e.target.valueAsNumber})} />
                            
                        </div>
}
                        {selectedNode==='price' && 
           
                            <div>
                                <Select value={asset?.asset} onValueChange={(assetName)=>{
                                    const selectedAsset = Assets.find(a => a.asset === assetName);
                                    if (selectedAsset) {
                                        handleAssetChange({ asset: selectedAsset.asset, price: selectedAsset.price });
                                    }
                                }} >
                                {/* <Select value={asset} onValueChange={(e)=>setAsset(e)} > */}
                                    <SelectTrigger >
                                <SelectValue placeholder="Select the asset" />
                                                        </SelectTrigger>
                                  <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Assets</SelectLabel>
                                        {Assets.map(({asset})=>
                                
                                            <SelectItem key={asset} value={asset}>{asset}</SelectItem>
                                     )}
                                        </SelectGroup>
                                    </SelectContent>
                                    </Select>
                                    <div className="border-2  my-2 rounded-md" >
                                        <input type="number" className="p-1 text-sm pl-3 w-full" placeholder="Enter the Price" onChange={(e)=>setMetaData((prev)=>{
                                            return {
                                           ...prev,
                                            price:e.target.valueAsNumber}
                                        })}/>
                                    </div>
                                
                            </div>
                        }

               
                </div>
                <SheetFooter>
                    <Button type="submit" onClick={() => {
                        onSelect(
                            
                            selectedNode,
                            metaData
                        )
                    }}>Create Node</Button>
                    <SheetClose asChild>
                        <Button variant="outline">Close</Button>
                    </SheetClose>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}
