import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import prisma from "@/prisma/client";

async function LatestTickets() {
  const tickets = await prisma.ticket.findMany({
    orderBy: { createdAt: "desc" },
    take: 7,
    include: { assignedToUser: true },
  });
  return (
    <Card className="min-h-96 md:col-span-2">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Latest Tickets</CardTitle>
      </CardHeader>
      <ul role="list" className="divide-y">
        {tickets.map((ticket) => (
          <li key={ticket.id} className="flex items-center justify-between p-3">
            <div className="ml-3">
              <p className="text-sm font-medium">{ticket.title}</p>
              <div className="mt-1.5 flex gap-2">
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
              </div>
            </div>
            <p className="text-sm font-medium">
              {ticket.assignedToUser?.username
                ? ticket.assignedToUser.username
                : "unassigned"}
            </p>
          </li>
        ))}
      </ul>
    </Card>
  );
}

export default LatestTickets;
