
import React, { memo } from 'react';
import { Handle, Position } from '@xyflow/react';
import { Settings, MoreVertical } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const WorkflowNode = memo(({ data }: { data: any }) => {
  const isExecuting = data.isExecuting;
  const isCompleted = data.isCompleted;

  return (
    <Card className={`p-4 min-w-[200px] transition-all duration-300 border-2 ${
      isExecuting 
        ? 'border-purple-500 shadow-lg shadow-purple-200 animate-pulse' 
        : isCompleted
        ? 'border-green-500 shadow-lg shadow-green-200'
        : 'border-purple-200 hover:border-purple-300 hover:shadow-md'
    }`}>
      <Handle
        type="target"
        position={Position.Left}
        className="w-3 h-3 border-2 border-purple-300 bg-white hover:bg-purple-100 transition-colors"
      />
      
      <div className="flex items-start justify-between mb-2">
        <div className={`p-2 rounded-lg ${data.color || 'bg-purple-500'} transition-transform hover:scale-110`}>
          <Settings className="w-4 h-4 text-white" />
        </div>
        <Button variant="ghost" size="sm" className="p-1 h-6 w-6">
          <MoreVertical className="w-3 h-3" />
        </Button>
      </div>
      
      <div className="space-y-2">
        <h3 className="font-medium text-sm text-gray-800">{data.label}</h3>
        {data.description && (
          <p className="text-xs text-gray-600">{data.description}</p>
        )}
        
        {isExecuting && (
          <div className="text-xs text-purple-600 font-medium animate-pulse">
            Executing...
          </div>
        )}
        
        {isCompleted && (
          <div className="text-xs text-green-600 font-medium">
            ✓ Completed
          </div>
        )}
      </div>
      
      <Handle
        type="source"
        position={Position.Right}
        className="w-3 h-3 border-2 border-purple-300 bg-white hover:bg-purple-100 transition-colors"
      />
    </Card>
  );
});

WorkflowNode.displayName = 'WorkflowNode';

export default WorkflowNode;
