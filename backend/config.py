from fastapi import FastAPI
from fastapi.openapi.utils import get_openapi
from pydantic import BaseSettings, Field
from pathlib import Path

class Settings(BaseSettings):
    app_name: str = "Trippy API"
    storage_dir: Path = Field(default=...)

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"


def custom_openapi(app: FastAPI):
    def fn():
        if app.openapi_schema:
            return app.openapi_schema
        openapi_schema = get_openapi(
            title="Trippy API",
            version="0.1.0",
            description="API for [Trippy](https://sr.ht/~danjones1618/trippy)",
            routes=app.routes
        )
        openapi_schema["info"]["x-logo"] = {
            "url": "https://share.danjones.dev/trippy-logo.svg"
        }

        app.openapi_schema = openapi_schema
        return app.openapi_schema
    return fn
