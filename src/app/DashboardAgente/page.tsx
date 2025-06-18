'use client';

// Este hook te permite leer los parámetros que están en la URL, justo después del signo ?.
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
        return(
          <div className="bg-gray-200 border-l-8 border-[#4A0E1B] shadow-lg rounded-lg p-6">
            <h1 className="text-2xl font-bold text-[#4A0E1B] mb-2">¡Bienvenido Matias Diaz!</h1>
            <p className="text-gray-700"> Aquí podrás gestionar todo lo relacionado con tu sitio, propiedades, clientes y mucho más. 🚀
            </p>
          </div>
          )
    }
  };

  return (
    <>
      <div className="flex m-auto w-[50vw] item-center justify-center ">
          {renderContent()}
      </div>
    </>
  );
}