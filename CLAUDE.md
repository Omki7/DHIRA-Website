# CLAUDE.md — DHIRA Website v3

## MANDATORY NEXT.JS DEVELOPMENT INSTRUCTIONS

Before starting any Next.js development task, read NEXTJS_ARCHITECTURE.md.

This document defines the approved project architecture, folder structure, routing conventions, Server and Client Component boundaries, API architecture, coding standards and development guidelines.

All future implementations must follow these standards.

Inspect existing code before making modifications. Reuse established patterns wherever appropriate. Do not introduce unnecessary architectural changes or dependencies.

Update NEXTJS_ARCHITECTURE.md when approved architectural decisions change.

## Also read

- [NEXTJS_ARCHITECTURE.md](NEXTJS_ARCHITECTURE.md): architecture, folder structure, standards, migration roadmap.
- [AGENTS.md](AGENTS.md): the never-break kernel (section grammar, voice, design rules) and the router to the topic docs in [docs/](docs/). All of its instructions still apply.

AGENTS.md and docs/ were written before the code moved into `src/`. Translate
their paths with the table in NEXTJS_ARCHITECTURE.md §3 (for example
`lib/content.ts` is now `src/services/content/content.ts`).
