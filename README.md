# Saeed Baowzir Trading Company — Brand Website

A premium, Awwwards-caliber brand experience for **Saeed Baowzir Trading Company**,
the Kingdom of Saudi Arabia's trusted wholesale distributor of beauty and
personal-care products since 1982.

> *"Forty-three years of trust, quality and leadership in beauty distribution."*

This is a **brand website (visual design & experience only)** — no login, dashboard,
cart, or e-commerce.

## Stack

- **Vue 3** (Composition API, `<script setup>`)
- **Tailwind CSS v4** (CSS-first `@theme` design tokens)
- **Vite** build tooling
- **Three.js** — the signature 3D floating glass bottle in the hero
- **Motion One** (motion.dev) — scroll reveals, staggers, animated counters,
  magnetic buttons, custom cursor

## Design system

| Token       | Value      | Role                         |
| ----------- | ---------- | ---------------------------- |
| `noir`      | `#0A0A0C`  | Primary canvas (warm black)  |
| `espresso`  | `#171310`  | Panels / alt sections        |
| `porcelain` | `#F4EFE6`  | Primary text                 |
| `champagne` | `#C9A86A`  | Gold accent                  |
| `gold-deep` | `#A07D3E`  | Gradient shadow tone         |
| `stone`     | `#8A8175`  | Muted / secondary text       |

**Type:** Fraunces (editorial display serif) · Manrope (geometric grotesque body).

## Structure

```
src/
├── App.vue                  # composition root
├── style.css                # Tailwind v4 @theme tokens + base + primitives
├── composables/             # reusable animation system
│   ├── useReveal.js         # scroll reveals + line masks + staggers
│   ├── useCounter.js        # animated statistic counters
│   ├── useParallax.js       # scroll-linked parallax
│   └── useMagnetic.js       # magnetic-button micro-interaction
└── components/
    ├── layout/              # LoaderIntro, CustomCursor, AppHeader, AppFooter
    ├── three/HeroScene.vue  # Three.js glass bottle + particles
    ├── ui/                  # SectionLabel, MagneticButton, StatCounter, ...
    └── sections/            # Hero, Trust, BrandStory, Strength, Showcase
```

## Getting started

```bash
npm install
npm run dev      # local dev server
npm run build    # production build → dist/
npm run preview  # preview the production build
```

## Accessibility & performance

- Full `prefers-reduced-motion` support — every animation collapses to a static,
  fully-visible state.
- Visible keyboard focus rings; semantic landmarks.
- WebGL is feature-detected with an elegant static fallback if unavailable.
- `three` and `motion` are code-split into their own chunks.
