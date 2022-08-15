import {
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  Img,
  HStack,
  Text,
} from '@chakra-ui/react'
import { GrGallery } from 'react-icons/gr'
import { AiOutlineArrowRight } from 'react-icons/ai'

interface GalleryCardProps {
  name: string
  uid: string
  size: number
  imgHref: string
}

export default function GalleryCard(props: GalleryCardProps) {
  return (
    <Box
      p={5}
      borderWidth="1px"
      borderRadius="md"
      maxW="2xs"
    >
      <Img
        src={props.imgHref}
        alt={props.name}
        objectFit="cover"
        mt={-5}
        mx={-5}
        mb={2}
        borderTopRadius="md"
        sx={{
          width: "calc(100% + var(--chakra-space-5) * 2)",
          maxW: "calc(100% + var(--chakra-space-5) * 2)",
          maxHeight: "100px",
        }}
      />
      <Heading>{props.name}</Heading>
      <Flex justifyContent="space-between" alignItems="end">
        <HStack spacing={1} alignItems="baseline">
          <Icon as={GrGallery} />
          <Text>{props.size}</Text>
        </HStack>
        <Button
          colorScheme="brand.primary"
          variant="outline"
          rightIcon={<AiOutlineArrowRight />}
        >
          View
        </Button>
      </Flex>
    </Box>
  );
}
