import apiService from "./apiService";


export const getAllAgencies = async () => {
  try {
    const response = await apiService.get("/agency", true );
    return response;
  } catch (error) {
    console.error("Error al obtener agencias:", error);
    return null;
  }
};


