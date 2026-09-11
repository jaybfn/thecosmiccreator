# The Cosmic Creator Co.

Marketing site for **The Cosmic Creator Co.** — a creative studio building brands from
idea to impact: brand strategy, content, digital and social.

Positioning: **"We build brands people remember."**

## Local preview

```bash
python3 -m http.server 8765 --directory .
```

Open [http://127.0.0.1:8765/](http://127.0.0.1:8765/)

No build step. Static HTML, one stylesheet, one script, vendored GSAP + Lenis.

## Project structure

```
index.html            # Homepage
retainers.html        # Monthly content pricing (linked from footer, not the main nav)
privacy.html          # Privacy policy
work/
  _template.html      # Case-study template — copy this to add a project
  pharma-force-india.html
  sarmi-jewels.html
  laptech.html
css/styles.css        # Design system + all page layouts
js/main.js            # Loader, smooth scroll, reveals, parallax
js/vendor/            # GSAP, ScrollTrigger, Lenis
assets/               # Logos, photography, case covers
```

## Adding a case study

1. `cp work/_template.html work/<client-slug>.html`
2. Add the cover image to `assets/` (landscape, 1600×900 or wider).
3. Fill in the placeholders — the file has instructions at the top.
4. Update the "Next project" link at the foot of the new page, and point the
   previous project's "Next project" at it so the loop stays closed.
5. Add an `<article class="project">` card to `.work__list` in `index.html`,
   copying an existing one. Alternate `project--flip` to keep the layout rhythm.

**Content rule:** real outcomes only. No invented metrics, no invented
testimonials. If there are no numbers, describe the outcome qualitatively.

## Content principles

The copy is short, concrete and non-salesy. Avoid: "next level", "unlock your
potential", "360-degree", "end-to-end transformation", "results-driven",
"data-powered". Avoid fake statistics and counters.

## Color palette

Source of truth for theme tokens: `css/styles.css` (`:root`).
Reference image: `assets/palette-studio-vaia.png`

**Update this section whenever palette tokens change.**

### Grounds

| Name | Hex | CSS variable | Role |
|------|-----|--------------|------|
| **Bone** | `#F7F3EC` | `--bone` | Primary page background |
| **Almond** | `#EADED0` | `--almond` | Alternating warm section band |
| Paper 2 | `#E3D6C6` | `--paper-2` | Image placeholder / deeper warm surface |
| **Sand** | `#C7AF94` | `--sand` | Soft accents, separators, dark-band buttons |
| Noir | `#16120D` | `--noir` | Dark sections and footer |
| Noir 2 | `#1F1A13` | `--noir-2` | Reserved secondary dark surface |

### Brand accents

| Name | Hex | CSS variable | Role |
|------|-----|--------------|------|
| **Earth** | `#95714F` | `--earth` / `--accent` | Primary accent, italic emphasis, image grade |
| Accent deep | `#7A5C3F` | `--accent-deep` | Button hover |
| **Moss** | `#8C916C` | `--moss` | Secondary accent |
| **Sage** | `#ACB087` | `--sage` | Accents on dark bands |

### Ink & lines

| Name | Hex | CSS variable | Role |
|------|-----|--------------|------|
| Ink | `#221C15` | `--ink` | Primary text, solid buttons |
| Ink soft | `#4A3B2E` | `--ink-soft` | Body copy |
| Muted | `#7D6A55` | `--muted` | Eyebrows, captions, helper text |
| Line | `rgba(34, 28, 21, 0.14)` | `--line` | Hairline rules on light grounds |
| Line strong | `rgba(34, 28, 21, 0.3)` | `--line-strong` | Emphasised rules, ghost button border |
| Line light | `rgba(234, 222, 208, 0.16)` | `--line-light` | Hairline rules on dark grounds |

### Usage map

- **Backgrounds:** Bone (default), Almond (alternating bands), Noir (difference + CTA + footer)
- **Text:** Ink, Ink soft, Muted
- **CTAs:** Solid ink → Earth deep on hover. On dark bands: bone → sand
- **Accents / italics:** Earth on light, Sage on dark
- **Photography:** graded to `saturate(0.78)` with a soft-light Earth wash so
  differently-sourced images read as one system

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
| Logo lockup / mark | `assets/logo-mark.png` |
| Favicon | `assets/favicon.png` |
| Founders photo | `assets/founder-hero.jpg` |
| Case · Pharma Force | `assets/case-pharma.jpg` |
| Case · Sarmi Jewels | `assets/case-sarmi.jpg` |
| Case · LAPTECH | `assets/case-laptech.jpg` |
| Palette reference | `assets/palette-studio-vaia.png` |

The `illus-*.webp` / `illus-*.png` illustrations and the `logo-option-*` and
`logo-v2-*` files are from the previous design and are no longer referenced.

## Open items

- Founder names and roles in the About section are `[Founder name]` placeholders.
- Instagram and LinkedIn footer links are commented out pending real URLs.
- Client logos and real testimonials can be added when available — nothing on the
  site is invented in the meantime.

## Maintenance note

When changing colors in `css/styles.css`, **update the Color palette tables in
this README in the same change.**
