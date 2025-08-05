import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Switch } from "./ui/switch";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface CreatePolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CreatePolicyModal({ isOpen, onClose }: CreatePolicyModalProps) {
  const [policyName, setPolicyName] = useState("");
  const [domain, setDomain] = useState("");
  const [description, setDescription] = useState("");
  const [policyType, setPolicyType] = useState("");
  const [applyPolicy, setApplyPolicy] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log({ policyName, domain, description, policyType, applyPolicy });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50" 
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-dashboard-card border border-border rounded-xl p-6 w-full max-w-md mx-4 shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-foreground">Create New Policy</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="h-8 w-8 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Field */}
          <div className="space-y-2">
            <Label htmlFor="policy-name" className="text-sm font-medium text-foreground">
              Name*
            </Label>
            <Input
              id="policy-name"
              placeholder="Add policy name"
              value={policyName}
              onChange={(e) => setPolicyName(e.target.value)}
              className="bg-dashboard-bg border-border"
              required
            />
          </div>

          {/* Domain Field */}
          <div className="space-y-2">
            <Label htmlFor="domain" className="text-sm font-medium text-foreground">
              Domain*
            </Label>
            <Input
              id="domain"
              placeholder="Free Domain name"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              className="bg-dashboard-bg border-border"
              required
            />
          </div>

          {/* Description Field */}
          <div className="space-y-2">
            <Label htmlFor="description" className="text-sm font-medium text-foreground">
              Description
            </Label>
            <Textarea
              id="description"
              placeholder="Add general description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="bg-dashboard-bg border-border min-h-[80px]"
            />
          </div>

          {/* Type Field */}
          <div className="space-y-2">
            <Label htmlFor="type" className="text-sm font-medium text-foreground">
              Type*
            </Label>
            <Select value={policyType} onValueChange={setPolicyType} required>
              <SelectTrigger className="bg-dashboard-bg border-border">
                <SelectValue placeholder="Domain" />
              </SelectTrigger>
              <SelectContent className="bg-dashboard-card border-border">
                <SelectItem value="domain" className="text-foreground hover:bg-dashboard-accent-blue hover:text-white">
                  Domain
                </SelectItem>
                <SelectItem value="ip-port" className="text-foreground hover:bg-dashboard-accent-blue hover:text-white">
                  IP Port
                </SelectItem>
                <SelectItem value="application" className="text-foreground hover:bg-dashboard-accent-blue hover:text-white">
                  Application
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Apply Policy Toggle */}
          <div className="flex items-center justify-between py-2">
            <div className="flex items-center space-x-2">
              <Label htmlFor="apply-policy" className="text-sm font-medium text-foreground">
                Apply this policy
              </Label>
              <div className="w-4 h-4 rounded-full bg-dashboard-accent-blue text-white flex items-center justify-center text-xs">
                i
              </div>
            </div>
            <Switch
              id="apply-policy"
              checked={applyPolicy}
              onCheckedChange={setApplyPolicy}
            />
          </div>

          {/* Form Actions */}
          <div className="flex justify-end space-x-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="border-border text-foreground hover:bg-muted"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-dashboard-accent-blue hover:bg-dashboard-accent-blue/90 text-white"
            >
              Add
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
