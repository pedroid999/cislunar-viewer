import { describe, expect, it } from 'vitest';
import { deriveMissionState, getMissionBundle, validateMissionData } from './index';

describe('space data', () => {
  it('loads a complete mission bundle', () => {
    const bundle = getMissionBundle();
    expect(bundle.trajectory.samples.length).toBeGreaterThan(100);
    expect(bundle.events[0].id).toBe('launch');
    expect(bundle.media.length).toBeGreaterThan(0);
  });

  it('validates data artifacts and derives mission state', () => {
    const validated = validateMissionData();
    expect(validated.latestState.mode).toBe('latest');
    const state = deriveMissionState(validated.latestState.asOf);
    expect(state.distanceToEarthKm).toBeGreaterThan(50000);
    expect(state.nextEvent?.id).toBeTruthy();
  });
});
