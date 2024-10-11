# Next Pizza 🍕

**Next Pizza** — это современное веб-приложение для заказа пиццы, разработанное на Next.js. Проект демонстрирует создание адаптивного интерфейса, работу с API, интеграцию бэкенда и возможность оформления заказа.

## 📋 Функциональность

- 📦 Просмотр каталога пицц
- 🛒 Добавление товаров в корзину
- 🚀 Оформление заказа
- 🔄 Интерактивный интерфейс с поддержкой динамических данных
- 💳 Интеграция с платежными системами

## 🛠️ Технологии

- **Next.js** — для серверного рендеринга и маршрутизации
- **React** — как основа для создания интерфейсов
- **TypeScript** — для строгой типизации
- **Axios** — для работы с API
- **Prisma** — для взаимодействия с базой данных
- **PostgreSQL** - субд
- **Tailwindcss** — для стилизации
- **Next-auth** — для аутентификации
- **Radix-ui** — для создания интерфейсных компонентов

## 🚀 Установка и запуск

1. Клонируй репозиторий:
```bash
git clone https://github.com/mrkirill046/next-pizza.git
```

2. Установи зависимости:
```bash
cd next-pizza
npm install
```

3. Создай `.env.local` файл и добавь необходимые переменные окружения:
```dotenv
POSTGRES_URL=""
POSTGRES_PRISMA_URL=""
POSTGRES_URL_NON_POOLING=""
POSTGRES_USER=""
POSTGRES_HOST=""
POSTGRES_PASSWORD=""
POSTGRES_DATABASE=""
NEXT_PUBLIC_API_URL=/api
NEXT_PUBLIC_DADATA_KEY=""
NEXT_PUBLIC_SITE_HOST=http://localhost:3000
RESEND_API_KEY=""
YOOKASSA_CALLBACK_URL=http://localhost:3000/?paid
YOOKASSA_STORE_ID=""
YOOKASSA_API_KEY=""
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""
GITHUB_ID=""
GITHUB_SECRET=""
NEXTAUTH_SECRET=""
```
4. Настрой сторонние сервисы:
```text
1. YOOKASSA
2. RESEND
3. GOOGLE OAUTH2
4. GITHUB OAUTH2
5. VERCEL DB
```

5. Запусти приложение:
```bash
npm run dev
```

Приложение будет доступно по адресу `http://localhost:3000`

---

P.S. для настройки юкассы используй:
1. тестовый магазин (https://yookassa.ru/joinups?createTestShop=true)
2. ``lt --port 3000``, затем вставь ссылку ``{YOUR_HOST}/api/checkout/callback`` в "URL для уведомлений"
