'use client';

import UploadImageForm from './ArrayImages';
import { Formik } from 'formik';
import toast from 'react-hot-toast';
import { CreateProperty } from '@/services/subirPropiedad';
import { validationSchema } from '../../validacionesDashBoard/propiedades';
import { IPropertyForm } from '../../../../../interface/DashboardAgente/subirPropiedadDTO';
import { useState, useEffect } from 'react';
import { useAuthContext } from '../../../../../context/authContext';

const API_URL = process.env.NEXT_PUBLIC_API_URL || "91.235.34.31:3000";

interface ITypeOfProperty {
  id: string;
  type: string;
}

const DashboardPage = () => {
  const [propertyId, setPropertyId] = useState<string | null>(null);
  const [typeOptions, setTypeOptions] = useState<ITypeOfProperty[]>([]);
  const { user } = useAuthContext();

  const fetchTypeOfProperties = async () => {
    try {
    const response = await fetch(`${API_URL}/typeofproperty`);

      if (!response.ok) throw new Error('Error al obtener tipos de propiedad');

      const res = await response.json();

      const propertyTypes = Array.isArray(res.content) ? res.content : [];
      setTypeOptions(propertyTypes);
    } catch (error) {
      console.error('Error fetching property types:', error);
      toast.error('No se pudieron cargar los tipos de propiedad');
  }};

  useEffect(() => {
    fetchTypeOfProperties();
  }, []);

  const initialValues: IPropertyForm = {
    name: '',
    status: 'Disponible', // Sólo disponible al crear
    type: '',   // Alquiler o Venta
    type_of_property_id: '',
    address: '',
    city: '',
    price: 0,
    m2: 0,
    bathrooms: 0,
    rooms: 0,
    description: '',
    id_images: [],
    agency: '',
  };

  const handleOnSubmit = async (values: IPropertyForm) => {
    try {
      if (!user?.agencyId) {
        console.log("Este es el id del usuario: ", user?.id);


        console.log("Este es el id de la agencia del usuario: ", user?.agencyId);
        
        toast.error('No se encontró la agencia del usuario.', { duration: 2500 });
        return;
      }
      console.log("este es el id de la agencia:", user.agencyId);
      console.log("este es el id del user:", user.id);
      
      
      const postProperty = {
        ...values,
        agency: String(user.agencyId),
      };
      
      const response = await CreateProperty(postProperty);
      
      if (response && response.success === true) {
        setPropertyId(response.data.id);
        toast.success('¡Propiedad Creada con Éxito!...', { duration: 2500 });
      } else {
        toast.error('Hubo un error al crear la propiedad.', { duration: 2000 });
      }
    } catch (error) {
      console.warn('error', error);
      toast.error('Hubo un problema al querer crear la propiedad.', { duration: 2000 });
    }
  };
  
  return (
    <div className="w-full p-4 md:p-6 lg:pt-0">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full">

        {/* Componente para subir imágenes */}
        {/* cambiar el valor luego de "true" a "propertyId"  */}
        {propertyId ? (
          <UploadImageForm propertyId={propertyId} />
        ) : (
          <div className="border-2 border-dashed bg-gray-200 border-gray-400 rounded-lg p-6 text-center text-gray-600">
            Primero completá y enviá los datos del inmueble para poder subir las imágenes.
          </div>
        )}

        <Formik
          initialValues={initialValues}
          onSubmit={handleOnSubmit}
          validationSchema={validationSchema}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched, resetForm }) => (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col items-start justify-start rounded-lg p-6 md:p-8 shadow-[1px_5px_8px_4px_rgba(0,0,0,0.2)]"
            >
              <h2 className="text-2xl md:text-3xl font-bold text-[#230c89] w-full mb-6">
                Datos del Inmueble
              </h2>

              {/* Nombre */}
              <div className="flex flex-col w-full mb-4">
                <label htmlFor="name" className="text-lg md:text-xl font-bold mb-1">Nombre</label>
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

              {/* Status (Solo Disponible) */}
              <div className="flex flex-col w-full mb-4">
                <label htmlFor="status" className="text-lg md:text-xl font-bold mb-1">Estado (Disponible)</label>
                <select
                  id="status"
                  name="status"
                  value={values.status}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  disabled // no dejar cambiar, fijo "Disponible"
                  className={`border border-gray-400 text-gray-600 rounded-lg p-2 shadow w-full`}
                >
                  <option value="Disponible">Disponible</option>
                </select>
                {errors.status && touched.status && <p className="text-red-600 text-sm mt-1">{errors.status}</p>}
              </div>

              {/* Tipo (Alquiler / Venta) */}
              <div className="flex flex-col w-full mb-4">
                <label htmlFor="type" className="text-lg md:text-xl font-bold mb-1">Tipo (Alquiler / Venta)</label>
                <select
                  id="type"
                  name="type"
                  value={values.type}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`border ${errors.type && touched.type ? 'border-red-500' : 'border-gray-400'} text-gray-600 rounded-lg p-2 shadow w-full`}
                >
                  <option value="">Seleccionar</option>
                  <option value="Alquiler">Alquiler</option>
                  <option value="Venta">Venta</option>
                </select>
                {errors.type && touched.type && <p className="text-red-600 text-sm mt-1">{errors.type}</p>}
              </div>

              {/* Tipo de propiedad */}
              <div className="flex flex-col w-full mb-4">
                <label htmlFor="type_of_property_id" className="text-lg md:text-xl font-bold mb-1">Tipo de propiedad</label>
                <select
                  id="type_of_property_id"
                  name="type_of_property_id"
                  value={values.type_of_property_id}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`border ${errors.type_of_property_id && touched.type_of_property_id ? 'border-red-500' : 'border-gray-400'} text-gray-600 rounded-lg p-2 shadow w-full`}
                >
                  <option value="">Seleccionar</option>
                  {typeOptions.map((type) => (
                    <option key={type.id} value={type.id}>
                      {type.type}
                    </option>
                  ))}
                </select>
                {errors.type_of_property_id && touched.type_of_property_id && (
                  <p className="text-red-600 text-sm mt-1">{errors.type_of_property_id}</p>
                )}
              </div>

              {/* Ciudad */}
              <div className="flex flex-col w-full mb-4">
                <label htmlFor="city" className="text-lg md:text-xl font-bold mb-1">Ciudad</label>
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
                <label htmlFor="address" className="text-lg md:text-xl font-bold mb-1">Dirección</label>
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
                  <label htmlFor="price" className="text-lg md:text-xl font-bold mb-1">Precio</label>
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
                  <label htmlFor="m2" className="text-lg md:text-xl font-bold mb-1">m²</label>
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
                  <label htmlFor="bathrooms" className="text-lg md:text-xl font-bold mb-1">Baños</label>
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
                  <label htmlFor="rooms" className="text-lg md:text-xl font-bold mb-1">Habitaciones</label>
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
                <label htmlFor="description" className="text-lg md:text-xl font-bold mb-1">Descripción</label>
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
                  onClick={() => resetForm()}
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
