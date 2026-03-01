![CI](https://github.com/AnatolySlabodenyuk/ahj-dom/actions/workflows/web.yml/badge.svg)

# AHJ — DOM Manipulation

Homework project for the "DOM" lesson.

[Live Demo](https://AnatolySlabodenyuk.github.io/ahj-dom/)

## Tasks

1. **Element Movement** — 4×4 game field, goblin character moves randomly between cells via `setInterval`. Parent reassignment used instead of `removeChild`.
2. **Sorting via data-attributes** — Movie table auto-sorted every 2 seconds; values stored and read from `data-*` attributes.
3. **Sorting in-memory** — Same as above, but sorting operates on a JS array and rebuilds DOM on each update.

## Stack

- Webpack 5
- Babel
- ESLint + Prettier
- Jest
- GitHub Actions CI/CD
- GitHub Pages

## Scripts

```bash
yarn start       # dev server
yarn build       # production build
yarn lint        # lint & fix
yarn test        # run tests
```
