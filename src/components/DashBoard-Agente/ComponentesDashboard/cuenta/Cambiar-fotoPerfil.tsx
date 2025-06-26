"use client";

import React, { useState } from "react";
import { Upload, X } from "lucide-react";
import toast from "react-hot-toast";


// LEER SUPER IMPORTANTE:
// ACTUALMENTE TENES LA IMAGEN EN CLOUDINARY PERO NO LA ESTAS GUARDANDO EN NINGUN LADO POR LO QUE NO SE MANTIENE
// DEBES CREAR UN ENDPOINT EN EL BACK PARA QUE ESA IMAGEN DE PERFIL SE MANTENGA

const FotoPerfil: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const uploadImageToCloudinary = async (file: File): Promise<string> => {
    const cloudName = "dmvybzxnv"; // Cambia por tu cloud name
    const uploadPreset = "LogoYBanner"; // Tu upload preset unsigned

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error("Error al subir imagen a Cloudinary");
    }

    const data = await response.json();
    return data.secure_url;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
    setUploadedUrl(null);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      toast.error("Selecciona una imagen primero");
      return;
    }

    setIsUploading(true);

    try {
      const url = await uploadImageToCloudinary(selectedFile);
      setUploadedUrl(url);
      toast.success("Imagen subida con éxito");
      setSelectedFile(null);
      setPreviewUrl(null);
    } catch (error) {
      toast.error("Error al subir la imagen");
      console.error(error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemove = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setUploadedUrl(null);
  };

  return (
    <div className="w-full p-4  sm:px-6 lg:px-0 flex flex-col items-center justify-center gap-6 rounded-lg shadow-[1px_5px_8px_4px_rgba(0,0,0,0.2)]">
      <h2 className="text-2xl sm:text-3xl font-bold text-[#230c89] mb-6 text-center">
        Seleccione foto de Perfil
      </h2>

      {/* Preview o imagen subida */}
      <div className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-blue-600 shadow-md bg-gray-100 flex items-center justify-center">
        {uploadedUrl ? (
          // Imagen subida
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={uploadedUrl}
            alt="Foto de perfil subida"
            className="w-full h-full object-cover"
          />
        ) : previewUrl ? (
          <>
            {/* Preview imagen local */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={previewUrl}
              alt="Preview de foto seleccionada"
              className="w-full h-full object-cover"
            />
            {/* Botón X para eliminar imagen */}
            <button
              type="button"
              onClick={handleRemove}
              className="absolute top-1 right-1 bg-red-600 rounded-full p-1 hover:bg-red-700 transition"
              aria-label="Eliminar imagen seleccionada"
            >
              <X size={16} className="text-white" />
            </button>
          </>
        ) : (
          <span className="text-white font-bold text-lg select-none">
            Sin imagen
          </span>
        )}
      </div>

      {/* Input para seleccionar archivo */}
      {!uploadedUrl && (
        <label
          htmlFor="file-upload"
          className={`flex items-center gap-2 bg-blue-700 text-white font-semibold text-base sm:text-lg py-2 px-4 rounded-lg cursor-pointer ${
            isUploading ? "opacity-70 pointer-events-none" : ""
          }`}
        >
          <Upload size={22} />
          Seleccionar Imagen
          <input
            id="file-upload"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
            disabled={isUploading}
          />
        </label>
      )}

      {/* Botón subir, solo si hay preview (imagen seleccionada) */}
      {previewUrl && !uploadedUrl && (
        <button
          onClick={handleUpload}
          disabled={isUploading}
          className={`w-full max-w-xs py-2 px-4 rounded-lg font-semibold text-white ${
            isUploading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {isUploading ? "Subiendo..." : "Subir Imagen"}
        </button>
      )}
    </div>
  );
};

export default FotoPerfil;
