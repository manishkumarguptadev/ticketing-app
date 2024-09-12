import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import UserRoleSelect from "../../UserRoleSelect";

function EditUserPage() {
  return (
    <div className="mx-auto max-w-xl">
      <Card>
        <CardHeader>
          <CardTitle className="text-muted-foreground">Edit User</CardTitle>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="fullname">Full name</Label>
                <Input
                  id="fullname"
                  type="text"
                  className="w-full"
                  placeholder="Full name"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  className="w-full"
                  placeholder="User Name"
                />{" "}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="text"
                  className="w-full"
                  placeholder="Password"
                />{" "}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="confirmpassword">Confirm Password</Label>
                <Input
                  id="confirmpassword"
                  type="text"
                  className="w-full"
                  placeholder="Confirm Password"
                />{" "}
              </div>
              <div className="flex gap-4">
                <UserRoleSelect />
              </div>

              <Button type="submit" className="max-w-32">
                Edit User
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default EditUserPage;
