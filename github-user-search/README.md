# GitHub User Search

A Vite and React application that searches the GitHub REST API for people by
username, location, and minimum public-repository count. Search results are
enriched with full profile data and presented in a responsive Tailwind CSS UI.

## Setup

```bash
npm install
cp .env.example .env
npm run dev
```

`VITE_GITHUB_API_KEY` is optional for public data. When supplied, the service
sends it through the GitHub `Authorization` header to increase the API rate
limit. The real `.env` file is ignored and must never be committed.

## Features

- Controlled username, location, and repository-count filters.
- GitHub search qualifiers and paginated `page`/`per_page` requests.
- Concurrent profile enrichment with `Promise.all`.
- Explicit loading, error, empty, and success states.
- A mobile-first Tailwind CSS v4 interface with a “Load more” flow.

## Production Build

```bash
npm run build
npm run preview
```

## Deployment

The app is ready for a Vite-compatible Vercel deployment. External deployment
was not performed in this local curriculum-validation run, and no live URL or
production token is claimed. In Vercel, configure `VITE_GITHUB_API_KEY` in the
project environment rather than committing a secret.
