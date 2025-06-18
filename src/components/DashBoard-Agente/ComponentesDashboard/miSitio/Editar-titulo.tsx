import React from "react";

const EditarTitulo: React.FC = () => {

    return(
     <div className="flex flex-col items-start justify-start mt-10 max-w-xl w-full rounded-lg p-8 shadow-[1px_5px_8px_4px_rgba(0,0,0,0.2)]">
  <h2 className="text-3xl font-bold text-[#230c89] ml-8 mb-6">Editar título y descripción</h2>

  <div className="flex flex-col m-auto w-full max-w-md space-y-4">
    <div className="flex flex-col w-full">
      <label htmlFor="nombre" className="text-xl font-bold mb-1">Título actual del sitio</label>
      <input
        id="nombre"
        name="nombre"
        type="text"
        placeholder="Mi Sitio"
        className="border border-gray-400  text-gray-600 rounded-lg p-2 shadow w-full"
      />
    </div>

    <div className="flex flex-col w-full mt-4">
      <label htmlFor="descripcion" className="text-xl font-bold mb-1">Descripción</label>
      <textarea
        id="descripcion"
        name="descripcion"
        placeholder="Descripción"
        value={""}
        className="border border-gray-400 text-gray-600 rounded-lg p-2 shadow w-full min-h-[120px]"
      >Descripción</textarea>
    </div>
  </div>

  <div className="flex justify-between items-center m-auto w-full max-w-md mt-6 gap-4">
    <button className="text-white bg-blue-700 py-2 px-4 rounded-lg w-[250px] font-semibold">Guardar cambios</button>
    <button className="text-black py-2 px-4 border border-gray-400 rounded-lg w-[200px]">Cancelar</button>
  </div>
</div>
)};

export default EditarTitulo