"use client";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function TicketPriorityFilter() {
  return (
    <div className="grid w-48 gap-2">
      <Label htmlFor="priority">Filter by Priority</Label>
      <Select onValueChange={(value) => console.log(value)} defaultValue="ALL">
        <SelectTrigger id="priority" aria-label="Select Priority">
          <SelectValue placeholder="Select priority" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="ALL">All</SelectItem>
          <SelectItem value="LOW">Low</SelectItem>
          <SelectItem value="MEDIUM">Medium</SelectItem>
          <SelectItem value="HIGH">High</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}

export default TicketPriorityFilter;
