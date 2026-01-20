import { useState, useCallback } from 'react';

import { ReactFlow, applyNodeChanges, applyEdgeChanges, addEdge, type NodeChange, type EdgeChange, type Connection, type OnConnectEnd } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { TriggerSheet } from "./TriggerSheet.tsx"

import { ActionSheet } from './ActionSheet.tsx';
import type { ActionNodeMetadata, Edge, Node_Type, NodeType } from 'common/types';
import { TimerTrigger } from '@/nodes/triggers/TimerTrigger.tsx';
import { PriceTrigger } from '@/nodes/triggers/PriceTrigger.tsx';
import { Backpack } from '@/nodes/actions/Backpack.tsx';
import { Hyperliquid } from '@/nodes/actions/Hyperliquid.tsx';
import { Lighter } from '@/nodes/actions/Lighter.tsx';
import { Button } from "./ui/button";
import { apiFetch } from "../lib/api";


export default function CreateWorkFlow() {
  const [nodes, setNodes] = useState<Node_Type[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

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
  const [showActionSheet, setShowActionSheet] = useState({
    val: false,
    startingNodeId: "",
    position: {
      x: 0,
      y: 0
    }
  });

  const onConnectEnd: OnConnectEnd = useCallback(
    (_event, connectionState) => {
      // When the user ends a connection on empty canvas, show ActionSheet.
      if (!connectionState.isValid && connectionState.fromNode && connectionState.to) {
        setShowActionSheet({
          val: true,
          startingNodeId: connectionState.fromNode.id,
          position: {
            x: connectionState.to.x / 2,
            y: connectionState.to.y / 2,
          },
        });
      }
    },
    [setShowActionSheet],
  )
  const nodeTypes = {
    "timer": TimerTrigger,
    "price": PriceTrigger,
    "backpack": Backpack,
    "hyperliquid": Hyperliquid,
    "lighter": Lighter
  }
  console.log(nodes)
  // console.log(edges)
  return (
    <div className='bg-gray-600 h-11/12 w-screen'>
      <div className="flex items-center justify-between px-4 pt-3">
        <div className="text-sm text-white/80">Workflow builder</div>
        <div className="flex items-center gap-2">
          {saveError ? <div className="text-xs text-red-200">{saveError}</div> : null}
          <Button
            size="sm"
            disabled={saving || nodes.length === 0}
            onClick={async () => {
              setSaving(true)
              setSaveError(null)
              try {
                const res = await apiFetch("/workflow", {
                  method: "POST",
                  body: JSON.stringify({ nodes, edges }),
                })
                const json = await res.json().catch(() => null)
                if (!res.ok) {
                  setSaveError(json?.message ?? "Failed to save workflow")
                  return
                }
                // Saved successfully; you can navigate to a details page once you implement it.
              } catch {
                setSaveError("Network error")
              } finally {
                setSaving(false)
              }
            }}
          >
            {saving ? "Saving…" : "Save"}
          </Button>
        </div>
      </div>
      {!nodes.length && <TriggerSheet onSelect={(kind, metadata) => {

        setNodes([...nodes, {
          id: Math.random().toString(),
          type: kind,
          data: {
            kind: "TRIGGER",
            metadata,
            label: kind.toString()
          },

          position: { x: 0, y: 0 },

        }])
      }} />}
      {
        showActionSheet.val && <ActionSheet onSelect={(id: string, kind: NodeType, actionNode: ActionNodeMetadata) => {

          setNodes([...nodes, {
            id: id,
            type: kind,
            data: {
              kind: "ACTION",
              metadata: actionNode,
              label: actionNode.toString()
            },

            position: { x: showActionSheet.position.x, y: showActionSheet.position.y },

          }])

          setEdges([...edges, {
            id: `${showActionSheet.startingNodeId}-${id}`,
            source: showActionSheet.startingNodeId,
            target: id
          }])
          setShowActionSheet((prev) => ({ ...prev, val: false }));
        }}
          onClose={() => setShowActionSheet((prev) => ({ ...prev, val: false }))}

        />
      }
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        onConnectEnd={onConnectEnd}
        fitView
      />
    </div>
  );
}