import React from "react";

const MiSitio: React.FC = () => {

    return(
        <div className="flex flex-col items-start justify-start mt-10 max-w-xl w-full rounded-lg p-8 shadow-[1px_5px_8px_4px_rgba(0,0,0,0.2)]">
  <h2 className="text-3xl font-bold text-[#230c89] mb-6">Cambiar colores</h2>

  {/* Vista previa */}
  <div className="w-full max-w-md mb-6 border rounded-lg p-4 shadow" style={{ backgroundColor: '#f0f0f0' }}>
    <h3 className="text-lg font-semibold mb-2" style={{ color: '#333' }}>Vista previa del sitio</h3>
    <button className="py-2 px-4 rounded-lg" style={{ backgroundColor: '#4a90e2', color: '#fff' }}>
      Botón ejemplo
    </button>
    <p className="mt-2 ml-2" style={{ color: '#0070f3' }}>Link de ejemplo</p>
  </div>

  {/* Pickers */}
  <div className="flex flex-col w-full max-w-md space-y-6">
    <div className="flex flex-col">
      <label htmlFor="bgColor" className="text-xl font-bold mb-1">Color de fondo</label>
      <input type="color" id="bgColor" name="bgColor" className="w-full h-10 border rounded" />
    </div>

    <div className="flex flex-col">
      <label htmlFor="textColor" className="text-xl font-bold mb-1">Color del texto</label>
      <input type="color" id="textColor" name="textColor" className="w-full h-10 border rounded" />
    </div>

    <div className="flex flex-col">
      <label htmlFor="buttonColor" className="text-xl font-bold mb-1">Color de botones</label>
      <input type="color" id="buttonColor" name="buttonColor" className="w-full h-10 border rounded" />
    </div>

    <div className="flex flex-col">
      <label htmlFor="linkColor" className="text-xl font-bold mb-1">Color de los links</label>
      <input type="color" id="linkColor" name="linkColor" className="w-full h-10 border rounded" />
    </div>
  </div>

  {/* Botón de aplicar */}
  <div className="flex justify-between items-center w-full max-w-md mt-6">
    <button className="text-white bg-blue-700 py-2 px-4 rounded-lg w-full font-semibold">
      Aplicar cambios
    </button>
  </div>
</div>


)};

export default MiSitio