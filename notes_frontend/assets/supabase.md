# Supabase Integration Guide (Frontend)

This project is prepared for Supabase integration, but runs fully stand-alone without a backend. When you are ready to connect Supabase, follow the steps below.

Important: We attempted automated DB configuration via the Supabase Tools, but your project currently lacks the public.run_sql() RPC required by the automation. The tools returned: "Could not find the function public.run_sql(query) in the schema cache". Until this RPC is available, please run the SQL below manually in the Supabase SQL editor. Once created, the app will be able to use the database immediately.

1) Environment Variables

Create a `.env` file in the project root (same folder as package.json) with the following variables:

REACT_APP_SUPABASE_URL=YOUR_SUPABASE_URL
REACT_APP_SUPABASE_KEY=YOUR_SUPABASE_ANON_KEY
REACT_APP_SITE_URL=http://localhost:3000/

Never commit actual values to version control. An example is provided in `.env.example`.

2) Install the SDK

When wiring Supabase for real, install the official SDK:

npm install @supabase/supabase-js

The current code will try to load it via dynamic import only when environment variables are present. If the SDK isn't installed or the vars are missing, the app falls back to local storage and still works offline.

3) Where integration happens

- src/services/supabase.js
  - getSupabase() dynamically imports the SDK when vars are available.
- src/context/AuthContext.jsx
  - signIn, signUp, signOut call Supabase Auth APIs if available; otherwise it uses local storage for a demo session.
- src/context/NotesContext.jsx
  - createNote, updateNote, deleteNote, loadNotes have placeholders for Supabase operations and currently use local storage for persistence.
- src/utils/getURL.js
  - Returns a safe base URL used in all auth redirect flows (dev and prod).
- src/pages/auth/AuthCallback.jsx
  - Handles auth callback redirects (e.g., after email confirmation, OAuth, password reset).

4) Database schema and policies (run in Supabase SQL editor)

-- Enable required extensions
create extension if not exists pgcrypto;

-- Notes table
create table if not exists public.notes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text,
  content text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Row Level Security
alter table public.notes enable row level security;

-- Owner-only policies
create policy if not exists "notes_select_own" on public.notes
  for select using (auth.uid() = user_id);

create policy if not exists "notes_insert_own" on public.notes
  for insert with check (auth.uid() = user_id);

create policy if not exists "notes_update_own" on public.notes
  for update using (auth.uid() = user_id);

create policy if not exists "notes_delete_own" on public.notes
  for delete using (auth.uid() = user_id);

-- Keep updated_at fresh
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql security definer set search_path = public;

drop trigger if exists set_notes_updated_at on public.notes;
create trigger set_notes_updated_at
before update on public.notes
for each row execute function public.set_updated_at();

5) Authentication and Redirect URLs

In Supabase Dashboard:
- Authentication > URL Configuration
  - Site URL: set to your development/prod URL (e.g., http://localhost:3000/ for local).
  - Add Redirect URLs:
    - http://localhost:3000/**
    - https://yourapp.com/** (prod)
- Email Templates (optional): update to use SiteURL and RedirectTo.

All client code uses a helper getURL() to construct redirect URLs:
- Sign-up uses emailRedirectTo: `${getURL()}auth/callback`
- Magic Link uses emailRedirectTo: `${getURL()}auth/callback`
- OAuth uses redirectTo: `${getURL()}auth/callback`
- Password reset (if added) uses redirectTo: `${getURL()}auth/reset-password`

6) Using the contexts

- AuthContext exposes user, signIn, signUp, signOut.
- NotesContext exposes notes, filteredNotes, search, setSearch, createNote, updateNote, deleteNote, selectNote, selectedNoteId.

They will transparently switch to Supabase once configured.

7) Troubleshooting

- If environment variables are set but the SDK isn’t installed, the app will log a warning and continue in offline mode.
- If the SDK is installed but the variables are missing, the app will remain offline-mode.
- Check browser console for detailed warnings from supabase.js.

Automation note (for maintainers):
- Our automated Supabase setup attempted:
  1) List tables -> failed due to missing public.run_sql
  2) Create table -> failed due to missing public.run_sql
  3) Run SQL -> failed due to missing public.run_sql
- Action required: Either create the following RPC in your database (using the SQL editor) to enable automation:

create or replace function public.run_sql(query text)
returns json
language plpgsql
security definer
as $$
declare
  result json;
begin
  execute query;
  return json_build_object('status', 'ok');
exception when others then
  return json_build_object('status', 'error', 'message', sqlerrm);
end;
$$;

grant execute on function public.run_sql(text) to anon, authenticated, service_role;

Or, continue using the provided schema SQL above manually.
