
import React, { memo } from 'react';
import { Handle, Position } from '@xyflow/react';
import { GitBranch, MoreVertical } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const ConditionalNode = memo(({ data }: { data: any }) => {
  const isExecuting = data.isExecuting;
  const isCompleted = data.isCompleted;

  return (
    <Card className={`p-4 min-w-[240px] transition-all duration-300 border-2 ${
      isExecuting 
        ? 'border-yellow-500 shadow-lg shadow-yellow-200 animate-pulse' 
        : isCompleted
        ? 'border-yellow-500 shadow-lg shadow-yellow-200'
        : 'border-yellow-200 hover:border-yellow-300 hover:shadow-md'
    }`}>
      <Handle
        type="target"
        position={Position.Left}
        className="w-3 h-3 border-2 border-yellow-300 bg-white hover:bg-yellow-100 transition-colors"
      />
      
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-yellow-500 transition-transform hover:scale-110">
            <GitBranch className="w-4 h-4 text-white" />
          </div>
          <Badge variant="secondary" className="text-xs bg-yellow-100 text-yellow-700">
            Conditional
          </Badge>
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
        
        <div className="flex gap-2 text-xs">
          <span className="px-2 py-1 bg-green-100 text-green-700 rounded">Yes</span>
          <span className="px-2 py-1 bg-red-100 text-red-700 rounded">No</span>
        </div>
        
        {isExecuting && (
          <div className="text-xs text-yellow-600 font-medium animate-pulse flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-yellow-500 animate-bounce"></div>
            Evaluating condition...
          </div>
        )}
        
        {isCompleted && (
          <div className="text-xs text-yellow-600 font-medium">
            ✓ Condition evaluated
          </div>
        )}
      </div>
      
      {/* Multiple output handles for Yes/No paths */}
      <Handle
        type="source"
        position={Position.Right}
        id="yes"
        style={{ top: '40%' }}
        className="w-3 h-3 border-2 border-green-300 bg-white hover:bg-green-100 transition-colors"
      />
      <Handle
        type="source"
        position={Position.Right}
        id="no"
        style={{ top: '60%' }}
        className="w-3 h-3 border-2 border-red-300 bg-white hover:bg-red-100 transition-colors"
      />
    </Card>
  );
});

ConditionalNode.displayName = 'ConditionalNode';

export default ConditionalNode;
