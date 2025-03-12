import { Card } from "@/components/ui/card";
import prisma from "@/prisma/client";

import NotAuthorized from "@/components/not-authorized";
import { auth } from "@/auth";
import TicketSummary from "./TicketSummary";

export default async function Home() {
  const session = await auth();
  if (!(session?.user.role === "ADMIN")) return <NotAuthorized />;

  const open = await prisma.ticket.count({
    where: { status: "OPEN" },
  });
  const inProgress = await prisma.ticket.count({
    where: { status: "IN_PROGRESS" },
  });
  const closed = await prisma.ticket.count({
    where: { status: "CLOSED" },
  });
  return (
    <div className="grid gap-4 md:grid-cols-3 md:gap-8">
      <div className="flex flex-col gap-4 md:col-span-2 md:gap-8">
        <TicketSummary open={open} inProgress={inProgress} closed={closed} />
        <Card className="min-h-96"></Card>
      </div>
      <Card className="min-h-96"></Card>
    </div>
  );
}
