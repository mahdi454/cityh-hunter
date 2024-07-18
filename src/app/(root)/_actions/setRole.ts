import { db } from "@/db/drizzle";
import { User } from "@/db/schema";
import { eq } from "drizzle-orm";

export const setUserRole = async (email:string) => {
    const dbUser = await db.select().from(User).where(eq(User.email, email));
    if (dbUser.length > 0) {
        return {success: false, message:"Email already exist."}
    }
    const [user] = await db
    .update(User)
    .set({ role:'ADMIN'})
    .where(eq(User.email,email))
    .returning();
    return { success: true ,userRole: user.role};
}