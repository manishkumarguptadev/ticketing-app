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

function TicketPriorityFilter() {
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
      <Label htmlFor="priority">Filter by Priority</Label>
      <Select
        onValueChange={(value) =>
          router.replace(pathname + "?" + createQueryString("priority", value))
        }
        defaultValue={searchParams.get("priority") || "ALL"}
      >
        <SelectTrigger id="priority" aria-label="Select Priority">
          <SelectValue placeholder="Select priority" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="ALL">All</SelectItem>
          <SelectItem value="LOW">Low</SelectItem>
          <SelectItem value="MEDIUM">Medium</SelectItem>
          <SelectItem value="HIGH">High</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}

export default TicketPriorityFilter;
