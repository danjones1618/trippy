import { Flex } from "@chakra-ui/react"
import GalleryCard from "../components/GalleryCard"

function Home() {
  return (
    <Flex gap={4} wrap="wrap" justifyContent="center">
      <GalleryCard name="Kandersteg 2022" href="/" size={ 20 } imgHref="/land.jpg" />
      <GalleryCard name="Holland 2023" href="/" size={ 25 } imgHref="/land.jpg" />
      <GalleryCard name="Holland 2023" href="/" size={ 39 } imgHref="/land.jpg" />
      <GalleryCard name="Holland 2023" href="/" size={ 20 } imgHref="/land.jpg" />
      <GalleryCard name="Holland 2023" href="/" size={ 20 } imgHref="/land.jpg" />
      <GalleryCard name="Holland 2023" href="/" size={ 20 } imgHref="/land.jpg" />
    </Flex>
  )
}

Home.title = "Galleries"

export default Home
