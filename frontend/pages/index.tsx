import { Flex } from '@chakra-ui/react'
import { useGetGalleries } from '../api/hooks'
import GalleryCard from '../components/GalleryCard'

function Home() {
  const { data: galleries, isLoading, isError } = useGetGalleries()

  return (
    <Flex gap={4} wrap="wrap" justifyContent="center">
      { !isLoading && !isError && galleries!.map((g) =>
        <GalleryCard key={g.uuid} {...g} />
      )}
    </Flex>
  )
}

Home.title = "Galleries"

export default Home
