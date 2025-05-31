
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { DollarSign } from 'lucide-react';

interface BlockOptionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  node: any;
  onSave: (nodeId: string, options: any) => void;
}

const BLOCK_COSTS = {
  trigger: { base: 5, premium: 10 },
  action: { base: 8, premium: 15 },
  conditional: { base: 12, premium: 20 }
};

const BlockOptionsModal: React.FC<BlockOptionsModalProps> = ({ isOpen, onClose, node, onSave }) => {
  const [options, setOptions] = useState(node?.data?.options || {});
  const [selectedTier, setSelectedTier] = useState(node?.data?.tier || 'base');

  if (!node) return null;

  const handleSave = () => {
    const cost = BLOCK_COSTS[node.type as keyof typeof BLOCK_COSTS]?.[selectedTier as keyof typeof BLOCK_COSTS.trigger] || 0;
    onSave(node.id, { ...options, tier: selectedTier, cost });
    onClose();
  };

  const renderTriggerOptions = () => (
    <div className="space-y-4">
      <div>
        <Label>Trigger Event</Label>
        <Select value={options.event || ''} onValueChange={(value) => setOptions({...options, event: value})}>
          <SelectTrigger>
            <SelectValue placeholder="Select trigger event" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="task_created">New Task Created</SelectItem>
            <SelectItem value="work_submitted">Work Submitted</SelectItem>
            <SelectItem value="deadline_approaching">Deadline Approaching</SelectItem>
            <SelectItem value="payment_due">Payment Due</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div>
        <Label>Conditions</Label>
        <Textarea 
          placeholder="Optional trigger conditions..."
          value={options.conditions || ''}
          onChange={(e) => setOptions({...options, conditions: e.target.value})}
        />
      </div>
    </div>
  );

  const renderActionOptions = () => (
    <div className="space-y-4">
      <div>
        <Label>Action Type</Label>
        <Select value={options.actionType || ''} onValueChange={(value) => setOptions({...options, actionType: value})}>
          <SelectTrigger>
            <SelectValue placeholder="Select action" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="send_email">Send Email</SelectItem>
            <SelectItem value="send_notification">Send Notification</SelectItem>
            <SelectItem value="update_status">Update Task Status</SelectItem>
            <SelectItem value="process_payment">Process Payment</SelectItem>
            <SelectItem value="schedule_meeting">Schedule Meeting</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div>
        <Label>Recipients</Label>
        <Input 
          placeholder="Enter email addresses..."
          value={options.recipients || ''}
          onChange={(e) => setOptions({...options, recipients: e.target.value})}
        />
      </div>
      
      <div>
        <Label>Message Template</Label>
        <Textarea 
          placeholder="Enter message template..."
          value={options.message || ''}
          onChange={(e) => setOptions({...options, message: e.target.value})}
        />
      </div>
    </div>
  );

  const renderConditionalOptions = () => (
    <div className="space-y-4">
      <div>
        <Label>Condition Type</Label>
        <Select value={options.conditionType || ''} onValueChange={(value) => setOptions({...options, conditionType: value})}>
          <SelectTrigger>
            <SelectValue placeholder="Select condition" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="approval_status">Client Approval</SelectItem>
            <SelectItem value="budget_check">Budget Available</SelectItem>
            <SelectItem value="rating_check">Freelancer Rating</SelectItem>
            <SelectItem value="deadline_check">Deadline Status</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div>
        <Label>Condition Value</Label>
        <Input 
          placeholder="Enter condition value..."
          value={options.conditionValue || ''}
          onChange={(e) => setOptions({...options, conditionValue: e.target.value})}
        />
      </div>
      
      <div>
        <Label>Comparison Operator</Label>
        <Select value={options.operator || ''} onValueChange={(value) => setOptions({...options, operator: value})}>
          <SelectTrigger>
            <SelectValue placeholder="Select operator" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="equals">Equals</SelectItem>
            <SelectItem value="greater_than">Greater Than</SelectItem>
            <SelectItem value="less_than">Less Than</SelectItem>
            <SelectItem value="contains">Contains</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );

  const currentCost = BLOCK_COSTS[node.type as keyof typeof BLOCK_COSTS]?.[selectedTier as keyof typeof BLOCK_COSTS.trigger] || 0;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            Configure {node.data?.label}
            <Badge variant="outline" className="ml-auto">
              <DollarSign className="w-3 h-3 mr-1" />
              ${currentCost}
            </Badge>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <Label>Pricing Tier</Label>
            <Select value={selectedTier} onValueChange={setSelectedTier}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="base">Basic - ${BLOCK_COSTS[node.type as keyof typeof BLOCK_COSTS]?.base || 0}</SelectItem>
                <SelectItem value="premium">Premium - ${BLOCK_COSTS[node.type as keyof typeof BLOCK_COSTS]?.premium || 0}</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {node.type === 'trigger' && renderTriggerOptions()}
          {node.type === 'action' && renderActionOptions()}
          {node.type === 'conditional' && renderConditionalOptions()}
          
          <div className="flex gap-2 pt-4">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button onClick={handleSave} className="flex-1">
              Save Configuration
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BlockOptionsModal;
