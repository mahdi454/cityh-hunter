"use client";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import StepperCheckout from "./_component/StepperCheckout";
import { Button } from "@/components/ui/button";

import { useState } from "react";
import NewAdressForm from "./_component/NewAdressForm";
import Link from "next/link";

export default function Page() {
  const getAdress = "";
  const [adress, setAdress] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  return (
    <MaxWidthWrapper className="mt-20 ">
      <StepperCheckout />
      <div className=" flex justify-center items-center mt-4 gap">
        {getAdress ? (
          <p className=" text-gray-500 dark:text-gray-400 font-semibold ">
            To complete your order, please select a shipping address or add a
            new one. Thank you!
          </p>
        ) : (
          <p className=" text-gray-500 dark:text-gray-400 font-semibold">
            To complete your order, please add a shipping address. Thank you!
          </p>
        )}
      </div>
      { getAdress? 
      <div className="mt-10">
        <div className="w-1/2">
          <p>DELIVERY INFORMATION</p>
          <div className="bg-orange-300 w-96 rounded-md mt-2 px-4 py-2">
            <p>Mahdi hassani</p>
            <p>{getAdress}</p>
            <p>+91 66828882</p>
          </div>
          <div className="w-full flex justify-center items-center">

          <Button className="w-40 mt-6">Add new Adress</Button>
          </div>
        </div>
      </div> :<NewAdressForm/>}
    </MaxWidthWrapper>
  );
}
