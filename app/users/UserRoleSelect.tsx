"use client";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function UserRoleSelect() {
  return (
    <div className="grid w-48 gap-2">
      <Label htmlFor="status">Role</Label>
      <Select onValueChange={(value) => console.log(value)} defaultValue="USER">
        <SelectTrigger id="role" aria-label="Select Role">
          <SelectValue placeholder="Select Role" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="ADMIN">Admin</SelectItem>
          <SelectItem value="TECH">Tech</SelectItem>
          <SelectItem value="USER">User</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}

export default UserRoleSelect;
