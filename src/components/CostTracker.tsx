
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { DollarSign, TrendingUp } from 'lucide-react';

interface CostTrackerProps {
  nodes: any[];
  revisionCost: number;
}

const CostTracker: React.FC<CostTrackerProps> = ({ nodes, revisionCost }) => {
  const totalWorkflowCost = nodes.reduce((total, node) => {
    return total + (node.data?.options?.cost || 0);
  }, 0);

  const totalCost = totalWorkflowCost + revisionCost;

  return (
    <Card className="p-4 bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
      <div className="flex items-center gap-2 mb-3">
        <DollarSign className="w-5 h-5 text-green-600" />
        <h3 className="font-medium text-gray-800">Cost Breakdown</h3>
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Workflow Blocks ({nodes.length})</span>
          <span className="font-medium">${totalWorkflowCost}</span>
        </div>
        
        {revisionCost > 0 && (
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Revision Requests</span>
            <span className="font-medium">${revisionCost}</span>
          </div>
        )}
        
        <div className="border-t pt-2 flex justify-between font-medium">
          <span>Total Cost</span>
          <div className="flex items-center gap-1">
            <TrendingUp className="w-4 h-4 text-green-600" />
            <span className="text-green-600">${totalCost}</span>
          </div>
        </div>
        
        <Badge className="w-full justify-center bg-green-100 text-green-700 hover:bg-green-100">
          Pay per execution
        </Badge>
      </div>
    </Card>
  );
};

export default CostTracker;
