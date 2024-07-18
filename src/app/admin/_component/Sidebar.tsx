"use client";
import { Icons } from "@/components/Icons";
import { ADMIN_LINKS } from "@/config/adminLink";
import useScreenWidth from "@/hooks/useScreen";

import Link from "next/link";

export default function Sidebar() {
  const isNonMobileScreens = useScreenWidth("920px");
  if ( !isNonMobileScreens) return null;
    return (
      <aside
        className={`flex flex-col w-[280px] px-4 col-span-2 row-span-12 sticky h-screen top-0 left-0 
    border-r-[1px] border-slate-300   dark:border-slate-700`}
      >
        <div className="px-4 pt-10">
          <Link href="/" className="flex items-center gap-2">
            <Icons.Logo2
              className=" h-12 w-12 dark:fill-white"
              viewBox="20 15 60 60"
            />
            <p className="mt-2 text-lg font-semibold tracking-wide">
              City Hunter
            </p>
          </Link>
        </div>
        <div>
          <ul className="flex flex-col gap-4 px-6 pt-10">
            {ADMIN_LINKS.map((link) => (
              <li key={link.id}>
                <Link href={link.path} className="flex items-center gap-2">
                  {link.icon}
                  <p className=" text-lg font-semibold tracking-wide">
                    {link.label}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    )


}
