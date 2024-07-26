"use client";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ControllerRenderProps } from "react-hook-form";

function TicketStatusSelect({
  value,
  onChange,
}: {
  onChange: (...event: any[]) => void;
  value: "OPEN" | "IN_PROGRESS" | "CLOSED" | undefined;
}) {
  return (
    <div className="grid w-48 gap-2">
      <Label htmlFor="status">Status</Label>
      <Select onValueChange={onChange} defaultValue={value}>
        <SelectTrigger id="status" aria-label="Select Status">
          <SelectValue placeholder="Select Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="OPEN">Open</SelectItem>
          <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
          <SelectItem value="CLOSED">Closed</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}

export default TicketStatusSelect;
