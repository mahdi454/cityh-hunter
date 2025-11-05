import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useCartStore } from '@/context/cartStore';
import { useAddWishList } from '@/context/wishListStore';
import { formatPrice } from '@/lib/utils';
import { ArrowRight, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Icons } from './Icons';
import { buttonVariants } from './ui/button';
export default function Cart() {
  const { cart, increase, decrease, remove } = useCartStore();
  const { add } = useAddWishList();
  const itemCount = cart.length;
  const totalPrice = cart.reduce((sum, item) => item.price * item.count + sum, 0);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="outline-none">
        <div className="group flex items-center relative">
          <Image width="24" height="24" src="/bag2.svg" alt="bag" className="dark:hidden" />
          <Image width="24" height="24" src="/bag1.svg" alt="bag" className="hidden dark:flex" />
          <span className="absolute right-[8px] top-[6px] font-bold text-sm dark:text-white   ">
            {itemCount}
          </span>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        side="bottom"
        className="mt-3.5  w-[375px] h-[500px] shadow-2xl rounded-sm mx-4 sm:mx-0 sm:w-[410px] "
      >
        <div className=" px-1 text-sm flex justify-between items-center ">
          <div>Cart ({itemCount})</div>
          <DropdownMenuItem className="  hover:bg-slate-200 dark:hover:bg-slate-800">
            <X width="20" />
          </DropdownMenuItem>
        </div>
        {itemCount > 0 ? (
          <>
            <div className="flex w-full flex-col items-center tracking-wide font-semibold pb-1 border-b-[1px] border-slate-400">
              Cart Items
            </div>
            <div className="overflow-y-scroll h-72 flex flex-col gap-1.5 mt-1">
              {cart.map((item) => {
                const itemPrice = item.price * item.count;
                return (
                  <div key={item.id} className="flex">
                    <Image
                      width={90}
                      height={90}
                      src={item.imageURL.filter((img) => img.includes('_1'))[0]}
                      alt={item.productName}
                    />
                    <div className="w-full">
                      <div className="flex justify-between w-full px-2 ">
                        <p>{item.productName}</p>
                        <p className="">
                          {formatPrice(itemPrice, {
                            currency: 'USD',
                            notation: 'standard',
                            maxFraction: 0,
                          })}
                        </p>
                      </div>
                      <div className="flex justify-between items-center w-full px-2 ">
                        <p className="text-sm">Quantity</p>
                        <div className="flex gap-4 items-center  border-[1.5px] border-slate-500  mt-2 px-4 rounded-md">
                          <button className="text-lg" onClick={() => decrease(item.id)}>
                            -
                          </button>
                          <p>{item.count}</p>
                          <button className="text-lg" onClick={() => increase(item.id)}>
                            +
                          </button>
                        </div>
                      </div>
                      <div className="flex justify-between text-sm mt-2 px-2 ">
                        <button className="text-green-500 group" onClick={() => add(item)}>
                          Add to Wish List
                          <div className="underline_link bg-green-500" />
                        </button>
                        <button
                          className="text-destructive dark:text-red-600 group"
                          onClick={() => remove(item.id)}
                        >
                          Remove
                          <div className="underline_link bg-destructive dark:bg-red-600" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="space-y-4 p-1 ">
              <div className="space-y-1.5 text-sm">
                <div className="flex pr-6">
                  <span className="flex-1 font-semibold">Total Amount</span>
                  <span>
                    {formatPrice(totalPrice, {
                      currency: 'USD',
                      notation: 'standard',
                      maxFraction: 0,
                    })}
                  </span>
                </div>
              </div>
              <div>
                <div>
                  <Link href="/checkout" className={buttonVariants({ className: 'w-full mb-2' })}>
                    Continue to Checkout
                  </Link>
                </div>
                <div>
                  <Link
                    href="/cart"
                    className={buttonVariants({
                      variant: 'outline',
                      className: 'w-full',
                    })}
                  >
                    View Shopping Bag
                  </Link>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="flex h-full flex-col items-center gap-10 pt-10">
            <div className="relative ">
              <Icons.Logo1 className="relative h-40 dark:fill-white" />
              <span
                className="absolute top-14 left-12 text-8xl sm text-black dark:text-white"
                aria-hidden="true"
              >
                +
              </span>
            </div>
            <div className="flex items-center flex-col">
              <h3 className="text-xl font-semibold">Your cart is empty</h3>
              <Link
                href="/products"
                className={buttonVariants({
                  variant: 'link',
                  size: 'sm',
                  className: 'font-semibold text-sm text-sky-600',
                })}
              >
                Add items to your cart to checkout
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </div>
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
