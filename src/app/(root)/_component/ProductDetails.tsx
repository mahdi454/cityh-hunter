import Image from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import { toast } from "sonner";
import { Products } from "@/db/schema";

type Props = {
  product: typeof Products.$inferSelect;
};

export default function ProductDetails({ product }: Props) {
  const couponTxt = "FIRST2024";

  return (
    <div className=" flex justify-center  mt-10">
      <Accordion
        type="single"
        collapsible
        className="w-full max-w-[700px] xl:max-w-[800px]"
      >
        <AccordionItem value="item-1">
          <AccordionTrigger className="text-base pt-3 pb-2">
            Description & Details
          </AccordionTrigger>
          <AccordionContent>{product.description}</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger className="text-base pt-3 pb-2">
            Expected delivery date?
          </AccordionTrigger>
          <AccordionContent>
            Estimated delivery in 1-2 weeks. Pre-order, Made to Order items will
            ship on the estimated date noted on the product description page.
            These items will ship through Premium Express once they become
            available.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3" className="lg:hidden">
          <AccordionTrigger className="text-base pt-3 pb-2">
            Offers & Coupons
          </AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-col gap-4 px-1 pt-1">
              <div className="flex justify-between items-center gap-6">
                <Input
                  type="text"
                  placeholder="Enter coupon code"
                  name="coupon"
                />
                <Button className="w-32  flex  ">Apply</Button>
              </div>
              <div>
                <div>
                  <div className=" flex flex-col gap-2 ">
                    <div className=" relative h-10 w-40 bg-amber-400 dark:bg-amber-600 rounded-sm">
                      <div className="h-3 w-3 rounded-full bg-background absolute -top-2 right-8" />
                      <div className="h-3 w-3 rounded-full bg-background absolute -bottom-2 right-8" />
                      <button
                        className="absolute top-2 right-2"
                        onClick={() => {
                          navigator.clipboard.writeText(couponTxt);
                          toast.success("coupon copied");
                        }}
                      >
                        <Copy width="20" />
                      </button>
                      <p className="text-lg pt-1 pl-2 font-light">
                        {couponTxt}
                      </p>
                    </div>
                    <p className="">
                      Use code FIRST and get 10% off on New Watches over Rs.
                      2499. Maximum Discount: Rs. 500.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-4">
          <AccordionTrigger className="text-base pt-3 pb-2">
            Payment options
          </AccordionTrigger>
          <AccordionContent>
            <p>
              We accepts the following forms of payment for online purchases:
            </p>
            <div className="flex gap-24 mt-4">
              <ul className="flex flex-col gap-3">
                <li className="flex gap-2">
                  <Image
                    src="/payment/visa.svg"
                    alt="visa"
                    width="30"
                    height="20"
                  />{" "}
                  <span>Visa</span>
                </li>
                <li className="flex gap-2">
                  <Image
                    src="/payment/master.svg"
                    alt="MasterCard"
                    width="30"
                    height="20"
                  />{" "}
                  <span>MasterCard</span>
                </li>
                <li className="flex gap-2">
                  <Image
                    src="/payment/paypal.svg"
                    alt=" Paypal"
                    width="30"
                    height="20"
                  />{" "}
                  <span> Paypal</span>
                </li>
                <li className="flex gap-2">
                  <Image
                    src="/payment/stripe.svg"
                    alt="Stripe"
                    width="30"
                    height="20"
                  />{" "}
                  <span>Stripe</span>{" "}
                </li>
              </ul>
              <ul className="flex flex-col gap-3 ">
                <li className="flex gap-2 items-center">
                  <Image
                    src="/payment/amazon.svg"
                    alt="Amazon Pay"
                    width="35"
                    height="20"
                  />{" "}
                  <span>Amazon Pay</span>
                </li>
                <li className="flex gap-2 items-center">
                  <Image
                    src="/payment/google1.svg"
                    alt="Google Pay"
                    width="35"
                    height="20"
                    className="bg-slate-100 px-1 rounded-sm"
                  />{" "}
                  <span>Google Pay</span>
                </li>
                <li className="flex gap-2 items-center">
                  <Image
                    src="/payment/apple6.svg"
                    alt="Apple Pay"
                    width="35"
                    height="20"
                    className="bg-slate-100 px-1 rounded-sm"
                  />{" "}
                  <span>Apple Pay</span>
                </li>
              </ul>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <div className="w-full max-w-[410px] pl-6 hidden lg:block mt-4 ">
          <p className="">Offers & Coupons</p>
        <div className="flex flex-col gap-4 px-1 pt-1">
          <div className="flex justify-between items-center gap-6">
            <Input type="text" placeholder="Enter coupon code" name="coupon" />
            <Button className="w-32  flex  ">Apply</Button>
          </div>
          <div className=" flex flex-col gap-2 ">
            <div className=" relative h-9 w-40 bg-amber-400 dark:bg-amber-600 rounded-sm">
              <div className="h-3 w-3 rounded-full bg-background absolute -top-2 right-8" />
              <div className="h-3 w-3 rounded-full bg-background absolute -bottom-2 right-8" />
              <button
                className="absolute top-2 right-2"
                onClick={() => {
                  navigator.clipboard.writeText(couponTxt);
                  toast.success("coupon copied");
                }}
              >
                <Copy width="20" />
              </button>
              <p className="text-lg pt-1 pl-2 font-light">{couponTxt}</p>
            </div>
            <p className="">
              Use code FIRST and get 10% off on New Watches over Rs. 2499.
              Maximum Discount: Rs. 500.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
