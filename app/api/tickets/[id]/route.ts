import { ticketSchema } from "@/ValidationSchemas/ticketSchema";
import { auth } from "@/auth";
import prisma from "@/prisma/client";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const session = await auth();
  if (!(session?.user.role === "ADMIN"))
    return NextResponse.json(
      { success: false, error: "Not authorized" },
      { status: 401 },
    );
  const body = await request.json();

  const result = ticketSchema.safeParse(body);

  if (!result.success) {
    let zoderrors = {};
    result.error.issues.forEach(
      (issue) => (zoderrors = { ...zoderrors, [issue.path[0]]: issue.message }),
    );
    return NextResponse.json(
      { success: false, errors: zoderrors },
      { status: 400 },
    );
  }

  const { assignedToUserId } = body;

  if (assignedToUserId) {
    const user = await prisma.user.findUnique({
      where: { id: assignedToUserId },
    });
    if (!user)
      return NextResponse.json({ error: "Invalid user." }, { status: 400 });
  }

  const ticket = await prisma.ticket.findUnique({
    where: { id: params.id },
  });
  if (!ticket) {
    return NextResponse.json(
      { success: false, error: "Ticket not found" },
      { status: 404 },
    );
  }
  const updatedTicket = await prisma.ticket.update({
    where: { id: params.id },
    data: { ...result.data },
  });
  revalidatePath("/tickets");
  return NextResponse.json(
    { success: true, data: updatedTicket },
    { status: 200 },
  );
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const session = await auth();
  if (!(session?.user.role === "ADMIN"))
    return NextResponse.json(
      { success: false, error: "Not authorized" },
      { status: 401 },
    );
  const ticket = await prisma.ticket.findUnique({
    where: { id: params.id },
  });
  if (!ticket) {
    return NextResponse.json(
      { success: false, error: "Ticket not found" },
      { status: 404 },
    );
  }
  await prisma.ticket.delete({
    where: { id: params.id },
  });
  revalidatePath("/tickets");
  return NextResponse.json({ success: true, data: {} }, { status: 200 });
}
