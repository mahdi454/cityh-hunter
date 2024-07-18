"use client";
import { buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { Search } from "lucide-react";
import Image from "next/image";
import { Icons } from "./Icons";

export function SearchC() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="outline-none">
        <Search />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        side="bottom"
        className=" mt-3.5  h-[300px] rounded-sm shadow-2xl min-w-[360px] lg:w-[520px] mx-4 sm:mx-0"
      >
        <div className="group relative z-0 my-2 w-full ">
          <input
            type="email"
            name="floating_email"
            className="peer block w-full border-b-[1px] border-slate-700 bg-transparent px-2 pb-2  pt-4  text-base outline-none dark:border-gray-600 dark:text-white"
            placeholder=""
          />
          <label
            htmlFor="floating_email"
            className=" absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform pl-1 text-lg text-gray-600 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-6 peer-focus:scale-75  peer-focus:font-medium dark:text-gray-400 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4"
          >
            What are you looking for?
          </label>
        </div>
        <div className="flex gap-10 px-1">
          <ul>
            <li className="font-semibold text-sm tracking-widest mb-2">TRENDING SEARCHES</li>
            <li className="flex items-center gap-1 text-sm mb-1"><Icons.SearchI/>
            <div className="group">
            Mother's Day Gifts
            <div className="h-[1px] w-full bg-black dark:bg-white group-hover:animate-move-right group-hover:cursor-pointer" />
            </div>
            </li>
            <li className="flex items-center gap-1 text-sm mb-1"><Icons.SearchI/>
            <div className="group">
            For Him
            <div className="h-[1px] w-full bg-black dark:bg-white group-hover:animate-move-right group-hover:cursor-pointer" />
            </div>
            </li>
            <li className="flex items-center gap-1 text-sm mb-1"><Icons.SearchI/>
            <div className="group">
            For Her
            <div className="h-[1px] w-full bg-black dark:bg-white group-hover:animate-move-right group-hover:cursor-pointer" />
            </div>
            </li>

          </ul>
          <ul >
            <li className="font-semibold text-sm  tracking-widest mb-2">WHAT'S NEW</li>
            <li className="flex items-center gap-1 text-sm mb-1">
            <div className="group">
            Men
            <div className="h-[1px] w-full bg-black dark:bg-white group-hover:animate-move-right group-hover:cursor-pointer" />
            </div>
            </li>
            <li className="flex items-center gap-1 text-sm">
            <div className="group">
            Women
            <div className="h-[1px] w-full bg-black dark:bg-white group-hover:animate-move-right group-hover:cursor-pointer" />
            </div>
            </li>

          </ul>
  
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
