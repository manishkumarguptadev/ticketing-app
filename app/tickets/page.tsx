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
import { Priority, Status, Ticket } from "@prisma/client";
import Link from "next/link";
import { BsArrowDown, BsArrowUp } from "react-icons/bs";
import Pagination from "./Pagination";
import TicketPriorityFilter from "./TicketPriorityFilter";
import TicketStatusFilter from "./TicketStatusFilter";

interface Props {
  searchParams: {
    page: string;
    status: Status;
    priority: Priority;
    orderBy: keyof Ticket;
    sort: "asc" | "desc";
  };
}

async function TicketsPage({ searchParams }: Props) {
  const statuses = Object.values(Status);
  const priorities = Object.values(Priority);
  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;
  const priority = priorities.includes(searchParams.priority)
    ? searchParams.priority
    : undefined;

  const columns: {
    label: string;
    value: keyof Ticket;
    classes: string;
  }[] = [
    { label: "Ticket", value: "title", classes: "" },
    { label: "Status", value: "status", classes: "hidden sm:table-cell" },
    { label: "Priority", value: "priority", classes: "hidden sm:table-cell" },
    { label: "Created", value: "createdAt", classes: "hidden sm:table-cell" },
  ];

  const orderBy = columns
    .map((column) => column.value)
    .includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: searchParams.sort }
    : undefined;

  const pageSize = 5;
  const ticketCount = await prisma.ticket.count({
    where: {
      status,
      priority,
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
      priority,
    },
    orderBy,
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
              {columns.map((column) => (
                <TableHead className={column.classes} key={column.value}>
                  <Link
                    href={{
                      query: {
                        ...searchParams,
                        orderBy: column.value,
                        sort:
                          column.value === searchParams.orderBy
                            ? searchParams.sort === "asc"
                              ? "desc"
                              : "asc"
                            : "asc",
                        page: 1,
                      },
                    }}
                  >
                    {column.label}
                  </Link>
                  {column.value === searchParams.orderBy &&
                    (searchParams.sort === "asc" ? (
                      <BsArrowDown className="m-1 inline" />
                    ) : (
                      <BsArrowUp className="m-1 inline" />
                    ))}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {tickets.map((ticket) => (
              <TableRow key={ticket.id}>
                <TableCell>
                  <div className="font-medium">
                    <Button asChild variant={"link"}>
                      <Link className="pl-0" href={`/tickets/${ticket.id}`}>
                        {ticket.title}
                      </Link>
                    </Button>
                  </div>
                  <div className="flex gap-2 pb-3 sm:pb-0">
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
