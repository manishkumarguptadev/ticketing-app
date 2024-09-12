import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import EditUserForm from "./EditUserForm";

async function EditUserPage({ params }: { params: { id: string } }) {
  const user = await prisma.user.findUnique({
    where: { id: params.id },
  });
  if (!user) notFound();

  const { password, ...userWithoutPassword } = user;

  return <EditUserForm user={userWithoutPassword} />;
}

export default EditUserPage;
