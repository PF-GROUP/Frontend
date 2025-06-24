
import React, { ReactNode, useEffect } from "react";
import { agencias } from "../../../../helper/DatosAgencia";
// import { notFound } from "next/navigation";
import NavbarAgente from "../../../components/AgenciaComponents/NavbarAgente";
import { Metadata } from "next";
import FooterAgencia from "@/components/AgenciaComponents/FooterAgencia";
import { notFound } from "next/navigation";
import { getAgencies } from "@/services/agenciasServise";

interface LayoutProps {
  children: ReactNode;
  params: {
    slug: string;
  };
}


  const agencias = getAgencies();
  console.log("Agencias:", agencias);


function toSlug(name: string) {
  return name.toLowerCase().replace(/\s+/g, "-");
}


export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const agencia = agencias.find((a) => toSlug(a.name) === params.slug);

  if (!agencia) {
    return {
      title: "Agencia no encontrada",
      description: "La agencia solicitada no existe",
      icons: "iconoKasapp.png",
    };
  }

  return {
    title: `${agencia.name}`,
    description: agencia.description || "Página oficial de la agencia inmobiliaria",
    icons: `${agencia.customization.logoImage}`,
  };
}

export default function LayoutAgencia({ children, params }: LayoutProps) {
  const { slug } = params;

  const agencia = agencias.find((a) => toSlug(a.name) === slug);

   if (!agencia) {
      return notFound()
    }

  return (
    <>
      <NavbarAgente
        slug={slug}
        navbarColor={agencia.customization.navbarColor}
        buttonColor={agencia.customization.buttonColor}
        logoImage={agencia.customization.logoImage}
        agenciaName={agencia.name}
      />

      <div
        style={{
          backgroundColor: agencia.customization.backgroundColor,
          minHeight: "100vh",
          color: agencia.customization.mainColors,
        }}
      >
        {children}
      </div>
      <FooterAgencia agenciaName={agencia.name} />
    </>
  );
}
