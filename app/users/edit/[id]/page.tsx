import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import EditUserForm from "./EditUserForm";
import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/_options";
import NotAuthorized from "@/components/not-authorized";

async function EditUserPage({ params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!(session?.user.role === "ADMIN")) return <NotAuthorized />;
  const user = await prisma.user.findUnique({
    where: { id: params.id },
  });
  if (!user) notFound();

  const { password, ...userWithoutPassword } = user;

  return <EditUserForm user={userWithoutPassword} />;
}

export default EditUserPage;
