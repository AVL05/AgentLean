# Installation

Requires Node.js 20 or later. No API key or hosted service.

```bash
git clone https://github.com/AVL05/AgentLean.git
cd AgentLean
npm link
agentlean run -- node --version
```

This links the local checkout. It does not download a published npm package.

## Codex / Claude Code

Copy any `skills/<name>` directory into the user-level or project-level Agent Skills directory supported by the current agent version. Consult your agent's official documentation for the correct directory and reload skills if needed. The CLI is installed separately; copying a skill does not install or configure tool interception or hooks.

## Uninstall

Remove copied skill folders, run `npm unlink -g agentlean` if you used `npm link`, and optionally delete local `.agentlean/logs` after ensuring they contain no records you need.
