

import CeluSidebar from "@/components/DashBoard-Agente/LayoutDashboard/CeluSidebarDash";
import SidebarDashboard from "@/components/DashBoard-Agente/LayoutDashboard/SideBarDash";
import Navbar from "@/components/navbar/navbar";

import { adminUser } from "../../../helper/user";
export default function LayoutSidebar({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      {/* Navbar dashboard */}
      <Navbar />

      <div className="flex flex-col md:flex-row bg-[rgb(240,241,244)]">
        {/* Sidebar */}
        <div className="block md:hidden">
          <CeluSidebar
            name={adminUser.name}
            surname={adminUser.surname}
          />
        </div>
        <div className="hidden md:block">
          <SidebarDashboard
            name={adminUser.name}
            surname={adminUser.surname}
          />
        </div>

        {/* Main content */}
        <main className="flex-1 p-4 md:ml-6 border-gray-300 border rounded-tr-none bg-white w-full md:w-auto rounded-lg mt-4 shadow-[4px_5px_8px_4px_rgba(0,0,0,0.4)]">
          {children }
        </main>
      </div>
    </>
  );
}
