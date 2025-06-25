"use client";

import { useState } from "react";
import { Upload } from "lucide-react";
import toast from "react-hot-toast";
import { SendArrayImages } from "@/services/subirPropiedad";

interface UploadImageFormProps {
  propertyId: string;
}

interface ImageData {
  file: File;
  base64: string;
  title: string;
  description: string;
}

// LEEER SUPER IMPORTANTE MATI:
// No podes seguir haciendo este componente hasta que nico te pase el readme de Images, segui haciendo lo de foto perfil y logo y banner.

const UploadImageForm = ({ propertyId }: UploadImageFormProps) => {
  const [images, setImages] = useState<ImageData[]>([]);

  const toBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
    });
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const filesArray = Array.from(files);
      const newImages = await Promise.all(
        filesArray.map(async (file) => {
          const base64 = await toBase64(file);
          return {
            file,
            base64,
            title: "",
            description: "",
          };
        })
      );
      setImages((prev) => [...prev, ...newImages]);
    }
  };

  const handleTitleChange = (index: number, value: string) => {
    const updated = [...images];
    updated[index].title = value;
    setImages(updated);
  };

  const handleDescriptionChange = (index: number, value: string) => {
    const updated = [...images];
    updated[index].description = value;
    setImages(updated);
  };

  const removeImage = (index: number) => {
    const updated = images.filter((_, i) => i !== index);
    setImages(updated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (images.length === 0) {
      toast.error("Debes subir al menos una imagen.");
      return;
    }

    const hasEmptyFields = images.some(
      (img) => !img.title.trim() || !img.description.trim()
    );
    if (hasEmptyFields) {
      toast.error("Todos los campos de título y descripción son obligatorios.");
      return;
    }

    const body = images.map((img) => ({
      file: img.base64,
      title: img.title,
      description: img.description,
      propertyId,
    }));

    try {
      const response = await SendArrayImages(body);
      if (response?.success) {
        toast.success("¡Imágenes subidas con éxito!");
        setImages([]);
      } else {
        toast.error("Error al subir las imágenes.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Ocurrió un error inesperado.");
    }
  };

  return (
    <div className="w-full p-4 md:p-6 md:pl-0 lg:pt-0">
      <form onSubmit={handleSubmit} className="w-full">
        <div className="flex flex-col items-start justify-start rounded-lg p-6 md:p-8 shadow-[1px_5px_8px_4px_rgba(0,0,0,0.2)] w-full space-y-6">
          <h2 className="text-2xl md:text-3xl font-bold text-[#230c89] w-full mb-2">
            Subir Imágenes y Detalles
          </h2>

          <div className="w-full space-y-4 mt-7">
            <div className="border border-black p-4 bg-gray-400 min-h-[300px] shadow overflow-y-auto">
              {images.length > 0 ? (
                <div className="grid grid-cols-2 gap-5">
                  {images.map((img, index) => (
                    <div
                      key={index}
                      className="bg-gray-200 p-3 rounded-md relative"
                    >
                      <img
                        src={URL.createObjectURL(img.file)}
                        alt={`preview-${index}`}
                        className="w-full h-40 object-cover rounded-sm border mb-3"
                      />
                      <input
                        type="text"
                        placeholder="Título"
                        value={img.title}
                        onChange={(e) => handleTitleChange(index, e.target.value)}
                        className="w-full mb-2 bg-white border p-1 rounded text-sm"
                      />
                      <textarea
                        placeholder="Descripción"
                        value={img.description}
                        onChange={(e) => handleDescriptionChange(index, e.target.value)}
                        className="w-full border p-1 bg-white rounded text-sm min-h-[60px]"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-1 right-1 bg-red-600 text-white text-xs px-2 py-1 rounded"
                      >
                        X
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-white text-lg font-semibold text-center mt-11">
                  Sube imágenes para esta propiedad
                </p>
              )}
            </div>

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

          <div className="flex flex-col md:flex-row justify-between items-center w-full gap-4 pt-2">
            <button
              type="submit"
              className="text-white bg-blue-700 py-3 px-4 rounded-lg w-full md:w-[250px] text-lg"
            >
              Subir imágenes
            </button>
            <button
              type="button"
              onClick={() => setImages([])}
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
