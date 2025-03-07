import prisma from "@/prisma/client";
import { userPatchSchema } from "@/ValidationSchemas/userSchema";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";

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

  const result = userPatchSchema.safeParse(body);

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
  const userExists = await prisma.user.findUnique({
    where: { id: params.id },
  });
  if (!userExists) {
    return NextResponse.json(
      { success: false, error: "User not found" },
      { status: 404 },
    );
  }
  let hashedPassword: string;

  if (result.data.password) {
    hashedPassword = await bcrypt.hash(result.data.password, 10);
  }
  const { confirmPassword, ...user } = result.data;

  const updatedUser = await prisma.user.update({
    where: { id: params.id },
    data: { ...user, password: hashedPassword! },
  });
  revalidatePath("/users");
  return NextResponse.json(
    { success: true, data: updatedUser },
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
  const userExists = await prisma.user.findUnique({
    where: { id: params.id },
  });
  if (!userExists) {
    return NextResponse.json(
      { success: false, error: "User not found" },
      { status: 404 },
    );
  }
  await prisma.user.delete({
    where: { id: params.id },
  });
  revalidatePath("/users");
  return NextResponse.json({ success: true, data: {} }, { status: 200 });
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const user = await prisma.user.findUnique({
    where: { id: params.id },
  });
  if (!user) {
    return NextResponse.json(
      { success: false, error: "User not found" },
      { status: 404 },
    );
  }
  return NextResponse.json({ success: true, data: user }, { status: 200 });
}
