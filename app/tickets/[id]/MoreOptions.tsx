import { Button } from "@/components/ui/button";
import Link from "next/link";
import DeleteTicketButton from "./DeleteTicketButton";

function MoreOptions({ id }: { id: string }) {
  return (
    <>
      <Button asChild>
        <Link href={`/tickets/edit/${id}`}>Edit Ticket</Link>
      </Button>
      <DeleteTicketButton />
    </>
  );
}

export default MoreOptions;
