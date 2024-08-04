"use client";
import TicketPrioritySelect from "@/app/tickets/TicketPrioritySelect";
import TicketStatusSelect from "@/app/tickets/TicketStatusSelect";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

import { ticketSchema } from "@/ValidationSchemas/ticketSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Ticket } from "@prisma/client";
import toast from "react-hot-toast";
import { z } from "zod";

type FormData = z.infer<typeof ticketSchema>;

function EditTicketForm({ ticket }: { ticket: Ticket }) {
  const router = useRouter();
  const { register, handleSubmit, formState, control } = useForm<FormData>({
    mode: "all",
    resolver: zodResolver(ticketSchema),
    defaultValues: ticket,
  });

  const { isValid, isSubmitting, errors } = formState;

  const onSuccess: SubmitHandler<FormData> = async (data) => {
    try {
      await axios.patch("/api/tickets/" + ticket.id, data);
      toast.success("Ticket updated successfully");
      router.push("/tickets");
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong, Try Editing again.");
    }
  };
  return (
    <div className="mx-auto max-w-xl">
      <Card>
        <CardHeader>
          <CardTitle className="text-muted-foreground">Edit Ticket</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSuccess)}>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  {...register("title")}
                  id="title"
                  type="text"
                  className="w-full"
                  placeholder="Title"
                />
                {errors.title && (
                  <p className="text-xs text-destructive">
                    {errors.title.message}
                  </p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  {...register("description")}
                  id="description"
                  placeholder="Description"
                  className="min-h-32"
                />
                {errors.description && (
                  <p className="text-xs text-destructive">
                    {errors.description.message}
                  </p>
                )}
              </div>
              <div className="flex gap-4">
                <Controller
                  control={control}
                  name="status"
                  render={({ field: { value, onChange } }) => (
                    <TicketStatusSelect value={value} onChange={onChange} />
                  )}
                />
                <Controller
                  control={control}
                  name="priority"
                  render={({ field: { value, onChange } }) => (
                    <TicketPrioritySelect value={value} onChange={onChange} />
                  )}
                />
              </div>

              <Button
                type="submit"
                className="max-w-32"
                disabled={!isValid || isSubmitting}
              >
                {isSubmitting ? "Edting" : "Edit Ticket"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default EditTicketForm;
