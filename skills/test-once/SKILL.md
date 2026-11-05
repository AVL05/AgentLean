---
name: test-once
description: Use during iterative development to choose proportionate checks while honoring all project-required release and CI validation.
---
# TestOnce (guidance only)

Run focused deterministic checks first. Expand to integration or E2E tests for shared state, authentication, storage, schema, and configuration changes. Always honor full validation gates imposed by the repository.

**Not yet implemented:** automatic test-result caching or dependency invalidation. Do not claim tests were cached or safely skipped.
