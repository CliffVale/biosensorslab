# Biosensors & Devices Lab — Website

Official website of the **Biosensors & Devices Lab**, Centre for Biomedical Engineering, IIT Delhi (PI: Dr. Naveen Kumar Singh).

- **Live site:** https://cliffvale.github.io/biosensorslab/
- **New here? Start with [`GUIDE.md`](GUIDE.md)** — a complete beginner's guide: update team, news, publications, patents, equipment, gallery photos… no coding knowledge needed.

---

## Repository Map

```
biosensorslab/
├── website-v2/              # ⭐ THE WEBSITE — all content & pages live here
│   ├── src/
│   │   ├── pages/           # 15 pages (home, team, publications, …)
│   │   ├── components/      # Reusable pieces (header, cards)
│   │   ├── content/         # ✏️ EDIT HERE — team, news, equipment, patents, publications (one text file per item)
│   │   ├── assets/          # 📷 All photos (team, equipment, gallery, branding)
│   │   ├── styles/          # Design system
│   │   ├── layouts/         # Page skeleton (head, header, footer)
│   │   └── config.ts        # Lab-wide settings: name, email, hero text, menu
│   ├── public/              # Static files (logos, favicon, robots.txt)
│   ├── scripts/             # BibTeX import (publications pipeline)
│   ├── citations.bib        # ✏️ Paste new paper citations here
│   └── package.json
├── .github/workflows/       # Auto-deploy: pushes to main → live site in ~2 min
├── DEPLOYMENT.md            # 🚀 Domain & server deployment plan (IITD)
├── GUIDE.md                 # 📘 How to edit anything (start here!)
└── README.md                # ← You are here
```

> **One rule:** all editing happens in `website-v2/`. Raw photo archives and old experiments are no longer tracked in git — keep them on your own machine or cloud drive.

---

## Quick Start (developers)

```bash
git clone https://github.com/CliffVale/biosensorslab.git
cd biosensorslab/website-v2
npm install
npm run dev      # local preview at http://localhost:4321/biosensorslab
npm run build    # production build (must pass before pushing)
```

## Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Framework | Astro | 5.16.x (do not upgrade) |
| Styling | Tailwind CSS | 4.x |
| UI | React | 19.x (interactive components only) |
| Search | Pagefind | 1.4.x |
| Language | TypeScript | 5.9.x |
| Node.js | ≥ 22.12.0 | — |

## Key Rules

**DO**
- Run `npm run build` after changes (or edit directly on GitHub — it checks for you)
- Use `basePath + '/route'` for internal links
- Use `<Image>` from `astro:assets` for images
- Add `rel="noopener noreferrer"` to external links
- Respect `prefers-reduced-motion`

**DON'T**
- Add dark mode (light-only by design)
- Use Google Fonts CDN (fonts are self-hosted)
- Place `import` after variable declarations in `.astro` frontmatter
- Use `transition: all` or animate from `scale(0)`

## Content Stats (auto-derived on the site)

The homepage numbers are computed from the content files at build time, so they
can never drift: 19 publications · 8 patents · 31 instruments · 12 researchers.

## Deployment

- **Current:** GitHub Pages — auto-deploys on every push to `main`
  (workflow: `.github/workflows/deploy.yml`)
- **Future (IITD domain):** set `base: '/'` in `astro.config.mjs`, update
  `SITE.website` in `src/config.ts`, update `public/robots.txt`, then rsync `dist/`
  to the CSC server (see `PROJECT_LOG.md` for the full checklist).

## Version History

| Version | Date | Changes |
|---------|------|---------|
| v2.4 | 2026-09-19 | Fixed 21 sideways equipment photos, wired Bhrigu photo, auto-derived homepage stats + count-up fix, dependabot/workflow updates, beginner GUIDE.md |
| v2.3 | 2026-09-08 | Real equipment photos, root deploy workflow |
| v2.2 | 2026-08-27 | Premium motion system |
| v2.0 | 2026-08-26 | Astro + Tailwind rewrite, 15 pages |
| v1.0 | 2026-08-19 | Original template |

---

**Maintained by:** CliffVale + AI assistants · **Questions?** Read [`GUIDE.md`](GUIDE.md) first.
