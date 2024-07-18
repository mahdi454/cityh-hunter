import { z } from "zod";

export const AuthCreateUserValidator = z.object({
  username: z
    .string()
    .min(1, { message: "Username required, please provide one." }),
  email: z.string().email(),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters long.",
  }),
});
export const AuthLoginValidator = z.object({
  email: z.string().email(),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters long.",
  }),
});

export const FormAddNewAdressValidator = z.object({
  name: z
    .string()
    .min(1, { message: "Required, please provide one." }),
  lastname: z
    .string()
    .min(1, { message: " Required, please provide one." }),
  email: z.string().email(),
  houseNo: z.string().min(1, { message: "Invalid input" }),
  adress: z.string().min(1, { message: "Invalid adress" }),
  landmark: z.string(),
  country: z.string().min(1, { message: "Invalid country" }),
  pincode: z.string().min(1, { message: "Invalid pincode" }),
  city: z.string().min(1, { message: "Invalid city" }),
  state: z.string().min(1, { message: "Invalid state " }),
});

export type TAuthCreateUserValidator = z.infer<typeof AuthCreateUserValidator>;
export type TAuthLoginValidator = z.infer<typeof AuthLoginValidator>;
