# CLAUDE.md — контекст проекта для Claude

## Что это

Монорепо: бэкенд + фронтенд сайта энергоаудита. Заявки с формы сохраняются в SQLite и отправляются в Telegram-группу операторам через бота.

## Стек

- **Бэкенд:** Python 3.11+, FastAPI, SQLAlchemy (async), SQLite (aiosqlite), python-telegram-bot
- **Фронтенд:** React 19, Vite, react-router-dom, i18next, SCSS
- **Деплой:** DigitalOcean Droplet, Docker, docker-compose

## Структура

```
backend/                      ← бэкенд (FastAPI)
├── app/
│   ├── main.py               — FastAPI app, lifespan, эндпоинты
│   ├── config.py             — переменные окружения из .env
│   ├── database.py           — async engine и session
│   ├── models.py             — модель Request (name, phone, email, message, processed, created_at)
│   └── bot.py                — Telegram: отправка заявки + callback кнопки "ОБРАБОТАНО"
├── Dockerfile                — Docker-образ бэкенда
├── requirements.txt
└── .env.example

frontend/                     ← фронтенд (React + Vite)
├── src/
│   ├── pages/Contact/        — форма заявки (отправляет POST /api/requests)
│   ├── pages/Home/           — главная
│   ├── pages/Services/       — услуги
│   ├── pages/About/          — о компании
│   ├── components/           — Header, Footer, UI-компоненты
│   └── locales/              — i18n переводы (ru, en, uz)
├── vite.config.js            — proxy /api → localhost:8000 для dev
└── package.json

docker-compose.yml            — запуск через Docker
```

## Связь фронта и бэка

- Форма Contact → `POST /api/requests` с `{name, phone, email, message}`
- В dev-режиме Vite проксирует `/api` на `localhost:8000`
- В продакшне фронт указывает на бэкенд через `VITE_API_URL` или CORS

## API

- `POST /api/requests` — создать заявку (body: name, phone, email, message)
- `GET /health` — healthcheck

## Переменные окружения (backend/.env)

- `TELEGRAM_BOT_TOKEN` — токен бота от BotFather
- `TELEGRAM_CHAT_ID` — ID группы операторов
## Ключевые решения

- **Docker** — деплой через `docker compose up -d --build`
- **SQLite** — достаточно для текущей нагрузки, файл `data/db.sqlite3` (Docker volume)
- **Бот через polling** (не webhook) — проще, не требует домена/SSL
- **Fire-and-forget** отправка в Telegram (`asyncio.create_task`) — не блокирует ответ
- **CORS разрешён для всех** (`allow_origins=["*"]`)
- **Таблицы создаются автоматически** при старте

## Что помнить при изменениях

- Поле `message` (не `comment`) — так оно на фронте и в БД
- Модели SQLAlchemy в `models.py` — миграций нет, таблицы создаются при старте через `create_all`
- Бот стартует вместе с FastAPI в lifespan — если токен невалидный, приложение не запустится
- Формат Telegram-сообщений — `_format_request_message` в `bot.py`
- Фронтенд i18n: переводы в `frontend/src/locales/{ru,en,uz}/translation.json`
