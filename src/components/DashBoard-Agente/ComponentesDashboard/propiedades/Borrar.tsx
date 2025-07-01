'use client';

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useAuthContext } from '../../../../../context/authContext';
import apiService from '@/services/apiService';

interface IPropiedad {
  id: string;
  name: string;
  price: number;
  agency: string;
}

const EliminarPropiedades = () => {
  const { user } = useAuthContext();
  const [propiedades, setPropiedades] = useState<IPropiedad[]>([]);

  console.log("hola");
  useEffect(() => {
    const fetchPropiedades = async () => {
      
      try {
        const response = await apiService.get("/property", true);
        const propiedadesFiltradas = response.filter(
          (prop) => prop.agency === user?.agencyId
        );
        console.log("Propiedades Filter: ",propiedadesFiltradas);
        
        setPropiedades(propiedadesFiltradas);
      } catch (error) {
        console.error("Error al traer propiedades:", error);
      }
    };
    
    if (user?.agencyId) fetchPropiedades();
  }, [user]);

  const handleEliminar = async (id:string) => {
    try {
      await apiService.del(`/property/soft/${id}`, true);
      setPropiedades((prev) => prev.filter((prop) => prop.id !== id));
    } catch (error) {
      console.error("Error al eliminar propiedad:", error);
    }
  };

  return (
    <div className="flex flex-col items-start justify-start mx-auto w-full max-w-7xl p-4 md:p-8 lg:p-8 rounded-lg shadow-[1px_5px_8px_4px_rgba(0,0,0,0.2)]">
      <h2 className="text-2xl md:text-3xl font-bold text-[#230c89] mb-6 ml-2 md:ml-4">
        Borrar propiedades
      </h2>

      <div className="flex flex-col w-full space-y-5">
        {propiedades.map((prop) => (
          <div
            key={prop.id}
            className="flex flex-col md:flex-row items-start md:items-center justify-between bg-gray-200 border border-gray-300 rounded-lg p-4 hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02]"
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full">
              <div className="w-full sm:w-[200px] h-[120px] overflow-hidden rounded-md">
                <Image
                  src={prop.id_images[0]} // reemplazar si tenés URL real de imagen
                  alt={prop.name}
                  width={200}
                  height={120}
                  className="object-cover w-full h-full"
                />
              </div>
              <div>
                <p className="font-semibold text-lg">{prop.name}</p>
                <p className="text-gray-600">${prop.price.toLocaleString()}</p>
              </div>
            </div>
            <button
              onClick={() => handleEliminar(prop.id)}
              className="mt-4 md:mt-0 text-white bg-red-600 py-2 px-4 rounded-lg font-semibold hover:bg-red-800 transition w-full sm:w-auto"
            >
              Eliminar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EliminarPropiedades;
