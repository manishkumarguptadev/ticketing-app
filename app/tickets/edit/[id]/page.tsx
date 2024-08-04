import TicketPrioritySelect from "@/app/tickets/TicketPrioritySelect";
import TicketStatusSelect from "@/app/tickets/TicketStatusSelect";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

function EditTicketPage() {
  return (
    <div className="mx-auto max-w-xl">
      <Card>
        <CardHeader>
          <CardTitle className="text-muted-foreground">Edit Ticket</CardTitle>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  type="text"
                  className="w-full"
                  placeholder="Title"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Description"
                  className="min-h-32"
                />
              </div>
              <div className="flex gap-4">
                <TicketStatusSelect />

                <TicketPrioritySelect />
              </div>

              <Button type="submit" className="max-w-32">
                "Edit Ticket"
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default EditTicketPage;
