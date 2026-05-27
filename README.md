# Personal Portfolio Workspace

Monorepo-style scaffold with isolated app boundaries:

- `frontend/` - Next.js + React + TypeScript + Tailwind + shadcn/ui + GSAP + Spline assets
- `backend/` - Optional API (only if contact forms, auth, CMS, analytics ingest, etc.)
- `infrastructure/` - IaC, deployment, environments
- `docs/` - architecture and decisions

## Recommended build order

1. Frontend first
2. Add backend only when a real feature needs server logic
3. Add infra once deployment target is chosen
