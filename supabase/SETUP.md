# Discrete Shadow — Supabase setup

One-time setup to move the site onto a real database + admin.

## 1. Create the project
- Go to https://supabase.com → New project. Free tier is fine.
- Wait for it to finish provisioning.

## 2. Run the schema
- Dashboard → SQL Editor → New query.
- Paste the contents of [`supabase/schema.sql`](./schema.sql) → Run.
- This creates the `artworks` table, security policies, and the `artworks` storage bucket.

## 3. Add the admin user
- Dashboard → Authentication → Users → Add user.
- Enter your email + a password. (This is your `/admin` login.)

## 4. Get your keys
- Dashboard → Project Settings → API. Copy:
  - **Project URL**
  - **anon public** key
  - **service_role** key (secret)

## 5. Configure the app
- Copy `.env.local.example` → `.env.local`
- Fill in the three values.
- `.env.local` is gitignored — never commit it.

## 6. Seed the database (migration)
Uploads the local artwork images to Supabase Storage and inserts every artwork:

```bash
npm run migrate
```

Re-running is safe — it upserts by slug.

## 7. Use it
- Public site automatically switches to reading from Supabase once the keys are set.
- Manage artworks at **/admin** (log in with the user from step 3).

---

### Keys reference
| Variable | Where | Exposed to browser? |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Settings → API | yes |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Settings → API | yes |
| `SUPABASE_SERVICE_ROLE_KEY` | Settings → API | **no — secret** |
