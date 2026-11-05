---
name: error-lens
description: Use after a verbose command fails to focus on actionable diagnostics without losing access to the complete output.
---
# ErrorLens

Use AgentLean's failure summary to locate candidate diagnostics. These are regex matches, not a trustworthy root-cause determination. When uncertain, read the complete log with `agentlean logs <path>`. Check independent errors and rerun relevant validation after changing code.

This skill does not work as an automatic hook or proxy; use the CLI explicitly.
