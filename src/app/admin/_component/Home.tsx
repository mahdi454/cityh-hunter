import AdminNav from "./AdminNav";
import Sidebar from "./Sidebar";


export default function Home({
    children
  }: Readonly<{
    children: React.ReactNode;
    
  }>) {
  return (
    <main className="flex" >
    <Sidebar/>
    <section className="relative  flex flex-col min-h-screen w-full" >

    <AdminNav/>
    <div className="">{children}</div>
    </section>
  </main>
  )
}