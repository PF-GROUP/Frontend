'use client';

import UploadImageForm from './ArrayImages';
import { Formik } from 'formik';
import toast from 'react-hot-toast';
import { CreateProperty } from '@/services/subirPropiedad';
import { validationSchema } from '../../validacionesDashBoard/propiedades';
import { IPropertyForm } from '../../../../../interface/DashboardAgente/subirPropiedadDTO';
import { useState } from 'react';
import { useAuthContext } from '../../../../../context/authContext';


const DashboardPage = () => {
  // Creamos este estado para almacenar el id de la propiedad creada para luego enviarsela como prop al componente de images
  const [propertyId, setPropertyId] = useState<string | null>(null);
  
  const {user} = useAuthContext()

  const handleOnSubmit = async (values: IPropertyForm) => {
    try {

      if (!user?.agencyId) {
        toast.error('No se encontró la agencia del usuario.', { duration: 2500 });
        return;
      }


      const postProperty = {
        ...values,
        agency: user?.agencyId
      }
      const response = await CreateProperty(postProperty);
      
      if (response && response.success === true) {
        
        // Guardamos el ID de la propiedad creada para mandarselo como prop al componente de las imagenes para luego
        // enviar el POST de images a la propiedad correspondiente
        setPropertyId(response.data.id)
        
        toast.success('¡Propiedad Creada con Éxito!...', { duration: 2500 });
      } else {
        toast.error('Hubo un error al crear la propiedad.', { duration: 2000 });
      }
    } catch (error) {
      console.warn("error", error)
      toast.error('Hubo un problema al querer crear la propiedad.', { duration: 2000 });
    }
  };

  return (
    <div className="w-full p-4 md:p-6 lg:pt-0">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full">

        {/* Formulario de Imágenes */}
        {propertyId ? (
          <UploadImageForm propertyId={propertyId as string} />
        ) : (
          <div className="border-2 border-dashed bg-gray-200 border-gray-400 rounded-lg p-6 text-center text-gray-600">
            Primero completá y enviá los datos del inmueble para poder subir las imágenes.
          </div>
        )}


        {/* Formulario de Propiedad */}
        <Formik
          initialValues={{
            name: '',
            status: "",
            type: '',
            address: '',
            city: '',
            price: 0,
            m2: 0,
            bathrooms: 0,
            rooms: 0,
            description: '',
            id_images: []
          }}
          onSubmit={handleOnSubmit}
          validationSchema={validationSchema}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col items-start justify-start rounded-lg p-6 md:p-8 shadow-[1px_5px_8px_4px_rgba(0,0,0,0.2)]"
            >
              <h2 className="text-2xl md:text-3xl font-bold text-[#230c89] w-full mb-6">
                Datos del Inmueble
              </h2>

              {/* Nombre */}
              <div className="flex flex-col w-full mb-4">
                <label htmlFor="name" className="text-lg md:text-xl font-bold mb-1">
                  Nombre
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Departamento Céntrico de 2 Ambientes"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`border ${errors.name && touched.name ? 'border-red-500' : 'border-gray-400'} text-gray-800 rounded-lg p-2 shadow w-full`}
                />
                {errors.name && touched.name && <p className="text-red-600 text-sm mt-1">{errors.name}</p>}
              </div>

              {/* Alquiler / Venta */}
              <div className="flex flex-col w-full mb-4">
                <label htmlFor="status" className="text-lg md:text-xl font-bold mb-1">
                  Alquiler / Venta
                </label>
                <select
                  id="status"
                  name="status"
                  value={values.status}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`border ${errors.status && touched.status ? 'border-red-500' : 'border-gray-400'} text-gray-600 rounded-lg p-2 shadow w-full`}
                >
                  <option value="">Seleccionar</option>
                  <option value="AVAILABLE">Alquiler</option>
                  <option value="SOLD">Venta</option>
                </select>
                {errors.status && touched.status && <p className="text-red-600 text-sm mt-1">{errors.status}</p>}
              </div>

              {/* Tipo de propiedad */}
              <div className="flex flex-col w-full mb-4">
                <label htmlFor="type" className="text-lg md:text-xl font-bold mb-1">
                  Tipo de propiedad
                </label>
                <select
                  id="type"
                  name="type"
                  value={values.type}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`border ${errors.type && touched.type ? 'border-red-500' : 'border-gray-400'} text-gray-600 rounded-lg p-2 shadow w-full`}
                >
                  <option value="">Seleccionar</option>
                  <option value="HOUSE">CASA</option>
                  <option value="APARTMENT">DEPARTAMENTO</option>
                  <option value="COMMERCIAL">LOCAL COMERCIAL</option>
                  <option value="LAND">TERRENO</option>
                  <option value="OFFICE">OFICINA</option>
                  <option value="WAREHOUSE">GALPÓN</option>
                </select>
                {errors.type && touched.type && <p className="text-red-600 text-sm mt-1">{errors.type}</p>}
              </div>

              {/* Ciudad */}
              <div className="flex flex-col w-full mb-4">
                <label htmlFor="city" className="text-lg md:text-xl font-bold mb-1">
                  Ciudad
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  placeholder="Córdoba"
                  value={values.city}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`border ${errors.city && touched.city ? 'border-red-500' : 'border-gray-400'} text-gray-800 rounded-lg p-2 shadow w-full`}
                />
                {errors.city && touched.city && <p className="text-red-600 text-sm mt-1">{errors.city}</p>}
              </div>

              {/* Dirección */}
              <div className="flex flex-col w-full mb-4">
                <label htmlFor="address" className="text-lg md:text-xl font-bold mb-1">
                  Dirección
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  placeholder="Av. Colón"
                  value={values.address}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`border ${errors.address && touched.address ? 'border-red-500' : 'border-gray-400'} text-gray-800 rounded-lg p-2 shadow w-full`}
                />
                {errors.address && touched.address && <p className="text-red-600 text-sm mt-1">{errors.address}</p>}
              </div>

              {/* Precio y metros cuadrados */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full mb-4">
                <div className="flex flex-col">
                  <label htmlFor="price" className="text-lg md:text-xl font-bold mb-1">
                    Precio
                  </label>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    value={values.price}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`border ${errors.price && touched.price ? 'border-red-500' : 'border-gray-400'} text-gray-600 rounded-lg p-2 shadow w-full`}
                  />
                  {errors.price && touched.price && <p className="text-red-600 text-sm mt-1">{errors.price}</p>}
                </div>
                <div className="flex flex-col">
                  <label htmlFor="m2" className="text-lg md:text-xl font-bold mb-1">
                    m²
                  </label>
                  <input
                    type="number"
                    id="m2"
                    name="m2"
                    value={values.m2}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`border ${errors.m2 && touched.m2 ? 'border-red-500' : 'border-gray-400'} text-gray-600 rounded-lg p-2 shadow w-full`}
                  />
                  {errors.m2 && touched.m2 && <p className="text-red-600 text-sm mt-1">{errors.m2}</p>}
                </div>
              </div>

              {/* Baños y habitaciones */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full mb-4">
                <div className="flex flex-col">
                  <label htmlFor="bathrooms" className="text-lg md:text-xl font-bold mb-1">
                    Baños
                  </label>
                  <input
                    type="number"
                    id="bathrooms"
                    name="bathrooms"
                    value={values.bathrooms}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`border ${errors.bathrooms && touched.bathrooms ? 'border-red-500' : 'border-gray-400'} text-gray-600 rounded-lg p-2 shadow w-full`}
                  />
                  {errors.bathrooms && touched.bathrooms && <p className="text-red-600 text-sm mt-1">{errors.bathrooms}</p>}
                </div>
                <div className="flex flex-col">
                  <label htmlFor="rooms" className="text-lg md:text-xl font-bold mb-1">
                    Habitaciones
                  </label>
                  <input
                    type="number"
                    id="rooms"
                    name="rooms"
                    value={values.rooms}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`border ${errors.rooms && touched.rooms ? 'border-red-500' : 'border-gray-400'} text-gray-600 rounded-lg p-2 shadow w-full`}
                  />
                  {errors.rooms && touched.rooms && <p className="text-red-600 text-sm mt-1">{errors.rooms}</p>}
                </div>
              </div>

              {/* Descripción */}
              <div className="flex flex-col w-full mb-6">
                <label htmlFor="description" className="text-lg md:text-xl font-bold mb-1">
                  Descripción
                </label>
                <textarea
                  id="description"
                  name="description"
                  placeholder="Una descripcion que detalle tu propiedad y que posteriormente verá el usuario"
                  value={values.description}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`border ${errors.description && touched.description ? 'border-red-500' : 'border-gray-400'} text-gray-800 rounded-lg p-2 shadow w-full min-h-[120px]`}
                />
                {errors.description && touched.description && <p className="text-red-600 text-sm mt-1">{errors.description}</p>}
              </div>

              {/* Botones */}
              <div className="flex flex-col md:flex-row justify-between items-center w-full gap-4">
                <button
                  type="submit"
                  className="text-white bg-blue-700 py-3 px-4 rounded-lg w-full md:w-[250px] text-lg"
                >
                  Subir Propiedad
                </button>
                <button
                  type="button"
                  className="text-white bg-red-600 py-3 px-4 text-lg rounded-lg w-full md:w-[200px]"
                >
                  Cancelar
                </button>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default DashboardPage;


