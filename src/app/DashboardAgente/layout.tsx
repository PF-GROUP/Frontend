import Link from "next/link";
import { Upload, ArrowDownCircle, Calendar } from 'lucide-react';
import NavbarDashboard from "@/components/DashBoard-Agente/LayoutDashboard/NavbarDash";
import SidebarDashboard from "@/components/DashBoard-Agente/LayoutDashboard/SideBarDash";

export default function LayoutSidebar({children,}: Readonly<{ children: React.ReactNode }>) {
    return (
    <>
        {/* Navbar dashboard */}
            <NavbarDashboard/>

        <div className="flex bg-[rgb(240,241,244)]">
        {/* Sidebar */}
            <SidebarDashboard/>

        {/* Main que se va reenderizando */}
            <main className="flex-1 flex-col  p-6  ml-6  border-gray-300  border rounded-tr-none bg-white w-[300px] pl-4 pt-5.5 rounded-lg mt-4 shadow-[4px_5px_8px_4px_rgba(0,0,0,0.4)] ">
                <div className="flex items-center justify-start border-b m-auto border-gray-400 pb-5.5 mb-5 ">

                    <Link href="/DashboardAgente?view=subir-propiedad" className="flex items-center justify-center bg-gray-200 text-lg px-4 py-2 rounded border border-gray-300 ml-5 hover:bg-gray-400">
                    <Upload size={24} className="text-blue-800 mr-3" />
                    Subir Propiedad
                    </Link> 
                    
                    <Link href="/DashboardAgente?view=notificaciones" className="flex items-center justify-center text-center bg-gray-200 text-lg px-4 py-2 rounded border border-gray-300 ml-5 hover:bg-gray-400">
                    <Calendar size={24} className="text-blue-800 mr-3" />
                    Ver Citas</Link>

                    <Link href="/DashboardAgente?view=cambiar-colores" className="flex items-center justify-center  text-center bg-gray-200 text-lg px-4 py-2  rounded border border-gray-300 ml-5 hover:bg-gray-400">
                    <ArrowDownCircle size={24} className="text-blue-800 mr-3" />
                    Editar Sitio</Link>
                </div>

            {children}
            </main>
        </div>
    </>
)}