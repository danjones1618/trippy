from pydantic import BaseSettings, Field
from pathlib import Path

class Settings(BaseSettings):
    app_name: str = "Trippy API"
    storage_dir: Path = Field(default=...)

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"
