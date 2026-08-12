# The Cosmic Creator Co.

Premium marketing site for **The Cosmic Creator Co.** — studio-quality content that turns expertise into leads, trust, and clients.

## Local preview

```bash
python3 -m http.server 8765 --directory .
```

Open [http://127.0.0.1:8765/](http://127.0.0.1:8765/)

## Color palette

Source of truth for theme tokens: `css/styles.css` (`:root`).  
Reference image: `assets/palette-studio-vaia.png`

**Update this section whenever palette tokens change.**

### Core brand palette

| Name | Hex | CSS variable | Role |
|------|-----|--------------|------|
| **Earth** | `#95714F` | `--earth` / `--accent` | Primary accent, emphasis |
| **Sand** | `#C7AF94` | `--sand` | Soft surfaces, supporting tone |
| **Almond** | `#EADED0` | `--almond` / `--paper` | Main page background |
| **Moss** | `#8C916C` | `--moss` | Hover states, secondary accent |
| **Sage** | `#ACB087` | `--sage` / `--accent-soft` | Highlights on dark sections |

### Supporting tokens

| Name | Hex | CSS variable | Role |
|------|-----|--------------|------|
| Ink | `#2C241C` | `--ink` | Primary text, primary buttons |
| Ink soft | `#4A3B2E` | `--ink-soft` | Secondary body text |
| Muted | `#7D6A55` | `--muted` | Captions, helper text |
| Paper 2 | `#E3D6C6` | `--paper-2` | Alternating section backgrounds |
| Accent deep | `#7A5C3F` | `--accent-deep` | Deeper earth for strong emphasis |
| Dark | `#3A3428` | `--dark` | Dark sections (solution, CTA) |
| Dark deep | `#2F2A21` | `--dark-deep` | Footer background |
| White | `#FFFFFF` | `--white` | Pure white |
| Line | `rgba(149, 113, 79, 0.22)` | `--line` | Borders / dividers |

### Usage map

- **Backgrounds:** Almond (`--paper`), Paper 2, Sand  
- **Text:** Ink, Ink soft, Muted  
- **CTAs:** Ink buttons → Moss on hover  
- **Accents / italics:** Earth, Sage on dark panels  
- **Dark bands:** Dark / Dark deep with Almond or Sage text accents  

## Typography

| Role | Font | CSS variable |
|------|------|--------------|
| Display / headlines | Cormorant Garamond | `--font-display` |
| Body / UI | Manrope | `--font-body` |

## Brand assets

| Asset | Path |
|-------|------|
| Logo wordmark | `assets/logo-wordmark.png` |
| Logo wordmark (light) | `assets/logo-wordmark-light.png` |
| Logo mark / monogram | `assets/logo-mark.png` |
| Favicon | `assets/favicon.png` |
| Founders photo | `assets/founder-hero.jpg` |
| Palette reference | `assets/palette-studio-vaia.png` |
| Illus · Reel | `assets/illus-reel.webp` |
| Illus · Megaphone | `assets/illus-megaphone.webp` |
| Illus · Growth | `assets/illus-growth.webp` |
| Illus · Clapper | `assets/illus-clapper.webp` |

## Project structure

```
index.html          # Single-page site
css/styles.css      # Design system + layout
js/main.js          # Lenis + GSAP interactions
js/vendor/          # GSAP, ScrollTrigger, Lenis
assets/             # Logos, photos, palette
```

## Maintenance note

When changing colors in `css/styles.css`, **update the Color palette tables in this README** in the same change.
