import axios from "axios";

const BASE_URL = "https://clasificador-tumores.onrender.com/";

export async function clasificarImagen(imageUri) {
  const formData = new FormData();

  // Extraer nombre y extension del URI
  const filename = imageUri.split("/").pop();
  const ext = filename.split(".").pop();
  const mimeType = ext === "png" ? "image/png" : "image/jpeg";

  formData.append("image", {
    uri: imageUri,
    name: filename,
    type: mimeType,
  });

  try {
    const response = await axios.post(`${BASE_URL}/api/clasificar`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      timeout: 30000,
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(`Error del servidor: ${error.response.status}`);
    } else if (error.request) {
      throw new Error("No se pudo conectar con el servidor");
    }
    throw error;
  }
}
