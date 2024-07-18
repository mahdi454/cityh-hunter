import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
  DefaultUser,
} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "@/db/drizzle";
import { User } from "@/db/schema";
import { eq } from "drizzle-orm";
import GithubProvider from "next-auth/providers/github";
import bcrypt from "bcrypt";
import { DefaultJWT } from "next-auth/jwt";
import 'dotenv/config'

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: string;
    } & DefaultSession;
  }

  interface User extends DefaultUser {
    role: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    role: string;
  }
}
export const authOptions: NextAuthOptions = {
  pages:{ signIn:'/sign-in'},
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.role = user.role;
      return token;
    },
    // If you want to use the role in client components
    async session({ session, token }) {
      if (session?.user) session.user.role = token.role;
      return session;
    },
  },
  // adapter: DrizzleAdapter(db) as Adapter,
  providers: [
    // GithubProvider({
    //   clientId: process.env.CLIENT_GITHUB_ID as string,
    //   clientSecret: process.env.GITHUB_SECRET as string,
    // }),

    CredentialsProvider({
      name: "Sign in",
      id: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "example@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          return null;
        }

        const [user] = await db
          .select()
          .from(User)
          .where(eq(User.email, String(credentials.email)));

        if (
          !user ||
          !(await bcrypt.compare(String(credentials.password), user.password!))
        ) {
          return null;
        }
        return {
          id: user.id,
          name: user.username,
          email: user.email,
          role: user.role,     
        };
      },
    }),
  ],
};

export const getServerAuthSession = () => getServerSession(authOptions);
