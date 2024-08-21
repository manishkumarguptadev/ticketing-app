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
import Pagination from "./Pagination";
import TicketStatusFilter from "./TicketStatusFilter";
import { Status } from "@prisma/client";
import TicketPriorityFilter from "./TicketPriorityFilter";

interface Props {
  searchParams: {
    page: string;
    status: Status;
  };
}

async function TicketsPage({ searchParams }: Props) {
  const statuses = Object.values(Status);
  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;
  const pageSize = 5;
  const ticketCount = await prisma.ticket.count({
    where: {
      status,
    },
  });
  const pageCount = Math.ceil(ticketCount / pageSize);

  const currentPage =
    +searchParams.page > 1 && +searchParams.page <= pageCount
      ? +searchParams.page
      : 1;
  const tickets = await prisma.ticket.findMany({
    where: {
      status,
    },

    take: pageSize,
    skip: (currentPage - 1) * pageSize,
  });
  return (
    <>
      <div className="mb-4 flex items-center justify-between">
        <div className="flex gap-4">
          <TicketStatusFilter />
          <TicketPriorityFilter />
        </div>
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
                  <div className="font-medium">
                    <Button asChild variant={"link"}>
                      <Link href={`/tickets/${ticket.id}`}>{ticket.title}</Link>
                    </Button>
                  </div>
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
      {pageCount > 1 && (
        <Pagination
          searchParams={searchParams}
          pageCount={pageCount}
          currentPage={currentPage}
          pageSize={pageSize}
          ticketCount={ticketCount}
        />
      )}
    </>
  );
}

export default TicketsPage;
