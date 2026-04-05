# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **Docusaurus 3.9** site (with v4 future flag enabled) for Applift Success Stories. The homepage is the success stories listing page. Individual stories are served via a docs plugin from the `stories/` directory. Built with React 19, TypeScript, and the Infima CSS framework.

## Commands

- `npm start` — Dev server with hot reload
- `npm run build` — Production build to `build/`
- `npm run serve` — Serve the production build locally
- `npm run typecheck` — Run TypeScript type checking (`tsc`)
- `npm run clear` — Clear the `.docusaurus` cache

## Architecture

- **`docusaurus.config.ts`** — Main site config (navbar, footer, presets, theme). Docs and blog are disabled.
- **`sidebarsStories.ts`** — Sidebar config for the stories docs plugin.
- **`src/pages/index.tsx`** — Homepage (success stories listing with filter, cards, testimonials).
- **`src/components/SuccessStories/`** — Components for the success stories page (HeroSection, FilterBar, CaseStudyCard, TestimonialSection, etc.).
- **`src/css/custom.css`** — Global CSS overrides for Infima variables (theming colors, dark mode).
- **`stories/`** — Individual success story pages (MDX docs served at `/success-stories/<slug>`).
- **`static/`** — Static assets served at site root (images, favicon).

## Key Details

- Node.js >= 20 required
- Uses `@site/` path alias for imports from project root
- Uses `@theme/` path alias for Docusaurus theme components
- CSS modules (`.module.css`) for component-scoped styles
- Infima CSS variables prefixed with `--ifm-` for theming
- `respectPrefersColorScheme: true` — dark mode follows system preference
