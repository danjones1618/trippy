import { useState } from 'react'
import {
  Button,
  Select,
  Input,
  Img,
  VStack,
} from "@chakra-ui/react"
import { useGetGalleries } from "../api/hooks"

export default function Upload() {
  const [files, setFiles] = useState<File[]>([]);
  const { data: galleries, isLoading: isGalleriesLoading, isError: isGalleriesError } = useGetGalleries();

  console.log(files)

  return (
    <VStack>
      <Select placeholder="Select Gallery" disabled={isGalleriesLoading || isGalleriesError}>
        {!isGalleriesLoading && !isGalleriesError &&
          galleries!.map((g) => <option key={g.uuid} value={g.uuid}>{g.name}</option>)
        }
      </Select>

      <Input
        type="file"
        accept="image/*, video/*"
        multiple
        onChange={(e) => e.target.files === null
          ? null
          : setFiles((fs) => fs.concat(Array.from(e.target.files!)))
        }
      />
      {files.map((f) =>
        f.type.startsWith("image")
          ? <Img key={f.name} src={URL.createObjectURL(f)} />
          : f.type.startsWith("video")
            ? <video key={f.name} controls>
                <source src={URL.createObjectURL(f)} type={f.type} />
              </video>
            : <span>Error</span>
      )}
      <Button colorScheme="brand.primary">Add images/videos</Button>
    </VStack>
  );
}
