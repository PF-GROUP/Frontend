"use client";

import React, { useState } from "react";
import { Formik } from "formik";
import { toast } from "react-hot-toast";
import { colorValidationSchema } from "../../validacionesDashBoard/miSitio";
import { editarColoresAgencia } from "@/services/editarColores";
import { IColores } from "../../../../../interface/DashboardAgente/ColoresDTO";
import { useRouter } from "next/navigation";
import { useAuthContext } from "../../../../../context/authContext";

const MiSitio: React.FC = () => {
  const router = useRouter();

  // Sacamos los datos del usuario que se logueo
  const { user } = useAuthContext();

  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [bannerPreview, setBannerPreview] = useState<string | null>(null);

  const handleOnSubmit = async (values: IColores) => {
    try {
    // verificamos si el user Existe 
      if (!user || typeof user.agencyId !== "number") return;
    // le pasamos a la funcion editarColoresAgencia los valores del formulario y el id del user para enviar el PATCH
      const response = await editarColoresAgencia(values, user.agencyId);
      console.log("🧠 response completo:", response);

      if (response && response.id) {
        toast.success("Colores modificados con Éxito.", { duration: 2500 });
        setTimeout(() => {
          router.push("/home");
        }, 2000);
      } else {
        console.warn("⚠️ Hubo un Error al editar los Colores:", response);
        toast.error(" Hubo un Error al editar los Colores.", { duration: 2000 });
      }
    } catch (error) {
      console.error("❌ Error en los datos:", error);
      toast.error("Error al ingresar los datos.", { duration: 2000 });
    }
  };

  return (
    <Formik
      initialValues={{
        logoImage: "",
        information: "",
        mainColors: "#FFFFF",
        banner: "",
        navbarColor: "#a0aec0",
        buttonColor: "#4c6ef5",
        backgroundColor: "#1c3faa",
        secondaryColor: "#0a2540",
      }}
      validationSchema={colorValidationSchema}
      onSubmit={handleOnSubmit}
    >
      {({
        values,
        handleChange,
        handleBlur,
        handleSubmit,
        setFieldValue,
        isSubmitting,
        errors,
        touched,
      }) => (
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-start justify-start m-auto w-full max-w-5xl rounded-lg p-6 pt-0 md:p-8 md:pt-8 space-y-8 shadow-[1px_5px_8px_4px_rgba(0,0,0,0.2)]"
        >
          <div className="flex items-center justify-between w-full mb-0 pb-4">
            <h2 className="text-2xl md:text-3xl font-bold text-[#230c89] ">
              Cambiar colores
            </h2>
            <a
              href="#Logo"
              className="text-white bg-blue-600 pt-2 pb-2 pl-3 pr-3 rounded-lg hover:bg-blue-700"
            >
              Comenzar a editar
            </a>
          </div>

          <div
            className="w-full border border-gray-400 shadow mt-3"
            style={{ backgroundColor: values.backgroundColor }}
          >
            <div
              className="flex justify-between items-center border-b py-4 px-4"
              style={{ backgroundColor: values.navbarColor }}
            >
              {logoPreview ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={logoPreview}
                  alt="Logo"
                  className="h-15 w-40 object-cover"
                />
              ) : (
                <div className="h-14 w-30 ml-2 bg-white rounded shadow" />
              )}
              <div className="flex gap-2 flex-wrap">
                {["Home", "Category", "About Us", "Profile"].map((btn) => (
                  <button
                    key={btn}
                    type="button"
                    className="px-4 py-2 rounded shadow text-sm font-semibold"
                    style={{ backgroundColor: values.buttonColor, color: values.secondaryColor }}
                  >
                    {btn}
                  </button>
                ))}
              </div>
            </div>

            <div className="relative w-full h-56">
              {bannerPreview ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={bannerPreview}
                  alt="Banner"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-300" />
              )}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center bg-black/20 px-4">
                <h3
                  className="text-xl md:text-3xl font-bold drop-shadow-lg"
                  style={{ color: values.secondaryColor }}
                >
                  Mi Web Inmobiliaria
                </h3>
                <p className="text-white text-sm md:text-base drop-shadow-md"
                   style={{ color: values.mainColors }}>
                  {values.information}
                </p>
              </div>
            </div>

            <div className="text-center mt-6 mb-4">
              <h3
                className="text-xl md:text-2xl font-bold"
                style={{ color: values.mainColors }}
              >
                Propiedades disponibles
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 p-4 gap-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="border rounded-lg p-3 bg-white space-y-2 shadow"
                >
                  <div className="w-full h-24 bg-gray-300 rounded" />
                  <button
                    type="button"
                    className="w-full py-1 rounded text-white font-semibold"
                    style={{ backgroundColor: values.buttonColor }}
                  >
                    Ver
                  </button>
                  <p className="text-center text-sm" style={{ color: values.mainColors }}>
                    Link
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="w-full rounded-sm p-6 border border-gray-400 bg-gray-200 shadow grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-6">
            {[
              { id: "secondaryColor", label: "Color Principal" },
              { id: "mainColors", label: "Color Secundario" },
              { id: "navbarColor", label: "Color Navbar" },
              { id: "buttonColor", label: "Color Botón" },
              { id: "backgroundColor", label: "Color Fondo" },
              { id: "information", label: "Subtitulo" },
            ].map(({ id, label }) => (
              <div key={id} className="flex flex-col">
                <label htmlFor={id} className="text-sm font-semibold mb-1">
                  {label}
                </label>
                <input
                  type={id === "information" ? "text" : "color"}
                  id={id}
                  name={id}
                  value={values[id as keyof typeof values] as string}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full h-10 bg-white rounded border p-1 ${
                    touched[id as keyof typeof touched] && errors[id as keyof typeof errors]
                      ? "border-red-500"
                      : "border-gray-400"
                  }`}
                />
              </div>
            ))}

            {/* Logo Input */}
            <div id="Logo" className="flex flex-col col-span-3 border-t pt-4 border-gray-500">
              <label htmlFor="logoImage" className="text-sm font-semibold mb-1">
                Logo (imagen)
              </label>
              <input
                type="file"
                name="logoImage"
                id="logoImage"
                accept="image/*"
                onChange={(event) => {
                  const file = event.currentTarget.files?.[0];
                  if (file) {
                    const preview = URL.createObjectURL(file);
                    setLogoPreview(preview);
                    setFieldValue("logoImage", file);
                  }
                }}
                className="border border-gray-400 bg-white p-2 rounded w-full"
              />
            </div>

            {/* Banner Input */}
            <div className="flex flex-col col-span-3 border-t pt-4 border-gray-500">
              <label htmlFor="banner" className="text-sm font-semibold mb-1">
                Banner (imagen)
              </label>
              <input
                type="file"
                name="banner"
                id="banner"
                accept="image/*"
                onChange={(event) => {
                  const file = event.currentTarget.files?.[0];
                  if (file) {
                    const preview = URL.createObjectURL(file);
                    setBannerPreview(preview);
                    setFieldValue("banner", file);
                  }
                }}
                className="border border-gray-400 bg-white p-2 rounded w-full"
              />
            </div>
          </div>

          <div className="flex justify-between items-center w-full mt-6">
            <button
              type="submit"
              disabled={isSubmitting}
              className="text-white bg-blue-700 py-2 px-4 rounded-lg w-full font-semibold hover:bg-blue-800 transition"
            >
              Aplicar cambios
            </button>
          </div>
        </form>
      )}
    </Formik>
  );
};

export default MiSitio;
