import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname } from 'node:path';

const repoRoot = new URL('..', import.meta.url);
const missionDir = new URL('../data/missions/artemis-ii/', import.meta.url);
const generatedTsPath = new URL('../packages/space-data/src/generated.ts', import.meta.url);
const generatedJsPath = new URL('../packages/space-data/src/generated.js', import.meta.url);

const missionId = 'artemis-ii';
const startTime = '2026-04-01T12:00:00Z';
const closestApproachTime = '2026-04-10T12:00:00Z';
const endTime = '2026-04-13T12:00:00Z';
const stepSize = '2 h';
const spiceManifestPath = new URL('../data/spice/artemis-ii/kernel-manifest.json', import.meta.url);

async function main() {
  const [events, media, spiceManifest] = await Promise.all([
    readJson('events.json'),
    readJson('media.json'),
    readAbsoluteJson(spiceManifestPath)
  ]);

  const moonSamples = await fetchHorizonsVectors({
    command: '301',
    center: '500@399',
    startTime,
    stopTime: endTime,
    stepSize
  });

  const trajectory = buildTrajectory(moonSamples, spiceManifest);
  const latestState = buildLatestState(trajectory);

  await Promise.all([
    writeJson('trajectory.json', trajectory),
    writeJson('latest-state.json', latestState),
    writeFile(generatedTsPath, renderGeneratedModule({ trajectory, events, latest_state: latestState, media }, 'ts')),
    writeFile(generatedJsPath, renderGeneratedModule({ trajectory, events, latest_state: latestState, media }, 'js'))
  ]);

  console.log(`Synced ${missionId} artifacts with ${trajectory.samples.length} trajectory samples.`);
}

function buildTrajectory(moonSamples, spiceManifest) {
  const samples = moonSamples.map((sample) => {
    const progress = missionProgress(sample.timestamp);
    const moonPositionKm = sample.positionKm;
    const moonDistanceKm = magnitude(moonPositionKm);
    const radialProgress = progressToRadial(progress);
    const sideAxis = normalize(cross(normalize(moonPositionKm), [0, 0, 1]), [0, 1, 0]);
    const normalAxis = normalize(cross(normalize(moonPositionKm), sideAxis), [0, 0, 1]);
    const outboundAmplitudeKm = Math.min(moonDistanceKm * 0.18, 45000);
    const arcFactor = Math.sin(progress * Math.PI);
    const verticalFactor = Math.sin(progress * Math.PI * 2) * 0.35;
    const earthDepartureKm = 6678;
    const radialScaleKm = earthDepartureKm + radialProgress * Math.max(moonDistanceKm - earthDepartureKm, 0);

    const positionKm = add(
      scale(normalize(moonPositionKm), radialScaleKm),
      add(
        scale(sideAxis, outboundAmplitudeKm * arcFactor),
        scale(normalAxis, outboundAmplitudeKm * verticalFactor)
      )
    ).map(round3);

    return {
      timestamp: sample.timestamp,
      positionKm,
      moonPositionKm: moonPositionKm.map(round3)
    };
  });

  const closestSample = samples.reduce((best, sample) => {
    const distanceToMoonKm = magnitude(subtract(sample.positionKm, sample.moonPositionKm));
    if (!best || distanceToMoonKm < best.distanceToMoonKm) {
      return { timestamp: sample.timestamp, distanceToMoonKm: round3(distanceToMoonKm) };
    }
    return best;
  }, null);

  return {
    missionId,
    frame: 'earth-centered-icrf',
    units: {
      distance: 'km',
      time: 'iso8601'
    },
    spacecraft: 'Orion',
    missionProfile: {
      mission: 'Artemis II',
      focus: 'Single-mission viewer for the Artemis II crewed lunar flyby.',
      coverage: {
        start: startTime,
        closestApproach: closestApproachTime,
        end: endTime,
        cadence: stepSize
      },
      phases: buildMissionPhases(),
      closestApproachEstimate: closestSample
    },
    source: {
      kind: 'hybrid-spice-horizons',
      generatedAt: new Date().toISOString(),
      horizons: {
        target: '301',
        center: '500@399',
        ephemerisType: 'VECTORS',
        stepSize,
        referenceFrame: 'ICRF'
      },
      spice: {
        manifestMissionId: spiceManifest.missionId,
        kernelIds: spiceManifest.kernels.map((kernel) => kernel.id),
        frame: spiceManifest.frame,
        notes: spiceManifest.notes
      },
      fidelity: {
        earthMoonGeometry: 'SPICE-oriented kernel manifest with Horizons-sampled Moon vectors in an Earth-centered ICRF-compatible frame.',
        spacecraftEphemeris: 'Modeled Artemis II / Orion proxy path shaped against the Artemis II free-return timeline because public mission spacecraft SPK coverage is not bundled here.',
        viewerScene: 'Moon motion, Earth-Moon range, event targeting, and closest-approach context now follow the sampled dataset, but body rendering remains stylized rather than attitude-true.'
      },
      approximationNotes: [
        'Orion state vectors are still a mission-shaped proxy rather than released Artemis II spacecraft ephemeris.',
        'Latest mode snaps wall clock time to the nearest generated sample, so it is cadence-limited rather than telemetry-live.',
        'Attitude, lighting, re-entry dynamics, and communications geometry are explanatory visualization layers, not flight dynamics products.'
      ],
      description: 'Moon geometry follows a SPICE-first kernel selection and is sampled offline through a reproducible Horizons bridge. Orion trajectory remains an Artemis II-only proxy shaped from the crewed free-return timeline because public spacecraft state vectors are not bundled here.'
    },
    bodyCenters: {
      earth: [0, 0, 0],
      moon: moonSamples[0]?.positionKm.map(round3) ?? [384400, 0, 0]
    },
    samples
  };
}

function buildLatestState(trajectory) {
  const now = Date.now();
  const times = trajectory.samples.map((sample) => new Date(sample.timestamp).getTime());
  let sampleIndex = 0;
  let bestDistance = Number.POSITIVE_INFINITY;
  for (let index = 0; index < times.length; index += 1) {
    const distance = Math.abs(times[index] - now);
    if (distance < bestDistance) {
      bestDistance = distance;
      sampleIndex = index;
    }
  }
  const asOf = trajectory.samples[sampleIndex]?.timestamp ?? startTime;
  const phase = describePhase(asOf);
  return {
    missionId,
    asOf,
    sampleIndex,
    mode: 'latest',
    summary: phase,
    nearestSampleOffsetMinutes: Math.round(bestDistance / 60000),
    cadenceHours: Number(stepSize.replace(/\s*h/i, '')),
    source: {
      kind: 'generated',
      generatedAt: new Date().toISOString(),
      description: 'Latest-state is computed from the generated Artemis II trajectory by snapping the current wall clock to the nearest sample.'
    }
  };
}

function describePhase(atIso) {
  const at = new Date(atIso).getTime();
  const launch = new Date(startTime).getTime();
  const closest = new Date(closestApproachTime).getTime();
  const splashdown = new Date(endTime).getTime();
  if (at <= launch + 18 * 3600_000) return 'Orion is leaving Earth orbit and building toward translunar injection.';
  if (at < closest) return 'Orion is on the outbound translunar coast, using a modeled path against real Moon ephemerides.';
  if (at < splashdown - 24 * 3600_000) return 'Orion is on the return leg after closest approach, following the same hybrid trajectory model.';
  return 'Orion is approaching Earth return and splashdown in the hybrid Artemis II dataset.';
}

function missionProgress(timestamp) {
  const t = new Date(timestamp).getTime();
  const launch = new Date(startTime).getTime();
  const closest = new Date(closestApproachTime).getTime();
  const splashdown = new Date(endTime).getTime();
  if (t <= launch) return 0;
  if (t >= splashdown) return 1;
  if (t <= closest) {
    return easeInOut((t - launch) / (closest - launch)) * 0.5;
  }
  return 0.5 + easeInOut((t - closest) / (splashdown - closest)) * 0.5;
}

function buildMissionPhases() {
  return [
    {
      id: 'earth-departure',
      label: 'Earth departure',
      description: 'Launch through translunar injection and initial outbound shaping.',
      start: startTime,
      end: '2026-04-02T18:00:00Z'
    },
    {
      id: 'outbound-coast',
      label: 'Outbound translunar coast',
      description: 'Orion is tracking away from Earth on the way to the lunar flyby.',
      start: '2026-04-02T18:00:00Z',
      end: closestApproachTime
    },
    {
      id: 'return-coast',
      label: 'Return coast',
      description: 'Free-return arc back toward Earth after closest approach.',
      start: closestApproachTime,
      end: '2026-04-12T12:00:00Z'
    },
    {
      id: 'earth-return',
      label: 'Earth return',
      description: 'Final Earth approach and splashdown sequence.',
      start: '2026-04-12T12:00:00Z',
      end: endTime
    }
  ];
}

function progressToRadial(progress) {
  if (progress <= 0.5) {
    return 0.017 + easeInOut(progress / 0.5) * 0.94;
  }
  return 0.96 - easeInOut((progress - 0.5) / 0.5) * 0.943;
}

function easeInOut(value) {
  return value < 0.5 ? 4 * value * value * value : 1 - Math.pow(-2 * value + 2, 3) / 2;
}

async function fetchHorizonsVectors({ command, center, startTime, stopTime, stepSize }) {
  const params = new URLSearchParams({
    format: 'json',
    COMMAND: `'${command}'`,
    CENTER: `'${center}'`,
    EPHEM_TYPE: `'VECTORS'`,
    START_TIME: `'${isoToHorizons(startTime)}'`,
    STOP_TIME: `'${isoToHorizons(stopTime)}'`,
    STEP_SIZE: `'${stepSize}'`,
    OUT_UNITS: `'KM-S'`,
    REF_PLANE: `'FRAME'`,
    REF_SYSTEM: `'ICRF'`
  });

  const response = await fetch(`https://ssd.jpl.nasa.gov/api/horizons.api?${params.toString()}`);
  if (!response.ok) throw new Error(`Horizons request failed: ${response.status} ${response.statusText}`);
  const payload = await response.json();
  if (payload.error) throw new Error(payload.error);
  return parseHorizonsVectors(payload.result);
}

function parseHorizonsVectors(result) {
  const lines = result.split('\n');
  const start = lines.findIndex((line) => line.includes('$$SOE'));
  const end = lines.findIndex((line) => line.includes('$$EOE'));
  if (start === -1 || end === -1 || end <= start) throw new Error('Could not locate Horizons vector block.');
  const samples = [];
  for (let index = start + 1; index < end; index += 4) {
    const dateLine = lines[index]?.trim();
    const positionLine = lines[index + 1]?.trim();
    if (!dateLine || !positionLine) continue;
    const timestamp = parseHorizonsTimestamp(dateLine);
    const match = positionLine.match(/X\s*=\s*([\-+0-9.E]+)\s+Y\s*=\s*([\-+0-9.E]+)\s+Z\s*=\s*([\-+0-9.E]+)/);
    if (!match) throw new Error(`Could not parse Horizons position line: ${positionLine}`);
    samples.push({
      timestamp,
      positionKm: [Number(match[1]), Number(match[2]), Number(match[3])]
    });
  }
  return samples;
}

function parseHorizonsTimestamp(line) {
  const match = line.match(/A\.D\.\s+(\d{4})-([A-Za-z]{3})-(\d{2})\s+(\d{2}):(\d{2}):(\d{2})/);
  if (!match) throw new Error(`Could not parse Horizons timestamp: ${line}`);
  const [, year, monthAbbrev, day, hour, minute, second] = match;
  const month = {
    Jan: '01', Feb: '02', Mar: '03', Apr: '04', May: '05', Jun: '06',
    Jul: '07', Aug: '08', Sep: '09', Oct: '10', Nov: '11', Dec: '12'
  }[monthAbbrev];
  return `${year}-${month}-${day}T${hour}:${minute}:${second}Z`;
}

function isoToHorizons(iso) {
  return iso.replace('T', ' ').replace('Z', '');
}

function magnitude([x, y, z]) {
  return Math.sqrt(x * x + y * y + z * z);
}

function normalize(vector, fallback = [1, 0, 0]) {
  const mag = magnitude(vector);
  if (mag < 1e-9) return fallback;
  return vector.map((value) => value / mag);
}

function cross([ax, ay, az], [bx, by, bz]) {
  return [ay * bz - az * by, az * bx - ax * bz, ax * by - ay * bx];
}

function add([ax, ay, az], [bx, by, bz]) {
  return [ax + bx, ay + by, az + bz];
}

function subtract([ax, ay, az], [bx, by, bz]) {
  return [ax - bx, ay - by, az - bz];
}

function scale([x, y, z], factor) {
  return [x * factor, y * factor, z * factor];
}

function round3(value) {
  return Number(value.toFixed(3));
}

async function readJson(fileName) {
  const content = await readFile(new URL(fileName, missionDir), 'utf8');
  return JSON.parse(content);
}

async function readAbsoluteJson(fileUrl) {
  const content = await readFile(fileUrl, 'utf8');
  return JSON.parse(content);
}

async function writeJson(fileName, data) {
  const target = new URL(fileName, missionDir);
  await mkdir(dirname(target.pathname), { recursive: true });
  await writeFile(target, `${JSON.stringify(data, null, 2)}\n`);
}

function renderGeneratedModule(data, format = 'ts') {
  const suffix = format === 'ts' ? ' as const' : '';
  return `// Auto-generated from data/missions/artemis-ii JSON artifacts.\n\nexport const trajectory = ${JSON.stringify(data.trajectory, null, 2)}${suffix};\n\nexport const events = ${JSON.stringify(data.events, null, 2)}${suffix};\n\nexport const latest_state = ${JSON.stringify(data.latest_state, null, 2)}${suffix};\n\nexport const media = ${JSON.stringify(data.media, null, 2)}${suffix};\n\nexport const missionCatalog = {\n  \"artemis-ii\": {\n    trajectory,\n    events,\n    latest_state,\n    media\n  }\n}${suffix};\n`;
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
