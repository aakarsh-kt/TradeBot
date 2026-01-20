import { apiFetch } from "@/lib/api";
import { Backpack } from "@/nodes/actions/Backpack";
import { Hyperliquid } from "@/nodes/actions/Hyperliquid";
import { Lighter } from "@/nodes/actions/Lighter";
import { PriceTrigger } from "@/nodes/triggers/PriceTrigger";
import { TimerTrigger } from "@/nodes/triggers/TimerTrigger";
import { addEdge, applyEdgeChanges, applyNodeChanges, ReactFlow, type Connection, type EdgeChange, type NodeChange } from "@xyflow/react";
import type { Edge, Node_Type } from "common/types";
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import '@xyflow/react/dist/style.css';

export const Workflow=()=>{
    const [nodes, setNodes] = useState<Node_Type[]>([]);
    const [edges, setEdges] = useState<Edge[]>([]);
    const navigate= useNavigate();
        const {workflowId}=useParams();
        useEffect(()=>{
          async function getWorkflow(){
              try{
                const response= await apiFetch(`/workflow/${workflowId}`,{
                    method:"GET"
                }) 

                const json = await response.json().catch(()=>null);
         
                if(json){
                        setNodes(()=>json.workflow.nodes);
                        setEdges(()=>json.workflow.edges);
                }
                else
                  navigate("/")
                   
            }catch(e){
                console.log(e);
            }
          }
          getWorkflow();
        },[workflowId])
  
        const onNodesChange = useCallback(
            (changes: NodeChange<Node_Type>[]) => setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)),
            [],
          );
          const onEdgesChange = useCallback(
            (changes: EdgeChange[]) => setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
            [],
          );
          const onConnect = useCallback(
            (params: Connection) => setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot)),
            [],
          );
            const nodeTypes = {
              "timer": TimerTrigger,
              "price": PriceTrigger,
              "backpack": Backpack,
              "hyperliquid": Hyperliquid,
              "lighter": Lighter
            }
            console.log(nodes)
    return (
        <div className="h-11/12  bg-slate-500 relative">
          <button className=" right-0  mr-10 mt-5 z-10 absolute shadow-sm bg-black rounded-md px-2 py-1 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"> Edit</button> 
            {nodes.length>0 && 
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                nodeTypes={nodeTypes}
                fitView
                className="absolute"
             />
            }
        </div>
    )
}