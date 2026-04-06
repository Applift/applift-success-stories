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
- **`src/components/Story/`** — MDX components for individual story pages (editorial case study layout).
- **`src/css/custom.css`** — Global CSS overrides for Infima variables (theming colors, dark mode). Custom tokens prefixed with `--ss-`.
- **`src/theme/MDXComponents.tsx`** — Registers all custom Story components for use in MDX files.
- **`stories/`** — Individual success story pages (MDX docs served at `/<slug>`).
- **`static/`** — Static assets served at site root (images, favicon).
- **`plugins/success-stories-data.js`** — Custom plugin that extracts frontmatter from story MDX files for the homepage listing.

## Story Page Components

Each story MDX file uses these components in order:

| Component | Props | Purpose |
|-----------|-------|---------|
| `StoryHero` | `title`, `description`, `tags`, `heroImage`, `engagement`, `duration` | Hero header with tags, title, subtitle, duration card, and full-width image |
| `ExecutiveSummary` | `children` (MDX) | Dark navy banner with bold summary text; supports `**bold**` for metric highlights |
| `Challenge` | `children` (MDX), `glanceItems` (`{label, value}[]`) | Narrative text + "Project at a Glance" sidebar card |
| `Solution` | `children` (MDX), `clientInfo` (`{description, websiteUrl?}`) | Solution details with bold subheadings + "About the Client" sidebar card |
| `ImageGallery` | `images` (`{src, alt, caption?}[]`), `columns?` (2\|3) | Responsive image grid for app screenshots |
| `ImpactMetrics` | `metrics` (`{value, label, description?}[]`) | Metric cards with large numbers, labels, and descriptions |
| `Testimonial` | `quote`, `name`, `role`, `image?` | Quote with circular avatar; auto-splits into carousel by paragraph breaks |

## Key Details

- Node.js >= 20 required
- Uses `@site/` path alias for imports from project root
- Uses `@theme/` path alias for Docusaurus theme components
- CSS modules (`.module.css`) for component-scoped styles
- Infima CSS variables prefixed with `--ifm-` for theming
- Custom design tokens prefixed with `--ss-` in `custom.css`
- Fonts: Plus Jakarta Sans (headings), Inter (body) via Google Fonts
- `respectPrefersColorScheme: true` — dark mode follows system preference
- Story page container max-width: 960px
