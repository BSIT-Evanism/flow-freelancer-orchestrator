
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Activity, Clock } from 'lucide-react';

interface SimulationOverlayProps {
  progress: string[];
  totalNodes: number;
}

const SimulationOverlay: React.FC<SimulationOverlayProps> = ({ progress, totalNodes }) => {
  const progressPercentage = (progress.length / totalNodes) * 100;

  return (
    <div className="absolute top-4 right-4 z-50">
      <Card className="p-4 bg-white/95 backdrop-blur-sm border-purple-200 shadow-lg min-w-[280px]">
        <div className="flex items-center gap-2 mb-3">
          <Activity className="w-5 h-5 text-purple-600" />
          <h3 className="font-medium text-gray-800">Workflow Simulation</h3>
          <Badge className="bg-purple-100 text-purple-700">
            Running
          </Badge>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Progress</span>
            <span className="font-medium">{progress.length}/{totalNodes} nodes</span>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
          
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <Clock className="w-3 h-3" />
            <span>Simulating workflow execution...</span>
          </div>
          
          {progress.length > 0 && (
            <div className="text-xs text-purple-600">
              Last executed: Node {progress[progress.length - 1]}
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default SimulationOverlay;
