# Supabase Integration Guide (Frontend)

This project is prepared for Supabase integration, but runs fully stand-alone without a backend. When you are ready to connect Supabase, follow the steps below.

## 1) Environment Variables

Create a `.env` file in the project root (same folder as package.json) with the following variables:

```
REACT_APP_SUPABASE_URL=YOUR_SUPABASE_URL
REACT_APP_SUPABASE_KEY=YOUR_SUPABASE_ANON_KEY
```

Never commit actual values to version control. An example is provided in `.env.example`.

## 2) Install the SDK

When wiring Supabase for real, install the official SDK:

```
npm install @supabase/supabase-js
```

The current code will try to load it via dynamic `import()` only when environment variables are present. If the SDK isn't installed or the vars are missing, the app falls back to local storage and still works offline.

## 3) Where integration happens

- src/services/supabase.js
  - `getSupabase()` dynamically imports the SDK when vars are available.
- src/context/AuthContext.jsx
  - `signIn`, `signUp`, `signOut` call Supabase Auth APIs if available; otherwise it uses local storage for a demo session.
- src/context/NotesContext.jsx
  - `createNote`, `updateNote`, `deleteNote`, `loadNotes` have placeholders for Supabase operations and currently use local storage for persistence.

## 4) Future database schema (example)

You can use this as a guideline when creating tables:

- Table: `notes`
  - id: uuid (primary key, default gen_random_uuid())
  - user_id: uuid (references auth.users.id)
  - title: text
  - content: text (or json for structured content)
  - created_at: timestamp with time zone default now()
  - updated_at: timestamp with time zone default now()

RLS policies (recommended):
- Enable RLS on `notes`
- Policy: users can select/insert/update/delete rows where `user_id = auth.uid()`

## 5) Auth Redirects

If you implement magic link or OAuth, set the redirect url:
- For email redirect on sign-up: use the environment variable `REACT_APP_SITE_URL` (to be provided by deployment), e.g.:
  ```
  supabase.auth.signUp({ email, password, options: { emailRedirectTo: process.env.REACT_APP_SITE_URL } })
  ```

Note: this project currently uses password sign-in for simplicity.

## 6) Using the contexts

- `AuthContext` exposes `user`, `signIn`, `signUp`, `signOut`.
- `NotesContext` exposes `notes`, `filteredNotes`, `search`, `setSearch`, `createNote`, `updateNote`, `deleteNote`, `selectNote`, `selectedNoteId`.

They will transparently switch to Supabase once configured.

## 7) Troubleshooting

- If environment variables are set but the SDK isn’t installed, the app will log a warning and continue in offline mode.
- If the SDK is installed but the variables are missing, the app will remain offline-mode.
- Check browser console for detailed warnings from `supabase.js`.
