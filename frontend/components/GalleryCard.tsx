import NextLink from 'next/link'
import {
  Button,
  Flex,
  Heading,
  Icon,
  Img,
  HStack,
  Spacer,
  Text,
} from '@chakra-ui/react'
import { GrGallery } from 'react-icons/gr'
import { AiOutlineArrowRight } from 'react-icons/ai'
import { Gallery } from '../api/types'

export default function GalleryCard(props: Gallery) {
  return (
    <Flex
      p={5}
      borderWidth="1px"
      borderRadius="md"
      w="2xs"
      direction="column"
    >
      <Img
        src={`/api/gallery/${props.uuid}/${props.coverImage}`}
        alt={props.name}
        objectFit="cover"
        mt={-5}
        mx={-5}
        mb={2}
        borderTopRadius="md"
        sx={{
          width: "calc(100% + var(--chakra-space-5) * 2)",
          maxW: "calc(100% + var(--chakra-space-5) * 2)",
          maxHeight: "150px",
        }}
      />
      <Heading>{props.name}</Heading>
      <Spacer />
      <Flex justifyContent="space-between" alignItems="end">
        <HStack spacing={1} alignItems="baseline">
          <Icon as={GrGallery} />
          <Text>{props.numItems}</Text>
        </HStack>

        <NextLink href={`/gallery/${props.uuid}`} passHref>
          <Button
            as="a"
            colorScheme="brand.primary"
            variant="outline"
            rightIcon={<AiOutlineArrowRight />}
          >
            View
          </Button>
        </NextLink>
      </Flex>
    </Flex>
  );
}
