# Cislunar Viewer

Cislunar mission viewer with two explicitly different truth levels: Artemis II remains the flagship hybrid future mission, and Artemis I now acts as the historically flown higher-fidelity reference mission.

This repo still does **not** try to become an open-ended mission zoo. The point of Phase 3 is narrower and more honest: keep Artemis II as the main story, then add one historical mission with public spacecraft ephemeris support so the stack can prove it handles something materially closer to full-fidelity truth.

- a clearer **SPICE/Horizons hybrid** data path
- better **latest-state honesty**
- richer **mission-phase explainability**
- stronger **3D scene context** for Artemis II events and closest approach
- a selectable **Artemis I historical dataset** built from public JPL Horizons spacecraft vectors
- explicit **fidelity comparison** between hybrid and historically flown mission data

## What Phase 3 changes

### Better Artemis II fidelity

- Artemis II remains the flagship mission bundle and primary product story.
- Artemis I is included as the historical truth-reference mission.
- Earth/Moon geometry still follows the repo's **SPICE-first kernel contract** in `data/spice/artemis-ii/kernel-manifest.json`.
- Moon state vectors are still sampled from **JPL Horizons** and written into versioned offline artifacts.
- The trajectory now carries an explicit **Artemis II mission profile**:
  - coverage window
  - phase windows
  - closest-approach estimate
  - clearer approximation notes

### Better latest-state / replay behavior

- `latest-state.json` now reports how far the current wall clock is from the nearest generated sample.
- The UI exposes that sample age directly so “latest” is not mistaken for live mission telemetry.
- Replay and latest-state modes are both framed as **Artemis II timeline views**, not separate products.

### Better visualization / explainability

- The dashboard now shows:
  - active Artemis II phase
  - sample age
  - cadence
  - closest-approach estimate
  - explicit “still approximate” notes
- The 3D scene marks the estimated **closest approach** point on the Artemis II path.
- Event jumps, Moon motion, and Earth-Moon spacing stay tied to the active Artemis II sample.

## Repo layout

```text
apps/
  web/                 # Next.js Artemis II viewer
packages/
  mission-engine/      # interpolation, telemetry derivation, phase helpers
  space-data/          # validated Artemis II bundle loading
  spice-bridge/        # SPICE kernel manifest + body/frame helpers
  ui/                  # shared UI primitives
data/
  missions/
    artemis-ii/        # trajectory, events, latest-state, media
  spice/
    artemis-ii/        # NAIF kernel manifest for reproducible offline ingest
scripts/
  sync-artemis-ii.mjs
  validate-mission-data.mjs
  validate-spice-manifest.mjs
```

## Truth model: what is real vs hybrid vs approximate

### Real / externally sourced

- **Moon vectors** come from **JPL Horizons**.
- **Kernel references** come from public **NAIF generic kernels** listed in the Artemis II manifest.
- Those sources are used **offline** to generate versioned artifacts committed in the repo.

### Hybrid

- **Artemis II / Orion spacecraft positions** are still a mission-shaped proxy.
- The viewer aligns that proxy to the Artemis II timeline while using real sampled Moon geometry.
- This keeps the repo useful now without pretending public Artemis II spacecraft SPKs are already bundled.

### Still approximate

- Orion is **not** running on released Artemis II spacecraft ephemeris yet.
- “Latest state” is **nearest-sample latest**, not live telemetry.
- Attitude, lighting, comms blackout geometry, and re-entry dynamics remain explanatory/stylized.

## Run locally

Minimal-friction path:

```bash
pnpm install
pnpm sync:data
pnpm validate:data
pnpm validate:spice
pnpm --filter web dev
```

Then open:

- `http://localhost:3000`

### What each command does

- `pnpm install` — installs workspace deps
- `pnpm sync:data` — regenerates Artemis II + Artemis I mission artifacts and the embedded data module
- `pnpm validate:data` — validates all mission artifacts under `data/missions/`
- `pnpm validate:spice` — checks the tracked NAIF kernel URLs/manifest
- `pnpm --filter web dev` — starts the Next.js app

## Validate / test locally

Use these checks before committing:

```bash
pnpm sync:data
pnpm validate:data
pnpm validate:spice
pnpm test
pnpm build
```

What they cover:

- `pnpm test`
  - mission math / interpolation tests
  - data loading + schema tests
  - web UI smoke test
- `pnpm build`
  - full workspace production build

If you only want the web test loop:

```bash
pnpm --filter web test
```

## Deploy to Vercel

This repo deploys cleanly as a monorepo Next.js app.

### Option A: Vercel dashboard

1. Import `pedroid999/cislunar-viewer` into Vercel.
2. Set the **Root Directory** to:
   - `apps/web`
3. Keep the framework as:
   - **Next.js**
4. Override the install command to:
   - `cd ../.. && pnpm install`
5. Override the build command to:
   - `cd ../.. && pnpm sync:data && pnpm build`
6. Output directory:
   - leave default for Next.js

Because the mission artifacts are generated inside the repo, running `pnpm sync:data` refreshes both the Artemis II hybrid bundle and the Artemis I historical bundle before rebuilding the embedded module.

### Option B: `vercel` CLI

From the repo root:

```bash
pnpm install
pnpm sync:data
vercel
```

For production:

```bash
vercel --prod
```

When prompted, point Vercel at `apps/web` as the app root.

## Useful commands

```bash
pnpm sync:data
pnpm validate:data
pnpm validate:spice
pnpm test
pnpm build
pnpm --filter web dev
```

## Current Artemis II architecture

1. **SPICE contract** — NAIF kernel manifest for Artemis II Earth/Moon geometry and frames
2. **Horizons bridge** — offline sampled Moon vectors aligned to that contract
3. **Hybrid Orion path** — Artemis II-only mission-shaped proxy trajectory
4. **Latest-state pointer** — wall-clock snap to nearest sample with freshness metadata
5. **UI explainability layer** — phase, cadence, sample age, event context, approximation notes

## What still remains approximate

- Mission-specific Artemis II spacecraft SPKs are not bundled here.
- Closest approach is an estimate derived from the hybrid path, not authoritative flight dynamics.
- The viewer is still a stylized 3D explainer, not a flight-certified simulator.

## Fidelity comparison

### Artemis II
- **More real now:** Earth/Moon geometry, timeline coupling, and scene context are tied to the sampled dataset.
- **Still approximate:** Orion remains a mission-shaped proxy path because public Artemis II spacecraft kernels are not bundled here.

### Artemis I
- **More real now:** Orion spacecraft vectors come directly from the public JPL Horizons Artemis I target (`-1023`), so the viewer can replay an actually flown cislunar path.
- **Still approximate:** event annotations and the browser scene are still curated/stylized rather than attitude-true or re-entry-dynamics-true.

If public Artemis II spacecraft kernels become available later, the next honest upgrade is to swap the Orion proxy for mission-specific state vectors while keeping Artemis II as the flagship mission.
