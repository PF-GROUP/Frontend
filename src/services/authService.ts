import { IUser } from "../../interface/User";
import apiService from "./apiService";
import RegisterUserDtoFront from "@/interfaces/registerDto";
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
    export const loginService = async (data: FormData, SaveUserData: (data: { token: string }) => void) => {
  try {
    const user =  await apiService.post("/auth/login", data, true);
    if (!user){
      return null;
    }
    SaveUserData(user);
    return user;
    
  } catch (e) {
    console.error("Error al hacer login:", e);
    return null;
  }
}
export const tokenSigninService = async (tokenGoogle:string, SaveUserData: (data: { user: IUser }) => void) => {
  try {
    const user = await apiService.post("/auth/login/tokenSignin", {token:tokenGoogle}, true);
    console.log(user);
    if (!user){
      return null;
    }
    SaveUserData({ user });
    return user;
  } catch (e) {
    console.error("Error al hacer login:", e);
    return null;
  }
}
