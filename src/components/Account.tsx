"use client";

import * as React from "react";
import {
  ArrowRight,
  CircleDollarSign,
  CreditCard,
  Gift,
  Heart,
  ListOrdered,
  LockKeyhole,
  Mail,
  MessagesSquare,
  Moon,
  Package,
  Sun,
  Truck,
  User,
} from "lucide-react";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "./ui/dialog";

export function Account() {
  const { data: session } = useSession();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="rounded-text-base outline-none">
        <User />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="mt-3.5 w-[280px] shadow-2xl mx-4 sm:mx-0"
      >
        <ul className="pl-1">
          <li className="mb-1  mt-2 text-center font-semibold tracking-widest">
            Your Account
          </li>
          <Link href="#">
            <li className="mb-2 flex items-center gap-2 text-base group">
              <Package width="20" height="20" />
              <div>
                My Oreders
                <div className="underline_link" />
              </div>
            </li>
          </Link>
          <Link href="/wishlist">
            <li className="mb-2 flex items-center gap-2 text-base group">
              <Heart width="20" height="20" />
              <div>
                Wish List
                <div className="underline_link" />
              </div>
            </li>
          </Link>
          <Link href="#">
            <li className="mb-2 flex items-center gap-2 text-base group">
              <Truck width="20" height="20" />
              <div>
                Shipping Addresses
                <div className="underline_link" />
              </div>
            </li>
          </Link>
          <Link href="#">
            <li className="mb-2 flex items-center gap-2 text-base group">
              <CreditCard width="20" height="20" />
              <div>
                Payment Methods
                <div className="underline_link" />
              </div>
            </li>
          </Link>
          <Link href="#">
            <li className="mb-2 flex items-center gap-2 text-base group">
              <LockKeyhole width="20" height="20" />
              <div>
                Password & Personal Info
                <div className="underline_link" />
              </div>
            </li>
          </Link>
          <Link href="#">
            <li className="mb-2 flex items-center gap-2 text-base group">
              <Mail width="20" height="20" />
              <div>
                Email & Mail Preferences
                <div className="underline_link" />
              </div>
            </li>
          </Link>
        </ul>
        <div className="px-1 pt-4">
          <div>
            {session?.user ? (
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="w-full">Log Out</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <h2 className="text-xl font-semibold tracking-wide">
                    Are you sure you want to sign out?{" "}
                  </h2>
                  <Button
                    onClick={() =>
                      signOut({ callbackUrl: process.env.PUBLIC_SERVER_URL })
                    }
                  >
                    Log Out
                  </Button>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button
                        type="button"
                        variant="outline"
                        className="w-full"
                      >
                        Cancel
                      </Button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            ) : (
              <>
                <Link
                  href="/sign-in"
                  className={buttonVariants({ className: "mb-2 w-full" })}
                >
                  <DropdownMenuItem className="w-full flex justify-center items-center">
                    Sign In
                  </DropdownMenuItem>
                </Link>
                <Link
                  href="/sign-up"
                  className={buttonVariants({
                    variant: "outline",
                    className: "w-full",
                  })}
                >
                  <DropdownMenuItem className="w-full flex justify-center items-center">
                    Create One
                  </DropdownMenuItem>
                </Link>
              </>
            )}
          </div>
          <div className="mb-2 mt-6">
            <h3 className="mb-1 text-lg font-bold">We're here to help, 24/7</h3>
            <div className="mb21 flex items-center gap-2 text-base">
              <MessagesSquare width="20" height="20" />
              <div>
                Contact Us
                <div className="underline_link" />
              </div>
            </div>
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
