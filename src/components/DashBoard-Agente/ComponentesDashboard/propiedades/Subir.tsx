'use client';

import { Upload } from 'lucide-react';
import { Formik } from 'formik';
import { validationSchema } from '../../validacionesDashBoard/propiedades';
import { CreateProperty } from '@/services/subirPropiedad';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { IPropertyForm } from '../../../../../interface/DashboardAgente/subirPropiedadDTO';

const DashboardPage = () => {
  const router = useRouter();

  const handleOnSubmit = async (values: IPropertyForm) => {
    try {
      const response = await CreateProperty(values);

      console.log("🧠 response completo:", response);

      if (response && response.success === true) {
        toast.success('¡Propiedad Creada con Éxito!...', { duration: 2500 });
        setTimeout(() => {
          router.push('/home');
        }, 2000);
      } else {
        console.warn("⚠️ Hubo un Error al crear la Propiedad:", response);
        toast.error('Hubo un error al crear la propiedad.', { duration: 2000 });
      }
    } catch (error) {
      console.error("❌ Error en los datos:", error);
      toast.error('Hubo un problema al querer crear la propiedad.', { duration: 2000 });
    }
  };

  return (
    <div className="w-full p-4 md:p-6 lg:pt-0">
      <Formik
        initialValues={{
          name: '',
          status: '',
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
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched, setFieldValue }) => (
          <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full">

          <div className="flex flex-col items-start justify-start rounded-lg p-6 md:p-8 shadow-[1px_5px_8px_4px_rgba(0,0,0,0.2)]">
  <h2 className="text-2xl md:text-3xl font-bold text-[#230c89] mb-5">Seleccionar Imágenes</h2>
  <div className="w-full space-y-4">

    {/* Vista previa de imágenes */}
    <div className="border border-gray-400 rounded-lg p-4 bg-gray-400 min-h-[200px] shadow overflow-y-auto">
      {values.id_images && values.id_images.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {values.id_images.map((file, index) => (
            <div key={index} className="relative group">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={URL.createObjectURL(file)}
                alt={`img-${index}`}
                className="w-full h-28 object-cover rounded-md border"
              />
              <button
                type="button"
                className="absolute top-1 right-1 bg-red-600 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition"
                onClick={() => {
                  const newImages = values.id_images.filter((_, i) => i !== index);
                  setFieldValue('id_images', newImages);
                }}
              >
                X
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-white text-lg font-semibold text-center mt-11">Sube imagenes de tus Propiedades</p>
      )}
    </div>

    {/* Input para subir imágenes */}
    <div className="flex justify-center mt-7">
      <label htmlFor="file-upload" className="flex items-center gap-2 bg-blue-700 text-white font-semibold text-lg py-2 px-4 rounded-lg cursor-pointer">
        <Upload size={22} /> Subir imagen
        <input
          id="file-upload"
          type="file"
          multiple
          accept="image/*"
          className="hidden"
          onChange={(event) => {
            const files = event.currentTarget.files;
            if (files) {
              const fileArray = Array.from(files);
              setFieldValue('id_images', [...values.id_images, ...fileArray]);
            }
          }}
          onBlur={handleBlur}
        />
      </label>
    </div>

    {/* Validación de errores */}
    {errors.id_images && touched.id_images && (
      <p className="text-red-600 text-sm mt-1">{errors.id_images}</p>
    )}
  </div>
</div>



            {/* SECCIÓN: Datos del Inmueble */}
            <div className="flex flex-col items-start justify-start rounded-lg p-6 md:p-8 shadow-[1px_5px_8px_4px_rgba(0,0,0,0.2)]">
              <h2 className="text-2xl md:text-3xl font-bold text-[#230c89] w-full mb-6">Datos del Inmueble</h2>

              {/* Nombre */}
              <div className="flex flex-col w-full mb-4">
                <label htmlFor="name" className="text-lg md:text-xl font-bold mb-1">Nombre</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`border ${errors.name && touched.name ? 'border-red-500' : 'border-gray-400'} text-gray-600 rounded-lg p-2 shadow w-full`}
                />
                {errors.name && touched.name && <p className="text-red-600 text-sm mt-1">{errors.name}</p>}
              </div>

              {/* Tipo de operación */}
              <div className="flex flex-col w-full mb-4">
                <label htmlFor="status" className="text-lg md:text-xl font-bold mb-1">Alquiler / Venta</label>
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
                <label htmlFor="type" className="text-lg md:text-xl font-bold mb-1">Tipo de propiedad</label>
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
                <label htmlFor="city" className="text-lg md:text-xl font-bold mb-1">Ciudad</label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={values.city}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`border ${errors.city && touched.city ? 'border-red-500' : 'border-gray-400'} text-gray-600 rounded-lg p-2 shadow w-full`}
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
                  className={`border ${errors.address && touched.address ? 'border-red-500' : 'border-gray-400'} text-gray-600 rounded-lg p-2 shadow w-full`}
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
                  value={values.description}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`border ${errors.description && touched.description ? 'border-red-500' : 'border-gray-400'} text-gray-600 rounded-lg p-2 shadow w-full min-h-[120px]`}
                />
                {errors.description && touched.description && <p className="text-red-600 text-sm mt-1">{errors.description}</p>}
              </div>

              {/* Botones */}
              <div className="flex flex-col md:flex-row justify-between items-center w-full gap-4">
                <button type="submit" className="text-white bg-blue-700 py-3 px-4 rounded-lg w-full md:w-[250px] text-lg">
                  Subir Propiedad
                </button>
                <button type="button" className="text-white bg-red-600 py-3 px-4 text-lg rounded-lg w-full md:w-[200px]">
                  Cancelar
                </button>
              </div>
            </div>

          </form>
        )}
      </Formik>
    </div>
  );
};

export default DashboardPage;


// Codigo de antes donde si fuuncionan las vlidaciones
// 'use client'

// import { Upload } from 'lucide-react'
// import { Formik } from 'formik'
// import { validationSchema } from '../../validacionesDashBoard/propiedades'
// import { CreateProperty } from '@/services/subirPropiedad'
// import toast from 'react-hot-toast'
// import { useRouter } from 'next/navigation'
// import { IPropertyForm } from '../../../../../interface/DashboardAgente/subirPropiedadDTO'


// const DashboardPage = () => {
  
//   const router = useRouter();

//     const handleOnSubmit = async (values: IPropertyForm) => {
//         try {
//       const response = await CreateProperty(values);
  
//       console.log("🧠 response completo:", response);
  
//       // ✅ Asegurate de que RegisterSubmit devuelva el objeto con "success"
//       if (response && response.success === true) {
//         toast.success('¡Propiedad Creada con Exíto!...', { duration: 2500 });
//         setTimeout(() => {
//           router.push('/home');
//         }, 2000);
//       } else {
//         console.warn("⚠️ El registro no fue exitoso:", response);
//         toast.error('Hubo un error al crear la propiedad.', { duration: 2000 });
//       }
//     } catch (error) {
//       console.error("❌ Error en el register:", error);
//       toast.error('Hubo un problema al querer registrarse.', { duration: 2000 });
//     }
//   };




//   return (
//     <div className=" w-full p-4 md:p-6 lg:pt-0 flex flex-col gap-8 lg:flex-row">
//       {/* Subir imágenes */}
//       <div className="flex flex-col items-start justify-start md:h-[50vh] lg:w-1/2 rounded-lg p-6 md:p-8 shadow-[1px_5px_8px_4px_rgba(0,0,0,0.2)]">
//         <h2 className="text-2xl md:text-3xl font-bold text-[#230c89] mb-5">Seleccionar Imágenes</h2>
//         <div className="w-full space-y-4">
//           <div className="border border-gray-400 rounded-lg p-4 bg-gray-200 h-[200px] shadow"></div>
//           <div className="flex justify-center mt-7">
//             <label htmlFor="file-upload" className="flex items-center gap-2 bg-blue-700 text-white font-semibold text-lg py-2 px-4 rounded-lg cursor-pointer">
//               <Upload size={22} /> Subir imagen
//               <input id="file-upload" type="file" multiple accept="image/*" className="hidden" />
//             </label>
//           </div>
//         </div>
//       </div>

//       {/* Formulario */}
//       <div className="flex flex-col items-start justify-start w-full lg:w-1/2 rounded-lg p-6 md:p-8 shadow-[1px_5px_8px_4px_rgba(0,0,0,0.2)]">
//         <h2 className="text-2xl md:text-3xl font-bold text-[#230c89] w-full mb-6">Datos del Inmueble</h2>

//         <Formik
//             initialValues={{
//             name: '',
//             status: '',      // va a ser el enum como string
//             type: '',        // enum Type como string
//             address: '',
//             city: '',
//             price: 0,
//             m2: 0,
//             bathrooms: 0,
//             rooms: 0,
//             description: '',
//             id_images: []
//           }}
//           onSubmit={handleOnSubmit}
//           validationSchema={validationSchema}
  
//         >
//           {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
//             <form onSubmit={handleSubmit} className="flex flex-col w-full space-y-4">
//               {/* Nombre */}
//               <div className="flex flex-col w-full">
//                 <label htmlFor='nombre' className="text-lg md:text-xl font-bold mb-1">Nombre</label>
//                 <input
//                   type="text"
//                   id='nombre'
//                   name="nombre"
//                   value={values.nombre}
//                   onChange={handleChange}
//                   onBlur={handleBlur}
//                   className={`border ${errors.nombre && touched.nombre ? 'border-red-500' : 'border-gray-400'} text-gray-600 rounded-lg p-2 shadow w-full`}
//                 />
//                 {errors.nombre && touched.nombre && <p className="text-red-600 text-sm mt-1">{errors.nombre}</p>}
//               </div>

//               {/* Tipo de Operación */}
//               <div className="flex flex-col">
//                 <label htmlFor='tipoOperacion' className="text-lg md:text-xl font-bold mb-1">Alquiler / Venta</label>
//                 <select
//                   id='tipoOperacion'
//                   name="tipoOperacion"
//                   value={values.tipoOperacion}
//                   onChange={handleChange}
//                   onBlur={handleBlur}
//                   className={`border ${errors.tipoOperacion && touched.tipoOperacion ? 'border-red-500' : 'border-gray-400'} text-gray-600 rounded-lg p-2 shadow w-full`}
//                 >
//                   <option value="">Seleccionar</option>
//                   <option value="Alquiler">Alquiler</option>
//                   <option value="Venta">Venta</option>
//                 </select>
//                 {errors.tipoOperacion && touched.tipoOperacion && (
//                   <p className="text-red-600 text-sm mt-1">{errors.tipoOperacion}</p>
//                 )}
//               </div>

//               {/* Tipo de Propiedad */}
//               <div className="flex flex-col">
//                 <label htmlFor='tipoPropiedad' className="text-lg md:text-xl font-bold mb-1">Tipo de propiedad</label>
//                 <select
//                   id='tipoPropiedad'
//                   name="tipoPropiedad"
//                   value={values.tipoPropiedad}
//                   onChange={handleChange}
//                   onBlur={handleBlur}
//                   className={`border ${errors.tipoPropiedad && touched.tipoPropiedad ? 'border-red-500' : 'border-gray-400'} text-gray-600 rounded-lg p-2 shadow w-full`}
//                 >
//                   <option value="">Seleccionar</option>
//                   <option value="CASA">CASA</option>
//                   <option value="CHALET">CHALET</option>
//                   <option value="LOCAL_COMERCIAL">LOCAL COMERCIAL</option>
//                   <option value="TERRENO">TERRENO</option>
//                   <option value="OFICINA">OFICINA</option>
//                   <option value="GALPON">GALPÓN</option>
//                 </select>
//                 {errors.tipoPropiedad && touched.tipoPropiedad && (
//                   <p className="text-red-600 text-sm mt-1">{errors.tipoPropiedad}</p>
//                 )}
//               </div>

//               {/* Estatus */}
//               <div className="flex flex-col">
//                 <label htmlFor='estatus' className="text-lg md:text-xl font-bold mb-1">Estado</label>
//                 <select
//                   name="estatus"
//                   id='estatus'
//                   value={values.estatus}
//                   onChange={handleChange}
//                   onBlur={handleBlur}
//                   className={`border ${errors.estatus && touched.estatus ? 'border-red-500' : 'border-gray-400'} text-gray-600 rounded-lg p-2 shadow w-full`}
//                 >
//                   <option value="">Seleccionar</option>
//                   <option value="Disponible">Disponible</option>
//                   <option value="Vendido">Vendido</option>
//                 </select>
//                 {errors.estatus && touched.estatus && <p className="text-red-600 text-sm mt-1">{errors.estatus}</p>}
//               </div>

//               {/* Precio y Metros */}
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div className="flex flex-col">
//                   <label className="text-lg md:text-xl font-bold mb-1">Precio</label>
//                   <input
//                     type="text"
//                     name="precio"
//                     placeholder="$"
//                     value={values.precio}
//                     onChange={handleChange}
//                     onBlur={handleBlur}
//                     className={`border ${errors.precio && touched.precio ? 'border-red-500' : 'border-gray-400'} text-gray-600 rounded-lg p-2 shadow w-full`}
//                   />
//                   {errors.precio && touched.precio && <p className="text-red-600 text-sm mt-1">{errors.precio}</p>}
//                 </div>

//                 <div className="flex flex-col">
//                   <label className="text-lg md:text-xl font-bold mb-1">m2</label>
//                   <input
//                     type="text"
//                     name="metros"
//                     placeholder="m²"
//                     value={values.metros}
//                     onChange={handleChange}
//                     onBlur={handleBlur}
//                     className={`border ${errors.metros && touched.metros ? 'border-red-500' : 'border-gray-400'} text-gray-600 rounded-lg p-2 shadow w-full`}
//                   />
//                   {errors.metros && touched.metros && <p className="text-red-600 text-sm mt-1">{errors.metros}</p>}
//                 </div>
//               </div>

//               {/* Dirección */}
//               <div className="flex flex-col">
//                 <label className="text-lg md:text-xl font-bold mb-1">Dirección</label>
//                 <input
//                   type="text"
//                   name="direccion"
//                   placeholder="Av. Colón"
//                   value={values.direccion}
//                   onChange={handleChange}
//                   onBlur={handleBlur}
//                   className={`border ${errors.direccion && touched.direccion ? 'border-red-500' : 'border-gray-400'} text-gray-600 rounded-lg p-2 shadow w-full`}
//                 />
//                 {errors.direccion && touched.direccion && <p className="text-red-600 text-sm mt-1">{errors.direccion}</p>}
//               </div>

//               {/* Baños y Habitaciones */}
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div className="flex flex-col">
//                   <label htmlFor="banos" className="text-lg md:text-xl font-bold mb-1">Baños</label>
//                   <input
//                     type="text"
//                     id='banos'
//                     name="banos"
//                     value={values.banos}
//                     onChange={handleChange}
//                     onBlur={handleBlur}
//                     className={`border ${errors.banos && touched.banos ? 'border-red-500' : 'border-gray-400'} text-gray-600 rounded-lg p-2 shadow w-full`}
//                   />
//                   {errors.banos && touched.banos && <p className="text-red-600 text-sm mt-1">{errors.banos}</p>}
//                 </div>

//                 <div className="flex flex-col">
//                   <label htmlFor='habitaciones' className="text-lg md:text-xl font-bold mb-1">Habitaciones</label>
//                   <input
//                     type="text"
//                     id='habitaciones'
//                     name="habitaciones"
//                     value={values.habitaciones}
//                     onChange={handleChange}
//                     onBlur={handleBlur}
//                     className={`border ${errors.habitaciones && touched.habitaciones ? 'border-red-500' : 'border-gray-400'} text-gray-600 rounded-lg p-2 shadow w-full`}
//                   />
//                   {errors.habitaciones && touched.habitaciones && <p className="text-red-600 text-sm mt-1">{errors.habitaciones}</p>}
//                 </div>
//               </div>

//               {/* Descripción */}
//               <div className="flex flex-col">
//                 <label className="text-lg md:text-xl font-bold mb-1">Descripción</label>
//                 <textarea
//                   name="descripcion"
//                   value={values.descripcion}
//                   onChange={handleChange}
//                   onBlur={handleBlur}
//                   placeholder="Descripción"
//                   className={`border ${errors.descripcion && touched.descripcion ? 'border-red-500' : 'border-gray-400'} text-gray-600 rounded-lg p-2 shadow w-full min-h-[120px]`}
//                 />
//                 {errors.descripcion && touched.descripcion && <p className="text-red-600 text-sm mt-1">{errors.descripcion}</p>}
//               </div>

//               {/* Botones */}
//               <div className="flex flex-col md:flex-row justify-center items-center mt-6 gap-4">
//                 <button type="submit" className="text-white bg-blue-800 py-3 px-4 rounded-lg w-full md:w-[250px] text-lg">
//                   Subir Propiedad
//                 </button>
//                 <button type="button" className="text-white bg-red-700 py-3 px-4 text-lg rounded-lg w-full md:w-[200px]">
//                   Cancelar
//                 </button>
//               </div>
//             </form>
//           )}
//         </Formik>
//       </div>
//     </div>
//   )
// }

// export default DashboardPage
