
import React, { memo } from 'react';
import { Handle, Position } from '@xyflow/react';
import { Settings, MoreVertical, Play } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const ActionNode = memo(({ data }: { data: any }) => {
  const isExecuting = data.isExecuting;
  const isCompleted = data.isCompleted;

  return (
    <Card className={`p-4 min-w-[220px] transition-all duration-300 border-2 ${
      isExecuting 
        ? 'border-blue-500 shadow-lg shadow-blue-200 animate-pulse' 
        : isCompleted
        ? 'border-blue-500 shadow-lg shadow-blue-200'
        : 'border-blue-200 hover:border-blue-300 hover:shadow-md'
    }`}>
      <Handle
        type="target"
        position={Position.Left}
        className="w-3 h-3 border-2 border-blue-300 bg-white hover:bg-blue-100 transition-colors"
      />
      
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-blue-500 transition-transform hover:scale-110">
            <Play className="w-4 h-4 text-white" />
          </div>
          <Badge variant="secondary" className="text-xs bg-blue-100 text-blue-700">
            Action
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
        
        <div className="text-xs text-gray-500">
          Ready to execute
        </div>
        
        {isExecuting && (
          <div className="text-xs text-blue-600 font-medium animate-pulse flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-blue-500 animate-spin"></div>
            Executing action...
          </div>
        )}
        
        {isCompleted && (
          <div className="text-xs text-blue-600 font-medium">
            ✓ Action completed
          </div>
        )}
      </div>
      
      <Handle
        type="source"
        position={Position.Right}
        className="w-3 h-3 border-2 border-blue-300 bg-white hover:bg-blue-100 transition-colors"
      />
    </Card>
  );
});

ActionNode.displayName = 'ActionNode';

export default ActionNode;
