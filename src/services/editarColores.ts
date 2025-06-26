import apiService from "./apiService";
import { IColores } from "../../interface/DashboardAgente/ColoresDTO";

export const editarColoresAgencia = async ( data: IColores) => {
  try {
    const response = await apiService.patch(`/agencies/1/customization`, data);
    return response;
  } catch (error) {
    console.error("Ocurrió un error al realizar el Register:", error);
    throw error;
  }
};