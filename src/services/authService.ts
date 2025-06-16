import { getCookie } from "../../context/authContext";
import apiService from "./apiService";
import RegisterUserDtoFront from "@/interfaces/registerDto";
;

export const RegisterSubmit = async (data:  RegisterUserDtoFront) => {
    
    try {
        return await apiService.post("/register", data)
    } catch (error) {
        console.error("Ocurrio un error al Realizar el Register",error);
    }
};  
    export const loginService = async (data: FormData, SaveUserData: (data: {token: string }) => void) => {
        try {
             await apiService.post("/login", data, true)
             const token = getCookie('token');
            SaveUserData({
                    token
                });
            return token
        } catch (e) {
            console.warn("error al hacer login", e);
        }
}