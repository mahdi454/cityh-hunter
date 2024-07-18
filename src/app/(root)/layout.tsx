import "@/style/globals.css";

import Navbar from "@/components/Navbar";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <main className="relative flex min-h-screen flex-col">
        <Navbar />
        <div>{children}</div>
      </main>
  );
}
