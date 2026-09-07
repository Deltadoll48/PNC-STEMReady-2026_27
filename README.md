# STEMREADY — Setup & Deploy Guide

This project follows the same pattern as Links Love HBCUs: a Vite + React site,
hosted free on Vercel, with a free Supabase project as the database. The
difference here is there's no login wall — anyone can view the site, and the
Sign Up form writes directly into a database table you can view in Supabase.

---

## Part 1 — Create your free Supabase project

You can reuse the SAME Supabase project from Links Love HBCUs, or create a new
one dedicated to STEMREADY — either works. To create a new one:

1. Go to https://supabase.com, sign in, click **New project**.
2. Name it `stemsready`, set a database password (save it), pick your region,
   click **Create new project**.
3. Once ready, go to **Project Settings → API** and copy the **Project URL**
   and **anon public** key.
4. Copy `.env.example` to a new file named `.env` and paste in those two
   values.

## Part 2 — Create the database table for sign-ups

In your Supabase project, click **SQL Editor** in the left sidebar, click
**New query**, paste the following, and click **Run**:

```sql
create table event_signups (
  id uuid primary key default gen_random_uuid(),
  created_at timestamp with time zone default now(),
  student_first text not null,
  student_last text not null,
  student_grade text not null,
  student_school text,
  parent_first text not null,
  parent_last text,
  parent_email text not null,
  parent_phone text,
  interests text[],
  consent_participate boolean not null,
  consent_media boolean not null,
  signature text not null
);

alter table event_signups enable row level security;

create policy "Allow public inserts"
  on event_signups for insert
  to anon
  with check (true);
```

This creates the table AND a security rule that allows the public sign-up
form to add new rows, while keeping people from reading, editing, or deleting
other families' submissions through the app itself.

### Viewing submissions

Go to **Table Editor → event_signups** in your Supabase dashboard any time to
see every registration and consent form that's come in — you can also export
this as a CSV/spreadsheet from that same screen (look for the export button
near the top of the table).

---

## Part 3 — Push to GitHub

Same process as Links Love HBCUs:
1. Create a new GitHub repository (e.g. `STEMREADY`).
2. Use GitHub Desktop: File → Clone Repository, select it, then copy all the
   files from this project folder (package.json, index.html, vite.config.js,
   the whole `src` folder, etc.) directly into that cloned folder — not into
   an extra subfolder.
3. Commit ("Initial STEMREADY project files") and Push origin.

## Part 4 — Deploy on Vercel

1. Go to vercel.com, Add New → Project, import your STEMREADY repo.
2. Add Environment Variables: `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`
   using the values from Part 1.
3. Click Deploy.

## Adding real photos/videos to the Gallery

Create a folder `public/images/stemsready-gallery/` in your project and drop
in files matching the names already referenced in `src/StemsReady.jsx`
(e.g. `aerospace-day.jpg`). Any file that doesn't exist yet just falls back
to its icon placeholder automatically — nothing breaks.

## Adding sponsor logos

Same approach: put logo files in `public/images/sponsors/`, then update the
`partners` array in the Sponsorship section of `src/StemsReady.jsx` with each
partner's name and logo path once sponsorships are confirmed.
