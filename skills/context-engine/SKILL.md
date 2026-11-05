---
name: context-engine
description: Use when browsing large codebases to prioritize relevant symbols and files, expanding to full context whenever needed for correctness.
---
# ContextEngine (guidance only)

Begin with targeted symbol and filename searches. Read complete relevant functions and their dependencies. Do not rely on diffs if the earlier full version is not reliably in context. Re-read files whenever the solution requires it.

**Not yet implemented:** automatic ReadOnce or DeltaContext interception.
