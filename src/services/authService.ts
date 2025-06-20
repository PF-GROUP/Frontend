import { IUser } from "../../interface/User";
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
    export const loginService = async (data: FormData, SaveUserData: (data: { user: IUser }) => void) => {
  try {
    const user =  await apiService.post("/auth/login", data, true);
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
