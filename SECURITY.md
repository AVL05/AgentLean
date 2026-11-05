# Security

AgentLean runs commands with the invoking user's privileges; it is not a sandbox. Only run trusted commands. Full logs are stored locally under `.agentlean/logs/` and may include secrets. The directory is gitignored, but users must still protect and periodically clean up sensitive logs. Report vulnerabilities privately where possible.
