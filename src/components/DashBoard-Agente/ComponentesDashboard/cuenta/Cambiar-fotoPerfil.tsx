import React from "react";
import { Upload } from "lucide-react";

const FotoPerfil: React.FC = () => {
  return (
    <div className="w-full px-4 sm:px-6 lg:px-0 flex items-center justify-center">
      <div className="w-full max-w-lg rounded-lg p-6 sm:p-8 bg-white shadow-[1px_5px_8px_4px_rgba(0,0,0,0.2)]">
        <h2 className="text-2xl sm:text-3xl font-bold text-[#230c89] mb-6 text-center sm:text-left">
          Seleccione foto de Perfil
        </h2>

        <div className="flex flex-col w-full space-y-4">
          {/* Imagen de perfil previa */}
          <div className="border border-gray-400 rounded-lg bg-gray-200 h-[200px] shadow" />

          {/* Botón de carga */}
          <div className="flex justify-center">
            <label
              htmlFor="file-upload"
              className="flex items-center gap-2 bg-blue-700 text-white font-semibold text-base sm:text-lg py-2 px-4 rounded-lg cursor-pointer"
            >
              <Upload size={22} />
              Subir imagen
              <input
                id="file-upload"
                type="file"
                accept="image/*"
                className="hidden"
              />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FotoPerfil;
