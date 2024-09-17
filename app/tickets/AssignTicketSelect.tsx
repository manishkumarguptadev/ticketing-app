"use client";

import { Ticket, User } from "@prisma/client";
import React from "react";
import { useState } from "react";
import axios from "axios";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const AssignTicketSelect = ({
  ticket,
  users,
}: {
  ticket: Ticket;
  users: User[];
}) => {
  const router = useRouter();
  const [isAssigning, setIsAssigning] = useState(false);

  const assignTicket = async (userId: string) => {
    setIsAssigning(true);
    await axios
      .patch(`/api/tickets/${ticket.id}`, {
        ...ticket,
        status: userId === "0" ? "OPEN" : "IN_PROGRESS",
        assignedToUserId: userId === "0" ? null : userId,
      })
      .catch(() => {
        toast.error("Unable to Assign Ticket.");
      });
    router.refresh();
    setIsAssigning(false);
  };

  return (
    <>
      <Select
        defaultValue={ticket.assignedToUserId || "0"}
        onValueChange={(value) => assignTicket(value)}
        disabled={isAssigning}
      >
        <SelectTrigger aria-label="Select user for assigning to ticket">
          <SelectValue placeholder="Select User..."></SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="0">Unassigned</SelectItem>
          {users?.map((user) => (
            <SelectItem key={user.id} value={user.id}>
              {user.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </>
  );
};

export default AssignTicketSelect;
