# applift-success-stories

A Docusaurus-powered showcase of Applift Consulting's client case studies, featuring filterable cards and detailed project write-ups.

Live site: https://applift.github.io/applift-success-stories/

---

## Getting Started

### Prerequisites

- **Node.js** `>= 20` (check with `node -v`)
- **npm** (bundled with Node)
- **git**

### 1. Clone the repository

```bash
git clone https://github.com/applift/applift-success-stories.git
cd applift-success-stories
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the dev server

```bash
npm start
```

This launches Docusaurus on [http://localhost:3000](http://localhost:3000) with hot reload — most edits to MDX, components, and CSS show up in the browser without a manual refresh.

---

## Common Commands

| Command | What it does |
|---|---|
| `npm start` | Dev server with hot reload at `localhost:3000` |
| `npm run build` | Production build into `build/` |
| `npm run serve` | Serve the production build locally (run after `build`) |
| `npm run typecheck` | TypeScript type check (`tsc`) |
| `npm run clear` | Clear the `.docusaurus` cache (use if you hit weird build/HMR issues) |

---

## Project Layout

```
.
├── docusaurus.config.ts      # Site config (navbar, footer, plugins, theme)
├── sidebarsStories.ts        # Sidebar config for the stories docs plugin
├── plugins/
│   └── success-stories-data.js   # Extracts story frontmatter for the homepage
├── src/
│   ├── pages/index.tsx       # Homepage — success stories listing
│   ├── components/
│   │   ├── SuccessStories/   # Homepage components (cards, filter, hero, etc.)
│   │   └── Story/            # MDX components used inside individual stories
│   ├── theme/MDXComponents.tsx  # Registers Story components for MDX
│   └── css/custom.css        # Global theme + design tokens (--ss-*)
├── stories/                  # Individual story MDX files (one per case study)
└── static/                   # Static assets (images, favicon, etc.)
```

See [CLAUDE.md](./CLAUDE.md) for a deeper breakdown of the Story components and the two supported story layouts (case-study and editorial-narrative).

---

## Adding or Editing a Story

1. Create or edit an `.mdx` file inside `stories/` (use an existing one as a template).
2. Fill in frontmatter (title, description, tags, hero image, etc.) — this drives both the story page and its homepage card.
3. Compose the story using the registered components (`StoryHero`, `ExecutiveSummary`, `Challenge`, `Solution`, `ImageGallery`, `ImpactMetrics`, `StoryCTA`, …).
4. Drop any images/videos under `static/` and reference them with an absolute path (e.g. `/img/clients/foo/hero.jpg`).
5. Run `npm start` and verify the story renders correctly and appears on the homepage listing.

---

## Workflow Tips

- **Pull latest before working:** `git pull origin main`
- **Branching:** create a feature branch per story or change (`git checkout -b story/<client-name>`).
- **Before pushing:** run `npm run typecheck` and `npm run build` to catch type errors and broken MDX.
- **Stuck on a stale build?** Run `npm run clear`, then `npm start` again.
