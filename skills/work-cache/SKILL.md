---
name: work-cache
description: Use to avoid repeating deterministic repository investigations when unchanged inputs and environments can be verified.
---
# WorkCache (guidance only)

Reuse inspection results only when their inputs are provably unchanged. Never cache network queries, auth/security decisions, side-effectful commands, or test outcomes without robust invalidation.

**Not yet implemented:** automatic command result caching. This document only guides the agent.
