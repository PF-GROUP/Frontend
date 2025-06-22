import { getCookie } from "../../context/authContext";
import apiService from "./apiService";
import RegisterUserDtoFront from "../interfaces/registerDto";
;

type FormData = {
  email: string;
  password: string;
};

export const RegisterSubmit = async (data: RegisterUserDtoFront) => {
  try {
    const response = await apiService.post("/auth/register", data);
    return response; 
  } catch (error) {
    console.error("Ocurrió un error al realizar el Register:", error);
    throw error; // ✅ Re-lanzá el error para que lo capture el catch del componente
  }
};


export const loginService = async (data: FormData, SaveUserData: (data: {token: string }) => void) => {
        try {
             await apiService.post("/auth/login", data, true)
             const token = getCookie('token');
            SaveUserData({
                    token
                });
            return token
        } catch (e) {
            console.warn("error al hacer login", e);
        }
}