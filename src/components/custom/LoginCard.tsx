"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signIn } from "@/api";
import { useAuth } from "@/providers/AuthProvider";
import loginValidator from "@/validators/loginValidator";
import { useFormik } from "formik";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { triggerToast } from "@/utils/triggerToast";

const LoginCard = () => {
  const { setUser } = useAuth();
  const router = useRouter();

  const { errors, values, handleChange, handleBlur, handleSubmit } = useFormik({
    initialValues: { email: "", password: "" },
    onSubmit: async (values) => {
      const { data, err } = await signIn(values.email, values.password);
      if (err) {
        triggerToast(err.response.data.err);
        return;
      }
      localStorage.setItem(
        "containrx-user",
        JSON.stringify({ email: values.email, token: data.token })
      );
      setUser({ email: values.email, token: data.token });
      router.replace("/");
    },
    validateOnBlur: false,
    validateOnChange: false,
    validationSchema: loginValidator,
  });

  return (
    <Card className="w-[400px]">
      <CardHeader>
        <div className="flex items-center justify-center">
          <Image width={120} height={120} src="/logo.png" alt="project-logo" />
        </div>
        <CardTitle className="text-center text-lg">
          Modern platform for container orchestration
        </CardTitle>
        <CardDescription className="text-center">
          Deploy your containers in one-click.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Email</Label>
              <Input
                autoComplete="email"
                className="py-6"
                id="email"
                name="email"
                placeholder="Enter your email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
              />
              <p className="text-xs text-red-500">{errors.email}</p>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input
                autoComplete="current-password"
                className="py-6"
                id="password"
                name="password"
                placeholder="Enter password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                type="password"
              />
              <p className="text-xs text-red-500">{errors.password}</p>
            </div>
          </div>
          <Button
            type="submit"
            size="lg"
            className="w-full py-6 cursor-pointer mt-6"
          >
            Login
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default LoginCard;
