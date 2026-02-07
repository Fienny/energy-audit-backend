# Energy Audit Backend

Бэкенд для обработки заявок с формы сайта энергоаудита. При поступлении заявки данные сохраняются в БД и отправляются в Telegram-группу операторам.

## Стек

- **Python 3.11+**
- **FastAPI** — HTTP API
- **SQLAlchemy** (async) — ORM
- **SQLite** + aiosqlite — база данных (файл `db.sqlite3`)
- **python-telegram-bot** — Telegram бот

## Как работает

```
Юзер заполняет форму на сайте
        ↓
POST /api/requests  →  Сохранение в SQLite (processed=false)
        ↓
Telegram бот отправляет сообщение в группу операторов
с кнопкой "✅ ОБРАБОТАНО"
        ↓
Оператор нажимает кнопку  →  processed=true в БД
        ↓
Сообщение обновляется: показывает кто обработал
```

## Поля заявки

| Поле | Тип | Описание |
|---|---|---|
| `name` | string | Имя клиента |
| `phone` | string | Телефон |
| `email` | string | Электронная почта |
| `comment` | string | Комментарий / описание проекта |
| `processed` | bool | Обработана ли заявка (по умолчанию `false`) |
| `created_at` | datetime | Время создания |

## API

### `POST /api/requests`

Создать новую заявку.

```json
{
  "name": "Иван Петров",
  "phone": "+7 999 123-45-67",
  "email": "ivan@example.com",
  "comment": "Нужен энергоаудит офиса"
}
```

Ответ:

```json
{
  "id": 1,
  "success": true
}
```

### `GET /health`

Проверка что сервер работает. Возвращает `{"status": "ok"}`.

## Запуск локально

### 1. Клонировать репозиторий

```bash
git clone <repo-url>
cd energy-audit-backend
```

### 2. Создать виртуальное окружение

```bash
python3 -m venv venv
source venv/bin/activate
```

### 3. Установить зависимости

```bash
pip install -r requirements.txt
```

### 4. Настроить переменные окружения

```bash
cp .env.example .env
```

Открыть `.env` и вставить:

- `TELEGRAM_BOT_TOKEN` — токен бота (получить у [@BotFather](https://t.me/BotFather))
- `TELEGRAM_CHAT_ID` — ID группы куда бот будет слать заявки

> **Как узнать CHAT_ID группы:** добавьте бота в группу, отправьте любое сообщение, затем откройте `https://api.telegram.org/bot<TOKEN>/getUpdates` — в ответе будет `chat.id` (отрицательное число).

### 5. Запустить

```bash
uvicorn app.main:app --host 0.0.0.0 --port 8000
```

БД (`db.sqlite3`) создаётся автоматически при первом запуске.

## Деплой на DigitalOcean Droplet

### 1. Подключиться к серверу

```bash
ssh root@<your-droplet-ip>
```

### 2. Установить Python

```bash
apt update && apt install -y python3 python3-pip python3-venv
```

### 3. Склонировать проект

```bash
cd /opt
git clone <repo-url> energy-audit-backend
cd energy-audit-backend
```

### 4. Настроить окружение

```bash
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
nano .env  # вставить токены
```

### 5. Создать systemd-сервис

```bash
cat > /etc/systemd/system/energy-audit.service << 'EOF'
[Unit]
Description=Energy Audit Backend
After=network.target

[Service]
Type=simple
User=root
WorkingDirectory=/opt/energy-audit-backend
Environment=PATH=/opt/energy-audit-backend/venv/bin
ExecStart=/opt/energy-audit-backend/venv/bin/uvicorn app.main:app --host 0.0.0.0 --port 8000
Restart=always
RestartSec=5

[Install]
WantedBy=multi-user.target
EOF
```

### 6. Запустить сервис

```bash
systemctl daemon-reload
systemctl enable energy-audit
systemctl start energy-audit
```

### 7. Проверить

```bash
systemctl status energy-audit
curl http://localhost:8000/health
```

### Полезные команды

```bash
systemctl restart energy-audit   # перезапустить
journalctl -u energy-audit -f    # логи в реальном времени
```

### (Опционально) Nginx как reverse proxy

Если нужен домен или HTTPS:

```bash
apt install -y nginx

cat > /etc/nginx/sites-available/energy-audit << 'EOF'
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://127.0.0.1:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
EOF

ln -s /etc/nginx/sites-available/energy-audit /etc/nginx/sites-enabled/
nginx -t && systemctl restart nginx
```

Для HTTPS — добавить certbot:

```bash
apt install -y certbot python3-certbot-nginx
certbot --nginx -d your-domain.com
```
