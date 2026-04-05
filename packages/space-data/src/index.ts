import { z } from 'zod';
// @ts-ignore generated JS module with embedded validated mission data
import { missionCatalog } from './generated.js';
import { interpolateTrajectory, nextEventForTime, sortEvents } from '@cislunar/mission-engine';
import { getBodyGeometryReference, getSpiceKernelManifest, getSpiceKernelManifestForMission } from '@cislunar/spice-bridge';

const vector3Schema = z.tuple([z.number(), z.number(), z.number()]);
const sourceSchema = z.object({
  kind: z.string(),
  generatedAt: z.string().optional(),
  description: z.string(),
  fidelity: z.object({
    earthMoonGeometry: z.string(),
    spacecraftEphemeris: z.string(),
    viewerScene: z.string()
  }).optional(),
  approximationNotes: z.array(z.string()).optional(),
  horizons: z.object({
    target: z.string(),
    center: z.string(),
    ephemerisType: z.string(),
    stepSize: z.string(),
    referenceFrame: z.string()
  }).optional(),
  spice: z.object({
    manifestMissionId: z.string(),
    kernelIds: z.array(z.string()),
    frame: z.string(),
    notes: z.array(z.string())
  }).optional()
});
const sampleSchema = z.object({ timestamp: z.string(), positionKm: vector3Schema, moonPositionKm: vector3Schema.optional() });
const missionEventSchema = z.object({ id: z.string(), timestamp: z.string(), title: z.string(), type: z.enum(['mission', 'burn', 'milestone', 'media', 'story']), description: z.string() });
const missionPhaseSchema = z.object({ id: z.string(), label: z.string(), description: z.string(), start: z.string(), end: z.string() });
const missionProfileSchema = z.object({
  mission: z.string(),
  focus: z.string(),
  coverage: z.object({ start: z.string(), closestApproach: z.string().optional(), end: z.string(), cadence: z.string() }),
  phases: z.array(missionPhaseSchema).default([]),
  closestApproachEstimate: z.object({ timestamp: z.string(), distanceToMoonKm: z.number() }).nullable().optional()
}).optional();
const trajectorySchema = z.object({ missionId: z.string(), frame: z.string(), units: z.object({ distance: z.string(), time: z.string() }), spacecraft: z.string(), missionProfile: missionProfileSchema, source: sourceSchema, bodyCenters: z.object({ earth: vector3Schema, moon: vector3Schema }), samples: z.array(sampleSchema).min(2) });
const eventsSchema = z.object({ missionId: z.string(), events: z.array(missionEventSchema) });
const latestStateSchema = z.object({ missionId: z.string(), asOf: z.string(), sampleIndex: z.number().int(), mode: z.literal('latest'), summary: z.string(), nearestSampleOffsetMinutes: z.number().int().optional(), cadenceHours: z.number().optional(), source: sourceSchema });
const mediaSchema = z.object({ missionId: z.string(), items: z.array(z.object({ id: z.string(), eventId: z.string(), title: z.string(), caption: z.string(), url: z.string().url() })) });
const missionBundleSchema = z.object({ trajectory: trajectorySchema, events: eventsSchema, latest_state: latestStateSchema, media: mediaSchema });
const missionCatalogSchema = z.record(z.string(), missionBundleSchema);

const validatedCatalog = missionCatalogSchema.parse(missionCatalog);

export type MissionId = keyof typeof validatedCatalog;
export const missionIds = Object.keys(validatedCatalog) as MissionId[];

export function getMissionBundle(missionId: MissionId = 'artemis-ii' as MissionId) {
  const bundle = validatedCatalog[missionId];
  if (!bundle) throw new Error(`Unsupported mission ${missionId}`);
  const spice = bundle.trajectory.source.spice ? getSpiceKernelManifestForMission(bundle.trajectory.source.spice.manifestMissionId) : getSpiceKernelManifest();
  return {
    missionId,
    trajectory: trajectorySchema.parse(bundle.trajectory),
    events: sortEvents(eventsSchema.parse(bundle.events).events),
    latestState: latestStateSchema.parse(bundle.latest_state),
    media: mediaSchema.parse(bundle.media).items,
    spice,
    geometry: getBodyGeometryReference(spice)
  };
}

export function deriveMissionState(missionIdOrAtIso: MissionId | string, maybeAtIso?: string) {
  const missionId = maybeAtIso ? missionIdOrAtIso as MissionId : 'artemis-ii';
  const atIso = maybeAtIso ?? missionIdOrAtIso as string;
  const bundle = getMissionBundle(missionId);
  const state = interpolateTrajectory(bundle.trajectory.samples, atIso, bundle.trajectory.missionProfile?.phases ?? []);
  return {
    ...state,
    nextEvent: nextEventForTime(bundle.events, atIso)
  };
}

export function validateMissionData() {
  return {
    ...validatedCatalog['artemis-ii'],
    latestState: validatedCatalog['artemis-ii'].latest_state
  };
}

export function validateMissionCatalog() {
  return validatedCatalog;
}
