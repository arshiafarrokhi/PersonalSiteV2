# Arshia Farrokhi — Personal Site V2

A responsive personal portfolio built with React, Tailwind CSS, Lucide icons, and Framer Motion. The entire page UI lives in `App.jsx`.

Professional content follows the owner's latest resume: frontend roles at Pavan (2025–present), Asr Gooyesh Pardaz (2024–2025), and GH Company (2022–2023); four professional project references; skills, education, and languages. The original portrait and 12 personal project screenshots come from [Arshia's original portfolio](https://arshiafarrokhi.github.io/PersonalWebsite/). Images are served locally from `public/images`; contact uses LinkedIn, GitHub, and Instagram. The resume PDF and its phone/email are not included in the public repository.

## Run locally

Requires Node.js 22.12 or newer.

```sh
npm ci
npm run dev
```

Open the local URL printed by Vite.

```sh
npm run build
npm run preview
```

The production build goes to `dist/`. Vite's base path is `/` so scripts, styles, and local images load from the root on Vercel and the custom domain.

## Content and behavior

- Edit `PROFESSIONAL_PROJECTS`, `PROJECTS`, `SKILLS`, `EXPERIENCE`, `EDUCATION`, and `SOCIALS` in `App.jsx` to update the portfolio. Hero and about text are in the same file.
- Professional references link to the original product sites. Avid Payment may require an account; private dashboard screens are not reproduced.
- The project gallery filters between websites and web apps and can reveal all 12 projects.
- Shared motion tokens, reveal variants, masked headings, and `MotionButton` keep entrance, hover, press, and scroll feedback consistent. Header navigation and gallery filters use shared layout indicators.
- The portrait uses spring-smoothed pointer depth and a small scroll parallax on desktops with a fine pointer. Touch layouts and reduced-motion users receive a static portrait.
- The gallery toggle stays in the filter toolbar so expansion does not move the next click target. The bottom collapse control returns keyboard focus to that toolbar.
- The mobile menu supports Escape, keyboard focus containment, focus return, and scroll restoration.
- `AnimatePresence` keeps the native modal open through its short exit animation, then restores scrolling and follows the selected section anchor. Browser history remains native.
- Motion respects the device's reduced-motion preference. Images reserve their layout space and have an accessible failure state.
- A native media-query subscription keeps reduced-motion changes reactive without remounting the page. The page supplies zero-duration transitions and static motion-value styles when reduction is enabled; `MotionConfig` leaves this explicit policy in control.
- Project links open external demos. HTTP availability does not establish that every demo's APIs or internal interactions still work.

## Hosting

The Vercel project `personal-site-v2` is connected to this repository. Pushes to `main` create production deployments. Use the Vite framework preset, `npm run build`, and the `dist` output directory, with the repository root as the root directory. No environment variables or backend services are required.

The primary site URL is `https://arshiafarrokhi.ir/`. Configure `www.arshiafarrokhi.ir` as a permanent redirect to the primary domain. DNS must match the records or nameservers displayed in the project's Vercel Domains settings; domain registration stays with the registrar. Vercel provisions HTTPS after DNS verification.

This is a single page with native section fragments (for example, `/#work`), so it does not need a catch-all rewrite for client-side routes. When deliberately hosting under a subdirectory, override Vite's base for that build (for example, `npm run build -- --base=/PersonalSiteV2/`). Do not use that subdirectory base for Vercel root deployments.
