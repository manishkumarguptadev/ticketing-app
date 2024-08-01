import { Button } from "@/components/ui/button";

function MoreOptions() {
  return (
    <>
      <Button>Edit Ticket</Button>
      <Button variant={"destructive"}>Delete Ticket</Button>
    </>
  );
}

export default MoreOptions;
