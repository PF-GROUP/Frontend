import apiService from "./apiService";
import RegisterUserDtoFront from "@/interfaces/registerDto";

export const RegisterSubmit = async (data:  RegisterUserDtoFront) => {
    
    try {
        return await apiService.post("/register", data)
    } catch (error) {
        console.error("Ocurrio un error al Realizar el Register",error);
    }
};
    export const loginService = async (data: FormData) => {
        try {
            return await apiService.post("/login", data, true)
        } catch (e) {
            console.warn("error al hacer login", e);
        }
}