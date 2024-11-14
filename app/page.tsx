import authOptions from "@/app/auth/_options";
import NotAuthorized from "@/components/not-authorized";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import LatestTickets from "./LatestTickets";
import TicketChart from "./TicketChart";
import TicketSummary from "./TicketSummary";
import Poller from "@/components/Poller";

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
    <div className="grid gap-4 md:grid-cols-5 md:gap-8">
      <div className="flex flex-col gap-4 md:col-span-3 md:gap-8">
        <Poller ms={2000} />
        <TicketSummary open={open} inProgress={inProgress} closed={closed} />
        <TicketChart open={open} inProgress={inProgress} closed={closed} />
      </div>
      <LatestTickets />
    </div>
  );
}
