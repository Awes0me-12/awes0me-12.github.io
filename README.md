# awes0me-12.github.io

Personal portfolio site of Kaixun (Kevin) Yang, a Statistics and Data Science student at UC Santa Barbara.

Live site: https://awes0me-12.github.io

## Structure

| File | Page |
|---|---|
| `index.html` | Home: introduction and three featured items |
| `projects.html` | Kaggle optimization, COMAP modeling, FXB bus-stop shade study, marketing dashboard, research paper, and how this site was built |
| `creative.html` | Documentary and field photography |
| `about.html` | Bio, education and courses, skills, contact |
| `404.html` | "Page not found", shown by GitHub Pages at any missing address (links start with `/`) |
| `style.css` | Base styles used by every page |
| `portfolio.css` | Shared typography, navigation, footer, and visual foundation for all five pages |
| `home.css` | Home work previews and introductory layout |
| `projects.css` | Projects contents navigation, write-ups, and responsive reading layout |
| `creative.css` | Documentary feature, uncropped fieldwork images, and responsive photography gallery |
| `about.css` | Bio and education layout, skills groups, and contact details |
| `fonts/` | Locally hosted IBM Plex Sans Latin1 fonts and their SIL OFL license |
| `images/` | Web-sized images only; originals stay outside the public repository |

Built with plain HTML, shared CSS, and page-specific styles. No JavaScript, frameworks, or build step.

Shared CSS adds a brief native page fade on supported same-origin navigations, respecting the system's reduced-motion preference. Ordinary navigation works without the enhancement.

## Preview locally

From this folder, run:

```bash
python3 -m http.server 8000
```

Then open http://localhost:8000.

## Publish

GitHub Pages serves the `main` branch of this repository automatically. Push a commit, wait about a minute, then reload the live site.

## Conventions

- File names are lowercase with hyphens: `2026-10-25_creative_market-scene_v01.jpg` (GitHub Pages treats `Photo.jpg` and `photo.jpg` as different files).
- Images go in `images/`, under 250 KB (250,000 bytes), with a long edge of 1600 px or less.
- Every informative image has alt text; decorative images use `alt=""`.
- Each content change gets a clear commit message and a row in the Change Log spreadsheet.
