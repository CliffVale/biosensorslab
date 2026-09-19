# 🚀 Deployment Plan — Biosensors & Devices Lab Website

> **Status:** GitHub Pages live · IITD domain approved (DNS mapping requested)
> **Last updated:** 2026-09-19

---

## 0. Current State

| Item | Value |
|------|-------|
| Live site (now) | https://cliffvale.github.io/biosensorslab/ |
| Source repo | `CliffVale/biosensorslab` (this repo) |
| Deploy method | GitHub Actions → GitHub Pages on every push to `main` |
| Approved domain | **biosensorlab.iitd.ac.in** → **10.10.211.213** |

> ⚠️ **Naming flag:** the email says `biosensorlab` (no "s"), the repo/GH-Pages path is
> `biosensorslab` (with "s"). Everything in this plan uses the **email's spelling**
> (`biosensorlab.iitd.ac.in`). Confirm with CSC which name is actually registered before
> wiring DNS + certificates — every config line below must match it exactly.

### What the DNS email means

CSC will point `biosensorlab.iitd.ac.in` at **10.10.211.213** — an IITD-internal address,
i.e. the site will be **self-hosted on CSC's virtual web hosting** (Apache server), not on
GitHub Pages. Per CSC documentation (csc.iitd.ac.in → Services → Web Services → Virtual
Web Hosting):

- Apache with PHP 8.2 / MySQL available (we need **neither** — static files only)
- **Enforced HTTPS** (certificate provisioned by CSC)
- Shell/SSH access for listed LDAP users; files served from
  `/var/www/<domain>/https/html/`
- Files must be **group-readable/writable** by the site group (typically `_biosensorlab`)

---

## 1. One-Time: Get Server Access

1. PI (faculty) must have sent the original request to `webgroup@cc.iitd.ac.in` from an
   IITD email, listing the **LDAP usernames** that get edit access (≤ needed: PI + 1–2
   students). ⚠️ CSC ignores requests from non-faculty senders.
2. Once CSC confirms provisioning, test from the campus network (or VPN):

```bash
ssh <your-ldap>@biosensorlab.iitd.ac.in
# you should land in your home dir; docroot lives at:
ls /var/www/biosensorlab/https/html/
```

3. Set up key-based login (avoids password prompts in deploy scripts):

```bash
ssh-keygen -t ed25519                      # if you don't have a key
ssh-copy-id <your-ldap>@biosensorlab.iitd.ac.in
```

---

## 2. Rebuild the Site for the New Domain

The site currently builds with base path `/biosensorslab/` for GitHub Pages. For the
domain root, **five files change**:

| # | File | Change |
|---|------|--------|
| 1 | `website-v2/astro.config.mjs` | `site: 'https://biosensorlab.iitd.ac.in'`, `base: '/'` |
| 2 | `website-v2/src/styles/global.css` | two `@font-face` URLs: `/biosensorslab/fonts/…` → `/fonts/…` |
| 3 | `website-v2/src/config.ts` | `SITE.website: 'https://biosensorlab.iitd.ac.in/'` |
| 4 | `website-v2/public/robots.txt` | Sitemap line → `https://biosensorlab.iitd.ac.in/sitemap-index.xml` |
| 5 | `website-v2/public/manifest.json` | `start_url` and `scope` → `/` |

Then:

```bash
cd website-v2
npm run build
# sanity: NOTHING in dist may point at the old base path:
grep -rl "/biosensorslab/" dist/ && echo "❌ old base still present" || echo "✅ clean"
```

Commit these changes on a branch (e.g. `iitd-domain`) until the domain is live, then merge.

---

## 3. Deploy to the CSC Server

From the `website-v2` directory with the domain build:

```bash
# 1. Upload (note: --delete keeps the server identical to dist/)
rsync -avz --delete dist/ <your-ldap>@biosensorlab.iitd.ac.in:/var/www/biosensorlab/https/html/

# 2. Fix group + permissions (CSC requirement — group name may differ; check with `ls -l` on server)
ssh <your-ldap>@biosensorlab.iitd.ac.in \
  "chgrp -R _biosensorlab /var/www/biosensorlab/https/html && \
   chmod -R g+rX /var/www/biosensorlab/https/html"
```

### Recommended: `.htaccess` (possible on CSC Apache, impossible on GitHub Pages)

Drop this file into `dist/` **before rsync** (or into the html dir once):

```apache
# --- caching: hashed assets are immutable, HTML always fresh ---
<IfModule mod_headers.c>
  Header set X-Content-Type-Options "nosniff"
  Header set X-Frame-Options "DENY"
  Header set Referrer-Policy "strict-origin-when-cross-origin"
  Header set Strict-Transport-Security "max-age=31536000; includeSubDomains"
  <FilesMatch "\.(css|js|woff2?|png|jpg|jpeg|webp|svg|ico)$">
    Header set Cache-Control "public, max-age=31536000, immutable"
  </FilesMatch>
  <FilesMatch "\.html$">
    Header set Cache-Control "no-cache, must-revalidate"
  </FilesMatch>
</IfModule>
```

### Verify after first upload

- [ ] `https://biosensorlab.iitd.ac.in/` loads (HTTPS enforced by CSC)
- [ ] All 16 routes return 200 (`/research/ /pi/ /publications/ /patents/ /equipment/
      /team/ /funding/ /courses/ /gallery/ /news/ /important-links/ /contact/ /join/ /search/`)
- [ ] Search works (Pagefind loads from `/pagefind/…` — it is base-path sensitive)
- [ ] Fonts load (check DevTools → Network → filter `woff`)
- [ ] OG image renders: view-source has `og:image` at the new domain
- [ ] A wrong URL shows the branded 404 (CSC Apache serves `404.html` automatically only
      if `ErrorDocument` is set — add `ErrorDocument 404 /404.html` to `.htaccess` if not)

---

## 4. Keep / Retire GitHub Pages

Two sane options (pick one):

- **Option A — archive (recommended, zero effort):** leave the GH Pages site up as-is.
  It stays at the old URL, frozen, as a hot backup. Add one line at the top of the old
  site's homepage later if you want to point visitors to the new domain.
- **Option B — redirect:** GitHub Pages can't do server-side redirects for arbitrary
  paths. Minimum viable: replace `dist/index.html` of a *separate* tiny redirect repo, or
  add a `<meta http-equiv="refresh" content="0;url=https://biosensorlab.iitd.ac.in/">`
  banner. Not urgent — the old URL has little SEO history yet.

Either way: **do not delete the repo or the Actions workflow** — it remains the staging/
backup environment and the rsync source.

---

## 5. Day-Zero Checklist After Going Live

- [ ] **Google Search Console:** verify `biosensorlab.iitd.ac.in` (DNS TXT via CSC or
      HTML file in dist), submit `https://biosensorlab.iitd.ac.in/sitemap-index.xml`
- [ ] **Update the old sitemap pointer:** old GH Pages robots.txt already points to its
      own sitemap — fine; new domain gets fresh indexing via GSC
- [ ] **Google Scholar profile:** set homepage to the new domain (PI's Scholar account)
- [ ] **Analytics (optional, decide with PI):** privacy-friendly options: Plausible
      (paid) / GoatCounter (free for non-profits) / GA4 (heavier, needs consent notice
      in the EU; India has no cookie-law equivalent yet — still prefer lightweight)
- [ ] **Uptime monitor:** free tier of UptimeRobot/BetterStack on the new URL
- [ ] **Announce:** CBME department page link, IITD pages, lab email signature,
      QR code on the lab door poster → new domain
- [ ] **Backups:** the git repo *is* the backup; server holds only generated files

---

## 6. Ongoing Content Updates (after domain go-live)

```bash
# edit content (see GUIDE.md), then:
cd website-v2 && npm run build
git add -A && git commit -m "content: ..." && git push        # updates GH Pages backup
rsync -avz --delete dist/ <ldap>@biosensorlab.iitd.ac.in:/var/www/biosensorlab/https/html/
ssh <ldap>@biosensorlab.iitd.ac.in "chgrp -R _biosensorlab /var/www/biosensorlab/https/html && chmod -R g+rX /var/www/biosensorlab/https/html"
```

**Future automation (optional):** a GitHub Action that rsyncs on every push to `main`
using secrets `SSH_HOST`, `SSH_USER`, `SSH_PRIVATE_KEY` — ~20 lines. Ask when ready;
not set up now because SSH credentials for the server don't exist in this repo yet.

---

## 7. Rollback Plan

- Site files are disposable: any previous `dist/` can be re-rsynced in seconds.
- Keep the last-known-good build: `tar -C website-v2/dist -czf ~/backup-$(date +%F).tgz .`
- Worst case, DNS can be re-pointed or the GH Pages site kept as the public face while
  the server is fixed.

---

## 8. Contact Points

| Need | Contact |
|------|---------|
| DNS/SSL/server issues, group permissions | `webgroup@cc.iitd.ac.in` (from faculty email) |
| Domain was requested by | Dr. Naveen Kumar Singh (`nks@iitd.ac.in`) |
| Email text (keep for records) | "Please create DNS mapping for biosensorlab.iitd.ac.in to 10.10.211.213." |
