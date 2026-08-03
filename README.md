<div align="center">

# 🍕 Next Pizza

**A full-stack pizza ordering platform built with Next.js 16, React 19, and Prisma 7.**

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-7-3178C6?logo=typescript)](https://www.typescriptlang.org)
[![Prisma](https://img.shields.io/badge/Prisma-7-2D3748?logo=prisma)](https://www.prisma.io)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss)](https://tailwindcss.com)
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)

</div>

---

## Overview

Next Pizza is a production-ready pizza delivery web application featuring real-time cart management, YooKassa payment integration, email notifications, Google & GitHub OAuth, and a fully typed stack from database to UI.

![Demo](https://img.shields.io/badge/Demo-live-orange) https://next-pizza-ochre.vercel.app/

## Features

- **Product Catalog** — Browse pizzas with filtering by dough type, size, price range, and ingredients
- **Shopping Cart** — Persistent cart with quantity controls, ingredient customization, and real-time totals
- **Checkout Flow** — Multi-step checkout with personal info, delivery address, and YooKassa payment
- **Authentication** — NextAuth.js with Google OAuth, GitHub OAuth, and email/password credentials
- **Email Notifications** — Order confirmation, payment links, and email verification via Resend
- **Admin Seed Script** — Database seeding with categories, ingredients, and products via Prisma

## Tech Stack

| Category | Technology |
|---|---|
| Framework | [Next.js 16](https://nextjs.org) (App Router, Turbopack) |
| UI Library | [React 19](https://react.dev) |
| Language | [TypeScript 7](https://www.typescriptlang.org) |
| Styling | [Tailwind CSS 4](https://tailwindcss.com) |
| Database | [PostgreSQL](https://www.postgresql.org) via [Neon](https://neon.tech) |
| ORM | [Prisma 7](https://www.prisma.io) with `PrismaPg` adapter |
| Auth | [NextAuth.js](https://next-auth.js.org) (Google, GitHub, Credentials) |
| Payments | [YooKassa](https://yookassa.ru) |
| Email | [Resend](https://resend.com) with React Email templates |
| Forms | [React Hook Form](https://react-hook-form.com) + [Zod 4](https://zod.dev) validation |
| State | [Zustand 5](https://zustand-demo.pmnd.rs) |
| UI Components | [Radix UI](https://www.radix-ui.com) + [shadcn/ui](https://ui.shadcn.com) |
| HTTP Client | [Axios](https://axios-http.com) |
| Address Search | [DaData](https://dadata.ru) |

## Getting Started

### Prerequisites

- [Bun](https://bun.sh) (or npm/yarn/pnpm)
- [PostgreSQL](https://www.postgresql.org) database (or a [Neon](https://neon.tech) account)

### Installation

```bash
git clone https://github.com/kazuha046/next-pizza.git
cd next-pizza
bun install
```

### Environment Variables

Create a `.env` file in the project root:

```env
# Database (Neon / PostgreSQL)
POSTGRES_URL=""
POSTGRES_PRISMA_URL=""
POSTGRES_URL_NON_POOLING=""
POSTGRES_USER=""
POSTGRES_HOST=""
POSTGRES_PASSWORD=""
POSTGRES_DATABASE=""

# App
NEXT_PUBLIC_API_URL=/api
NEXT_PUBLIC_SITE_HOST=http://localhost:3000

# Authentication
NEXTAUTH_SECRET=""
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""
GITHUB_ID=""
GITHUB_SECRET=""

# Payments (YooKassa)
YOOKASSA_CALLBACK_URL=http://localhost:3000/?paid
YOOKASSA_STORE_ID=""
YOOKASSA_API_KEY=""

# Email (Resend)
RESEND_API_KEY=""

# Address Search (DaData)
NEXT_PUBLIC_DADATA_KEY=""
```

### Running

```bash
# Push the database
bun run prisma:push

# Seed the database
bun run prisma:seed

# Generate prisma
bunx prisma generate --schema src/prisma/schema.prisma 

# Start the dev server
bun run dev
```

The app will be available at [http://localhost:3000](http://localhost:3000).

### YooKassa Setup (Payments)

1. Create a [test shop](https://yookassa.ru/joinups?createTestShop=true)
2. Run `lt --port 3000` to expose your local server via [localtunnel](https://localtunnel.me)
3. Paste the tunnel URL + `/api/checkout/callback` into the **Webhook URL** field in your YooKassa dashboard

## Project Structure

```
src/
├── app/                    # Next.js App Router pages & API routes
│   ├── (root)/             # Main storefront (home, product pages)
│   ├── (checkout)/         # Checkout flow
│   ├── api/                # REST API routes (cart, auth, payments, etc.)
│   └── actions.ts          # Server actions (create order, register, etc.)
├── components/
│   ├── services/           # API client & DTOs
│   ├── shared/             # Reusable UI components
│   └── ui/                 # shadcn/ui primitives
├── constants/              # Validation schemas & config
├── hooks/                  # Custom React hooks (cart, filters, pizza options)
├── lib/                    # Utilities & helpers
├── prisma/                 # Prisma schema, seed, client
├── generated/              # Prisma generated client
└── store/                  # Zustand stores (cart, categories, profile)
```

## Scripts

| Command | Description |
|---|---|
| `bun run dev` | Start development server (Turbopack) |
| `bun run build` | Production build |
| `bun run start` | Start production server |
| `bun run lint` | Run ESLint |

## License

[MIT](LICENSE)
