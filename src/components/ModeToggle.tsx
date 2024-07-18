"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function ModeToggle() {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="outline-none ">
        <div className="group flex items-center  ">
          <Sun className="dark:hidden" />
          <Moon className="hidden dark:flex" />
        </div>

      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="mt-3.5 rounded-sm">
        <DropdownMenuItem className="p-2 hover:bg-slate-200 dark:hover:bg-slate-800" onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem className="p-2 hover:bg-slate-200 dark:hover:bg-slate-800" onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem className="p-2 hover:bg-slate-200 dark:hover:bg-slate-800" onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
