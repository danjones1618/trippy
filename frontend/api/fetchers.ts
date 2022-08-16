import { Gallery, Photo } from './types'

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


export async function getGalleryPhotos(galleryUUID: string): Promise<Photo[]> {
  return fetch(`${API_BASE}/gallery/${galleryUUID}`)
    .then((res) => res.ok && res.headers.get("Content-Type") === "application/json"
      ? res.json().then((j) => j.map((g: Record<any, any>) => ((
        {
          uuid: g["uuid"] || "",
          timestamp: g["timestamp"] || "",
        }))))
      : Promise.reject(res)
    )
}

export async function uploadFiles(galleryUUID: string, files: File[]) {
  const formData = new FormData();
  for (const f of files) {
    formData.append("files", f);
  }

  return fetch(`${API_BASE}/gallery/${galleryUUID}`, {
    method: 'POST',
    body: formData,
  });
}
