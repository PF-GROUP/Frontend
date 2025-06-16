import axios from "axios"
import dotenv from 'dotenv';
dotenv.config();
// const API_URL = process.env.NEXT_PUBLIC_API_URL;
const API_URL = "http://191.235.34.31:3000";
const axiosApiBack = axios.create({ baseURL: API_URL });

interface IformInput {
    name: string;
    surname: string;
    email: string;
    password: string;
    address: string;
    phone: string;
}

export const postRegister = async (data: IformInput) => {
    try {
        const res = await axiosApiBack.post('/auth/register', data)

        return res.data
    } catch (e) {
        console.warn("error al registrar el user", e);
    }
}

interface formData {
    email: string;
    password: string;
}

export const loginService = async (data: formData) => {
    try {
        const res = await axiosApiBack.post('/auth/login', data, {
            withCredentials:true
        });
        return res.data;
    } catch (e) {
        console.warn("error al hacer login", e);
        throw e;
    }
};
