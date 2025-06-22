'use client'
import React, { useState } from "react";
import { Formik, Form, useField } from "formik";
import { validationCambiarContraseña } from "../../validacionesDashBoard/cuenta";
import { Eye, EyeOff } from "lucide-react";



// Input con botón para mostrar/ocultar contraseña y borde rojo si hay error
const InputPasswordToggle: React.FC<{
  name: string;
  placeholder: string;
}> = ({ name, placeholder }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [field, meta] = useField(name);

  return (
    <div className="relative w-full">
      <input
        {...field}
        type={showPassword ? "text" : "password"}
        placeholder={placeholder}
        className={`border ${
          meta.touched && meta.error ? "border-red-500" : "border-gray-400"
        } text-gray-800 rounded-lg p-2 pr-10 shadow w-full`}
      />
      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute right-2 top-2 text-gray-600"
        tabIndex={-1}
      >
        {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
      </button>
      {meta.touched && meta.error && (
        <div className="text-red-600 text-sm mt-1">{meta.error}</div>
      )}
    </div>
  );
};

const Contrasena: React.FC = () => {
  return (
    <div className="w-full p-4 sm:p-6 lg:p-10 max-w-2xl mx-auto rounded-lg shadow-[1px_5px_8px_4px_rgba(0,0,0,0.2)] bg-white">
      <h2 className="text-2xl sm:text-3xl font-bold text-[#230c89] mb-6">Cambiar Contraseña</h2>

      <Formik
        initialValues={{
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        }}
        validationSchema={validationCambiarContraseña}
        onSubmit={(values, { resetForm }) => {
          alert("Contraseña cambiada con éxito!");
          resetForm();
        }}
      >
        {() => (
          <Form className="flex flex-col w-full space-y-4">
            {/* Contraseña actual */}
            <div className="flex flex-col w-full">
              <label htmlFor="currentPassword" className="text-lg sm:text-xl font-bold mb-1">
                Ingrese Contraseña Actual
              </label>
              <InputPasswordToggle name="currentPassword" placeholder="••••••••" />
            </div>

            {/* Nueva contraseña */}
            <div className="flex flex-col w-full mt-2">
              <label htmlFor="newPassword" className="text-lg sm:text-xl font-bold mb-1">
                Escriba una Contraseña Nueva
              </label>
              <InputPasswordToggle name="newPassword" placeholder="••••••••" />
            </div>

            {/* Confirmar contraseña */}
            <div className="flex flex-col w-full mt-2">
              <label htmlFor="confirmPassword" className="text-lg sm:text-xl font-bold mb-1">
                Confirme su Contraseña
              </label>
              <InputPasswordToggle name="confirmPassword" placeholder="••••••••" />
            </div>

            {/* Botones */}
            <div className="flex flex-col sm:flex-row justify-between items-center mt-6 gap-4">
              <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 py-3 px-4 rounded-lg w-full sm:w-[250px] text-base font-semibold"
              >
                Enviar
              </button>
              <button
                type="reset"
                className="text-white bg-red-600 hover:bg-red-700 py-3 px-4 rounded-lg w-full sm:w-[200px] text-base"
              >
                Cancelar
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Contrasena;
