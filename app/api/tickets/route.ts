import { ticketSchema } from "@/ValidationSchemas/ticketSchema";
import authOptions from "@/app/auth/_options";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session)
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

  const newTicket = await prisma.ticket.create({
    data: { ...result.data, createdByUserId: session?.user.id! },
  });
  revalidatePath("/tickets");
  return NextResponse.json({ success: true, data: newTicket }, { status: 201 });
}
