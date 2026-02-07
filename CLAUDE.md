# CLAUDE.md — контекст проекта для Claude

## Что это

Бэкенд для обработки заявок с формы сайта энергоаудита. Заявки хранятся в SQLite, уведомления идут в Telegram-группу операторам через бота.

## Стек

- Python 3.11+, FastAPI, SQLAlchemy (async), SQLite (aiosqlite), python-telegram-bot
- Деплой: DigitalOcean Droplet, uvicorn, systemd

## Структура

```
app/
├── main.py       — FastAPI app, lifespan (создание таблиц + запуск бота), эндпоинты
├── config.py     — переменные окружения из .env
├── database.py   — async engine и session
├── models.py     — модель Request (name, phone, email, comment, processed, created_at)
└── bot.py        — Telegram: отправка заявки + callback обработки кнопки "ОБРАБОТАНО"
```

## Ключевые решения

- **SQLite** — достаточно для текущей нагрузки, файл `db.sqlite3` в корне проекта
- **Бот работает через polling** (не webhook) — проще для начала, не требует домена/SSL
- **Отправка в Telegram — fire-and-forget** (`asyncio.create_task`) — не блокирует ответ клиенту
- **CORS разрешён для всех** (`allow_origins=["*"]`) — фронт на отдельном домене
- **Таблицы создаются автоматически** при старте через `Base.metadata.create_all`

## API

- `POST /api/requests` — создать заявку (body: name, phone, email, comment)
- `GET /health` — healthcheck

## Переменные окружения (.env)

- `TELEGRAM_BOT_TOKEN` — токен бота от BotFather
- `TELEGRAM_CHAT_ID` — ID группы операторов

## Что помнить при изменениях

- Модели SQLAlchemy в `models.py` — при добавлении полей таблица пересоздаётся только если удалить `db.sqlite3` (миграций нет)
- Бот стартует вместе с FastAPI в lifespan — если токен невалидный, приложение не запустится
- Формат сообщений в Telegram — в функции `_format_request_message` в `bot.py`
