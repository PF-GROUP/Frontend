"use client";

import React, { useState } from "react";
import { toast } from "react-hot-toast";
import apiService from "@/services/apiService";

interface UploadLogoBannerProps {
  customizationId: string;
}

const UploadLogoBanner: React.FC<UploadLogoBannerProps> = ({ customizationId }) => {
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [bannerFile, setBannerFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [bannerPreview, setBannerPreview] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  console.log("Este es el customization id", customizationId);

  const uploadImage = async (file: File, type: "logo" | "banner") => {
    const formData = new FormData();
    formData.append("file", file);

    await apiService.post(
      `/images/customization/${customizationId}/${type}`,
      formData,true
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!customizationId) {
      toast.error("No hay ID de personalización para subir imágenes.", { duration: 3000 });
      return;
    }

    try {
      if (logoFile) await uploadImage(logoFile, "logo");
      if (bannerFile) await uploadImage(bannerFile, "banner");

      toast.success("Imágenes subidas con éxito.", { duration: 2500 });

      setLogoFile(null);
      setBannerFile(null);
      setLogoPreview(null);
      setBannerPreview(null);
    } catch (err) {
      console.error(err);
      toast.error("Error al subir imágenes.", { duration: 2500 });
    }
  };

  return (
    <div className="w-full px-4 md:px-6 py-4">
      <div className="max-w-4xl mx-auto">
        <form onSubmit={handleSubmit} className="w-full">
          <div className="flex flex-col items-start justify-start rounded-2xl p-4 md:p-6 shadow-md bg-white border border-gray-200 w-full space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold text-[#230c89] tracking-wide w-full">
              Subir imágenes
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
              {/* Logo */}
              <div className="flex flex-col items-center gap-4">
                <label className="block text-center text-sm font-semibold mb-2">Logo</label>
                <input
                  type="file"
                  accept="image/*"
                  className="w-full bg-gray-100 p-2 rounded border border-gray-300 text-center"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setLogoFile(file);
                      setLogoPreview(URL.createObjectURL(file));
                    }
                  }}
                />
                <div className="w-32 h-14 bg-white rounded shadow flex items-center justify-center overflow-hidden">
                  {logoPreview && (
                    <img
                      src={logoPreview}
                      alt="Logo Preview"
                      className="max-h-full max-w-full object-contain"
                    />
                  )}
                </div>
              </div>

              {/* Banner */}
              <div className="flex flex-col items-center gap-4">
                <label className="block text-center text-sm font-semibold mb-2">Banner</label>
                <input
                  type="file"
                  accept="image/*"
                  className="w-full bg-gray-100 p-2 rounded border border-gray-300 text-center"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setBannerFile(file);
                      setBannerPreview(URL.createObjectURL(file));
                    }
                  }}
                />
                <div className="w-full h-56 bg-gray-300 rounded shadow flex items-center justify-center overflow-hidden">
                  {bannerPreview && (
                    <img
                      src={bannerPreview}
                      alt="Banner Preview"
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row justify-center items-center w-full gap-4 pt-2">
              <button
                type="button"
                onClick={() => setShowModal(true)}
                className="text-white bg-[#A62F55] hover:bg-[#831F40] transition-all duration-200 py-2.5 px-6 text-base md:text-lg rounded-xl font-medium w-full md:w-auto"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="bg-blue-800 hover:bg-blue-900 text-white font-semibold py-2 px-4 rounded-lg w-full md:w-auto transition"
              >
                Subir Imágenes
              </button>
            </div>
          </div>
        </form>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center px-4">
          <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md">
            <h3 className="text-xl font-bold text-gray-800 mb-4">¿Cancelar la subida de imágenes?</h3>
            <p className="text-gray-600 mb-6">
              Si cancelás ahora, podrías perder los archivos seleccionados. ¿Estás seguro?
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-600 hover:text-gray-800 font-medium px-4 py-2 rounded-lg border border-gray-300"
              >
                Volver
              </button>
              <button
                onClick={() => {
                  setShowModal(false);
                  setLogoFile(null);
                  setBannerFile(null);
                  setLogoPreview(null);
                  setBannerPreview(null);
                }}
                className="bg-[#A62F55] hover:bg-[#831F40] text-white font-medium px-4 py-2 rounded-lg transition"
              >
                Confirmar Cancelación
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadLogoBanner;