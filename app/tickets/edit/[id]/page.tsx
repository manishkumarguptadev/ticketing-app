import prisma from "@/prisma/client";
import { notFound } from "next/navigation";

import EditTicketForm from "./EditTicketForm";
import { auth } from "@/auth";
import NotAuthorized from "@/components/not-authorized";
async function EditTicketPage({ params }: { params: { id: string } }) {
  const session = await auth();
  if (!(session?.user.role === "ADMIN")) return <NotAuthorized />;
  const ticket = await prisma.ticket.findUnique({
    where: { id: params.id },
  });
  if (!ticket) notFound();
  return <EditTicketForm ticket={ticket} />;
}

export default EditTicketPage;
