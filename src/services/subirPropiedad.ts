import apiService from "./apiService";
import { IPropertyForm } from "../../interface/DashboardAgente/subirPropiedadDTO";


export const CreateProperty = async (data: IPropertyForm ) => {
    try {
    const response = await apiService.post("/property", data);
    return response; 
    } catch (error) {
    console.error("Ocurrió un error al Crear la Propiedad:", error);
    throw error; // ✅ Re-lanzá el error para que lo capture el catch del componente
    }
};


// ✅ Esta es la estructura correcta ahora
interface IUploadImageForm {
  file: string; // ← URL de Cloudinary
  title: string;
  description: string;
  propertyId: string;
}

export const SendArrayImages = async (data: IUploadImageForm) => {
  try {
    const response = await apiService.post("/images", data);
    return response;
  } catch (error) {
    console.error("Ocurrió un error al enviar las imágenes:", error);
    throw error;
  }
};

export const uploadImageToServer = async (file: File) => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    // El readme decía que el endpoint pide un query param "folder" obligatorio, ponelo si lo tenés (ej: "properties")
    const folder = "properties"; // Cambiá esto según convenga

    const response = await fetch(`/upload/image?folder=${folder}`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Error al subir la imagen al backend");
    }

    const data = await response.json();

    // data debe tener algo así como { secure_url: string, ... }
    if (!data.secure_url) {
      throw new Error("No se recibió URL segura desde el backend");
    }

    return data;
  } catch (error) {
    console.error("Error en uploadImageToServer:", error);
    throw error;
  }
};