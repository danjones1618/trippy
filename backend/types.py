from pydantic import BaseModel, Field
from datetime import datetime

class Gallery(BaseModel):
    uuid: str
    name: str
    num_items: int
    cover_image: str


class Photo(BaseModel):
    uuid: str
    timestamp: datetime = Field(default=..., description="Last modified time of the file in UTC")
