
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Zap, 
  Settings, 
  GitBranch, 
  UserCheck, 
  MessageSquare, 
  Clock, 
  DollarSign,
  FileText,
  Mail,
  CheckCircle,
  Users,
  Calendar
} from 'lucide-react';

const workflowBlocks = [
  {
    category: 'Triggers',
    icon: Zap,
    blocks: [
      { 
        type: 'trigger', 
        label: 'New Task Created', 
        icon: FileText,
        description: 'Triggers when a new task is assigned to a freelancer',
        color: 'bg-green-500'
      },
      { 
        type: 'trigger', 
        label: 'Work Submitted', 
        icon: CheckCircle,
        description: 'Triggers when freelancer submits completed work',
        color: 'bg-green-500'
      },
      { 
        type: 'trigger', 
        label: 'Deadline Approaching', 
        icon: Clock,
        description: 'Triggers 24 hours before task deadline',
        color: 'bg-green-500'
      },
    ]
  },
  {
    category: 'Actions',
    icon: Settings,
    blocks: [
      { 
        type: 'action', 
        label: 'Send Notification', 
        icon: MessageSquare,
        description: 'Send email or in-app notification',
        color: 'bg-blue-500'
      },
      { 
        type: 'action', 
        label: 'Update Task Status', 
        icon: Settings,
        description: 'Change task status (in progress, completed, etc.)',
        color: 'bg-blue-500'
      },
      { 
        type: 'action', 
        label: 'Process Payment', 
        icon: DollarSign,
        description: 'Initiate payment to freelancer',
        color: 'bg-blue-500'
      },
      { 
        type: 'action', 
        label: 'Schedule Meeting', 
        icon: Calendar,
        description: 'Book a meeting with freelancer',
        color: 'bg-blue-500'
      },
    ]
  },
  {
    category: 'Conditionals',
    icon: GitBranch,
    blocks: [
      { 
        type: 'conditional', 
        label: 'Client Approval', 
        icon: UserCheck,
        description: 'Check if work meets client requirements',
        color: 'bg-yellow-500'
      },
      { 
        type: 'conditional', 
        label: 'Budget Check', 
        icon: DollarSign,
        description: 'Verify if budget is sufficient for payment',
        color: 'bg-yellow-500'
      },
      { 
        type: 'conditional', 
        label: 'Freelancer Rating', 
        icon: Users,
        description: 'Check freelancer performance rating',
        color: 'bg-yellow-500'
      },
    ]
  }
];

const Sidebar = () => {
  const onDragStart = (event: React.DragEvent, nodeType: string, label: string, nodeData: any) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.setData('application/reactflow-label', label);
    event.dataTransfer.setData('application/reactflow-data', JSON.stringify(nodeData));
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div className="w-80 bg-white/80 backdrop-blur-sm border-r border-purple-100 p-4 overflow-y-auto">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">Workflow Blocks</h2>
        <p className="text-sm text-gray-600">Drag and drop blocks to build your automation</p>
      </div>

      <div className="space-y-6">
        {workflowBlocks.map((category) => (
          <div key={category.category}>
            <div className="flex items-center gap-2 mb-3">
              <category.icon className="w-5 h-5 text-purple-600" />
              <h3 className="font-medium text-gray-800">{category.category}</h3>
            </div>
            
            <div className="space-y-2">
              {category.blocks.map((block) => (
                <Card
                  key={`${block.type}-${block.label}`}
                  className="p-3 cursor-grab active:cursor-grabbing hover:shadow-md transition-all duration-200 border-purple-100 hover:border-purple-300 group"
                  draggable
                  onDragStart={(e) => onDragStart(e, block.type, block.label, { 
                    icon: block.icon.name,
                    description: block.description,
                    color: block.color
                  })}
                >
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-lg ${block.color} group-hover:scale-110 transition-transform duration-200`}>
                      <block.icon className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-sm text-gray-800 mb-1">
                        {block.label}
                      </div>
                      <div className="text-xs text-gray-600 leading-relaxed">
                        {block.description}
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border border-purple-200">
        <h4 className="font-medium text-gray-800 mb-2">Quick Tips</h4>
        <ul className="text-xs text-gray-600 space-y-1">
          <li>• Connect blocks by dragging from one handle to another</li>
          <li>• Use conditionals to create branching logic</li>
          <li>• Start with a trigger to begin your workflow</li>
          <li>• Test your workflow with the simulation feature</li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
