import { useQuery } from '@tanstack/react-query'
import {
  getGalleries,
  getGalleryPhotos
} from './fetchers'

export function useGetGalleries() {
  return useQuery(["get-galleries"], getGalleries);
}

export function useGetGalleryPhotos(galleryUUID: string, enabled?: boolean) {
  return useQuery(
    ["gallery-photos", galleryUUID],
    () => getGalleryPhotos(galleryUUID),
    {
      enabled: enabled,
    }
  );
}
