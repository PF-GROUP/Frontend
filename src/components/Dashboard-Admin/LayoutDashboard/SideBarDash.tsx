"use client";

import Link from "next/link";
import React from "react";
import {
  Building,
  Users,
  User,
  Wallet,
  Settings,
  LogOut,
  Home,
} from "lucide-react";

interface SidebarDashboardProps {
  name: string;
  surname: string;
}

const SidebarDashboard: React.FC<SidebarDashboardProps> = ({ name = "", surname = "" }) => {
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-[rgb(240,241,244)] pt-0 mt-0">
      {/* Barra lateral izquierda del Dashboard Admin */}
      <div className="flex flex-col border border-gray-300 bg-white w-full md:w-[330px] pl-5 pt-4 rounded-lg rounded-tl-none mt-4 shadow-[1.5px_0_5px_-1px_rgba(0,0,0,0.5)]">
        {/* Header */}
        <div className="flex items-center justify-start border-b border-gray-400 pb-4 mr-6">
          <div className="bg-gray-900 rounded-full p-2 flex items-center justify-center">
            <User className="text-white" size={42} />
          </div>
          <div className="flex flex-col items-start justify-start text-center ml-3 ">
            <h2 className="font-bold text-xl"> {name} {surname}</h2>
            <p className="font-sans text-sm ">Administrador</p>
          </div>
        </div>

        {/* Menú */}

        {/* Inicio */}
        <div className="flex items-start gap-2 mt-6 hover:bg-gray-300 rounded-md p-2 cursor-pointer w-full md:w-[95%]">
          <Home size={27} className="text-gray-750" />
          <details className="[&>summary]:list-none [&>summary::-webkit-details-marker]:hidden w-full">
            <summary className="font-semibold text-xl w-full">
              <Link href="/DashboardAdmin" className="w-full block">
                Inicio
              </Link>
            </summary>
          </details>
        </div>

        {/* Inmobiliarias */}
        <div className="mt-6 w-full md:w-[95%]">
          <details className="group bg-white rounded-md hover:bg-gray-300 transition-colors">
            <summary className="flex items-center gap-2 p-2 font-semibold text-xl cursor-pointer select-none">
              <Building size={24} className="text-gray-750" />
              Inmobiliarias
              <span className="ml-auto transition-transform duration-200 group-open:rotate-90 open:rotate-90">
                ▶
              </span>
            </summary>
            <ul className="mt-2 bg-gray-100 rounded-md p-2 space-y-1">
              <li>
                <Link
                  href="/DashboardAdmin?view=gestion-inmobiliarias"
                  className="block text-gray-800 hover:text-[#A71424] transition-colors"
                >
                  Gestión de inmobiliarias
                </Link>
              </li>
              <li>
                <Link
                  href="/DashboardAdmin?view=aprobar-inmobiliarias"
                  className="block text-gray-800 hover:text-[#A71424] transition-colors"
                >
                  Aprobación de inmobiliarias
                </Link>
              </li>
              <li>
                <Link
                  href="/DashboardAdmin?view=editar-inmobiliaria"
                  className="block text-gray-800 hover:text-[#A71424] transition-colors"
                >
                  Editar inmobiliarias
                </Link>
              </li>
              <li>
                <Link
                  href="/DashboardAdmin?view=gestion-inmobiliarias"
                  className="block text-gray-800 hover:text-[#A71424] transition-colors"
                >
                  Todas las inmobiliarias
                </Link>
              </li>
            </ul>
          </details>
        </div>

        {/* Gestión de pagos */}
        <div className="mt-6 w-full md:w-[95%]">
  <details className="group bg-white rounded-md hover:bg-gray-300 transition-colors">
    <summary className="flex items-center gap-2 p-2 font-semibold text-xl cursor-pointer select-none">
      <Wallet size={24} className="text-gray-750" />
      Gestión de pagos
      <span className="ml-auto transition-transform duration-200 group-open:rotate-90">
        ▶
      </span>
    </summary>
    <ul className="mt-2 bg-gray-100 rounded-md p-2 space-y-1">
      <li>
        <Link
          href="/DashboardAdmin?view=gestion-pagos"
          className="block text-gray-800 hover:text-[#A71424] transition-colors"
        >
          Administrar pagos
        </Link>
      </li>
    </ul>
  </details>
</div>

        {/* Formularios obligatorios */}
        <div className="mt-6 w-full md:w-[95%]">
  <details className="group bg-white rounded-md hover:bg-gray-300 transition-colors">
    <summary className="flex items-center gap-2 p-2 font-semibold text-xl cursor-pointer select-none">
      <Settings size={24} className="text-gray-750" />
      Gestión de formulario
      <span className="ml-auto transition-transform duration-200 group-open:rotate-90">
        ▶
      </span>
    </summary>
    <ul className="mt-2 bg-gray-100 rounded-md p-2 space-y-1">
      <li>
        <Link
          href="/DashboardAdmin?view=gestion-formularios"
          className="block text-gray-800 hover:text-[#A71424] transition-colors"
        >
          Administrar formularios
        </Link>
      </li>
    </ul>
  </details>
</div>

        {/* Notificaciones */}
        <div className="mt-6 w-full md:w-[95%]">
  <details className="group bg-white rounded-md hover:bg-gray-300 transition-colors">
    <summary className="flex items-center gap-2 p-2 font-semibold text-xl cursor-pointer select-none">
      <Users size={24} className="text-gray-750" />
      Notificaciones
      <span className="ml-auto transition-transform duration-200 group-open:rotate-90">
        ▶
      </span>
    </summary>
    <ul className="mt-2 bg-gray-100 rounded-md p-2 space-y-1">
      <li>
        <Link
          href="/DashboardAdmin?view=notificaciones"
          className="block text-gray-800 hover:text-[#A71424] transition-colors"
        >
          Enviar Notificación
        </Link>
      </li>
    </ul>
  </details>
</div>


        {/* Logout */}
        <div className="flex items-center justify-start text-center w-full md:w-[150px] mt-11 ml-4 rounded-2xl pt-2 pb-2 pl-3 pr-3 bg-[#9b0624] hover:bg-[#870505] transition-colors cursor-pointer">
          <LogOut size={27} className="text-white ml-2 text-center" />
          <Link
            href="/"
            className="block ml-2 font-semibold text-xl text-white text-center"
          >
            Salir
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SidebarDashboard;

