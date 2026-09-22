# Full-Stack Developer 2026

A GitHub-ready, Vercel-ready Next.js learning site for becoming a production-minded full-stack developer through one continuous TaskFlow project.

The course is written for learners, not only for people who already know the vocabulary. The main lessons use a casual, simple teaching style and repeatedly follow this loop:

**understand → predict → build a small change → run it → inspect evidence → break it → diagnose it → fix it → practice without copying**

## Where to start

The main route is **`/instructor`** (shown in the UI as **Guided Course**).

Choose your starting point:

- **Brand new to web development:** begin with `/foundation`, then continue to `/instructor`.
- **Comfortable with JavaScript/React but new to the stack:** begin at the appropriate Guided Course track.
- **Already working professionally:** use `/instructor`, `/deep-dives`, `/projects`, and `/handbook` as a structured reference and practice system.
- **Want the original source sequence:** `/course` preserves the connected 37-phase TaskFlow curriculum.

## What is included

- 17 guided tracks
- 316 detailed guided lessons
- 17 end-of-track projects
- 120 beginner foundation lessons/labs
- 544 lessons/labs in the original 37-phase TaskFlow reference curriculum
- 80 optional deep-dive lessons
- 10 larger milestone projects
- search across more than 1,000 learning resources
- local progress tracking and Continue Learning
- quizzes, knowledge checks, debugging exercises, and mastery exit tickets
- 18 theme-token sets
- responsive desktop/tablet/mobile UI
- accessibility and keyboard-navigation support
- copyable code blocks and print-friendly lesson styles

## Main learning path

1. Web Runtime & Developer Mental Models
2. HTML, CSS & Accessible UI Foundations
3. JavaScript Programming — TaskFlow Lite
4. TypeScript — From JavaScript to Safe Contracts
5. React — TaskFlow Lite Application
6. Next.js 16 — App Router in Production
7. NestJS 12 + Fastify 5 — Backend Architecture
8. HTTP & REST Engineering
9. PostgreSQL + Supabase — Data Engineering
10. Prisma 7 — ORM, Migrations & Data Modeling
11. Professional API & Business Logic
12. Authentication, Authorization & Multi-Tenancy
13. Forms, TanStack Query & State Architecture
14. Realtime, Storage & Collaboration
15. Testing, Security, Observability & Performance
16. Docker, CI/CD, Vercel & Production Delivery
17. Enterprise Systems & Architecture Transfer

Every track finishes with a practical project in `/projects`.

## Lesson standard

A lesson is not considered finished because you read it or copied a code block. You should be able to:

1. explain the idea in plain language;
2. identify what layer/runtime owns it;
3. predict the expected output before running code;
4. make one small understandable change at a time;
5. prove success with browser, HTTP, database, terminal, test, container, or CI evidence;
6. deliberately reproduce one failure;
7. diagnose the first boundary where the evidence becomes wrong;
8. repair the root cause rather than randomly editing files;
9. protect important behavior with a test, type, constraint, health check, or repeatable verification;
10. adapt the idea to a slightly different requirement without copying the finished solution.

See [`COURSE_QUALITY_STANDARD.md`](./COURSE_QUALITY_STANDARD.md) for the complete standard.

## Run locally

Requirements:

- Node.js 22 LTS or compatible supported Node release for the pinned Next.js version
- Corepack
- pnpm
- Git

```powershell
corepack enable
corepack prepare pnpm@12.3.4 --activate
pnpm install
pnpm validate:content
pnpm typecheck
pnpm dev
```

Open:

```text
http://localhost:3000
```

Before pushing or deploying:

```powershell
pnpm validate:content
pnpm typecheck
pnpm build
```

## Deploy to Vercel

1. Push this project to GitHub.
2. In Vercel, choose **Add New → Project**.
3. Import the GitHub repository.
4. Let Vercel detect **Next.js**.
5. Install command: `pnpm install --frozen-lockfile` after you have committed the generated lockfile.
6. Build command: `pnpm build`.
7. Deploy.
8. Open the deployed site and test navigation, search, theme switching, progress tracking, code copy, quizzes, and several long lessons on mobile and desktop.

The documentation site itself does **not** require Supabase, PostgreSQL, Prisma, Redis, or a backend. Those are technologies taught by the course.

## Repository structure

```text
src/
├── app/                 Next.js routes
├── components/          course UI components
└── lib/                 content loaders/types

content/
├── instructor/          primary Guided Course
├── projects/            end-of-track projects
├── foundation/          prerequisite learning path
├── course/              37-phase reference curriculum
├── deep-dives/          optional slower explanations
├── guides/              phase guidance
└── milestones/          larger closed-reference projects

public/
└── search-index.json    generated local search index

scripts/
├── validate-content.mjs content and route integrity checks
└── generate_search.py   rebuild local search data
```

## Content editing

The learning content currently uses structured JSON so the site can render lessons consistently and search them locally. When editing a lesson:

- keep the tone simple and conversational;
- prefer a small runnable example over a large unexplained code dump;
- explain why the code exists before explaining syntax;
- show what the learner should expect to observe;
- include at least one realistic failure path;
- connect the lesson to TaskFlow or a track project;
- avoid repeating generic advice when the lesson needs topic-specific teaching.

After editing content:

```powershell
python scripts/generate_search.py
pnpm validate:content
```

## Technology contract taught by the course

The course intentionally teaches a pinned 2026 stack so learners can follow one coherent path without chasing moving versions. Upgrade deliberately and re-run all checkpoints when changing framework or ORM versions.

The documentation application itself is intentionally simple: Next.js + React + TypeScript, static/local content, and no required database.
