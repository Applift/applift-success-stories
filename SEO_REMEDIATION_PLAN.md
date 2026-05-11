# SEO Remediation Plan — work.applift-consulting.com

**Audit date:** 2026-05-11
**Current SEO Health Score:** 39 / 100
**Target after Phase 1+2:** 80+ / 100

---

## Phase 1 — Critical Fixes (This Week)

### 1.1 Fix canonical domain in Docusaurus config

**Why:** Every page on the live `work.applift-consulting.com` is self-canonicalizing to `applift.github.io`. Sitemap URLs, `og:url`, hreflang, and canonical tags all point to the wrong origin. Google will treat the entire live site as duplicate content.

**File:** `docusaurus.config.ts`
**Line:** 18

**Change:**
```ts
// Before
url: 'https://applift.github.io',

// After
url: 'https://work.applift-consulting.com',
```

**Verify:** After deploy, view-source on `/jotit` and confirm `<link rel="canonical">` reads `https://work.applift-consulting.com/jotit/`. Refetch `/sitemap.xml` and confirm all 25 entries use the production domain.

---

### 1.2 Remove placeholder testimonial

**Why:** Homepage ships a fabricated "Jane Doe, CEO at TechCorp" testimonial. Critical E-E-A-T failure visible to every visitor and quality rater.

**File:** `src/components/SuccessStories/TestimonialSection.tsx`
**Lines:** 14–27

**Action:** Replace the placeholder quote with a real client testimonial. Recommended source — Ido Tamir (VP R&D, Zencity), already present in `stories/zencity.mdx` as a `PullQuote`. Alternatives: any quote from Jotit, RiseUp, or Minute Media stories.

**Verify:** Load homepage, confirm a real named client and company appears with verifiable attribution.

---

### 1.3 Fix grammar error in StoryCTA

**Why:** "products that **stays** ahead" renders on every story page footer.

**File:** `src/components/Story/StoryCTA.tsx`
**Line:** 33

**Change:** `stays` → `stay`

---

### 1.4 Add trailing-slash configuration

**Why:** Every internal link triggers a 301 redirect (`/jotit` → `/jotit/`). Costs crawl budget and adds latency.

**File:** `docusaurus.config.ts`

**Add:**
```ts
trailingSlash: true,
```

**Verify:** `curl -I https://work.applift-consulting.com/jotit` should return 200, not 301.

---

### 1.5 Exclude tag pages from sitemap

**Why:** `/tags/*` archive pages are thin content (lists of links). They dilute crawl budget.

**File:** `docusaurus.config.ts`

**Add to presets sitemap config:**
```ts
sitemap: {
  filter: ({ url }) => !url.includes('/tags'),
},
```

---

### 1.6 Add HSTS + security headers (Cloudflare)

**Why:** No HSTS on the subdomain (the apex domain has it). Missing `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`.

**Where:** Cloudflare Dashboard → `work.applift-consulting.com` → Rules → Transform Rules → Modify Response Header

**Headers to add:**
```
Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: geolocation=(), microphone=(), camera=()
```

**Verify:** `curl -I https://work.applift-consulting.com/` shows all five headers.

---

### 1.7 Unblock AI search crawlers (Cloudflare)

**Why:** Cloudflare-managed robots.txt currently blocks GPTBot, ClaudeBot, Google-Extended, PerplexityBot, CCBot, Applebot-Extended. This excludes the site from ChatGPT search, Claude, Perplexity, and Google AI Overviews.

**Where:** Cloudflare Dashboard → Bot Management → AI Scrapers and Crawlers

**Recommended policy:**

| Crawler | Action | Reason |
|---|---|---|
| GPTBot | ALLOW | ChatGPT web search retrieval |
| OAI-SearchBot | ALLOW | ChatGPT search index |
| ClaudeBot | ALLOW | Claude web retrieval |
| PerplexityBot | ALLOW | Perplexity AI search |
| Google-Extended | ALLOW | Google AI Overviews / Gemini |
| CCBot | BLOCK | Training-only dataset |
| Applebot-Extended | BLOCK | Training-only |
| Bytespider | BLOCK | Training-only |
| Amazonbot | BLOCK | Training-only |

**Decision required:** If the business explicitly does not want presence in AI-generated answers, document the decision and skip this step. Otherwise allow the retrieval crawlers above.

---

### 1.8 Replace Google Fonts `@import` with link tags

**Why:** `@import` inside CSS creates a render-blocking chain that delays LCP. The hero H1 uses Manrope.

**File:** `src/css/custom.css`

**Action:** Remove the `@import "https://fonts.googleapis.com/..."` line.

**File:** `docusaurus.config.ts`

**Add to top-level config:**
```ts
headTags: [
  { tagName: 'link', attributes: { rel: 'preconnect', href: 'https://fonts.googleapis.com' } },
  { tagName: 'link', attributes: { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: 'anonymous' } },
  {
    tagName: 'link',
    attributes: {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700&display=swap',
    },
  },
],
```

---

### 1.9 First card image: eager load

**Why:** All card images are `loading="lazy"` including the first one above the fold. Lazy-loading above-fold images delays LCP.

**File:** `src/components/SuccessStories/CaseStudyCard.tsx`

**Action:** Accept an `eager?: boolean` prop and set `loading={eager ? 'eager' : 'lazy'}`. In `src/pages/index.tsx`, pass `eager={index === 0}` to the first card.

---

### 1.10 Add a contact CTA on the homepage

**Why:** Homepage has no conversion path. Users who don't click into a story have no way to contact Applift.

**File:** `src/pages/index.tsx`

**Action:** Render the existing `StoryCTA` component (or a compact variant) between the card grid and the testimonial section. Alternatively, add a sticky navbar "Book a Call" button.

---

## Phase 2 — High Priority (This Month)

### 2.1 Add Schema.org JSON-LD

**Why:** Zero structured data exists. Missing rich result eligibility, knowledge panel signals, and AI citation entity disambiguation.

**Implementation approach:** Inject JSON-LD via Docusaurus `headTags` (sitewide blocks) and per-page via `<Head>` from `@docusaurus/Head` inside MDX, or extend the existing `plugins/success-stories-data.js` plugin to inject per-story Article + BreadcrumbList from frontmatter.

#### Sitewide (homepage and every page)

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://work.applift-consulting.com/#organization",
      "name": "Applift Consulting",
      "url": "https://work.applift-consulting.com/",
      "logo": {
        "@type": "ImageObject",
        "url": "https://work.applift-consulting.com/img/logo.png"
      },
      "sameAs": [
        "https://www.linkedin.com/company/applift-consulting",
        "https://www.applift-consulting.com/"
      ],
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+972-54-555-6742",
        "email": "alon@applift-consulting.com",
        "contactType": "sales",
        "availableLanguage": ["English", "Hebrew"]
      }
    },
    {
      "@type": "WebSite",
      "@id": "https://work.applift-consulting.com/#website",
      "url": "https://work.applift-consulting.com/",
      "name": "Applift Success Stories",
      "publisher": { "@id": "https://work.applift-consulting.com/#organization" },
      "inLanguage": "en"
    }
  ]
}
```

#### Homepage only — CollectionPage

```json
{
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "url": "https://work.applift-consulting.com/",
  "name": "Success Stories | Applift",
  "isPartOf": { "@id": "https://work.applift-consulting.com/#website" },
  "hasPart": [
    { "@type": "WebPage", "url": "https://work.applift-consulting.com/jotit/", "name": "Jotit" },
    { "@type": "WebPage", "url": "https://work.applift-consulting.com/riseup/", "name": "RiseUp" }
    // ... all 11 stories
  ]
}
```

#### Per story — Article + BreadcrumbList

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Success Stories", "item": "https://work.applift-consulting.com/" },
        { "@type": "ListItem", "position": 2, "name": "Jotit", "item": "https://work.applift-consulting.com/jotit/" }
      ]
    },
    {
      "@type": "Article",
      "headline": "Jotit: Native iPad App Built from Scratch in Six Months",
      "description": "Applift rebuilt Jotit's mature Android app natively for iPad — from scratch, on a tight deadline.",
      "url": "https://work.applift-consulting.com/jotit/",
      "image": "https://work.applift-consulting.com/img/success-stories/jotit.png",
      "datePublished": "2024-XX-XX",
      "author": { "@id": "https://work.applift-consulting.com/#organization" },
      "publisher": { "@id": "https://work.applift-consulting.com/#organization" },
      "about": { "@type": "Organization", "name": "Jotit", "url": "https://www.jotit.io/" }
    }
  ]
}
```

**Note:** Do NOT add `FAQPage` (restricted to gov/health) or `HowTo` (deprecated Sept 2023).

---

### 2.2 Add publication dates and authors to all stories

**Why:** Zero dated or attributed content. Strong E-E-A-T and AI citation signal.

**Files:** All 11 MDX files in `stories/`

**Frontmatter additions per story:**
```yaml
date: 2024-XX-XX
last_update:
  date: 2024-XX-XX
  author: Applift Engineering
```

**Then:** Display the date subtly in the rendered story header, and include in the Article schema (2.1 above).

---

### 2.3 Create proper Open Graph social card

**Why:** `og:image` is currently the logo on the wrong domain. Logos make poor social previews.

**Action:**
1. Create a 1200×630 PNG social card at `static/img/social-card.png` with Applift branding + tagline.
2. Set in `docusaurus.config.ts` under `themeConfig.image: 'img/social-card.png'`.
3. Per-story: add `image: /img/success-stories/<story>.png` to each story's frontmatter so each gets a unique share card.

---

### 2.4 Add llms.txt

**Why:** Provides AI systems a structured site manifest. Low effort, growing signal.

**File:** `static/llms.txt` (new)

**Content template:**
```markdown
# Applift Consulting — Success Stories

> Applift is a boutique software development firm based in Herzliya, Israel, specializing in mobile SDK engineering, full-stack product development, and embedded engineering for VC-backed startups.

## Success Stories
- [Battery Ventures](https://work.applift-consulting.com/battery/): Unified investment intelligence platform — React, Node.js, Python, Chrome Extension
- [Outbrain by Teads](https://work.applift-consulting.com/outbrain/): Smartfeed Mobile SDK across iOS, Android, React Native for top-tier publishers
- [OpenWeb](https://work.applift-consulting.com/openweb/): Long-running iOS engagement — 1,000+ publishers, 100M+ MAU
- [Unit](https://work.applift-consulting.com/unit/): Mobile SDK for banking-as-a-service platform — Apple Wallet, Google Pay provisioning
- [Jotit](https://work.applift-consulting.com/jotit/): Native iPad app built in 6 months — EdTech, Swift
- [Mako](https://work.applift-consulting.com/mako/): Israel's #1 streaming platform — Smart TV + Web
- [RiseUp](https://work.applift-consulting.com/riseup/): Personal finance app
- [Zencity](https://work.applift-consulting.com/zencity/): iOS app for civic technology platform
- [Medida](https://work.applift-consulting.com/medida/): iOS app — Background URL Sessions architecture
- [Minute Media](https://work.applift-consulting.com/minute-media/): Web development for sports media platform
- [Battery](https://work.applift-consulting.com/battery/): Investment intelligence — Crunchbase, Salesforce, GitHub integrations

## Contact
- Email: alon@applift-consulting.com
- Phone: +972-54-555-6742
- LinkedIn: https://www.linkedin.com/company/applift-consulting
```

---

### 2.5 Add industry filter dimension

**Why:** Current taxonomy is developer-first (iOS, FullStack). Buyers think in industries.

**Files:** All 11 MDX frontmatter files + `src/components/SuccessStories/FilterBar.tsx` + `src/pages/index.tsx` + `plugins/success-stories-data.js`

**Action:**
1. Add `industry` field to each story's frontmatter:
   - FinTech: Battery, Unit, RiseUp
   - MediaTech: Mako, Minute Media, OpenWeb, Outbrain
   - GovTech: Zencity
   - PropTech: Medida
   - EdTech: Jotit
   - Infrastructure/AI: Rhino
2. Extend filter component to support a second filter axis or render two filter rows.
3. Update plugin to extract and surface industry in card data.

---

### 2.6 Surface outcome metrics on cards

**Why:** Every top-ranking competitor card leads with a metric. Applift cards lead with client name + tech stack.

**Files:** All story frontmatter + `src/components/SuccessStories/CaseStudyCard.tsx`

**Action:**
1. Add `outcome` or `headline` frontmatter field per story (e.g., `outcome: "Shipped to 1,000+ publishers, 100M+ MAU"`).
2. Render the outcome prominently on each card, above or replacing the existing excerpt.

---

### 2.7 Expand thin stories

**Targets:** Rhino (180w, no quote, no metric — critically thin), Minute Media (199w), Unit (216w).

**Action for Rhino specifically:**
- Decide: either obtain a real client quote and add 400+ words of project-specific detail, OR remove from the public site. Publishing a thin, unsubstantiated page hurts overall site quality signals.

**Action for others:**
- Rewrite the generic "ProjectHighlights" sections to describe what Applift specifically did, not what agencies generically do.
- Front-load each section's opening sentence with a direct answer (e.g., "Applift maintains Outbrain's Smartfeed Mobile SDK across iOS, Android, and React Native…") instead of scene-setting prose.
- Target 134–167 words per major section for AI citation extraction.

---

### 2.8 Add ImpactMetrics to every story

**Why:** Battery, Medida, Mako, Minute Media, Unit, Zencity have no quantified outcome. Single biggest AI citation gap.

**Action:** Add at least one `ImpactMetrics` block per story with 2–4 concrete metrics (download count, performance %, timeline, team size, platforms shipped).

---

### 2.9 Add privacy policy

**Why:** Footer has only a copyright. Site collects contact intent via calendar booking + email/phone display. GDPR + trust gap.

**Action:**
1. Create `src/pages/privacy.tsx` (or MDX equivalent).
2. Link from footer in `docusaurus.config.ts` footer config.

---

## Phase 3 — Medium Priority (Backlog)

### 3.1 Mobile filter chips overflow

**Issue:** On 375px viewports only 3 of 5 filter chips are visible. "Mobile Cross-Platform" and "iOS" hidden without scroll affordance.

**File:** `src/components/SuccessStories/FilterBar.module.css`

**Action:** Make filter row horizontally scrollable with visible scroll indicator, OR wrap to second row at mobile breakpoint.

---

### 3.2 Tablet 2-column card grid

**Issue:** At 768px the grid renders single-column. Wasted whitespace.

**Action:** Add tablet breakpoint to card grid CSS for 2-column layout.

---

### 3.3 Improve homepage `<title>` and meta description

**File:** `src/pages/index.tsx`

**Current:** "Success Stories | Applift"
**Recommended:** "Mobile App & SDK Development Case Studies | Applift Consulting"

**Meta description:** Should accurately reflect the page's actual industry coverage (FinTech, MediaTech, GovTech, EdTech, PropTech). Current copy mentions "FinTech, HealthTech, E-commerce" which doesn't match the actual portfolio.

---

### 3.4 Strip Docusaurus generator meta tag

**Why:** Exposes CMS version for vulnerability fingerprinting.

**Action:** Cloudflare Transform Rule to strip `<meta name="generator">` from response body, or swizzle `<Head>`.

---

### 3.5 IndexNow integration

**Why:** Instant URL submission to Bing/Yandex on publish.

**Action:**
1. Generate key at https://www.bing.com/indexnow.
2. Place key file at `static/<key>.txt`.
3. Add post-deploy hook to ping IndexNow API with new/updated URLs.

---

### 3.6 HTML caching with stale-while-revalidate

**Action:** Update Cloudflare cache rule to `cache-control: max-age=600, stale-while-revalidate=86400`.

---

### 3.7 Authority/brand expansion (long-term)

- YouTube channel with case study walkthroughs (~0.737 correlation with AI citation)
- Wikipedia entity for Applift Consulting (notability supported by named clients)
- Cross-link strategy between `applift-consulting.com` and `work.applift-consulting.com`
- Pursue 1–2 third-party mentions: Clutch profile, podcast appearances, conference talks

---

## Verification Checklist

After Phase 1:
- [ ] `curl -s https://work.applift-consulting.com/sitemap.xml | grep applift.github.io` returns nothing
- [ ] `curl -I https://work.applift-consulting.com/jotit` returns 200, not 301
- [ ] `curl -I https://work.applift-consulting.com/` shows HSTS + 4 security headers
- [ ] `curl https://work.applift-consulting.com/robots.txt` allows GPTBot, ClaudeBot, Google-Extended
- [ ] Homepage shows real testimonial, not "Jane Doe"
- [ ] StoryCTA renders "stay" not "stays"

After Phase 2:
- [ ] Google Rich Results Test passes for homepage (Organization, WebSite, CollectionPage)
- [ ] Google Rich Results Test passes for `/jotit/` (Article, BreadcrumbList)
- [ ] `curl https://work.applift-consulting.com/llms.txt` returns the manifest
- [ ] Each story shows a publication date and at least one ImpactMetrics block
- [ ] Industry filter is functional and matches frontmatter
- [ ] Card thumbnails show outcome metrics

---

## Effort Summary

| Phase | Items | Estimated Effort |
|---|---|---|
| Phase 1 (Critical) | 10 | 1–2 days |
| Phase 2 (High) | 9 | 3–5 days |
| Phase 3 (Medium) | 7 | 2–3 days |

Total estimated: ~1.5 weeks of focused work to reach 80+ SEO Health Score.
