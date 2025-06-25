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


// crear el endpoint para enviar las imagenes a una propiedad
interface IUploadImageForm {
  file: File[];
  title: string;
  description: string;
  propertyId: string
}

export const SendArrayImages = async (data: IUploadImageForm ) => {
    try {
    const response = await apiService.post("/images", data);
    return response; 
    } catch (error) {
    console.error("Ocurrió un error al enviar las imagenes:", error);
    throw error; // ✅ Re-lanzá el error para que lo capture el catch del componente
    }
};
