"use client";

import React, { useState } from "react";
import { Upload, X, Image } from "lucide-react";
import toast from "react-hot-toast";

interface UploadGalleryProps {
  propertyId: string;
}

const UploadGallery: React.FC<UploadGalleryProps> = ({ propertyId }) => {
  const [images, setImages] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [loading, setLoading] = useState(false);

  // ✅ Maneja archivos seleccionados por input o drag&drop
  const handleFiles = (files: FileList) => {
    const validImages = Array.from(files).filter((file) => file.type.startsWith("image/"));
    if (validImages.length !== files.length) {
      toast.error("Algunos archivos no son imágenes válidas");
    }
    setImages((prev) => [...prev, ...validImages]);
  };

  // ✅ Drag & Drop
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files) handleFiles(e.dataTransfer.files);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  // ✅ Input clásico
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) handleFiles(e.target.files);
  };

  // ❌ Quita una imagen seleccionada
  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  // ✅ Enviar imágenes al backend
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (images.length === 0) return toast.error("Selecciona al menos una imagen");

    const formData = new FormData();
    images.forEach((img) => formData.append("files", img)); // 💡 Nombre del campo = "files"

    try {
      setLoading(true);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/images/property/${propertyId}/gallery`,
        {
          method: "POST",
          body: formData,
          credentials: "include",
        }
      );

      if (!res.ok) throw new Error("Error al subir las imágenes");

      toast.success("Imágenes subidas con éxito");
      setImages([]); // 🧹 Limpia la selección
    } catch (err) {
      console.error(err);
      toast.error("No se pudieron subir las imágenes");
    } finally {
      setLoading(false);
    }
  };

  // 🖼️ Preview en grilla de 2 columnas
  const renderPreviews = () => (
    <div className="flex flex-col gap-4 w-full">
    {images.map((img, idx) => (
      <div key={idx} className="relative border-2 border-gray-500 bg-white p-2 rounded shadow w-full">
        <img
          src={URL.createObjectURL(img)}
          alt={`preview-${idx}`}
          className="w-full h-60 object-contain bg-black"
        />
        <button
          type="button"
          onClick={() => removeImage(idx)}
          className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1"
        >
          <X size={16} />
        </button>
      </div>
    ))}
  </div>
);

  return (
    <div className="w-full p-4 md:p-6 md:pl-0 lg:pt-0">
      <form onSubmit={handleSubmit} className="w-full">
        <div className="flex flex-col items-start justify-start rounded-lg p-6 md:p-8 shadow-[1px_5px_8px_4px_rgba(0,0,0,0.2)] w-full space-y-6">
          <h2 className="text-2xl md:text-3xl font-bold text-[#230c89] w-full mb-2">
            Subir Imágenes de Galería
          </h2>

          <div className="w-full space-y-4 mt-7 ">
            {/* 🎯 Área de arrastre */}
            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              className={`min-h-[250px] p-4 shadow bg-gray-600 overflow-y-auto rounded  transition-all ${
                isDragging
                  ? "border-blue-500 bg-blue-100"
                  : images.length > 0
                  ? "border-gray-300 bg-gray-50"
                  : "border-gray-600 bg-gray-300"
              }`}
            >
              {images.length > 0 ? (
                renderPreviews()
              ) : (
                <p className="text-white text-lg font-semibold text-center mt-11 flex flex-col items-center">
  Arrastrá una imagen aqui o seleccioná una desde tu dispositivo.

  {/* Ícono decorado con esquinas como en tu imagen */}
  <div className="relative w-14 h-14 bg-[#2c2c2c] flex items-center justify-center rounded-md mt-5">
    {/* Esquinas estilo "recorte" */}
    <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-white" />
    <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-white" />
    <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-white" />
    <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-white" />

    {/* El ícono en el centro */}
    <Image size={28} className="text-white" />
  </div>
</p>
              )}
            </div>

            {/* 📁 Input visual para elegir imágenes */}
            <div className="flex justify-center mt-5 border-b pb-8 border-gray-400">
              <label
                htmlFor="file-upload"
                className="flex items-center gap-2 bg-blue-700 text-white font-semibold text-lg py-1 px-4 rounded-lg cursor-pointer"
              >
                <Upload size={22} /> Seleccionar imágenes
                <input
                  id="file-upload"
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={handleFileChange}
                />
              </label>
            </div>
          </div>

          {/* 🚀 Botones de acción */}
          <div className="flex flex-col md:flex-row justify-between items-center w-full gap-4 pt-2">
            <button
              type="submit"
              disabled={loading}
              className={`text-white py-3 px-4 rounded-lg w-full md:w-[250px] text-lg ${
                loading ? "bg-gray-500 cursor-not-allowed" : "bg-blue-700"
              }`}
            >
              {loading ? "Subiendo..." : "Subir Imágenes"}
            </button>
            <button
              type="button"
              onClick={() => setImages([])}
              disabled={loading}
              className="text-white bg-red-600 py-3 px-4 text-lg rounded-lg w-full md:w-[200px]"
            >
              Cancelar
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UploadGallery;
