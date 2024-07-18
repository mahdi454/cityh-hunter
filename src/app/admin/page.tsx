"use client";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { redirect } from "next/navigation";

export default function Page() {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/sign-in?callbackUrl=/sign-in");
    },
  });



  if (!session?.user) return;
  return (
    <MaxWidthWrapper>
      <section className="flex flex-col gap-12 items-center z-50">
        <h1 className="text-5xl">welcome to admin page</h1>
        <p className="text-3xl max-w-2xl text-center">
          You are logged in as admin just make sure upload correct products for
          each categories.
        </p>
        <Link href="/" className="text-3xl underline pt-80 pb-96">
          Return to Home Page
        </Link>
      </section>
    </MaxWidthWrapper>
  );
}
