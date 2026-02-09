import os
from pathlib import Path

from dotenv import load_dotenv

load_dotenv()

BASE_DIR = Path(__file__).resolve().parent.parent

TELEGRAM_BOT_TOKEN: str = os.getenv("TELEGRAM_BOT_TOKEN", "")
TELEGRAM_CHAT_ID: str = os.getenv("TELEGRAM_CHAT_ID", "")

DATABASE_URL: str = os.getenv(
    "DATABASE_URL",
    "postgresql+asyncpg://energy:energy@localhost:5432/energy_audit",
)
