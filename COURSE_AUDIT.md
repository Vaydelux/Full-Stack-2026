# Course Content Audit

This file records the structural checks used for the GitHub-ready course repository.

## Primary Guided Course

- 17 guided tracks
- 316 guided lessons
- 17 end-of-track projects
- 316 distinct worked examples (one per guided lesson)
- 1,580 lesson knowledge-check prompts
- 170 interactive track-quiz questions
- roughly 614,000 structured instructional words in the Guided Course data
- median guided lesson size: roughly 1,900 structured words

The raw word count is not treated as a quality score. The lesson standard is evidence-based: explanation, worked example, expected result, controlled failure, debugging, practice, and transfer.

## Additional learning material

- 120 foundation lessons/labs
- 544 lessons/labs across the original 37-phase TaskFlow reference curriculum
- 80 optional deep-dive lessons
- 10 larger mastery milestones
- more than 1,000 searchable learning resources

## Final-pass changes

The primary Guided Course was rewritten so every lesson now has:

- a casual plain-English explanation section;
- a concept-specific worked example instead of a reused generic snippet;
- explicit expected evidence;
- a controlled failure lab;
- symptom-to-investigation troubleshooting;
- common learner mistakes and better approaches;
- five practice levels: Follow, Modify, Debug, Build, Defend;
- five lesson-specific knowledge checks;
- production notes and a mastery exit ticket.

Seventeen track projects were added so learners repeatedly close the transcript and build something without following the lesson line-by-line.

## Automated checks included in the repository

`pnpm validate:content` verifies:

- guided track files exist;
- lesson counts match metadata;
- track and lesson slugs are unique;
- required lesson sections exist;
- every guided lesson has a worked example, failure lab, practice ladder, knowledge checks, and casual teaching guide;
- every guided track has a project;
- search entries exist for guided lessons and projects;
- search URLs are unique.

The repository also includes GitHub Actions CI for content validation, typechecking, and a production Next.js build.

## Build verification note

The generation environment used to assemble this archive does not have the project’s npm dependencies installed and cannot guarantee package-registry access. Source syntax and content structure are checked locally, but a dependency-backed `pnpm install`, `pnpm typecheck`, and `pnpm build` should be run on the developer machine or CI before the first Vercel production deployment.
