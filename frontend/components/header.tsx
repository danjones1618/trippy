import Image from 'next/image'
import NextLink from 'next/link'
import {
  Heading,
  HStack,
  Link,
  Spacer,
} from "@chakra-ui/react"

interface HeaderProps {
  title: string
}

export default function Header(props: HeaderProps) {
  return (
    <HStack px={2} py={1} borderBottom="2px" spacing={1}>
      <NextLink href="/" passHref>
        <Link>
          <Image width={100} height={50} src="/trippy.svg" alt="Trippy Logo" />
        </Link>
      </NextLink>
      <Heading>{props.title}</Heading>
      <Spacer />
      <NextLink href="/upload">
        <Link>
          Upload photos/videos
        </Link>
      </NextLink>
    </HStack>
  );
}
