import * as Yup from 'yup';


const registerValidations = Yup.object().shape({
    name: Yup.string()
    .required('El nombre es obligatorio')
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(50, 'El nombre no debe superar los 50 caracteres'),
    
    surname: Yup.string()
    .required('El apellido es obligatorio')
    .min(2, 'El apellido debe tener al menos 2 caracteres')
    .max(50, 'El apellido no debe superar los 50 caracteres'),
    
    phone: Yup.number()
    .typeError('El teléfono debe ser un número')
    .required('El teléfono es obligatorio')
    .min(8, 'El Número debe tener al menos 8 caracteres')
    .max(10, 'El Número no debe superar los 10 caracteres'),
    
    email: Yup.string()
    .required('El correo es obligatorio')
    .email('Debe ser un correo válido'),
    
    password: Yup.string()
    .required('La contraseña es obligatoria')
    .min(8, 'La contraseña debe tener al menos 8 caracteres')
    .max(100, 'La contraseña no debe superar los 100 caracteres')
    .matches(/[a-z]/, 'La contraseña debe tener al menos una letra minúscula')
    .matches(/[A-Z]/, 'La contraseña debe tener al menos una letra mayúscula')
    .matches(/\d/, 'La contraseña debe tener al menos un número')
    .matches(/[@$!%*?&#]/, 'La contraseña debe tener al menos un carácter especial')
});

export default registerValidations