import { ticketSchema } from "@/ValidationSchemas/ticketSchema";
import { auth } from "@/auth";
import prisma from "@/prisma/client";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const session = await auth();
  if (!session)
    return NextResponse.json(
      { success: false, error: "Not authorized" },
      { status: 401 },
    );
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
  const newTicket = await prisma.ticket.create({
    data: { ...result.data, createdByUserId: session?.user.id! },
  });
  revalidatePath("/tickets");
  return NextResponse.json({ success: true, data: newTicket }, { status: 201 });
}
