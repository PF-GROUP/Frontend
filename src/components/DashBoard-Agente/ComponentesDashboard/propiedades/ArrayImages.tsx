/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
"use client";

import React, { useState } from "react";
import { Upload, X, Image } from "lucide-react";
import toast from "react-hot-toast";
import apiService from "@/services/apiService";

interface UploadGalleryProps {
  propertyId: string;
}

const UploadGallery: React.FC<UploadGalleryProps> = ({ propertyId }) => {
  const [images, setImages] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleFiles = (files: FileList) => {
    const currentImages = images;

    const validImages = Array.from(files).filter((file) => {
      if (!file.type.startsWith("image/")) {
        toast.error("Algunos archivos no son imágenes válidas");
        return false;
      }

      const isDuplicate = currentImages.some(
        (img) =>
          img.name === file.name &&
          img.size === file.size &&
          img.lastModified === file.lastModified
      );

      if (isDuplicate) {
        toast.error(`No puedes agregar imágenes repetidas: "${file.name}"`);
        return false;
      }

      return true;
    });

    setImages((prev) => [...prev, ...validImages]);
  };

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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(e.target.files);
      e.target.value = "";
    }
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (images.length === 0) return toast.error("Selecciona al menos una imagen");

    const formData = new FormData();
    images.forEach((img) => formData.append("files", img));

    try {
      setLoading(true);
      const res = apiService.post(`images/property/${propertyId}/gallery`,formData ,true)
      if (!res) throw new Error("Error al subir las imágenes");

      toast.success("Imágenes subidas con éxito");
      setImages([]);
    } catch (err) {
      console.error(err);
      toast.error("No se pudieron subir las imágenes");
    } finally {
      setLoading(false);
    }
  };

  const renderPreviews = () => (
    <div className="flex flex-col gap-4 w-full">
      {images.map((img, idx) => (
        <div key={idx} className="relative border-2 border-gray-300 bg-white p-2 rounded shadow w-full">
          <img
            src={URL.createObjectURL(img)}
            alt={`preview-${idx}`}
            className="w-full h-60 object-contain bg-black"
          />
          <button
            type="button"
            onClick={() => removeImage(idx)}
            className="absolute top-1 right-1 bg-red-600 hover:bg-red-800 text-white rounded-full p-1"
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
            Imágenes de la propiedad
          </h2>

          <div className="w-full space-y-4 mt-6">
            {/* 🎯 Área de arrastre */}
            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              className={`relative min-h-[250px] p-4 transition-all duration-300 ${
                isDragging
                  ? "bg-blue-200 border-4 border-dashed border-blue-500"
                  : images.length > 0
                  ? "bg-gray-100 border border-gray-300"
                  : "bg-gray-700 border-4 border-gray-700"
              }`}
            >
              {/* 🔳 Esquinas decorativas */}
              {images.length === 0 && (
                <>
                  <div
                    className={`absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 ${
                      isDragging ? "border-blue-500 scale-125" : "border-blue-500"
                    } transition-transform duration-300`}
                  />
                  <div
                    className={`absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 ${
                      isDragging ? "border-blue-500 scale-125" : "border-blue-500"
                    } transition-transform duration-300`}
                  />
                  <div
                    className={`absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 ${
                      isDragging ? "border-blue-500 scale-125" : "border-blue-500"
                    } transition-transform duration-300`}
                  />
                  <div
                    className={`absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 ${
                      isDragging ? "border-blue-500 scale-125" : "border-blue-500"
                    } transition-transform duration-300`}
                  />
                </>
              )}

              {images.length > 0 ? (
                renderPreviews()
              ) : (
                <div className="text-white text-lg font-semibold text-center mt-11 flex flex-col items-center">
                  Arrastrá una imagen aqui o seleccioná una desde tu dispositivo.

                  <div className="relative w-14 h-14 bg-[#1e1e1e] flex items-center justify-center rounded-md mt-5">
                    <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-blue-500" />
                    <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-blue-500" />
                    <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-blue-500" />
                    <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-blue-500" />
                    <Image size={28} className="text-white" />
                  </div>
                </div>
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
                loading ? "bg-gray-500 cursor-not-allowed" : "bg-blue-800 hover:bg-blue-900 transition"
              }`}
            >
              {loading ? "Subiendo..." : "Subir Imágenes"}
            </button>
            <button
              type="button"
              onClick={() => setImages([])}
              disabled={loading}
              className="text-white bg-[#A62F55] hover:bg-[#831F40] transition py-3 px-4 text-lg rounded-lg w-full md:w-[200px]"
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
