// Validaciones:
import * as Yup from "yup";


// Validaciones Cambiar Colores:
export const colorValidation = /^#([0-9A-F]{3}){1,2}$/i;

export const colorValidationSchema = Yup.object().shape({
  bgColor: Yup.string()
    .required("El color de fondo es obligatorio")
    .matches(colorValidation, "Color inválido"),
  textColor: Yup.string()
    .required("El color del texto es obligatorio")
    .matches(colorValidation, "Color inválido"),
  buttonColor: Yup.string()
    .required("El color del botón es obligatorio")
    .matches(colorValidation, "Color inválido"),
  linkColor: Yup.string()
    .required("El color del link es obligatorio")
    .matches(colorValidation, "Color inválido"),
  navbarColor: Yup.string()
    .required("El color de la navbar es obligatorio")
    .matches(colorValidation, "Color inválido"),
});

// Validacion Editar titulo y descipción:
export const tituloValidations = Yup.object().shape({
  titulo: Yup.string()
    .required("El título es obligatorio")
    .min(3, "Debe tener al menos 3 caracteres")
    .max(60, "No debe superar los 60 caracteres"),
  descripcion: Yup.string()
    .required("La descripción es obligatoria")
    .min(10, "Debe tener al menos 10 caracteres")
    .max(300, "No debe superar los 300 caracteres"),
});