import "@/style/globals.css";
import Sidebar from "./_component/Sidebar";
import AdminNav from "./_component/AdminNav";



export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex">
      <Sidebar />
      <section className="relative  flex flex-col min-h-screen w-full">
        <AdminNav />
        <div >{children}</div>
      </section>
    </main>
  );
}
