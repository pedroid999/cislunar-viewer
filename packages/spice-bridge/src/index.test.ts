import { describe, expect, it } from 'vitest';
import { describeSpiceSupport, getBodyGeometryReference, getSpiceKernelManifest } from './index';

describe('spice bridge', () => {
  it('loads the Artemis II SPICE manifest', () => {
    const manifest = getSpiceKernelManifest();
    expect(manifest.missionId).toBe('artemis-ii');
    expect(manifest.kernels.length).toBeGreaterThanOrEqual(5);
  });

  it('exposes body geometry from the SPICE manifest context', () => {
    const geometry = getBodyGeometryReference();
    expect(geometry.earthRadiusKm).toBeGreaterThan(6000);
    expect(geometry.moonRadiusKm).toBeGreaterThan(1700);
    expect(describeSpiceSupport()).toMatch(/SPICE-first/);
  });
});
