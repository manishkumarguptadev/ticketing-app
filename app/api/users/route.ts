import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import prisma from "@/prisma/client";
import { userSchema } from "@/ValidationSchemas/userSchema";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";

export async function POST(request: NextRequest) {
  const session = await auth();
  if (!(session?.user.role === "ADMIN"))
    return NextResponse.json(
      { success: false, error: "Not authorized" },
      { status: 401 },
    );
  const body = await request.json();
  const result = userSchema.safeParse(body);

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
  const duplicate = await prisma.user.findUnique({
    where: {
      username: result.data.username,
    },
  });

  if (duplicate) {
    return NextResponse.json(
      { success: false, error: "Username already exists" },
      { status: 409 },
    );
  }

  const hashedPassword = await bcrypt.hash(result.data.password, 10);
  const { confirmPassword, ...user } = result.data;

  const newUser = await prisma.user.create({
    data: { ...user, password: hashedPassword },
  });
  revalidatePath("/users");
  return NextResponse.json({ success: true, data: newUser }, { status: 201 });
}

export async function GET(request: NextRequest) {
  const session = await auth();
  if (!(session?.user.role === "ADMIN"))
    return NextResponse.json(
      { success: false, error: "Not authorized" },
      { status: 401 },
    );
  const users = await prisma.user.findMany();

  return NextResponse.json({ success: true, data: users }, { status: 200 });
}
