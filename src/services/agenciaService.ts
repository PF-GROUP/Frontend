import axios from "axios";

const axiosRes = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "/api",
});

export const getAllAgencies = async () => {
  try {
    const response = await axiosRes.get("/agency");
    return response.data;
  } catch (error) {
    console.error("Error al obtener agencias:", error);
    return null;
  }
};

