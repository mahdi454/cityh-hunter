"use client";
import Link from "next/link";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { Icons } from "./Icons";
import MenuTop from "./MenuTop";
import NavItemL from "./NavItemL";
import NavItemR from "./NavItemR";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const url = usePathname();
  if (url.includes("admin")) return;
  return (
    <div className="fixed w-screen top-4  z-40 sm:-translate-x-1.5 ">
      <MaxWidthWrapper  >
        <div
          className=" w-full rounded-lg  "
          style={{ backgroundColor: "rgba(99, 98, 98, 0.623)" }}
        >
          <div className="flex h-14 items-center justify-between rounded-lg backdrop-blur-sm backdrop-filter px-2 ">
            <div className="flex  ">
              <Link href="/">
                <Icons.Logo2
                  className=" h-10 w-10 dark:fill-white mb-1"
                  viewBox="20 15 60 60"
                />
              </Link>
            </div>
            <div className="z-40 ml-2 hidden lg:block lg:self-stretch">
              <NavItemL />
            </div>
            <p className="mx-auto px-2 font-semibold tracking-widest hidden lg:block ">
              City Hunter
            </p>
            <div className="items-center flex gap-4">
              <NavItemR />
              <MenuTop />
            </div>
          </div>
        </div>
      </MaxWidthWrapper>
    </div>
  );
}
