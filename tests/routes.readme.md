Route tests can be run locally with a live Mongo/Redis by setting:
RUN_ROUTE_TESTS=1 pnpm test:watch

They are disabled by default in CI to avoid external service requirements.
