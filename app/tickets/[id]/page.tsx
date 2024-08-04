import { Badge } from "@/components/ui/badge";
import { notFound } from "next/navigation";
import MoreOptions from "./MoreOptions";
import prisma from "@/prisma/client";

async function TicketDetailPage({ params }: { params: { id: string } }) {
  const ticket = await prisma.ticket.findUnique({
    where: { id: params.id },
  });
  if (!ticket) notFound();

  return (
    <div className="m-4 grid gap-4 md:grid-cols-[1fr_250px]">
      <div className="grid gap-2">
        <h1 className="text-3xl font-bold">{ticket.title}</h1>
        <div className="flex max-w-3xl items-center gap-4 text-sm text-muted-foreground">
          <Badge
            className={
              ticket.status === "CLOSED"
                ? "bg-green-50 text-green-500"
                : ticket.status === "OPEN"
                  ? "bg-red-50 text-red-500"
                  : "bg-violet-50 text-violet-500"
            }
            variant={"outline"}
          >
            {ticket.status}
          </Badge>
          <Badge
            className={
              ticket.priority === "LOW"
                ? "bg-green-50 text-green-500"
                : ticket.priority === "HIGH"
                  ? "bg-red-50 text-red-500"
                  : "bg-violet-50 text-violet-500"
            }
            variant={"outline"}
          >
            {ticket.priority}
          </Badge>
          <div className="ml-auto">
            <div className="font-medium">
              Created&nbsp; :{" "}
              {ticket.createdAt.toLocaleDateString("en-US", {
                year: "2-digit",
                month: "2-digit",
                day: "2-digit",
                hour: "numeric",
                minute: "2-digit",
                hour12: true,
              })}
            </div>
            <div className="font-medium">
              Updated :{" "}
              {ticket.updatedAt.toLocaleDateString("en-US", {
                year: "2-digit",
                month: "2-digit",
                day: "2-digit",
                hour: "numeric",
                minute: "2-digit",
                hour12: true,
              })}
            </div>
          </div>
        </div>
        <div className="mt-2 min-h-40 max-w-3xl rounded-md border p-2">
          {ticket.description}
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <MoreOptions id={ticket.id} />
      </div>
    </div>
  );
}

export default TicketDetailPage;
