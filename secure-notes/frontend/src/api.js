import axios from "axios"; // Solicitudes HTTP
import { ACCESS_TOKEN } from "./constants";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, //Variable del entorno de VITE
});

// interceptores de solicitudes salientes
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(ACCESS_TOKEN); //Obtener el token de acceso almacenado en el navegador
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; //Modificación de la configuración de la solicitud HTTP interceptada.
      // Si el token de acceso existe (no es null o undefined), se agrega un nuevo encabezado Authorization a headers de la configuracion de la solicitud.
      // El valor del encabezado es 'Bearer ${token}' (autenticación Bearer)
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;

/*
Promise: es un objeto en JavaScript que representa la eventual finalización (o falla) de una operación asíncrona y su valor resultante.
*/
