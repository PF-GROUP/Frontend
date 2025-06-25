// "use client";

// import { Upload } from "lucide-react";
// import { Formik } from "formik";
// import * as Yup from "yup";
// import toast from "react-hot-toast";
// import { SendArrayImages } from "@/services/subirPropiedad";

// interface UploadImageFormProps {
//   propertyId: string;
// }

// interface IUploadImageForm extends UploadImageFormProps {
// //     // IMPORTANTE SI ESTAS DEBUGUEANDO....
// //     En tu estado actual estás mandando file: File[] como está, pero Swagger espera "file": "string" (seguramente     una     imagen en base64 o una URL). Como ya me dijiste que todavía no querés transformar a base64, está ok por ahora. Pero esa parte tenés que ajustarla sí o sí antes de integrar con el backend.
//   file: File[]; // Pasar de tipo File a tipo Base64 si es que es necesario y asi lo pide el back
//   title: string;
//   description: string;
// }

// const validationSchema = Yup.object({
//   file: Yup.array()
//     .min(1, "Debe subir al menos una imagen")
//     .required("Campo requerido"),
//   title: Yup.string().required("El título es obligatorio"),
//   description: Yup.string().required("La descripción es obligatoria"),
// });

// const UploadImageForm = ({ propertyId }: UploadImageFormProps) => {

//     const handleSubmit = async (values: IUploadImageForm) => {
//     // CREAR EL HANDLE ON SUBMIT EN EL ARCHIVO subirPropiedades el que esta en el medio en las ventanas
//     try {
//         const postImages = {
//         ...values,
//         propertyId,
//         };

//         const response = await SendArrayImages(postImages);
//         console.log("🧾 Valores del formulario:", postImages);

//         if (response && response.success === true) {
//             toast.success("¡Propiedad Creada con Éxito!...", { duration: 2500 });
//             setTimeout(() => {}, 2000);
//         } else {
//             toast.error("Hubo un error al crear la propiedad.", { duration: 2000 });
//         }
//     } catch (error) {
//         console.warn("error", error);
//         toast.error("Hubo un problema al querer crear la propiedad.", {
//         duration: 2000,
//         });
//     }
//     };

//     return (
//     <div className="w-full p-4 md:p-6 lg:pt-0">
//     <Formik
//         initialValues={{
//             file: [],
//             title: "",
//             description: "",
//         }}
//         onSubmit={handleSubmit}
//         validationSchema={validationSchema}
//     >
//         {({
//             values,
//             errors,
//             touched,
//             handleChange,
//             handleBlur,
//             handleSubmit,
//             setFieldValue,
//         }) => (
//         <form onSubmit={handleSubmit} className="w-full">
//             <div className="flex flex-col items-start justify-start rounded-lg p-6 md:p-8 shadow-[1px_5px_8px_4px_rgba(0,0,0,0.2)] w-full space-y-6">
//                 <h2 className="text-2xl md:text-3xl font-bold text-[#230c89] w-full mb-2">
//                 Subir Imágenes y Detalles
//                 </h2>

//                   {/* Vista previa de imágenes */}
//                 <div className="w-full space-y-4 mt-7 ">
//                 <div className="border border-black p-4 bg-gray-400 min-h-[200px] shadow overflow-y-auto">
//                 {values.file && values.file.length > 0 ? (
//                     <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
//                     {values.file.map((image, index) => (
//                         <div key={index} className="relative group">
//                         <img
//                             src={URL.createObjectURL(image)}
//                             alt={`preview-${index}`}
//                             className="w-full h-28 object-cover rounded-sm border"
//                         />
//                         <button
//                             type="button"
//                             className="absolute top-1 right-1 bg-red-600 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition"
//                             onClick={() => {
//                             const newImages = values.file.filter(
//                                 (_, i) => i !== index
//                             );
//                             setFieldValue("file", newImages);
//                             }}
//                         >
//                             X
//                         </button>
//                         </div>
//                     ))}
//                     </div>
//                 ) : (
//                     <p className="text-white text-lg font-semibold text-center mt-11">
//                     Sube imágenes para esta propiedad
//                     </p>
//                 )}
//                 </div>

//                 <div className="flex justify-center mt-5 border-b pb-8 border-gray-400">
//                     <label
//                     htmlFor="file-upload"
//                     className="flex items-center gap-2 bg-blue-700 text-white font-semibold text-lg py-1 px-4 rounded-lg cursor-pointer"
//                     >
//                     <Upload size={22} />
//                     Selecciónar imagenes
//                     <input
//                         id="file-upload"
//                         type="file"
//                         accept="image/*"
//                         multiple
//                         className="hidden"
//                         onChange={(e) => {
//                         const files = e.currentTarget.files;
//                         if (files) {
//                         const newFiles = Array.from(files);
//                         setFieldValue("file", [...values.file, ...newFiles]);
//                     }
//                     }}
//                     onBlur={handleBlur}
//                     />
//                 </label>
//                 </div>

//                 {errors.file && touched.file && (
//                   <p className="text-red-600 text-sm mt-1">
//                     {errors.file as string}
//                   </p>
//                 )}
//               </div>

//               {/* Título */}
//               <div className="flex flex-col w-full">
//                 <label
//                   htmlFor="title"
//                   className="text-lg md:text-xl font-bold mb-1"
//                 >
//                   Título imagen
//                 </label>
//                 <input
//                   type="text"
//                   id="title"
//                   name="title"
//                   placeholder="Cocina Amplia"
//                   value={values.title}
//                   onChange={handleChange}
//                   onBlur={handleBlur}
//                   className={`border ${
//                     errors.title && touched.title
//                       ? "border-red-500"
//                       : "border-gray-400"
//                   } text-gray-800 rounded-lg p-2 shadow w-full`}
//                 />
//                 {errors.title && touched.title && (
//                   <p className="text-red-600 text-sm mt-1">{errors.title}</p>
//                 )}
//               </div>

//               {/* Descripción */}
//               <div className="flex flex-col w-full">
//                 <label
//                   htmlFor="description"
//                   className="text-lg md:text-xl font-bold mb-1"
//                 >
//                   Descripción imagen
//                 </label>
//                 <textarea
//                   id="description"
//                   name="description"
//                   placeholder="Cocina espaciosa y funcional, equipada con mesada de mármol auténtico y múltiples compartimentos para una óptima organización."
//                   value={values.description}
//                   onChange={handleChange}
//                   onBlur={handleBlur}
//                   className={`border ${
//                     errors.description && touched.description
//                       ? "border-red-500"
//                       : "border-gray-400"
//                   } text-gray-800 rounded-lg p-2 shadow w-full min-h-[100px]`}
//                 />
//                 {errors.description && touched.description && (
//                   <p className="text-red-600 text-sm mt-1">
//                     {errors.description}
//                   </p>
//                 )}
//               </div>

//               {/* ID Propiedad */}

//               {/* Botones */}
//               <div className="flex flex-col md:flex-row justify-between items-center w-full gap-4 pt-2">
//                 <button
//                   type="submit"
//                   className="text-white bg-blue-700 py-3 px-4 rounded-lg w-full md:w-[250px] text-lg"
//                 >
//                   Subir Imagen
//                 </button>
//                 <button
//                   type="button"
//                   className="text-white bg-red-600 py-3 px-4 text-lg rounded-lg w-full md:w-[200px]"
//                 >
//                   Cancelar
//                 </button>
//               </div>
//             </div>
//           </form>
//         )}
//       </Formik>
//     </div>
//   );
// };

// export default UploadImageForm;


"use client";

import { useState } from "react";
import { Upload } from "lucide-react";
import toast from "react-hot-toast";
import { SendArrayImages } from "@/services/subirPropiedad";

interface UploadImageFormProps {
  propertyId: string;
}

interface ImageData {
  file: File;
  base64: string;
  title: string;
  description: string;
}

const UploadImageForm = ({ propertyId }: UploadImageFormProps) => {
  const [images, setImages] = useState<ImageData[]>([]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const filesArray = Array.from(files);

      const newImages = await Promise.all(
        filesArray.map(async (file) => {
          const base64 = await toBase64(file);
          return { file, base64, title: "", description: "" };
        })
      );

      setImages((prev) => [...prev, ...newImages]);
    }
  };

  const handleTitleChange = (index: number, value: string) => {
    const updated = [...images];
    updated[index].title = value;
    setImages(updated);
  };

  const handleDescriptionChange = (index: number, value: string) => {
    const updated = [...images];
    updated[index].description = value;
    setImages(updated);
  };

  const removeImage = (index: number) => {
    const updated = images.filter((_, i) => i !== index);
    setImages(updated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (images.length === 0) {
      toast.error("Debes subir al menos una imagen.");
      return;
    }

    const isAnyEmpty = images.some((img) => !img.title || !img.description);
    if (isAnyEmpty) {
      toast.error("Todos los campos de título y descripción son obligatorios.");
      return;
    }

    try {
      const formattedData = images.map((img) => ({
        file: img.base64,
        title: img.title,
        description: img.description,
        propertyId,
      }));

      const response = await SendArrayImages(formattedData);

      if (response && response.success === true) {
        toast.success("¡Imágenes subidas con éxito!");
        setImages([]);
      } else {
        toast.error("Error al subir las imágenes.");
      }
    } catch (err) {
        console.log(err);
        
      toast.error("Ocurrió un error inesperado.");
    }
  };

  const toBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
    });
  };

  return (
    <div className="w-full p-4 md:p-6 md:pl-0 lg:pt-0">
      <form onSubmit={handleSubmit} className="w-full">
        <div className="flex flex-col items-start justify-start rounded-lg p-6 md:p-8 shadow-[1px_5px_8px_4px_rgba(0,0,0,0.2)] w-full space-y-6">
          <h2 className="text-2xl md:text-3xl font-bold text-[#230c89] w-full mb-2">
            Subir Imágenes y Detalles
          </h2>

          <div className="w-full space-y-4 mt-7">
            <div className="border border-black p-4 bg-gray-400 min-h-[300px] shadow overflow-y-auto">
              {images.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {images.map((img, index) => (
                    <div key={index} className="bg-gray-200 p-3 rounded-md relative">
                      <img
                        src={URL.createObjectURL(img.file)}
                        alt={`preview-${index}`}
                        className="w-full h-40 object-cover rounded-sm border mb-3"
                      />
                      <input
                        type="text"
                        placeholder="Título"
                        value={img.title}
                        onChange={(e) => handleTitleChange(index, e.target.value)}
                        className="w-full mb-2 bg-white border p-1 rounded text-sm"
                      />
                      <textarea
                        placeholder="Descripción"
                        value={img.description}
                        onChange={(e) => handleDescriptionChange(index, e.target.value)}
                        className="w-full border p-1 bg-white rounded text-sm min-h-[60px]"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-1 right-1 bg-red-600 text-white text-xs px-2 py-1 rounded"
                      >
                        X
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-white text-lg font-semibold text-center mt-11">
                  Sube imágenes para esta propiedad
                </p>
              )}
            </div>

            <div className="flex justify-center mt-5 border-b pb-8 border-gray-400">
              <label
                htmlFor="file-upload"
                className="flex items-center gap-2 bg-blue-700 text-white font-semibold text-lg py-1 px-4 rounded-lg cursor-pointer"
              >
                <Upload size={22} /> Seleccionar imágenes
                <input
                  id="file-upload"
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={handleFileChange}
                />
              </label>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center w-full gap-4 pt-2">
            <button
              type="submit"
              className="text-white bg-blue-700 py-3 px-4 rounded-lg w-full md:w-[250px] text-lg"
            >
              Subir imágenes
            </button>
            <button
              type="button"
              onClick={() => setImages([])}
              className="text-white bg-red-600 py-3 px-4 text-lg rounded-lg w-full md:w-[200px]"
            >
              Cancelar
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UploadImageForm;
