import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import api from "../api";
import { REFRESH_TOKEN, ACCESS_TOKEN } from "../constants";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";

function ProtectedRoute({ children }) {
  const [isAuthorized, setIsAuthorized] = useState(null);

  // Verifica si el usuario esta autorizado.
  // En caso de que haya errores en auth, entonces, se coloca a isAuthorized como falso.
  // true-> autorizado. false -> no autorizado. null -> en proceso
  useEffect(() => {
    auth().catch(() => setIsAuthorized(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Refresca el token de acceso mediante el token de actualizacion (REFRESH_TOKEN)
  const refreshToken = async () => {
    const refreshToken = localStorage.getItem(REFRESH_TOKEN);

    try {
      const res = await api.post("/api/token/refresh/", {
        // Envia una solicitud al backend para obtener un nuevo token de acceso
        refresh: refreshToken,
      });

      if (res.status == 200) {
        // solicitud de actualización exitosa
        localStorage.setItem(ACCESS_TOKEN, res.data.access); // se almacena el nuevo token
        setIsAuthorized(true);
      } else {
        setIsAuthorized(false);
      }
    } catch (error) {
      console.log(error);
      setIsAuthorized(false);
    }
  };

  /* Si el inicio de sesión ha caducado o si no esta autorizado*/
  const auth = async () => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (!token) {
      // Si el token no se encuentra en el almacenamiento local, entonces, se actualiza a setAutorized y se sale de la funcion asincrona
      setIsAuthorized(false);
      return;
    }

    const decoded = jwtDecode(token); // Decodifica el token
    const tokenExpiration = decoded.exp; // Obtiene el tiempo de expiracion del token
    const now = Date.now() / 1000; // Convierte el tiempo actual de milisegundos a segundos

    /*
    TokenExpiration -> fecha de vencimiento en formato unix, que mide en segundos
    now -> fecha actual de la consulta que se convierte en segundos, dado que estaba en milisegundos
    */

    if (tokenExpiration < now) {
      // Si el tiempo de expiraciion es menor al tiempo actual, entonces el token a expirado
      await refreshToken(); // Intenta actualizar el token. Pausa la ejecucion de la funcion hasta que se obtenga un nuevo token antes de decidir si el usuario esta autorizado o no
    } else {
      setIsAuthorized(true); // Si el token no ha expirado, entonces establece a setAuthorized en true
    }
  };

  if (isAuthorized === null) {
    return <div>Loading ...</div>;
  }

  return isAuthorized ? children : <Navigate to="/login" />; // Redirige hacia a otra pagina si no esta autorizado
}

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired, // Es una propiedad que es obligatoria, si no se cumple, React mostrará una advertencia en la consola.
};

/*
PropTypes: Biblioteca de React que valida que los componentes reciban el tipo correcto de datos y evita errores

*/

export default ProtectedRoute;
