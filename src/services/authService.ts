import { IUser } from "../../interface/User";
import apiService from "./apiService";
import RegisterUserDtoFront from "@/interfaces/registerDto";
;

type FormData = {
  email: string;
  password: string;
};

export const RegisterSubmit = async (data:  RegisterUserDtoFront, SaveUserData: (data: { user: IUser }) => void) => {

    try {
        const res =  await apiService.post("/auth/createBoth", data)
        console.log("res", res)
        const user = await apiService.post("/auth/login", {email: data.email, password: data.password}, true);
        console.log("user", user)
        if (!user){
          return null;
        }
        SaveUserData({ user });
        return res
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