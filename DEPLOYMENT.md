# Rosenhof — Vercel Deployment & DNS Setup Guide

## STEP 1 — Push to GitHub

```bash
# Set git config to client's GitHub account (Rule 18)
git config user.name "rosenhof-github-username"
git config user.email "info@rosenhofcountrylodge.co.za"

git init
git add .
git commit -m "Initial commit — Rosenhof Exclusive Country Lodge"
git remote add origin https://github.com/CLIENT_GITHUB/rosenhof-retreat-website.git
git push -u origin main
```

---

## STEP 2 — Deploy to Vercel

1. Go to https://vercel.com → Log in with the client's GitHub account
2. Click **Add New Project** → Import the `rosenhof-retreat-website` repo
3. Framework: **Vite** (auto-detected)
4. Build command: `npm run build`
5. Output directory: `dist`
6. Click **Environment Variables** and add:

| Key | Value |
|-----|-------|
| `VITE_SUPABASE_URL` | `https://qlkvpydibzzbcbixtzxc.supabase.co` |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | `eyJhbGci...` (full anon key) |
| `VITE_SUPABASE_PROJECT_ID` | `qlkvpydibzzbcbixtzxc` |

7. Click **Deploy**

---

## STEP 3 — Add Custom Domain on Vercel

1. In Vercel project → **Settings** → **Domains**
2. Add: `rosenhofcountrylodge.co.za`
3. Add: `www.rosenhofcountrylodge.co.za`
4. Vercel will show you DNS records to add — copy them

---

## STEP 4 — Configure DNS on xneelo (KonsoleH)

1. Log into https://konsole.xneelo.co.za
2. Go to **rosenhofcountrylodge.co.za** → **DNS Management**
3. Delete any existing A records for `@` and `www`
4. Add the following records:

### For the apex domain (rosenhofcountrylodge.co.za):
| Type | Name | Value | TTL |
|------|------|-------|-----|
| `A` | `@` | `76.76.21.21` | 3600 |

### For www (www.rosenhofcountrylodge.co.za):
| Type | Name | Value | TTL |
|------|------|-------|-----|
| `CNAME` | `www` | `cname.vercel-dns.com` | 3600 |

> ⚠️ DNS propagation takes 15 minutes to 24 hours.
> ⚠️ Do NOT delete the MX records — those are needed for email to work.

---

## STEP 5 — Verify SSL

Vercel automatically provisions a free SSL certificate (HTTPS) once DNS propagates.
Check: https://rosenhofcountrylodge.co.za — should show 🔒 padlock.

---

## STEP 6 — Update Supabase Auth Settings

1. Go to Supabase → **Authentication** → **URL Configuration**
2. Set **Site URL** to: `https://rosenhofcountrylodge.co.za`
3. Add to **Redirect URLs**: `https://rosenhofcountrylodge.co.za/**`

---

## STEP 7 — Post-Launch Checklist

- [ ] https://rosenhofcountrylodge.co.za loads correctly
- [ ] https://www.rosenhofcountrylodge.co.za redirects to apex
- [ ] SSL padlock visible
- [ ] Admin login works at https://rosenhofcountrylodge.co.za/admin/login
- [ ] Book Now opens Nightsbridge (update URL when client gets real one)
- [ ] Contact details updated in admin panel → Site Content
- [ ] Rooms have images uploaded
- [ ] Privacy Policy loads at /privacy
- [ ] Terms of Service loads at /terms
- [ ] OG image shows when link shared on WhatsApp
- [ ] Email works — info@rosenhofcountrylodge.co.za receives test email
