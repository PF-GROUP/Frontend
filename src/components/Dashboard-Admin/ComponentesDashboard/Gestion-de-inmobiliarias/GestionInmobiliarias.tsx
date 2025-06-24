"use client";
import { useState } from "react";

type Inmobiliaria = {
  id: number;
  nombre: string;
  email: string;
};

const mockInmobiliarias: Inmobiliaria[] = [
  { id: 1, nombre: "Urbanos SRL", email: "info@urbanos.com" },
  { id: 2, nombre: "Propiedades Delta", email: "delta@propiedades.com" },
];

export default function GestionInmobiliarias() {
  const [inmobiliarias, setInmobiliarias] = useState(mockInmobiliarias);


  const [modalOpen, setModalOpen] = useState(false);
  const [modalAction, setModalAction] = useState<"eliminar" | "suspender" | null>(null);
  const [selectedId, setSelectedId] = useState<number | null>(null);


  const abrirModal = (action: "eliminar" | "suspender", id: number) => {
    setModalAction(action);
    setSelectedId(id);
    setModalOpen(true);
  };


  const cerrarModal = () => {
    setModalOpen(false);
    setModalAction(null);
    setSelectedId(null);
  };


  const confirmarEliminar = () => {
    if (selectedId !== null) {
      setInmobiliarias((prev) => prev.filter((i) => i.id !== selectedId));
      console.log("Eliminada inmobiliaria ID:", selectedId);
      cerrarModal();
    }
  };


  const confirmarSuspender = () => {
    if (selectedId !== null) {

      console.log("Suspendida inmobiliaria ID:", selectedId);
      cerrarModal();
    }
  };

  return (
    <div className="bg-white p-4 md:p-6 rounded-xl shadow-md w-full max-w-4xl mx-auto relative">
      <h2 className="text-2xl font-semibold mb-6 text-[rgb(66,20,36)]">
        Gestionar Inmobiliarias
      </h2>

      {inmobiliarias.length === 0 ? (
        <p className="text-gray-500">No hay inmobiliarias para gestionar.</p>
      ) : (
        <ul className="space-y-4">
          {inmobiliarias.map((inmo) => (
            <li
              key={inmo.id}
              className="flex flex-col md:flex-row md:items-center justify-between border border-gray-200 p-4 rounded-lg hover:bg-gray-50 transition"
            >
              <div className="mb-4 md:mb-0 md:w-2/3">
                <p className="font-semibold text-lg">{inmo.nombre}</p>
                <p className="text-sm text-gray-600">{inmo.email}</p>
              </div>
              <div className="flex flex-col gap-2 md:flex-row md:gap-4">
                <button
                  onClick={() => abrirModal("suspender", inmo.id)}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded text-sm"
                >
                  Suspender
                </button>
                <button
                  onClick={() => abrirModal("eliminar", inmo.id)}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded text-sm"
                >
                  Eliminar
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* Modal ASHEEEEEEEEEEEEEEEEEEE*/}
      {modalOpen && (
  <div className="fixed inset-0  bg-black/70 flex items-center justify-center z-50 modal-overlay">
    <div className="bg-white rounded-lg p-6 max-w-sm w-full shadow-lg">
      <h3 className="text-lg font-semibold mb-4 text-center">
        {modalAction === "eliminar"
          ? "¿Estás seguro que querés eliminar esta inmobiliaria?"
          : "¿Estás seguro que querés suspender esta inmobiliaria?"}
      </h3>
      <div className="flex justify-center gap-4">
        <button
          onClick={cerrarModal}
          className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
        >
          Volver
        </button>
        {modalAction === "eliminar" ? (
          <button
            onClick={confirmarEliminar}
            className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
          >
            Eliminar
          </button>
        ) : (
          <button
            onClick={confirmarSuspender}
            className="px-4 py-2 rounded bg-yellow-500 text-white hover:bg-yellow-600"
          >
            Suspender
          </button>
        )}
      </div>
    </div>
  </div>
)}
    </div>
  );
}
