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

Stories can follow one of two layouts:

- **Case-study layout** (default): StoryHero → ExecutiveSummary → Challenge → Partnership → (InlineQuote?) → Solution → (ImageGallery?) → ImpactMetrics → (InlineQuote?)
- **Editorial-narrative layout** (e.g. `jotit.mdx`): StoryHero → ExecutiveSummary → narrative prose → (PullQuote|InlineQuote) → ImageGallery (`featuredFirst`) → narrative prose → InlineQuote → Timeline → narrative prose → (PullQuote|InlineQuote). Narrative prose is plain MDX wrapped in a 680px-max div.

| Component | Props | Purpose |
|-----------|-------|---------|
| `StoryHero` | `title`, `description`, `tags`, `heroImage`, `engagement`, `duration` | Hero header with tags, title, subtitle, duration card, and full-width image |
| `ExecutiveSummary` | `children` (MDX) | Dark navy banner with bold summary text; supports `**bold**` for metric highlights |
| `Challenge` | `children` (MDX), `glanceItems` (`{label, value}[]`) | Narrative text + "Project at a Glance" sidebar card |
| `Partnership` | `children` (MDX) | Narrative section about how Applift worked with the client (required for case-study layout) |
| `InlineQuote` | `quote`, `name`, `role`, `image?` | Subtle left-bar pull-quote placed contextually between sections |
| `PullQuote` | `quote`, `name?`, `role?`, `image?` | Large, centered editorial quote with top/bottom rule — used for opening/closing statements |
| `Solution` | `children` (MDX), `clientInfo` (`{description, websiteUrl?}`) | Solution details with bold subheadings + "About the Client" sidebar card |
| `ImageGallery` | `images` (`{src, alt, caption?}[]`), `columns?` (2\|3), `featuredFirst?`, `heading?` (`string\|null`) | Responsive image grid; `featuredFirst` renders the first image as a hero with the rest in a grid below |
| `Timeline` | `phases` (`{title, description}[]`), `variant?` (`'vertical'\|'horizontal'`), `heading?` | Stepped project timeline — vertical with connector line or horizontal card grid |
| `ImpactMetrics` | `metrics` (`{value, label, description?}[]`) | Metric cards with large numbers, labels, and descriptions |
| `Testimonial` | `quote`, `name`, `role`, `image?` | (Deprecated) Quote with circular avatar; use `InlineQuote` or `PullQuote` for new stories |

## Key Details

- Node.js >= 20 required
- Uses `@site/` path alias for imports from project root
- Uses `@theme/` path alias for Docusaurus theme components
- CSS modules (`.module.css`) for component-scoped styles
- Infima CSS variables prefixed with `--ifm-` for theming
- Custom design tokens prefixed with `--ss-` in `custom.css`
- Fonts: Manrope (headings/display), Inter (body) via Google Fonts
- `respectPrefersColorScheme: true` — dark mode follows system preference
- Story page container max-width: 960px
