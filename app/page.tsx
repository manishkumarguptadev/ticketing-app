import { Card } from "@/components/ui/card";
import TicketSummary from "./TicketSummary";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/_options";
import NotAuthorized from "@/components/not-authorized";

export default async function Home() {
  const session = await getServerSession(authOptions);
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
