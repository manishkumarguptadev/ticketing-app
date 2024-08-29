"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import UserRoleSelect from "../UserRoleSelect";

import axios from "axios";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

import { userSchema } from "@/ValidationSchemas/userSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { z } from "zod";

type FormData = z.infer<typeof userSchema>;

function NewUserPage() {
  const router = useRouter();
  const { register, handleSubmit, formState, control } = useForm<FormData>({
    mode: "all",
    resolver: zodResolver(userSchema),
  });

  const { isValid, isSubmitting, errors } = formState;

  const onSuccess: SubmitHandler<FormData> = async (data) => {
    try {
      await axios.post("/api/users", data);
      toast.success("User created successfully.");
      router.push("/users");
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong. Please Try again.");
    }
  };
  return (
    <div className="mx-auto max-w-xl">
      <Card>
        <CardHeader>
          <CardTitle className="text-muted-foreground">New User</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSuccess)}>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="fullname">Full name</Label>
                <Input
                  id="fullname"
                  {...register("name")}
                  type="text"
                  className="w-full"
                  placeholder="Full name"
                />
                {errors.name && (
                  <p className="text-xs text-destructive">
                    {errors.name.message}
                  </p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  {...register("username")}
                  type="text"
                  className="w-full"
                  placeholder="User Name"
                />{" "}
                {errors.username && (
                  <p className="text-xs text-destructive">
                    {errors.username.message}
                  </p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  {...register("password")}
                  type="text"
                  className="w-full"
                  placeholder="Password"
                />{" "}
                {errors.password && (
                  <p className="text-xs text-destructive">
                    {errors.password.message}
                  </p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="confirmpassword">Confirm Password</Label>
                <Input
                  id="confirmpassword"
                  {...register("confirmPassword")}
                  type="text"
                  className="w-full"
                  placeholder="Confirm Password"
                />{" "}
                {errors.confirmPassword && (
                  <p className="text-xs text-destructive">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>
              <div className="flex gap-4">
                <Controller
                  control={control}
                  name="role"
                  render={({ field: { value = "USER", onChange } }) => (
                    <UserRoleSelect value={value} onChange={onChange} />
                  )}
                />
              </div>

              <Button
                type="submit"
                className="max-w-32"
                disabled={!isValid || isSubmitting}
              >
                {isSubmitting ? "Creating" : "Create User"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default NewUserPage;
