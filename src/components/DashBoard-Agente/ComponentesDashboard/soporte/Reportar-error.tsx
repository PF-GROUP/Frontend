import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

const ReportarError: React.FC = () => {
  const formik = useFormik({
    initialValues: {
      emailAdmin: "",
      emailAgente: "",
      descripcion: "",
    },
    validationSchema: Yup.object({
      emailAdmin: Yup.string()
        .email("Email inválido")
        .required("Requerido"),
      emailAgente: Yup.string()
        .email("Email inválido")
        .required("Requerido"),
      descripcion: Yup.string()
        .min(10, "Debe tener al menos 10 caracteres")
        .required("Requerido"),
    }),
    onSubmit: (values) => {
      alert("Formulario enviado con éxito:\n" + JSON.stringify(values, null, 2));
      // Aquí iría la lógica para enviar el reporte
    },
  });

  return (
    <div className="flex flex-col items-start justify-start m-auto max-w-xl w-full rounded-lg p-6 sm:p-8 lg:pl-3 shadow-[1px_5px_8px_4px_rgba(0,0,0,0.2)]">
      <h2 className="text-3xl font-bold text-[#230c89] ml-4 sm:ml-8 mb-6 w-full text-center sm:text-left">
        Reportar un Error
      </h2>

      <form
        onSubmit={formik.handleSubmit}
        className="flex flex-col m-auto w-full max-w-md space-y-4 px-4 sm:px-0"
      >
        {/* Email Administrador */}
        <div className="flex flex-col w-full">
          <label htmlFor="emailAdmin" className="text-xl font-bold mb-1">
            Email del Administrador
          </label>
          <input
            id="emailAdmin"
            name="emailAdmin"
            type="email"
            placeholder="kasapproyecto@gmail.com"
            className={`border rounded-lg p-2 shadow w-full text-gray-800 ${
              formik.touched.emailAdmin && formik.errors.emailAdmin
                ? "border-red-500"
                : "border-gray-400"
            }`}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.emailAdmin}
          />
          {formik.touched.emailAdmin && formik.errors.emailAdmin && (
            <p className="text-red-600 text-sm mt-1">{formik.errors.emailAdmin}</p>
          )}
        </div>

        {/* Email Agente */}
        <div className="flex flex-col w-full">
          <label htmlFor="emailAgente" className="text-xl font-bold mb-1">
            Email del Agente Inmobiliario
          </label>
          <input
            id="emailAgente"
            name="emailAgente"
            type="email"
            placeholder="kasapproyecto@gmail.com"
            className={`border rounded-lg p-2 shadow w-full text-gray-800 ${
              formik.touched.emailAgente && formik.errors.emailAgente
                ? "border-red-500"
                : "border-gray-400"
            }`}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.emailAgente}
          />
          {formik.touched.emailAgente && formik.errors.emailAgente && (
            <p className="text-red-600 text-sm mt-1">{formik.errors.emailAgente}</p>
          )}
        </div>

        {/* Descripción */}
        <div className="flex flex-col w-full">
          <label htmlFor="descripcion" className="text-xl font-bold mb-1">
            Error Detectado
          </label>
          <textarea
            id="descripcion"
            name="descripcion"
            placeholder="Describe tu Error"
            className={`border rounded-lg p-2 shadow w-full min-h-[120px] text-gray-600 ${
              formik.touched.descripcion && formik.errors.descripcion
                ? "border-red-500"
                : "border-gray-400"
            }`}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.descripcion}
          />
          {formik.touched.descripcion && formik.errors.descripcion && (
            <p className="text-red-600 text-sm mt-1">{formik.errors.descripcion}</p>
          )}
        </div>

        {/* Botones */}
        <div className="flex flex-col sm:flex-row justify-between items-center m-auto w-full max-w-md mt-6 gap-4">
          <button
            type="submit"
            className="text-white bg-blue-700 py-2 px-4 rounded-lg w-full sm:w-[250px] font-semibold"
          >
            Enviar
          </button>
          <button
            type="reset"
            onClick={formik.handleReset}
            className="text-white bg-red-600 py-2 px-4 rounded-lg w-full sm:w-[200px]"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReportarError;
