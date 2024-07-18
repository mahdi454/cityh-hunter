"use client";
import { Icons } from "@/components/Icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import {
  AuthCreateUserValidator,
  TAuthCreateUserValidator,
} from "@/lib/validators";
import { createUser } from "@/app/(root)/_actions/userAction";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { ZodError } from "zod";
import { useCloseOut } from "@/hooks/useClose";
export default function Page() {
  const router = useRouter();
  const close = () => router.push('/');
  const ref= useCloseOut(close)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TAuthCreateUserValidator>({
    resolver: zodResolver(AuthCreateUserValidator),
  });

  const onSubmit = async ({
    username,
    email,
    password,
  }: TAuthCreateUserValidator) => {
    try {
      const { success,sentToEmail,message } = await createUser({ username, email, password });
      if(success) {
        toast.success(`Verification email sent to ${sentToEmail}.`);
        router.push("/verify-email?to=" + sentToEmail);
      }
      if(!success) {
        toast.success(message);
        
      }

    } catch (err: any) {
      if (err instanceof ZodError) {
        toast.error("Something went wrong, please try again.");
      } else {
        toast.error(err.message);
      } 
    }
  };
  return (
    <div className="fixed top-0 left-0 h-screen w-full backdrop-blur-[1px] z-50">
    <div className=" w-full h-screen bg-slate-200 dark:bg-black sm:absolute sm:top-[50%] sm:left-[50%] sm:w-[420px] sm:h-[520px] sm:translate-x-[-50%] sm:translate-y-[-50%] sm:rounded-xl mt-8" >
      <div className="absolute flex pt-2 px-2 gap-4 items-center z-50">
        <button
          className=" p-1.5 hover:bg-background rounded-full dark:hover:bg-slate-800"
          onClick={close}
        >
          <X />
        </button>
      </div>
      <div className="container relative  flex justify-center items-center pt-4">
        <div className="mx-auto w-full space-y-3 flex justify-center flex-col">
          <div className="flex flex-col items-center  text-center gap-1 ">
            <Icons.Logo2
              className="h-14 w-28 mr-2 dark:fill-white"
              viewBox="0 20 100 60"
            />
            <h1 className="text-2xl font-bold ">Create an account</h1>
            <p className="flex items-center gap-2">
              Already have an account?
              <Link
                href="/sign-in"
                className="flex items-center font-semibold tracking-wide gap-1 text-sky-600 hover:underline"
              >
                {" "}
                Sign-in
                <ArrowRight className=" h-5 w-5" />
              </Link>
            </p>
          </div>
          <div className="grid">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid gap-1">
                <div className="space-y-1">
                  <Label htmlFor="username"> Username</Label>
                  <Input
                    {...register("username")}
                    type="username"
                    placeholder="username"
                    name="username"
                    className={cn({
                      "focus-visible:ring-red-500": errors.username,
                    })}
                  />
                  {errors.username && (
                    <span className="text-sm text-red-600">
                      {errors.username?.message}
                    </span>
                  )}
                </div>
                <div className="space-y-1">
                  <Label htmlFor="email"> Email</Label>
                  <Input
                    {...register("email")}
                    type="email"
                    name="email"
                    placeholder="You@example.com"
                    className={cn({
                      "focus-visible:ring-red-500": errors.email,
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
                      "focus-visible:ring-red-500": errors.password,
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
