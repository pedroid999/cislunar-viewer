import { z } from 'zod';
// @ts-ignore generated JS module with embedded validated mission data
import { trajectory, events, latest_state, media } from './generated.js';
import { interpolateTrajectory, nextEventForTime, sortEvents } from '@cislunar/mission-engine';

const sampleSchema = z.object({ timestamp: z.string(), positionKm: z.tuple([z.number(), z.number(), z.number()]) });
const missionEventSchema = z.object({ id: z.string(), timestamp: z.string(), title: z.string(), type: z.enum(['mission', 'burn', 'milestone', 'media', 'story']), description: z.string() });
const trajectorySchema = z.object({ missionId: z.string(), frame: z.string(), units: z.object({ distance: z.string(), time: z.string() }), spacecraft: z.string(), bodyCenters: z.object({ earth: z.tuple([z.number(), z.number(), z.number()]), moon: z.tuple([z.number(), z.number(), z.number()]) }), samples: z.array(sampleSchema).min(2) });
const eventsSchema = z.object({ missionId: z.string(), events: z.array(missionEventSchema) });
const latestStateSchema = z.object({ missionId: z.string(), asOf: z.string(), sampleIndex: z.number().int(), mode: z.literal('latest'), summary: z.string() });
const mediaSchema = z.object({ missionId: z.string(), items: z.array(z.object({ id: z.string(), eventId: z.string(), title: z.string(), caption: z.string(), url: z.string().url() })) });

export const missionTrajectory = trajectorySchema.parse(trajectory);
export const missionEvents = eventsSchema.parse(events);
export const latestMissionState = latestStateSchema.parse(latest_state);
export const missionMedia = mediaSchema.parse(media);

export type MissionId = 'artemis-ii';

export function getMissionBundle(missionId: MissionId = 'artemis-ii') {
  if (missionId !== 'artemis-ii') throw new Error(`Unsupported mission ${missionId}`);
  return {
    missionId,
    trajectory: missionTrajectory,
    events: sortEvents(missionEvents.events),
    latestState: latestMissionState,
    media: missionMedia.items
  };
}

export function deriveMissionState(atIso: string) {
  const state = interpolateTrajectory(missionTrajectory.samples, atIso);
  return {
    ...state,
    nextEvent: nextEventForTime(missionEvents.events, atIso)
  };
}

export function validateMissionData() {
  return {
    trajectory: trajectorySchema.parse(trajectory),
    events: eventsSchema.parse(events),
    latestState: latestStateSchema.parse(latest_state),
    media: mediaSchema.parse(media)
  };
}
