import { useState } from 'react'
import {
  Box,
  Button,
  Flex,
  FormLabel,
  Heading,
  Select,
  Spacer,
  IconButton,
  Img,
  HStack,
  useToast,
} from '@chakra-ui/react'
import { AiOutlineClose } from 'react-icons/ai'
import { useGetGalleries } from '../api/hooks'
import { uploadFiles } from '../api/fetchers'

interface UploadedFileProps {
  file: File
  onDeleteClick: () => void
}

function UploadedFile({file, onDeleteClick}: UploadedFileProps) {
  const [hovering, setHovering] = useState(false);
  return (
    <Box w="sm" borderRadius="md" shadow="md" sx={{position: "relative"}} onMouseEnter={() => setHovering(true)} onMouseLeave={() => setHovering(false)}>
      <IconButton
        aria-label="Remove media"
        colorScheme="brand.primary"
        borderRadius="full"
        size="xs"
        icon={<AiOutlineClose />}
        sx={{
          position: "absolute",
          right: "calc(var(--chakra-fontSizes-xs) * -0.5)",
          top: "calc(var(--chakra-fontSizes-xs) * -0.5)",
          transition: "opacity ease 250ms"
        }}
        opacity={hovering ? 1 : 0}
        onClick={onDeleteClick}
      />
      { file.type.startsWith("image")
        ? <Img key={file.name} src={URL.createObjectURL(file)} borderRadius="inherit" />
        : file.type.startsWith("video")
          ? <video key={file.name} controls style={{borderRadius: "inherit"}} >
              <source src={URL.createObjectURL(file)} type={file.type} />
            </video>
          : <span>Error</span>
      }
    </Box>
  )
}

export default function Upload() {
  const toast = useToast();
  const [files, setFiles] = useState<File[]>([]);
  const [galleryUUID, setGalleryUUID] = useState<string>();
  const { data: galleries, isLoading: isGalleriesLoading, isError: isGalleriesError } = useGetGalleries();

  return (
    <>
      <Heading>Upload pictures to a gallery</Heading>
      <FormLabel>Gallery to upload to</FormLabel>
      <Select
        placeholder="Select Gallery"
        disabled={isGalleriesLoading || isGalleriesError}
        value={galleryUUID}
        onChange={(e) => setGalleryUUID(e.target.value)}
      >
        {!isGalleriesLoading && !isGalleriesError &&
          galleries!.map((g) => <option key={g.uuid} value={g.uuid}>{g.name}</option>)
        }
      </Select>


      <HStack>
        <FormLabel mt={8}>Photos to upload:</FormLabel>
        <Spacer />
        <label htmlFor="file-upload-input">
          <Button
            as="span"
            colorScheme="brand.primary"
            cursor="pointer"
          >
            Add images/videos
          </Button>
        </label>
      </HStack>
      <Flex direction="row" wrap="wrap" gap={6} justifyContent="center" alignItems="start" my={2}>
        {files.map((f) =>
          <UploadedFile
            key={f.name}
            file={f}
            onDeleteClick={() => setFiles((fs) => fs.filter((ffs) => ffs.name !== f.name))}
          />
        )}
      </Flex>

      <input
        accept="image/*, video/*"
        id="file-upload-input"
        multiple
        style={{display: "none"}}
        type="file"
        onChange={(e) => e.target.files === null
          ? null
          : setFiles((fs) => fs.concat(Array.from(e.target.files!).filter((f) => fs.find((s) => s.name === f.name) === undefined)))
        }
      />

      <Flex direction="row-reverse">
        <Button
          colorScheme="brand.primary"
          disabled={files.length === 0 || galleryUUID === undefined}
          variant="outline"
          onClick={() => {
            toast({
              title: "Started uplaod",
              description: "Your files are uploading",
              status: "info",
              duration: 5000,
              isClosable: true,
            });

            uploadFiles(galleryUUID!, files)
              .then((res) => {
                if (res.ok) {
                  toast({
                    title: "Files uploaded!",
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                  });
                  setFiles([]);
                } else {
                  toast({
                    title: "Error uploading files",
                    description: "Please try again in a moment",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                  });
                }
              })
              .catch(() => {
                toast({
                  title: "Error uploading files",
                  description: "Please try again in a moment",
                  status: "error",
                  duration: 5000,
                  isClosable: true,
                });
              })
          }}
        >
          Upload selected files
        </Button>
      </Flex>
    </>
  );
}
