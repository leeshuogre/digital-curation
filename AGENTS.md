# Project Brief: SDGs Interactive Digital Curation

## Goal

Create a polished, responsive static website that presents an interactive digital exhibition about the United Nations Sustainable Development Goals (SDGs). Aim for the craft, originality, storytelling, and visual quality associated with Awwwards-recognized work; do not imply or promise that the site will receive an award.

## Experience and design direction

- Treat the site as a digital exhibition with a clear curatorial narrative, memorable spatial transitions, and intentional pacing.
- Support phone, tablet, and desktop layouts. Keep navigation and essential content usable with touch, keyboard, and assistive technology.
- Use GSAP with ScrollTrigger for exhibit transitions and scroll-linked scenes. Register plugins explicitly. Respect `prefers-reduced-motion`, provide a usable non-animated experience, and avoid trapping or hijacking scrolling.
- Keep animation, imagery, and interaction performant. Optimize media, avoid unnecessary dependencies, and provide meaningful alt text and visible focus states.
- Do not choose the final SDG focus, audience, language, visual identity, or exhibition narrative without direction from the user or an explicit request to propose them.

## Technical foundation

- Build a static site with Vite and deploy its production output to GitHub Pages.
- Use Git and GitHub CLI (`gh`) for repository management. The Pages workflow is configured for the `main` branch and can also be dispatched with GitHub CLI.
- Keep generated output (`dist/`), installed dependencies, local environment files, and credentials out of version control.
- Do not add Clasp. The user will work with Google Apps Script directly in the browser.

## Visitor feedback integration

- The finished site should submit visitor feedback to a Google Apps Script web app that records entries in Google Sheets.
- The user will create/deploy the Apps Script web app in the browser and provide its deployment URL when ready.
- Treat any browser-side Apps Script URL as public. Never put credentials, tokens, or private spreadsheet access keys in client code or committed files. Validate submissions in Apps Script and collect only feedback the user has approved.
- Document the feedback endpoint setup and any required browser configuration in the README when the integration is implemented.

## GitHub Pages release

- Publish through GitHub Actions using the checked-in Pages workflow; use `gh` for repository and workflow operations.
- Confirm the repository name and deployment URL after the first successful Pages deployment.
- Add the real GitHub Pages URL to `README.md`, then commit and push that README update with GitHub CLI.
- Do not invent a repository URL, deploy URL, or successful deployment state.

## Current setup boundary

This initial setup intentionally contains project instructions and build/deployment configuration only. Do not add website HTML, CSS, JavaScript, Apps Script source, or exhibition content until the user gives the next implementation direction.
