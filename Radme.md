.Para abrir correctamente por favor apretar click derecho el Readme.md y luego seleccionar Open Preview.


# Integración de la API: Subida de Foto de Perfil de Usuario

Este documento detalla los requisitos para la integración del endpoint de subida/actualización de foto de perfil de usuario.

## 1. Endpoint

**Método HTTP:** `POST`
**URL:** `/users/:id/profile-picture`

## 2. Descripción

Este endpoint permite subir o actualizar la foto de perfil de un usuario específico. La imagen recibida se sube a Cloudinary y su URL resultante se guarda directamente en el campo `profilePictureUrl` de la entidad `User` en la base de datos, asociándola al usuario cuyo `ID` se proporciona en la URL.

## 3. Detalles de la Solicitud (Qué debe enviar el Frontend)

Para que el backend procese la solicitud correctamente, el frontend debe construir la petición de la siguiente manera:

### 3.1. URL de la Petición

* La URL debe incluir el `id` (UUID) del usuario al que se le asignará la foto de perfil.
* **Ejemplo:**
    ```
    [https://tu-dominio-backend.com/users/c1a2b3d4-e5f6-7890-1234-567890abcdef/profile-picture](https://tu-dominio-backend.com/users/c1a2b3d4-e5f6-7890-1234-567890abcdef/profile-picture)
    ```
    *(**Nota:** Reemplazar `c1a2b3d4-e5f6-7890-1234-567890abcdef` con el UUID real del usuario al que se le actualizará la foto.)*

### 3.2. Tipo de Contenido (`Content-Type` Header)

* Debe ser **`multipart/form-data`**. Esto es fundamental porque se está enviando un archivo binario.
* **Importante:** Cuando se utiliza el objeto `FormData` en JavaScript, el navegador o la librería de cliente se encarga automáticamente de establecer el `Content-Type` correcto (`multipart/form-data` con su `boundary`), por lo que **no es necesario configurarlo manualmente** en los headers de la petición si se usa `FormData`.

### 3.3. Cuerpo de la Solicitud (`Body`)

* El cuerpo de la solicitud debe ser un objeto **`FormData`**.
* Este `FormData` debe contener **un único campo de archivo** (la imagen) con la clave (nombre del campo) **`file`**.
* **Ejemplo en JavaScript:**
    ```javascript
    const formData = new FormData();
    // 'archivoDeImagenSeleccionado' sería un objeto 'File' obtenido de un <input type="file">
    formData.append('file', archivoDeImagenSeleccionado);
    ```
* El nombre del campo `file` es **crítico**, ya que el backend lo espera así (está configurado con `FileInterceptor('file')`).

### 3.4. Autenticación (Manejo de Cookies)

* Dado que la autenticación se maneja a través de cookies de sesión/autenticación, la solicitud del frontend **debe incluir estas cookies** que el navegador ya tiene para nuestro dominio.
* **Si se utiliza `fetch` en JavaScript:**
    Es esencial incluir la opción `credentials: 'include'` en la configuración de la solicitud para asegurar que el navegador adjunte las cookies existentes al dominio del backend.
    ```javascript
    fetch(url, {
        method: 'POST',
        body: formData,
        credentials: 'include' // <--- Clave para que el navegador envíe las cookies de autenticación
    });
    ```
* Si el usuario ya ha iniciado sesión previamente en el mismo dominio (o un subdominio compatible), el navegador se encargará de gestionar y enviar las cookies automáticamente con la configuración `credentials: 'include'`.

## 4. Respuestas del Backend

### 4.1. Respuesta Exitosa

* **Status Code:** `200 OK`
* **Cuerpo de la respuesta (JSON):**
    ```json
    {
      "message": "Foto de perfil actualizada exitosamente",
      "profilePictureUrl": "url_completa_de_la_imagen_en_cloudinary.jpg"
    }
    ```