"use client";

import React from "react";
import { Formik } from "formik";
import { toast } from "react-hot-toast";
import { tituloValidations } from "../../validacionesDashBoard/miSitio";
import { editarAgencia } from "@/services/editarNombreYdescripcion";
import { IEditarNombreYdescAgency } from "../../../../../interface/DashboardAgente/EditarNombreYDescp";
import { useRouter } from "next/navigation";
import { useAuthContext } from "../../../../../context/authContext"; 

const EditarTitulo: React.FC = () => {
  // ✅ Incluir en El payload: user.id para enviar los cambios del formulario.
  const { user } = useAuthContext(); // 
  const router = useRouter();

  const handleOnSubmit = async (values: IEditarNombreYdescAgency) => {
    try {
      // if (!user) {
      //   toast.error("Usuario no autenticado");
      //   return;
      // }

      const payload = {
        ...values, 
        "agentUser": user?.agencyId
        // agentUser: user.id, // ✅ mandamos el user.id
      };

      const response = await editarAgencia(payload, user?.agencyId);
      console.log("🧠 response completo:", response);

      if (response && response.id) {

        toast.success('Nombre y Descripción modificados.', { duration: 2500 });
        setTimeout(() => {
          router.push('/home');
        }, 2000);
      } else {
        console.warn("⚠️ Hubo un Error al editar el Nombre y Descripción:", response);
        toast.error(' Hubo un Error al editar el Nombre y Descripción.', { duration: 2000 });
      }
    } catch (error) {
      console.error("❌ Error en los datos:", error);
      toast.error('Error al guardas los cambios.', { duration: 2000 });
    }
  };

  return (
    <Formik
      initialValues={{ name: "", description: "", agentUser: 0 }}
      validationSchema={tituloValidations}
      onSubmit={handleOnSubmit}
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
            Editar nombre y descripción 
          </h2>

          <div className="flex flex-col w-full space-y-4">
            {/* Título */}
            <div className="flex flex-col w-full">
              <label htmlFor="name" className="text-lg md:text-xl font-bold mb-1">
                Nombre de la Agencia
              </label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Nuevo nombre para la Agencia"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`border rounded-lg p-2 shadow w-full text-gray-600 ${
                  touched.name && errors.name
                    ? "border-red-500"
                    : "border-gray-400"
                }`}
              />
              {touched.name && errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
              )}
            </div>

            {/* Descripción */}
            <div className="flex flex-col w-full">
              <label htmlFor="description" className="text-lg md:text-xl font-bold mb-1">
                Descripción
              </label>
              <textarea
                id="description"
                name="description"
                placeholder="Nueva Descripción para la Agencia"
                value={values.description}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`border rounded-lg p-2 shadow w-full min-h-[120px] text-gray-600 ${
                  touched.description && errors.description
                    ? "border-red-500"
                    : "border-gray-400"
                }`}
              />
              {touched.description && errors.description && (
                <p className="text-red-500 text-sm mt-1">{errors.description}</p>
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
