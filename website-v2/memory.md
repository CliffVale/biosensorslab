# Project Memory
## Biosensors & Devices Lab — Website

> Last updated: 2026-09-08
> This file tracks what has been completed, what's in progress, and current state.

---

## Current Status

| Item | Status |
|------|--------|
| **Build** | ✅ Passing (`npm run build` succeeds, 43 pages) |
| **Version** | v2.3 — Equipment photos + cleanup |
| **Deploy** | ✅ GitHub Pages (auto-deploy on push to `main`) |
| **Repo** | `https://github.com/CliffVale/biosensorslab-website.git` |
| **Current URL** | https://cliffvale.github.io/biosensorslab/ |
| **Target URL** | biosensorslab.iitd.ac.in (pending) |
| **Pages** | 16 pages (43 built with partials) |
| **Publications** | 19 papers (from BibTeX) |
| **Team Members** | 15 md files (PI + 14 members) |
| **Equipment** | 31 instruments (31 images, all real photos) |
| **Patents** | 8 filings |
| **Funding** | 6 agencies (all logos verified on live site) |

---

## What's Been Completed

### Core Infrastructure
- [x] Astro 5.16.2 (DO NOT upgrade)
- [x] Tailwind CSS v4 via Vite plugin
- [x] React integration for interactive components
- [x] Content collection schemas defined
- [x] Base path `/biosensorslab`
- [x] GitHub Actions auto-deploy workflow
- [x] BibTeX import pipeline (`scripts/import-bibtex.js`)
- [x] Pagefind search integration
- [x] OG image generation (Satori + Sharp)

### Pages Built
- [x] Home page (hero, stats, research, publications, news, equipment, funding)
- [x] Research page + 4 detail pages
- [x] PI page (Dr. Naveen Kumar Singh)
- [x] Publications page (19 papers)
- [x] Patents page (8 filings)
- [x] Equipment page (31 instruments, real photos)
- [x] Team page + detail pages (15 members)
- [x] Funding page (6 agencies)
- [x] Courses page
- [x] Gallery page
- [x] News page + detail pages
- [x] Important Links page
- [x] Contact page
- [x] Join Us page
- [x] Search page
- [x] 404 error page

### v2.3 — Equipment Photos + Cleanup + Deploy Fix (2026-09-08)
- [x] Removed leftover "Photos of each instrument are being added" placeholder text from equipment.astro
- [x] Replaced 10 placeholder equipment images (synthetic gradients 15-18KB) with real lab photos (90-244KB, resized 1400×1050)
  - analytical-balance.jpg, gel-doc-system.jpg, laminar-airflow-cabinet.jpg, orbital-shaker.jpg
  - palmsens-8mux.jpg, palmsens-emstat.jpg, protein-electrophoresis-setup.jpg
  - research-workstations.jpg, soldering-station.jpg, vacuum-oven.jpg
- [x] All 31 equipment images now show real lab photos (no synthetic placeholders remain)
- [x] Build verified: 43 pages, no errors
- [x] Fixed `biosensorslab` deploy: added root-level `.github/workflows/deploy.yml` with `working-directory: website-v2`
- [x] Live site verified: https://cliffvale.github.io/biosensorslab/ — equipment page shows real photos

### v2.2 Enhancements (2026-08-27)
- [x] Hero: Animated gradient mesh background
- [x] Hero: Floating particle animation (hidden on mobile)
- [x] Hero: Gradient text effect on title
- [x] Hero: Floating badge animation
- [x] Hero: Full-viewport height with flex centering
- [x] Cards: Premium hover with gradient border reveal
- [x] Cards: Deep shadow on hover (translateY -8px)
- [x] Section headers: Animated underline on hover
- [x] Buttons: Premium hover with glow shadow
- [x] Buttons: Shine overlay on hover
- [x] Stats: Glow effect on hover
- [x] Publications: Premium card treatment
- [x] News: Premium card treatment
- [x] Equipment: Animated underline header
- [x] Funding: Uppercase tracking label
- [x] Mobile: Particles hidden, mesh static, faster transitions
- [x] Added 15+ new CSS utility classes
- [x] Added section-wave divider CSS
- [x] Added reveal-up/left/scale animation variants

### v2.1 Enhancements (2026-08-27)
- [x] Custom CSS easing curves
- [x] Button press: scale(0.97) with 160ms ease-out
- [x] Scroll-reveal: enhanced easing + staggered grid children
- [x] Focus-visible styles for keyboard navigation
- [x] Mobile menu: fade + slide + staggered link entrance
- [x] Glow-card cursor tracking with radial gradient
- [x] Night-photo hover transitions
- [x] Signal trace SVG animation
- [x] Comprehensive reduced-motion overrides

### Visual Polish
- [x] Scroll-reveal animations (`[data-reveal]`)
- [x] Hero entrance animation
- [x] Native View Transitions
- [x] Stat counter animation (count-up)
- [x] Glow-card cursor tracking
- [x] Button press micro-interaction
- [x] Active nav state
- [x] Mobile menu with focus trap
- [x] Skip-to-content accessibility link
- [x] Custom scrollbar styling
- [x] Night-mode equipment strip
- [x] Funding logos grayscale → color
- [x] Landmark badge on Nature papers

### SEO & Meta
- [x] Canonical tags
- [x] robots.txt
- [x] Sitemap
- [x] Schema.org structured data
- [x] OG images for all pages
- [x] Self-hosted Inter font (no Google Fonts)

### Tools Installed
- [x] Taste Skill (anti-slop frontend)
- [x] Vercel web-design-guidelines (100+ audit rules)
- [x] Playwright CLI
- [x] CodeRabbit configured (`.coderabbit.yaml`)

### Documentation
- [x] PRD.md, design.md, architecture.md, rules.md, phases.md
- [x] memory.md (this file), CONTEXT.md, AGENTS.md
- [x] SETUP_GUIDE.md

---

## What's In Progress

### Currently Working On
- Nothing active — last commit `0356624` pushed to GitHub

### Blocked / Waiting
- [ ] IITD domain provisioning (waiting for faculty request)
- [ ] Bhrigu Ranjan photo (no source available)
- [ ] ANRF high-res logo (only low-res 71×36 available)

---

## What's Next (Priority Order)

### High Priority
1. **Performance audit** — Run Lighthouse, fix any issues
2. **Accessibility audit** — Run axe-core, fix issues

### Medium Priority
3. **Image optimization** — Convert to WebP, add lazy loading where missing
4. **Add analytics** — Google Analytics or Plausible

### Low Priority
5. **Dark mode toggle** (if PI requests)
6. **Publications filter** (by year/topic)
7. **Google Scholar integration**

---

## Key Files Reference

### Configuration
| File | Purpose |
|------|---------|
| `astro.config.mjs` | Astro config (base path, integrations) |
| `src/config.ts` | Site metadata, nav, hero, lab info |
| `src/content.config.ts` | Content collection schemas |
| `.coderabbit.yaml` | AI code review config |
| `.github/workflows/deploy.yml` | CI/CD pipeline |

### Layout & Components
| File | Purpose |
|------|---------|
| `src/layouts/Layout.astro` | Main layout (head, header, footer, SEO) |
| `src/components/Header.astro` | Sticky header + mobile menu |
| `src/components/PublicationItem.astro` | Publication card |
| `src/components/TeamCard.astro` | Team member card |

### Styles
| File | Purpose |
|------|---------|
| `src/styles/global.css` | Tailwind + custom animations |

### Content
| Directory | Content |
|-----------|---------|
| `src/content/publications/` | Auto-generated from BibTeX |
| `src/content/research/` | 4 research areas |
| `src/content/team/` | 15 team member profiles |
| `src/content/news/` | Lab news items |
| `src/content/patents/` | Patent filings |
| `src/content/equipment/` | 31 lab instruments |

### Assets
| Directory | Content |
|-----------|---------|
| `src/assets/fonts/` | Self-hosted Inter (woff2) |
| `src/assets/branding/` | IITD seal, lab banner, lab logo |
| `src/assets/equipment/` | 31 equipment photos (all real lab images) |
| `src/assets/team/` | Team member photos |
| `src/assets/funding/` | 6 funding agency logos |
| `public/funding-logos/` | Funding logos (string paths) |

---

## Common Issues & Fixes

### Build Error: "Unterminated string literal"
**Cause:** `import` statements placed after variable declarations in frontmatter.
**Fix:** Move all `import` statements to the TOP of the `---` frontmatter block.

### Build Error: Tailwind CSS not processing
**Cause:** Using expressions in `<style>` tags.
**Fix:** Move styles to `global.css` or use Tailwind utility classes.

### Image not loading
**Cause:** Using raw `<img>` instead of `astro:assets` `<Image>`.
**Fix:** Use `<Image src={importedAsset} ... />` pattern.

### Link not working
**Cause:** Missing `basePath` prefix.
**Fix:** Use `basePath + '/route'` for all internal links.

---

## Git History (Recent)

| Commit | Description |
|--------|-------------|
| `3257c12` | fix: add root-level deploy workflow for biosensorslab monorepo |
| `b3bff03` | chore: trigger deploy |
| `0356624` | fix: replace 10 placeholder equipment photos with real lab images, remove leftover placeholder text |
| `f4c9030` | Fix visual issues: header logo, hero SVG, equipment covers, ANRF logo |
| `7f7ac73` | Add SEO assets: favicon.ico, favicon.png, manifest.json, sitemap integration |
| `bc9b8a7` | Add master README + cleanup repo structure |
| `15f8f6e` | Initial commit: Biosensors Lab Website v1 + v2.2 |

---

## Notes for AI Assistants

1. **Read this file FIRST** before making changes
2. **Check build status** — Run `npm run build` before and after changes
3. **Follow rules.md** — Strict guidelines for this project
4. **Update this file** — After completing any significant work
5. **No dark mode** — This is light-only by design
6. **Self-hosted fonts** — Never add Google Fonts CDN
7. **basePath required** — All internal links need `/biosensorslab/` prefix
8. **No placeholders** — All equipment images must be real photos, not synthetic gradients
