import apiService from "./apiService";
import { IColores } from "../../interface/DashboardAgente/ColoresDTO";

export const editarColoresAgencia = async ( data: IColores, id:number ) => {
  try {
    const response = await apiService.patch(`/agencies/${id}/customization`, data);
    return response;
  } catch (error) {
    console.error("Ocurrió un error al realizar el Register:", error);
    throw error;
  }
};