import {  User } from "lucide-react";
import { ModeToggle } from "./ModeToggle";
import Cart from "./Cart";
import { SearchC } from "./Search";
import { Account } from "./Account";


export default function NavItemR() {

  return (
    <div className="flex items-center gap-4 md:gap-6  ">
    <SearchC/>
    <ModeToggle />
    <Account/>
    <Cart />
  </div>
  )
}



