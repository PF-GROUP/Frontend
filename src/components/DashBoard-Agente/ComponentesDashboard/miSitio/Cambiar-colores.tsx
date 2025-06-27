"use client";

import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import { toast } from "react-hot-toast";
import { colorValidationSchema } from "../../validacionesDashBoard/miSitio";
import { useAuthContext } from "../../../../../context/authContext";
import UploadLogoBanner from "./enviarLogoYBanner";

interface ICustomizationValues {
  information: string;
  mainColors: string;
  navbarColor: string;
  buttonColor: string;
  backgroundColor: string;
  secondaryColor: string;
  logoImage?: string;
  banner?: string;
}

const MiSitio: React.FC = () => {
  const { user } = useAuthContext();
  const [hasCustomization, setHasCustomization] = useState<boolean | null>(null);
  const [customizationId, setCustomizationId] = useState<string | null>(null); // Estado agregado

  useEffect(() => {
    if (!user?.agencyId) return;

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/agencies/${user.agencyId}/customization`, {
      credentials: "include",
    })
      .then((res) => {
        if (res.status === 200) {
          setHasCustomization(true);
        } else if (res.status === 404) {
          setHasCustomization(false);
        }
      })
      .catch((err) => {
        console.error("Error al verificar customización:", err);
      });
  }, [user?.agencyId]);

  const handleOnSubmit = async (values: ICustomizationValues) => {
    console.log("🔥 ENVIANDO DATOS:", values);
    try {
      const payload = {
        information: values.information,
        mainColors: values.mainColors,
        navbarColor: values.navbarColor,
        buttonColor: values.buttonColor,
        backgroundColor: values.backgroundColor,
        secondaryColor: values.secondaryColor,
      };

      const method = hasCustomization ? "PATCH" : "POST";

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/agencies/${String(user?.agencyId)}/customization`,
        {
          method,
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();
      console.log("🧠 response completo:", data);
      // Guardar customizationId para usarlo en el componente UploadLogoBanner
      if (response.ok && data) {
        setCustomizationId(data.id);
        toast.success("Colores modificados con Éxito.", { duration: 2500 });
      } else {
        console.warn("⚠️ Hubo un Error al editar los Colores:", data);
        toast.error(" Hubo un Error al editar los Colores.", { duration: 2000 });
      }
    } catch (error) {
      console.error("❌ Error en los datos:", error);
      toast.error("Error al ingresar los datos.", { duration: 2000 });
    }
  };

  return (
    <>
      <Formik
        initialValues={{
          logoImage: "",
          information: "",
          mainColors: "#FFFFFF",
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
          isSubmitting,
          errors,
          touched,
        }) => (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-start justify-start m-auto w-full max-w-5xl rounded-lg p-6 pt-0 md:p-8 md:pt-8 space-y-8 shadow-[1px_5px_8px_4px_rgba(0,0,0,0.2)]"
          >
            {/* Aquí va TODO tu formulario tal cual está */}
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
                <div className="h-14 w-30 ml-2 bg-white rounded shadow" />
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
                <div className="w-full h-full bg-gray-300" />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center bg-black/20 px-4">
                  <h3
                    className="text-xl md:text-3xl font-bold drop-shadow-lg"
                    style={{ color: values.secondaryColor }}
                  >
                    Mi Web Inmobiliaria
                  </h3>
                  <p className="text-white text-sm md:text-base drop-shadow-md" style={{ color: values.mainColors }}>
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
                    <p className="text-center text-sm text-blue-600" >
                      Link
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div id="Logo" className="w-full rounded-sm p-6 border border-gray-400 bg-gray-200 shadow grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-6">
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

      {/* Renderizado condicional del componente de subir logo y banner */}
      {customizationId && <UploadLogoBanner customizationId={customizationId} />}
    </>
  );
};

export default MiSitio;
