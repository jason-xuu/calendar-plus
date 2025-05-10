# CalendarPlus

A modern, full-stack calendar application built with React, Vite, TypeScript, Supabase, and Tailwind CSS.

---

## Live link:
calendar-plus-app.vercel.ap

## Features

- User Authentication (Supabase)
- Create, Edit, Delete Events
- Magic Link Login
- Multiple Calendars (Personal, Work, Family)
- Event Location & Description
- Holiday Integration
- Responsive UI
- Dark/Light Theme Toggle
- Import/Export Events (JSON)
- Protected Routes

---

## Tech Stack

- React
- Vite
- TypeScript
- Supabase (Auth & Database)
- Tailwind CSS
- FullCalendar
- React Router

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/calendarplus.git
cd calendarplus
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env` file in the root directory and add:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_APP_URL=http://localhost:5173
```

Get your Supabase credentials from your Supabase project dashboard.

### 4. Run the development server

```bash
npm run dev
```

The app will be available at http://localhost:5173.

---

## Supabase Setup

1. Create a new project at Supabase.
2. Create a table called `events` with the following columns:
   - `id` (UUID, primary key, default: `uuid_generate_v4()`)
   - `title` (text)
   - `start` (timestamp)
   - `end` (timestamp)
   - `allDay` (boolean)
   - `description` (text)
   - `location` (text)
   - `calendar` (text)
   - `calendarId` (text)
   - `created_at` (timestamp, default: `now()`)
3. Enable authentication (email magic link).
4. Set up Auth Redirect URLs in Supabase Auth settings:
   - http://localhost:5173/auth/callback
   - Your production URL (for example, https://your-app.vercel.app/auth/callback)

---

## Scripts

- `npm run dev` — Start development server
- `npm run build` — Build for production
- `npm run preview` — Preview production build
- `npm run lint` — Lint code

---

## Deployment

You can deploy this app to Vercel or Netlify.

- Make sure to set the same environment variables in your deployment dashboard.
- Add a `vercel.json` or `_redirects` file if you use client-side routing.

---

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

---

## License

MIT

---

## Acknowledgements

- Supabase
- FullCalendar
- shadcn/ui
- Vercel

---
