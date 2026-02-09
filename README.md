# Energy Audit

Монорепо: бэкенд + фронтенд сайта энергоаудита. Заявки с формы сохраняются в PostgreSQL и отправляются в Telegram-группу операторам через бота.

## Структура

```
backend/                ← Python бэкенд (FastAPI)
├── app/
│   ├── main.py         — FastAPI app, эндпоинты
│   ├── config.py       — .env переменные
│   ├── database.py     — SQLAlchemy engine
│   ├── models.py       — модель Request
│   └── bot.py          — Telegram бот
├── Dockerfile
├── requirements.txt
└── .env.example

frontend/               ← React фронтенд (Vite)
├── src/
│   ├── pages/Contact/  — форма заявки → POST /api/requests
│   └── ...
└── package.json

docker-compose.yml      ← запуск всего через Docker
```

## Как работает

```
Юзер заполняет форму на сайте
        ↓
POST /api/requests  →  Сохранение в PostgreSQL (processed=false)
        ↓
Telegram бот отправляет сообщение в группу операторов
с кнопкой "✅ ОБРАБОТАНО"
        ↓
Оператор нажимает кнопку  →  processed=true в БД
        ↓
Сообщение обновляется: показывает кто обработал
```

## API

| Метод | Путь | Описание |
|---|---|---|
| `POST` | `/api/requests` | Создать заявку `{name, phone, email, message}` |
| `GET` | `/health` | Healthcheck |

---

## Запуск локально (через Docker)

```bash
# 1. Клонировать
git clone <repo-url>
cd energy-audit-backend

# 2. Создать .env
cp backend/.env.example backend/.env
# вписать TELEGRAM_BOT_TOKEN и TELEGRAM_CHAT_ID

# 3. Запустить бэкенд + PostgreSQL
docker compose up -d --build

# 4. (Опционально) Запустить фронтенд
cd frontend
npm install
npm run dev
```

> **Как узнать CHAT_ID группы:** добавь бота в группу, отправь любое сообщение,
> открой `https://api.telegram.org/bot<TOKEN>/getUpdates` — в ответе будет `chat.id` (отрицательное число).

---

## Деплой на DigitalOcean Droplet (Docker)

### 1. Подключиться к серверу

```bash
ssh root@<your-droplet-ip>
```

### 2. Установить Docker

```bash
curl -fsSL https://get.docker.com | sh
```

### 3. Склонировать проект

```bash
cd /opt
git clone <repo-url> energy-audit-backend
cd energy-audit-backend
```

### 4. Создать .env файл

```bash
cp backend/.env.example backend/.env
nano backend/.env
```

Вписать:

```
TELEGRAM_BOT_TOKEN=123456:ABC-DEF...
TELEGRAM_CHAT_ID=-100123456789
DATABASE_URL=postgresql+asyncpg://energy:energy@db:5432/energy_audit
```

### 5. Запустить

```bash
docker compose up -d --build
```

Готово. Бэкенд доступен на `http://<droplet-ip>:8000`.

### 6. Проверить

```bash
# статус контейнера
docker compose ps

# логи
docker compose logs -f backend

# healthcheck
curl http://localhost:8000/health
```

### Полезные команды

```bash
docker compose restart backend    # перезапустить
docker compose logs -f backend    # логи
docker compose down               # остановить
docker compose up -d --build      # пересобрать и запустить

# обновить код с GitHub
cd /opt/energy-audit-backend
git pull
docker compose up -d --build
```

### (Опционально) Nginx + HTTPS

Если нужен домен:

```bash
apt install -y nginx certbot python3-certbot-nginx

cat > /etc/nginx/sites-available/energy-audit << 'EOF'
server {
    listen 80;
    server_name your-domain.com;

    location /api/ {
        proxy_pass http://127.0.0.1:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
EOF

ln -s /etc/nginx/sites-available/energy-audit /etc/nginx/sites-enabled/
nginx -t && systemctl restart nginx

# HTTPS
certbot --nginx -d your-domain.com
```
