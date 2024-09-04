import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import prisma from "@/prisma/client";
import Link from "next/link";

async function UsersPage() {
  const users = await prisma.user.findMany();
  return (
    <>
      <div className="mb-4 flex items-center">
        <Button asChild>
          <Link href="/users/new">New User</Link>
        </Button>
      </div>
      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow className="bg-accent hover:bg-accent">
              <TableHead>Name</TableHead>
              <TableHead className="hidden sm:table-cell">Role</TableHead>
              <TableHead className="hidden md:table-cell">Created</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <div className="font-medium">{user.name}</div>
                  <div className="flex gap-2 py-1 sm:pb-0">
                    <Badge
                      className={`${
                        user.role === "USER"
                          ? "bg-yellow-50 text-yellow-500"
                          : user.role === "TECH"
                            ? "bg-green-50 text-green-500"
                            : "bg-violet-50 text-violet-500"
                      } sm:hidden`}
                      variant={"outline"}
                    >
                      {user.role}
                    </Badge>
                  </div>
                  <div className="font-medium md:hidden">
                    {user.createdAt.toLocaleDateString("en-US", {
                      year: "2-digit",
                      month: "2-digit",
                      day: "2-digit",
                      hour: "numeric",
                      minute: "2-digit",
                      hour12: true,
                    })}
                  </div>
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  <Badge
                    className={`${
                      user.role === "USER"
                        ? "bg-yellow-50 text-yellow-500"
                        : user.role === "TECH"
                          ? "bg-green-50 text-green-500"
                          : "bg-violet-50 text-violet-500"
                    }`}
                    variant={"outline"}
                  >
                    {user.role}
                  </Badge>
                </TableCell>

                <TableCell className="hidden md:table-cell">
                  {user.createdAt.toLocaleDateString("en-US", {
                    year: "2-digit",
                    month: "2-digit",
                    day: "2-digit",
                    hour: "numeric",
                    minute: "2-digit",
                    hour12: true,
                  })}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}

export default UsersPage;
