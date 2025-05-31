
import { Node, Edge } from '@xyflow/react';

export const initialNodes: Node[] = [
  {
    id: 'trigger-1',
    type: 'trigger',
    position: { x: 100, y: 100 },
    data: { 
      label: 'New Task Created',
      description: 'Triggers when a new task is assigned to a freelancer',
      isExecuting: false,
      isCompleted: false
    },
  },
  {
    id: 'action-1',
    type: 'action',
    position: { x: 400, y: 100 },
    data: { 
      label: 'Send Notification',
      description: 'Send email notification to freelancer about new task',
      isExecuting: false,
      isCompleted: false
    },
  },
  {
    id: 'conditional-1',
    type: 'conditional',
    position: { x: 700, y: 100 },
    data: { 
      label: 'Work Quality Check',
      description: 'Evaluate if submitted work meets quality standards',
      isExecuting: false,
      isCompleted: false
    },
  },
  {
    id: 'action-2',
    type: 'action',
    position: { x: 1000, y: 50 },
    data: { 
      label: 'Process Payment',
      description: 'Initiate payment to freelancer for approved work',
      isExecuting: false,
      isCompleted: false
    },
  },
  {
    id: 'action-3',
    type: 'action',
    position: { x: 1000, y: 150 },
    data: { 
      label: 'Request Revision',
      description: 'Send revision request with feedback to freelancer',
      isExecuting: false,
      isCompleted: false
    },
  },
];

export const initialEdges: Edge[] = [
  {
    id: 'e1-2',
    source: 'trigger-1',
    target: 'action-1',
    type: 'smoothstep',
    animated: true,
    style: { stroke: '#8b5cf6', strokeWidth: 2 },
  },
  {
    id: 'e2-3',
    source: 'action-1',
    target: 'conditional-1',
    type: 'smoothstep',
    animated: true,
    style: { stroke: '#8b5cf6', strokeWidth: 2 },
  },
  {
    id: 'e3-4',
    source: 'conditional-1',
    sourceHandle: 'yes',
    target: 'action-2',
    type: 'smoothstep',
    animated: true,
    style: { stroke: '#10b981', strokeWidth: 2 },
    label: 'Approved',
    labelStyle: { fill: '#10b981', fontWeight: 600 },
  },
  {
    id: 'e3-5',
    source: 'conditional-1',
    sourceHandle: 'no',
    target: 'action-3',
    type: 'smoothstep',
    animated: true,
    style: { stroke: '#ef4444', strokeWidth: 2 },
    label: 'Needs Revision',
    labelStyle: { fill: '#ef4444', fontWeight: 600 },
  },
];
