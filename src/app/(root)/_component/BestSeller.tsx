"use client";
import * as React from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { motion } from "framer-motion";
import { useState } from "react";
import { MoveRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Heart } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { Products } from "@/db/schema";
import { useAddWishList } from "@/context/wishListStore";

type Product = typeof Products.$inferSelect;
type ProductType = {
  bestSellerMen: Product[];
  bestSellerWomen: Product[];
};

const navigation = [{ name: "Men's" }, { name: "Women's" }];

export function BestSeller({ bestSellerMen, bestSellerWomen }: ProductType) {
  const { add, remove, cart } = useAddWishList();
  const [selectedLink, setSelectedLink] = useState("Men's");
  const [isHovered, setIsHovered] = useState(false);
  const products = selectedLink === "Women's" ? bestSellerWomen : bestSellerMen;
  // const isWishListed = cart.find(item=> item.id===)
  return (
    <div className="flex flex-col justify-center items-center mt-4   ">
      <div className=" flex items-center mb-4">
        <h2 className="text-xl  font-light tracking-tight mr-4   ">
          Best Seller Product
        </h2>
        <div className="flex gap-4 rounded-full  border-[1px]  border-slate-700 dark:border-slate-100 p-[2px]">
          {navigation.map((item) => {
            const isSelected = item.name === selectedLink;
            return isSelected ? (
              <button
                key={item.name}
                className={` relative text-sm leading-6 no-underline  font-semibold  bg-black dark:bg-slate-50 dark:text-gray-900 text-gray-100 rounded-full px-2 `}
                onClick={() => setSelectedLink(item.name)}
              >
                {item.name}
              </button>
            ) : (
              <button
                key={item.name}
                className={` relative text-sm leading-6 no-underline text-gray-900 dark:text-gray-100 px-2`}
                onClick={() => setSelectedLink(item.name)}
              >
                {item.name}
              </button>
            );
          })}
        </div>
      </div>

      <Carousel className="w-full overflow-x-hidden">
        <CarouselContent className="-ml-1">
          {products.map((product, index) => {
            return (
              <CarouselItem
                key={product.id}
                className="pl-1 md:basis-1/2 lg:basis-1/3"
              >
                <div className=" flex justify-center">
                  <div
                    className={`relative group w-[380px] sm:w-[400px] h-[520px] bg-slate-50 dark:bg-slate-900 scale-[0.989]`}
                  >
                    <Image
                      fill
                      src={
                        product.imageURL.filter((img) =>
                          img.includes("back")
                        )[0]
                      }
                      alt={product.productName}
                      className=" sm:scale-95 group-hover:scale-100 delay-100 transition-transform"
                    />
                    <Link href={`/products/allproduct/${product.id}`}>
                      <div
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                        className="sm:hidden absolute bottom-0 w-full group-hover:flex flex-col text-black  p-2 transition-all delay-500"
                      >
                        <p className="text-lg tracking-tight font-light ">
                          {product.productName}
                        </p>
                        <div className="flex justify-between items-center">
                          <p className="flex items-center gap-4  text-lg tracking-wide mt-1 font-semibold ">
                            Shop now{" "}
                            <motion.span
                              animate={isHovered ? { scaleX: 1.5, x: 10 } : {}}
                              transition={{ delay: 0.3 }}
                              className="mt-1  "
                            >
                              <MoveRight />
                            </motion.span>
                          </p>
                          <p>
                            {formatPrice(product.price, {
                              currency: "USD",
                              notation: "standard",
                              maxFraction: 0,
                            })}
                          </p>
                        </div>
                      </div>
                    </Link>
                    <div className="hidden absolute bottom-0 h-[2px] w-full bg-emerald-400 dark:bg-slate-50  group-hover:animate-move-right group-hover:cursor-pointer group-hover:flex " />
                    {cart.some((item) => item.id === product.id) ? (
                      <button
                        className="absolute top-4 left-4 hidden group-hover:flex dark:text-black hover:cursor-pointer"
                        onClick={() => remove(product.id)}
                      >
                        <Heart
                          width="20"
                          fill="#e41919"
                          className="text-red-500"
                        />
                      </button>
                    ) : (
                      <button
                        className="absolute top-4 left-4 hidden group-hover:flex dark:text-black hover:cursor-pointer"
                        onClick={() => add(product)}
                      >
                        <Heart width="20" />
                      </button>
                    )}
                  </div>
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious className="left-1 sm:-left-1 opacity-30 sm:opacity-60 disabled:hidden" />
        <CarouselNext className="right-1 sm:-right-1 opacity-30 sm:opacity-60 disabled:hidden" />
      </Carousel>
    </div>
  );
}
