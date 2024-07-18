import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { Special_Elite } from "next/font/google";
import GetBestSeller from "./_component/GetBestSeller";
import Perks from "@/components/Perks";

export const heroFont = Special_Elite({
  subsets: ["latin"],
  display: "auto",
  variable: "--font-outfit",
  weight: "400",
});

export default async function Home() {
  return (
    <section className="relative min-h-screen w-full ">
      {/* <VideoPlayer /> */}
      <MaxWidthWrapper>
        <div className=" w-full  flex flex-col justify-center items-center mt-24 ">
          <h1
            className={cn(
              "text-lg sm:text-2xl font-semibold sm:font-extralight tracking-widest text-gray-950  dark:text-gray-50 w-64 sm:w-fit text-center",
              heroFont.className
            )}
          >
            It smells comfortable and elegant
          </h1>
          <div className="flex flex-col sm:flex-row gap-4 mt-4 ">
            <Button className="w-36 tracking-wide text-base ">
              Go for her
            </Button>
            <button className="py-1.5  border-[1px] border-slate-700 dark:border-slate-200 rounded-lg hover:opacity-70 w-36 tracking-wide text-base">
              Go for him &rarr;
            </button>
          </div>
        </div>
        <GetBestSeller />
        <Perks />
      </MaxWidthWrapper>
    </section>
  );
}
