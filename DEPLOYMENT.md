# GitHub and Vercel Deployment

## Local release check

```powershell
corepack enable
corepack prepare pnpm@12.3.4 --activate
pnpm install
pnpm validate:content
pnpm typecheck
pnpm build
```

Run the production build locally when possible:

```powershell
pnpm start
```

## GitHub

Create a repository, then from this project folder:

```powershell
git init
git add .
git commit -m "feat: publish full-stack developer course"
git branch -M main
git remote add origin <YOUR_GITHUB_REPOSITORY_URL>
git push -u origin main
```

Commit `pnpm-lock.yaml` after the first successful install. The lockfile is important for repeatable CI/Vercel builds.

## Vercel

- Framework preset: Next.js
- Install: `pnpm install --frozen-lockfile`
- Build: `pnpm build`
- Output: Next.js default
- Environment variables: none required for the documentation site

After deployment, test at minimum:

- home page
- Guided Course track page
- several long lessons
- mobile menu
- code-copy button
- search
- theme switching
- progress completion
- quiz state
- project pages
- print view

## Common deployment problems

### Lockfile is missing

Run `pnpm install` locally and commit `pnpm-lock.yaml`.

### Frozen lockfile failure

Your dependency manifests and lockfile disagree. Run `pnpm install` intentionally, review the lockfile diff, then commit it.

### TypeScript fails only in CI

Compare Node/pnpm versions, case-sensitive import paths, generated files, and ignored local files.

### Build works locally but a route fails after deploy

Check route casing, static content file paths, environment differences, and the Vercel build/runtime logs.
