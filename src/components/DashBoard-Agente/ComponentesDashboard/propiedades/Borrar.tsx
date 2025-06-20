// pages/eliminar-propiedades.tsx
'use client';

import Image from "next/image";
import React, { useState } from "react";

const propiedadesIniciales = [
  {
    id: 1,
    titulo: "Casa en el centro",
    precio: "$150.000",
    imagen: "/casa-centro.jpg",
  },
  {
    id: 2,
    titulo: "Apartamento con vista al mar",
    precio: "$200.000",
    imagen: "/vista-mar.jpg",
  },
  {
    id: 3,
    titulo: "Casa suburbana",
    precio: "$250.000",
    imagen: "/suburbana.jpg",
  },
  {
    id: 4,
    titulo: "Estudio acogedor",
    precio: "$100.000",
    imagen: "/estudio.jpg",
  },
  {
    id: 5,
    titulo: "villa 13 14",
    precio: "$1.000.000",
    imagen: "/estudio.jpg",
  },
];

const EliminarPropiedades = () => {
  const [propiedades, setPropiedades] = useState(propiedadesIniciales);

  const handleEliminar = (id: number) => {
    setPropiedades((prev) => prev.filter((prop) => prop.id !== id));
  };

  return (
    <div className="flex flex-col items-start justify-start mx-auto w-full max-w-7xl p-4 md:p-8 lg:p-12 rounded-lg shadow-[1px_5px_8px_4px_rgba(0,0,0,0.2)]">
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
                  src={prop.imagen}
                  alt={prop.titulo}
                  width={200}
                  height={120}
                  className="object-cover w-full h-full"
                />
              </div>
              <div>
                <p className="font-semibold text-lg">{prop.titulo}</p>
                <p className="text-gray-600">{prop.precio}</p>
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