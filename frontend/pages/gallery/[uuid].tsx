import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { Button, Flex, Img, VStack } from '@chakra-ui/react'
import { useGetGalleryPhotos } from '../../api/hooks'
import { AiOutlineCloudUpload } from 'react-icons/ai'

function Gallery() {
  const router = useRouter();
  const { uuid: galleryUUID } = router.query;

  const { data: photos, isLoading, isError } = useGetGalleryPhotos(
    galleryUUID as string,
    router.isReady && typeof galleryUUID === "string"
  );

  return (
    <VStack>
      <NextLink href={`/upload?gallery=${galleryUUID}`} passHref>
        <Button
          as="a"
          colorScheme="brand.primary"
          variant="outline"
          rightIcon={<AiOutlineCloudUpload />}
          disabled={!router.isReady}
        >
          Upload
        </Button>
      </NextLink>
      <Flex gap={4} wrap="wrap" justifyContent="center">
        { !isLoading && !isError && photos!.map((p) =>
          <Img
            key={p.uuid}
            src={`/api/gallery/${galleryUUID}/${p.uuid}`}
            objectFit="cover"
            borderRadius="md"
            w="sm"
          />
        )}
      </Flex>
    </VStack>
  );
}

export default Gallery;
