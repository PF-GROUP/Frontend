
import React from "react";
import ContactoAgente from "../../../../components/AgenciaComponents/ContactoAgente";

import { agencias } from "../../../../../helper/DatosAgencia";

interface ContactoProps {
  params: Promise<{ slug: string }>;
}

export function slugify(name: string) {
  return name.toLowerCase().replace(/\s+/g, "-");
}

export default async function ContactoPage({ params }: ContactoProps) {
  const { slug } = await params;

  const agencia = agencias.find((a) => slugify(a.name) === slug.toLowerCase());

  if (!agencia) {
    return <div>Agencia no encontrada</div>;
  }

  return (
    <div>

       <ContactoAgente
                name={agencia.agentUser.name}
                surname={agencia.agentUser.surname}
                email={agencia.agentUser.email}
                phone={agencia.agentUser.phone}
              />
    </div>
  );
}
