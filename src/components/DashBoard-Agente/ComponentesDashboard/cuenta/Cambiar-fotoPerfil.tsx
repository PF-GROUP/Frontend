/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState, useRef } from "react";
import { Upload, X, Image } from "lucide-react";
import toast from "react-hot-toast";
import { useAuthContext } from "../../../../../context/authContext";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const FotoPerfil: React.FC = () => {
  const { user, SaveUserData } = useAuthContext();

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  // 👉 Ref para el input de tipo file (permite reiniciarlo si se borra la imagen)
  const inputRef = useRef<HTMLInputElement>(null);

  // ✅ Se ejecuta cuando se elige un archivo manual o por drag & drop
  const handleFileChange = (file: File) => {
    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file)); // genera una preview local temporal
  };

  // ✅ Se ejecuta cuando se selecciona un archivo desde el input
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFileChange(file);
  };

  // ✅ Se ejecuta cuando se suelta un archivo en el área drag & drop
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      handleFileChange(file);
      e.dataTransfer.clearData();
    }
  };

  // ✅ Se ejecuta cuando se clickea la "X" para eliminar la imagen seleccionada
  const handleRemove = () => {
    setSelectedFile(null);
    setPreviewUrl(null);

    // Limpia el input para permitir volver a seleccionar el mismo archivo
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  // ✅ Subida de imagen al backend
  const handleUpload = async () => {
    if (!selectedFile) {
      toast.error("Selecciona una imagen primero");
      return;
    }

    if (!user || !user.id) {
      toast.error("No se encontró el usuario");
      return;
    }

    setIsUploading(true);

    try {
      // 📨 Creamos el FormData para enviar la imagen como multipart/form-data
      const formData = new FormData();
      formData.append("file", selectedFile);

      // 📤 Enviamos la imagen al backend, que a su vez la sube a Cloudinary
      const response = await fetch(`${API_URL}/images/profile/${user.id}`, {
        method: "POST",
        body: formData,
        credentials: "include", // incluye cookies para autenticar al usuario
      });

      if (!response.ok) throw new Error("Error al subir la imagen");

      // ✅ La respuesta debería incluir la URL pública generada por Cloudinary
      // Esto depende de cómo esté hecho tu backend. Por convención, devolvés algo como:
      // { imageUrl: "https://res.cloudinary.com/..." }
      const { imageUrl } = await response.json();

      // 🧠 Actualizamos el contexto con la nueva URL de la imagen de perfil
      const updatedUser = { ...user, profilePictureUrl: imageUrl };
      SaveUserData({ user: updatedUser });

      toast.success("Imagen subida y perfil actualizado");

      // 🧹 Limpiamos estados
      setSelectedFile(null);
      setPreviewUrl(null);
      if (inputRef.current) inputRef.current.value = "";
    } catch (error) {
      toast.error("Error al subir la imagen");
      console.error(error);
    } finally {
      setIsUploading(false);
    }
  };

  const dropRef = useRef<HTMLDivElement>(null);
  
  return (
    <div className="w-full p-4 sm:px-6 lg:px-0 flex flex-col items-center justify-center gap-6 rounded-lg shadow-[1px_5px_8px_4px_rgba(0,0,0,0.2)]">
      <h2 className="text-2xl sm:text-3xl font-bold text-[#230c89] mt-3 mb-1 text-center">
        Seleccione una foto de perfil
      </h2>

      {/* 🎯 Área drag & drop */}
      <div
        ref={dropRef}
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        onDragEnter={() => setIsDragging(true)}
        onDragLeave={() => setIsDragging(false)}
        className={`relative w-68 h-68 rounded-full bg-gray-600 border-4 shadow-md flex items-center justify-center transition-all ${
          isDragging
            ? "border-blue-400 bg-blue-100"
            : "border-blue-600 bg-gray-100"
        }`}
      >
        {previewUrl ? (
          <>
            {/* Imagen con borde redondo y recorte */}
            <div className="w-full h-full rounded-full overflow-hidden">
              <img
                src={previewUrl}
                alt="Preview de foto seleccionada"
                className="w-full h-full object-contain bg-black"
              />
            </div>

            {/* ❌ Botón para eliminar la imagen */}
            <button
              type="button"
              onClick={handleRemove}
              className="absolute -top-2 -right-2 z-20 bg-red-600 rounded-full p-2 hover:bg-red-700 transition"
              aria-label="Eliminar imagen seleccionada"
            >
              <X size={18} className="text-white" />
            </button>
          </>
        ) : (
          <span className="text-white font-semibold text-sm text-center px-4 select-none">
            Arrastrá una imagen aqui o seleccioná una desde tu dispositivo.
              {/* Ícono decorado con esquinas como en tu imagen */}
                  <div className="relative w-14 h-14 bg-[#2e2e2e] m-auto flex items-center justify-center rounded-md mt-5">
                    <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-white" />
                    <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-white" />
                    <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-white" />
                    <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-white" />
                      <Image size={28} className="text-white" />
                  </div>
          </span>
        )}
      </div>

      {/* 📁 Botón para seleccionar imagen desde input */}
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
          ref={inputRef} // 👉 referenciamos el input
          onChange={handleInputChange}
          className="hidden"
          disabled={isUploading}
        />
      </label>

      {/* 🚀 Botón para subir la imagen */}
      {previewUrl && (
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
