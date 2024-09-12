"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { TableCell } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import axios from "axios";
import { MoreVertical } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

function MoreOptions({ id }: { id: string }) {
  const router = useRouter();
  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`/api/users/${id}`);
      router.refresh();
      toast.success("User deleted successfully");
    } catch (error) {
      toast.error("User could not be deleted");
    }
  };
  return (
    <TableCell>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size="icon" variant="ghost">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem>
            <Link className="w-full" href={`/users/edit/${id}`}>
              Edit
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem
            className={cn("cursor-pointer focus:bg-destructive")}
            onClick={() => handleDelete(id)}
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </TableCell>
  );
}

export default MoreOptions;
