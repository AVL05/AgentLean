# AgentLean

**Less redundant output. Same original evidence.**

AgentLean is an experimental, local-first toolkit for AI coding agents. Its first MVP executes a non-interactive command, preserves its original output locally, and prints a bounded summary that agents can consume instead of repetitive progress logs.

> **Status: early v0.1.0.** No claim of measured token, monetary, or subscription quota savings. Automatic test caching, context interception, and native hooks are not yet implemented.

## Why use it?

- **Reversible output reduction:** full original logs available on demand.
- **Useful failure summaries:** candidate error lines are surfaced without hiding the complete record.
- **Original exit status:** failed commands remain failed.
- **No model, API key, account, Docker, or network connection.**
- **Agent-neutral:** Codex and Claude Code can follow the same portable Agent Skills instructions.

## Quick start

Requires Node.js 20+.

```bash
git clone https://github.com/AVL05/AgentLean.git
cd AgentLean
npm link
agentlean run -- node --version
agentlean run -- npm test
```

The executable is linked from the local checkout; this is **not** an npm registry release. To see everything: `agentlean run --full -- node --version`. To inspect a log use `agentlean logs .agentlean/logs/NAME.log`.

## Available skills

| Skill | Status |
| --- | --- |
| [OutputShield](skills/output-shield/SKILL.md) | Functional with explicit CLI wrapper |
| [ErrorLens](skills/error-lens/SKILL.md) | Functional heuristic diagnostics |
| [TestOnce](skills/test-once/SKILL.md) | Guidance; caching not implemented |
| [WorkCache](skills/work-cache/SKILL.md) | Guidance; caching not implemented |
| [ContextEngine](skills/context-engine/SKILL.md) | Guidance; automatic context reuse not implemented |

To use skills, copy the desired `skills/<name>` folder into the skills directory supported by your installed Codex or Claude Code release. The CLI is installed separately via `npm link`; skills alone do not intercept command output. See [installation](docs/installation.md).

## Verify

```bash
npm test
npm run benchmark
```

The included benchmark measures **synthetic command output bytes only**, not actual tokens, quota usage, or agent success.

## Principles

Preserve correctness; never silently skip tests; retain the raw logs; make compression optional; no remote telemetry; do not imply proven savings before agent-level benchmarks.

Read [Architecture](docs/architecture.md), [Benchmarks](docs/benchmarks.md), [Security](SECURITY.md), and [Contributing](CONTRIBUTING.md). Distributed under the [MIT license](LICENSE).
