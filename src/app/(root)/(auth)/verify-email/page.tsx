import VerifyEmail from "@/components/VerifyEmail";
import { CircleCheckBig } from "lucide-react";

interface PageProps {
  searchParams: {
    [key: string]: string | string[] | string[] | undefined;
  };
}

export default function page({ searchParams }: PageProps) {
  const token = searchParams.token;
  const emailTo = searchParams.to;
  return (
    <div className="container relative flex pt-16 flex-col items-center justify-center lg:px-0 ">
      <div className="mx-auto flex w-full flex-col justify-center sm:w-[350px] space-y-6">
        {token && typeof token === "string" ? (
          <div className="grid gap-6">
            <VerifyEmail token={token} />
          </div>
        ) : (
          <div className="flex h-full flex-col items-center justify-center space-y-1 mt-12">
            <CircleCheckBig width="32" height="32" className="text-green-500" />

            <h3 className="font-semibold text-2xl">Check your email</h3>
            {emailTo ? (
              <p className="text-muted-foreground text-center">
                We&apos;ve sent a verfication link to{" "}
                <span className="font-semibold">{emailTo}</span>
              </p>
            ) : (
              <p className="text-muted-foreground text-center">
                We&apos;ve sent a verfication link to your email
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
