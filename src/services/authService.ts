import { getCookie } from "../../context/authContext";
import apiService from "./apiService";
import RegisterUserDtoFront from "@/interfaces/registerDto";
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
    export const loginService = async (data: FormData, SaveUserData: (data: { token: string }) => void) => {
  try {
     await apiService.post("/auth/login", data, true);
    const token = getCookie("token");
    
    if (token) {
      console.log("Token obtenido:", token);
      SaveUserData({ token });
      return token;
    } else {
      console.warn("La cookie 'token' no se encontró después de 3 intentos");
      return null;
    }
  } catch (e) {
    console.error("Error al hacer login:", e);
    return null;
  }
}
export const tokenSigninService = async (tokenGoogle:string, SaveUserData: (data: { token: string }) => void) => {
  try {
     await apiService.post("/auth/login/tokenSignin", {token:tokenGoogle}, true);
    const token = getCookie("token");
    
    if (token) {
      console.log("Token obtenido:", token);
      SaveUserData({ token });
      return token;
    } else {
      console.warn("La cookie 'token' no se encontró después de 3 intentos");
      return null;
    }
  } catch (e) {
    console.error("Error al hacer login:", e);
    return null;
  }
}
