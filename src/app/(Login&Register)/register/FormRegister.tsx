"use client";

import React, { useState, useEffect } from "react";
import { Formik, useFormikContext } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import Image from "next/image";
import { UserIcon, IdCardIcon, HomeIcon } from "lucide-react";
import dynamic from "next/dynamic";

import { useAuthContext } from "@/context/AuthContext"; // Importás el contexto
import apiService from "@/services/apiService"; // Asegurate que esté importado

const GoogleRegisterButton = dynamic(
  () => import("../../../components/FormRegister/googleButton"),
  { ssr: false }
);

interface RegisterUserDtoFront {
  name: string;
  surname: string;
  email: string;
  password: string;
  phone: number | "";
  document: number | "";
  agencyName: string;
  agencyDescription: string;
  slug: string;
  googleId: string;
  token?: string;
  [key: string]: any;
}

interface GoogleUserData {
  googleId: string;
  name: string;
  surname: string;
  email: string;
  token: string;
}

const steps = [
  { label: "Datos", icon: UserIcon },
  { label: "Documento", icon: IdCardIcon },
  { label: "Agencia", icon: HomeIcon },
];

const StepProgressBar: React.FC<{ step: number }> = ({ step }) => (
  <div className="flex justify-center mb-8">
    <div className="flex items-center gap-4">
      {steps.map((item, index) => {
        const isActive = step === index + 1;
        const isCompleted = step > index + 1;
        const Icon = item.icon;

        return (
          <React.Fragment key={item.label}>
            <div className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center border-2 
                  ${isActive ? "bg-[#f1efef] border-[#b3232f] text-[#b3232f]" : ""}
                  ${isCompleted ? "bg-green-100 border-green-600 text-green-600" : ""}
                  ${!isActive && !isCompleted ? "bg-white border-gray-300 text-gray-400" : ""}`}
              >
                <Icon className="w-5 h-5" />
              </div>
              <span
                className={`mt-2 text-sm 
                  ${isActive ? "text-[#b3232f] font-medium" : ""}
                  ${isCompleted ? "text-green-600" : ""}
                  ${!isActive && !isCompleted ? "text-gray-400" : ""}`}
              >
                {item.label}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div className="w-12 h-px border-t-2 border-dashed border-gray-300" />
            )}
          </React.Fragment>
        );
      })}
    </div>
  </div>
);

const AutoFillForm: React.FC<{ googleData: GoogleUserData | null }> = ({ googleData }) => {
  const { setValues } = useFormikContext<RegisterUserDtoFront>();

  useEffect(() => {
    if (googleData) {
      setValues((prev) => ({
        ...prev,
        name: googleData.name,
        surname: googleData.surname,
        email: googleData.email,
        googleId: googleData.googleId,
      }));
    }
  }, [googleData, setValues]);

  return null;
};

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Nombre requerido"),
  surname: Yup.string().required("Apellido requerido"),
  email: Yup.string().email("Email inválido").required("Email requerido"),
  password: Yup.string().when("googleId", {
    is: (val: string) => !val,
    then: (schema) => schema.required("Contraseña requerida"),
    otherwise: (schema) => schema,
  }),
  phone: Yup.number().typeError("Teléfono debe ser numérico").required("Teléfono requerido"),
  document: Yup.number().typeError("Documento debe ser numérico").required("Documento requerido"),
  agencyName: Yup.string().required("Nombre requerido"),
  agencyDescription: Yup.string().required("Descripción requerida"),
  slug: Yup.string().required("Slug requerido"),
});

const FormRegister: React.FC = () => {
  const [step, setStep] = useState(1);
  const [googleData, setGoogleData] = useState<GoogleUserData | null>(null);
  const [formikHelpers, setFormikHelpers] = useState<{
    values: RegisterUserDtoFront;
    setFieldValue: (field: string, value: unknown, shouldValidate?: boolean) => void;
  } | null>(null);
  const router = useRouter();

  const { SaveUserData } = useAuthContext(); // Uso del contexto para guardar usuario

  const validateStepFields = (
    step: number,
    values: RegisterUserDtoFront,
    errors: import("formik").FormikErrors<RegisterUserDtoFront>
  ) => {
    const stepFields: Record<number, string[]> = {
      1: ["name", "surname", "email", ...(googleData ? [] : ["password"])],
      2: ["phone", "document"],
      3: ["agencyName", "agencyDescription", "slug"],
    };
    for (const field of stepFields[step]) {
      if (errors[field]) return false;
      if (!values[field] && values[field] !== 0) return false;
    }
    return true;
  };

  const handleFillUpForm = (data: Partial<GoogleUserData> & { sub?: string; id?: string }) => {
    const fullName = data.name || "";
    const [firstName, ...rest] = fullName.trim().split(" ");
    const lastName = rest.join(" ");

    const userData: GoogleUserData = {
      googleId: data.sub || data.id || "",
      name: firstName || "",
      surname: lastName || "",
      email: data.email || "",
      token: data.token || "",
    };

    setGoogleData(userData);
    toast.success("Datos de Google cargados correctamente");
  };

  const handleSubmit = async (values: RegisterUserDtoFront) => {
    try {
      // Aquí mandás la info al backend para registrar usuario
      const res = await apiService.post("/auth/register", values);

      // Guardás el usuario en el contexto para loguearlo automáticamente
      SaveUserData({ user: res.user });

      toast.success("Formulario enviado correctamente");
      router.push("/stripe");
    } catch (error) {
      toast.error("Error al registrar usuario");
      console.error(error);
    }
  };

  useEffect(() => {
    if (formikHelpers && formikHelpers.values.agencyName && step === 3) {
      const slug = formikHelpers.values.agencyName
        .toLowerCase()
        .trim()
        .replace(/\d+/g, "")
        .replace(/\s+/g, "-")
        .replace(/[^a-z\-]/g, "")
        .replace(/\-+/g, "-")
        .replace(/^-+|-+$/g, "");
      formikHelpers.setFieldValue("slug", slug);
    }
  }, [formikHelpers, formikHelpers?.values.agencyName, step]);

  return (
    <Formik
      initialValues={{
        name: "",
        surname: "",
        email: "",
        password: "",
        phone: "" as unknown as number,
        document: "" as unknown as number,
        agencyName: "",
        agencyDescription: "",
        slug: "",
        googleId: "",
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({
        values,
        handleChange,
        handleBlur,
        handleSubmit,
        errors,
        touched,
        isSubmitting,
        setFieldValue,
        validateForm,
      }) => {
        useEffect(() => {
          setFormikHelpers({ values, setFieldValue });
        }, [values, setFieldValue]);

        const handleNext = async () => {
          const formErrors = await validateForm();
          if (validateStepFields(step, values, formErrors)) {
            setStep((prev) => prev + 1);
          } else {
            toast.error("Por favor, completá correctamente los campos antes de continuar.");
          }
        };

        return (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-center bg-white text-black border border-gray-300 p-8 rounded-md w-[600px] min-h-[700px] max-w-2xl mx-auto relative"
          >
            <Image src="/iconoKasapp.png" alt="Logo" width={100} height={100} className="w-[120px] h-[120px]" />
            <StepProgressBar step={step} />
            <AutoFillForm googleData={googleData} />

            {step === 1 && (
              <div className="w-full flex flex-col gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label>Nombre</label>
                    <input
                      name="name"
                      value={values.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      readOnly={!!googleData}
                      className={`w-full border rounded p-2 ${googleData ? "bg-gray-100 cursor-not-allowed" : ""}`}
                    />
                    {touched.name && errors.name && (
                      <p className="text-red-500 text-sm">{errors.name}</p>
                    )}
                  </div>
                  <div>
                    <label>Apellido</label>
                    <input
                      name="surname"
                      value={values.surname}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      readOnly={!!googleData}
                      className={`w-full border rounded p-2 ${googleData ? "bg-gray-100 cursor-not-allowed" : ""}`}
                    />
                    {touched.surname && errors.surname && (
                      <p className="text-red-500 text-sm">{errors.surname}</p>
                    )}
                  </div>
                </div>
                <div>
                  <label>Email</label>
                  <input
                    name="email"
                    type="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    readOnly={!!googleData}
                    className={`w-full border rounded p-2 ${googleData ? "bg-gray-100 cursor-not-allowed" : ""}`}
                  />
                  {touched.email && errors.email && (
                    <p className="text-red-500 text-sm">{errors.email}</p>
                  )}
                </div>
                <div>
                  <label>Contraseña</label>
                  {googleData ? (
                    <p className="text-sm text-gray-500">No requerida al iniciar con Google</p>
                  ) : (
                    <>
                      <input
                        name="password"
                        type="password"
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="w-full border rounded p-2"
                      />
                      {touched.password && errors.password && (
                        <p className="text-red-500 text-sm">{errors.password}</p>
                      )}
                    </>
                  )}
                </div>
                <div className="flex flex-col items-center">
                  <p className="mt-2 text-center">O registrate con Google:</p>
                  <GoogleRegisterButton fillUpForm={handleFillUpForm} />
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label>Teléfono</label>
                  <input
                    type="text"
                    name="phone"
                    value={values.phone}
                    onChange={(e) =>
                      setFieldValue("phone", e.target.value === "" ? "" : Number(e.target.value))
                    }
                    onBlur={handleBlur}
                    className="w-full border rounded p-2"
                  />
                  {touched.phone && errors.phone && (
                    <p className="text-red-500 text-sm">{errors.phone}</p>
                  )}
                </div>
                <div>
                  <label>Documento</label>
                  <input
                    type="text"
                    name="document"
                    value={values.document}
                    onChange={(e) =>
                      setFieldValue("document", e.target.value === "" ? "" : Number(e.target.value))
                    }
                    onBlur={handleBlur}
                    className="w-full border rounded p-2"
                  />
                  {touched.document && errors.document && (
                    <p className="text-red-500 text-sm">{errors.document}</p>
                  )}
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label>Nombre Agencia</label>
                  <input
                    type="text"
                    name="agencyName"
                    value={values.agencyName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="w-full border rounded p-2"
                  />
                  {touched.agencyName && errors.agencyName && (
                    <p className="text-red-500 text-sm">{errors.agencyName}</p>
                  )}
                </div>
                <div>
                  <label>Descripción Agencia</label>
                  <input
                    type="text"
                    name="agencyDescription"
                    value={values.agencyDescription}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="w-full border rounded p-2"
                  />
                  {touched.agencyDescription && errors.agencyDescription && (
                    <p className="text-red-500 text-sm">{errors.agencyDescription}</p>
                  )}
                </div>
                <div className="md:col-span-2">
                  <label>URL (slug)</label>
                  <input
                    type="text"
                    name="slug"
                    value={values.slug}
                    readOnly
                    className="w-full border rounded p-2 bg-gray-100 cursor-not-allowed"
                  />
                </div>
              </div>
            )}

            <div className="flex justify-between w-full absolute bottom-10 left-0 px-8">
              {step > 1 && (
                <button
                  type="button"
                  onClick={() => setStep((prev) => prev - 1)}
                  className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 cursor-pointer"
                >
                  Volver
                </button>
              )}
              {step < 3 && (
                <button
                  type="button"
                  onClick={handleNext}
                  className="ml-auto px-4 py-2 bg-[#A62F55] text-white rounded hover:bg-[#922749] cursor-pointer"
                >
                  Siguiente
                </button>
              )}
              {step === 3 && (
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="ml-auto px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 cursor-pointer"
                >
                  Crear cuenta
                </button>
              )}
            </div>
          </form>
        );
      }}
    </Formik>
  );
};

export default FormRegister;
