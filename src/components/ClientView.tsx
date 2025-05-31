
import React, { useState } from 'react';
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  BackgroundVariant,
} from '@xyflow/react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { MessageSquare, Send, Eye, DollarSign } from 'lucide-react';
import CostTracker from './CostTracker';

interface ClientViewProps {
  nodes: any[];
  edges: any[];
  nodeTypes: any;
  isFreelancerCreated?: boolean;
  shouldApplyFees?: boolean;
}

const ClientView: React.FC<ClientViewProps> = ({ 
  nodes, 
  edges, 
  nodeTypes, 
  isFreelancerCreated = false,
  shouldApplyFees = true
}) => {
  const [revisions, setRevisions] = useState<string[]>([]);
  const [currentRevision, setCurrentRevision] = useState('');
  const revisionCost = shouldApplyFees ? revisions.length * 25 : 0; // $25 per revision only if fees apply

  const handleAddRevision = () => {
    if (currentRevision.trim()) {
      setRevisions([...revisions, currentRevision.trim()]);
      setCurrentRevision('');
    }
  };

  if (!isFreelancerCreated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center">
        <Card className="p-8 max-w-md text-center">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Owner View</h2>
          <p className="text-gray-600">You have full editing access to this workflow.</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex">
      {/* Sidebar for revisions */}
      <div className="w-80 bg-white/80 backdrop-blur-sm border-r border-purple-100 p-4 overflow-y-auto">
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <Eye className="w-5 h-5 text-purple-600" />
            <h2 className="text-lg font-semibold text-gray-800">Client Preview</h2>
          </div>
          <Badge variant="secondary" className="bg-purple-100 text-purple-700">
            Read-only
          </Badge>
        </div>

        <CostTracker 
          nodes={nodes} 
          revisionCost={revisionCost}
          shouldApplyFees={shouldApplyFees}
        />

        <div className="mt-6">
          <div className="flex items-center gap-2 mb-4">
            <MessageSquare className="w-5 h-5 text-blue-600" />
            <h3 className="font-medium text-gray-800">Request Revisions</h3>
          </div>
          
          <div className="space-y-3">
            <Textarea
              placeholder="Describe the changes you'd like to make..."
              value={currentRevision}
              onChange={(e) => setCurrentRevision(e.target.value)}
              className="min-h-[100px]"
            />
            
            <Button 
              onClick={handleAddRevision}
              disabled={!currentRevision.trim()}
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              <Send className="w-4 h-4 mr-2" />
              Add Revision Request {shouldApplyFees ? '(+$25)' : '(Free)'}
            </Button>
          </div>

          {revisions.length > 0 && (
            <div className="mt-6">
              <h4 className="font-medium text-gray-800 mb-3">Revision Requests</h4>
              <div className="space-y-2">
                {revisions.map((revision, index) => (
                  <Card key={index} className="p-3 border-blue-200">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-sm text-gray-700">{revision}</p>
                      {shouldApplyFees && (
                        <Badge variant="outline" className="text-xs">
                          <DollarSign className="w-3 h-3 mr-1" />
                          $25
                        </Badge>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Workflow canvas */}
      <div className="flex-1 flex flex-col">
        <div className="bg-white/80 backdrop-blur-sm border-b border-purple-100 p-4">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Freelancer Workflow Preview
          </h1>
          <p className="text-gray-600 mt-1">Review the proposed automation workflow</p>
        </div>

        <div className="flex-1 relative">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            nodeTypes={nodeTypes}
            fitView
            className="bg-transparent"
            nodesDraggable={false}
            nodesConnectable={false}
            elementsSelectable={false}
          >
            <Controls className="!bg-white/80 !backdrop-blur-sm !border-purple-200 !shadow-lg" />
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
        </div>
      </div>
    </div>
  );
};

export default ClientView;
