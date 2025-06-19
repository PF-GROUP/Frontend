'use client';



import { useSearchParams } from 'next/navigation';

import GestionInmobiliarias from '@/components/DashBoard-Agente/ComponentesDashboard/Gestion-de-inmobiliarias/GestionInmobiliarias';
import AprobarInmobiliarias from '@/components/DashBoard-Agente/ComponentesDashboard/Gestion-de-inmobiliarias/AprobarInmobiliarias';
import EditarInmobiliaria from '@/components/DashBoard-Agente/ComponentesDashboard/Gestion-de-inmobiliarias/EditarInmobiliarias';
import PagosInmobiliarias from '@/components/DashBoard-Agente/ComponentesDashboard/Gestion-de-pagos/PagosInmobiliarias';
import CamposObligatorios from '@/components/DashBoard-Agente/ComponentesDashboard/Gestion-de-formularios/CamposObligatorios';
import NotificacionesGlobales from '@/components/DashBoard-Agente/ComponentesDashboard/Soporte-y-comunicacion/NotificacionesGlobales';
import { adminUser } from "../../../helper/user";

export default function DashboardPage( ) {
  const searchParams = useSearchParams(); 
  const view = searchParams.get('view');

  const renderContent = () => {
    switch (view) {
      case 'gestion-inmobiliarias':
        return <GestionInmobiliarias />;
      case 'aprobar-inmobiliarias':
        return <AprobarInmobiliarias />;
      case 'editar-inmobiliaria':
        return <EditarInmobiliaria />;
      case 'gestion-pagos':
        return <PagosInmobiliarias />;
      case 'gestion-formularios':
        return <CamposObligatorios />;

      case 'notificaciones':
        return <NotificacionesGlobales />;
      default:
        return (
          <div className="bg-gray-200 border-l-8 border-[#4A0E1B] shadow-lg rounded-lg p-6 max-w-3xl mx-auto">
            <h1 className="text-2xl font-bold text-[#4A0E1B] mb-2">¡Bienvenido {adminUser.name} {adminUser.surname}!</h1>
            <p className="text-gray-700">
              Aquí podrás gestionar todo lo relacionado con KasApp, Inmobiliarias, Gestión de Pagos y mucho más. 🚀
            </p>
          </div>
        );
    }
  };

  return (
    <div className="flex justify-center items-start min-h-screen p-6 bg-gray-50">
      <div className="w-full max-w-5xl">
        {renderContent()}
      </div>
    </div>
  );
}
