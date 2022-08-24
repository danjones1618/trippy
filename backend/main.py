#!/usr/bin/env python3

from datetime import datetime
from fastapi import FastAPI, Form, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from filelock import FileLock
from typing import List, Dict
from pathlib import Path
from uuid import uuid4
from .types import Gallery, Media
from .config import Settings, custom_openapi
import json
import os
import mimetypes

app = FastAPI()

app.openapi = custom_openapi(app)

settings = Settings()

origins = [ "http://localhost:3000" ]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
async def startup_event():
    if not settings.storage_dir.exists():
        settings.storage_dir.mkdir()

    if not mimetypes.inited:
        mimetypes.init()


@app.get("/galleries", response_model=List[Gallery])
def getGalleries() -> List[Gallery]:
    galleries_meta: List[Dict[str, str]] = []

    galleries_meta_file = settings.storage_dir / "galleries.meta.json"

    if not galleries_meta_file.exists():
        return []

    with open(galleries_meta_file) as f:
        galleries_meta = [json.loads(l) for l in f.readlines()]

    galleries = []
    for gal_m in galleries_meta:
        uuid = gal_m.get("uuid", None)
        name = gal_m.get("name", None)
        cover_image = gal_m.get("cover_image", None)

        if not uuid or not name or not cover_image:
            # TODO log malformed data
            continue

        gallery_folder = settings.storage_dir / uuid

        if not gallery_folder.exists() or not gallery_folder.is_dir():
            # TODO log error
            continue

        num_items = len(os.listdir(gallery_folder))

        galleries.append(Gallery(uuid=uuid, name=name, cover_image=cover_image, num_items=num_items))


    return galleries


@app.post("/galleries", response_model=Gallery)
def addGallery(name: str = Form(), cover_image: UploadFile = File()):
    gallery_uuid = str(uuid4())
    cover_image_name = str(uuid4()) + Path(cover_image.filename).suffix

    with FileLock(settings.storage_dir / "galleries.meta.json.lock"):
        gallery_dir = settings.storage_dir / gallery_uuid
        gallery_dir.mkdir()

        with open(settings.storage_dir / "galleries.meta.json", "a") as f:
            f.write(json.dumps({
                    "uuid": gallery_uuid,
                    "name": name,
                    "cover_image": cover_image_name,
                }) + "\n")

    with open(gallery_dir / cover_image_name, "wb") as f:
        f.write(cover_image.file.read())

    return Gallery(uuid=gallery_uuid, name=name, num_items=0, cover_image=cover_image.content_type)


@app.get("/gallery/{gallery_uuid}", response_model=List[Media])
def listGallery(gallery_uuid: str):
    # TODO check if have permission
    directory = settings.storage_dir / gallery_uuid

    if not directory.exists() or not directory.is_dir():
        raise HTTPException(status_code=404)

    directory.lstat().st_atime
    results: List[Media] = []
    for p in directory.iterdir():
        media = Media.fromPath(p)

        if media == None:
            continue

        results.append(media)

    return results


@app.get("/gallery/{gallery_uuid}/{photo_uuid}", response_class=FileResponse)
async def getMedia(gallery_uuid: str, photo_uuid: str):
    # TODO check if have permission
    path = settings.storage_dir / gallery_uuid / photo_uuid

    if not path.exists() or not path.is_file():
        raise HTTPException(status_code=404)

    return FileResponse(path)


@app.post("/gallery/{gallery_uuid}", response_model=List[Media])
async def postMedia(gallery_uuid: str, files: List[UploadFile] = File(description="Multiple files to upload")):
    # TODO check if have perms

    folder = settings.storage_dir / gallery_uuid

    if not folder.exists() or not folder.is_dir():
        raise HTTPException(status_code=400, detail="Invalid gallery")

    uploadedMedia: List[Media] = []

    for file in files:
        name = str(uuid4()) + Path(file.filename).suffix
        with open(folder / name, "wb") as f:
            f.write(file.file.read())

        media = Media.fromPath(folder / name)

        if media == None:
            # TODO properly handel this error
            continue

        uploadedMedia.append(media)

    return uploadedMedia

