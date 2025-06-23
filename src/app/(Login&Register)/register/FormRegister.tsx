"use client";

import React, { useEffect } from "react";
import { RegisterSubmit, RegisterSubmitGoogle } from "@/services/authService";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import registerValidations from "@/components/FormRegister/registerValidations";
import { Formik, useFormikContext } from "formik"; // Importamos useFormikContext
import RegisterUserDtoFront from "../../../interfaces/registerDto";
import Image from "next/image";
import { useAuthContext } from "../../../../context/authContext";
import dynamic from "next/dynamic";

// Definimos el tipo para los datos de Google
interface GoogleUserData {
  googleId: string;
  name: string;
  email: string;
  surname: string;
  token: string; // Agregamos el token
}

const GoogleRegisterButton = dynamic(
  () => import("../../../components/FormRegister/googleButton"),
  { ssr: false }
);

// Componente para manejar el autollenado
const AutoFillForm: React.FC<{ googleData: GoogleUserData | null }> = ({
  googleData,
}) => {
  const { setValues } = useFormikContext();

  useEffect(() => {
    if (googleData) {
      setValues(
        {
          name: googleData.name,
          surname: googleData.surname,
          email: googleData.email,
          googleId: googleData.googleId,
          // Mantenemos los otros campos sin cambios
        },
        false
      ); // false para no disparar validación inmediata
    }
  }, [googleData, setValues]);

  return null;
};

const FormRegister: React.FC = () => {
  const [googleData, setGoogleData] = React.useState<GoogleUserData | null>(
    null
  );
  const router = useRouter();
  const { SaveUserData } = useAuthContext();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleFillUpForm = (data: any): void => {
    // Extraemos los datos necesarios de Google
    const userData: GoogleUserData = {
      googleId: data.sub || data.id,
      name: data.given_name || data.name,
      surname: data.family_name || "",
      email: data.email,
      token: data.token || "", 
    };

    setGoogleData(userData);
    toast.success("Datos de Google cargados correctamente", { duration: 2000 });
  };

  const handleOnSubmit = async (values: RegisterUserDtoFront) => {
    console.log(values);

    try {
      // Agregamos el googleId a los datos enviados
     const finalPassword = googleData 
      ? null
      : values.password;

    const submitData = googleData 
      ? { ...values, password: finalPassword, googleId: googleData.googleId, token: googleData.token } 
      : values;
    
      if(googleData && submitData.token) {
        const response = await RegisterSubmitGoogle(submitData, SaveUserData);
        if (response) {
          toast.success("¡Usuario registrado! Redirigiendo...", {
            duration: 2500,
          });
          setTimeout(() => {
            router.push("/stripe");
          }, 2000);
        } else {
          toast.error("Dato repetido. Ingresa un valor distinto en Email.", {
            duration: 2000,
          });
        }
      }else {
const response = await RegisterSubmit(submitData, SaveUserData);
      if (response?.success === true) {
        toast.success("¡Usuario registrado! Redirigiendo...", {
          duration: 2500,
        });
        setTimeout(() => {
          router.push("/stripe");
        }, 2000);
      } else {
        toast.error("Dato repetido. Ingresa un valor distinto en Email.", {
          duration: 2000,
        });
      }
      }
    
    } catch (error) {
      console.log("mensaje de error catch: ", error);
      toast.error("Hubo un problema al querer registrarse.", {
        duration: 2000,
      });
    }
  };

  return (
    <>
      <Formik
        initialValues={{
          name: "",
          surname: "",
          phone: "",
          email: "",
          password: "",
          agencyName: "",
          agencyDescription: "",
          document: "",
          slug: "",
          googleId: "", // Nuevo campo para el ID de Google
        }}
        validationSchema={registerValidations}
        onSubmit={handleOnSubmit}
      >
        {({
          isSubmitting,
          values,
          handleBlur,
          handleChange,
          handleSubmit,
          errors,
          touched,
        }) => (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-center justify-center 
                            text-black bg-white border border-[#4e4b4b] overflow-hidden 
                            rounded-sm p-8 m-5 w-full max-w-[90%] md:w-[750px] md:max-w-none md:m-11"
          >
            {/* Componente para autollenado */}
            <AutoFillForm googleData={googleData} />

            <Image
              src="/logoKasapp.png"
              width={300}
              height={200}
              alt="logoDeKasapp"
              className="w-[100px] h-[60px] md:w-[145px] md:h-[95px]"
            />

            <h2 className="font-bold text-2xl md:text-3xl mt-4 mb-4">
              Crear una cuenta
            </h2>

            {/* Campo oculto para googleId */}
            <input
              type="hidden"
              name="googleId"
              value={values.googleId || ""}
            />

            <div className="w-full flex flex-col md:flex-row gap-6">
              {/* COLUMNA 1 */}
              <div className="flex flex-col w-full">
                {/* Nombre */}
                <div className="flex flex-col w-full m-1">
                  <label
                    htmlFor="name"
                    className="mt-2 text-black text-base md:text-xl"
                  >
                    Nombre
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="JhonDoe"
                    value={values.name}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    disabled={!!googleData} // Bloqueado si hay datos de Google
                    className={`text-black bg-white border border-[#4e4b4b] rounded-sm p-2 focus:border-[#a0a0a0] ${
                      googleData ? "bg-gray-100 cursor-not-allowed" : ""
                    }`}
                  />
                  <p className="text-sm text-red-500">
                    {errors.name && touched.name && errors.name}
                  </p>
                </div>

                {/* Apellido */}
                <div className="flex flex-col w-full m-1">
                  <label
                    htmlFor="surname"
                    className="text-black text-base md:text-xl"
                  >
                    Apellido
                  </label>
                  <input
                    type="text"
                    id="surname"
                    name="surname"
                    placeholder="Diaz"
                    value={values.surname}
                    disabled={!!googleData}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    className="text-black bg-white border border-[#4e4b4b] rounded-sm p-2 focus:border-[#a0a0a0]"
                  />
                  <p className="text-sm text-red-500">
                    {errors.surname && touched.surname && errors.surname}
                  </p>
                </div>

                {/* Teléfono */}
                <div className="flex flex-col w-full m-1">
                  <label
                    htmlFor="phone"
                    className="text-black text-base md:text-xl"
                  >
                    Teléfono
                  </label>
                  <input
                    type="text"
                    id="phone"
                    name="phone"
                    placeholder="3515097178"
                    value={values.phone}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    className="text-black bg-white border border-[#4e4b4b] rounded-sm p-2 focus:border-[#a0a0a0]"
                  />
                  <p className="text-sm text-red-500">
                    {errors.phone && touched.phone && errors.phone}
                  </p>
                </div>

                {/* Email */}
                <div className="flex flex-col w-full m-1">
                  <label
                    htmlFor="email"
                    className="text-black text-base md:text-xl"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="EmailExample@gmail.com"
                    value={values.email}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    disabled={!!googleData} // Bloqueado si hay datos de Google
                    className={`text-black bg-white border border-[#4e4b4b] rounded-sm p-2 focus:border-[#a0a0a0] ${
                      googleData ? "bg-gray-100 cursor-not-allowed" : ""
                    }`}
                  />
                  <p className="text-sm text-red-500">
                    {errors.email && touched.email && errors.email}
                  </p>
                </div>

                {/* Contraseña */}
                <div className="flex flex-col w-full m-1">
                  <label
                    htmlFor="password"
                    className="text-black text-base md:text-xl"
                  >
                    Contraseña{" "}
                    {!googleData && <span className="text-red-500">*</span>}
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder={
                      googleData ? "No requerida con Google" : "●●●●●●●●"
                    }
                    value={values.password}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    disabled={!!googleData}
                    className={`text-black bg-white border border-[#4e4b4b] rounded-sm p-2 focus:border-[#a0a0a0] ${
                      googleData ? "bg-gray-100 cursor-not-allowed" : ""
                    }`}
                  />
                  {!googleData && (
                    <p className="text-sm text-red-500">
                      {errors.password && touched.password && errors.password}
                    </p>
                  )}
                </div>
                {/* Documento */}
                <div className="flex flex-col w-full m-1">
                  <label
                    htmlFor="document"
                    className="text-black text-base md:text-xl"
                  >
                    Documento
                  </label>
                  <input
                    type="text"
                    id="document"
                    name="document"
                    placeholder="12345678"
                    value={values.document}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    className="text-black bg-white border border-[#4e4b4b] rounded-sm p-2 focus:border-[#a0a0a0]"
                  />
                  <p className="text-sm text-red-500">
                    {errors.document && touched.document && errors.document}
                  </p>
                </div>
              </div>

              {/* COLUMNA 2 */}
              <div className="flex flex-col w-full mt-2">
                {/* Nombre agencia */}
                <div className="flex flex-col w-full m-1">
                  <label
                    htmlFor="agencyName"
                    className="text-black text-base md:text-xl"
                  >
                    Nombre de la agencia
                  </label>
                  <input
                    type="text"
                    id="agencyName"
                    name="agencyName"
                    placeholder="Mi Inmobiliaria"
                    value={values.agencyName}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    className="text-black bg-white border border-[#4e4b4b] rounded-sm p-2 focus:border-[#a0a0a0]"
                  />
                  <p className="text-sm text-red-500">
                    {errors.agencyName &&
                      touched.agencyName &&
                      errors.agencyName}
                  </p>
                </div>

                {/* Descripción agencia */}
                <div className="flex flex-col w-full m-1">
                  <label
                    htmlFor="agencyDescription"
                    className="text-black text-base md:text-xl"
                  >
                    Descripción de la agencia
                  </label>
                  <input
                    type="text"
                    id="agencyDescription"
                    name="agencyDescription"
                    placeholder="Somos una inmobiliaria..."
                    value={values.agencyDescription}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    className="text-black bg-white border border-[#4e4b4b] rounded-sm p-2 focus:border-[#a0a0a0]"
                  />
                  <p className="text-sm text-red-500">
                    {errors.agencyDescription &&
                      touched.agencyDescription &&
                      errors.agencyDescription}
                  </p>
                </div>

                {/* Slug */}
                <div className="flex flex-col w-full m-1">
                  <label
                    htmlFor="slug"
                    className="text-black text-base md:text-xl"
                  >
                    URL de la agencia
                  </label>
                  <input
                    type="text"
                    id="slug"
                    name="slug"
                    placeholder="ej: inmobiliaria-central"
                    value={values.slug}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    className="text-black bg-white border border-[#4e4b4b] rounded-sm p-2 focus:border-[#a0a0a0]"
                  />
                  <p className="text-sm text-red-500">
                    {errors.slug && touched.slug && errors.slug}
                  </p>
                </div>
              </div>
            </div>

            {/* Botón de submit */}
            <div className="flex flex-col items-center justify-center mt-4 space-y-2">
              <p className="text-black text-base md:text-xl">
                O regístrate con:
              </p>
              <GoogleRegisterButton fillUpForm={handleFillUpForm} />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full text-white bg-[#a62f55] rounded-sm text-base md:text-xl py-2 mt-6 hover:bg-[#65383a] transition duration-300"
            >
              Crear cuenta
            </button>
          </form>
        )}
      </Formik>
    </>
  );
};

export default FormRegister;
