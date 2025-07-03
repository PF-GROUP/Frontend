'use client';

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

import EditarTitulo from '@/components/DashBoard-Agente/ComponentesDashboard/miSitio/Editar-titulo';
import CambiarColores from '@/components/DashBoard-Agente/ComponentesDashboard/miSitio/Cambiar-colores';
import SubirPropiedad from '@/components/DashBoard-Agente/ComponentesDashboard/propiedades/Subir';
import Borrar from '@/components/DashBoard-Agente/ComponentesDashboard/propiedades/Borrar';
import Contrasena from '@/components/DashBoard-Agente/ComponentesDashboard/cuenta/Cambiar-contraseña';
import FotoPerfil from '@/components/DashBoard-Agente/ComponentesDashboard/cuenta/Cambiar-fotoPerfil';
import ReportarError from '@/components/DashBoard-Agente/ComponentesDashboard/soporte/Reportar-error';
import Seguridad from '@/components/DashBoard-Agente/ComponentesDashboard/seguridad/Seguridad';
import UploadLogoBanner from '@/components/DashBoard-Agente/ComponentesDashboard/miSitio/enviarLogoYBanner';
import { useAuthContext } from '../../../../context/authContext';
import Loader from '../../../components/Loader/Loader'; // Asegurate que este path sea correcto
import SuscripcionNewsletter from "../../../components/DashBoard-Agente/ComponentesDashboard/soporte/SuscripciónNewsletter"

function DashboardContent() {
  const { user } = useAuthContext();
  const searchParams = useSearchParams(); 
  const view = searchParams.get('view');

  const renderContent = () => {
    switch (view) {
      case 'editar-titulo':
        return <EditarTitulo />;
      case 'cambiar-colores':
        return <CambiarColores />;
      case 'enviarLogoYBanner':
        return <UploadLogoBanner customizationId='' setCustomizationId={() => {}} />;
      case 'subir-propiedad':
        return <SubirPropiedad />;
      case "Suscripcion-Newsletter" :
        return <SuscripcionNewsletter />;
      case 'borrar-propiedad':
        return <Borrar />;
      case 'cambiar-contrasena':
        return <Contrasena />;
      case 'cambiar-foto-perfil':
        return <FotoPerfil />;
      case 'reportar-error':
        return <ReportarError />;
      case 'seguridad':
        return <Seguridad />;
      default:
        return (
          <div className="bg-gray-200 border-l-8 border-[#A62F55] shadow-lg rounded-lg p-6">
            <h1 className="text-2xl font-bold text-[#831F40] mb-2">
              ¡Bienvenido/a {user?.name}!
            </h1>
            <p className="text-gray-700">
              Desde tu página gestioná todo lo relacionado con tu sitio, propiedades, clientes y mucho más. 🚀
            </p>
          </div>
        );
    }
  };

  return renderContent();
}

export default function Page() {
  return (
    <Suspense fallback={<div><Loader /></div>}>
      <DashboardContent />
    </Suspense>
  );
}