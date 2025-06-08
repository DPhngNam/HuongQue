import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import AdminSidebar from "./components/AdminSidebar"


export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
     <AdminSidebar />
      <main className="flex-1 p-4 bg-gray-50 min-h-screen">
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  )
}