---
name: output-shield
description: Use when running non-interactive commands likely to emit verbose, redundant output, such as builds or tests, while preserving complete original results.
---
# OutputShield

If the AgentLean CLI is installed, prefer `agentlean run -- <executable> [args...]` for noisy commands. The summary preserves exit status and gives a path to the original full log. If the result is ambiguous, inspect it using `agentlean logs <path>`, or rerun with `agentlean run --full -- ...`.

Do not assume a passing summary proves correctness beyond the command's actual exit code. Do not suppress required validation. Never pass secrets on a command line. Without AgentLean, run commands normally. Do not install anything automatically.
