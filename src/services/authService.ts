import apiService from "./apiService";
import RegisterUserDtoFront from "@/interfaces/registerDto";

type FormData = {
  email: string;
  password: string;
};

export const RegisterSubmit = async (data:  RegisterUserDtoFront) => {
    
    try {
        return await apiService.post("/auth/register", data)
    } catch (error) {
        console.error("Ocurrio un error al Realizar el Register",error);
    }


};

// cambie la ruta del Login para ver si funcionaba sacale el "auth/" si hace falta
export const loginService = async (data: FormData) => {
        try {
            return await apiService.post("/auth/login", data)
        } catch (e) {
            console.warn("error al hacer login", e);
        }
}