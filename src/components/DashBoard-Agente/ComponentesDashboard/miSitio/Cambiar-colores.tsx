"use client";

import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { toast } from "react-hot-toast";

const colorValidation = /^#([0-9A-F]{3}){1,2}$/i;

const colorValidationSchema = Yup.object().shape({
  bgColor: Yup.string()
    .required("El color de fondo es obligatorio")
    .matches(colorValidation, "Color inválido"),
  textColor: Yup.string()
    .required("El color del texto es obligatorio")
    .matches(colorValidation, "Color inválido"),
  buttonColor: Yup.string()
    .required("El color del botón es obligatorio")
    .matches(colorValidation, "Color inválido"),
  linkColor: Yup.string()
    .required("El color del link es obligatorio")
    .matches(colorValidation, "Color inválido"),
});

const MiSitio: React.FC = () => {
  const handleSubmit = (values: {
    bgColor: string;
    textColor: string;
    buttonColor: string;
    linkColor: string;
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
          className="flex flex-col items-start justify-start m-auto w-full max-w-md md:max-w-lg lg:max-w-xl rounded-lg p-6 md:p-8 shadow-[1px_5px_8px_4px_rgba(0,0,0,0.2)]"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-[#230c89] mb-6">
            Cambiar colores
          </h2>

          {/* Vista previa */}
          <div
            className="w-full mb-6 border rounded-lg p-4 shadow"
            style={{ backgroundColor: values.bgColor }}
          >
            <h3
              className="text-lg font-semibold mb-2"
              style={{ color: values.textColor }}
            >
              Vista previa del sitio
            </h3>
            <button
              type="button"
              className="py-2 px-4 rounded-lg"
              style={{
                backgroundColor: values.buttonColor,
                color: "#fff",
              }}
            >
              Botón ejemplo
            </button>
            <p className="mt-2 ml-2" style={{ color: values.linkColor }}>
              Link de ejemplo
            </p>
          </div>

          {/* Selectores de color */}
          <div className="flex flex-col w-full space-y-6">
            {/* Campo reutilizable */}
            {[
              { id: "bgColor", label: "Color de fondo" },
              { id: "textColor", label: "Color del texto" },
              { id: "buttonColor", label: "Color de botones" },
              { id: "linkColor", label: "Color de los links" },
            ].map(({ id, label }) => (
              <div key={id} className="flex flex-col">
                <label htmlFor={id} className="text-lg md:text-xl font-bold mb-1">
                  {label}
                </label>
                <input
                  type="color"
                  id={id}
                  name={id}
                  value={values[id as keyof typeof values]}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full h-10 rounded p-2 pt-0.5 pb-0.5 border ${
                    touched[id as keyof typeof touched] &&
                    errors[id as keyof typeof errors]
                      ? "border-red-500"
                      : "border-gray-400"
                  }`}
                />
                {touched[id as keyof typeof touched] &&
                  errors[id as keyof typeof errors] && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors[id as keyof typeof errors]}
                    </p>
                  )}
              </div>
            ))}
          </div>

          {/* Botón */}
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
