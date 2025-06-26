"use client";

import { useState } from "react";
import { Upload, X } from "lucide-react";
import toast from "react-hot-toast";
import { SendArrayImages } from "@/services/subirPropiedad";
import { uploadImageToServer } from "@/services/subirPropiedad";

interface UploadImageFormProps {
  propertyId: string;
}

interface ImageData {
  file: File;
  title: string;
  description: string;
}

const UploadImageForm = ({ propertyId }: UploadImageFormProps) => {
  const [image, setImage] = useState<ImageData | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleFile = async (file: File) => {
    setImage({ file, title: "", description: "" });
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) await handleFile(file);
  };

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) {
      await handleFile(file);
    } else {
      toast.error("Solo se permiten imágenes.");
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleChange = (field: keyof Omit<ImageData, "file">, value: string) => {
    if (!image) return;
    setImage({ ...image, [field]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!image) return toast.error("Debes subir una imagen.");
    if (!image.title.trim() || !image.description.trim())
      return toast.error("Todos los campos son obligatorios.");

    try {
      setLoading(true);

      const responseUpload = await uploadImageToServer(image.file);
      if (!responseUpload?.secure_url) throw new Error("URL no recibida desde el backend");

      const body = {
        file: responseUpload.secure_url,
        title: image.title,
        description: image.description,
        propertyId,
      };

      const response = await SendArrayImages(body);
      if (response?.data?.id) {
        toast.success("¡Imagen subida con éxito!");
        setImage(null);
      } else {
        toast.error("Error al subir la imagen.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Ocurrió un error inesperado.");
    } finally {
      setLoading(false);
    }
  };

  // CLASES dinámicas para el borde según estado
  const containerBorderClass = isDragging
    ? "border-2 border-dashed border-blue-500 bg-blue-100"
    : image
    ? "border-2 border-solid border-gray-300 bg-gray-50"
    : "border-2 border-dashed border-gray-600 bg-gray-300";

  return (
    <div className="w-full p-4 md:p-6 md:pl-0 lg:pt-0">
      <form onSubmit={handleSubmit} className="w-full">
        <div className="flex flex-col items-start justify-start rounded-lg p-6 md:p-8 shadow-[1px_5px_8px_4px_rgba(0,0,0,0.2)] w-full space-y-6">
          <h2 className="text-2xl md:text-3xl font-bold text-[#230c89] w-full mb-2">
            Subir Imagen de Propiedad
          </h2>

          <div className="w-full space-y-4 mt-7">
            <div
              className={`${containerBorderClass} p-4 min-h-[300px] shadow overflow-y-auto`}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
            >
              {image ? (
                <div className="bg-gray-50 p-3 relative">
                  <img
                    src={URL.createObjectURL(image.file)}
                    alt="preview"
                    className="w-full h-80 bg-black object-contain border mb-3"
                  />
                  <input
                    type="text"
                    placeholder="Título"
                    value={image.title}
                    onChange={(e) => handleChange("title", e.target.value)}
                    className="w-full mb-2 bg-white border border-gray-400 p-1 rounded text-sm"
                  />
                  <textarea
                    placeholder="Descripción"
                    value={image.description}
                    onChange={(e) => handleChange("description", e.target.value)}
                    className="w-full border p-1 bg-white rounded border-gray-400 text-sm min-h-[60px]"
                  />
                  <button
                    type="button"
                    onClick={() => setImage(null)}
                    className="absolute top-1 right-1 bg-red-600 text-white text-xs px-2 py-1 rounded"
                  >
                    <X size={14} />
                  </button>
                </div>
              ) : (
                <p className="text-white text-lg font-semibold text-center mt-11">
                  Arrastra una imagen aquí o selecciónala abajo
                </p>
              )}
            </div>

            <div className="flex justify-center mt-5 border-b pb-8 border-gray-400">
              <label
                htmlFor="file-upload"
                className="flex items-center gap-2 bg-blue-700 text-white font-semibold text-lg py-1 px-4 rounded-lg cursor-pointer"
              >
                <Upload size={22} /> Seleccionar imagen
                <input
                  id="file-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </label>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center w-full gap-4 pt-2">
            <button
              type="submit"
              disabled={loading}
              className={`text-white py-3 px-4 rounded-lg w-full md:w-[250px] text-lg ${
                loading ? "bg-gray-500 cursor-not-allowed" : "bg-blue-700"
              }`}
            >
              {loading ? "Subiendo..." : "Subir imagen"}
            </button>
            <button
              type="button"
              onClick={() => setImage(null)}
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

export default UploadImageForm;
