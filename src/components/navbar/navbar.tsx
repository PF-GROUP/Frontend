"use client";
import Link from 'next/link';
import Image from 'next/image';
import React from "react";
import { useAuthContext, } from '../../../context/authContext';
import Loader from '../Loader/Loader';


const Navbar: React.FC = () => {
  const [showMenu, setShowMenu] = React.useState(false);
  const { isAuth } = useAuthContext();
  const logeado = isAuth;

  return (
  <nav className="relative flex justify-between items-center px-6 py-4 bg-white shadow-md h-16   mx-auto">
     <Link href="/home" className="flex items-center space-x-2 h-full"> 
    <div className="flex items-center space-x-2 h-full">
      <Image
        src="/image.png"
        alt="Logo"
        width={48}
        height={48}
        className="object-contain h-full w-auto"
      />
      <span className="text-xl font-bold text-[#4A0E1B]">KasApp</span>
    </div>
    </Link>

    {/* Escritorio */}
    <div className="hidden md:flex items-center space-x-4">
      <Link href="/home">Home</Link>
      <Link href="/#sección0">Nosotros</Link>
      <Link href="/contacto">Contacto</Link>
      {logeado === null ? (
        <Loader />
      ) : logeado ? (
        <Link href="/perfil">
          <button className="bg-[#A62F55] hover:bg-[#922749] text-white px-2 py-1 cursor-pointer rounded">
            Dashboard
          </button>
        </Link>
      ) : ( 
        <div className="flex items-center space-x-2">
          <Link href="/login">
            <button className="bg-[#A62F55] hover:bg-[#922749] text-white px-2 py-1 cursor-pointer rounded">
              Iniciar sesión
            </button>
          </Link>
          <Link href="/register">
            <button className="bg-[#A62F55] hover:bg-[#922749] text-white px-2 py-1 rounded cursor-pointer">
              Crear página
            </button>
          </Link>
        </div>
      )}
     
    </div>

    {/* Móvil */}
    <button className="md:hidden flex items-center space-x-2" onClick={() => setShowMenu(!showMenu)}>
      <span className="text-[#A62F55]">☰</span>
      <span>Menú</span>
    </button>

    {/* Menú móvil */}
    {showMenu && (
      <div className="absolute right-6 top-full mt-2 md:hidden flex flex-col space-y-2 bg-white shadow-lg p-4 rounded z-50">
        <Link href="/home">Home</Link>
        <Link href="/#sección0">Nosotros</Link>
        <Link href="/contacto">Contacto</Link>
        {logeado ? (
        <Link href="/perfil">
          <button className="bg-[#A62F55] hover:bg-[#922749] text-white px-2 py-1 rounded">
            Dashboard
          </button>
        </Link>
      ) : (
        <div className="flex flex-col items-center space-y-2">
  <Link href="/login">
    <button className="bg-[#A62F55] hover:bg-[#922749] text-white px-2 py-1 rounded">
      Iniciar sesión
    </button>
  </Link>
  <Link href="/register">
    <button className="bg-[#A62F55] hover:bg-[#922749] text-white px-2 py-1 rounded">
      Crear página
    </button>
  </Link>
</div>
      )}
      </div>
    )}
  </nav>
);
}
export default Navbar;