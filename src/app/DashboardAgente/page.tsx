'use client';

// Este hook te permite leer los parámetros que están en la URL, justo después del signo ?.
import { useSearchParams } from 'next/navigation';

// import Dashboard from '@/components/DashBoard-Agente/DashboardInicio';
import EditarTitulo from '@/components/DashBoard-Agente/ComponentesDashboard/miSitio/Editar-titulo';
import CambiarColores from '@/components/DashBoard-Agente/ComponentesDashboard/miSitio/Cambiar-colores';
import Filtros from '@/components/DashBoard-Agente/ComponentesDashboard/miSitio/Configurar-filtros';
import SubirPropiedad from '@/components/DashBoard-Agente/ComponentesDashboard/propiedades/Subir';
import Borrar from '@/components/DashBoard-Agente/ComponentesDashboard/propiedades/Borrar';
import Facturacion from '@/components/DashBoard-Agente/ComponentesDashboard/cuenta/Facturacion';
import Contrasena from '@/components/DashBoard-Agente/ComponentesDashboard/cuenta/Cambiar-contraseña';
import FotoPerfil from '@/components/DashBoard-Agente/ComponentesDashboard/cuenta/Cambiar-fotoPerfil';
import ReportarError from '@/components/DashBoard-Agente/ComponentesDashboard/soporte/Reportar-error';
import Seguridad from '@/components/DashBoard-Agente/ComponentesDashboard/seguridad/Seguridad';
import { getAgente } from "@/services/agenteGet";
import { useEffect, useState } from 'react';
import { useAuthContext } from '../../../context/authContext';


export default function DashboardPage() {
  const { user } = useAuthContext(); // 

  const [agenteNombre, setAgenteNombre] = useState<string>("Cargando...");
 useEffect(() => {
    const fetchAgente = async () => {
      try {
        if(!user) return;
        const response = await getAgente(user?.id);
        // Asumiendo que el nombre viene en response.data.name
        setAgenteNombre(response.name || "Nombre no disponible");
        // Si la URL de imagen viene también, podrías setear profileImageUrl aquí:
        // setProfileImageUrl(response.data.profileImageUrl);
      } catch (error) {
        console.error("Error cargando agente:", error);
        setAgenteNombre("Error al cargar");
      }
    };

    fetchAgente();
  }, [user]);

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
      case 'borrar-propiedad':
        return <Borrar />;
      case 'facturacion':
        return <Facturacion />;
      case 'cambiar-contrasena':
        return <Contrasena />;
      case 'cambiar-foto-perfil':
        return <FotoPerfil />;
      case 'reportar-error':
        return <ReportarError />;
      case 'seguridad':
        return <Seguridad />;
      default:
        return(
          <div className="bg-gray-200 border-l-8 border-[#4A0E1B] shadow-lg rounded-lg p-6">
            {/* AQUI TAMBIEN IMPLEMENTAR EL USER DE LAS COOCKIES */}
            <h1 className="text-2xl font-bold text-[#4A0E1B] mb-2">¡Bienvenido {agenteNombre}!</h1>
            <p className="text-gray-700"> Aquí podrás gestionar todo lo relacionado con tu sitio, propiedades, clientes y mucho más. 🚀
            </p>
          </div>
          )
    }
  };

  return (
    <>
      <div className="flex m-auto mt-10 w-[70vw] item-center justify-betwenn ">
          {renderContent()}
      </div>
    </>
  );
}