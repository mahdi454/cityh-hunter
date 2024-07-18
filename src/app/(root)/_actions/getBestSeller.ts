import { db } from "@/db/drizzle";
import { Products } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function getBestSellerProducts() {
  const bestSellerMen = await db
    .select()
    .from(Products)
    .where(eq(Products.category, "men"))
    .limit(5);

  const bestSellerWomen = await db
    .select()
    .from(Products)
    .where(eq(Products.category, "women"))
    .limit(5);

  return { bestSellerMen, bestSellerWomen };
}

