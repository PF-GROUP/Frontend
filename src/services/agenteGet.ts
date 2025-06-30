import apiService from "./apiService";



export const getAgente = async (id:string) => {
  try {
    const response = await apiService.get(`/user/${id}`);
    return response;
  } catch (error) {
    console.error("Ocurrió un error al realizar el Register:", error);
    throw error;
  }
};