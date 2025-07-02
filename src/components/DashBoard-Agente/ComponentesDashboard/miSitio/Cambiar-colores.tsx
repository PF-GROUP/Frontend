"use client";

import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import { toast } from "react-hot-toast";
import { colorValidationSchema } from "../../validacionesDashBoard/miSitio";
import { useAuthContext } from "../../../../../context/authContext";
import UploadLogoBanner from "./enviarLogoYBanner";
import apiService from "@/services/apiService";
import { cambiarColoresPatch, cambiarColoresPost } from "@/services/editarColores";

interface ICustomizationValues {
  information: string;
  mainColors: string;
  navbarColor: string;
  buttonColor: string;
  backgroundColor: string;
  secondaryColor: string;
}

const MiSitio: React.FC = () => {
  const { user } = useAuthContext();
  const [hasCustomization, setHasCustomization] = useState<boolean | null>(null);
  const [customizationId, setCustomizationId] = useState<string | null>(null);

  useEffect(() => {
    if (!user?.agencyId) return;

    const fetchCustomization = async () => {
      try {
        const res = await apiService.get(`/agencies/${user?.agencyId}/customization`, true);
        const customization = res.data?.content;

        if (customization && customization.id) {
          console.log("✅ Ya existe customización", customization);
          setHasCustomization(true);
          setCustomizationId(customization.id);
        } else {
          setHasCustomization(false);
        }
      } catch (error: any) {
        if (error.response?.status === 404) {
          console.log("❌ No hay customización previa (404)");
          setHasCustomization(false);
        } else {
          console.error("⚠️ Error inesperado al obtener customización:", error);
          setHasCustomization(false);
        }
      }
    };

    fetchCustomization();
  }, [user?.agencyId]);

  function rgbToHexIfNeeded(color: string): string {
    if (/^#([0-9A-Fa-f]{3}){1,2}$/.test(color)) return color;
    const rgbMatch = color.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)/);
    if (rgbMatch) {
      const [, r, g, b] = rgbMatch.map(Number);
      return `#${[r, g, b].map(val => val.toString(16).padStart(2, "0")).join("")}`;
    }
    return color;
  }

  if (hasCustomization === null) {
    return <div className="text-center text-lg text-blue-700">Cargando configuración...</div>;
  }

  const handleOnSubmit = async (values: ICustomizationValues) => {
    const cleanColor = rgbToHexIfNeeded;

    const payload = {
      information: values.information,
      mainColors: cleanColor(values.mainColors),
      navbarColor: cleanColor(values.navbarColor),
      buttonColor: cleanColor(values.buttonColor),
      backgroundColor: cleanColor(values.backgroundColor),
      secondaryColor: cleanColor(values.secondaryColor),
    };

    try {
      let response;

      if (hasCustomization) {
        response = await cambiarColoresPatch(String(user?.agencyId), payload);
      } else {
        response = await cambiarColoresPatch(String(user?.agencyId), payload);
      }

      if (response && response.id) {
        toast.success("Colores cambiados correctamente");
        setHasCustomization(true);
        setCustomizationId(response.id);
      }
    } catch (error) {
      console.error("❌ Error al aplicar los colores:", error);
      toast.error("Hubo un error al aplicar los colores");
    }
  };

  if (customizationId) {
    return <UploadLogoBanner customizationId={customizationId} />;
  }

  // 🖌️ Renderizamos el formulario inicial
  return (
    <Formik
      initialValues={{
        logoImage: "",
        information: "¡Bienvenidos a mi sitio web!",
        mainColors: "#FFFFFF",
        banner: "",
        navbarColor: "#a0aec0",
        buttonColor: "#4c6ef5",
        backgroundColor: "#1c3faa",
        secondaryColor: "#0a2540",
      }}
      validationSchema={colorValidationSchema}
      onSubmit={handleOnSubmit}
    >
      {({
        values,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        errors,
        touched,
      }) => (
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-start justify-start m-auto w-full max-w-5xl rounded-lg p-6 pt-0 md:p-8 md:pt-8 space-y-8 shadow-[1px_5px_8px_4px_rgba(0,0,0,0.2)]"
        >
          {/* Título y botón ancla */}
          <div className="flex items-center justify-between w-full mb-0 pb-4">
            <h2 className="text-2xl md:text-3xl font-bold text-[#230c89] ">
              Cambiar colores
            </h2>
            <a
              href="#Logo"
              className="text-white bg-blue-800 pt-2 pb-2 pl-3 pr-3 rounded-lg hover:bg-blue-900"
            >
              Comenzar a editar
            </a>
          </div>

          {/* Vista previa del sitio */}
          <div
            className="w-full border border-gray-400 shadow mt-3"
            style={{ backgroundColor: values.backgroundColor }}
          >
            <div
              className="flex justify-between items-center border-b py-4 px-4"
              style={{ backgroundColor: values.navbarColor }}
            >
              <div className="h-14 w-30 ml-2 bg-white rounded shadow" />
              <div className="flex gap-2 flex-wrap">
                {["Home", "Category", "About Us", "Profile"].map((btn) => (
                  <button
                    key={btn}
                    type="button"
                    className="px-4 py-2 rounded shadow text-sm font-semibold"
                    style={{
                      backgroundColor: values.buttonColor,
                      color: values.secondaryColor,
                    }}
                  >
                    {btn}
                  </button>
                ))}
              </div>
            </div>

            <div className="relative w-full h-56">
              <div className="w-full h-full bg-gray-300" />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center bg-black/20 px-4">
                <h3
                  className="text-xl md:text-3xl font-bold drop-shadow-lg"
                  style={{ color: values.secondaryColor }}
                >
                  Mi Web Inmobiliaria
                </h3>
                <p
                  className="text-white text-sm md:text-base drop-shadow-md"
                  style={{ color: values.mainColors }}
                >
                  {values.information}
                </p>
              </div>
            </div>

            <div className="text-center mt-6 mb-4">
              <h3
                className="text-xl md:text-2xl font-bold"
                style={{ color: values.mainColors }}
              >
                Propiedades disponibles
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 p-4 gap-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="border rounded-lg p-3 bg-white space-y-2 shadow"
                >
                  <div className="w-full h-24 bg-gray-300 rounded" />
                  <button
                    type="button"
                    className="w-full py-1 rounded text-white font-semibold"
                    style={{ backgroundColor: values.buttonColor }}
                  >
                    Ver
                  </button>
                  <p className="text-center text-sm text-blue-600">Link</p>
                </div>
              ))}
            </div>
          </div>

          {/* Inputs de colores */}
          <div
            id="Logo"
            className="w-full rounded-sm p-6 border border-gray-400 bg-gray-200 shadow grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-6"
          >
            {[
              { id: "secondaryColor", label: "Color Principal" },
              { id: "mainColors", label: "Color Secundario" },
              { id: "navbarColor", label: "Color Navbar" },
              { id: "buttonColor", label: "Color Botón" },
              { id: "backgroundColor", label: "Color Fondo" },
              { id: "information", label: "Subtítulo" },
            ].map(({ id, label }) => (
              <div key={id} className="flex flex-col">
                <label htmlFor={id} className="text-sm font-semibold mb-1">
                  {label}
                </label>
                <input
                  type={id === "information" ? "text" : "color"}
                  id={id}
                  name={id}
                  value={values[id as keyof typeof values] as string}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full h-10 bg-white rounded border p-1 ${
                    touched[id as keyof typeof touched] &&
                    errors[id as keyof typeof errors]
                      ? "border-red-500"
                      : "border-gray-400"
                  }`}
                />
              </div>
            ))}
          </div>

          {/* Botón de enviar */}
          <div className="flex justify-between items-center w-full mt-6">
            <button
              type="submit"
              disabled={isSubmitting}
              className="text-white bg-blue-800 py-2 px-4 rounded-lg w-full font-semibold hover:bg-blue-900 transition"
            >
              Siguiente
            </button>
          </div>
        </form>
      )}
    </Formik>
  );
};

export default MiSitio;
