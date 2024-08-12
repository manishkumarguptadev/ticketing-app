"use client";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

function TicketStatusFilter() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Get a new searchParams string by merging the current
  // searchParams with a provided key/value pair
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);
      if (params.has("page")) params.set("page", "1");
      return params.toString();
    },
    [searchParams],
  );
  return (
    <div className="grid w-48 gap-2">
      <Label htmlFor="status">Filter by Status</Label>
      <Select
        onValueChange={(value) =>
          router.replace(pathname + "?" + createQueryString("status", value))
        }
        defaultValue={searchParams.get("status") || "ALL"}
      >
        <SelectTrigger id="status" aria-label="Select Status">
          <SelectValue placeholder="Select Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="ALL">All</SelectItem>
          <SelectItem value="OPEN">Open</SelectItem>
          <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
          <SelectItem value="CLOSED">Closed</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}

export default TicketStatusFilter;
