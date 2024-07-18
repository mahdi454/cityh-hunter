"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Products } from "@/db/schema";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {  Star } from "lucide-react";
import ProductDetails from "./ProductDetails";
import { useCartStore } from "@/context/cartStore";
import { useAddWishList } from "@/context/wishListStore";


type ProductItem = {
  product: typeof Products.$inferSelect;
};

export default function ProductItem({ product }: ProductItem) {
  const [count, setCount] = useState(1);
  const { add } = useCartStore();
  const {add:addWishList}=useAddWishList()
  const increaseCount = () => {
    if (count < 3) {
      setCount(count + 1);
    }
  };
  const decreaseCount = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };
  const imageUrl = product.imageURL;
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % imageUrl.length);
    }, 10000);

    return () => clearInterval(slideInterval);
  }, []);

  const handleDotClick = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <>
      <div className="w-full flex-col sm:flex-row flex justify-center mt-[80px]">
        <div className="relative flex flex-col lg:flex-row justify-center    ">
          <Carousel orientation="vertical" className=" hidden lg:block mr-1  ">
            <CarouselContent className="h-[537px] xl:h-[597px]">
              {imageUrl.map((img, index) => (
                <CarouselItem key={index} className=" basis-1/3 m-0 p-0">
                  <div
                    className={`relative group w-[200px] h-[240px]  xl:w-[260px] xl:h-[300px] bg-slate-50 dark:bg-slate-900 `}
                  >
                    <Image
                      fill
                      src={img}
                      alt={product.productName}
                      className=" sm:scale-[0.98] group-hover:scale-100 delay-100 transition-transform"
                      onClick={() => handleDotClick(index)}
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="top-0" />
            <CarouselNext className=" bottom-0" />
          </Carousel>

          <div className="relative  w-full  sm:w-[400px] lg:w-[500px] xl:w-[540px]  md:w-[420px]  h-[460px] md:h-[520px] lg-[520px] xl:h-[580px]  bg-slate-50 dark:bg-slate-900 md:max-w-[560px] max-w-[460px] ">
            {imageUrl.map((img, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                  index === currentSlide ? "opacity-100" : "opacity-0"
                }`}
              >
                <Image src={img} fill alt={`Slide ${index + 1}`} />
              </div>
            ))}
          </div>
          <Carousel orientation="horizontal" className=" lg:hidden block ">
            <CarouselContent className=" w-full sm:w-[400px] md:w-[420px] flex justify-start gap-2 items-center ">
              {imageUrl.map((img, index) => (
                <CarouselItem key={index} className=" basis-1/4  mt-1">
                  <div
                    className={`relative group w-[100px] h-[120px] bg-slate-50 dark:bg-slate-900 `}
                  >
                    <Image
                      fill
                      src={img}
                      alt={product.productName}
                      onClick={() => handleDotClick(index)}
                      className=""
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-0 " />
            <CarouselNext className=" right-0 " />
          </Carousel>
        </div>
        <div className=" w-full space-y-3  mt-4 sm:mt-0 lg:pl-2 max-w-[410px]">
          <div className="px-2 flex justify-between">
            <p className="text-amber-600 font-semibold">Best Seller</p>
            <div className="flex gap-1">
              {Array.from({ length: 5 }).map((_, index) => (
                <div key={index} className="">
                  <Star width={15} className="text-amber-600" />
                </div>
              ))}
              <p className="font-semibold text-sm">( 0 ) Reviews</p>
            </div>
          </div>
          <div className="px-2 flex justify-between items-center">
            <p className="font-light tracking-tight text-xl">
              {product.productName}
            </p>
          </div>
          <div className="flex justify-between px-2">
            <p>Price</p>
            <p>
              {formatPrice(product.price, {
                currency: "USD",
                notation: "standard",
                maxFraction: 0,
              })}
            </p>
          </div>
          <div className="flex justify-center pt-2 md:pt-4 pb-2">
            <p className="font-medium text-sm text-amber-600">
              AVAILABLE FOR PURCHASE
            </p>
          </div>
          <div className="flex justify-between items-center px-2">
            <p>Total Price</p>
            <div className="bg-amber-400 dark:bg-amber-600 rounded-full px-2 flex gap-2 text-sm">
              <p>Saved </p>
              <p className="text-sm">
                {formatPrice(400, {
                  currency: "USD",
                  notation: "standard",
                  maxFraction: 0,
                })}
              </p>
            </div>
            <p>
              {formatPrice(product.price, {
                currency: "USD",
                notation: "standard",
                maxFraction: 0,
              })}
            </p>
          </div>
          <div className="px-2 pt-2 ">
            <Button className="w-full mt-2 text-base " variant="outline"
            onClick={()=>addWishList(product)} >
              Add to Wish List{" "}
            </Button>
          </div>
          <div className="w-full px-2 mt-10 flex gap-6">
            <Button
              className="w-full mt-2 "
              onClick={() => add(product, count)}
            >
              Add to Cart
            </Button>
            <div className="flex gap-6 items-center  border-[1.5px]  pt-1 pb-1 mt-2 px-4 rounded-md">
              <button className="text-lg" onClick={decreaseCount}>
                -
              </button>
              <p>{count}</p>
              <button className="text-lg" onClick={increaseCount}>
                +
              </button>
            </div>
          </div>
        </div>
      </div>
      <ProductDetails product={product} />
    </>
  );
}
