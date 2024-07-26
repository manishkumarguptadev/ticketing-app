import { ticketSchema } from "@/ValidationSchemas/ticketSchema";
import prisma from "@/prisma/client";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
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

  const newTicket = await prisma.ticket.create({ data: { ...result.data } });
  revalidatePath("/tickets");
  return NextResponse.json({ success: true, data: newTicket }, { status: 201 });
}
