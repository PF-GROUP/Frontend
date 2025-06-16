import axios from "axios";
import RegisterUserDtoFront from "@/interfaces/registerDto";

// CAMBIAR LA URL DEL REGISTER CUANDO TERMINE EL BACKEND
const axiosRegisterPost = axios.create({
    // baseURL: process.env.NEXT_PUBLIC_POST_CREDENCIALES_BACK
    baseURL: "http://191.235.34.31:3001/auth"
})

export const RegisterSubmit = async (data:  RegisterUserDtoFront) => {
    try {
        const PostRegister = await axiosRegisterPost.post("/register", data)
        return PostRegister
    } catch (error) {
        console.error("Ocurrio un error al Realizar el Register",error);
    }
}