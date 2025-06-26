"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";
import Link from "next/link";
import {
  Home,
  Building,
  Wallet,
  Users,
  LogOut,
  Menu,
  X,
  User,
} from "lucide-react";
import { useAuthContext } from "../../../../context/authContext";
import apiService from "@/services/apiService";

interface CeluSidebarDashboardProps {
  name: string;
  surname: string;
}

const CeluSidebar: React.FC<CeluSidebarDashboardProps> = ({
  name,
  surname,
}) => {
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const { ResetUserData } = useAuthContext();

  const toggleMenu = () => setOpen(!open);

  const handleLogout = () => {
    apiService.post("/auth/logout", {}, true);
    toast.success("Cerrando sesión, redirigiendo a home...");
    ResetUserData();
    setTimeout(() => {
      router.push("/home");
    }, 1000);
    setOpen(false);
  };

  return (
    <div className="md:hidden">
      {/* Top Navbar */}
      <div className="flex items-center justify-between bg-white px-4 py-3 shadow-md">
        <div>
          <h2 className="font-bold text-lg text-gray-800">
            {name} {surname}
          </h2>
          <p className="text-sm text-gray-500">Administrador</p>
        </div>
        <button onClick={toggleMenu}>
          <Menu size={28} />
        </button>
      </div>

      {/* Sidebar mobile */}
      {open && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="fixed inset-0 bg-black opacity-50" onClick={toggleMenu} />

          <div className="relative z-50 w-72 h-full bg-white p-4 shadow-lg overflow-y-auto">
            <button onClick={toggleMenu} className="absolute top-4 left-4">
              <X size={26} />
            </button>

            {/* Header usuario */}
            <div className="flex items-center gap-3 mt-10 mb-4 border-b border-gray-300 pb-4">
              <div className="bg-gray-900 rounded-full p-2">
                <User className="text-white" size={40} />
              </div>
              <div className="flex flex-col">
                <h2 className="font-bold text-xl">{name} {surname}</h2>
                <p className="text-sm">Administrador</p>
              </div>
            </div>

            {/* Navegación */}
            <nav className="space-y-4">
              <Link
                href="/DashboardAdmin"
                className="flex items-center gap-2 text-lg hover:bg-gray-100 p-2 rounded"
                onClick={toggleMenu}
              >
                <Home size={24} />
                Inicio
              </Link>

              <details className="group">
                <summary className="flex items-center gap-2 text-lg cursor-pointer hover:bg-gray-100 p-2 rounded">
                  <Building size={24} />
                  Inmobiliarias
                  <span className="ml-auto group-open:rotate-90 transition-transform">▶</span>
                </summary>
                <ul className="ml-6 mt-2 space-y-1 text-sm">
                  <li>
                    <Link
                      href="/DashboardAdmin?view=gestion-inmobiliarias"
                      onClick={toggleMenu}
                      className="block hover:text-[#A71424]"
                    >
                      Gestión de inmobiliarias
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/DashboardAdmin?view=todas-inmobiliarias"
                      onClick={toggleMenu}
                      className="block hover:text-[#A71424]"
                    >
                      Todas las inmobiliarias
                    </Link>
                  </li>
                </ul>
              </details>

              <details className="group">
                <summary className="flex items-center gap-2 text-lg cursor-pointer hover:bg-gray-100 p-2 rounded">
                  <Wallet size={24} />
                  Gestión de pagos
                  <span className="ml-auto group-open:rotate-90 transition-transform">▶</span>
                </summary>
                <ul className="ml-6 mt-2 space-y-1 text-sm">
                  <li>
                    <Link
                      href="/DashboardAdmin?view=gestion-pagos"
                      onClick={toggleMenu}
                      className="block hover:text-[#A71424]"
                    >
                      Administrar pagos
                    </Link>
                  </li>
                </ul>
              </details>

              <details className="group">
                <summary className="flex items-center gap-2 text-lg cursor-pointer hover:bg-gray-100 p-2 rounded">
                  <Users size={24} />
                  Notificaciones
                  <span className="ml-auto group-open:rotate-90 transition-transform">▶</span>
                </summary>
                <ul className="ml-6 mt-2 space-y-1 text-sm">
                  <li>
                    <Link
                      href="/DashboardAdmin?view=notificaciones"
                      onClick={toggleMenu}
                      className="block hover:text-[#A71424]"
                    >
                      Enviar Notificación
                    </Link>
                  </li>
                </ul>
              </details>

              {/* Logout */}
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 text-lg text-white bg-[#9b0624] hover:bg-[#870505] p-2 mt-6 rounded w-full"
              >
                <LogOut size={24} />
                Cerrar sesión
              </button>
            </nav>
          </div>
        </div>
      )}
    </div>
  );
};

export default CeluSidebar;

