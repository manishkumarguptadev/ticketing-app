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
import Link from "next/link";

function UsersPage() {
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
            <TableRow>
              <TableCell>
                <div className="font-medium">Liam Johnson</div>
                <div className="flex gap-2 py-1 sm:pb-0">
                  <Badge className="sm:hidden">User</Badge>
                </div>
                <div className="font-medium md:hidden">2023-06-23</div>
              </TableCell>
              <TableCell className="hidden sm:table-cell">
                <Badge>User</Badge>
              </TableCell>

              <TableCell className="hidden md:table-cell">2023-06-23</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </>
  );
}

export default UsersPage;
