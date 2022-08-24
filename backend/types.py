from pydantic import BaseModel, Field
from datetime import datetime
from pathlib import Path
import mimetypes

class Gallery(BaseModel):
    uuid: str
    name: str
    num_items: int
    cover_image: str


class Media(BaseModel):
    uuid: str
    timestamp: datetime = Field(default=..., description="Last modified time of the file in UTC")
    mime_type: str

    @staticmethod
    def fromPath(path: Path):
        mime = mimetypes.guess_type(path)

        if mime[0] == None:
            # TODO update logging
            print("Error: cannot detect mimetype for", path)
            return None

        return Media(uuid=path.name, timestamp=datetime.fromtimestamp(path.lstat().st_atime), mime_type=mime[0])
