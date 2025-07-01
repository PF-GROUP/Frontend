// pages/eliminar-propiedades.tsx
'use client';

import apiService from "@/services/apiService";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useAuthContext } from "../../../../../context/authContext";


interface Propiedad {
  id: string;
  name: string;
  price: string;
  address: string;
  type_of_property: {
    type: string;
  };
  images: { file: string }[];
}

const EliminarPropiedades = () => {

  const {user} = useAuthContext()

  const [propiedades, setPropiedades] = useState<Propiedad[]>([]);


  useEffect(() => {
    const fetchPropiedades = async () => {
      if (!user?.agencyId) return; // Espera que el usuario esté listo

      try {
        const propiedadesData = await apiService.get(
          `/property/agency/${user.agencyId}`,
          true
        );
        console.log("Estas son las propiedades: ", propiedadesData);
        setPropiedades(propiedadesData);
      } catch (error) {
        console.error("Error al obtener propiedades:", error);
      }
    };

      fetchPropiedades();
  }, [user?.agencyId, ]);

  // const handleEliminar = (id: number) => {
  //   setPropiedades((prev) => prev.filter((prop) => prop.id !== id));
  // };

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
              <div className="w-full sm:w-[200px] h-[120px] overflow-hidden rounded-md mr-3">
                <Image
                  src={prop.images[0]?.file || "/imagen-placeholder.jpg"}
                  alt={prop.name}
                  width={200}
                  height={120}
                  className="object-cover w-full h-full"
                />
              </div>
              <div>
              <p className="font-semibold text-xl text-[#af355c] mb-1">
                <span className="font-bold mr-2 text-[#85173b]">nombre:</span> {prop.name}
              </p>
              <p className="text-lg text-[#992b50] mb-1 ml-1">
                <span className="font-semibold mr-2 text-[#8e2446]">dirección:</span> {prop.address}
              </p>
              <p className="text-lg italic  text-[#bd486d] mb-2 ml-1">
                <span className="font-semibold mr-2 text-[#91274b]">tipo:</span> {prop.type_of_property?.type}
              </p>
              <p className="text-green-600 font-bold text-lg ml-1">
                <span className="font-semibold mr-2 text-green-700">precio:</span> ${prop.price}
              </p>
              </div>
            </div>
            <button
              onClick={() => handleEliminar(prop.id)}
              className="mt-4 md:mt-0 text-white mr-4 bg-[#A62F55] py-2 px-4 rounded-lg font-semibold hover:bg-[#831F40]  transition w-full sm:w-auto"
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