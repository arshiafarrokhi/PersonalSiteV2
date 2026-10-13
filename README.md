# Arshia Farrokhi — Personal Site V2

A responsive personal portfolio built with React, Tailwind CSS, Lucide icons, and Framer Motion. The entire page UI lives in `App.jsx`.

Professional content follows the owner's latest resume: frontend roles at Pavan (2025–present), Asr Gooyesh Pardaz (2024–2025), and GH Company (2022–2023); four professional project references; skills, education, and languages. The original portrait and 12 personal project screenshots come from [Arshia's original portfolio](https://arshiafarrokhi.github.io/PersonalWebsite/). Images are served locally from `public/images`; contact uses LinkedIn, GitHub, and Instagram. The resume PDF and its phone/email are not included in the public repository.

## Run locally

Requires Node.js 22.12 or newer.

```sh
npm ci
npm run dev
```

Open the local URL printed by Vite, including `/PersonalSiteV2/`.

```sh
npm run build
npm run preview
```

The production build goes to `dist/`. Vite's base path is configured for the `PersonalSiteV2` GitHub Pages project path; change `base` in `vite.config.js` when using a different hosting path.

## Content and behavior

- Edit `PROFESSIONAL_PROJECTS`, `PROJECTS`, `SKILLS`, `EXPERIENCE`, `EDUCATION`, and `SOCIALS` in `App.jsx` to update the portfolio. Hero and about text are in the same file.
- Professional references link to the original product sites. Avid Payment may require an account; private dashboard screens are not reproduced.
- The project gallery filters between websites and web apps and can reveal all 12 projects.
- The mobile menu supports Escape, keyboard focus containment, focus return, and scroll restoration.
- Motion respects the device's reduced-motion preference. Images reserve their layout space and have an accessible failure state.
- Project links open external demos. HTTP availability does not establish that every demo's APIs or internal interactions still work.

## Hosting

This repository includes the local app and its production build configuration. GitHub Pages must be configured separately to publish `dist/`; pushing source alone does not publish a live site.
