import prisma from "@/prisma/client";
import { notFound } from "next/navigation";

import EditTicketForm from "./EditTicketForm";

async function EditTicketPage({ params }: { params: { id: string } }) {
  const ticket = await prisma.ticket.findUnique({
    where: { id: params.id },
  });
  if (!ticket) notFound();
  return <EditTicketForm ticket={ticket} />;
}

export default EditTicketPage;
