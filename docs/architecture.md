# Architecture & limitations

- Portable `SKILL.md` documents tell coding agents when to use optional optimizations.
- Node.js CLI `agentlean run -- command` spawns the requested process without a shell, captures full stdout/stderr to a local `.agentlean/logs/` file, and emits bounded diagnostics.
- On failures or ambiguity, restore original output with `agentlean logs <path>`.
- No network requests, AI model calls, mandatory configuration, or automatic test skipping.

**Limitations:** Output is buffered until the child process exits in summary mode, so use only for noninteractive programs. stdout and stderr ordering is not guaranteed across streams. Error detection is regex-based and may miss important messages. Full logs may contain credentials and must be protected. On platforms where executables such as `npm.cmd` require a command shell, invoke the appropriate launcher; no implicit shell is used.

**Future work:** safely invalidate deterministic caches, benchmark real agents, design hooks/adapters for each platform, optimize context without losing code necessary for reasoning. These features are not yet available.
