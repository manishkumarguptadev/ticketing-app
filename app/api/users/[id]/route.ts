import prisma from "@/prisma/client";
import { userPatchSchema } from "@/ValidationSchemas/userSchema";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
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
  return NextResponse.json(
    { success: true, data: updatedUser },
    { status: 200 },
  );
}