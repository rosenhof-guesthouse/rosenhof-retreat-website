# 04 — Infrastructure Costs

**Author:** Kutloano Moshao
**Date:** 2026

---

## What You Pay vs What You Charge

The key to profitability is understanding your actual costs and
marking them up appropriately. You are not just reselling hosting —
you are providing a managed service.

---

## Per Client Monthly Costs

| Service | Free Plan | Pro Plan | Notes |
|---------|-----------|----------|-------|
| Vercel hosting | R0 | R380/month | Upgrade when bandwidth exceeded |
| Supabase database | R0 | R470/month | Upgrade when storage > 500MB |
| Domain renewal | R13/month (R150/year) | - | Always renew on time |
| Your time (2-4 hrs support) | - | R700 – R2,000 | At your hourly rate |
| **Total cost** | **~R13/month** | **~R863/month** | Depending on plan |

---

## Free Plan Limits (Know These)

### Vercel Free (Hobby)
- 1 project per account
- 100 GB bandwidth/month
- Unlimited deployments
- Custom domains included
- **Limitation:** Only 1 GitHub account can deploy

### Supabase Free
- 2 active projects per account
- 500 MB database storage
- 1 GB file storage
- 50,000 monthly active users
- **Limitation:** Project paused after 1 week of inactivity

### When to Upgrade

**Upgrade Vercel to Pro when:**
- Client has high traffic (>100 GB bandwidth/month)
- You need multiple team members to deploy
- Client needs advanced analytics

**Upgrade Supabase to Pro when:**
- Storage exceeds 500 MB (images pile up fast)
- Database exceeds 500 MB
- Client needs more than 50,000 monthly users

---

## Storage Management (Critical)

The biggest cost driver is image storage. Unmanaged, it grows fast.

**Green Acorn example:**
- 111 images uploaded
- Average size: 4-10 MB each (uncompressed phone photos)
- Total: 472 MB — nearly at the 1 GB free limit
- Fix: Compress all images to max 800 KB before upload

**Rule:** Always compress images before upload.
- Phone camera: 10 MB → After compression: 800 KB
- Savings: 92% reduction in storage usage
- 111 images × 800 KB = 89 MB (vs 472 MB uncompressed)

---

## Recommended Account Structure

### Option A: One Account Per Client (Recommended)
- Create a Supabase account with client's email
- Create a Vercel account with client's email
- Client owns their own data
- You manage it on their behalf
- **Pros:** Client owns everything, clean separation
- **Cons:** More accounts to manage

### Option B: Your Agency Account
- One Supabase Pro account for all clients
- One Vercel Pro account for all clients
- You manage everything centrally
- **Pros:** Cheaper, easier to manage
- **Cons:** You own client data (liability risk)
- **Cost:** ~R850/month covers unlimited clients on Pro

---

## Cost Comparison: Free vs Pro

### Scenario: 5 clients, all on free plans
- Your cost: R0/month (just your time)
- You charge: R9,000/month
- Profit: ~R9,000/month

### Scenario: 5 clients, all need Pro
- Vercel Pro: R380 × 5 = R1,900/month
- Supabase Pro: R470 × 5 = R2,350/month
- Your cost: R4,250/month
- You charge: R9,000/month
- Profit: ~R4,750/month

### Scenario: Agency account (1 Pro account, 5 clients)
- Vercel Pro: R380/month (covers all clients)
- Supabase Pro: R470/month (covers all clients)
- Your cost: R850/month
- You charge: R9,000/month
- Profit: ~R8,150/month ← Best option at scale

---

## Domain Costs

| Registrar | .co.za | .com | Notes |
|-----------|--------|------|-------|
| xneelo | ~R150/year | ~R200/year | Good SA support |
| Afrihost | ~R130/year | ~R180/year | Competitive pricing |
| Domains.co.za | ~R120/year | ~R170/year | Cheapest SA option |

**Always register domains in the client's name.**
**Never in your own name.**

---

## Annual Infrastructure Budget Per Client

| Item | Annual Cost |
|------|------------|
| Domain renewal | R150 |
| Supabase (free tier) | R0 |
| Vercel (free tier) | R0 |
| **Total (free tier)** | **R150/year** |
| Supabase Pro (if needed) | R5,640/year |
| Vercel Pro (if needed) | R4,560/year |
| **Total (Pro tier)** | **R10,350/year** |

---

*Review infrastructure costs every 6 months.*
*Technology pricing changes frequently.*
