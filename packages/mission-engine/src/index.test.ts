import { describe, expect, it } from 'vitest';
import { formatDuration, interpolateTrajectory, nextEventForTime, phaseForTime, sortEvents, type MissionEvent, type MissionPhaseWindow, type TrajectorySample } from './index';

const samples: TrajectorySample[] = [
  { timestamp: '2026-04-01T00:00:00Z', positionKm: [0, 0, 0] },
  { timestamp: '2026-04-01T01:00:00Z', positionKm: [3600, 0, 0] },
  { timestamp: '2026-04-01T02:00:00Z', positionKm: [7200, 0, 0] }
];

const events: MissionEvent[] = [
  { id: 'b', timestamp: '2026-04-01T03:00:00Z', title: 'B', type: 'mission', description: '' },
  { id: 'a', timestamp: '2026-04-01T01:00:00Z', title: 'A', type: 'burn', description: '' }
];

const phases: MissionPhaseWindow[] = [
  { id: 'phase-1', label: 'Phase 1', description: 'Start', start: '2026-04-01T00:00:00Z', end: '2026-04-01T00:59:59Z' },
  { id: 'phase-2', label: 'Phase 2', description: 'Continue', start: '2026-04-01T01:00:00Z', end: '2026-04-01T02:00:00Z' }
];

describe('mission engine', () => {
  it('interpolates trajectory and derives telemetry', () => {
    const state = interpolateTrajectory(samples, '2026-04-01T00:30:00Z', phases);
    expect(state.positionKm[0]).toBe(1800);
    expect(Math.round(state.velocityKmS)).toBe(1);
    expect(state.distanceToEarthKm).toBe(1800);
    expect(state.earthMoonDistanceKm).toBe(384400);
    expect(state.moonPositionKm[0]).toBe(384400);
    expect(state.distanceToMoonKm).toBeGreaterThan(382000);
    expect(state.phase?.id).toBe('phase-1');
    expect(state.nearestSampleIndex).toBe(0);
  });

  it('sorts and finds next events', () => {
    expect(sortEvents(events)[0].id).toBe('a');
    expect(nextEventForTime(events, '2026-04-01T01:30:00Z')?.id).toBe('b');
  });

  it('formats duration for telemetry', () => {
    expect(formatDuration(90061)).toBe('1d 1h 1m');
  });

  it('finds the active phase window', () => {
    expect(phaseForTime(phases, '2026-04-01T01:30:00Z')?.id).toBe('phase-2');
  });
});
