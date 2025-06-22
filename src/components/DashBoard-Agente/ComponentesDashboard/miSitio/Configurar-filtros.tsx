import React, { useState } from "react";

const filtrosIniciales = {
  tipoPropiedad: false,
  habitaciones: false,
  rangoPrecio: false,
  ubicacion: false,
  banos: false,
  metrosCuadrados: false,
  estado: false,
  garage: false,
};

const ConfigurarFiltros: React.FC = () => {
  const [filtros, setFiltros] = useState(filtrosIniciales);

  // Estados para valores de filtros
  const [tipo, setTipo] = useState("Casa");
  const [habitaciones, setHabitaciones] = useState(1);
  const [precioMin, setPrecioMin] = useState("");
  const [precioMax, setPrecioMax] = useState("");
  const [ubicacion, setUbicacion] = useState("");
  const [banos, setBanos] = useState(1);
  const [metrosMin, setMetrosMin] = useState("");
  const [metrosMax, setMetrosMax] = useState("");
  const [estado, setEstado] = useState("Nuevo");
  const [garage, setGarage] = useState(false);

  const toggleFiltro = (key: keyof typeof filtros) => {
    setFiltros((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleGuardar = () => {
    // Aquí podrías enviar los filtros a un backend o guardar localmente
    const filtrosActivos = Object.entries(filtros)
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .filter(([_, activo]) => activo)
      .map(([key]) => key);
    alert(`Filtros activos: ${filtrosActivos.join(", ")}`);
  };

  return (
    <div className="flex flex-col items-start justify-start m-auto max-w-xl w-full rounded-lg p-11 lg:p-8 lg:pl-11 shadow-[1px_5px_8px_4px_rgba(0,0,0,0.2)]">
      <h2 className="text-3xl font-bold text-[#230c89]  text-start w-full  mb-6">Configurar Filtros</h2>

      <div className="flex flex-col pl-3">
      {/* Filtro: Tipo de propiedad */}
      <div className="flex justify-between w-[166px] items-center mb-4">
        <label  htmlFor="tipoPropiedad" >Tipo de propiedad</label>
        <input
          type="checkbox"
          name="tipoPropiedad"
          id="tipoPropiedad"
          checked={filtros.tipoPropiedad}
          onChange={() => toggleFiltro("tipoPropiedad")}
          className="toggle mt-0.5"
        />
      </div>
      {filtros.tipoPropiedad && (
        <select
        value={tipo}
        onChange={(e) => setTipo(e.target.value)}
        className="w-full mb-4 p-2 border rounded"
        >
          <option>Casa</option>
          <option>Departamento</option>
          <option>PH</option>
          <option>Local comercial</option>
          <option>Terreno</option>
        </select>
      )}

      {/* Filtro: Habitaciones */}
      <div className="flex justify-between w-[166px] items-center mb-4">
        <label htmlFor="checkbox" className="font-medium">Habitaciones</label>
        <input
          type="checkbox"
          id="checkbox"
          checked={filtros.habitaciones}
          onChange={() => toggleFiltro("habitaciones")}
          className="toggle mt-0.5"
        />
      </div>
      {filtros.habitaciones && (
        <input
          type="number"
          min={0}
          value={habitaciones}
          onChange={(e) => setHabitaciones(parseInt(e.target.value))}
          className="w-full mb-4 p-2 border rounded"
          placeholder="Cantidad de habitaciones"
        />
      )}

      {/* Filtro: Rango de precios */}
      <div className="flex justify-between w-[166px] items-center mb-4">
        <label htmlFor="" className="font-medium">Rango de precios</label>
        <input
          type="checkbox"
          id="checkbox"
          checked={filtros.rangoPrecio}
          onChange={() => toggleFiltro("rangoPrecio")}
          className="toggle mt-0.5"
        />
      </div>
      {filtros.rangoPrecio && (
        <div className="flex space-x-2 mb-4">
          <input
            type="number"
            min={0}
            value={precioMin}
            onChange={(e) => setPrecioMin(e.target.value)}
            className="flex-1 p-2 border rounded"
            placeholder="Mínimo"
          />
          <input
            type="number"
            min={0}
            value={precioMax}
            onChange={(e) => setPrecioMax(e.target.value)}
            className="flex-1 p-2 border rounded"
            placeholder="Máximo"
          />
        </div>
      )}

      {/* Filtro: Ubicación */}
      <div className="flex justify-between w-[166px] items-center mb-4">
        <label htmlFor="checkbox" className="font-medium">Ubicación</label>
        <input
          type="checkbox"
          id="checkbox"
          checked={filtros.ubicacion}
          onChange={() => toggleFiltro("ubicacion")}
          className="toggle mt-0.5"
        />
      </div>
      {filtros.ubicacion && (
        <input
          type="text"
          value={ubicacion}
          onChange={(e) => setUbicacion(e.target.value)}
          className="w-full mb-4 p-2 border rounded"
          placeholder="Ciudad, barrio o zona"
        />
      )}

      {/* Filtro: Baños */}
      <div className="flex justify-between w-[166px] items-center mb-4">
        <label htmlFor="checkbox" className="font-medium">Baños</label>
        <input
          type="checkbox"
          id="checkbox"
          checked={filtros.banos}
          onChange={() => toggleFiltro("banos")}
          className="toggle mt-0.5"
        />
      </div>
      {filtros.banos && (
        <input
          type="number"
          min={0}
          value={banos}
          onChange={(e) => setBanos(parseInt(e.target.value))}
          className="w-full mb-4 p-2 border rounded"
          placeholder="Cantidad de baños"
        />
      )}

      {/* Filtro: Metros cuadrados */}
      <div className="flex justify-between w-[166px] items-center mb-4">
        <label htmlFor="checkbox" className="font-medium">Metros cuadrados</label>
        <input
          type="checkbox"
          id="checkbox"
          checked={filtros.metrosCuadrados}
          onChange={() => toggleFiltro("metrosCuadrados")}
          className="toggle mt-0.5"
        />
      </div>
      {filtros.metrosCuadrados && (
        <div className="flex space-x-2 mb-4">
          <input
            type="number"
            min={0}
            value={metrosMin}
            onChange={(e) => setMetrosMin(e.target.value)}
            className="flex-1 p-2 border rounded"
            placeholder="Mínimo"
          />
          <input
            type="number"
            min={0}
            value={metrosMax}
            onChange={(e) => setMetrosMax(e.target.value)}
            className="flex-1 p-2 border rounded"
            placeholder="Máximo "
          />
        </div>
      )}

      {/* Filtro: Estado */}
      <div className="flex justify-between w-[166px] items-center mb-4">
        <label htmlFor="checkbox" className="font-medium">Estado</label>
        <input
          type="checkbox"
          id="checkbox"
          checked={filtros.estado}
          onChange={() => toggleFiltro("estado")}
          className="toggle mt-0.5"
        />
      </div>
      {filtros.estado && (
        <select
          value={estado}
          onChange={(e) => setEstado(e.target.value)}
          className="w-full mb-4 p-2 border rounded"
        >
          <option>Nuevo</option>
          <option>Usado</option>
          <option>En construcción</option>
        </select>
      )}

      {/* Filtro: Garage */}
      <div className="flex justify-between w-[166px] items-center mb-6">
        <label htmlFor="checkbox" className="font-medium">Garage</label>
        <input
          type="checkbox"
          id="checkbox"
          checked={filtros.garage}
          onChange={() => toggleFiltro("garage")}
          className="toggle mt-0.5"
        />
      </div>
      {filtros.garage && (
        <select
          value={garage ? "Sí" : "No"}
          onChange={(e) => setGarage(e.target.value === "Sí")}
          className="w-full mb-4 p-2 border rounded"
        >
          <option>Sí</option>
          <option>No</option>
        </select>
      )}
        </div>
      <button
        onClick={handleGuardar}
        className="w-[460px] bg-blue-700 text-white py-2 ml-3  rounded font-semibold hover:bg-blue-800 transition-colors"
        >
        Guardar
      </button>
    </div>
  );
};

export default ConfigurarFiltros;


// con Formik y yup:

// "use client";

// import React from "react";
// import { Formik } from "formik";
// import * as Yup from "yup";
// import { toast } from "react-hot-toast";

// const filtrosSchema = Yup.object().shape({
//   tipoPropiedad: Yup.boolean(),
//   habitaciones: Yup.boolean(),
//   rangoPrecio: Yup.boolean(),
//   ubicacion: Yup.boolean(),
//   banos: Yup.boolean(),
//   metrosCuadrados: Yup.boolean(),
//   estado: Yup.boolean(),
//   garage: Yup.boolean(),

//   tipo: Yup.string().when("tipoPropiedad", {
//     is: true,
//     then: (schema) => schema.required("El tipo es obligatorio"),
//   }),
//   habitacionesCantidad: Yup.number().when("habitaciones", {
//     is: true,
//     then: (schema) =>
//       schema.min(1, "Mínimo 1 habitación").required("Requerido"),
//   }),
//   precioMin: Yup.number().when("rangoPrecio", {
//     is: true,
//     then: (schema) => schema.min(0, "Mínimo 0").required("Requerido"),
//   }),
//   precioMax: Yup.number().when("rangoPrecio", {
//     is: true,
//     then: (schema) => schema.min(0, "Mínimo 0").required("Requerido"),
//   }),
//   ubicacionTexto: Yup.string().when("ubicacion", {
//     is: true,
//     then: (schema) => schema.required("La ubicación es obligatoria"),
//   }),
//   banosCantidad: Yup.number().when("banos", {
//     is: true,
//     then: (schema) => schema.min(1).required("Requerido"),
//   }),
//   metrosMin: Yup.number().when("metrosCuadrados", {
//     is: true,
//     then: (schema) => schema.min(0).required("Requerido"),
//   }),
//   metrosMax: Yup.number().when("metrosCuadrados", {
//     is: true,
//     then: (schema) => schema.min(0).required("Requerido"),
//   }),
//   estadoTipo: Yup.string().when("estado", {
//     is: true,
//     then: (schema) => schema.required("Estado requerido"),
//   }),
//   garageTiene: Yup.boolean(),
// });

// const ConfigurarFiltros: React.FC = () => {
//   const handleSubmit = (values: any) => {
//     const filtrosActivos = Object.entries(values)
//       .filter(([key, val]) => typeof val === "boolean" && val === true)
//       .map(([key]) => key);
//     console.log("🧠 Filtros configurados:", values);
//     toast.success(`Filtros activos: ${filtrosActivos.join(", ")}`);
//   };

//   return (
//     <Formik
//       initialValues={{
//         tipoPropiedad: false,
//         habitaciones: false,
//         rangoPrecio: false,
//         ubicacion: false,
//         banos: false,
//         metrosCuadrados: false,
//         estado: false,
//         garage: false,
//         tipo: "Casa",
//         habitacionesCantidad: 1,
//         precioMin: "",
//         precioMax: "",
//         ubicacionTexto: "",
//         banosCantidad: 1,
//         metrosMin: "",
//         metrosMax: "",
//         estadoTipo: "Nuevo",
//         garageTiene: false,
//       }}
//       validationSchema={filtrosSchema}
//       onSubmit={handleSubmit}
//     >
//       {({
//         values,
//         handleChange,
//         handleSubmit,
//         setFieldValue,
//         errors,
//         touched,
//       }) => (
//         <form
//           onSubmit={handleSubmit}
//           className="flex flex-col items-start justify-start m-auto max-w-xl w-full rounded-lg p-11 lg:p-8 lg:pl-11 shadow-[1px_5px_8px_4px_rgba(0,0,0,0.2)]"
//         >
//           <h2 className="text-3xl font-bold text-[#230c89] text-start w-full mb-6">
//             Configurar Filtros
//           </h2>

//           <div className="flex flex-col pl-3">
//             {/* Tipo de propiedad */}
//             <div className="flex justify-between w-[166px] items-center mb-4">
//               <label htmlFor="tipoPropiedad">Tipo de propiedad</label>
//               <input
//                 type="checkbox"
//                 name="tipoPropiedad"
//                 checked={values.tipoPropiedad}
//                 onChange={() =>
//                   setFieldValue("tipoPropiedad", !values.tipoPropiedad)
//                 }
//                 className="toggle mt-0.5"
//               />
//             </div>
//             {values.tipoPropiedad && (
//               <select
//                 name="tipo"
//                 value={values.tipo}
//                 onChange={handleChange}
//                 className="w-full mb-4 p-2 border rounded"
//               >
//                 <option>Casa</option>
//                 <option>Departamento</option>
//                 <option>PH</option>
//                 <option>Local comercial</option>
//                 <option>Terreno</option>
//               </select>
//             )}

//             {/* Habitaciones */}
//             <div className="flex justify-between w-[166px] items-center mb-4">
//               <label>Habitaciones</label>
//               <input
//                 type="checkbox"
//                 name="habitaciones"
//                 checked={values.habitaciones}
//                 onChange={() =>
//                   setFieldValue("habitaciones", !values.habitaciones)
//                 }
//                 className="toggle mt-0.5"
//               />
//             </div>
//             {values.habitaciones && (
//               <input
//                 type="number"
//                 name="habitacionesCantidad"
//                 value={values.habitacionesCantidad}
//                 onChange={handleChange}
//                 className="w-full mb-4 p-2 border rounded"
//                 placeholder="Cantidad de habitaciones"
//               />
//             )}

//             {/* Rango precio */}
//             <div className="flex justify-between w-[166px] items-center mb-4">
//               <label>Rango de precios</label>
//               <input
//                 type="checkbox"
//                 name="rangoPrecio"
//                 checked={values.rangoPrecio}
//                 onChange={() =>
//                   setFieldValue("rangoPrecio", !values.rangoPrecio)
//                 }
//                 className="toggle mt-0.5"
//               />
//             </div>
//             {values.rangoPrecio && (
//               <div className="flex space-x-2 mb-4">
//                 <input
//                   type="number"
//                   name="precioMin"
//                   value={values.precioMin}
//                   onChange={handleChange}
//                   className="flex-1 p-2 border rounded"
//                   placeholder="Mínimo"
//                 />
//                 <input
//                   type="number"
//                   name="precioMax"
//                   value={values.precioMax}
//                   onChange={handleChange}
//                   className="flex-1 p-2 border rounded"
//                   placeholder="Máximo"
//                 />
//               </div>
//             )}

//             {/* Ubicación */}
//             <div className="flex justify-between w-[166px] items-center mb-4">
//               <label>Ubicación</label>
//               <input
//                 type="checkbox"
//                 name="ubicacion"
//                 checked={values.ubicacion}
//                 onChange={() =>
//                   setFieldValue("ubicacion", !values.ubicacion)
//                 }
//                 className="toggle mt-0.5"
//               />
//             </div>
//             {values.ubicacion && (
//               <input
//                 type="text"
//                 name="ubicacionTexto"
//                 value={values.ubicacionTexto}
//                 onChange={handleChange}
//                 className="w-full mb-4 p-2 border rounded"
//                 placeholder="Ciudad, barrio o zona"
//               />
//             )}

//             {/* Baños */}
//             <div className="flex justify-between w-[166px] items-center mb-4">
//               <label>Baños</label>
//               <input
//                 type="checkbox"
//                 name="banos"
//                 checked={values.banos}
//                 onChange={() => setFieldValue("banos", !values.banos)}
//                 className="toggle mt-0.5"
//               />
//             </div>
//             {values.banos && (
//               <input
//                 type="number"
//                 name="banosCantidad"
//                 value={values.banosCantidad}
//                 onChange={handleChange}
//                 className="w-full mb-4 p-2 border rounded"
//                 placeholder="Cantidad de baños"
//               />
//             )}

//             {/* Metros cuadrados */}
//             <div className="flex justify-between w-[166px] items-center mb-4">
//               <label>Metros cuadrados</label>
//               <input
//                 type="checkbox"
//                 name="metrosCuadrados"
//                 checked={values.metrosCuadrados}
//                 onChange={() =>
//                   setFieldValue("metrosCuadrados", !values.metrosCuadrados)
//                 }
//                 className="toggle mt-0.5"
//               />
//             </div>
//             {values.metrosCuadrados && (
//               <div className="flex space-x-2 mb-4">
//                 <input
//                   type="number"
//                   name="metrosMin"
//                   value={values.metrosMin}
//                   onChange={handleChange}
//                   className="flex-1 p-2 border rounded"
//                   placeholder="Mínimo"
//                 />
//                 <input
//                   type="number"
//                   name="metrosMax"
//                   value={values.metrosMax}
//                   onChange={handleChange}
//                   className="flex-1 p-2 border rounded"
//                   placeholder="Máximo"
//                 />
//               </div>
//             )}

//             {/* Estado */}
//             <div className="flex justify-between w-[166px] items-center mb-4">
//               <label>Estado</label>
//               <input
//                 type="checkbox"
//                 name="estado"
//                 checked={values.estado}
//                 onChange={() => setFieldValue("estado", !values.estado)}
//                 className="toggle mt-0.5"
//               />
//             </div>
//             {values.estado && (
//               <select
//                 name="estadoTipo"
//                 value={values.estadoTipo}
//                 onChange={handleChange}
//                 className="w-full mb-4 p-2 border rounded"
//               >
//                 <option>Nuevo</option>
//                 <option>Usado</option>
//                 <option>En construcción</option>
//               </select>
//             )}

//             {/* Garage */}
//             <div className="flex justify-between w-[166px] items-center mb-6">
//               <label>Garage</label>
//               <input
//                 type="checkbox"
//                 name="garage"
//                 checked={values.garage}
//                 onChange={() => setFieldValue("garage", !values.garage)}
//                 className="toggle mt-0.5"
//               />
//             </div>
//             {values.garage && (
//               <select
//                 name="garageTiene"
//                 value={values.garageTiene ? "Sí" : "No"}
//                 onChange={(e) =>
//                   setFieldValue("garageTiene", e.target.value === "Sí")
//                 }
//                 className="w-full mb-4 p-2 border rounded"
//               >
//                 <option>Sí</option>
//                 <option>No</option>
//               </select>
//             )}
//           </div>

//           <button
//             type="submit"
//             className="w-[460px] bg-blue-700 text-white py-2 ml-3 rounded font-semibold hover:bg-blue-800 transition-colors"
//           >
//             Guardar
//           </button>
//         </form>
//       )}
//     </Formik>
//   );
// };

// export default ConfigurarFiltros;
