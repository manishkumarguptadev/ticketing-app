"use client";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function TicketPrioritySelect() {
  return (
    <div className="grid w-48 gap-2">
      <Label htmlFor="status">Priority</Label>
      <Select
        onValueChange={(value) => console.log(value)}
        defaultValue="MEDIUM"
      >
        <SelectTrigger id="priority" aria-label="Select Priority">
          <SelectValue placeholder="Select Priority" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="LOW">Low</SelectItem>
          <SelectItem value="MEDIUM">Medium</SelectItem>
          <SelectItem value="HIGH">High</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}

export default TicketPrioritySelect;
