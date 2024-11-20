"use client";
import { Button } from "@/components/ui/button";
import { Status } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

function CloseTicketButton({ id, status }: { id: string; status: Status }) {
  const router = useRouter();
  const [isClosing, setIsClosing] = useState(false);
  const closeTicket = async () => {
    try {
      setIsClosing(true);
      await axios.put("/api/tickets/" + id);
      toast.success("Ticket closed successfully");
      router.push("/tickets");
      router.refresh();
    } catch (error) {
      setIsClosing(false);
      toast.error("Something went wrong, Try Closing ticket again.");
    }
  };
  return (
    <Button disabled={isClosing || status === "CLOSED"} onClick={closeTicket}>
      {isClosing ? "Closing" : "Close Ticket"}
    </Button>
  );
}

export default CloseTicketButton;
