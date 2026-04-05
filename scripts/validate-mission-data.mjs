import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

const repoRoot = new URL('..', import.meta.url);
const missionDir = join(repoRoot.pathname, 'data', 'missions', 'artemis-ii');

const vector3 = (value, name) => {
  if (!Array.isArray(value) || value.length !== 3 || value.some((entry) => typeof entry !== 'number' || Number.isNaN(entry))) {
    throw new Error(`${name} must be a numeric [x, y, z] tuple.`);
  }
};

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function validateSource(source, name) {
  assert(source && typeof source === 'object', `${name}.source must exist.`);
  assert(typeof source.kind === 'string' && source.kind.length > 0, `${name}.source.kind must be a string.`);
  assert(typeof source.description === 'string' && source.description.length > 0, `${name}.source.description must be a string.`);
  if (source.generatedAt !== undefined) assert(!Number.isNaN(Date.parse(source.generatedAt)), `${name}.source.generatedAt must be ISO-ish.`);
}

function validateTrajectory(trajectory) {
  assert(trajectory.missionId === 'artemis-ii', 'trajectory.missionId must be artemis-ii');
  assert(typeof trajectory.frame === 'string' && trajectory.frame.length > 0, 'trajectory.frame must be set');
  validateSource(trajectory.source, 'trajectory');
  vector3(trajectory.bodyCenters?.earth, 'trajectory.bodyCenters.earth');
  vector3(trajectory.bodyCenters?.moon, 'trajectory.bodyCenters.moon');
  assert(Array.isArray(trajectory.samples) && trajectory.samples.length >= 2, 'trajectory.samples must contain at least 2 samples');
  trajectory.samples.forEach((sample, index) => {
    assert(!Number.isNaN(Date.parse(sample.timestamp)), `trajectory.samples[${index}].timestamp must be parseable`);
    vector3(sample.positionKm, `trajectory.samples[${index}].positionKm`);
    if (sample.moonPositionKm !== undefined) vector3(sample.moonPositionKm, `trajectory.samples[${index}].moonPositionKm`);
  });
}

function validateEvents(events) {
  assert(events.missionId === 'artemis-ii', 'events.missionId must be artemis-ii');
  assert(Array.isArray(events.events) && events.events.length > 0, 'events.events must not be empty');
  for (const [index, event] of events.events.entries()) {
    assert(typeof event.id === 'string' && event.id.length > 0, `events.events[${index}].id must be set`);
    assert(!Number.isNaN(Date.parse(event.timestamp)), `events.events[${index}].timestamp must be parseable`);
  }
}

function validateLatestState(latestState, trajectory) {
  assert(latestState.missionId === 'artemis-ii', 'latest-state.missionId must be artemis-ii');
  assert(latestState.mode === 'latest', 'latest-state.mode must be latest');
  assert(Number.isInteger(latestState.sampleIndex), 'latest-state.sampleIndex must be an integer');
  assert(latestState.sampleIndex >= 0 && latestState.sampleIndex < trajectory.samples.length, 'latest-state.sampleIndex out of range');
  assert(!Number.isNaN(Date.parse(latestState.asOf)), 'latest-state.asOf must be parseable');
  validateSource(latestState.source, 'latest-state');
}

function validateMedia(media) {
  assert(media.missionId === 'artemis-ii', 'media.missionId must be artemis-ii');
  assert(Array.isArray(media.items), 'media.items must be an array');
}

async function readJson(fileName) {
  return JSON.parse(await readFile(join(missionDir, fileName), 'utf8'));
}

const [trajectory, events, latestState, media] = await Promise.all([
  readJson('trajectory.json'),
  readJson('events.json'),
  readJson('latest-state.json'),
  readJson('media.json')
]);

validateTrajectory(trajectory);
validateEvents(events);
validateLatestState(latestState, trajectory);
validateMedia(media);

console.log(`Mission data artifacts validated: ${trajectory.samples.length} samples, ${events.events.length} events.`);
