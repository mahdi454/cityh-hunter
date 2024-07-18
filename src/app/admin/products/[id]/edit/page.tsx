"use server"
import { db } from "@/db/drizzle";
import FormAddProduct from "../../FormAdd";
import { Products } from "@/db/schema";
import { eq } from "drizzle-orm";

export default async function Page({ params: { id } }: { params: { id: string } }) {
    
    const [product]= await db.select().from(Products).where(eq(Products.id,id))
  return (
    <div className="fixed top-0 left-0 h-screen w-full backdrop-blur-[1px] z-20">
      <div className=" w-full h-screen bg-slate-200 dark:bg-black sm:absolute sm:top-[50%] sm:left-[50%] sm:w-[520px] sm:h-[600px] sm:translate-x-[-50%] sm:translate-y-[-50%] sm:rounded-xl">
        <FormAddProduct formTitle="Edit Product" product={product} />
      </div>
    </div>
  );
}
