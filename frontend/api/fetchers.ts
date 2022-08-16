import { Gallery } from './types'

const API_BASE = "http://localhost:8000"

export async function getGalleries(): Promise<Gallery[]> {
  return fetch(`${API_BASE}/galleries`)
    .then((res) => res.ok && res.headers.get("Content-Type") === "application/json"
      ? res.json().then((j) => j.map((g: Record<any, any>) => ((
        {
          uuid: g["uuid"] || "",
          name: g["name"] || "",
          numItems: g["num_items"] || 0,
          coverImage: g["cover_image"] || "",
        }))))
      : Promise.reject(res)
    )
}
