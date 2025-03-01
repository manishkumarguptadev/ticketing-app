import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { signIn, signOut, useSession } from "next-auth/react";
import { HiOutlineUserCircle } from "react-icons/hi2";

function AuthStatus() {
  const { status, data: session } = useSession();
  if (status === "loading")
    return <Skeleton className="h-10 w-10 rounded-full" />;
  if (status === "unauthenticated")
    return (
      <Button
        variant={"outline"}
        onClick={() => signIn()}
        className="rounded-full bg-muted"
      >
        Sign in
      </Button>
    );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="rounded-full">
        <HiOutlineUserCircle className="h-8 w-8" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        <DropdownMenuLabel>{session?.user?.name}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => signOut()} className="cursor-pointer">
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default AuthStatus;
