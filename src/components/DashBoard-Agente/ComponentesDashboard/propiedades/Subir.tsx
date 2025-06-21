'use client'

import { Upload } from 'lucide-react'
import { Formik } from 'formik'
import { validationSchema } from '../../validacionesDashBoard/propiedades'

const DashboardPage = () => {
  return (
    <div className=" w-full p-4 md:p-6 lg:pt-0 flex flex-col gap-8 lg:flex-row">
      {/* Subir imágenes */}
      <div className="flex flex-col items-start justify-start md:h-[50vh] lg:w-1/2 rounded-lg p-6 md:p-8 shadow-[1px_5px_8px_4px_rgba(0,0,0,0.2)]">
        <h2 className="text-2xl md:text-3xl font-bold text-[#230c89] mb-5">Seleccionar Imágenes</h2>
        <div className="w-full space-y-4">
          <div className="border border-gray-400 rounded-lg p-4 bg-gray-200 h-[200px] shadow"></div>
          <div className="flex justify-center mt-7">
            <label htmlFor="file-upload" className="flex items-center gap-2 bg-blue-700 text-white font-semibold text-lg py-2 px-4 rounded-lg cursor-pointer">
              <Upload size={22} /> Subir imagen
              <input id="file-upload" type="file" multiple accept="image/*" className="hidden" />
            </label>
          </div>
        </div>
      </div>

      {/* Formulario */}
      <div className="flex flex-col items-start justify-start w-full lg:w-1/2 rounded-lg p-6 md:p-8 shadow-[1px_5px_8px_4px_rgba(0,0,0,0.2)]">
        <h2 className="text-2xl md:text-3xl font-bold text-[#230c89] w-full mb-6">Datos del Inmueble</h2>

        <Formik
          initialValues={{
            nombre: '',
            tipoOperacion: '',
            tipoPropiedad: '',
            estatus: '',
            precio: '',
            metros: '',
            direccion: '',
            banos: '',
            habitaciones: '',
            descripcion: '',
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            alert(JSON.stringify(values, null, 2))
          }}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
            <form onSubmit={handleSubmit} className="flex flex-col w-full space-y-4">
              {/* Nombre */}
              <div className="flex flex-col w-full">
                <label htmlFor='nombre' className="text-lg md:text-xl font-bold mb-1">Nombre</label>
                <input
                  type="text"
                  id='nombre'
                  name="nombre"
                  value={values.nombre}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`border ${errors.nombre && touched.nombre ? 'border-red-500' : 'border-gray-400'} text-gray-600 rounded-lg p-2 shadow w-full`}
                />
                {errors.nombre && touched.nombre && <p className="text-red-600 text-sm mt-1">{errors.nombre}</p>}
              </div>

              {/* Tipo de Operación */}
              <div className="flex flex-col">
                <label htmlFor='tipoOperacion' className="text-lg md:text-xl font-bold mb-1">Alquiler / Venta</label>
                <select
                  id='tipoOperacion'
                  name="tipoOperacion"
                  value={values.tipoOperacion}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`border ${errors.tipoOperacion && touched.tipoOperacion ? 'border-red-500' : 'border-gray-400'} text-gray-600 rounded-lg p-2 shadow w-full`}
                >
                  <option value="">Seleccionar</option>
                  <option value="Alquiler">Alquiler</option>
                  <option value="Venta">Venta</option>
                </select>
                {errors.tipoOperacion && touched.tipoOperacion && (
                  <p className="text-red-600 text-sm mt-1">{errors.tipoOperacion}</p>
                )}
              </div>

              {/* Tipo de Propiedad */}
              <div className="flex flex-col">
                <label htmlFor='tipoPropiedad' className="text-lg md:text-xl font-bold mb-1">Tipo de propiedad</label>
                <select
                  id='tipoPropiedad'
                  name="tipoPropiedad"
                  value={values.tipoPropiedad}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`border ${errors.tipoPropiedad && touched.tipoPropiedad ? 'border-red-500' : 'border-gray-400'} text-gray-600 rounded-lg p-2 shadow w-full`}
                >
                  <option value="">Seleccionar</option>
                  <option value="CASA">CASA</option>
                  <option value="CHALET">CHALET</option>
                  <option value="LOCAL_COMERCIAL">LOCAL COMERCIAL</option>
                  <option value="TERRENO">TERRENO</option>
                  <option value="OFICINA">OFICINA</option>
                  <option value="GALPON">GALPÓN</option>
                </select>
                {errors.tipoPropiedad && touched.tipoPropiedad && (
                  <p className="text-red-600 text-sm mt-1">{errors.tipoPropiedad}</p>
                )}
              </div>

              {/* Estatus */}
              <div className="flex flex-col">
                <label htmlFor='estatus' className="text-lg md:text-xl font-bold mb-1">Estado</label>
                <select
                  name="estatus"
                  id='estatus'
                  value={values.estatus}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`border ${errors.estatus && touched.estatus ? 'border-red-500' : 'border-gray-400'} text-gray-600 rounded-lg p-2 shadow w-full`}
                >
                  <option value="">Seleccionar</option>
                  <option value="Disponible">Disponible</option>
                  <option value="Reservado">Reservado</option>
                  <option value="Vendido">Vendido</option>
                </select>
                {errors.estatus && touched.estatus && <p className="text-red-600 text-sm mt-1">{errors.estatus}</p>}
              </div>

              {/* Precio y Metros */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <label className="text-lg md:text-xl font-bold mb-1">Precio</label>
                  <input
                    type="text"
                    name="precio"
                    placeholder="$"
                    value={values.precio}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`border ${errors.precio && touched.precio ? 'border-red-500' : 'border-gray-400'} text-gray-600 rounded-lg p-2 shadow w-full`}
                  />
                  {errors.precio && touched.precio && <p className="text-red-600 text-sm mt-1">{errors.precio}</p>}
                </div>

                <div className="flex flex-col">
                  <label className="text-lg md:text-xl font-bold mb-1">m2</label>
                  <input
                    type="text"
                    name="metros"
                    placeholder="m²"
                    value={values.metros}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`border ${errors.metros && touched.metros ? 'border-red-500' : 'border-gray-400'} text-gray-600 rounded-lg p-2 shadow w-full`}
                  />
                  {errors.metros && touched.metros && <p className="text-red-600 text-sm mt-1">{errors.metros}</p>}
                </div>
              </div>

              {/* Dirección */}
              <div className="flex flex-col">
                <label className="text-lg md:text-xl font-bold mb-1">Dirección</label>
                <input
                  type="text"
                  name="direccion"
                  placeholder="Av. Colón"
                  value={values.direccion}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`border ${errors.direccion && touched.direccion ? 'border-red-500' : 'border-gray-400'} text-gray-600 rounded-lg p-2 shadow w-full`}
                />
                {errors.direccion && touched.direccion && <p className="text-red-600 text-sm mt-1">{errors.direccion}</p>}
              </div>

              {/* Baños y Habitaciones */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <label htmlFor="banos" className="text-lg md:text-xl font-bold mb-1">Baños</label>
                  <input
                    type="text"
                    id='banos'
                    name="banos"
                    value={values.banos}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`border ${errors.banos && touched.banos ? 'border-red-500' : 'border-gray-400'} text-gray-600 rounded-lg p-2 shadow w-full`}
                  />
                  {errors.banos && touched.banos && <p className="text-red-600 text-sm mt-1">{errors.banos}</p>}
                </div>

                <div className="flex flex-col">
                  <label htmlFor='habitaciones' className="text-lg md:text-xl font-bold mb-1">Habitaciones</label>
                  <input
                    type="text"
                    id='habitaciones'
                    name="habitaciones"
                    value={values.habitaciones}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`border ${errors.habitaciones && touched.habitaciones ? 'border-red-500' : 'border-gray-400'} text-gray-600 rounded-lg p-2 shadow w-full`}
                  />
                  {errors.habitaciones && touched.habitaciones && <p className="text-red-600 text-sm mt-1">{errors.habitaciones}</p>}
                </div>
              </div>

              {/* Descripción */}
              <div className="flex flex-col">
                <label className="text-lg md:text-xl font-bold mb-1">Descripción</label>
                <textarea
                  name="descripcion"
                  value={values.descripcion}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Descripción"
                  className={`border ${errors.descripcion && touched.descripcion ? 'border-red-500' : 'border-gray-400'} text-gray-600 rounded-lg p-2 shadow w-full min-h-[120px]`}
                />
                {errors.descripcion && touched.descripcion && <p className="text-red-600 text-sm mt-1">{errors.descripcion}</p>}
              </div>

              {/* Botones */}
              <div className="flex flex-col md:flex-row justify-between items-center mt-6 gap-4">
                <button type="submit" className="text-white bg-blue-700 py-3 px-4 rounded-lg w-full md:w-[250px] text-lg">
                  Subir Propiedad
                </button>
                <button type="button" className="text-white bg-red-600 py-3 px-4 text-lg rounded-lg w-full md:w-[200px]">
                  Cancelar
                </button>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </div>
  )
}

export default DashboardPage
