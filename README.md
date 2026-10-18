# Arshia Farrokhi '98

A personal portfolio inside a Windows 98 desktop. React 19, Vite 7, Tailwind CSS 4, Framer Motion 12, and React Router 7.18.4. All UI and shared components live in `App.jsx`; public content and the route catalog live in `content.js`.

The visual reference is [Adam Lambert '98](https://www.adamclambert.com/). The interface is independently implemented; it does not embed the reference site's Framer application, analytics, or editor. The reference checkpoint and personalized version are separate commits. `reference-inventory.json` records all 110 original sitemap routes and their templates. `design-qa.md` records comparisons and acceptance checks. Asset provenance and font licensing are in `ASSET-NOTICES.md`.

## Development

Requires Node.js 22.12 or newer.

```sh
npm ci
npm run dev
npm test
npm run format:check
npm run build
npm run preview
```

Build output: `dist/`. No environment variables, backend, authentication service, or database are required. The welcome dialog is a playful guest entrance: any input works, and nothing is sent or saved. Its fields are discarded when entering the desktop.

## Content

`content.js` preserves the existing portfolio and latest owner-approved resume: four professional references, twelve personal projects with original local screenshots, roles at Pavan / Asr Gooyesh Pardaz / GH Company, education, skills, and languages. French has no invented proficiency level. Contact is through the existing LinkedIn, GitHub, and Instagram links. No resume PDF, phone number, or email is published.

- My Documents → My Work, My Projects, Skills.
- My Work → professional project notes and original website links. Avid Payment may require an account; private dashboards are not reproduced.
- My Projects → real project screenshots, previous/next navigation, and external live demos.
- My Resume → full resume, individual roles, education, and languages.
- About Arshia → biography, working approach, and the twelve-image project gallery.
- My Archive → all personal projects, websites, and web apps.
- Contact → social profiles and playful hidden folders.
- Help → MS-DOS page. The hidden title-bar control opens another themed directory. Shut Down leads to the recoverable blue error screen.

Edit the exported content arrays to update facts. The route catalog derives project, skill, resume, and archive entries from those arrays. `npm test` checks route uniqueness, parent chains, internal links, project images/destinations, resume counts, content privacy, and hosting rewrite behavior.

## Interaction and accessibility

The shared desktop renders one active route window. Browser Back/Forward and direct deep links work normally. Back and Up follow the declared parent folder. Closing returns focus to the originating desktop section; minimizing creates a taskbar button that restores the window. Desktop title bars support constrained dragging, reset after resizing, and keep window controls reachable. Touch/tablet windows use the viewport above the taskbar.

The Home menu supports arrows, Home/End, Escape, outside dismissal, and keyboard focus return. Scrollable panes are keyboard accessible, links and buttons have visible focus, images reserve their space and have failure states, and invalid routes use the blue error page with recovery links. Decorative commands in the original chrome remain decorative rather than pretending to copy/delete/download files.

Framer Motion handles short window transitions, menu entrance/exit, press feedback, drag, and gallery reveals. A reactive `matchMedia` subscription respects reduced motion, including preference changes while mounted. The application supplies explicit zero-duration/static states; `MotionConfig` leaves this policy in control.

## Git and Vercel

- `v1` preserves `3140ae6e09e2a7d1026a92ea4026be8a61bae1d6`.
- `v2` contains the Windows 98 portfolio and is deployed as a separate Vercel **Preview**.
- `main` remains the production branch. The existing `arshiafarrokhi.ir` domain and DNS are unchanged.

Use the existing Vercel project `arshias-projects/personal-site-v2`, Vite preset, repository root, `npm run build`, and `dist` output. Vite's base remains `/`. `vercel.json` serves client routes from `index.html` while excluding JavaScript/CSS, images, fonts, and favicon resource paths from the fallback. Preview access follows the project's existing Vercel protection settings.

External links retain the owner's original destinations. A link or an HTTP response does not establish that every third-party demo's APIs or sign-in flow still work.
