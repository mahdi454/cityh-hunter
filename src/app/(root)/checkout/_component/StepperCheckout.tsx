import { Check, Circle, CircleCheckBig } from "lucide-react";

export default function StepperCheckout() {
  return (
    <div>
      <ol className="flex items-center w-full justify-center gap-2">
        <li className="flex items-center gap-1">
          <CircleCheckBig width='23' className="text-green-400" />
          <span className="">Logged In</span>
          <div className="h-[2px] w-16 bg-black" />
        </li>
        <li className="flex items-center gap-1">
          <CircleCheckBig width="16" className="text-green-400 hidden" />
          <span className="relative text-green-500">
            <Circle />
            <span className="absolute top-0.5 right-2 text-sm font-semibold">2</span>
          </span>
          <span className="">Delivery Info</span>
          <div className="h-[2px] w-16 bg-black" />
        </li>
        <li className="flex items-center gap-1">
          <CircleCheckBig width="16" className="text-green-400 hidden" />
          <span className="relative text-green-500">
            <Circle />
            <span className="absolute top-0.5 right-2 text-sm font-semibold">3</span>
          </span>
          <span className="">Payment</span>
        </li>
      </ol>
    </div>
  );
}
