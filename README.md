# awes0me-12.github.io

Personal portfolio site of Kaixun (Kevin) Yang, a Statistics and Data Science student at UC Santa Barbara.

Live site: https://awes0me-12.github.io

## Structure

| File | Page |
|---|---|
| `index.html` | Home: introduction and three featured items |
| `projects.html` | Kaggle optimization, COMAP modeling, FXB bus-stop shade study, marketing dashboard, research paper, and how this site was built |
| `creative.html` | Documentary, field photography, social media samples |
| `about.html` | Bio, education and courses, skills, contact |
| `404.html` | "Page not found", shown by GitHub Pages at any missing address (links start with `/`) |
| `style.css` | One shared stylesheet for every page |
| `images/` | Web-sized images only; originals stay outside the public repository |

Built with plain HTML and one CSS file. No JavaScript, frameworks, or build step.

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
