import asyncio
from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from app.bot import create_bot_app, send_new_request
from app.database import async_session, engine
from app.models import Base, Request

bot_app = create_bot_app()


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Create tables
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

    # Start Telegram bot polling in background
    await bot_app.initialize()
    await bot_app.start()
    await bot_app.updater.start_polling()

    yield

    # Shutdown bot
    await bot_app.updater.stop()
    await bot_app.stop()
    await bot_app.shutdown()


app = FastAPI(title="Energy Audit — Заявки", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


# ---------- Schemas ----------

class RequestCreate(BaseModel):
    name: str
    phone: str
    email: str
    comment: str = ""


class RequestResponse(BaseModel):
    id: int
    success: bool = True


# ---------- Endpoints ----------

@app.post("/api/requests", response_model=RequestResponse)
async def create_request(data: RequestCreate):
    req = Request(
        name=data.name,
        phone=data.phone,
        email=data.email,
        comment=data.comment,
    )

    async with async_session() as session:
        session.add(req)
        await session.commit()
        await session.refresh(req)

    # Send to Telegram (fire-and-forget, don't block response)
    asyncio.create_task(_safe_send(req))

    return RequestResponse(id=req.id)


async def _safe_send(req: Request) -> None:
    """Send Telegram notification, log errors silently."""
    try:
        await send_new_request(req)
    except Exception as e:
        print(f"[TG ERROR] Failed to send request #{req.id}: {e}")


@app.get("/health")
async def health():
    return {"status": "ok"}
