"use client";

import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { toast } from "react-hot-toast";

const tituloValidations = Yup.object().shape({
  titulo: Yup.string()
    .required("El título es obligatorio")
    .min(3, "Debe tener al menos 3 caracteres")
    .max(60, "No debe superar los 60 caracteres"),
  descripcion: Yup.string()
    .required("La descripción es obligatoria")
    .min(10, "Debe tener al menos 10 caracteres")
    .max(300, "No debe superar los 300 caracteres"),
});

const EditarTitulo: React.FC = () => {
  const handleSubmit = (values: { titulo: string; descripcion: string }) => {
    console.log("🎯 Datos enviados:", values);
    toast.success("¡Cambios guardados con éxito!");
  };

  return (
    <Formik
      initialValues={{ titulo: "", descripcion: "" }}
      validationSchema={tituloValidations}
      onSubmit={handleSubmit}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
      }) => (
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-start justify-start m-auto w-full max-w-md md:max-w-lg lg:max-w-xl rounded-lg p-6 md:p-8 shadow-[1px_5px_8px_4px_rgba(0,0,0,0.2)]"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-[#230c89] w-full mb-6">
            Editar título y descripción
          </h2>

          <div className="flex flex-col w-full space-y-4">
            {/* Título */}
            <div className="flex flex-col w-full">
              <label htmlFor="titulo" className="text-lg md:text-xl font-bold mb-1">
                Título actual del sitio
              </label>
              <input
                id="titulo"
                name="titulo"
                type="text"
                placeholder="Mi Sitio"
                value={values.titulo}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`border rounded-lg p-2 shadow w-full text-gray-600 ${
                  touched.titulo && errors.titulo
                    ? "border-red-500"
                    : "border-gray-400"
                }`}
              />
              {touched.titulo && errors.titulo && (
                <p className="text-red-500 text-sm mt-1">{errors.titulo}</p>
              )}
            </div>

            {/* Descripción */}
            <div className="flex flex-col w-full">
              <label htmlFor="descripcion" className="text-lg md:text-xl font-bold mb-1">
                Descripción
              </label>
              <textarea
                id="descripcion"
                name="descripcion"
                placeholder="Descripción"
                value={values.descripcion}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`border rounded-lg p-2 shadow w-full min-h-[120px] text-gray-600 ${
                  touched.descripcion && errors.descripcion
                    ? "border-red-500"
                    : "border-gray-400"
                }`}
              />
              {touched.descripcion && errors.descripcion && (
                <p className="text-red-500 text-sm mt-1">{errors.descripcion}</p>
              )}
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center w-full mt-6 gap-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="text-white bg-blue-700 py-2 px-4 rounded-lg w-full md:w-[250px] font-semibold hover:bg-blue-800 transition"
            >
              Guardar cambios
            </button>
            <button
              type="button"
              onClick={() => toast("Cancelado")}
              className="text-white bg-red-600 py-2 px-4 rounded-lg w-full md:w-[200px] font-semibold hover:bg-red-700 transition"
            >
              Cancelar
            </button>
          </div>
        </form>
      )}
    </Formik>
  );
};

export default EditarTitulo;
