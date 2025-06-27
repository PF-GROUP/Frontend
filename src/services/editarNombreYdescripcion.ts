import apiService from "./apiService";
import { IEditarNombreYdescAgency } from "../../interface/DashboardAgente/EditarNombreYDescp";

export const editarAgencia = async ( data: IEditarNombreYdescAgency, id:number) => {
  try {
    const response = await apiService.patch(`/agency/${id}`, data);
    return response;
  } catch (error) {
    console.error("Ocurrió un error al realizar el Register:", error);
    throw error;
  }
};