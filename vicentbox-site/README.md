# VicentBOX Site

Site institucional e de conversão da VicentBOX — Studio de treinamento personalizado em Maringá/PR.

**Desenvolvido com:** Astro 5 + Tailwind CSS 4 + TypeScript (strict)
**Deploy:** Static Site Generation (SSG) → pasta `dist/` pronta para Hostinger, Cloudflare Pages, Netlify, Vercel.

---

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Development server
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview
```

---

## 📁 Project Structure

```
src/
├── components/
│   ├── forms/           # LeadForm (WhatsApp + Email)
│   ├── layout/          # Header, Footer, WhatsAppFloat
│   ├── sections/        # Hero, Problems, Features, SocialProof, Offer, FAQ, CTA, Methodology, ValueProps, ServiceCard
│   └── ui/              # Button, Card, Input, Container, Section, Badge, Checkbox, Icons
├── layouts/
│   └── Layout.astro     # Root layout with SEO, JSON-LD, Tracking
├── pages/
│   ├── index.astro                    # Home
│   ├── servicos.astro                 # Hub de serviços (8 cards)
│   ├── treinamento-multifuncional.astro  # LP 1 (Prioridade)
│   ├── grupo-corrida.astro            # LP 2 (Prioridade)
│   ├── consultoria-online.astro       # LP 3 (Prioridade)
│   ├── studio.astro                   # Galeria placeholder
│   ├── sobre.astro                    # Sobre Fernando + metodologia
│   ├── contato.astro                  # Contato + formulário geral
│   ├── obrigado.astro                 # Pós-conversão dinâmica
│   └── 404.astro                      # Not found
├── styles/
│   └── global.css       # Tailwind + design tokens + utilities
├── types/
│   └── index.ts         # SiteConfig, Services, FAQs, Types
└── utils/
    ├── tracking.ts      # GA4/GTM/Meta/Ads + dataLayer events
    ├── jsonld.ts        # LocalBusiness, Service, Product, FAQPage, BreadcrumbList
    └── whatsapp.ts      # Deep link generator + validation
```

---

## 🎯 Pages & Conversion Flow

| Page | Type | CTA | Redirect |
|------|------|-----|----------|
| `/` | Home | WhatsApp | `wa.me` |
| `/servicos` | Hub | → LPs | Internal |
| `/treinamento-multifuncional` | LP 1 | WhatsApp | `wa.me` + `/obrigado` |
| `/grupo-corrida` | LP 2 | WhatsApp | `wa.me` + `/obrigado` |
| `/consultoria-online` | LP 3 | Email (Formspree) | `/obrigado` |
| `/studio` | Gallery | WhatsApp | `wa.me` |
| `/sobre` | Authority | WhatsApp | `wa.me` |
| `/contato` | Contact | Email + WhatsApp | `/obrigado` |
| `/obrigado` | Thank You | Dynamic | Context-aware |

---

## 📦 Key Features

- **Zero JS by default** — Astro islands only for forms/tracking
- **WCAG 2.1 AA** — Semantic HTML, ARIA, focus states, 4.5:1 contrast
- **Core Web Vitals optimized** — LCP < 2.5s, CLS < 0.1, TBT < 200ms
- **SEO Technical** — sitemap.xml, robots.txt, canonical, hreflang, JSON-LD
- **Tracking Ready** — GA4 + GTM + Meta Pixel + Google Ads (dataLayer)
- **Forms** — WhatsApp deep-links (instant) + Formspree (email)
- **Self-hosted fonts** — Inter + Plus Jakarta Sans via @fontsource
- **Fluid typography/spacing** — `clamp()` based design tokens

---

## 🔧 Configuration

### 1. Environment Variables

Copy `.env.example` to `.env` and fill:

```bash
cp .env.example .env
```

Required for tracking/forms:
- `GA4_MEASUREMENT_ID` — G-XXXXXXXXXX
- `GTM_CONTAINER_ID` — GTM-XXXXXXX
- `META_PIXEL_ID` — Pixel ID
- `GOOGLE_ADS_CONVERSION_ID` + `GOOGLE_ADS_CONVERSION_LABEL`
- `FORMSPREE_ENDPOINT` — https://formspree.io/f/xxxxxxxx

### 2. Formspree Setup

1. Create account at [formspree.io](https://formspree.io)
2. Create new form → get endpoint `https://formspree.io/f/xxxxxxxx`
3. Add to `.env` as `FORMSPREE_ENDPOINT`
4. Configure email notifications to `vicentbox71@gmail.com`

### 3. WhatsApp Number

Configured in `src/types/index.ts`:
```typescript
whatsappNumber: '5544999218147',  // 55 + DDD + número
phoneFormatted: '(44) 99921-8147',
```

### 4. Tracking Events (dataLayer)

| Event | Trigger | Parameters |
|-------|---------|------------|
| `generate_lead` | Form submit | `form_type`, `value`, `currency` |
| `contact` | WhatsApp click | `method: 'whatsapp'`, `source` |
| `view_item` | Service view | `service_name`, `price`, `currency` |
| `page_view` | Page load | `page_title`, `page_location` |

---

## 🎨 Design System

### Colors
```css
Primary:   #1C4EDIA  (trust/health)  -- primary-700
Secondary: #059669   (nature/movement) -- secondary-600
Accent:    #DC2626   (CTA/urgency)    -- accent-600
WhatsApp:  #25D366   (actions)        -- green-600
```

### Typography
- **Headings:** Plus Jakarta Sans (500-800)
- **Body:** Inter (400-700)
- **Fluid scale:** `clamp(min, preferred, max)` via `text-fluid-*` utilities

### Spacing
- Base: 4px
- Fluid: `clamp(1rem, 2vw, 2rem)` via `spacing-fluid-*` utilities

### Components (Tailwind `@layer components`)
- `.btn`, `.btn-primary`, `.btn-secondary`, `.btn-outline`, `.btn-ghost`, `.btn-whatsapp`
- `.input`, `.label`, `.form-group`
- `.card`, `.card-hover`
- `.badge`, `.badge-primary`, `.badge-secondary`, `.badge-accent`
- `.container-custom`, `.section`, `.section-sm`
- `.heading-section`, `.heading-section-title`, `.heading-section-subtitle`

---

## 📝 Content Management

All copy/content lives in `src/types/index.ts`:

- `siteConfig` — Business info, contact, social, hours
- `services[]` — 8 services with pricing, features, CTAs
- `faqTreinamento`, `faqCorrida`, `faqConsultoria` — FAQ arrays
- `problemsTreinamento`, `benefitsTreinamento`, `benefitsCorrida`, `featuresConsultoria` — LP sections

**To update copy:** Edit `src/types/index.ts` → rebuild.

---

## 🖼️ Images & Assets

- Place images in `public/` (e.g., `/public/app-mockup.jpg`)
- Reference in components as `/app-mockup.jpg`
- Astro Image + Sharp configured for optimization
- Placeholders: Use `bg-neutral-100` with descriptive text

**Needed assets:**
- `/public/og-default.jpg` (1200x630) — Open Graph default
- `/public/favicon.svg` — Favicon
- `/public/app-mockup.jpg` — Consultoria Online hero
- Studio photos (12) → `/studio` page
- Testimonial avatars → LP SocialProof sections
- Fernando photo → `/sobre` page

---

## ✅ Validation Checklist

```bash
# 1. TypeScript strict check
npx astro check

# 2. Production build
npm run build

# 3. Local preview
npm run preview

# 4. Playwright smoke tests (optional)
npx playwright test

# 5. Lighthouse CI (optional)
npx @lhci/cli autorun
```

**Expected results:**
- Build: Exit 0, `dist/` generated
- All 8 routes: HTTP 200
- Forms: Submit → correct redirect (WhatsApp/email)
- Lighthouse: ≥90 Performance/Accessibility/Best Practices/SEO
- Rich Results Test: LocalBusiness, Service, FAQPage valid

---

## 🚀 Deploy

### Hostinger (File Manager / Git)

1. Build: `npm run build`
2. Upload contents of `dist/` to `public_html/`
3. Ensure `.htaccess` handles SPA fallback (not needed for SSG)
4. Configure SSL (Let's Encrypt)

### Cloudflare Pages

1. Connect GitHub repo
2. Build command: `npm run build`
3. Build output directory: `dist`
4. Environment variables: Add all from `.env`
5. Custom domain: `vicentbox.com.br` → DNS → Cloudflare

### Netlify / Vercel

Same as Cloudflare Pages — zero config needed for Astro SSG.

---

## 📋 TODO Checklist (Post-Launch)

- [ ] Add real photos to `/studio` (12 images)
- [ ] Collect 6-8 testimonials with photos/results
- [ ] Add Fernando photo to `/sobre`
- [ ] Create `og-default.jpg` (1200x630)
- [ ] Set up Google Business Profile (GBP)
- [ ] Submit sitemap to Google Search Console
- [ ] Configure GA4/GTM/Meta/Ads with real IDs
- [ ] Set up Formspree endpoint
- [ ] Test all forms end-to-end
- [ ] Add hCaptcha/Turnstile to forms (spam protection)
- [ ] Create blog structure (MDX) for SEO articles
- [ ] Set up monitoring (uptime, errors)

---

## 📄 License

Proprietary — VicentBOX / Fernando Serrano Vicentin. All rights reserved.