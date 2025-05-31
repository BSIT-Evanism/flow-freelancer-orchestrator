
import React, { memo } from 'react';
import { Handle, Position } from '@xyflow/react';
import { Zap, MoreVertical } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const TriggerNode = memo(({ data }: { data: any }) => {
  const isExecuting = data.isExecuting;
  const isCompleted = data.isCompleted;

  return (
    <Card className={`p-4 min-w-[220px] transition-all duration-300 border-2 ${
      isExecuting 
        ? 'border-green-500 shadow-lg shadow-green-200 animate-pulse' 
        : isCompleted
        ? 'border-green-500 shadow-lg shadow-green-200'
        : 'border-green-200 hover:border-green-300 hover:shadow-md'
    }`}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-green-500 transition-transform hover:scale-110">
            <Zap className="w-4 h-4 text-white" />
          </div>
          <Badge variant="secondary" className="text-xs bg-green-100 text-green-700">
            Trigger
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
        
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
          Waiting for event...
        </div>
        
        {isExecuting && (
          <div className="text-xs text-green-600 font-medium animate-pulse">
            ⚡ Triggered!
          </div>
        )}
        
        {isCompleted && (
          <div className="text-xs text-green-600 font-medium">
            ✓ Event processed
          </div>
        )}
      </div>
      
      <Handle
        type="source"
        position={Position.Right}
        className="w-3 h-3 border-2 border-green-300 bg-white hover:bg-green-100 transition-colors"
      />
    </Card>
  );
});

TriggerNode.displayName = 'TriggerNode';

export default TriggerNode;
