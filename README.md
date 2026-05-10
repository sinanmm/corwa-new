# Corwa Frontend

Next.js 16 frontend for the Corwa project, built with the App Router, TypeScript, Tailwind CSS, and React 19.

## Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- TanStack Query
- Zustand
- React Hook Form + Zod

## Project structure

```text
src/
  app/
  components/
  data/
  hooks/
  services/
  store/
  types/
  utils/
public/
```

## Getting started

1. Install dependencies:

```bash
npm install
```

2. Create your local environment file:

```bash
cp .env.example .env.local
```

3. Start the development server:

```bash
npm run dev
```

4. Open `http://localhost:3000`.

## Environment variables

- `NEXT_PUBLIC_API_URL`: Base URL for the backend API. Defaults in code to `http://localhost:5000/api/v1` when unset.

## Available scripts

- `npm run dev`: Start the local development server.
- `npm run build`: Build the app for production.
- `npm run start`: Start the production server.
- `npm run lint`: Run ESLint checks.

## Collaboration notes

- Do not commit `.env.local`, `.next`, or `node_modules`.
- Keep API access logic centralized under `src/services`.
- Keep reusable UI under `src/components` and route-specific composition under `src/app`.
