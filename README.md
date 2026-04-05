# Cislunar Viewer

Production-minded Artemis II mission viewer built as a monorepo with a reusable mission engine, offline mission artifacts, validated data loading, and a polished Next.js 3D UI.

## Monorepo layout

```text
apps/
  web/               # Next.js app shell, scene, controls, telemetry
packages/
  mission-engine/    # interpolation, telemetry derivation, event helpers
  space-data/        # mission bundle loading + artifact validation
  ui/                # shared UI primitives
data/
  missions/
    artemis-ii/      # trajectory, events, latest-state, media
scripts/
  sync-artemis-ii.mjs
  validate-mission-data.mjs
```

## Features

- Artemis II mission replay with a hybrid trajectory dataset
- Live/latest-state mode from precomputed artifacts
- 3D Earth/Moon/spacecraft scene with mission path
- Timeline scrubber, play/pause, camera + scale modes
- Telemetry panel: Earth distance, Moon distance, velocity, MET, next event ETA, round-trip light time
- Narrative/event overlays and media markers
- Extensible package boundaries for future missions like Artemis I, Apollo 8, and later Artemis flights

## What is real vs seeded right now

### Real / generated from external data

- **Moon ephemeris in `trajectory.json`** comes from **JPL Horizons** (`COMMAND='301'`, vectors relative to Earth, ICRF, 2-hour cadence).
- **`latest-state.json`** is generated from the current wall clock by snapping to the nearest trajectory sample.
- **Distance-to-Moon telemetry** now uses per-sample Moon positions when present instead of a single hard-coded Moon location.

### Still modeled / seeded

- **Orion / Artemis II spacecraft positions are still a proxy path.** Artemis II spacecraft vectors are not publicly available in Horizons, so the current path is a maintainable hybrid model shaped from the mission timeline against real Moon ephemerides.
- **`events.json`** is still a seeded narrative mission timeline.
- **`media.json`** is still seeded with curated NASA image links.
- The **3D Moon mesh in the scene is still rendered in a simplified static location**; telemetry uses the richer per-sample Moon vectors, but the visual scene has not been fully upgraded to animate lunar motion yet.

So: this repo is no longer pretending the whole trajectory is “real”, but it is also not fully flight-grade yet. Honest beats pretty.

## Data model

Artifacts live in `data/missions/artemis-ii/`:

- `trajectory.json`: hybrid trajectory samples in kilometers, including real JPL Horizons Moon vectors plus modeled Orion positions
- `events.json`: narrative, burn, milestone, and media timeline events
- `latest-state.json`: generated latest pointer for live mode
- `media.json`: timeline-linked media markers

The browser never calls JPL directly. Horizons is used offline to generate versionable artifacts that are validated before delivery.

## Getting started

```bash
pnpm install
pnpm sync:data
pnpm validate:data
pnpm test
pnpm --filter web dev
```

Open `http://localhost:3000`.

## Quality gates

- `pnpm sync:data`
- `pnpm validate:data`
- `pnpm test`
- `pnpm build`

## Architecture notes

- `@cislunar/mission-engine` owns interpolation and telemetry math.
- `@cislunar/space-data` validates and serves mission bundles.
- `@cislunar/ui` exposes shared design primitives.
- `apps/web` focuses on presentation, controls, and scene orchestration.
- `scripts/sync-artemis-ii.mjs` is the offline ingestion step that queries Horizons and regenerates the Artemis II artifacts.
- Mission data is versionable and can later move from the current hybrid model to a stronger Horizons + SPICE pipeline without disturbing the UI contract.

## Current Artemis II artifact modeling

The repo currently models mission data as four artifacts:

1. **Trajectory**: timestamped samples of spacecraft position in km, now optionally carrying per-sample Moon positions too.
2. **Events**: sorted timeline entries used for the dashboard and next-event logic.
3. **Latest state**: a pointer into the trajectory plus a human summary for live mode.
4. **Media**: static cards linked to timeline events.

That split still feels sane, so I kept it. The change here is not a schema explosion; it is a more honest source pipeline.

## Roadmap / next steps

1. Replace the modeled Orion proxy with mission-specific state vectors when Artemis II data becomes available, or switch to a historic cislunar mission whose full spacecraft ephemeris already exists.
2. Add SPICE-based enrichment for frame transforms and higher-fidelity body geometry.
3. Animate the Moon in the 3D scene using the same per-sample vectors already used by telemetry.
4. Move latest-state generation into a scheduled ingest pipeline.
5. Add API routes for mission catalog and media pagination.
