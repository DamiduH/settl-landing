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

Copy `.env.example` to `.env.local` and follow [the Supabase setup guide](supabase/README.md) to enable form storage. `NEXT_PUBLIC_SITE_URL` is optional and only needs changing for a different site address.

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the dev server with hot reload |
| `npm run build` | Create a production build |
| `npm start` | Serve the production build |
| `npm run lint` | Run ESLint |
| `npm run typecheck` | Run the TypeScript compiler without emitting files |
| `npm run test:forms` | Check validation and API behavior with mocked Supabase requests |
| `npm run test:security` | Run form and security regression checks |

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

- **Waitlist and Book a demo**: both post to `/api/forms/[kind]`, which validates and stores submissions in Supabase. The browser never receives the database secret. Duplicate waitlist emails and retries of the same demo request do not create extra rows. Requests time out after 20 seconds and failures can be retried.
- Follow [the Supabase setup guide](supabase/README.md) to apply the migration and configure the server environment. Forms return an error until Supabase is configured. Submissions are visible in the Supabase dashboard; email notifications are not configured.

## Accessibility and motion

See [the security checklist](SECURITY.md) for protections, verification results, and remaining deployment/account actions.

All animation respects `prefers-reduced-motion`. Interactive elements have visible focus styles and 44px or larger tap targets. Please keep it that way in contributions.

## Deployment

The site deploys to Vercel. Every push to `main` creates a production deployment, and pull requests get preview deployments. Form submissions require `SUPABASE_URL` and `SUPABASE_SECRET_KEY` in the server environment; see `.env.example` and the Supabase guide above. `NEXT_PUBLIC_SITE_URL` changes the canonical URL used in metadata, the sitemap and robots.txt.

## Contributing

Contributions are welcome. Read [CONTRIBUTING.md](CONTRIBUTING.md) before opening a pull request, and follow the [Code of Conduct](CODE_OF_CONDUCT.md).

## License

The code is released under the [MIT License](LICENSE).

The Settl name, logo, icons and app screenshots are **not** covered by that license: all rights are reserved. If you fork this project, replace them with your own. See [TRADEMARKS.md](TRADEMARKS.md) for the full list.
