"use client"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dispatch, SetStateAction, useEffect} from "react";

import { toast } from "sonner";
import { useFormState } from "react-dom";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { addNewAdress } from "../../_actions/adress";
import { useSession } from "next-auth/react";
type Props = {
  setAdress: Dispatch<SetStateAction<string>>;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  isOpen: boolean;
};
export default function NewAdressForm() {
  const { data: session } = useSession();

if(session?.user){
const id=session.user.id
  const [error, action] = useFormState(addNewAdress.bind(null,id), {});



  useEffect(() => {
    if (!error) {
      toast.success("New adress successfully added");
    }
  }, [error]);
  return (
    <form action={action} className="">
      <div className="flex flex-col  px-10 pt-2 gap-1 sm:gap-0 w-full sm:w-[540px]">
        <h1 className="text-lg font-semibold ">PERSONAL DETAILS</h1>
        <div className=" w-full justify-between flex flex-col sm:flex-row ">
          <div className="space-y-1">
            <Label htmlFor="name"> Name</Label>
            <Input
              type="text"
              placeholder="name"
              name="name"
              className={cn({
                "focus-visible:ring-red-500": error?.name,
              })}
            />
            {error?.name && (
              <div className="h-1 text-end text-sm text-red-600">
                {error.name}
              </div>
            )}
          </div>
          <div className="space-y-1">
            <Label htmlFor="lastname"> Lastname</Label>
            <Input
              type="text"
              placeholder="lastname"
              name="lastname"
              className={cn({
                "focus-visible:ring-red-500": error?.lastname,
              })}
            />
            {error?.lastname && (
              <div className="h-1 text-end text-sm text-red-600">
                {error.lastname}
              </div>
            )}
          </div>
        </div>
        <div className="space-y-1">
          <Label htmlFor="email" className="text-sm">
            {" "}
            Phone No
          </Label>
          <Input
            type="text"
            placeholder="email"
            name="email"
            className={cn({
              "focus-visible:ring-red-500": error?.email,
            })}
          />
          {error?.email && (
            <div className="h-1 text-end text-sm text-red-600">
              {error?.email}
            </div>
          )}
        </div>
        <h1 className="text-lg font-semibold mt-4 ">DELIVERY INFORMATION</h1>
        <div className="space-y-1">
          <Label htmlFor="houseNo" className="text-sm">
            {" "}
            Flat/ House No
          </Label>
          <Input
            type="text"
            placeholder="Enter House No..."
            name="houseNo"
            className={cn({
              "focus-visible:ring-red-500": error?.houseNo,
            })}
          />
          {error?.houseNo && (
            <div className="h-1 text-end text-sm text-red-600">
              {error?.houseNo}
            </div>
          )}
        </div>
        <div className="space-y-1">
          <Label htmlFor="adress" className="text-sm">
            Adress (Building, Street, Area)
          </Label>
          <Input
            type="text"
            placeholder="Enter a Location"
            name="adress"
            className={cn({
              "focus-visible:ring-red-500": error?.adress,
            })}
          />
          {error?.adress && (
            <div className="h-1 text-end text-sm text-red-600">
              {error?.adress}
            </div>
          )}
        </div>
        <div className="space-y-1">
          <Label htmlFor="landmark" className="text-sm">
            Landmark
          </Label>
          <Input
            type="text"
            placeholder="Place that is popular and easily recognized"
            name="landmark"
            className={cn({
              "focus-visible:ring-red-500": error?.landmark,
            })}
          />
          {error?.landmark && (
            <div className="h-1 text-end text-sm text-red-600">
              {error?.landmark}
            </div>
          )}
        </div>
        <div className=" w-full justify-between flex flex-col sm:flex-row ">
          <div className="space-y-1">
            <Label htmlFor="country"> Country</Label>
            <Input
              type="text"
              placeholder="country"
              name="country"
              className={cn({
                "focus-visible:ring-red-500": error?.country,
              })}
            />
            {error?.country && (
              <div className="h-1 text-end text-sm text-red-600">
                {error?.country}
              </div>
            )}
          </div>
          <div className="space-y-1">
            <Label htmlFor="pincode"> Pincode</Label>
            <Input
              type="text"
              placeholder="pincode"
              name="pincode"
              className={cn({
                "focus-visible:ring-red-500": error?.pincode,
              })}
            />
            {error?.pincode && (
              <div className="h-1 text-end text-sm text-red-600">
                {error?.pincode}
              </div>
            )}
          </div>
        </div>
        <div className=" w-full justify-between flex flex-col sm:flex-row gap-1">
          <div className="space-y-1">
            <Label htmlFor="city"> City</Label>
            <Input
              type="text"
              placeholder="city"
              name="city"
              className={cn({
                "focus-visible:ring-red-500": error?.city,
              })}
            />
            {error?.city && (
              <div className="h-1 text-end text-sm text-red-600">
                {error?.city}
              </div>
            )}
          </div>
          <div className="space-y-1">
            <Label htmlFor="state">State</Label>
            <Input
              type="text"
              placeholder="state"
              name="state"
              className={cn({
                "focus-visible:ring-red-500": error?.state,
              })}
            />
            {error?.state && (
              <div className="h-1 text-end text-sm text-red-600">
                {error?.state}
              </div>
            )}
          </div>
        </div>

        <Button className="mt-6"> Add Adress</Button>
      </div>
    </form>
  );
            }
}
