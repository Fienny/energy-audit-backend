from telegram import Bot, InlineKeyboardButton, InlineKeyboardMarkup, Update
from telegram.ext import Application, CallbackQueryHandler, ContextTypes

from app.config import TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID
from app.database import async_session
from app.models import Request

bot = Bot(token=TELEGRAM_BOT_TOKEN)


def _format_request_message(req: Request, processed_by: str | None = None) -> str:
    status = (
        f"✅ Обработано ({processed_by})"
        if processed_by
        else "⏳ Ожидает обработки"
    )

    return (
        f"📋 <b>Новая заявка #{req.id}</b>\n"
        f"\n"
        f"👤 <b>Имя:</b> {req.name}\n"
        f"📞 <b>Телефон:</b> {req.phone}\n"
        f"📧 <b>Email:</b> {req.email}\n"
        f"\n"
        f"💬 <b>Комментарий:</b>\n"
        f"{req.comment or '—'}\n"
        f"\n"
        f"{status}"
    )


async def send_new_request(req: Request) -> None:
    """Send a new request notification to the Telegram group."""
    keyboard = InlineKeyboardMarkup(
        [[InlineKeyboardButton("✅ ОБРАБОТАНО", callback_data=f"done:{req.id}")]]
    )

    await bot.send_message(
        chat_id=TELEGRAM_CHAT_ID,
        text=_format_request_message(req),
        parse_mode="HTML",
        reply_markup=keyboard,
    )


async def _handle_callback(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """Handle the 'ОБРАБОТАНО' button press."""
    query = update.callback_query

    if not query or not query.data or not query.data.startswith("done:"):
        return

    request_id = int(query.data.split(":")[1])
    operator = query.from_user
    operator_name = f"@{operator.username}" if operator.username else operator.full_name

    async with async_session() as session:
        req = await session.get(Request, request_id)
        if not req:
            await query.answer("Заявка не найдена")
            return

        if req.processed:
            await query.answer("Уже обработана")
            return

        req.processed = True
        await session.commit()

    await query.answer("Отмечено как обработанное ✅")
    await query.edit_message_text(
        text=_format_request_message(req, processed_by=operator_name),
        parse_mode="HTML",
    )


def create_bot_app() -> Application:
    """Create and configure the Telegram bot application."""
    app = Application.builder().token(TELEGRAM_BOT_TOKEN).build()
    app.add_handler(CallbackQueryHandler(_handle_callback))
    return app
