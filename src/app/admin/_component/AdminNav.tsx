"use client";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { ModeToggle } from "@/components/ModeToggle";
import { Button } from "@/components/ui/button";
import { Bell, Home, Mail } from "lucide-react";
import Image from "next/image";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { RouteNav } from "./RouteNav";
import useScreenWidth from "@/hooks/useScreen";
import Sidebar from "./Sidebar";
import SideBarMobile from "./SideBarMobile";

export default function AdminNav() {
  const isNonMobileScreens = useScreenWidth("920px");
  // const [side, setSide] = useState(false);
  // const router = useRouter();
  // const pathname = usePathname();
  // const searchParams = useSearchParams();
  // const createQueryString = useCallback(
  //   (name: string, value: string) => {
  //     const params = new URLSearchParams(searchParams.toString());
  //     params.set(name, value);

  //     return params.toString();
  //   },
  //   [searchParams]
  // );
  // const onClick = () => {
  //   setSide(!side);

  //   router.push(pathname + "?" + createQueryString("isAside", `${side}`));
  // };

  return (
    <MaxWidthWrapper>
      <>
        <div className=" h-16 flex items-center justify-between  border-b-[1px] border-slate-300  dark:border-slate-700">
          <div className="flex items-center ">
            {/* {!isNonMobileScreens ? (
              <SideBarMobile />
            ) : (
              <button
                onClick={onClick}
                className="group flex items-center pr-6 "
              >
                <div className="flex flex-col  gap-2 group py-3">
                  <div className="h-[2px] w-9 bg-black dark:bg-white" />
                  <div className="h-[2px] w-9 bg-black dark:bg-white group-hover:animate-move-right group-hover:cursor-pointer" />
                </div>
              </button>
            )} */}
            {!isNonMobileScreens && <SideBarMobile/>}
            <div className="hidden sm:flex  items-center gap-2">
              <Home width="18" /> <RouteNav />
            </div>
          </div>

          <div className="flex items-center gap-6">
            <ModeToggle />
            <Mail />
            <Bell />
            <Image
              src="/passport.jpg"
              alt="ceo"
              width="40"
              height="40"
              className="rounded-full border-[2px] border-green-500"
            />
          </div>
        </div>
        <div className="sm:hidden flex  items-center gap-2 border-b-[1px] border-slate-300  dark:border-slate-700  py-1">
          <Home width="18" /> <RouteNav />
        </div>
      </>
    </MaxWidthWrapper>
  );
}
