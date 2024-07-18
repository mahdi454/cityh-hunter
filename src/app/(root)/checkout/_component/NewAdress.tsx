import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

export default function NewAdress() {
  return (
    <div className="fixed top-0 left-0 h-screen w-full backdrop-blur-[1px] z-50">
      <div className=" w-full h-screen bg-slate-200 dark:bg-black sm:absolute sm:top-[50%] sm:left-[50%] sm:w-[420px] sm:h-[500px] sm:translate-x-[-50%] sm:translate-y-[-50%] sm:rounded-xl mt-6">
        <div className="relative flex pt-2 px-2 gap-4 items-center">
          <button
            className=" p-1.5 hover:bg-background rounded-full dark:hover:bg-slate-800"
          >
            <X />
          </button>
        </div>
        <div className=" flex flex-col justify-center items-center gap-4">
          <p className="mt-4  text-gray-500 dark:text-gray-400 font-semibold">
            To complete your order, please add a shipping address. Thank you!
          </p>

          <p className="mt-4  text-gray-500 dark:text-gray-400 font-semibold hidden">
            To complete your order, please select a shipping address or add a
            new one. Thank you!
          </p>
          <Button className="px-6 ">Add new Adress</Button>
        </div>
      </div>
    </div>
  );
}
