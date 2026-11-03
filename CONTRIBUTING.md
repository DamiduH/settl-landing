# Contributing to the Settl landing page

Thanks for helping out. This guide covers how to propose a change.

## Before you start

- For anything bigger than a small fix, open an issue first so we can agree on the approach.
- Check open issues and pull requests so you don't duplicate work.
- By taking part you agree to follow the [Code of Conduct](CODE_OF_CONDUCT.md).

## Workflow

1. **Fork** the repository and clone your fork.
2. **Create a branch** from `main` with a short, descriptive name:
   ```bash
   git checkout -b fix/faq-spacing
   ```
   Use a prefix that matches the change: `feat/`, `fix/`, `docs/`, `style/`, `refactor/`, `perf/` or `chore/`.
3. **Install and run** the site locally:
   ```bash
   npm install
   npm run dev
   ```
4. **Make your change** in small, focused commits.
5. **Check your work** before pushing:
   ```bash
   npm run lint
   npm run typecheck
   npm run build
   ```
   All three must pass.
6. **Open a pull request** against `main` and fill in the template.

## Commit messages

We use [Conventional Commits](https://www.conventionalcommits.org):

```
<type>: <short summary in the present tense>
```

Examples:

```
feat: add a pricing section
fix: stop the FAQ answers overlapping on small screens
docs: explain how to change the demo form endpoint
```

Common types: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `chore`. Keep the summary under about 72 characters and explain the why in the body if it isn't obvious.

## Code guidelines

- **TypeScript** for all components. Keep components small and put each page section in `components/sections/`.
- **Styles** go in the matching file under `app/styles/` (or `app/globals.css` for shared tokens). Use the colour tokens defined in `:root` instead of new hex values where possible. No CSS frameworks or UI kits.
- **Rounded corners** on cards, tiles and images (16px or more).
- **Motion** must respect `prefers-reduced-motion`. Animate `transform` and `opacity` rather than layout or background properties.
- **Accessibility**: real buttons and links, labels on form fields, visible focus styles, alt text on meaningful images and tap targets of at least 44px.
- **Responsive**: check your change at 360, 390, 768, 1024 and 1440 px widths with no horizontal scrolling.

## Copy guidelines

- Settl is a credit score, **not a lender**. Never write copy suggesting Settl lends money or approves loans.
- Keep sentences short and plain. Avoid em dashes.
- Use British English spelling (for example "organisation", "recognised").

## License and brand assets

By contributing, you agree that your contributions are licensed under the [MIT License](LICENSE).

The Settl name, logo, icons and app screenshots are not MIT licensed (see [TRADEMARKS.md](TRADEMARKS.md)). Don't add new brand assets without asking first, and if you fork the project, replace them before publishing.

## Reporting bugs and ideas

Use the issue templates. For bugs, include the page width, browser and steps to reproduce. Screenshots help.

## Security

Please don't open a public issue for security problems. Email randeshdaluwatte@gmail.com instead.
