# Windows 98 portfolio QA

Source: https://www.adamclambert.com/ and its 110-route sitemap, captured 2026-10-18. Route/template/media and UI resource inventory: `reference-inventory.json`.

## Reference checkpoint

- Browser-rendered source and local implementation captured at CSS/pixel sizes **1536×844** and **390×844**, density 1. No density normalization; desktop full-view pairs scaled equally to 50% with native-size login crops; mobile paired at native size.
- Temporary evidence: `.qa-v2-20261018/source-login-desktop.png`, `local-login-desktop-1.png`, `local-login-desktop-2.png`, `source-documents-mobile.png`, `local-documents-mobile-1.png`, `local-documents-mobile-2.png`.
- First combined comparison: `comparison-login-1.png`. P2: login 19px too high, form fields 40px too wide, and downloaded PNG wallpaper differed from browser-displayed CDN AVIF. Corrected viewport centering, constrained form width, and exported the actual rendered wallpaper.
- Mobile comparison found menu chrome 2px short and file icons centered within grid tracks instead of aligned to track starts. Corrected menu height, rule spacing, and grid alignment.
- Post-fix combined evidence: `comparison-login-2.png` (full view and native-size login crop) and `comparison-documents-mobile-2.png` (390px native paired views). Background crop, window proportions, bitmap typography, and mobile grid now align. Residual 1–4px border/control spacing differences are P3; the source's decorative dog toolbar thumbnail is intentionally replaced with owner imagery during personalization.
- Fonts: same regular/bold bitmap fonts, 16px UI/24px folder headings. CC BY-SA metadata verified. Times/Georgia serif and monospace retained for document templates.
- Colors: navy #000080, chrome #c0c0c0, teal #008080, beveled white/gray/black borders. Classic UI bitmap resources served locally.
- All **110** source paths opened in the local browser with a rendered window or the intentional empty desktop; zero React error-boundary screens. Individual third-party video playback is not claimed verified.
- Long third-party articles use short excerpts in this reference checkpoint; the final application replaces those articles and the reference owner's photographs/claims. It does not redistribute complete articles or Framer application code.

## Personalized acceptance

- The final catalog contains **59 owner-specific routes**. The 110-route reference catalog remains an audit record, rather than exposing the other owner's biography or media in the personalized application.
- Data checked against the original portfolio arrays: four professional projects, twelve personal projects/screenshots, three employment entries, two education entries, five skill categories, and the three approved social profiles. English B2 is preserved; French has no invented proficiency level. No email, phone, resume PDF, reference-owner photos, or reference-owner audio/video is shipped in the final application.
- **236 browser route/viewport checks**: every route at 320, 390, 768, and 1536 CSS pixels, all at 844px height. All rendered, all persistent controls stayed reachable, zero error-boundary screens, broken loaded images, document horizontal overflow, or unintended horizontal overflow in scroll panes. An additional 56 targeted checks passed after refining folder addresses and classic scrollbars. Four-width about/font checks also passed.
- Portrait toggles its monochrome state; blank guest entry and keyboard form submission enter the desktop. Home menu arrows/Escape and focus return passed. Closing restores desktop-section focus; minimize/restore passed. Browser Back/Forward and direct-route Refresh passed on professional notes.
- Drag verified by DOM bounds: a 75px/30px move changed the title bar from approximately (157.4,64.8) to (232.4,94.8). Further movement clamped the window to right=1536 and bottom=806, with the title-bar controls inside the viewport. Drag eligibility reads the viewport at pointer start, preventing stale responsive state.
- Actual project Next navigation settled on Weather app, **4 / 12**; parent navigation and the complete Contact → Arshia Only → Private Files → CONFIDENTIAL chain were exercised. The final folder links to the owner's public GitHub. Hidden window → blue screen → login recovery passed. Scroll panes accepted keyboard scrolling.
- Typography: exact reference MS Sans Serif regular/bold, licensed CC BY-SA 3.0, plus unchanged reference Serif Medium with its embedded freeware license. System Times New Roman/Courier New are used for document text. Fonts remain local; primary UI fonts preload. Credits and license text are accessible from About.
- Layout/tokens: source cloud AVIF, navy/gray/teal chrome, original classic bitmap controls, beveled frames, 24px classic scrollbars, and the source's original scrollbar arrow SVG assets. No generated icon approximations or compiled Framer code are used.
- Image/content differences are intentional: owner portrait and brand icon replace reference-specific portrait/dog/studio marks; project screenshots replace family videos/photos; skill and resume documents replace music/articles. Screenshots reserve their dimensions and retain an accessible failure state. Gallery opens a real image viewer and actual demos rather than pretending to play personal recordings.

## Comparison history and fixes

1. Reference login placement, field width, and wallpaper CDN format: corrected; paired full-view and native-size crop evidence recorded above.
2. Mobile menu height/grid alignment: corrected; source/local 390px paired Explorer evidence recorded above.
3. Personalization added an icon-art wrapper that inherited the teal label background. Restricted label selectors to actual labels and reserved 50px icon dimensions; restored the fixed desktop grid rhythm. Final identity changes are expected.
4. Portrait state class was lost during reference-branch removal. Corrected and verified `aria-pressed=true` with `grayscale(1) contrast(1.2)`.
5. Standard scrollbar color declarations overrode Chromium's classic scrollbar styling. Scoped that fallback to non-WebKit browsers; the rendered scrollbar now measures 24px and uses the reference's original arrow assets. Updated gallery spacing checked in all target widths.

## Verification scope

`npm test` passed all eight data/privacy/routing tests; `npm run build` passed. Final format/diff checks and hosted Preview verification are recorded below after deployment. No lint/type-check scripts exist in this JavaScript project; they are not reported as passed. Live OS reduced-motion toggling, physical touch devices, Safari/Firefox, and third-party demo APIs/account flows were not exercised. The reactive reduced-motion subscription and explicit zero-duration policy were reviewed; current-browser motion and keyboard states were exercised.

Source captures, implementation captures, comparison composites, route-check JSON, helper scripts, and their caches are temporary QA material and will be removed after acceptance, as requested. The report preserves their original evidence names and measured outcomes.

## Hosted verification

- Branch Preview: <https://personal-site-v2-git-v2-arshias-projects.vercel.app/>. Vercel deployment `9RUTN8JwgQhAtX8uSCEr8rSnMJXG`, runtime commit `497cf7f`, environment **Preview**, status **Ready**. Production was independently shown as `main` / `3140ae6`; no promotion or DNS changes were made.
- Authenticated browser: entry page rendered, `/projects/music` and `/resume/pavan` opened directly and survived Refresh; `/unknown.file` opened the themed 404 and survived Refresh. Music screenshot decoded at its original 1920px width. No console warnings/errors were captured in the checked hosted states.
- The browser executed `/assets/index-Dv2nCX98.js` and applied `/assets/index-Ktb6_D_a.css`, both from the root. The exported hosted stylesheet is byte-identical (SHA-256 comparison) to the local production build. All three hosted font assets were exported successfully with MIME `font/woff2`. This verifies actual application delivery rather than treating an SSO login response as the app.
- Existing Vercel authentication remains enabled: a separate unauthenticated HTTP request returned **302 to Vercel SSO**. Those redirected login responses were not counted as successful asset checks. Direct raw JavaScript-document inspection was blocked by the browser client; JavaScript validation instead used actual module execution, route rendering, and clean console results. No authentication protection was weakened.
- Public production still returns HTTP 200 with unchanged `/assets/index-DNRnZ0Fw.js` and `/assets/index-CfTJEOiZ.css`. Remote `main` and `v1` still point to `3140ae6e09e2a7d1026a92ea4026be8a61bae1d6`.
- Final `npm test`, `npm run build`, `npm run format:check`, and `git diff --check` passed. Lint/type-check commands were unavailable, as noted above.

## Final visual comparison

Source truth: `source-login-desktop.png` and `source-gallery-mobile.png`; implementation: `personal-login-desktop-final.png` and `personal-gallery-390-final.png`, captured from the browser. Combined inputs: `comparison-personal-login.png` (1536×844 views scaled equally to half-size, plus native 672×220 crops) and `comparison-personal-gallery.png` (390×844 views at native density). These combined inputs were opened and reviewed together, including text, control frames, assets, color, and spacing. Content/identity changes are expected; no actionable P0/P1/P2 findings remain. Minor bevel spacing and the more compact mobile About tab strip are P3 refinements.

Implementation capture fingerprints before requested cleanup:

- Desktop login: `cba0611a7bc13a434860a2ee9ff16f7c0ea4d8c0230252af0014b17dd43f40d6`.
- Mobile gallery: `97aae09f863ab7eef542447757710fba051f42c73fc8d9471463bf326e10f9ed`.

final result: passed
