import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Status } from "@prisma/client";
import Link from "next/link";
interface Props {
  open: number;
  inProgress: number;
  closed: number;
}
function TicketSummary({ open, inProgress, closed }: Props) {
  const containers: {
    label: string;
    value: number;
    status: Status;
  }[] = [
    { label: "Open Tickets", value: open, status: "OPEN" },
    { label: "In Progress Tickets", value: inProgress, status: "IN_PROGRESS" },
    { label: "Closed Tickets", value: closed, status: "CLOSED" },
  ];
  return (
    <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
      {containers.map((container) => (
        <Card className="min-h-32" key={container.status}>
          <CardHeader>
            <CardTitle className="pb-2 text-center text-sm font-medium">
              <Link href={`/tickets?status=${container.status}`}>
                {container.label}
              </Link>
            </CardTitle>
            <div className="text-center text-3xl font-bold">
              {container.value}
            </div>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
}

export default TicketSummary;
