"use client";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useAuthContext } from '../../../context/authContext';
import { loginService } from "../../service/auth"
import Image from 'next/image';
const schema = yup.object().shape({
  email: yup.string().email('Email inválido').required('El email es obligatorio'),
  password: yup.string().min(6, 'La contraseña debe tener al menos 6 caracteres').required('La contraseña es obligatoria'),
});

type FormData = {
  email: string;
  password: string;
};


export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  // const { SaveUserData } = useAuthContext();

  const onSubmit = async (data: FormData) => {
    console.log(data)
    try {
      const resultado = await loginService(data);

      // SaveUserData({
      //   user: resultado.user,
      //   token: resultado.token,
      // });
      console.log(resultado)
      setTimeout(() => {
          location.href = '/home';

      }, 2000)
    
    } catch (error) {
      console.error('Error enviando datos:', error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[url('/RegisterImg.png')] bg-cover bg-center px-2">
  <div className="bg-white border border-gray-600 p-4 md:p-8 rounded shadow-md w-full max-w-xs md:max-w-md mx-auto">
    <div className="flex flex-col items-center mb-6">
      <Image src="/iconoKasapp.png" alt="Logo" width={80} height={80} className="w-[80px] h-[80px] md:w-[120px] md:h-[120px]" />
      <h2 className="text-lg md:text-2xl font-bold text-gray-900">Iniciar sesión</h2>
    </div>

    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-4 w-full">
      <div>
        <label className="mt-4 text-black text-base md:text-xl">Email</label>
        <input
          type="email"
          placeholder="EmailExample@gmail.com"
          {...register('email')}

          className="w-full px-3 py-2 border text-black border-gray-400 rounded text-sm "
        />
        {errors.email && (
          <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label className="mt-4 text-black text-base md:text-xl">Contraseña</label>
        <input
          type="password"
          {...register('password')}
          placeholder="●●●●●●●●●●●"
          className="w-full px-3 py-2 border text-black border-gray-400 rounded text-sm"
        />
        {errors.password && (
          <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
        )}
      </div>

      <button
        type="submit"
        className=" w-full  text-white bg-[#a62f55] rounded-sm text-base md:text-xl py-1 mt-4 hover:bg-[#65383a] transition duration-300"
      >
        Inicia sesión
      </button>
    </form>
  </div>
</div>
  );
}