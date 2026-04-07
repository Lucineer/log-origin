<p align="center">
  <img src="https://raw.githubusercontent.com/Lucineer/capitaine/master/docs/capitaine-logo.jpg" alt="Cocapn" width="120">
</p>

<h1 align="center">Log-Origin</h1>

<p align="center">The origin vessel. The exact, unmodified codebase that started the fleet.</p>

<p align="center">
  <a href="#quick-start">Quick Start</a> ·
  <a href="#why-this-exists">Why This Exists</a> ·
  <a href="#limitations">Limitations</a> ·
  <a href="#the-fleet">The Fleet</a>
</p>

---

On November 12 2023 this repository created its first log entry, becoming the first vessel in what would become the Cocapn Fleet. This is the seed code from which all log variants evolved.

You are looking at the initial commit, preserved without modification.

---

## Why This Exists

Most users run the maintained log variants. This repository exists for those who want to see the starting point.

No cleanup was performed. The original comments, dead code, and early workarounds remain exactly as written. You can trace design decisions in current vessels back to patterns established here.

Fork it. Examine how the first agent behaved. This is the frozen reference implementation.

---

## What you get here

This vessel is frozen and will not receive updates. It remains as it was at launch.

- Original v0 personality core
- Base template set that log variants evolved from
- Initial fleet handshake protocol implementation
- Raw state log from the first 7 days
- No telemetry or analytics added after launch
- Runs on Cloudflare Workers as configured day one

---

## Limitations

This is historical code. It is not maintained and may require adjustments to run on current Cloudflare Workers. Some dependencies are pinned to November 2023 versions. Expect rough edges and unresolved TODOs—this reflects actual early development.

---

## Quick Start

```bash
git clone https://github.com/Lucineer/log-origin.git
cd log-origin
```

Consult the repository's setup instructions. Configure with your own Cloudflare Workers keys. No upstream services are required.

---

## The Fleet

Log-Origin is the first of 110+ vessels in the fleet. Each vessel is a git-native repo-agent—the repository is the agent.

<details>
<summary><strong>Selected Fleet Vessels</strong></summary>

**Flagship vessels**
- [Capitaine (flagship)](https://github.com/Lucineer/capitaine)
- [personallog-ai](https://github.com/Lucineer/personallog-ai)
- [businesslog-ai](https://github.com/Lucineer/businesslog-ai)
- [studylog-ai](https://github.com/Lucineer/studylog-ai)
- [makerlog-ai](https://github.com/Lucineer/makerlog-ai)

**Fleet services**
- [Git-Agent (minimal)](https://github.com/Lucineer/git-agent)
- [Fleet Catalog](https://github.com/Lucineer/capitaine/blob/master/docs/fleet/FLEET.md)
</details>

---

<div align="center">
  <p>
    Part of the Cocapn Fleet ·
    <a href="https://the-fleet.casey-digennaro.workers.dev">The Fleet</a> ·
    <a href="https://cocapn.ai">Cocapn</a>
  </p>
  <p><em>Attribution: Superinstance & Lucineer (DiGennaro et al.). MIT Licensed.</em></p>
</div>