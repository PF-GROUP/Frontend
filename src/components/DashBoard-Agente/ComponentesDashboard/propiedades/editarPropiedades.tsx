"use client";

import { useEffect, useState } from "react";
import { Formik } from "formik";
import toast from "react-hot-toast";
import apiService from "@/services/apiService";
import Image from "next/image";
// import { validationSchema } from "../../validacionesDashBoard/propiedades";
import {PropertyForm } from "../../../../../interface/DashboardAgente/subirPropiedadDTO";

interface Props {
  id: string;
  onBack: () => void;
}


const EditarPropiedad: React.FC<Props> = ({ id, onBack }) => {
  const [initialValues, setInitialValues] = useState<PropertyForm | null>(null);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await apiService.get(`/property/${id}`, true);
        console.log("GET /property/:id →", response);

        setInitialValues({
          name: response.name || "",
        //   status: response.status || IStatus.DISPONIBLE,
        //   type: response.type || IType.ALQUILER,
        //   type_of_property_id: response.type_of_property_id || "",
          address: response.address || "",
        //   city: response.city || "",
          price: response.price || 0,
        //   m2: response.m2 || 0,
        //   bathrooms: response.bathrooms || 0,
        //   rooms: response.rooms || 0,
          description: response.description || "",
          images: response.images || [], 
        //   agency: response.agency || "",
        });
      } catch (error) {
        console.error("Error al obtener la propiedad:", error);
        toast.error("No se pudo cargar la propiedad");
      }
    };

    fetchProperty();
  }, [id]);

    // ✅ Acá va el handleOnSubmit separado
  const handleOnSubmit = async (values: PropertyForm) => {
      console.log("Submit ejecutado"); // 👈 Esto debería aparecer sí o sí
    try {
        
      console.log("PATCH /property/:id → body:", values);
      const response = await apiService.patch(`/property/${id}`, values, true);
      console.log("PATCH /property/:id → response:", response);

      toast.success("Propiedad actualizada correctamente");
      onBack();
    } catch (error) {
      console.error("Error al actualizar propiedad:", error);
      toast.error("No se pudo actualizar la propiedad");
    }
  };


  if (!initialValues) return <p className="p-6">Cargando propiedad...</p>;

  return (
    <div className="p-6 border border-gray-400 rounded-md shadow-md">
      <h2 className="text-2xl font-bold text-[#230c89] mb-6">Editando propiedad con ID: {id}</h2>

      {/* Tarjeta resumen */}
      <div className="flex flex-col md:flex-row items-start md:items-center bg-gray-200 border border-gray-300 rounded-lg p-4 mb-6 shadow">
        <div className="w-full sm:w-[200px] h-[120px] overflow-hidden rounded-md mr-4">
          <Image
            src={initialValues.images?.[0]?.file || "/imagen-placeholder.jpg"}
            alt={initialValues.name}
            width={200}
            height={120}
            className="object-cover w-full h-full"
          />
        </div>
        <div>
          <p className="font-bold text-[#230c89] text-xl mb-2">{initialValues.name}</p>
          <p className="text-green-600 font-semibold">Precio: ${initialValues.price}</p>
        </div>
      </div>

      {/* Formulario */}
      <Formik
        initialValues={initialValues}
        onSubmit={handleOnSubmit}
        // validationSchema={validationSchema}
        enableReinitialize={true}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-start justify-start rounded-lg p-6 md:p-8 shadow-[1px_5px_8px_4px_rgba(0,0,0,0.2)]"
          >
            {/* Nombre */}
            <div className="flex flex-col w-full mb-4">
              <label htmlFor="name" className="text-lg font-bold mb-1">Nombre</label>
              <input
                type="text"
                id="name"
                name="name"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`border ${errors.name && touched.name ? 'border-red-500' : 'border-gray-400'} text-gray-800 rounded-lg p-2 shadow w-full`}
              />
              {errors.name && touched.name && <p className="text-red-600 text-sm mt-1">{errors.name}</p>}
            </div>

            {/* Dirección */}
            <div className="flex flex-col w-full mb-4">
              <label htmlFor="address" className="text-lg font-bold mb-1">Dirección</label>
              <input
                type="text"
                id="address"
                name="address"
                value={values.address}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`border ${errors.address && touched.address ? 'border-red-500' : 'border-gray-400'} text-gray-800 rounded-lg p-2 shadow w-full`}
              />
              {errors.address && touched.address && <p className="text-red-600 text-sm mt-1">{errors.address}</p>}
            </div>

            {/* Precio */}
            <div className="flex flex-col w-full mb-4">
              <label htmlFor="price" className="text-lg font-bold mb-1">Precio</label>
              <input
                type="number"
                id="price"
                name="price"
                value={values.price}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`border ${errors.price && touched.price ? 'border-red-500' : 'border-gray-400'} text-gray-800 rounded-lg p-2 shadow w-full`}
              />
              {errors.price && touched.price && <p className="text-red-600 text-sm mt-1">{errors.price}</p>}
            </div>

            {/* Descripción */}
            <div className="flex flex-col w-full mb-6">
              <label htmlFor="description" className="text-lg font-bold mb-1">Descripción</label>
              <textarea
                id="description"
                name="description"
                value={values.description}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`border ${errors.description && touched.description ? 'border-red-500' : 'border-gray-400'} text-gray-800 rounded-lg p-2 shadow w-full min-h-[120px]`}
              />
              {errors.description && touched.description && <p className="text-red-600 text-sm mt-1">{errors.description}</p>}
            </div>

            {/* Botones */}
            <div className="flex flex-col md:flex-row justify-between items-center w-full gap-3">
              <button
                type="submit"
                className="text-white bg-blue-800 py-2 px-4 rounded-lg w-full md:w-full font-semibold hover:bg-blue-900 transition"
              >
                Guardar cambios
              </button>
              <button
                type="button"
                onClick={onBack}
                className="text-white bg-[#A62F55] py-2 px-4 rounded-lg w-full md:w-full font-semibold hover:bg-[#831F40] transition"
              >
                Volver
              </button>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default EditarPropiedad;
