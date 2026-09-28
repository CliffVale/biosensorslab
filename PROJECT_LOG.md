# Biosensors & Devices Lab — Website Project Log

Chronological log of work. Append new entries; never rewrite history.

## 2026-08-26 — Deep audit + P0/P1 polish fixes
- **Full code audit** found: Inter font referenced but NEVER loaded (no @font-face anywhere),
  no 404 page, no sitemap/robots.txt, 12 `target="_blank"` without rel=noopener, no canonical tags,
  dead config flags (lightAndDarkMode/postPerPage/scheduledPostMargin), TeamCard/team-detail avatars
  bypassing astro:assets optimization, mobile-menu resize threshold 768 vs lg breakpoint 1024,
  CSP mismatch between meta tag and public/_headers (Google Fonts origins unused).
- **Fixed all of the above:**
  - @font-face added to global.css via relative Vite-resolved URLs (first attempt with dynamic
    `<style>{...}</style>` in Layout broke Tailwind build — Astro style tags can't take expressions);
    fonts copied to src/assets/fonts/, preloaded in Layout head. public/fonts kept for OG satori.
  - New branded `src/pages/404.astro` (hero-style badge, Back to Home + Search CTAs).
  - `@astrojs/sitemap@^3` installed; robots.txt added (sitemap URL has TODO note for iitd domain).
  - Canonical `<link>` from SITE.website + pathname in Layout head.
  - rel=noopener on every _blank link (verified: 0 files missing it).
  - TeamCard + team/[slug] avatars now use `<Image width={384}>`.
  - Mobile menu resize close threshold 768 → 1024 (matches lg:hidden hamburger visibility).
  - _headers CSP synced (dropped Google Fonts origins); config dead flags removed;
    footer wording "Room GPL-9 (lab relocating soon)"; skip-to-content link added to Layout.
  - OG image coverage extended: +pi, funding, courses, gallery, contact, important-links
    (generator static pages + new section icons).
- **Verified:** npm run build OK (43 pages incl. 404); astro check 0 errors/0 warnings/16 hints;
  404.html + sitemap-index.xml + robots.txt present; @font-face + preloads correct with /biosensorslab base.
- **Deploy checklist reminder:** when moving to biosensorslab.iitd.ac.in → set base:'/' in
  astro.config.mjs, SITE.website in config.ts, and Sitemap URL in public/robots.txt.

## 2026-08-25 — Hosting decision: CSC virtual web hosting, iitd.ac.in domain

## 2026-08-19 — Directory move + asset recovery + funding logos
- **Moved** entire working dir → `/home/cliff/Documents/Biosensors_and_devices_lab/`
  (`website/` = Astro project; `source-assets/` = raw images/scrapes for records).
- **Verified moved assets:** 21 equipment jpgs + covers, 11 team avatars, 21 equipment mds.
- **Re-downloaded funding logos** (after /tmp cleanup): ICMR (SVG, icmr.gov.in static),
  DBT (450x200 PNG from anrfonline.in imlinks), ICMR-DHR (542x166 JPG from schemes.dhr.gov.in),
  British Council (SVG from Wikimedia Commons). Saved to `website/src/assets/funding/`
  + archived to `source-assets/funding-logos-original/`.
- **Re-downloaded IITD official logo** (200x200 RGBA, home.iitd.ac.in/images/logo-iit.png).
- **Recovered all 10 old-site CDN images** via Playwright scrape of `lh3.googleusercontent.com`:
  - url-09 = IITD seal 300x300 PNG → `branding/iitd-seal.png`
  - url-06 = lab banner 1094x527 "Biosensors IIT-Delhi & Devices" → `branding/lab-logo-banner.png`
  - url-05 = links banner 1255x79 "One stop for all Aptamer data" → `branding/links-banner.jpg`
  - url-01 = small banner 473x238 → `branding/funding-banner.jpg`
  - url-00/02/03/04/07/08 = gallery photos → `gallery/` (newyear2025, birthday2025, labview, team1-3)
  - Raw files + URL lists archived to `source-assets/oldsite-images/`.
- **Created CONTEXT.md + PROJECT_LOG.md** at project root for maintainability.
- **ANRF logo:** only 71x36 low-res found on anrfonline.in; official logo unveiled at
  ESTC 2025 (FB/LinkedIn/Instagram posts). **TODO: replace with high-res.**
- **Note:** /tmp/opencode/funding and /tmp/opencode/oldsite were cleaned at least twice;
  always copy important files into the project immediately.

## TODO (next)
- [ ] Build Funding page (`/funding`) with 6 agency logos + descriptions.
- [ ] Build PI page, Courses, Gallery, Important Links, Contact pages.
- [ ] Wire IITD seal + lab banner into Header/footer/favicon.
- [ ] Add Bhrigu Ranjan team entry.
- [ ] Update `SITE.nav` + Header iconMap (13 items; maybe `lg:flex`).
- [ ] npm run build (32 pages) → astro check → Playwright verify → screenshots → present.

## 2026-08-19 (session 2) — Google Sites pivot + prototype freeze
- User decision: **final platform = Google Sites only** (no external hosting now). Astro build is now the *prototype/visual reference* for PI approval; real site gets assembled inside Google Sites.
- Fixed all 14 `astro check` type errors in new pages (lucide `className`, funding logos moved to `public/funding-logos/` as string paths) → **0 errors**.
- Rebuilt: **38 pages**, all verified 200 with **0 console/page errors** via self-contained Playwright harness (`/tmp/opencode/site-test/verify-all.mjs` — in-process server + checks, no bg processes).
- Screenshots (15, desktop+mobile) stashed in `preview-screenshots/` for PI review.
- Nav now 14 items (added PI, Funding, Courses, Gallery, Links, Contact); desktop breakpoint switched `md:flex` → `lg:flex`; IITD seal wired into Header + SITE.logo; favicon kept (lab DNA helix).
- NEXT: build `google-sites-kit/` (page-by-page content + images + assembly guide) so the site can be rebuilt in Google Sites by hand.

## 2026-08-25 — Hosting decision: CSC virtual web hosting, iitd.ac.in domain
- Prof confirmed: site must live on an IITD domain. Analyzed CSC pages:
  - Virtual Web Hosting (`xyz.iitd.ac.in`) = correct target; Apache/PHP8.2/MySQL, enforced HTTPS,
    shell access, ~3 working days, request must come from faculty to **webgroup@cc.iitd.ac.in**
    with: domain name, faculty contact, purpose, DB requirement (No), LDAP usernames for edit-access.
  - User web pages (`web.iitd.ac.in/~userid`) = personal only, rejected.
- Target domain: **biosensorslab.iitd.ac.in** (matches repo + old Google Sites identity).
- Domain check (RDAP): biosensor4health.com/.in/.org, biosensorhealth.com/.in,
  biosensordevicelab.com/.in, biosensorsanddevices.com/.in all AVAILABLE — not needed now;
  optional future purchase if a project brand is wanted.
- Deployment plan once provisioned: `rsync dist/ → /var/www/biosensorslab/https/html/` via scp/SSH,
  then `chgrp -R _biosensorslab` (CSC requires group-writable files). Static Astro output — no PHP/MySQL needed; Pagefind works as static assets.
- Draft request email prepared for Dr. Naveen to send from nks@iitd.ac.in (pending: LDAP usernames).

## 2026-08-20 — Polish & content refresh (commit 2c865a0, deployed)
- **Animations (deepsearch-backed, LCP/reduced-motion safe):** native cross-document View Transitions (`@view-transition { navigation: auto; }`, subtle 6px drift, header pinned via view-transition-name), IntersectionObserver scroll-reveal on section/page containers (html.js guard, no-JS safe), CSS hero entrance with small stagger, nav underline micro-interaction + persistent active state (aria-current), btn-press + image zoom micro-interactions, smooth anchor scrolling — all disabled under prefers-reduced-motion.
- **Home page declutter/sort:** hero → Research Areas teaser (top 4) → Selected Publications → Latest News → slim funding/affiliation strip (6 logos, grayscale→color hover). Consistent hover lift on all cards.
- **New Patents page** (nav after Publications, BadgeCheck icon, OG image): 8 filings exactly as provided — 202611089230 (multiplexed aptamer selection), JEEVAN ICMR-PM-PF-EM-2026-Apr-356, TOHFA_GM FT/IDF/9/2025/137·202611026610, 202611003292 (fluid dispensing), US provisional 63/428,466 (PSU 2022-5492), UCSD SD2021-018 (COVID glucometer), 201931039853 (OptiSense), 201831030902 (syringe NADP/NAD+).
- **Course added:** BML 8860 — Fundamentals of Electrochemistry for Clinical Applications (marked "New course offering").
- **Team members:** Manisha, Susmita (Research Scientists), Bhrigu Ranjan (Master Student). ⚠️ Bhrigu's photo NOT added (attached image unreadable by model; drop file at src/assets/team/bhrigu-ranjan.jpg and I'll wire the avatar).
- **Equipment (+10):** PalmSens EmStat, PalmSens 8MUX, Gel Documentation System, Protein Electrophoresis Setup, Analytical Weighing Balance, Soldering Station, Laminar Airflow Cabinet, Vacuum Oven, Orbital Shaker, Research Workstations (pH meter already present: Thermo Orion LabStar PH111).
- Verified: astro check 0 errors; build 42 pages; dist scan BAD:0 unprefixed links; Playwright — all 16 routes 200 & error-free, scroll-reveal 0→2→4, reduced-motion instant reveal, active nav correct on /patents, 8 patent cards, team groupings right. GitHub Actions deploy SUCCESS. Live at https://cliffvale.github.io/biosensorslab/

## 2026-09-28 — Redesign deployed + repo cleanup + CMS decision
- **Archived old repo** `CliffVale/biosensorslab-website` (labeled "⚠️ OLD / ARCHIVED" in description). `main` was byte-identical to live repo (same SHAs); only stale dependabot branches lost. Nothing of value.
- **shots.mjs**: never committed; added to `.gitignore` (machine-specific Playwright path).
- **"Lab Precision" redesign committed (`6fa44dc`) and deployed live** to https://cliffvale.github.io/biosensorslab/ — de-gradiented system, PageHead on 13 subpages, dark footer, Inter Variable font, research-page template boilerplate ("artificial intelligence…") replaced with correct lab lede, full Bhrigu Ranjan profile, footer address fixed to GPL-9. Verified: build ✅ astro check 0 errors ✅ live research page 200 with new text ✅.
- **Footer address contradiction resolved:** GPL-9 is current (per user); MS-817 draft reverted.
- **Non-technical editing: recommendation = Sitepins Cloud** (user's own pick, validated by research). Content already lives in `website-v2/src/content/*.md` — Sitepins auto-detects collections, every save = commit to main → auto-deploy. Editors invited by email, no GitHub account needed. Setup is user-side (OAuth in browser).

## 2026-09-28 (2) — De-AI audit / repo de-slop pass
- Deleted AI-workflow docs from website-v2/: PRD.md, phases.md, design.md, memory.md, rules.md, architecture.md, AI_SKILLS_ANALYSIS.md, REFERENCE_TEMPLATES_ANALYSIS.md, SETUP_GUIDE.md, AGENTS.md, CLAUDE.md, .coderabbit.yaml, .web-expert.json, .gitlab-ci.yml, .vscode/, nested .github/, template README.md + README.zh-CN.md + LICENSE
- Removed dead template code: src/pages/pi.astro (orphan route, merged into /team in c22fb12), src/i18n/ (unused), AgentationWrapper (AI-review browser tooling), agentation dep
- Trimmed config.ts template flags: ogImage/lightAndDarkMode/postPerPage/scheduledPostMargin/LOCALE/LOGO_IMAGE/SOCIALS/hero.action+image; Header customPages blocks removed (flag was always [])
- Removed public/assets/old-site-images (raw old-Google-Sites CDN scrapes were publicly served; originals already archived in source-assets/)
- Fixed research empty-state developer message -> visitor-appropriate text; GUIDE.md pi.astro ref fixed
- Verified: astro check 0/0, build clean, /pi absent from sitemap, no agentation in output
- Removed "Built with Scholar-Lite" template credit from footer; GUIDE.md updated (Sitepins as Method A, corrected research-area count, renamed stale file refs); README.md map + version history (v2.5) refreshed after repo cleanup.
