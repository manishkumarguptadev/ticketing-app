"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const AssignTicketSelect = () => {
  return (
    <>
      <Select onValueChange={(value) => console.log(value)} defaultValue="0">
        <SelectTrigger aria-label="Select user for assigning to ticket">
          <SelectValue placeholder="Select User..."></SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="0">Unassigned</SelectItem>

          <SelectItem value="1">user1</SelectItem>
          <SelectItem value="2">user2</SelectItem>
        </SelectContent>
      </Select>
    </>
  );
};

export default AssignTicketSelect;
