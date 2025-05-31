import React, { useCallback, useState, useRef, useEffect } from 'react';
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Edge,
  Node,
  BackgroundVariant,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { Play, Square, Save, Download, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Sidebar from '@/components/Sidebar';
import WorkflowNode from '@/components/WorkflowNode';
import ConditionalNode from '@/components/ConditionalNode';
import TriggerNode from '@/components/TriggerNode';
import ActionNode from '@/components/ActionNode';
import { initialNodes, initialEdges } from '@/data/workflow-data';
import SimulationOverlay from '@/components/SimulationOverlay';
import BlockOptionsModal from '@/components/BlockOptionsModal';
import CostTracker from '@/components/CostTracker';
import ClientView from '@/components/ClientView';

const nodeTypes = {
  workflow: WorkflowNode,
  conditional: ConditionalNode,
  trigger: TriggerNode,
  action: ActionNode,
};

type ViewMode = 'owner' | 'client';
type WorkflowMode = 'freelancer-to-client' | 'client-managing-freelancers';

const Index = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationProgress, setSimulationProgress] = useState<string[]>([]);
  const [selectedNode, setSelectedNode] = useState<any>(null);
  const [showOptionsModal, setShowOptionsModal] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>('owner');
  const [workflowMode, setWorkflowMode] = useState<WorkflowMode>('freelancer-to-client');
  const [isFreelancerCreated, setIsFreelancerCreated] = useState(false);
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  const onConnect = useCallback(
    (params: Edge | Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      const type = event.dataTransfer.getData('application/reactflow');
      const label = event.dataTransfer.getData('application/reactflow-label');
      const nodeData = event.dataTransfer.getData('application/reactflow-data');

      if (typeof type === 'undefined' || !type) {
        return;
      }

      const position = reactFlowInstance?.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const newNode: Node = {
        id: `${type}-${Date.now()}`,
        type,
        position: position || { x: 0, y: 0 },
        data: { 
          label,
          ...JSON.parse(nodeData || '{}')
        },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance, setNodes]
  );

  const simulateWorkflow = async () => {
    setIsSimulating(true);
    setSimulationProgress([]);
    
    // Find trigger nodes to start simulation
    const triggerNodes = nodes.filter(node => node.type === 'trigger');
    
    for (const triggerNode of triggerNodes) {
      await simulateFromNode(triggerNode.id);
    }
    
    setTimeout(() => {
      setIsSimulating(false);
      setSimulationProgress([]);
    }, 1000);
  };

  const simulateFromNode = async (nodeId: string): Promise<void> => {
    return new Promise((resolve) => {
      setSimulationProgress(prev => [...prev, nodeId]);
      
      // Highlight current node
      setNodes(prevNodes => 
        prevNodes.map(node => ({
          ...node,
          data: {
            ...node.data,
            isExecuting: node.id === nodeId
          }
        }))
      );

      setTimeout(() => {
        // Find connected edges and continue simulation
        const connectedEdges = edges.filter(edge => edge.source === nodeId);
        
        setNodes(prevNodes => 
          prevNodes.map(node => ({
            ...node,
            data: {
              ...node.data,
              isExecuting: false,
              isCompleted: node.id === nodeId ? true : node.data.isCompleted
            }
          }))
        );

        // Continue with connected nodes
        if (connectedEdges.length > 0) {
          Promise.all(
            connectedEdges.map(edge => simulateFromNode(edge.target))
          ).then(() => resolve());
        } else {
          resolve();
        }
      }, 1500);
    });
  };

  const stopSimulation = () => {
    setIsSimulating(false);
    setSimulationProgress([]);
    setNodes(prevNodes => 
      prevNodes.map(node => ({
        ...node,
        data: {
          ...node.data,
          isExecuting: false,
          isCompleted: false
        }
      }))
    );
  };

  const onNodeClick = useCallback((event: React.MouseEvent, node: any) => {
    setSelectedNode(node);
    setShowOptionsModal(true);
  }, []);

  const handleSaveNodeOptions = (nodeId: string, options: any) => {
    setNodes(prevNodes => 
      prevNodes.map(node => 
        node.id === nodeId 
          ? { ...node, data: { ...node.data, options } }
          : node
      )
    );
  };

  // Determine if fees should be applied
  const shouldApplyFees = workflowMode === 'freelancer-to-client';

  if (viewMode === 'client') {
    return (
      <ClientView 
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        isFreelancerCreated={isFreelancerCreated}
        shouldApplyFees={shouldApplyFees}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex">
      <Sidebar />
      
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white/80 backdrop-blur-sm border-b border-purple-100 p-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Freelancer Workflow Automation
            </h1>
            <Badge variant="secondary" className="bg-purple-100 text-purple-700">
              Visual Editor
            </Badge>
            <div className="flex gap-2">
              <Button 
                variant={viewMode === 'owner' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('owner')}
              >
                Owner View
              </Button>
              <Button 
                variant={viewMode === 'client' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('client')}
              >
                Client Preview
              </Button>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 px-3 py-1 rounded-lg bg-white/50">
              <span className="text-sm text-gray-600">Workflow Mode:</span>
              <select 
                value={workflowMode} 
                onChange={(e) => setWorkflowMode(e.target.value as WorkflowMode)}
                className="text-sm bg-transparent border-none focus:outline-none"
              >
                <option value="freelancer-to-client">Freelancer → Client</option>
                <option value="client-managing-freelancers">Client Managing Freelancers</option>
              </select>
            </div>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setIsFreelancerCreated(!isFreelancerCreated)}
              className="border-purple-200 hover:bg-purple-50"
            >
              {isFreelancerCreated ? 'Freelancer Mode' : 'Client Mode'}
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              className="border-purple-200 hover:bg-purple-50"
            >
              <Save className="w-4 h-4 mr-1" />
              Save
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              className="border-purple-200 hover:bg-purple-50"
            >
              <Download className="w-4 h-4 mr-1" />
              Export
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              className="border-purple-200 hover:bg-purple-50"
            >
              <Upload className="w-4 h-4 mr-1" />
              Import
            </Button>
            <div className="flex items-center gap-2 px-3 py-1 rounded-lg bg-white/50">
              <span className="text-sm text-gray-600">Simulation:</span>
              <Switch
                checked={isSimulating}
                onCheckedChange={(checked) => {
                  if (checked) {
                    simulateWorkflow();
                  } else {
                    stopSimulation();
                  }
                }}
                className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-purple-600 data-[state=checked]:to-blue-600"
              />
            </div>
          </div>
        </div>

        <div className="flex-1 flex">
          {/* Workflow Canvas */}
          <div className="flex-1 relative" ref={reactFlowWrapper}>
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              onInit={setReactFlowInstance}
              onDrop={onDrop}
              onDragOver={onDragOver}
              onNodeClick={onNodeClick}
              nodeTypes={nodeTypes}
              fitView
              className="bg-transparent"
              connectionLineStyle={{
                stroke: '#8b5cf6',
                strokeWidth: 2,
                strokeDasharray: '5,5',
              }}
              defaultEdgeOptions={{
                animated: true,
                style: {
                  stroke: '#8b5cf6',
                  strokeWidth: 2,
                },
              }}
            >
              <Controls 
                className="!bg-white/80 !backdrop-blur-sm !border-purple-200 !shadow-lg"
              />
              <MiniMap 
                className="!bg-white/80 !backdrop-blur-sm !border-purple-200 !shadow-lg"
                nodeColor={(node) => {
                  switch (node.type) {
                    case 'trigger': return '#10b981';
                    case 'action': return '#3b82f6';
                    case 'conditional': return '#f59e0b';
                    default: return '#8b5cf6';
                  }
                }}
              />
              <Background 
                variant={BackgroundVariant.Dots} 
                gap={20} 
                size={1}
                className="opacity-30"
                color="#8b5cf6"
              />
            </ReactFlow>

            {isSimulating && (
              <SimulationOverlay 
                progress={simulationProgress}
                totalNodes={nodes.length}
              />
            )}
          </div>

          {/* Cost Tracker Sidebar */}
          <div className="w-80 bg-white/80 backdrop-blur-sm border-l border-purple-100 p-4">
            <CostTracker 
              nodes={nodes} 
              revisionCost={0} 
              shouldApplyFees={shouldApplyFees}
              workflowMode={workflowMode}
            />
            
            <div className="mt-6">
              <h3 className="font-medium text-gray-800 mb-3">Workflow Summary</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Blocks:</span>
                  <span>{nodes.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Connections:</span>
                  <span>{edges.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Mode:</span>
                  <Badge variant="outline" className="text-xs">
                    {isFreelancerCreated ? 'Freelancer' : 'Client'}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Workflow Type:</span>
                  <Badge variant="outline" className="text-xs">
                    {workflowMode === 'freelancer-to-client' ? 'F→C' : 'C→F'}
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </div>

        <BlockOptionsModal
          isOpen={showOptionsModal}
          onClose={() => setShowOptionsModal(false)}
          node={selectedNode}
          onSave={handleSaveNodeOptions}
        />
      </div>
    </div>
  );
};

export default Index;
