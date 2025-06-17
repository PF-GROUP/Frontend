"use client"

import React from "react";
import { RegisterSubmit } from "@/services/authService";
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import registerValidations from "@/components/FormRegister/registerValidations";
import { Formik } from "formik";
import RegisterUserDtoFront from "../../../interfaces/registerDto";
import Image from "next/image";

const FormRegister: React.FC = () => {
    const router = useRouter();
    const handleOnSubmit = async (values: RegisterUserDtoFront) => {
        console.log(values);
        try {
            const response = await RegisterSubmit(values);
            console.log("respuesta de entrada: ", response);
            if (response?.success === true) {
                toast.success('¡Usuario registrado! Redirigiendo al Login...', { duration: 2500 });
                setTimeout(() => {
                    router.push('/login');
                }, 2000);
                return;
            } else {
                console.log("mensaje de error else: ", response);
                
                toast.error('Dato repetido. Ingresa un valor distinto en Email.', { duration: 2000 });
            }
        } catch (error) {
            console.log("mensaje de error catch: ",error);

            toast.error('Hubo un problema al querer registrarse.', { duration: 2000 });
            console.log('error en el register:', error);
        }
    };

    return (
        <>
            <Formik
                initialValues={{ name: "", surname: "", phone:"" , email: '', password: '' }}
                validationSchema={registerValidations}
                onSubmit={handleOnSubmit}
            >
                {({ isSubmitting, values, handleBlur, handleChange, handleSubmit, errors, touched }) => (
                    <form
                        onSubmit={handleSubmit}
                        className="
                            flex flex-col items-center justify-center 
                            text-black bg-[#ffffff] border-[#4e4b4b] border overflow-hidden rounded-sm p-8 m-5 
                            w-full max-w-[90%]
                            md:w-[450px] md:max-w-none md:m-11">
                        <Image 
                            src="/logoKasapp.png" 
                            width={300} 
                            height={200} 
                            alt="logoDeKasapp"
                            className="w-[100px] h-[60px] md:w-[145px] md:h-[95px] "
                        />

                        <h2 className="font-bold text-2xl md:text-3xl mt-4">Crear una cuenta</h2>

                        <div className="flex flex-col w-full m-1">
                            <label htmlFor="name" className="mt-4 text-black text-base md:text-xl">Nombre</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                placeholder="JhonDoe"
                                value={values.name}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                className="text-black outline-none bg-white border  border-[#4e4b4b] rounded-sm p-2 focus:border-[#a0a0a0]"
                            />
                            <p className="text-sm md:text-lg text-red-500 mb-2">{errors.name && touched.name && errors.name}</p>
                        </div>

                        <div className="flex flex-col w-full m-1">
                            <label htmlFor="surname" className="text-black text-base md:text-xl">Apellido</label>
                            <input
                                type="text"
                                id="surname"
                                name="surname"
                                placeholder="Diaz"
                                value={values.surname}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                className="text-black outline-none bg-white border border-[#4e4b4b] rounded-sm p-2 focus:border-[#a0a0a0]"
                            />
                            <p className="text-sm md:text-lg text-red-500 mb-2">{errors.surname && touched.surname && errors.surname}</p>
                        </div>

                        <div className="flex flex-col w-full m-1">
                            <label htmlFor="phone" className="text-black text-base md:text-xl">Teléfono</label>
                            <input
                                type="text"
                                id="phone"
                                name="phone"
                                placeholder="3515097178"
                                value={values.phone}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                className="text-black outline-none bg-white border border-[#4e4b4b] rounded-sm p-2 focus:border-[#a0a0a0]"
                            />
                            <p className="text-sm md:text-lg text-red-500 mb-2">{errors.phone && touched.phone && errors.phone}</p>
                        </div>

                        <div className="flex flex-col w-full m-1">
                            <label htmlFor="email" className="text-black text-base md:text-xl">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="EmailExample@gmail.com"
                                value={values.email}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                className="text-black outline-none bg-white border border-[#4e4b4b] rounded-sm p-2 focus:border-[#a0a0a0]"
                            />
                            <p className="text-sm md:text-lg text-red-500 mb-2">{errors.email && touched.email && errors.email}</p>
                        </div>

                        <div className="flex flex-col w-full m-1">
                            <label htmlFor="password" className="text-black text-base md:text-xl">Contraseña</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                placeholder="●●●●●●●●●●●"
                                value={values.password}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                className="text-black outline-none bg-white border border-[#4e4b4b] rounded-sm p-2 focus:border-[#a0a0a0]"
                            />
                            <p className="text-sm md:text-lg text-red-500 mb-2">{errors.password && touched.password && errors.password}</p>
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="
                                w-full  text-white bg-[#a62f55] rounded-sm text-base md:text-xl py-1 mt-4 hover:bg-[#65383a] transition duration-300
                            "
                        >
                            Crear cuenta
                        </button>
                    </form>
                )}
            </Formik>
        </>
    )
};

export default FormRegister;
