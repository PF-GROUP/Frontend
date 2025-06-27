import axios from "axios"

const axiosRes = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || "/api" ,
})

const get = async (url:string,credentials:boolean = false) =>{
    try {
        const res = await axiosRes.get(url, {withCredentials:credentials})
        return res.data
    } catch (error) {
        console.log(error)
    }
}

const post = async (url:string, data:unknown, credentials:boolean = false) => {
    try {
        const res = await axiosRes.post(url, data, {withCredentials:credentials})
        return res.data
    } catch (error) {
        console.log(error)
    }
}

const put = async (url:string, data:unknown) => {
    try {
        const res = await axiosRes.put(url, data)
        return res.data
    } catch (error) {
        console.log(error)
    }
}

const del = async (url:string,  credentials:boolean = false) => {
    try {
        const res = await axiosRes.delete(url, {withCredentials:credentials})
        return res.data
    } catch (error) {
        console.log(error)
    }
}

const patch = async (url:string, data:unknown) => {
    try {
        const res = await axiosRes.patch(url, data)
        return res.data
    } catch (error) {
        console.log(error)
    }
}

const apiService = {
    get,
    post,
    put,
    del,
    patch
}
export default apiService