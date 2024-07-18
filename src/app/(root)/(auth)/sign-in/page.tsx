"use client";
import { Icons } from "@/components/Icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { AuthLoginValidator, TAuthLoginValidator } from "@/lib/validators";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, X } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { signIn } from "next-auth/react";

export default function Page() {
  const router = useRouter();
  const [searchParams = []] = useSearchParams();
  const callbackUrl = searchParams[1];
  const close = () => router.push("/");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TAuthLoginValidator>({
    resolver: zodResolver(AuthLoginValidator),
  });

  const LoginForm = async (values: TAuthLoginValidator) => {
    const loginData = await signIn("credentials", {
      email: values.email,
      password: values.password,
      callbackUrl: callbackUrl?.includes("checkout")
        ? "http://localhost:3000/checkout"
        : "http://localhost:3000",
    });
    if (loginData?.status === 200) {
      toast.success(`Logged in successfully`);
    }
    if (loginData?.status === 401) {
      toast.error("Invalid email adress or password!.");
    }
  };
  return (
    <div className="fixed top-0 left-0 h-screen w-full backdrop-blur-[1px] z-50">
      <div className=" w-full h-screen bg-slate-200 dark:bg-black sm:absolute sm:top-[50%] sm:left-[50%] sm:w-[420px] sm:h-[500px] sm:translate-x-[-50%] sm:translate-y-[-50%] sm:rounded-xl mt-6">
        <div className="relative flex pt-2 px-2 gap-4 items-center">
          <button
            className=" p-1.5 hover:bg-background rounded-full dark:hover:bg-slate-800"
            onClick={close}
          >
            <X />
          </button>
        </div>
        <div className="container relative  flex justify-center ">
          <div className="mx-auto w-full space-y-4 flex  flex-col ">
            <div className="flex flex-col items-center  text-center gap-1 ">
              <Icons.Logo2
                className="h-14 w-28 mr-2 dark:fill-white"
                viewBox="0 20 100 60"
              />
              <h1 className="text-xl font-bold ">Sign in to your account</h1>
              <p className="flex items-center gap-2">
                Don&apos;t have an account?
                <Link
                  href="/sign-up"
                  className="flex items-center font-semibold tracking-wide gap-1 text-sky-600 hover:underline"
                >
                  {" "}
                  Create One
                  <ArrowRight className=" h-5 w-5" />
                </Link>
              </p>
            </div>
            <div className="grid gap-6">
              <form onSubmit={handleSubmit(LoginForm)}>
                <div className="grid gap-1">
                  <div className="space-y-1">
                    <Label htmlFor="email"> Email</Label>
                    <Input
                      {...register("email")}
                      type="email"
                      placeholder="You@example.com"
                      className={cn({
                        "focus-visible:ring-red-500 mt-1": errors.email,
                      })}
                    />
                    {errors.email && (
                      <span className="text-sm text-red-600">
                        {errors.email?.message}
                      </span>
                    )}
                  </div>
                  <div className="space-y-1 mb-4">
                    <Label htmlFor="password"> Password</Label>
                    <Input
                      {...register("password")}
                      type="password"
                      placeholder="Password"
                      className={cn({
                        "focus-visible:ring-red-500 mt-1": errors.password,
                      })}
                    />
                    {errors.password && (
                      <span className="text-sm text-red-600">
                        {errors.password?.message}
                      </span>
                    )}
                  </div>
                  <Button>Sign Up</Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
