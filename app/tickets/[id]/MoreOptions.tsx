import { Button } from "@/components/ui/button";
import Link from "next/link";

function MoreOptions({ id }: { id: string }) {
  return (
    <>
      <Button asChild>
        <Link href={`/tickets/edit/${id}`}>Edit Ticket</Link>
      </Button>
      <Button variant={"destructive"}>Delete Ticket</Button>
    </>
  );
}

export default MoreOptions;
