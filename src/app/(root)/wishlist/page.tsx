"use client";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Button, buttonVariants } from "@/components/ui/button";
import { useCartStore } from "@/context/cartStore";
import { useAddWishList } from "@/context/wishListStore";
import { formatPrice } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Page() {
  const { cart, remove } = useAddWishList();
  const { add } = useCartStore();
  if (cart.length === 0) {
    return (
      <div className="mt-28  flex flex-col justify-center items-center">
        <p className="text-2xl font-semibold tracking-wide">

        Your wish list is empty
        </p>
        <Link
          href="/products"
          className={buttonVariants({
            variant: "link",
            className: "font-semibold text-sm text-sky-600",
          })}
        >
          Add items to your wish list to checkout later on!
          <ArrowRight className="h-4 w-4 ml-2" />
        </Link>
      </div>
    );
  }
  return (
    <MaxWidthWrapper>
        <div className="mt-24  flex flex-col justify-center items-center">
        <p className="text-2xl font-semibold tracking-wide">

        Your wish listed items
        </p>
        </div>
      <div className="mt-2 grid grid-cols-3 justify-items-center  ">
        {cart.map((item) => (
          <div key={item.id} className="flex flex-col gap-2 mb-6">
            <Link href={`/products/allproduct/${item.id}`}>
              <Image
                width="320"
                height="320"
                src={item.imageURL.filter((img) => img.includes("back"))[0]}
                alt={item.productName}
              />
            </Link>
            <div className="flex justify-between px-1">
              <p>{item.productName}</p>
              <p>
                {" "}
                {formatPrice(item.price, {
                  currency: "USD",
                  notation: "standard",
                  maxFraction: 0,
                })}
              </p>
            </div>
            <Button
              className="w-full"
              variant="outline"
              onClick={() => remove(item.id)}
            >
              Remove from WishList
            </Button>
            <Button className="w-full" onClick={() => add(item, 1)}>
              Add to Cart
            </Button>
          </div>
        ))}
      </div>
    </MaxWidthWrapper>
  );
}
