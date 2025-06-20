import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

const TicketsSoporte: React.FC = () => {
  const formik = useFormik({
    initialValues: {
      category: "",
      subject: "",
      message: "",
    },
    validationSchema: Yup.object({
      category: Yup.string().required("Selecciona una categoría"),
      subject: Yup.string()
        .min(5, "Debe tener al menos 5 caracteres")
        .required("Requerido"),
      message: Yup.string()
        .min(10, "Debe tener al menos 10 caracteres")
        .required("Requerido"),
    }),
    onSubmit: (values) => {
      alert("Ticket enviado:\n" + JSON.stringify(values, null, 2));
      // Aquí iría la lógica de envío
    },
  });

  return (
    <div className="flex flex-col items-start justify-start m-auto max-w-xl w-full rounded-lg p-6 sm:p-8 lg:pl-3 shadow-[1px_5px_8px_4px_rgba(0,0,0,0.2)] bg-white">
      <h2 className="text-3xl font-bold text-[#230c89] ml-4 sm:ml-8 mb-6 w-full text-center sm:text-left">
        Enviar Ticket
      </h2>

      <form
        onSubmit={formik.handleSubmit}
        className="flex flex-col m-auto w-full max-w-md space-y-4 px-4 sm:px-0"
      >
        {/* Categoría */}
        <div className="flex flex-col w-full">
          <label htmlFor="category" className="text-xl font-bold mb-1">
            Categoría
          </label>
          <select
            id="category"
            name="category"
            className={`border rounded-lg p-2 shadow w-full text-gray-800 ${
              formik.touched.category && formik.errors.category
                ? "border-red-500"
                : "border-gray-400"
            }`}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.category}
          >
            <option value="">Selecciona una categoría</option>
            <option value="bug">Error/Bug</option>
            <option value="feature">Solicitud de mejora</option>
            <option value="other">Otro</option>
          </select>
          {formik.touched.category && formik.errors.category && (
            <p className="text-red-600 text-sm mt-1">{formik.errors.category}</p>
          )}
        </div>

        {/* Asunto */}
        <div className="flex flex-col w-full">
          <label htmlFor="subject" className="text-xl font-bold mb-1">
            Asunto
          </label>
          <input
            id="subject"
            name="subject"
            type="text"
            placeholder="Breve descripción"
            className={`border rounded-lg p-2 shadow w-full text-gray-800 ${
              formik.touched.subject && formik.errors.subject
                ? "border-red-500"
                : "border-gray-400"
            }`}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.subject}
          />
          {formik.touched.subject && formik.errors.subject && (
            <p className="text-red-600 text-sm mt-1">{formik.errors.subject}</p>
          )}
        </div>

        {/* Mensaje */}
        <div className="flex flex-col w-full">
          <label htmlFor="message" className="text-xl font-bold mb-1">
            Mensaje
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            placeholder="Describe el problema o sugerencia con detalle..."
            className={`border rounded-lg p-2 shadow w-full text-gray-800 ${
              formik.touched.message && formik.errors.message
                ? "border-red-500"
                : "border-gray-400"
            }`}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.message}
          />
          {formik.touched.message && formik.errors.message && (
            <p className="text-red-600 text-sm mt-1">{formik.errors.message}</p>
          )}
        </div>

        {/* Botones */}
        <div className="flex flex-col sm:flex-row justify-between items-center w-full mt-6 gap-4">
          <button
            type="submit"
            className="text-white bg-blue-700 py-2 px-4 rounded-lg w-full sm:w-[250px] font-semibold"
          >
            Enviar Ticket
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

export default TicketsSoporte;
