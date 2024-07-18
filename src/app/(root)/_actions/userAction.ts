"use server";
import { eq } from "drizzle-orm";
import { db } from "@/db/drizzle";
import { User } from "@/db/schema";
import { TAuthCreateUserValidator } from "@/lib/validators";
import { randomUUID } from "crypto";
import bcrypt from "bcrypt";
import { Resend } from "resend";
import { PrimaryActionEmailHtml } from "@/components/Email";
import "dotenv/config";

export const createUser = async (user: TAuthCreateUserValidator) => {
  const dbUser = await db.select().from(User).where(eq(User.email, user.email));
  if (dbUser.length > 0) {
    return {success: false, message:"Email already exist."}
  }
  const token = randomUUID();
  const hashedPwd = await bcrypt.hash(user.password, 10);
  const resend = new Resend(process.env.RESEND_API_KEY);
  await resend.emails.send({
    from: "Acme <onboarding@resend.dev>",
    to: [user.email],
    subject: "Verify Your Email.",
    html: PrimaryActionEmailHtml({
      actionLabel: "verify your account",
      buttonText: "Verify Account",
      href: `${process.env.PUBLIC_SERVER_URL}/verify-email?token=${token}`,
    }),
  });
  await db
    .insert(User)
    .values({
      username: user.username,
      password: hashedPwd,
      email: user.email,
      emailToken: token,
      expiration: new Date(Date.now() + 1000 * 60* 5),
    })
    .returning();
  return { success: true, sentToEmail: user.email };
};

export const verifyEmail = async (token: string) => {
  const [user] = await db
    .update(User)
    .set({ isVerified: true, emailToken: null })
    .where(eq(User.emailToken, token))
    .returning();
  const exp = Number(user.expiration.getTime());
  const now = Number(Date.now());
  if (exp < now) {
    return { success: false };
  } else {
    return { success: true };
  }
};
