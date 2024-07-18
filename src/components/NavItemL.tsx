"use client";

import { NAV_CATEGORIES } from "@/config/Index";
import { useEffect, useRef, useState } from "react";
import { useClickOutside } from "@/hooks/ClickOutSide";
import { Button } from "./ui/button";


export default function NavItemL() {
  const [active, setActive] = useState<null | number>(null);
  const isAnyOpen = active !== null;
  const navRef = useRef<HTMLDivElement | null>(null);
  useClickOutside(navRef, () => setActive(null));
  useEffect(() => {
    const escHandler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
    };
    document.addEventListener("keydown", escHandler);
    return () => {
      document.removeEventListener("keydown", escHandler);
    };
  }, []); 
  return (
    <div onClick={(e) => e.target} ref={navRef} className=" flex gap-4 h-full">
      {NAV_CATEGORIES.map((category, i) => {
        const handleOpen = () => {
          if (active === i) {
            setActive(null);
          } else {
            setActive(i);
          }
        };

        const isOpen = i === active;
        return (
          <div key={category.label} className="flex items-center">
          <Button onClick={handleOpen} variant={isOpen ? "secondary" : "ghost"} >
            {category.label}
          
          </Button>
        </div>
        );
      })}
    </div>
  );
}



