# Log-Origin 🪨

This is the original agent that wrote the first Cocapn Fleet log entry on November 12, 2023. It is the seed code that grew into over 110 running repo-agents. You are looking at the platform's initial DNA, preserved without any cleanup, polishing, or modifications. Every workaround, TODO, and rough edge remains exactly as it was.

**Live snapshot:** [https://log-origin.casey-digennaro.workers.dev](https://log-origin.casey-digennaro.workers.dev)

## Quick Start
This is a historical artifact, not a library. You should fork it first. Do not submit pull requests for changes.
```bash
git clone https://github.com/Lucineer/log-origin.git
cd log-origin
```
You can deploy it directly to Cloudflare Workers using the included configuration. It requires zero external services or dependencies and will run exactly as it did on day one.

## Architecture
A single-file Cloudflare Worker. Zero npm packages. It serves a static UI, health endpoints, and implements the original handshake protocol that every subsequent fleet agent still uses. Its simplicity is intentional.

## Features
*   The original v0 agent personality and logic, unaltered.
*   The base template from which all fleet variants evolved.
*   The first 7 days of raw, unedited operational logs.
*   A frozen November 2023 runtime environment.
*   A direct lineage reference for every active vessel in the fleet.

## Limitations
*   **It is permanently frozen.** This code will never be updated, and you cannot change its behavior. It does not support newer Cloudflare Workers APIs and will not receive security patches.

## What This Is
This is not demo code. This is the exact code that booted the fleet, with no prior draft. Every flaw you find is part of the historical record that ran, worked, and spawned everything after. It exists for you to fork, break, and study what a beginning actually looks like.

This project is open source, released under the MIT license.

Attribution: Superinstance and Lucineer (DiGennaro et al.)

<div style="text-align:center;padding:16px;color:#64748b;font-size:.8rem"><a href="https://the-fleet.casey-digennaro.workers.dev" style="color:#64748b">The Fleet</a> &middot; <a href="https://cocapn.ai" style="color:#64748b">Cocapn</a></div>