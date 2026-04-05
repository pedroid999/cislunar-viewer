export type Vector3 = [number, number, number];

export interface TrajectorySample {
  timestamp: string;
  positionKm: Vector3;
  moonPositionKm?: Vector3;
}

export interface MissionEvent {
  id: string;
  timestamp: string;
  title: string;
  type: 'mission' | 'burn' | 'milestone' | 'media' | 'story';
  description: string;
}

export interface InterpolatedState {
  timestamp: string;
  positionKm: Vector3;
  velocityKmS: number;
  distanceToEarthKm: number;
  distanceToMoonKm: number;
  missionElapsedSeconds: number;
  nextEvent?: MissionEvent;
  lightTimeSeconds: number;
}

const MOON_POSITION: Vector3 = [384400, 0, 0];
const LIGHT_SPEED_KM_S = 299792.458;

export function magnitude([x, y, z]: Vector3): number {
  return Math.sqrt(x * x + y * y + z * z);
}

export function subtract(a: Vector3, b: Vector3): Vector3 {
  return [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
}

export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

export function interpolateVector(a: Vector3, b: Vector3, t: number): Vector3 {
  return [lerp(a[0], b[0], t), lerp(a[1], b[1], t), lerp(a[2], b[2], t)];
}

export function sortEvents(events: MissionEvent[]): MissionEvent[] {
  return [...events].sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
}

export function interpolateTrajectory(samples: TrajectorySample[], atIso: string): InterpolatedState {
  if (samples.length < 2) throw new Error('Need at least two samples');
  const target = new Date(atIso).getTime();
  const ordered = [...samples].sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
  const firstTime = new Date(ordered[0].timestamp).getTime();
  if (target <= firstTime) return deriveState(ordered[0], ordered[1], target, firstTime);
  for (let i = 0; i < ordered.length - 1; i++) {
    const current = ordered[i];
    const next = ordered[i + 1];
    const start = new Date(current.timestamp).getTime();
    const end = new Date(next.timestamp).getTime();
    if (target >= start && target <= end) {
      const t = end === start ? 0 : (target - start) / (end - start);
      return deriveState(current, next, target, firstTime, t);
    }
  }
  return deriveState(ordered.at(-2)!, ordered.at(-1)!, target, firstTime, 1);
}

function deriveState(current: TrajectorySample, next: TrajectorySample, target: number, missionStart: number, t = 0): InterpolatedState {
  const currentTime = new Date(current.timestamp).getTime();
  const nextTime = new Date(next.timestamp).getTime();
  const dtSeconds = Math.max((nextTime - currentTime) / 1000, 1);
  const clampedT = Math.min(Math.max(t, 0), 1);
  const positionKm = interpolateVector(current.positionKm, next.positionKm, clampedT);
  const velocityVector = subtract(next.positionKm, current.positionKm).map((v) => v / dtSeconds) as Vector3;
  const moonPositionKm = current.moonPositionKm && next.moonPositionKm
    ? interpolateVector(current.moonPositionKm, next.moonPositionKm, clampedT)
    : current.moonPositionKm ?? next.moonPositionKm ?? MOON_POSITION;
  const distanceToEarthKm = magnitude(positionKm);
  const distanceToMoonKm = magnitude(subtract(positionKm, moonPositionKm));
  return {
    timestamp: new Date(target).toISOString(),
    positionKm,
    velocityKmS: magnitude(velocityVector),
    distanceToEarthKm,
    distanceToMoonKm,
    missionElapsedSeconds: Math.max(0, Math.round((target - missionStart) / 1000)),
    lightTimeSeconds: distanceToEarthKm / LIGHT_SPEED_KM_S
  };
}

export function nextEventForTime(events: MissionEvent[], atIso: string): MissionEvent | undefined {
  const at = new Date(atIso).getTime();
  return sortEvents(events).find((event) => new Date(event.timestamp).getTime() >= at);
}

export function formatDuration(totalSeconds: number): string {
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  return `${days}d ${hours}h ${minutes}m`;
}
