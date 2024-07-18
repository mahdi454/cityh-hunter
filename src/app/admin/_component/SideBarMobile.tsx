import { Icons } from "@/components/Icons";
import {
    Sheet,
    SheetContent,
    SheetTrigger,
  } from "@/components/ui/sheet";
  import { ADMIN_LINKS } from "@/config/adminLink";
import Link from "next/link";

export default function SideBarMobile() {
    return (
        <Sheet>
          <SheetTrigger className="group flex items-center py-1 pr-6">
            <div className="flex flex-col  gap-2 group py-3">
              <div className="h-[2px] w-10 bg-black dark:bg-white" />
              <div className="h-[2px] w-10 bg-black dark:bg-white group-hover:animate-move-right group-hover:cursor-pointer" />
            </div>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px]">
            <aside
              className={`flex flex-col w-[280px] px-4  sticky h-screen top-0 left-0`}
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
          </SheetContent>
        </Sheet>
      );
                  }