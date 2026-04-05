# Cislunar Viewer

Production-minded Artemis II mission viewer built as a monorepo with reusable mission math, offline mission artifacts, a SPICE-first ingest boundary, validated data loading, and a polished Next.js 3D UI.

## Monorepo layout

```text
apps/
  web/                 # Next.js app shell, scene, controls, telemetry
packages/
  mission-engine/      # interpolation, telemetry derivation, event helpers
  space-data/          # mission bundle loading + artifact validation
  spice-bridge/        # SPICE kernel manifest + body/frame reference helpers
  ui/                  # shared UI primitives
data/
  missions/
    artemis-ii/        # trajectory, events, latest-state, media
  spice/
    artemis-ii/        # SPICE kernel manifest for reproducible offline ingest
scripts/
  sync-artemis-ii.mjs
  validate-mission-data.mjs
  validate-spice-manifest.mjs
```

## Phase 2 highlights

- **SPICE-first architecture:** Artemis II now carries a NAIF kernel manifest boundary for Earth/Moon geometry, frame metadata, and reproducible offline ingest.
- **More honest data contract:** trajectory source metadata now says exactly what is SPICE-oriented, what is bridged through Horizons, and what remains modeled.
- **More interactive 3D viewer:** the Moon now moves with the active sample, the camera modes actually retarget the scene, and the trail reveals mission progress instead of showing only a static full path.
- **Timeline-linked scene:** event cards jump the replay to the relevant sample, and the scene overlays the active event context.
- **Fidelity surfaced in UI:** the dashboard exposes SPICE kernel coverage and explicit approximation notes instead of implying full mission truth.

## What is real vs hybrid vs approximate now

### SPICE-backed / SPICE-oriented

- **Kernel selection and frame contract** now live in `data/spice/artemis-ii/kernel-manifest.json` and `@cislunar/spice-bridge`.
- The kernel manifest tracks the exact NAIF generic kernels intended for:
  - leap seconds (`naif0012.tls`)
  - planetary constants (`pck00011.tpc`)
  - planetary ephemerides (`de440s.bsp`)
  - lunar orientation (`moon_pa_de440_200625.bpc`)
  - lunar frame specs (`moon_de440_220930.tf`)
- **Earth/Moon body geometry and frame metadata** in the app now flow through that SPICE-oriented layer instead of being implied by ad hoc constants alone.

### Real external data, sampled offline

- **Moon state vectors in `trajectory.json`** still come from **JPL Horizons** (`COMMAND='301'`, vectors relative to Earth, ICRF, 2-hour cadence).
- This is now treated explicitly as a **bridge around the SPICE kernel contract**: the kernel set defines what authoritative geometry stack we align to, while the current offline sampler uses Horizons to produce browser-friendly artifacts.
- **`latest-state.json`** is generated from wall clock time by snapping to the nearest trajectory sample.

### Hybrid / modeled

- **Artemis II / Orion spacecraft positions remain a proxy path.** Public, mission-specific Artemis II spacecraft SPK coverage is not bundled here, so the trajectory is still modeled against the mission timeline and real Moon geometry.
- The proxy is now documented as such in both the data artifacts and the UI.

### Still approximate

- The **viewer is visually stylized**. Body textures, lighting, attitude, and spacecraft orientation are not flight-grade.
- The **Moon is position-faithful within the sampled dataset**, but the viewer is not yet rendering full SPICE attitude/orientation products or sub-observer geometry.
- **Artemis II event timing and media** are still curated timeline artifacts, not direct mission telemetry feeds.

So the repo is no longer hand-wavy about “realism”: Earth/Moon geometry has a SPICE-first home, the browser gets reproducible offline artifacts, and the Orion path is still honestly labeled hybrid.

## Data model

Artifacts live in `data/missions/artemis-ii/`:

- `trajectory.json`: hybrid trajectory samples in kilometers, including sampled Moon vectors plus modeled Orion positions
- `events.json`: narrative, burn, milestone, and media timeline events
- `latest-state.json`: generated latest pointer for live mode
- `media.json`: timeline-linked media markers

SPICE ingest metadata lives in `data/spice/artemis-ii/`:

- `kernel-manifest.json`: the NAIF kernel contract for Artemis II Earth/Moon geometry and reference frames

The browser never calls JPL or NAIF directly. External sources are used offline to generate or validate versionable artifacts.

## Getting started

```bash
pnpm install
pnpm sync:data
pnpm validate:data
pnpm validate:spice
pnpm test
pnpm --filter web dev
```

Open `http://localhost:3000`.

## Quality gates

- `pnpm sync:data`
- `pnpm validate:data`
- `pnpm validate:spice`
- `pnpm test`
- `pnpm build`

## Architecture notes

- `@cislunar/mission-engine` owns interpolation and telemetry math.
- `@cislunar/space-data` validates and serves mission bundles.
- `@cislunar/spice-bridge` owns the SPICE kernel manifest and body/frame references.
- `@cislunar/ui` exposes shared design primitives.
- `apps/web` focuses on presentation, controls, and scene orchestration.
- `scripts/sync-artemis-ii.mjs` is the offline ingestion step that queries Horizons and regenerates the Artemis II artifacts with SPICE-oriented source metadata.
- `scripts/validate-spice-manifest.mjs` verifies the tracked NAIF kernel URLs still resolve.

## Current Artemis II truth model

1. **Earth/Moon geometry**: SPICE-first kernel manifest + offline sampled Moon vectors.
2. **Spacecraft trajectory**: hybrid Artemis II proxy trajectory shaped against mission phases.
3. **Events**: curated mission narrative timeline.
4. **Latest state**: wall-clock pointer into the generated trajectory.
5. **Media**: static cards linked to timeline events.

That split still feels sane. Phase 2 improves realism without pretending Artemis II spacecraft ephemeris is already public and turnkey.

## Next steps

1. Replace the modeled Orion proxy with mission-specific spacecraft state vectors when public Artemis II kernels exist, or add a historically complete cislunar mission alongside Artemis II to prove the full stack.
2. Move from a Horizons bridge to direct SPICE sampling in the ingest path once a toolkit/runtime choice is locked in for the repo.
3. Add lunar attitude/orientation products to the scene so the Moon is not only translated but also frame-aware.
4. Add mission catalog APIs and per-mission ingest configs.
5. Add richer event-to-scene annotations such as closest-approach markers and Earth re-entry framing.
