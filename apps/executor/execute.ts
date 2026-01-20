import {execute as executeLighter} from "./executors/lighter";
import {execute as executeBackpack} from "./executors/backpack";
import {execute as executeHyperliquid} from "./executors/hyperliquid";
type NodeDocument = {
    id: string;
        type: "price" | "timer" | "hyperliquid" | "backpack" | "lighter";
        position?: {
            x: number;
            y: number;
        } | null | undefined;
        data?: {
            metadata?: any;
            kind?: "ACTION" | "TRIGGER" | null | undefined;
        } | null | undefined;
        credentials?: any;
        nodeId?: any;
}
type EdgeDocument ={
    source:string;
    target:string;
}

export async function execute(nodes:NodeDocument[],edges:EdgeDocument[]){
    const trigger = nodes.find(x=>x?.data?.kind === "TRIGGER");
    if(!trigger)
        return ;

    await executeRecursive(trigger?.id, nodes, edges);
}

export async function executeRecursive(sourceId: string, nodes:NodeDocument[], edges:EdgeDocument[]){
    
    const nodesToExecute = edges.filter(({source, target}) => source ===sourceId).map(({target})=>target);
    
    await Promise.all(nodesToExecute.map(async (nodeClientId)=>{
        const node=nodes.find(({id})=> id===nodeClientId);
        if(!node)
            return ;
        switch(node.type){
            case "lighter":
               await executeLighter(node?.data?.metadata.asset, node?.data?.metadata.qty,node?.data?.metadata.type,node.data?.metadata.api_key);
               break;
            case "backpack":
               await executeHyperliquid(node?.data?.metadata.asset, node?.data?.metadata.qty,node?.data?.metadata.type,node.data?.metadata.api_key);
               break;
            case "hyperliquid":
               await executeBackpack(node?.data?.metadata.asset, node?.data?.metadata.qty,node?.data?.metadata.type,node.data?.metadata.api_key);
               break;
        }
    }))
    await Promise.all(nodesToExecute.map(id => executeRecursive(id,nodes,edges)));
}