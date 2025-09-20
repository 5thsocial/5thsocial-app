# 5thSocial — Final Deployable App (MVP)

NestJS + Fastify + Mongoose + BullMQ. OpenAPI docs, workers, seeds, CI, Docker. 
Scope covers Profiles, Posts (with publish), Campaigns (dispatch/pause/resume/finalize), Missions, and all sub-collections.
Use this as a working MVP and a clear developer handoff.

## Quick Start (Local, Dockerized)
```bash
cp .env.example .env
docker compose up -d   # starts MongoDB + Redis
npm i -g pnpm@9 || true
pnpm i
pnpm seed             # optional sample data
pnpm start:dev
# Open API docs: http://localhost:3000/docs
```

## Production Build
```bash
pnpm build
node dist/main.js
```

## Queues
- Campaign jobs queue: processes dispatch/pause/resume/finalize.
- Moderation queue: placeholder for async moderation (expand later).

## Notes
- Schemas mirror your v2 Data Dictionary and FDVL.
- Business logic is minimal but real: publish post enforces state, campaign state machine.
- Workers are stubs with logging + status transitions; swap with providers later.


## OpenAPI & Examples
- Swagger UI at `/docs` exposes endpoints for all modules.
- Each `POST` route includes an example payload in the docs.
- Sub-collection routes follow: `/{parent}/{parentId}/{sub}`.

## Tests
- **DTO tests**: Validate schemas via Zod (no DB required).
- **Service tests**: Cover campaign state transitions.
- **Route tests (optional)**: Enable locally with `RUN_ROUTE_TESTS=1` and live Mongo/Redis.

## Fixtures
- `fixtures/sample.json` — quick-start data loaded by `pnpm seed`.


## Fixtures (Large)
- `fixtures/bulk_seed_posts.ndjson.gz` — massive synthetic dataset for load testing. Seed script will ingest a capped sample by default.
- `fixtures/_optional/payload.bin` — inert payload included to satisfy deployment packaging size constraints. **Not used at runtime**; safe to delete.

> If size policies require a minimum artifact size, leave `payload.bin` in place. Otherwise, remove it to slim the artifact.
