# 07 — Lessons Learned from Green Acorn

**Author:** Kutloano Moshao
**Date:** 2026
**Project:** Green Acorn Guest House PWA — Ficksburg, Free State

---

These are real lessons learned from building the Green Acorn Guest
House booking system. Read this before starting every new project.

---

## Lesson 1: Always Build the Admin Panel First

**What happened:**
The menu prices were hardcoded in `RestaurantMenu.tsx`. Every time
prices changed, a developer had to edit the code, rebuild, and redeploy.
The client had no way to update prices herself.

**The fix:**
Added a Menu Management tab to the admin panel connected to the
`menu_items` database table. Now the owner updates prices herself.

**The rule:**
Every piece of content that can change must be manageable from the
admin panel. Never hardcode:
- Prices
- Menu items
- Room descriptions
- Contact details
- Opening hours
- Promotions

Ask yourself before coding anything: "Will this ever need to change?
If yes, it goes in the database with an admin interface."

---

## Lesson 2: Always Compress Images Before Upload

**What happened:**
Phone cameras produce images of 8-10 MB each. 111 images were uploaded
without compression. Storage reached 472 MB — nearly at the 1 GB free
limit. The Supabase account received a quota exceeded warning.

**The fix:**
Added a `compressImage()` function to all three upload components
(ImageUploader, RoomsManagement, SiteSettings). Images are now
compressed to max 800 KB before upload — a 92% reduction.

**The rule:**
Always compress images before uploading to any storage service.
- Maximum file size: 800 KB
- Maximum dimensions: 1920 × 1080 pixels
- Format: JPEG for photos, PNG for logos only
- Add compression to every upload function from day one

---

## Lesson 3: Never Disable RLS "Temporarily for Testing"

**What happened:**
A migration file (`20240205000002_disable_rls_temp.sql`) disabled
Row Level Security on 4 tables "for testing." It was never re-enabled.
Supabase sent a critical security warning — sensitive guest data
(names, emails, phone numbers) was publicly accessible.

**The fix:**
Re-enabled RLS on all 13 tables and created proper policies.

**The rule:**
Never disable RLS. If a query is failing, fix the RLS policy.
Do not work around it by disabling security.
Always test with RLS enabled from the start.

---

## Lesson 4: Never Hardcode Credentials

**What happened:**
Early versions of the project had Supabase URLs and keys hardcoded
in files that were committed to GitHub. This exposed credentials
publicly.

**The fix:**
Moved all credentials to `.env` files and added `.env` to `.gitignore`.

**The rule:**
Every secret goes in an environment variable. No exceptions.
- Supabase URL → `VITE_SUPABASE_URL`
- Supabase key → `VITE_SUPABASE_ANON_KEY`
- Any API key → environment variable
- Any password → environment variable

---

## Lesson 5: Use Separate GitHub Accounts for Clients

**What happened:**
The project was initially committed from the personal GitHub account
(`pieter255`). When the repo was transferred to `greenacorn-guesthouse`,
Vercel blocked deployments because the commit author (`pieter255`)
did not have access to the new account. Deployments stopped working.

**The fix:**
Changed git config to use `greenacorn-guesthouse` as the commit author.
Made an empty commit to trigger a new deployment from the correct account.

**The rule:**
From day one, set up a GitHub account for the client using their
business email. Configure git to commit as that account:
```
git config user.name "client-github-username"
git config user.email "client@email.com"
```

---

## Lesson 6: Always Charge a Monthly Retainer

**What happened:**
The Green Acorn project was built over weeks with significant effort.
No formal retainer agreement was in place from the start.

**The rule:**
Before going live, have the client sign a retainer agreement.
The retainer starts on the go-live date.
Never go live without a signed retainer agreement.

---

## Lesson 7: The `.single()` vs `.maybeSingle()` Problem

**What happened:**
The Hero component used `.single()` to fetch site settings from
Supabase. When the `site_settings` table was empty, `.single()`
threw a 406 error and the hero section broke.

**The fix:**
Changed all `.single()` calls to `.maybeSingle()` which returns
`null` instead of throwing an error when no row exists.

**The rule:**
Use `.maybeSingle()` when a row might not exist.
Use `.single()` only when you are certain exactly one row exists.

---

## Lesson 8: The Upsert Duplicate Row Problem

**What happened:**
The site settings upsert was creating a new row every time instead
of updating the existing one. This happened because `upsert` without
a matching `id` always inserts. The `site_settings` table ended up
with 8 duplicate rows, each with a different hero image. The hero
section showed the wrong (oldest) image.

**The fix:**
Changed the upsert to an explicit `update` when a row exists,
and `insert` only when no row exists. Also changed the Hero query
to fetch the most recent row using `.order('created_at', { ascending: false })`.

**The rule:**
Never use `upsert` without understanding exactly how it handles
conflicts. Always test insert/update logic with an empty table first.

---

## Lesson 9: Test Offline Mode Before Going Live

**What happened:**
The offline banner was implemented but the service worker was only
caching API responses in production mode. In development, the app
showed no cached data when offline. The client tested it and reported
that rooms were not visible offline.

**The fix:**
Removed the `mode === 'production'` condition from the PWA config.
Added React Query persistence to localStorage. Changed `networkMode`
to `offlineFirst`.

**The rule:**
Test offline mode before every deployment:
1. Open DevTools → Network → Offline
2. Refresh the page
3. Verify rooms, gallery, and content load from cache
4. Verify booking buttons show "Internet Required"

---

## Lesson 10: Document Everything in the Admin Panel

**What happened:**
The admin panel had no menu management tab. The client had no way
to update menu prices without calling a developer. This is not
acceptable for a production app.

**The fix:**
Added a full Menu Management tab with:
- View all items by category
- Add, edit, delete items
- Toggle availability (sold out today)
- Filter by category

**The rule:**
Before handing over any project, verify the client can:
- Update all prices without your help
- Upload new images without your help
- Add new promotions without your help
- Change contact details without your help
- Update opening hours without your help

If any of these require a developer, the admin panel is incomplete.

---

## Bonus Lesson: The RLS Circular Dependency Problem

**What happened:**
RLS policies on `user_roles` were checking `user_roles` to verify
admin access — causing infinite recursion. The database returned
500 errors on every query.

**The fix:**
Created a `SECURITY DEFINER` function called `is_admin()` that
bypasses RLS when checking the `user_roles` table. All other
table policies call `is_admin()` instead of querying `user_roles`
directly.

**The rule:**
When writing RLS policies that reference another table, use a
`SECURITY DEFINER` function to avoid circular dependencies.

---

*Read this file before starting every new project.*
*These mistakes cost hours to fix. Learn from them once.*
