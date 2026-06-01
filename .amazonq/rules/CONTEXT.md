# CONTEXT — Developer & Project Rules
# Kutloano Moshao — Astar Technologies (PTY) Ltd

## About the Developer
- Name: Kutloano Moshao
- Company: Astar Technologies (PTY) Ltd
- Phone/WhatsApp: +27 67 159 1867
- Email: info@astartechnologies.co.za
- Website: https://astartechnologies.co.za
- Role: Software Engineering & Marketing Consultant (on-site)

## Tech Stack (Non-Negotiable)
- Frontend: React 18 + TypeScript + Vite
- UI: Tailwind CSS + shadcn/ui
- Backend: Supabase (PostgreSQL + Auth + Realtime + Storage)
- Hosting: Vercel
- PWA: vite-plugin-pwa + Workbox
- Version Control: GitHub

---

## RULES LEARNED FROM GREEN ACORN PROJECT

### 1. ADMIN PANEL — ALWAYS BUILD FROM DAY ONE
- Every piece of content that can change MUST be manageable from the admin panel
- NEVER hardcode: prices, menu items, room descriptions, contact details, opening hours, promotions
- Before handing over, verify the client can update everything without a developer

### 2. IMAGE COMPRESSION — ALWAYS COMPRESS BEFORE UPLOAD
- Maximum file size after compression: 800 KB
- Maximum dimensions: 1920 × 1080 px
- Format: JPEG for photos, PNG for logos
- Add compression to EVERY upload function from day one
- Uncompressed phone photos (8-10 MB each) will exhaust Supabase free storage quota fast

### 3. NEVER DISABLE RLS FOR TESTING
- Never disable Row Level Security "temporarily"
- If a query fails, fix the RLS policy — do not work around it
- Always use a SECURITY DEFINER function (is_admin()) to avoid circular dependencies
- Enable RLS on ALL tables from day one

### 4. NEVER HARDCODE CREDENTIALS
- Every secret goes in environment variables
- Never commit .env files
- Always add .env to .gitignore

### 5. SEPARATE GITHUB ACCOUNT FOR EACH CLIENT
- Never use personal GitHub account for client projects
- Set git config user.name and user.email to client account before first commit
- Vercel blocks deployments from unauthorized commit authors on Hobby plan

### 6. ALWAYS CHARGE A MONTHLY RETAINER
- Never do once-off only
- Retainer starts on go-live date
- Get signed contract before going live

### 7. USE .maybeSingle() NOT .single()
- .single() throws 406 error when table is empty
- .maybeSingle() returns null safely
- Use .maybeSingle() whenever a row might not exist

### 8. AVOID UPSERT WITHOUT CONFLICT HANDLING
- upsert without a matching id always inserts a new row
- Use explicit update when row exists, insert only when it doesn't
- Always fetch existing id before saving settings

### 9. TEST OFFLINE MODE BEFORE GOING LIVE
- Test with DevTools → Network → Offline
- Verify rooms, gallery, content load from cache
- Verify booking buttons show "Internet Required"
- South Africa has load shedding — offline support is critical

### 10. ADMIN PANEL MUST BE COMPLETE BEFORE HANDOVER
- Client must be able to update all prices without developer help
- Client must be able to upload images without developer help
- Client must be able to add promotions without developer help
- If any of these require a developer, the admin panel is incomplete

### 11. SUPABASE FREE PLAN LIMITS
- Storage: 1 GB
- Egress (bandwidth): 5 GB/month
- Projects: 2 active per account
- If quota exceeded, create new Supabase account (use client email)
- Always compress images to prevent hitting storage quota

### 12. ENVIRONMENT VARIABLES OVERRIDE ORDER (VITE)
- .env.local ALWAYS overrides .env
- When migrating Supabase projects, update BOTH .env AND .env.local
- Failing to update .env.local will keep pointing to old project

### 13. LOGO & BRANDING
- Always use the official client logo — never a placeholder
- Convert logos to circular PNG with transparent background using PIL
- Sizes: favicon 64x64, navbar/PWA 512x512, OG image 1200x630
- Remove ALL old/default logo files before going live
- Update: favicon, manifest.json, vite.config.ts, Header, Footer, OG tags

### 14. PRICING STRATEGY (NIGHTSBRIDGE INTEGRATION)
- Never show exact prices that require manual syncing with booking system
- Use: "From approx. RXXX/night*"
- Add: "*Prices vary based on dates & availability"
- CTA: "Check Availability on Live System" → links to Nightsbridge
- Add urgency: "⚡ Prices may increase during peak dates & weekends"

### 15. LEGAL PAGES ARE REQUIRED
- Privacy Policy (POPIA compliance) is legally required in South Africa
- Terms of Service protects the client from disputes
- Both pages must be functional before going live
- Footer links to /privacy and /terms must work

### 16. FOOTER CREDIT
- Always add: "Designed & developed by Astar Technologies (PTY) Ltd"
- Link to: https://astartechnologies.co.za
- Add WhatsApp icon next to text
- Use underline to signal it's clickable on mobile

### 17. COLOR CONSISTENCY
- Always verify Tailwind color values match brand hex codes
- Tailwind green-600 = #16a34a (NOT #059669)
- #059669 = Tailwind emerald-600
- Override in tailwind.config.ts if needed
- Check all window.open() calls use 'noopener,noreferrer'

### 18. GIT COMMIT AUTHOR
- Always set git config before committing:
  git config user.name "client-github-username"
  git config user.email "client@email.com"
- Vercel Hobby plan blocks deployments from unauthorized authors

### 19. REACT QUERY OFFLINE SUPPORT
- Use networkMode: 'offlineFirst'
- Use PersistQueryClientProvider with localStorage persister
- Use refetchOnReconnect: true
- Don't retry when offline: if (!navigator.onLine) return false

### 20. SITE SETTINGS TABLE
- Always use .maybeSingle() not .single()
- Always fetch with .order('created_at', { ascending: false }).limit(1)
- Use explicit update/insert not upsert to prevent duplicate rows
- Add about_image column for About page separate from hero_image

---

## Pre-Launch Checklist
- [ ] All prices in database (not hardcoded)
- [ ] Admin panel tested by client
- [ ] RLS enabled on ALL tables
- [ ] No hardcoded credentials
- [ ] Images compressed (max 800KB)
- [ ] Offline mode tested
- [ ] Mobile tested on real device
- [ ] Custom domain configured
- [ ] SSL certificate active (https)
- [ ] Retainer agreement signed
- [ ] Deposit received
- [ ] GitHub repo in client's account
- [ ] Environment variables set in Vercel
- [ ] Admin user created in database
- [ ] Privacy Policy page working (/privacy)
- [ ] Terms of Service page working (/terms)
- [ ] Footer credit links to astartechnologies.co.za
- [ ] Official logo used (not placeholder)
- [ ] Favicon set correctly
- [ ] OG meta tags set correctly
- [ ] No console.logs in production code
- [ ] Build passes with zero errors
