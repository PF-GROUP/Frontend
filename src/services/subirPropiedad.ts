import apiService from "./apiService";
import { IPropertyForm } from "../../interface/DashboardAgente/subirPropiedadDTO";


export const CreateProperty = async (data: IPropertyForm ) => {
    try {
    const response = await apiService.post("/property", data);
    return response; 
    } catch (error) {
    console.error("Ocurrió un error al realizar el Register:", error);
    throw error; // ✅ Re-lanzá el error para que lo capture el catch del componente
    }
};