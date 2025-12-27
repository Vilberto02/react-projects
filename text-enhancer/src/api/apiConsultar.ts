import { baseURL } from "./api"

export const postText = async (texto: string) => {

  const res = await fetch(`${baseURL}/consultar/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ texto }),
  });

  return await res.json();
}