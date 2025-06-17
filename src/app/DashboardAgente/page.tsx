'use client';

import { useSearchParams } from 'next/navigation';

// import Dashboard from '@/components/DashBoard-Agente/DashboardInicio';
import EditarTitulo from '@/components/DashBoard-Agente/ComponentesDashboard/miSitio/Editar-titulo';
import CambiarColores from '@/components/DashBoard-Agente/ComponentesDashboard/miSitio/Cambiar-colores';
import Filtros from '@/components/DashBoard-Agente/ComponentesDashboard/miSitio/Configurar-filtros';
import SubirPropiedad from '@/components/DashBoard-Agente/ComponentesDashboard/propiedades/Subir';
import AgregarFoto from '@/components/DashBoard-Agente/ComponentesDashboard/propiedades/Agregar-foto';
import Precio from '@/components/DashBoard-Agente/ComponentesDashboard/propiedades/Precio';
import Borrar from '@/components/DashBoard-Agente/ComponentesDashboard/propiedades/Borrar';
import Notificaciones from '@/components/DashBoard-Agente/ComponentesDashboard/clientes/Notificaciones';
import Clientes from '@/components/DashBoard-Agente/ComponentesDashboard/clientes/Editar';
import Facturacion from '@/components/DashBoard-Agente/ComponentesDashboard/cuenta/Facturacion';
import Contrasena from '@/components/DashBoard-Agente/ComponentesDashboard/cuenta/Cambiar-contraseña';
import FotoPerfil from '@/components/DashBoard-Agente/ComponentesDashboard/cuenta/Cambiar-fotoPerfil';
import Suscripcion from '@/components/DashBoard-Agente/ComponentesDashboard/cuenta/Suscripcion';
import ReportarError from '@/components/DashBoard-Agente/ComponentesDashboard/soporte/Reportar-error';
import TicketsSoporte from '@/components/DashBoard-Agente/ComponentesDashboard/soporte/Tickets';
import Sugerencias from '@/components/DashBoard-Agente/ComponentesDashboard/soporte/Sugerencias';
import Preferencias from '@/components/DashBoard-Agente/ComponentesDashboard/configuracion/Preferencias';
import Seguridad from '@/components/DashBoard-Agente/ComponentesDashboard/configuracion/Seguridad';

export default function DashboardPage() {
  const searchParams = useSearchParams();
  const view = searchParams.get('view');

  const renderContent = () => {
    switch (view) {
      case 'editar-titulo':
        return <EditarTitulo />;
      case 'cambiar-colores':
        return <CambiarColores />;
      case 'configurar-filtros':
        return <Filtros />;
      case 'subir-propiedad':
        return <SubirPropiedad />;
      case 'agregar-foto':
        return <AgregarFoto />;
      case 'precio-propiedad':
        return <Precio />;
      case 'borrar-propiedad':
        return <Borrar />;
      case 'notificaciones':
        return <Notificaciones />;
      case 'editar-clientes':
        return <Clientes />;
      case 'facturacion':
        return <Facturacion />;
      case 'cambiar-contrasena':
        return <Contrasena />;
      case 'cambiar-foto-perfil':
        return <FotoPerfil />;
      case 'suscripcion':
        return <Suscripcion />;
      case 'reportar-error':
        return <ReportarError />;
      case 'tickets-soporte':
        return <TicketsSoporte />;
      case 'sugerencias':
        return <Sugerencias />;
      case 'preferencias':
        return <Preferencias />;
      case 'seguridad':
        return <Seguridad />;
      default:
        // return <Dashboard />;
    }
  };

  return (
    <>
      <div className="flex ">
        <main className="flex-1 p-6 ml-6 border-gray-300 flex-col border rounded-tr-none bg-white pl-4 pt-5.5 rounded-lg mt-4 shadow-[4px_5px_8px_4px_rgba(0,0,0,0.4)]">
          {renderContent()}
        </main>
      </div>
    </>
  );
}