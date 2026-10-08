# EqualSpace

EqualSpace is a modern gender-awareness and equality platform for students and the public. It helps people challenge stereotypes, understand social bias, explore inclusive learning resources, and reflect on real experiences in a respectful digital environment.

## Features

- Premium landing page with responsive design and motion effects
- Educational learning library on gender stereotypes and equality
- Interactive quiz with scoring and explanations
- Gender perception poll with chart-based results
- Story-sharing flow with moderation-ready structure
- Law and resource library with official references
- User dashboard and progress tracking
- Role-checked admin dashboard screens (content-management controls remain prototype UI)
- Supabase password login, OTP-confirmed account creation, and row-level security setup
- Local browser-only demo storage for poll responses, stories, quiz attempts, and lesson progress

## Tech Stack

- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS
- Framer Motion
- Recharts
- Lucide React
- Supabase client and SSR helpers

## Project Structure

- `app/` — routes, metadata, pages, and SEO files
- `components/` — reusable UI and layout building blocks
- `lib/` — shared data and Supabase configuration
- `public/images/` — illustration placeholders and future asset library

## Getting Started

1. Install dependencies:

   npm install

2. Create `.env.local` and add your Supabase project URL and publishable key (or a legacy anon key).

4. Start the development server:

   npm run dev

5. Open http://localhost:3000

## Environment Variables

Create a `.env.local` file with your project values:

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## Supabase Setup

1. Create a new Supabase project.
2. Enable authentication and set up a public schema.
3. Add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` to `.env.local`. `NEXT_PUBLIC_SUPABASE_ANON_KEY` is accepted for older projects.
4. Enable email authentication, enable **Confirm Email**, and allow your app origin plus the `/update-password` redirect in Supabase Auth URL configuration.
5. In **Authentication → Email Templates → Confirm signup**, include `{{ .Token }}` so new accounts receive a six-digit confirmation code. OTP is only used to confirm account creation; users log in with their email and password. Keep the password recovery email configured to send a reset link.
6. For email delivery, configure custom SMTP under **Authentication → SMTP Settings**. Supabase's default mail service only sends to project team addresses and is limited to 2 emails per hour. During testing, check the Supabase Auth logs for delivery errors and check the recipient's spam folder.
7. Run `supabase/schema.sql` in the Supabase SQL Editor for a new project. For a database that already has this schema, apply and verify the changed policies and grants separately; this repository does not yet include versioned migrations.

## Database Migration

The schema includes `profiles`, `lessons`, `quiz_questions`, `quiz_attempts`, `poll_responses`, `stories`, `laws`, and `user_progress`. Profile roles must be assigned through a trusted administrative database channel; users cannot promote themselves. Admin routes fail closed unless Supabase is configured and the authenticated profile has the `admin` role. The admin data-management pages are still prototype screens and must be connected to secured database CRUD operations before production use.

Without Supabase configuration, community submissions and learning progress are stored only in the current browser. They are not shared with other users or devices, and real authentication and admin access are unavailable.

## Deployment

This project is designed for deployment to Vercel with Supabase integration. Ensure the environment variables are configured in the Vercel dashboard before deploying.

## License

This project is for educational and portfolio demonstration purposes.
