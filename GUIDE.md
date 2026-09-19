# 📘 Website Guide — For Beginners (No Coding Needed)

Welcome! This guide explains **everything** you need to change, add, or edit anything on the Biosensors & Devices Lab website — even if you have never edited a website before.

> **The short version:** the website is a folder of text files and photos. To change something, you edit a text file. To publish, you click one button (or push). That's it.

---

## 1. How This Website Works (30-second explanation)

The website is like a **printing shop**:
- The **files in this repository** are the manuscript (content: names, papers, photos).
- A free service called **GitHub** stores the files (the "repo").
- Another free service called **GitHub Pages** automatically "prints" the website from those files every time the files are updated.

```
You edit a file  →  You "commit & push" (save to GitHub)  →  Website updates in ~2 minutes
```

**Live website:** https://cliffvale.github.io/biosensorslab/

---

## 2. Two Ways to Make Changes

| Method | Best for | Skills needed |
|--------|----------|---------------|
| **A. Edit on GitHub.com** (in your browser) | Quick fixes: a name, a date, a news item | None — just a browser |
| **B. Edit on your computer** | Adding photos, big changes, batch edits | Install 2 free programs once |

---

### Method A — Edit directly on GitHub.com (easiest)

1. Go to https://github.com/CliffVale/biosensorslab
2. Navigate to the file you want to change (use the map in section 6 below).
3. Click the **pencil icon ✏️** (top-right of the file content).
4. Make your edit. Follow the templates in section 5.
5. Click **"Commit changes"** (green button, top right).
6. Done! The site rebuilds automatically in ~2 minutes. Check the green tick ✅ at
   https://github.com/CliffVale/biosensorslab/actions

### Method B — Edit on your computer (one-time setup)

1. **Install Node.js** (the "printing engine"): download the **LTS** version from
   https://nodejs.org and click Next-Next-Next.
2. **Install VS Code** (a friendly text editor): https://code.visualstudio.com
3. **Download the website folder** ("clone"): in VS Code press `Ctrl+Shift+P`, type
   `Git: Clone`, paste `https://github.com/CliffVale/biosensorslab.git`, pick a folder.
4. Open the project. Open the built-in terminal (`Ctrl+` `) and run:

```bash
cd website-v2
npm install        # one time only
npm run dev        # starts a local preview at http://localhost:4321/biosensorslab
```

5. Edit any file — the preview updates live in your browser.
6. When happy: click the **Source Control** icon in VS Code → type a short message → **Commit** → **Sync Changes**. The live site updates in ~2 minutes.

> ⚠️ **Golden rule:** the live site only changes when changes reach GitHub. Nothing can break by experimenting locally — just don't push until you've run `npm run build` once without errors (section 7).

---

## 3. Where Everything Lives (file map)

All content lives in **`website-v2/src/content/`** — one text file per item:

| I want to… | Go to folder | Notes |
|------------|--------------|-------|
| Add/edit a **team member** | `src/content/team/` | One file per person + their photo in `src/assets/team/` |
| Post **lab news** | `src/content/news/` | One file per news item |
| Add **equipment / instrument** | `src/content/equipment/` | One file per instrument + photo in `src/assets/equipment/` |
| Add a **publication** | `src/content/publications/` | Usually via BibTeX (section 5.5) |
| Add a **patent** | `src/content/patents/` | One file per patent |
| Edit a **research area** | `src/content/research/` | 4 areas = 4 files |
| Change **phone / email / address** | `src/pages/contact.astro` | Plain text inside |
| Change **hero text, lab name, menu** | `website-v2/src/config.ts` | Clearly labelled sections |
| Add **gallery photos** | `src/assets/gallery/` + `src/pages/gallery.astro` | 2-line change (section 5.6) |
| Replace a **photo of anything** | `src/assets/…` | Same filename = automatic replacement |

**Photos** live in `website-v2/src/assets/` and are referenced by the text files.
**The lab logo, IITD seal, funding logos** are in `src/assets/branding/` and `public/funding-logos/`.

---

## 4. Plain-Language Rules

1. **Frontmatter** = the small block between `---` lines at the top of each file. It's a form: fill the fields, keep the quotes.
2. **Don't rename files that are linked elsewhere.** Team/equipment pages are linked by filename.
3. **Photo sizes:** team avatars ~400×500 px (portrait), equipment 1400×1050 px, gallery any size. JPG format. (The build resizes automatically, but smaller files load faster.)
4. **After ANY change:** `npm run build` must finish without errors before you push (Method A on GitHub.com checks this automatically — if the green tick turns red ❌, undo your last change, see section 8).
5. Dates in news files use format `date: 2026-09-19` (no quotes).

---

## 5. Recipes (copy → paste → fill in)

### 5.1 Add a team member

**Photo first:** save their photo to `website-v2/src/assets/team/firstname-lastname.jpg` (portrait, ~400×500 px).

Then create a file `website-v2/src/content/team/firstname-lastname.md`:

```markdown
---
name: "Full Name"
role: "PhD Student"
avatar: "../../assets/team/firstname-lastname.jpg"
bio: "One or two lines about their research."
email: "someone@iitd.ac.in"
weight: 30
---

Optional longer bio shown on their own page.
```

**Allowed roles** (must match exactly): `Principal Investigator`, `Professor`, `Associate Professor`, `Assistant Professor`, `Postdoc`, `Research Scientist`, `Research Assistant`, `PhD Student`, `Master Student`, `Undergraduate`, `Alumni`.

**`weight`** controls listing order — smaller numbers appear first (PI has 1, students 20+).
**Optional fields:** `linkedin: "https://…"` · `github:` · `twitter:` · `googleScholar: "https://scholar.google.com/citations?user=…"` · `website:`.
**No photo?** Just skip the `avatar:` line — a coloured tile with their initials shows instead.
**To edit someone:** open their file, change the text, save, push.
**To mark someone as alum:** change `role:` to `Alumni` (they move to the Alumni section; homepage "Researchers" count updates automatically).

### 5.2 Post a news item

Create `website-v2/src/content/news/2026-09-19-short-title.md`:

```markdown
---
title: "Dr. X wins the Y Award"
date: 2026-09-19
summary: "One-sentence summary shown on the news cards."
---

Full story shown on the news detail page. You can use **bold**,
*italics*, and [links](https://example.com).
```

The 3 newest items automatically appear on the homepage.

### 5.3 Add an instrument

**Photo first:** save to `website-v2/src/assets/equipment/instrument-name.jpg` (landscape 1400×1050 px works best).

Create `website-v2/src/content/equipment/instrument-name.md`:

```markdown
---
name: "Instrument Full Name"
function: "What it does, one line, e.g. Quantitative PCR for nucleic acid analysis."
brand: "Bio-Rad"
category: "Molecular Biology"
cover: "../../assets/equipment/instrument-name.jpg"
order: 10
---
```

The homepage "Instruments" count and the Equipment page update automatically.

### 5.4 Add a patent

Create `website-v2/src/content/patents/short-unique-name.md`:

```markdown
---
title: "Patent title as filed"
number: "202611089230"
status: "Filed"
year: 2026
jurisdiction: "India"
date: "17 August 2026"
note: "Optional extra detail."
order: 10
---
```

**Allowed status:** `Granted`, `Filed`, `Application Submitted`, `Provisional Filed`.

### 5.5 Add a publication

**Option 1 — BibTeX (recommended, and what the lab already uses):**

1. Export the citation from Google Scholar / Zotero / the journal as **BibTeX**.
2. Open `website-v2/citations.bib`, paste the entry at the end, and add
   `note = {selected}` inside the entry **if** it should appear on the homepage.
3. Run `npm run build` (on your computer) — the publication page file is created
   automatically in `src/content/publications/`. Commit & push both the `.bib` file
   and the new files.

```bibtex
@article{jain2026urosmart,
  author  = {Jain, Kushagra and Kumar, Shivam},
  title   = {A non-invasive aptasensor for pancreatic cancer detection},
  journal = {Biosensors and Bioelectronics: X},
  year    = {2026},
  doi     = {10.1016/j.biosx.2026.100807},
  note    = {selected}
}
```

**Option 2 — by hand:** copy any existing file in `src/content/publications/` and
edit the fields. Full template:

```markdown
---
title: "Paper title"
authors: ["First Author", "Second Author"]
year: 2026
venue: "Journal Name"
type: "paper"
doi: "10.1234/abcd.5678"
featured: false
badges:
  - { text: "Nature portfolio", type: "gold" }
---

Optional abstract text.
```

**To mark a paper "featured"** (homepage): set `featured: true` in its file.

### 5.6 Add a gallery photo

1. Save the photo into `website-v2/src/assets/gallery/` with a clear name, e.g. `gallery-retreat2026.jpg`.
2. Open `website-v2/src/pages/gallery.astro`. At the top, add one import line and one list line:

```astro
import retreat from '../assets/gallery/gallery-retreat2026.jpg';   // ← with the other imports

const photos = [
  { src: labview, alt: 'Lab view', caption: 'Inside the lab' },
  { src: retreat, alt: 'Lab retreat 2026', caption: 'Lab retreat 2026' },   // ← add anywhere in this list
  …
];
```

Order in the list = order on the page. Each photo shows as a square-ish card with its caption.

### 5.7 Change text on any page

The 15 main pages are single files in `website-v2/src/pages/`:
`index.astro` (home) · `research.astro` · `pi.astro` · `publications.astro` ·
`patents.astro` · `equipment.astro` · `team.astro` · `funding.astro` ·
`courses.astro` · `gallery.astro` · `news.astro` · `important-links.astro` ·
`contact.astro` · `join.astro` · `search.astro`.

Open the file in VS Code and edit the **text between the HTML tags** — e.g. to
change a heading, change only the words between `>` and `<`:

```html
<h1 class="…">Lab Equipment</h1>   ← change "Lab Equipment" only
```

When unsure, change one thing → look at the preview (`npm run dev`) → repeat.

### 5.8 Fix or replace any photo

- **Same photo, better version:** replace the file in `src/assets/…` **keeping the exact same filename**. Done — no other edits needed.
- **Sideways photo?** Open it with any photo app, rotate, save, replace (same filename). ⚠️ Phone photos sometimes contain a hidden "rotate" instruction (EXIF) that computers apply inconsistently — after rotating, use "Export/Save as new JPG" so the instruction is removed.

### 5.9 Change lab-wide info (email, hero heading, menu)

Open `website-v2/src/config.ts`. Every setting is labelled with plain comments:
lab name, email, hero title/subtitle, and the top navigation menu list.

---

## 6. Publishing Checklist (Method B)

```bash
cd website-v2
npm run build          # must end without "error"
```

Then in VS Code: Source Control → write message (e.g. "Add news: award") → Commit → Sync.
Watch the green tick at https://github.com/CliffVale/biosensorslab/actions —
**2 minutes later your change is live.** (Hard-refresh the site with `Ctrl+F5` to see it.)

---

## 7. Troubleshooting

| Symptom | Meaning | Fix |
|---------|---------|-----|
| `npm: command not found` | Node.js not installed / terminal opened before install | Install Node LTS, reopen terminal |
| Build error `Invalid or unexpected …` | A quote or indent broke in the file you edited | Compare your file against a template in section 5 — usually a missing closing quote `"` |
| Build error mentioning a `role:` or `status:` | The word isn't in the allowed list | Use one of the exact allowed values (section 5.1 / 5.4) |
| Build error `Could not find image …` | The file referenced in `avatar:`/`cover:` doesn't exist | Check spelling of the photo path |
| Red ❌ on GitHub Actions | The pushed build failed | Open the action, read the error, fix locally, push again |
| My change isn't on the site | Not pushed yet, or browser cache | Sync first; then `Ctrl+F5` |
| Pagefind error `Found a data-pagefind-body…` | Not an error — normal build output | Ignore |

---

## 8. Undo a Bad Change (emergency)

**On GitHub.com:** open the file's history (History icon) → find the last good
version → click the **clock/rollback** ("Revert") — or ask anyone to:

```bash
git revert <commit-id>   # creates a "cancel my last change" change
git push
```

The site is rebuilt every time — nothing is ever permanently broken.

---

## 9. Quick Reference Card

| Task | File to touch |
|------|---------------|
| Add person | `src/content/team/name.md` + `src/assets/team/name.jpg` |
| Add news | `src/content/news/2026-mm-dd-title.md` |
| Add instrument | `src/content/equipment/name.md` + `src/assets/equipment/name.jpg` |
| Add patent | `src/content/patents/name.md` |
| Add paper | `citations.bib` (then `npm run build`) |
| Gallery photo | `src/assets/gallery/x.jpg` + 2 lines in `src/pages/gallery.astro` |
| Menu / email / hero | `src/config.ts` |
| Contact page text | `src/pages/contact.astro` |

**Still stuck?** Ask any AI assistant: *"In the biosensorslab repo, follow
GUIDE.md to [your task]"* — this file is written for them too.

---

*Last updated: 2026-09-19 · Maintained by the Biosensors & Devices Lab*
