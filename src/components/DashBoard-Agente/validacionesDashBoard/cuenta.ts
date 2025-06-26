import * as Yup from "yup";
// Validaciones:



// Validaciónes de Cambiar Contraseña
export const validationCambiarContraseña = Yup.object({
    currentPassword: Yup.string().required("Requerido"),
    newPassword: Yup.string().required("Requerido"),
    confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword"), ], "Las contraseñas no coinciden")
    .required("Requerido"),
});

