"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button, buttonVariants } from "@/components/ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

function DeleteTicketButton({ ticketId }: { ticketId: string }) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const deleteTicket = async () => {
    try {
      setIsDeleting(true);
      await axios.delete("/api/tickets/" + ticketId);
      toast.success("Ticket deleted successfully");
      router.push("/tickets");
      router.refresh();
    } catch (error) {
      setIsDeleting(false);
      toast.error("Something went wrong, Try deleting again.");
    }
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button disabled={isDeleting} variant={"destructive"}>
          {isDeleting ? "Deleting" : "Delete Ticket"}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Confirm Deletion</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure to delete this ticket? This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={deleteTicket}
            className={buttonVariants({ variant: "destructive" })}
          >
            Delete Ticket
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default DeleteTicketButton;
