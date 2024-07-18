import {  CircleCheckBig, XCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { verifyEmail } from "@/app/(root)/_actions/userAction";

interface Props {
  token: string;
}

export default async function VerifyEmail({ token}: Props) {
  const { success } = await verifyEmail(token);
  if (!success) {
    return (
      <div className="flex flex-col items-center gap-2 mt-10">
        <XCircle className="h-8 w-8 text-red-600" />
        <h3 className="font-semibold text-xl">There was a problem</h3>
        <p className="text-muted-foreground text-sm">
          This token is not valid or might be expired. Please try again.
        </p>
      </div>
    );
  } 
   if (success) {
    return (
      <div className="flex h-full flex-col items-center justify-center mt-10">
   <CircleCheckBig width='32' height='32' className="text-green-500"/>

        <h3 className="font-semibold text-2xl">You&apos;re all set!</h3>
        <p className="text-muted-foreground text-center mt-1">
          Thank you for verifying your email.
        </p>
        <Link className={buttonVariants({ className: "mt-4" })} href="/sign-in">
          Sign in
        </Link>
      </div>
    );
  } 
}
