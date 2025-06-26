"use client";

import { useState } from "react";
import { Upload, X } from "lucide-react";
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

const UploadImageForm = ({ propertyId }: UploadImageFormProps) => {
  const [image, setImage] = useState<ImageData | null>(null);

  const toBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
    });
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const base64 = await toBase64(file);
      setImage({
        file,
        base64,
        title: "",
        description: "",
      });
    }
  };

  const handleChange = (field: keyof ImageData, value: string) => {
    if (!image) return;
    setImage({
      ...image,
      [field]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!image) {
      toast.error("Debes subir una imagen.");
      return;
    }

    if (!image.title.trim() || !image.description.trim()) {
      toast.error("Todos los campos son obligatorios.");
      return;
    }

    const body = [
      {
        file: image.base64,
        title: image.title,
        description: image.description,
        propertyId,
      },
    ];

    try {
      const response = await SendArrayImages(body);
      if (response?.success) {
        toast.success("¡Imagen subida con éxito!");
        setImage(null);
      } else {
        toast.error("Error al subir la imagen.");
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
            Subir Imagen de Propiedad
          </h2>

          <div className="w-full space-y-4 mt-7">
            <div className="border border-black p-4 bg-gray-400 min-h-[300px] shadow overflow-y-auto">
              {image ? (
                <div className="bg-gray-200 p-3 rounded-md relative">
                  <img
                    src={URL.createObjectURL(image.file)}
                    alt="preview"
                    className="w-full h-40 object-cover rounded-sm border mb-3"
                  />
                  <input
                    type="text"
                    placeholder="Título"
                    value={image.title}
                    onChange={(e) => handleChange("title", e.target.value)}
                    className="w-full mb-2 bg-white border p-1 rounded text-sm"
                  />
                  <textarea
                    placeholder="Descripción"
                    value={image.description}
                    onChange={(e) => handleChange("description", e.target.value)}
                    className="w-full border p-1 bg-white rounded text-sm min-h-[60px]"
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
                  Sube una imagen para esta propiedad
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
              className="text-white bg-blue-700 py-3 px-4 rounded-lg w-full md:w-[250px] text-lg"
            >
              Subir imagen
            </button>
            <button
              type="button"
              onClick={() => setImage(null)}
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
