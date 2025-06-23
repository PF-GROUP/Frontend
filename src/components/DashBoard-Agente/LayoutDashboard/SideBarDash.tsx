"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import {
  Building,
  User,
  Wallet,
  HelpCircle,
  LogOut,
  Home,
  Menu,
  ShieldCheck,
} from "lucide-react";
import { getAgente } from "@/services/agenteGet";
import { useAuthContext } from "../../../../context/authContext";

const SidebarDashboard: React.FC = () => {
  const {user} = useAuthContext()

  const [isOpen, setIsOpen] = useState(false);
  const [profileImageUrl, setProfileImageUrl] = useState<string | null>(
    "https://res.cloudinary.com/dmvybzxnv/image/upload/v1750591603/nba83jcdphafyvexftsh.jpg"
  );

  // Estado para guardar el nombre del agente
  const [agenteNombre, setAgenteNombre] = useState<string>("Cargando...");


  // IMPORTANTE LEER REALIZAR EL CONSUMO DEL NOMBRE DEL USUARIO DESDE LAS COOCKIES "user"
  useEffect(() => {
    const fetchAgente = async () => {
      try {
        if (!user || typeof user.id !== "number") return;
        const response = await getAgente(user?.id);
        // Asumiendo que el nombre viene en response.data.name
        setAgenteNombre(response.name || "Nombre no disponible");
        // Si la URL de imagen viene también, podrías setear profileImageUrl aquí:
        // setProfileImageUrl(response.data.profileImageUrl);
      } catch (error) {
        console.error("Error cargando agente:", error);
        setAgenteNombre("Error al cargar");
      }
    };

    fetchAgente();
  }, [user]);

  const toggleSidebar = () => setIsOpen(!isOpen);
  const closeSidebar = () => setIsOpen(false);

  return (
    <>
      {/* Botón hamburguesa solo visible en mobile */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-white p-2 rounded-md shadow-md"
        onClick={toggleSidebar}
      >
        <Menu size={28} />
      </button>

      {/* Backdrop oscuro (solo mobile) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-[#0000004b] bg-opacity-40 z-30 md:hidden"
          onClick={closeSidebar}
        />
      )}

      <div className="flex min-h-screen bg-[rgb(240,241,244)]">
        {/* Sidebar */}
        <div
          className={`
            flex flex-col border border-gray-300 bg-white p-3 md:pl-5 pt-4 rounded-lg rounded-tl-none mt-4 shadow-[1.5px_0_5px_-1px_rgba(0,0,0,0.5)]
            w-[250px] md:w-[330px]
            fixed md:static z-40 top-0 left-0 h-full
            transform transition-transform duration-300
            ${isOpen ? "translate-x-0" : "-translate-x-full"}
            md:translate-x-0
          `}
        >
          {/* Header Usuario */}
          <div className="flex items-center justify-start border-b border-gray-400 pb-4 md:mr-6">
            
            <Link href={"/DashboardAgente?view=cambiar-foto-perfil"} className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-blue-600">
              {profileImageUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={profileImageUrl}
                  alt="Foto perfil agente" 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="bg-gray-900 rounded-full p-2 flex items-center justify-center">
                  <User className="text-white" size={42} />
                </div>
              )}
            </Link>


            <div className="flex flex-col items-start justify-start text-center ml-3">
              <h2 className="font-bold text-base md:text-xl">{agenteNombre}</h2>
              <p className="font-sans text-sm">Agente inmobiliario</p>
            </div>
          </div>


          {/* --- ITEM - Inicio --- */}
          <div className="flex items-start gap-2 mt-6 hover:bg-gray-300 rounded-md p-2 cursor-pointer w-full">
            <Home size={24} className="text-gray-750" />
            <details className="[&>summary]:list-none [&>summary::-webkit-details-marker]:hidden w-full">
              <summary className="font-semibold text-base md:text-xl w-full">
                <Link href="/DashboardAgente" className="w-full">Inicio</Link>
              </summary>
            </details>
          </div>

          {/* --- ITEM - Mi Sitio --- */}
          <div className="flex items-start gap-2 mt-6 hover:bg-gray-300 rounded-md p-2 cursor-pointer w-full">
            <User size={24} className="text-gray-750" />
            <details className="[&>summary]:list-none [&>summary::-webkit-details-marker]:hidden w-full">
              <summary className="font-semibold text-base md:text-xl">Mi Sitio</summary>
              <ul className="mt-2 bg-gray-100 rounded-md p-2 space-y-1 hover:bg-white">
                <li><Link href="/DashboardAgente?view=editar-titulo" className="block text-gray-800 hover:text-[#870505] transition-colors">Editar Nombre y descripción</Link></li>
                <li><Link href="/DashboardAgente?view=cambiar-colores" className="block text-gray-800 hover:text-[#870505] transition-colors mt-2">Cambiar colores</Link></li>
                <li><Link href="/DashboardAgente?view=configurar-filtros" className="block text-gray-800 hover:text-[#870505] transition-colors mt-2">Configurar filtros</Link></li>
              </ul>
            </details>
          </div>

          {/* --- ITEM - Propiedades --- */}
          <div className="flex items-start gap-2 mt-6 hover:bg-gray-300 rounded-md p-2 cursor-pointer w-full">
            <Building size={24} className="text-gray-750" />
            <details className="[&>summary]:list-none [&>summary::-webkit-details-marker]:hidden w-full">
              <summary className="font-semibold text-base md:text-xl">Propiedades</summary>
              <ul className="mt-2 bg-gray-100 rounded-md p-2 space-y-1 hover:bg-white">
                <li><Link href="/DashboardAgente?view=subir-propiedad" className="block text-gray-800 hover:text-[#870505] transition-colors">Subir y gestionar propiedades</Link></li>
                <li><Link href="/DashboardAgente?view=borrar-propiedad" className="block text-gray-800 hover:text-[#870505] transition-colors mt-2">Borrar propiedades</Link></li>
              </ul>
            </details>
          </div>

          {/* --- ITEM - Cuenta --- */}
          <div className="flex items-start gap-2 mt-6 hover:bg-gray-300 rounded-md p-2 cursor-pointer w-full">
            <Wallet size={24} className="text-gray-750" />
            <details className="[&>summary]:list-none [&>summary::-webkit-details-marker]:hidden w-full">
              <summary className="font-semibold text-base md:text-xl">Cuenta</summary>
              <ul className="mt-2 bg-gray-100 rounded-md p-2 space-y-1 hover:bg-white">
                <li><Link href="/DashboardAgente?view=facturacion" className="block text-gray-800 hover:text-[#870505] transition-colors">Facturación</Link></li>
                <li><Link href="/DashboardAgente?view=cambiar-contrasena" className="block text-gray-800 hover:text-[#870505] transition-colors mt-2">Cambiar contraseña</Link></li>
                <li><Link href="/DashboardAgente?view=cambiar-foto-perfil" className="block text-gray-800 hover:text-[#870505] transition-colors mt-2">Cambiar Foto</Link></li>
              </ul>
            </details>
          </div>

          {/* --- ITEM - Soporte --- */}
          <div className="flex items-start gap-2 mt-6 hover:bg-gray-300 rounded-md p-2 cursor-pointer w-full">
            <HelpCircle size={24} className="text-gray-750" />
            <details className="[&>summary]:list-none [&>summary::-webkit-details-marker]:hidden w-full">
              <summary className="font-semibold text-base md:text-xl">Soporte</summary>
              <ul className="mt-2 bg-gray-100 rounded-md p-2 space-y-1 hover:bg-white">
                <li><Link href="/DashboardAgente?view=reportar-error" className="block text-gray-800 hover:text-[#870505] transition-colors">Reportar error</Link></li>
              </ul>
            </details>
          </div>

          {/* --- ITEM - Configuración --- */}
          <div className="flex items-start gap-2 mt-6 hover:bg-gray-300 rounded-md p-2 cursor-pointer w-full">
            <ShieldCheck size={24} className="text-gray-750" />
            <details className="[&>summary]:list-none [&>summary::-webkit-details-marker]:hidden w-full">
              <summary className="font-semibold text-base md:text-xl">Seguridad</summary>
              <ul className="mt-2 bg-gray-100 rounded-md p-2 space-y-1 hover:bg-white">
                <li><Link href="/DashboardAgente?view=seguridad" className="block text-gray-800 hover:text-[#870505] transition-colors mt-2">Seguridad</Link></li>
              </ul>
            </details>
          </div>

          {/* --- Botón Salir --- */}
          <div className="flex items-center justify-start text-center w-full md:w-[150px] mt-11 ml-2 md:ml-4 rounded-2xl pt-2 pb-2 px-4 bg-[#9b0624] hover:bg-[#870505] transition-colors">
            <LogOut size={24} className="text-white" />
            <Link href="/" className="ml-2 font-semibold text-base md:text-xl text-white">Salir</Link>
          </div>
        </div>

       
      </div>
    </>
  );
};

export default SidebarDashboard;
