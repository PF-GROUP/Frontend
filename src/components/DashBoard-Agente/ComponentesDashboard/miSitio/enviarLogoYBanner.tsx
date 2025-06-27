/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState } from "react";
import { toast } from "react-hot-toast";

interface UploadLogoBannerProps {
  customizationId: string;
}

const UploadLogoBanner: React.FC<UploadLogoBannerProps> = ({ customizationId }) => {
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [bannerFile, setBannerFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [bannerPreview, setBannerPreview] = useState<string | null>(null);

  const uploadImage = async (file: File, type: "logo" | "banner") => {
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/images/customization/${customizationId}/${type}`,
      {
        method: "POST",
        credentials: "include",
        body: formData,
      }
    );

    if (!res.ok) throw new Error(`Error al subir el ${type}`);
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
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-5xl ml-10  mx-auto p-6 bg-white rounded-lg border border-gray-200 shadow-[1px_5px_8px_4px_rgba(0,0,0,0.2)]"
    >
      <h2 className="text-2xl md:text-3xl font-bold text-[#230c89] mb-6">
        Subir imágenes
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-1 gap-8 mb-6">
        {/* Logo Input + Preview */}
        <div className="flex flex-col items-center gap-4">
          <div className="w-full">
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
          </div>
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

        {/* Banner Input + Preview */}
        <div className="flex flex-col items-center gap-4">
          <div className="w-full">
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
          </div>
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

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition"
      >
        Subir Imágenes
      </button>
    </form>
  );
};

export default UploadLogoBanner;
