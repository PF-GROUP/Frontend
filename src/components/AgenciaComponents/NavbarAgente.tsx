"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

interface NavbarAgenteProps {
  slug: string;
  navbarColor: string;
  buttonColor: string;
  logoImage: string;
  agenciaName: string;
}

export default function NavbarAgente({
  slug,
  navbarColor,
  buttonColor,
  logoImage,
  agenciaName,
}: NavbarAgenteProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="w-full" style={{ backgroundColor: navbarColor }}>
      <div className="max-w-7xl mx-auto flex flex-wrap items-center px-4 py-3">
        
        <div className="flex items-center gap-3 md:justify-start">
          <img src={logoImage} alt={`${slug} logo`} className="h-12 w-auto" />
          <Link href={`/agencia/${slug}/home`} className="text-white font-bold text-xl">
            {agenciaName}
          </Link>
        </div>

        
        <div className="ml-auto md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white focus:outline-none"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        
        <div className="hidden md:flex items-center gap-6 ml-auto">
          <Link href={`/agencia/${slug}/home`} className="text-white">
            Home
          </Link>
          <Link
            href={`/agencia/${slug}/contacto`}
            className="text-white px-4 py-2 rounded"
            style={{ backgroundColor: buttonColor }}
          >
            Contacto
          </Link>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden px-4 pb-4 flex flex-col gap-3">
          <Link href={`/agencia/${slug}/home`} className="text-white">
            Home
          </Link>
          <Link
            href={`/agencia/${slug}/contacto`}
            className="text-white px-4 py-2 rounded text-center"
            style={{ backgroundColor: buttonColor }}
          >
            Contacto
          </Link>
        </div>
      )}
    </nav>
  );
}
