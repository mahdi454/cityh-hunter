import {  ArrowRight, MoveRight, ShoppingBag, ShoppingCart } from "lucide-react";
import {
  SheetTrigger,
  Sheet,
  SheetHeader,
  SheetContent,
  SheetTitle,
  SheetFooter,
} from "./ui/sheet";
import { formatPrice } from "@/lib/utils";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { Icons } from "./Icons";
import Image from "next/image";

export default function Cart12() {
  const itemCount =3 ;
  const fee = 2;
  return (
    <Sheet>
      <SheetTrigger className="relative group flex items-center">
        <Image width='24' height='24' src="/bag2.svg" alt="bag"  />
       <span className="absolute right-[2px] bottom-[1px]  dark:text-white text-xs font-semibold ">{itemCount}</span>
      </SheetTrigger>
      <SheetContent className="flex w-full flex-col pr-0 md:max-w-md lg:max-w-lg ">
        <SheetHeader className="space-y-2.5 pr-6">
          <SheetTitle>Cart ({itemCount})</SheetTitle>
        </SheetHeader>
        {itemCount > 0 ? (
          <>
            <div className="flex w-full flex-col pr-6">cart items</div>
            <div className="space-y-4 pr-6">
              <div className="space-y-1.5 text-sm">
                <div className="flex">
                  <span className="flex-1">Shipping</span>
                  <span>free</span>
                </div>
                <div className="flex">
                  <span className="flex-1">Transaction Fee</span>
                  <span>{formatPrice(fee, { currency: "USD" })}</span>
                </div>
              </div>
              <SheetFooter>
                <SheetTrigger asChild>
                  <Link
                    href="/cart"
                    className={buttonVariants({ className: "w-full" })}
                  >
                    Continue to Checkout
                  </Link>
                </SheetTrigger>
              </SheetFooter>
            </div>
          </>
        ) : (
          <div className="flex h-full items-center justify-center flex-col space-y-1">
            <div className="relative flex justify-center items-center mb-4 text-muted-foreground h-60 w-60">
              <Icons.Logo1 className="relative h-40 dark:fill-white" />
              <span
                className="absolute top-24 left-24 text-8xl sm text-black dark:text-white"
                aria-hidden="true"
              >
                +
              </span>
            </div>
            <div className="text-xl font-semibold">Your cart is empty</div>
            <SheetTrigger asChild>
              <Link
                href="/product"
                className={buttonVariants({
                  variant: "link",
                  size: "sm",
                  className: "text-sm text-muted-foreground",
                })}
              >
                Add items to your cart to checkout 
             <ArrowRight className="h-4 w-4 ml-2"/>
              
              </Link>
            </SheetTrigger>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
