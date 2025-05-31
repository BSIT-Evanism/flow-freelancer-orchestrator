
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { DollarSign, TrendingUp, AlertCircle } from 'lucide-react';

interface CostTrackerProps {
  nodes: any[];
  revisionCost: number;
  shouldApplyFees?: boolean;
  workflowMode?: 'freelancer-to-client' | 'client-managing-freelancers';
}

const CostTracker: React.FC<CostTrackerProps> = ({ 
  nodes, 
  revisionCost, 
  shouldApplyFees = true,
  workflowMode = 'freelancer-to-client'
}) => {
  const totalWorkflowCost = shouldApplyFees ? nodes.reduce((total, node) => {
    return total + (node.data?.options?.cost || 0);
  }, 0) : 0;

  const totalCost = totalWorkflowCost + revisionCost;

  return (
    <Card className={`p-4 border-green-200 ${shouldApplyFees ? 'bg-gradient-to-r from-green-50 to-blue-50' : 'bg-gradient-to-r from-gray-50 to-blue-50'}`}>
      <div className="flex items-center gap-2 mb-3">
        {shouldApplyFees ? (
          <DollarSign className="w-5 h-5 text-green-600" />
        ) : (
          <AlertCircle className="w-5 h-5 text-gray-600" />
        )}
        <h3 className="font-medium text-gray-800">Cost Breakdown</h3>
      </div>
      
      {!shouldApplyFees && (
        <div className="mb-3 p-2 bg-blue-100 rounded-lg text-xs text-blue-700">
          <strong>Free Management Mode:</strong> No fees for managing freelancers
        </div>
      )}
      
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
            {shouldApplyFees ? (
              <>
                <TrendingUp className="w-4 h-4 text-green-600" />
                <span className="text-green-600">${totalCost}</span>
              </>
            ) : (
              <span className="text-gray-600">FREE</span>
            )}
          </div>
        </div>
        
        <Badge className={`w-full justify-center ${shouldApplyFees ? 'bg-green-100 text-green-700 hover:bg-green-100' : 'bg-gray-100 text-gray-700 hover:bg-gray-100'}`}>
          {shouldApplyFees ? 'Pay per execution' : 'Management mode - No fees'}
        </Badge>
        
        <div className="text-xs text-gray-500 mt-2">
          Mode: {workflowMode === 'freelancer-to-client' ? 'Freelancer serving Client' : 'Client managing Freelancers'}
        </div>
      </div>
    </Card>
  );
};

export default CostTracker;
