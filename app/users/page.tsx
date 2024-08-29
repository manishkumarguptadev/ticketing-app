import { Button } from "@/components/ui/button";
import Link from "next/link";

function UsersPage() {
  return (
    <>
      <Button asChild>
        <Link href="/users/new">New User</Link>
      </Button>
    </>
  );
}

export default UsersPage;
