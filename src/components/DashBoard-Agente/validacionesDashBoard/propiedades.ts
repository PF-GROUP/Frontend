// Validaciónes:
import * as Yup from 'yup'

// Validación Subir propiedad:


export const validationSchema = Yup.object({
  nombre: Yup.string().required('Campo obligatorio'),
  tipoOperacion: Yup.string().required('Campo obligatorio'),
  tipoPropiedad: Yup.string().required('Campo obligatorio'),
  estatus: Yup.string().required('Campo obligatorio'),
  precio: Yup.number().typeError('Debe ser un número').positive('Debe ser positivo').required('Campo obligatorio'),
  metros: Yup.number().typeError('Debe ser un número').positive('Debe ser positivo').required('Campo obligatorio'),
  direccion: Yup.string().required('Campo obligatorio'),
  banos: Yup.number().typeError('Debe ser un número').integer('Debe ser entero').min(0).required('Campo obligatorio'),
  habitaciones: Yup.number().typeError('Debe ser un número').integer('Debe ser entero').min(0).required('Campo obligatorio'),
  descripcion: Yup.string().required('Campo obligatorio'),
})