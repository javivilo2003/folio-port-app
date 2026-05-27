# Architecture Note

## Current decision

- Start frontend-only.
- Keep backend scaffolded but unused until needed.

## Backend trigger rule

Add backend when at least one feature cannot be done safely on client-only:

- secret-bearing integrations
- persistent data writes/reads
- auth/session management
- server-side workflows/webhooks

## Isolated repos path

When ready, split directories into independent git repos:

1. `frontend` -> `portfolio-frontend`
2. `backend` -> `portfolio-backend`
3. `infrastructure` -> `portfolio-infra`
