"use client";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import TicketStatusSelect from "../TicketStatusSelect";
import TicketPrioritySelect from "../TicketPrioritySelect";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import axios from "axios";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { ticketSchema } from "@/ValidationSchemas/ticketSchema";
import toast from "react-hot-toast";

type FormData = z.infer<typeof ticketSchema>;

function NewTicketPage() {
  const router = useRouter();
  const { register, handleSubmit, formState, control } = useForm<FormData>({
    mode: "all",
    resolver: zodResolver(ticketSchema),
  });

  const { isValid, isSubmitting, errors } = formState;

  const onSuccess: SubmitHandler<FormData> = async (data) => {
    try {
      await axios.post("/api/tickets", data);
      toast.success("Ticket created successfully.");
      router.push("/tickets");
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong, Try submitting again.");
    }
  };
  return (
    <div className="mx-auto max-w-xl">
      <Card>
        <CardHeader>
          <CardTitle className="text-muted-foreground">New Ticket</CardTitle>
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
                  render={({ field: { value = "OPEN", onChange } }) => (
                    <TicketStatusSelect value={value} onChange={onChange} />
                  )}
                />
                <Controller
                  control={control}
                  name="priority"
                  render={({ field: { value = "MEDIUM", onChange } }) => (
                    <TicketPrioritySelect value={value} onChange={onChange} />
                  )}
                />
              </div>

              <Button
                type="submit"
                className="max-w-32"
                disabled={!isValid || isSubmitting}
              >
                {isSubmitting ? "Submitting" : "Submit Ticket"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default NewTicketPage;
