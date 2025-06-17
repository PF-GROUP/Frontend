import { getCookie } from "../../context/authContext";
import apiService from "./apiService";
import RegisterUserDtoFront from "../interfaces/registerDto";
;

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