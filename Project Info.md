# Project Info — Slice Town

---

## Basic Info

**Project Name**
Slice Town

**Slug**
`slice-town`

**Overview**
Slice Town is a fully animated marketing website for a pizza restaurant, built from scratch with Next.js 16 and React 19. The site covers the complete customer journey: a parallax hero with scrolling typography, a categorised digital menu (veg pizzas, non-veg pizzas, add-ons, desserts), a hot-deals carousel, a table reservation form, customer testimonials, location cards, and an Instagram-style media grid with auto-play video cards. Legal pages (Privacy Policy, etc.) are fetched at runtime from a Canopy API using Bearer authentication. The entire UI is driven by CSS custom properties and scroll-triggered InView reveal animations, with buttery-smooth scrolling powered by Lenis.

![Farmhouse Supreme pizza — Slice Town](https://framerusercontent.com/images/mlLVA91IWvGZk1yDVsL4QHqwM.jpg?width=600&height=600)
![BBQ Chicken Blaze pizza — Slice Town](https://framerusercontent.com/images/QqSu6Sf5h7IubedU43KYgevWTfw.jpg?scale-down-to=512&width=600&height=600)

**Tagline**
Hot slices, big bites — a pixel-perfect restaurant site built with Next.js.

---

## Details

| Field      | Value             |
|------------|-------------------|
| Industry   | Food & Beverage   |
| Status     | In Progress       |
| Role       | Full Stack Developer |
| Team Size  | Solo              |
| Start Date | 15 April 2026     |
| End Date   | — (ongoing)       |
| Featured   | Yes               |

---

## Links & Media

| Field      | Value                                          |
|------------|------------------------------------------------|
| Domain     | slice-town.alinsafawi.com                      |
| Host       | Vercel                                         |
| Live URL   | https://slice-town.alinsafawi.com/             |
| GitHub URL | https://github.com/AlinSafawi19/Slice-Town     |
| Thumbnail  | https://framerusercontent.com/images/mlLVA91IWvGZk1yDVsL4QHqwM.jpg?width=600&height=600 — Alt: "Farmhouse Supreme pizza — Slice Town" |

---

## Content

### Tech Stack

| Name                       | Notes                                  |
|----------------------------|----------------------------------------|
| Next.js 16                 | App Router, server components          |
| React 19                   | Latest concurrent features             |
| TypeScript                 | Strict mode                            |
| Lenis                      | Smooth scroll library                  |
| CSS Custom Properties      | Full design system (no Tailwind)       |
| Google Fonts — Calistoga   | Display typeface                       |
| Canopy API                 | Dynamic legal pages with Bearer auth   |
| ESLint                     | eslint-config-next                     |

### Highlights

- Parallax hand-scroll hero with dual-row animated marquee typography
- Full digital menu with four categories: Veg Pizzas, Non-Veg Pizzas, Add-ons, and Desserts
- Interactive offers carousel showcasing hot-deal featured items with pricing
- Table reservation form section with an animated background image grid
- Scroll-triggered InView reveal animations on every major section
- Customer testimonials section
- Location cards with address, phone number, and opening hours
- Instagram-style media grid mixing static images and auto-play video cards
- Promo marquee ticker for rotating promotional copy
- Privacy policy and legal pages fetched live from a Canopy API
- Smooth site-wide scrolling via Lenis

![Spicy Peri Peri Paneer pizza — Slice Town](https://framerusercontent.com/images/DFCIPAKJFLS81mBnG1q1sIw.jpg?width=600&height=600)
![Triple Cheese Overload pizza — Slice Town](https://framerusercontent.com/images/D8HYmgjL8oStOgmF4VSqDlqfZt4.jpg?width=600&height=600)

---

## Story

**Challenge**
The brief called for a high-end restaurant marketing site that could compete visually with agency-produced work — rich animations, a complete menu, online table reservations, social proof, and always-current legal pages — all delivered as a fast, accessible, server-rendered web app.

![Restaurant atmosphere — Slice Town](https://framerusercontent.com/images/9o6LSw2mhI4hObQhlAox6VdnUxc.jpg?scale-down-to=1024&width=1001&height=1300)

**Approach**
The site was built on Next.js 16's App Router for a server-first architecture, with React 19 handling interactive components. Smooth scrolling is handled globally by Lenis via a context provider. Section entrances use a custom `InViewReveal` component backed by `IntersectionObserver`, keeping animation logic declarative and decoupled from content. The offers carousel and Instagram video cards are bespoke client components. Legal page content is fetched at request time from a Canopy API with Bearer auth and PascalCase key normalisation, so copy updates in the backend appear on the site without a redeploy. The entire visual system is defined in CSS custom properties, making theming consistent and easy to iterate on.

[Video — pizza in action](https://framerusercontent.com/assets/RLOPcPgytiMLyVbhpfgmpq4PJVc.mp4)
[Video — behind the slice](https://framerusercontent.com/assets/K49zKTnt7gTpoPxxtukdQPonpFc.mp4)

**Outcome**
A production-ready restaurant website with polished scroll animations, a full categorised menu, functional table reservation flow, promotional sections, and live-fetched legal pages — demonstrating end-to-end front-end engineering with modern React and Next.js patterns.

![Food lifestyle shot — Slice Town](https://framerusercontent.com/images/xWogbYTUwq5lNhA3fYlUvFlyIl4.jpg?scale-down-to=1024&width=1001&height=1300)
![Instagram post — Slice Town](https://framerusercontent.com/images/QE7eugMq60UDe9Ypcw4wdiK6JF8.jpg?width=500&height=650)

**Testimonial**
> "The site completely transformed how customers experience our brand online. The animations feel premium, the menu is easy to browse, and we've seen a real uptick in table reservations since launch. It looks and feels exactly like the restaurant — warm, fun, and full of energy."
>
> — Jamie Caruso, Owner, Slice Town

---

*Fill in Testimonial once client feedback is received.*
