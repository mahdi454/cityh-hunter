import "@/style/globals.css";
import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Toaster } from "sonner";
import AuthProvider from "@/context/AuthProvider";

const inter = Outfit({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});
export const metadata: Metadata = {
  title: "City Hunter",
  description: "Platform you can find best perfume in world!",
  icons: [
    {
      rel: "icon",
      type: "image/png",
      url: "/fav/light.svg",
      media: "(prefers-color-scheme: dark)",
    },
  ],
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning={true} lang="en">
      <body suppressHydrationWarning={true}>
        <div
          className={cn(
            " h-full font-sans antialiased ",
            inter.className
          )}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <AuthProvider>
              {children}
            </AuthProvider>
          </ThemeProvider>
          <Toaster position="bottom-right" richColors />
        </div>
      </body>
    </html>
  );
}
