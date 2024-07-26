import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import prisma from "@/prisma/client";
import Link from "next/link";

async function TicketsPage() {
  const tickets = await prisma.ticket.findMany();
  return (
    <>
      <div className="mb-4 flex items-center">
        <Button asChild>
          <Link href="/tickets/new">New Ticket</Link>
        </Button>
      </div>
      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow className="bg-accent hover:bg-accent">
              <TableHead>Ticket</TableHead>
              <TableHead className="hidden sm:table-cell">Status</TableHead>
              <TableHead className="hidden sm:table-cell">Priority</TableHead>
              <TableHead className="hidden md:table-cell">Created</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tickets.map((ticket) => (
              <TableRow key={ticket.id}>
                <TableCell>
                  <div className="font-medium">{ticket.title}</div>
                  <div className="flex gap-2">
                    <Badge
                      className={`${
                        ticket.status === "CLOSED"
                          ? "bg-green-50 text-green-500"
                          : ticket.status === "OPEN"
                            ? "bg-red-50 text-red-500"
                            : "bg-violet-50 text-violet-500"
                      } sm:hidden`}
                      variant={"outline"}
                    >
                      {ticket.status}
                    </Badge>
                    <Badge
                      className={`${
                        ticket.priority === "LOW"
                          ? "bg-green-50 text-green-500"
                          : ticket.priority === "HIGH"
                            ? "bg-red-50 text-red-500"
                            : "bg-violet-50 text-violet-500"
                      } sm:hidden`}
                      variant={"outline"}
                    >
                      {ticket.priority}
                    </Badge>
                  </div>
                  <div className="font-medium md:hidden">
                    {ticket.createdAt.toLocaleDateString("en-US", {
                      year: "2-digit",
                      month: "2-digit",
                      day: "2-digit",
                      hour: "numeric",
                      minute: "2-digit",
                      hour12: true,
                    })}
                  </div>
                </TableCell>
                <TableCell className="hidden sm:table-cell">
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
                </TableCell>
                <TableCell className="hidden sm:table-cell">
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
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {ticket.createdAt.toLocaleDateString("en-US", {
                    year: "2-digit",
                    month: "2-digit",
                    day: "2-digit",
                    hour: "numeric",
                    minute: "2-digit",
                    hour12: true,
                  })}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}

export default TicketsPage;
