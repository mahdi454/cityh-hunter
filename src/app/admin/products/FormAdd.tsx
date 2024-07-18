"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronDown, X } from "lucide-react";
import { useEffect } from "react";

import { addProduct, editProduct } from "../_actions/products";
import { toast } from "sonner";
import { useFormState } from "react-dom";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { Products } from "@/db/schema";

export type Product = typeof Products.$inferSelect;
export default function FormAddProduct({
  formTitle,
  product,
}: {
  formTitle?: string;
  product?: Product | null;
}) {
  const router = useRouter();
  const close = () => router.push("/admin/products");
  const [error, action] = useFormState(
    product == null ? addProduct : editProduct.bind(null, product.id),
    {}
  );
  useEffect(() => {
    if (!error) {
      toast.success(product==null?"Product successfully added":`${product.productName} successfully updated`);
      close();
    }
  }, [error]);
  // const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   const formData = new FormData(e.currentTarget as HTMLFormElement);
  //   action(formData);
  // };

  return (
    <>
      <div className="relative flex pt-2 px-2 gap-1 items-center">
        <button
          className=" p-1.5 hover:bg-background rounded-full dark:hover:bg-slate-800"
          onClick={close}
        >
          <X />
        </button>

        <h1 className="text-lg font-semibold text-center">{formTitle}</h1>
      </div>

      <form action={action}>
        <div className="flex flex-col  px-12 pt-2 gap-1 sm:gap-0">
          <div className="space-y-1">
            <Label htmlFor="name"> Product Name</Label>
            <Input
              type="text"
              placeholder="product name"
              name="productName"
              defaultValue={product?.productName || ""}
              className={cn({
                "focus-visible:ring-red-500": error?.productName,
              })}
            />
            {error?.productName && (
              <div className="h-1 text-end text-sm text-red-600">
                {error.productName}
              </div>
            )}
          </div>
          <div className=" w-full justify-between flex flex-col sm:flex-row gap-1">
            <div className="space-y-1">
              <Label htmlFor="price"> Price</Label>
              <Input
                type="number"
                placeholder="price"
                name="price"
                defaultValue={product?.price || ""}
                className={cn({
                  "focus-visible:ring-red-500": error?.price,
                })}
              />
              {error?.price && (
                <div className="text-end text-sm text-red-600 h-1">
                  {error.price}
                </div>
              )}
            </div>
            <div className="space-y-1">
              <Label htmlFor="amount"> Amount</Label>
              <Input
                type="number"
                placeholder="amount"
                name="stockQuantity"
                defaultValue={product?.stockQuantity || ""}
                className={cn({
                  "focus-visible:ring-red-500": error?.stockQuantity,
                })}
              />
              {error?.stockQuantity && (
                <div className="text-end text-sm text-red-600 h-1">
                  {error.stockQuantity}
                </div>
              )}
            </div>
          </div>

          <div className="relative flex flex-col space-y-2 mt-2  ">
            <Label htmlFor="category"> Category</Label>
            <span className="absolute right-8 top-6 h-[1px] w-[1px] ">
              <ChevronDown />
            </span>
            <select
              name="category"
              className="appearance-none h-10 rounded-md bg-background border-[1px] border-slate-100  dark:border-slate-800 px-3 text-muted-foreground"
              defaultValue={product?.category || ""}
            >
              <option disabled>
                select a category
              </option>
              <option value="men">Men</option>
              <option value="women">Women</option>
            </select>
            {error?.category && (
              <div className="text-end text-sm text-red-600 h-1">
                {error?.category}
              </div>
            )}
          </div>
          <div className="space-y-1 mt-1">
          {/* <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="multiple_files">Upload multiple files</label>
<input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="multiple_files" type="file" multiple/> */}
            <label
              className="block text-sm font-medium text-gray-900 dark:text-white"
              htmlFor="imageUrl"
            >
              Image
            </label>
            <input
              className="border-[1px] border-slate-100  dark:border-slate-800 block w-full  text-sm h-10   rounded-md cursor-pointer  bg-background file:border-0 file:py-2.5 file:bg-slate-300 dark:file:bg-slate-800"
              name="imageUrl"
              type="file"
              multiple
            />
            {error?.imageUrl && (
              <div className="text-end text-sm text-red-600 h-1">
                {error?.imageUrl}
              </div>
            )}
          </div>

          <div className="grid mt-2">
            <Label htmlFor="description"> Description</Label>
            <textarea
              placeholder="description"
              name="description"
              defaultValue={product?.description || ""}
              className={cn(
                "rounded-md h-20 px-2 mt-2  bg-background border-[1px] border-slate-100  dark:border-slate-800 "
              )}
            />
            {error?.description && (
              <div className="text-end text-sm text-red-600 h-1">
                {error?.description}
              </div>
            )}
          </div>

          <Button className="mt-6"> Add product</Button>
        </div>
      </form>
    </>
  );
}

{
  /* <div className="flex flex-col gap-2 px-12 pt-8">
<FormField
  control={form.control}
  name="productName"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Product name</FormLabel>
      <FormControl>
        <Input placeholder="product name" {...field} />
      </FormControl>
    </FormItem>
  )}
/>
<div className="flex justify-between items-center gap-6">
  <FormField
    control={form.control}
    name="price"
    render={({ field }) => (
      <FormItem>
        <FormLabel>Price</FormLabel>
        <FormControl>
          <Input placeholder="price" {...field} />
        </FormControl>
      </FormItem>
    )}
  />
  <FormField
    control={form.control}
    name="stockQuantity"
    render={({ field }) => (
      <FormItem>
        <FormLabel>Amount</FormLabel>
        <FormControl>
          <Input placeholder="amount" {...field} />
        </FormControl>
      </FormItem>
    )}
  />
</div>
<div className="flex justify-between items-center gap-6">
  <FormField
    control={form.control}
    name="category"
    render={({ field }) => (
      <FormItem>
        <FormLabel>Email</FormLabel>
        <Select
          onValueChange={field.onChange}
          defaultValue={field.value}
        >
          <FormControl>
            <SelectTrigger className="bg-background">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
          </FormControl>
          <SelectContent>
            <SelectItem value="men">Men</SelectItem>
            <SelectItem value="women">Women</SelectItem>
          </SelectContent>
        </Select>
      </FormItem>
    )}
  />
  <FormField
    control={form.control}

    name="stockQuantity"
    render={({ field }) => (
      <FormItem>
        <FormLabel>Image</FormLabel>
        <FormControl>
          <Input placeholder="amount" type="file" {...field} />
        </FormControl>
      </FormItem>
    )}
  />
</div>

<FormField
  control={form.control}
  name="description"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Description</FormLabel>
      <FormControl>
        <textarea
          placeholder="description"
          className="rounded-md h-28 w-full px-2 py-1 bg-background border-[1px] border-slate-100  dark:border-slate-800 "
          {...field}
        />
      </FormControl>
    </FormItem>
  )}
/>
<Button className="mt-4">Sign Up</Button>
</div> */
}
