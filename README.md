# Cislunar Viewer

Production-minded Artemis II mission viewer built as a monorepo with a reusable mission engine, offline mission artifacts, validated data loading, and a polished Next.js 3D UI.

## Monorepo layout

```text
apps/
  web/               # Next.js app shell, scene, controls, telemetry
packages/
  mission-engine/    # interpolation, telemetry derivation, event helpers
  space-data/        # mission bundle loading + JSON validation
  ui/                # shared UI primitives
data/
  missions/
    artemis-ii/      # trajectory, events, latest-state, media
scripts/
  validate-mission-data.mjs
```

## Features

- Artemis II seeded mission replay
- Live/latest-state mode from precomputed artifacts
- 3D Earth/Moon/spacecraft scene with mission path
- Timeline scrubber, play/pause, camera + scale modes
- Telemetry panel: Earth distance, Moon distance, velocity, MET, next event ETA, round-trip light time
- Narrative/event overlays and media markers
- Extensible package boundaries for future missions like Artemis I, Apollo 8, and later Artemis flights

## Data model

Artifacts live in `data/missions/artemis-ii/`:

- `trajectory.json`: versionable trajectory samples in kilometers
- `events.json`: narrative, burn, milestone, and media timeline events
- `latest-state.json`: current/latest mission pointer for live mode
- `media.json`: timeline-linked media markers

The browser never calls JPL directly. Data is intended to be fetched and preprocessed offline, then validated server-side or at build time before delivery.

## Getting started

```bash
pnpm install
pnpm validate:data
pnpm test
pnpm --filter web dev
```

Open `http://localhost:3000`.

## Quality gates

- `pnpm validate:data`
- `pnpm test`
- `pnpm build`

## Architecture notes

- `@cislunar/mission-engine` owns interpolation and telemetry math.
- `@cislunar/space-data` validates and serves mission bundles.
- `@cislunar/ui` exposes shared design primitives.
- `apps/web` focuses on presentation, controls, and scene orchestration.
- Mission data is versionable and can later be replaced by a stronger Horizons/SPICE preprocessing pipeline without disturbing the UI contract.

## Roadmap / next steps

1. Replace seeded Artemis II trajectory with Horizons/SPICE-derived ephemerides.
2. Add camera anchoring logic so camera modes affect framing, not just UI state.
3. Add comparison mode for Apollo 8 / Artemis I.
4. Move latest-state generation into a scheduled ingest pipeline.
5. Add API routes for mission catalog and media pagination.
