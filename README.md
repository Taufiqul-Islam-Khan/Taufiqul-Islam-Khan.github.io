# Taufiqul Islam Khan — Portfolio

Personal portfolio website showcasing my work as a Software Engineering researcher, educator, and software engineer.

## About

A single-page portfolio built with vanilla HTML, CSS, and JavaScript — no frameworks, no build tools. Features a dark modern design with four switchable themes, scroll-triggered animations, particle backgrounds, and a fully responsive layout.

## Features

- **Theme Switcher** — Dark, Light, Nord, and Emerald themes with localStorage persistence
- **Animated UI** — Scroll reveal, typing animation, parallax shapes, particle canvas, tilt cards, magnetic buttons
- **Project Modals** — Detailed project views with category filtering (AI/ML, Full-Stack, Data/Backend, Mobile)
- **Timeline** — Professional experience displayed in an interactive timeline
- **Testimonial Slider** — Auto-advancing slider with dot navigation
- **Responsive** — Fully responsive with mobile hamburger menu and adapted layouts
- **Custom Cursor** — Animated cursor follower with hover effects (desktop only)

## Tech Stack

| Layer | Tech |
|-------|------|
| Markup | HTML5 |
| Styling | CSS3 (Custom Properties, Grid, Flexbox, Animations) |
| Scripting | Vanilla JavaScript (ES5 compatible) |
| Fonts | Inter, Space Grotesk, JetBrains Mono (Google Fonts) |
| Hosting | Static — works on GitHub Pages, Netlify, or any static host |

## Project Structure

```
.
├── index.html              # Single-page application
├── css/
│   └── style.css           # All styles, themes, and responsive rules
├── js/
│   └── main.js             # Animations, interactions, and UI logic
├── potrait of me.jpg        # Profile photo
└── *.pdf                   # Resume (not tracked in version control)
```

## Running Locally

No dependencies required. Open `index.html` directly in a browser, or serve it with any static server:

```bash
# Using npx
npx serve .

# Using Python
python -m http.server 3000
```

## Sections

1. Hero — Headline, typed roles, audience tags, CTAs
2. About — Bio, photo, academic profile links
3. Experience — Professional timeline (teaching, research, engineering)
4. Education — Academic background cards
5. Research — Publications and academic contributions
6. Projects — Filterable project grid with detail modals
7. Talks — Presentations and community engagement
8. Skills — Categorized technical proficiencies
9. Achievements — Impact counters and distinction cards
10. Testimonials — Slider with submission option
11. Contact — Email, social links

## Customization

**Theme colors** are defined as CSS custom properties in `css/style.css` under `[data-theme="..."]` selectors. Add a new theme by duplicating a block and updating the variables.

**Typed roles** are configured in the `roles` array in `js/main.js`.

**Projects** can be added by duplicating a `<article class="project-card">` block and its corresponding `<template>` modal in `index.html`.

## License

All rights reserved. This portfolio and its content are personal intellectual property. Code structure may be referenced for learning purposes, but direct reproduction of content or design is not permitted without permission.
