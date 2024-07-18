"use server";
import { db } from "@/db/drizzle";
import { Products } from "@/db/schema";
import { eq } from "drizzle-orm";
import { z } from "zod";
import fs from "fs/promises";
import { revalidatePath } from "next/cache";
import { notFound } from "next/navigation";

const imageSchema = z
  .instanceof(File, { message: "Required" })
  .refine((file) => file.size === 0 || file.type.startsWith("image/"), {
    message: "Must be an image",
  })


const FormAddProductValidator = z.object({
  productName: z.string().min(1, { message: "Invalid name" }),
  price: z.coerce.number().int().min(1, { message: "Invalid price" }),
  description: z.string().min(1, { message: "Required" }),
  category: z.string().min(1, { message: "Select a category" }),
  stockQuantity: z.coerce.number().int().min(1, { message: "Invalid number" }),
  imageUrl: imageSchema.refine((file) => file.size > 0, { message: "Required" }),
});
const FormEditSchemaValidator = FormAddProductValidator.extend({
  imageUrl: imageSchema.optional(),
});
export const addProduct = async (prevState: unknown, formData: FormData) => {
  const formEntries = Object.fromEntries(formData.entries());
  const images = formData.getAll("imageUrl").filter((item): item is File => item instanceof File);
  
  // Validate the form data including the images

  const result = FormAddProductValidator.safeParse(formEntries);
  
  if (result.success === false) {
    return result.error.formErrors.fieldErrors;
  }
  const data = result.data;


  const imagePaths = [];
  for (const image of images) {
    const imagePath = `/products/${crypto.randomUUID()}-${image.name}`;
    await fs.writeFile(
      `public${imagePath}`,
      Buffer.from(await image.arrayBuffer())
    );
    imagePaths.push(imagePath);
  }
  await db
    .insert(Products)
    .values({ ...data, imageURL:imagePaths })
    .returning();

  revalidatePath("/");
  revalidatePath("/admin/products");
};



export const editProduct = async (
  id: string,
  prevState: unknown,
  formData: FormData
) => {
  const formEntries = Object.fromEntries(formData.entries());
  const images = formData.getAll("imageUrl").filter((item): item is File => item instanceof File);
  

  // Validate the form data including the images

  const result = FormEditSchemaValidator.safeParse(formEntries);
  
  if (result.success === false) {
    return result.error.formErrors.fieldErrors;
  }
  const data = result.data;
  const [product] = await db
    .select()
    .from(Products)
    .where(eq(Products.id, id));
  if (product == null) return notFound();

  let imagePaths = product.imageURL;
  for (const image of images) {
    const imagePath = `/products/${crypto.randomUUID()}-${image.name}`;
    await fs.writeFile(
      `public${imagePath}`,
      Buffer.from(await image.arrayBuffer())
    );
    imagePaths.push(imagePath);
  }
console.log("paths",imagePaths)

  await db
    .update(Products)
    .set({
      productName: data.productName,
      price: data.price,
      description: data.description,
      category: data.category,
      stockQuantity: data.stockQuantity,
      imageURL: imagePaths,
    })
    .where(eq(Products.id, id))
    .returning();

  revalidatePath("/");
  revalidatePath("/admin/products");
};

export const deleteProduct = async (id: string) => {
  const [product] = await db
    .select()
    .from(Products)
    .where(eq(Products.id, id));
  if (product == null) return notFound();
  product.imageURL.map(async (img)=>  await fs.unlink(`public${img}`))
 
  await db
    .delete(Products)
    .where(eq(Products.id, id))
    .returning({ productName: Products.productName });

  revalidatePath("/");
  revalidatePath("/admin/products");
};
