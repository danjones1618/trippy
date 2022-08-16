import { useQuery } from '@tanstack/react-query'
import {
  getGalleries,
} from './fetchers'

export function useGetGalleries() {
  return useQuery(["get-galleries"], getGalleries);
}
