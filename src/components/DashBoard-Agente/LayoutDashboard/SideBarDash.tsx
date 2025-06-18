import Link from "next/link";
import React from "react";
import { 
  Building, 
  Users, 
  User,
  Wallet, 
  HelpCircle, 
  Settings,
  LogOut,
  Home
} from 'lucide-react';
 
const SidebarDashboard: React.FC = () => {
    return(
        <>
            <div className="flex min-h-screen bg-[rgb(240,241,244)] pt-0 mt-0">
        {/* todo esto es la barra izquierda del panel de control del Agente */}
    <div className=" flex flex-col border border-gray-300  bg-white w-[330px]  pl-5 pt-4 rounded-lg rounded-tl-none mt-4 shadow-[1.5px_0_5px_-1px_rgba(0,0,0,0.5)]" >
        
        <div className="flex items-center justify-start border-b border-gray-400 pb-4 mr-6">
            <div className="bg-gray-900 rounded-full p-2 flex items-center justify-center">
  <User className="text-white" size={42} />
</div>
            <div className="flex flex-col items-start justify-start text-center ml-3 ">
                <h2 className="font-bold text-xl">Nombre Agente</h2>
                <p className="font-sans text-sm ">Agente inmobiliario</p>
            </div>
        </div>

        {/* pegalo desde aca al detail */}

    <div className="flex items-start gap-2 mt-6 hover:bg-gray-300 rounded-md p-2 cursor-pointer w-[95%]">
  <Home size={27} className="text-gray-750" />
  <details className="[&>summary]:list-none [&>summary::-webkit-details-marker]:hidden w-full">
    <summary className="font-semibold text-xl  w-full">
      <Link rel="stylesheet" href="/DashboardAgente" className=" w-full" >
      Inicio
      </Link>
    </summary>
    
  </details>
    </div>


      {/* desde aca pega Mati */}
    <div className="flex items-start gap-2 mt-6 hover:bg-gray-300 rounded-md p-2 cursor-pointer w-[95%]">
  <User size={27} className="text-gray-750" />
  <details className="[&>summary]:list-none [&>summary::-webkit-details-marker]:hidden w-full">
    <summary className="font-semibold text-xl">Mi Sitio</summary>
    <ul className="mt-2 bg-gray-100 rounded-md p-2 space-y-1 hover:bg-white">
      <li><Link href="/DashboardAgente?view=editar-titulo" className="block text-gray-800 hover:text-blue-600 transition-colors">Editar Nombre y descripción</Link></li>
      <li><Link href="/DashboardAgente?view=cambiar-colores" className="block text-gray-800 hover:text-blue-600 transition-colors mt-2">Cambiar colores</Link></li>
      <li><Link href="/DashboardAgente?view=configurar-filtros" className="block text-gray-800 hover:text-blue-600 transition-colors mt-2">Configurar filtros</Link></li>
    </ul>
  </details>
</div>

<div className="flex items-start gap-2 mt-6 hover:bg-gray-300 rounded-md p-2 cursor-pointer w-[95%]">
  <Building size={24} className="text-gray-750" />
  <details className="[&>summary]:list-none [&>summary::-webkit-details-marker]:hidden w-full">
    <summary className="font-semibold text-xl">Propiedades</summary>
    <ul className="mt-2 bg-gray-100 rounded-md p-2 space-y-1 hover:bg-white">
      <li><Link href="/DashboardAgente?view=subir-propiedad" className="block text-gray-800 hover:text-blue-600 transition-colors">Subir y gestionar propiedades</Link></li>
      <li><Link href="/DashboardAgente?view=agregar-foto" className="block text-gray-800 hover:text-blue-600 transition-colors mt-2">Agregar fotos a propiedad</Link></li>
      <li><Link href="/DashboardAgente?view=precio-propiedad" className="block text-gray-800 hover:text-blue-600 transition-colors mt-2">Agregar precio a propiedad</Link></li>
      <li><Link href="/DashboardAgente?view=borrar-propiedad" className="block text-gray-800 hover:text-blue-600 transition-colors mt-2">Borrar propiedades</Link></li>
    </ul>
  </details>
</div>

<div className="flex items-start gap-2 mt-6 hover:bg-gray-300 rounded-md p-2 cursor-pointer w-[95%]">
  <Users size={24} className="text-gray-750" />
  <details className="[&>summary]:list-none [&>summary::-webkit-details-marker]:hidden w-full">
    <summary className="font-semibold text-xl">Clientes</summary>
    <ul className="mt-2 bg-gray-100 rounded-md p-2 space-y-1 hover:bg-white">
      <li><Link href="/DashboardAgente?view=notificaciones" className="block text-gray-800 hover:text-blue-600 transition-colors">Ver notificaciones de citas</Link></li>
      <li><Link href="/DashboardAgente?view=editar-clientes" className="block text-gray-800 hover:text-blue-600 transition-colors mt-2">Editar o borrar Clientes</Link></li>
    </ul>
  </details>
</div>

<div className="flex items-start gap-2 mt-6 hover:bg-gray-300 rounded-md p-2 cursor-pointer w-[95%]">
  <Wallet size={24} className="text-gray-750" />
  <details className="[&>summary]:list-none [&>summary::-webkit-details-marker]:hidden w-full">
    <summary className="font-semibold text-xl">Cuenta</summary>
    <ul className="mt-2 bg-gray-100 rounded-md p-2 space-y-1 hover:bg-white">
      <li><Link href="/DashboardAgente?view=facturacion" className="block text-gray-800 hover:text-blue-600 transition-colors">Facturación</Link></li>
      <li><Link href="/DashboardAgente?view=cambiar-contrasena" className="block text-gray-800 hover:text-blue-600 transition-colors mt-2">Cambiar contraseña</Link></li>
      <li><Link href="/DashboardAgente?view=cambiar-foto-perfil" className="block text-gray-800 hover:text-blue-600 transition-colors mt-2">Cambiar Foto de Perfil</Link></li>
      <li><Link href="/DashboardAgente?view=suscripcion" className="block text-gray-800 hover:text-blue-600 transition-colors mt-2">Suscripcion</Link></li>
    </ul>
  </details>
</div>

<div className="flex items-start gap-2 mt-6 hover:bg-gray-300 rounded-md p-2 cursor-pointer w-[95%]">
  <HelpCircle size={24} className="text-gray-750" />
  <details className="[&>summary]:list-none [&>summary::-webkit-details-marker]:hidden w-full">
    <summary className="font-semibold text-xl">Soporte</summary>
    <ul className="mt-2 bg-gray-100 rounded-md p-2 space-y-1 hover:bg-white">
      <li><Link href="/DashboardAgente?view=reportar-error" className="block text-gray-800 hover:text-blue-600 transition-colors">Reportar error técnico</Link></li>
      <li><Link href="/DashboardAgente?view=tickets-soporte" className="block text-gray-800 hover:text-blue-600 transition-colors mt-2">Enviar tickets de soporte</Link></li>
      <li><Link href="/DashboardAgente?view=sugerencias" className="block text-gray-800 hover:text-blue-600 transition-colors mt-2">Sugerencias</Link></li>
    </ul>
  </details>
</div>

<div className="flex items-start gap-2 mt-6 hover:bg-gray-300 rounded-md p-2 cursor-pointer w-[95%]">
  <Settings size={24} className="text-gray-750" />
  <details className="[&>summary]:list-none [&>summary::-webkit-details-marker]:hidden w-full">
    <summary className="font-semibold text-xl">Configuración</summary>
    <ul className="mt-2 bg-gray-100 rounded-md p-2 space-y-1 hover:bg-white">
      <li><Link href="/DashboardAgente?view=preferencias" className="block text-gray-800 hover:text-blue-600 transition-colors">Preferencias</Link></li>
      <li><Link href="/DashboardAgente?view=seguridad" className="block text-gray-800 hover:text-blue-600 transition-colors mt-2">Seguridad</Link></li>
    </ul>
  </details>
</div>
{/* hasta que dejas de copiar */}

<div className=" flex items-center justify-start text-center w-[150px] mt-11 ml-4 rounded-2xl pt-2 pb-2 pl-3 pr-3 bg-[#9b0624] hover:bg-[#870505] transition-colors ">
    <LogOut size={27} className="text-gray-750  ml-2 text-white text-center" />
    <Link href="/" className="block ml-2 font-semibold text-xl   text-white  text-center">Salir</Link>
</div>
</div>
</div>
    </>

)}

export default SidebarDashboard