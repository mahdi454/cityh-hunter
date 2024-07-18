import { db } from "@/db/drizzle";
import { ShippingAddresses } from "@/db/schema";
import { FormAddNewAdressValidator } from "@/lib/validators";
import { revalidatePath } from "next/cache";


 export const addNewAdress = async (prevState: unknown, formData: FormData,userId:string): Promise<{ [key: string]: string[] } | undefined> => {
  
    const formEntries = Object.fromEntries(formData.entries());
    const result = FormAddNewAdressValidator.safeParse(formEntries);
    if (result.success === false) {
      return result.error.formErrors.fieldErrors;
    }
    const data = result.data;
    await db
    .insert(ShippingAddresses)
    .values({...data,isDefault: true,userId: userId})
    .returning();


  // revalidatePath("/checkout");

  };