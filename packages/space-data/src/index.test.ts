import { describe, expect, it } from 'vitest';
import { deriveMissionState, getMissionBundle, validateMissionData } from './index';

describe('space data', () => {
  it('loads a complete mission bundle', () => {
    const bundle = getMissionBundle();
    expect(bundle.trajectory.samples.length).toBeGreaterThan(100);
    expect(bundle.events[0].id).toBe('launch');
    expect(bundle.media.length).toBeGreaterThan(0);
    expect(bundle.spice.kernels.length).toBeGreaterThanOrEqual(5);
    expect(bundle.geometry.moonRadiusKm).toBeGreaterThan(1700);
  });

  it('validates data artifacts and derives mission state', () => {
    const validated = validateMissionData();
    expect(validated.latest_state.mode).toBe('latest');
    const state = deriveMissionState('artemis-ii', validated.latest_state.asOf);
    expect(state.distanceToEarthKm).toBeGreaterThan(50000);
    expect(state.timestamp).toBeTruthy();
    expect(state.nextEvent?.id).toBeTruthy();
  });
});
