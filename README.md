# Settl landing page

Settl turns freelance income and on-time bill payments into a credit score lenders can read. Settl is a credit score, not a lender.

**Live site:** https://settl-lk.vercel.app

This repository holds the marketing site: a single page with a waitlist form and a "Book a demo" form.

## Tech stack

- [Next.js](https://nextjs.org) 16 (App Router) with TypeScript and React 19
- Plain CSS, split by area in `app/styles/` (no UI kit or CSS framework)
- [Plus Jakarta Sans](https://fonts.google.com/specimen/Plus+Jakarta+Sans) through `next/font`
- [Lenis](https://github.com/darkroomengineering/lenis) for smooth wheel scrolling
- Hosted on [Vercel](https://vercel.com)

## Getting started

You need Node.js 20.9 or newer.

```bash
git clone https://github.com/randeshd/settl-landing.git
cd settl-landing
npm install
npm run dev
```

Then open http://localhost:3000.

Optionally copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_SITE_URL` if you deploy under a different address.

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the dev server with hot reload |
| `npm run build` | Create a production build |
| `npm start` | Serve the production build |
| `npm run lint` | Run ESLint |
| `npm run typecheck` | Run the TypeScript compiler without emitting files |

## Project structure

```
app/
  layout.tsx            Fonts, metadata and global styles
  page.tsx              Assembles the page from the sections below
  opengraph-image.tsx   Builds the social preview image at build time
  icon.svg, apple-icon.png, manifest.ts, robots.ts, sitemap.ts
  globals.css           Colour tokens, base styles, section headings
  styles/               CSS for motion, logo, buttons, hero, sections and modal
components/
  sections/             One file per page section (Hero, Problem, Reads, ...)
  forms/                Waitlist and demo forms
  HeroStage.tsx         Canvas dot field behind the hero
  Logo.tsx, BrandDefs.tsx  Animated Settl logo and its shared SVG defs
  Modal.tsx, ModalProvider.tsx  Accessible modal and its open/close state
  RevealObserver.tsx    Fades sections in as they scroll into view
  SmoothScroll.tsx      Lenis setup
public/
  images/, logos/, icon-*.png
```

## Forms

- **Waitlist**: front end only for now. It validates and shows a success state but does not send data anywhere.
- **Book a demo**: posts to [FormSubmit](https://formsubmit.co) (`components/forms/DemoForm.tsx`). If you fork this project, change the endpoint to your own address so requests don't come to the Settl team.

## Accessibility and motion

All animation respects `prefers-reduced-motion`. Interactive elements have visible focus styles and 44px or larger tap targets. Please keep it that way in contributions.

## Deployment

The site deploys to Vercel. Every push to `main` creates a production deployment, and pull requests get preview deployments. No environment variables are required; `NEXT_PUBLIC_SITE_URL` only changes the canonical URL used in metadata, the sitemap and robots.txt.

## Contributing

Contributions are welcome. Read [CONTRIBUTING.md](CONTRIBUTING.md) before opening a pull request, and follow the [Code of Conduct](CODE_OF_CONDUCT.md).

## Brand assets

The Settl name, logo and app screenshots belong to the Settl team. Please don't use them to represent another product.
