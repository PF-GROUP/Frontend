import apiService from "./apiService";

export const deleteAgency = async (id: number) => {
  try {
    const response = await apiService.del(`/agency/${id}`, true);
    return response;
  } catch (error) {
    console.error("Error al eliminar agencia:", error);
    return null;
  }
};

export const softDeleteAgency = async (id: number) => {
  try {
    const response = await apiService.del(`/agency/soft/${id}`, true);
    return response;
  } catch (error) {
    console.error("Error al suspender agencia:", error);
    return null;
  }
}

export const postMaillerAll = async (subject: string = "", text: string = "") => {
  try {
    const encodedSubject = encodeURIComponent(subject);
    const encodedText = encodeURIComponent(text);

    const response = await apiService.post(
      `/mailer/all/${encodedSubject}/${encodedText}`, true
    );

    return response;
  } catch (error) {
    console.error("Error al enviar el mail:", error);
    return null;
  }
};

export const getPagos = async () => {
  try {
    const response = await apiService.get(`/stripe`, true);
    return response;
  } catch (error) {
    console.error("Error al obtener pagos:", error);
    return null;
  }
};


