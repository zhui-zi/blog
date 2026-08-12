# Keita Blog

Personal blog for [keita.cc](https://keita.cc/), built with Astro and the [Typography](https://github.com/moeyua/astro-theme-typography) theme.

## Development

```bash
corepack enable
pnpm install --frozen-lockfile
pnpm dev
```

Run the production checks with:

```bash
pnpm lint
pnpm build
```

## Content

Posts live under `src/content/posts/YYYY/MM/DD/`. Create a dated post interactively with:

```bash
pnpm theme:create
```

Site settings are in `src/.config/user.ts`. The build output is written to `dist/`.

## License

The Typography theme is available under the MIT License. See `LICENSE` for attribution.
