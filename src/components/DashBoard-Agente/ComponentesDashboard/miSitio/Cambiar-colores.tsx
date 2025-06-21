"use client";

import React from "react";
import { Formik } from "formik";
import { toast } from "react-hot-toast";
import {  colorValidationSchema } from "../../validacionesDashBoard/miSitio";


const MiSitio: React.FC = () => {
  const handleSubmit = (values: {
    bgColor: string;
    textColor: string;
    buttonColor: string;
    linkColor: string;
    navbarColor: string;
  }) => {
    console.log("🎨 Nuevos colores:", values);
    toast.success("¡Colores aplicados!");
  };

  return (
    <Formik
      initialValues={{
        bgColor: "#f0f0f0",
        textColor: "#333333",
        buttonColor: "#4a90e2",
        linkColor: "#0070f3",
        navbarColor: "#d9d9d9",
      }}
      validationSchema={colorValidationSchema}
      onSubmit={handleSubmit}
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
          className="flex flex-col items-start justify-start m-auto w-full max-w-5xl rounded-lg p-6 pt-0 md:p-8 md:pt8 space-y-8 shadow-[1px_5px_8px_4px_rgba(0,0,0,0.2)]"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-[#230c89] mb-2">
            Cambiar colores
          </h2>

          {/* Cuadro 1 - Vista previa */}
          <div
            className="w-full border border-gray-400 pb-8 shadow mt-3 space-y-6"
            style={{ backgroundColor: values.bgColor }}
          >
            {/* Barra superior con botones */}
            <div
              className="flex justify-between items-center border-b pb-3 pt-4 mb-11 flex-wrap gap-2 px-3 py-2"
              style={{ backgroundColor: values.navbarColor }}
            >
              <div className="w-24 h-10 bg-white rounded shadow" />
              <div className="flex gap-2 flex-wrap">
                {["Home", "Category", "About Us", "Profile"].map((btn) => (
                  <button
                    key={btn}
                    type="button"
                    className="px-4 py-2 rounded shadow text-sm font-semibold"
                    style={{
                      backgroundColor: values.buttonColor,
                      color: values.textColor,
                    }}
                  >
                    {btn}
                  </button>
                ))}
              </div>
            </div>

            {/* Título y subtítulo */}
            <div className="text-center space-y-1">
              <h3
                className="text-xl md:text-2xl font-bold"
                style={{ color: values.textColor }}
              >
                Mi Web Inmobiliaria
              </h3>
              <p className="text-md" style={{ color: values.textColor }}>
                Mi Propia Página Web Inmobiliaria
              </p>
            </div>

            {/* Tarjetas tipo propiedades */}
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
                  <p
                    className="text-center text-sm"
                    style={{ color: values.linkColor }}
                  >
                    Link
                  </p>
                </div>
              ))}
            </div>
          </div>
          {/* Cuadro 2 - Inputs de colores */}
          <div className="w-full  rounded-xl p-6 shadow-[1px_5px_8px_4px_rgba(0,0,0,0.2)] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6">
            {[
              { id: "bgColor", label: "Color de fondo" },
              { id: "textColor", label: "Color del texto" },
              { id: "buttonColor", label: "Color de botones" },
              { id: "linkColor", label: "Color de los links" },
              { id: "navbarColor", label: "Color de la navbar" },
            ].map(({ id, label }) => (
              <div key={id} className="flex flex-col">
                <label htmlFor={id} className="text-sm font-semibold mb-1">
                  {label}
                </label>
                <input
                  type="color"
                  id={id}
                  name={id}
                  value={values[id as keyof typeof values]}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full h-10 rounded border p-1 ${
                    touched[id as keyof typeof touched] &&
                    errors[id as keyof typeof errors]
                      ? "border-red-500"
                      : "border-gray-400"
                  }`}
                />
                {touched[id as keyof typeof touched] &&
                  errors[id as keyof typeof errors] && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors[id as keyof typeof errors]}
                    </p>
                  )}
              </div>
            ))}
          </div>

          {/* Botón de enviar */}
          <div className="flex justify-between items-center w-full mt-6">
            <button
              type="submit"
              disabled={isSubmitting}
              className="text-white bg-blue-700 py-2 px-4 rounded-lg w-full font-semibold hover:bg-blue-800 transition"
            >
              Aplicar cambios
            </button>
          </div>
        </form>
      )}
    </Formik>
  );
};

export default MiSitio;
