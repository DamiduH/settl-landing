# Settl landing page

Marketing site for Settl, a credit score built from freelance income and bill payment history. Settl is a credit score, not a lender.

## Stack

- Next.js (App Router, TypeScript)
- Plain global CSS split by area in `app/styles/`
- Plus Jakarta Sans via `next/font`

## Develop

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Build

```bash
npm run build
npm start
```

## Structure

- `app/page.tsx` assembles the sections in `components/sections/`
- `components/Logo.tsx` and `components/BrandDefs.tsx` draw the animated logo
- `components/Modal.tsx` holds the waitlist and demo forms
- `app/opengraph-image.tsx` builds the social preview image

## Forms

- **Waitlist** is front end only for now and shows the success state on submit.
- **Book a demo** posts to FormSubmit (`https://formsubmit.co/ajax/randeshdaluwatte@gmail.com`). The first submission triggers an activation email from FormSubmit that must be confirmed before requests are delivered.

## Deploy

Deployed on Vercel. Pushes to `main` deploy to production. Set `NEXT_PUBLIC_SITE_URL` if the site moves to a custom domain.
