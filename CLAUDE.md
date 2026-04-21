# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Behavioral guidelines to reduce common LLM coding mistakes. Merge with project-specific instructions as needed.

**Tradeoff:** These guidelines bias toward caution over speed. For trivial tasks, use judgment.

## 1. Think Before Coding

**Don't assume. Don't hide confusion. Surface tradeoffs.**

Before implementing:
- State your assumptions explicitly. If uncertain, ask.
- If multiple interpretations exist, present them - don't pick silently.
- If a simpler approach exists, say so. Push back when warranted.
- If something is unclear, stop. Name what's confusing. Ask.

## 2. Simplicity First

**Minimum code that solves the problem. Nothing speculative.**

- No features beyond what was asked.
- No abstractions for single-use code.
- No "flexibility" or "configurability" that wasn't requested.
- No error handling for impossible scenarios.
- If you write 200 lines and it could be 50, rewrite it.

Ask yourself: "Would a senior engineer say this is overcomplicated?" If yes, simplify.

## 3. Surgical Changes

**Touch only what you must. Clean up only your own mess.**

When editing existing code:
- Don't "improve" adjacent code, comments, or formatting.
- Don't refactor things that aren't broken.
- Match existing style, even if you'd do it differently.
- If you notice unrelated dead code, mention it - don't delete it.

When your changes create orphans:
- Remove imports/variables/functions that YOUR changes made unused.
- Don't remove pre-existing dead code unless asked.

The test: Every changed line should trace directly to the user's request.

## 4. Goal-Driven Execution

**Define success criteria. Loop until verified.**

Transform tasks into verifiable goals:
- "Add validation" → "Write tests for invalid inputs, then make them pass"
- "Fix the bug" → "Write a test that reproduces it, then make it pass"
- "Refactor X" → "Ensure tests pass before and after"

For multi-step tasks, state a brief plan:
```
1. [Step] → verify: [check]
2. [Step] → verify: [check]
3. [Step] → verify: [check]
```

Strong success criteria let you loop independently. Weak criteria ("make it work") require constant clarification.

---

**These guidelines are working if:** fewer unnecessary changes in diffs, fewer rewrites due to overcomplication, and clarifying questions come before implementation rather than after mistakes.

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
| `StoryHero` | `title`, `description`, `tags`, `heroImage` | Hero header with description and full-width image |
| `ExecutiveSummary` | `children` (MDX), `status?`, `platforms?` (`string[]`), `technology?` (`string[]`) | Dark navy banner with bold summary text and optional right-side meta column (Status / Platforms / Technology) |
| `Challenge` | `children` (MDX), `glanceItems` (`{label, value}[]`) | Narrative text + "Project at a Glance" sidebar card |
| `Partnership` | `children` (MDX) | Narrative section about how Applift worked with the client (required for case-study layout) |
| `InlineQuote` | `quote`, `name`, `role`, `image?` | Subtle left-bar pull-quote placed contextually between sections |
| `PullQuote` | `quote`, `name?`, `role?`, `image?` | Large, centered editorial quote with top/bottom rule — used for opening/closing statements |
| `Solution` | `children` (MDX), `clientInfo` (`{description, websiteUrl?}`) | Solution details with bold subheadings + "About the Client" sidebar card |
| `ImageGallery` | `images` (`{src, alt, caption?}[]`), `columns?` (2\|3), `featuredFirst?`, `heading?` (`string\|null`) | Responsive image/video grid; `.mp4`/`.webm`/`.ogg` srcs auto-render as muted, looping inline videos. `featuredFirst` renders the first item as a hero with the rest in a grid below |
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