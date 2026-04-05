import artemisIiManifest from '../../../data/spice/artemis-ii/kernel-manifest.json';

export type Vector3 = [number, number, number];

export interface SpiceKernelSpec {
  id: string;
  type: 'LSK' | 'PCK' | 'SPK' | 'FK' | string;
  source: string;
  path: string;
  url: string;
  purpose: string;
  committed: boolean;
}

export interface SpiceKernelManifest {
  missionId: string;
  generatedAt: string;
  frame: string;
  coverage: {
    start: string;
    stop: string;
    stepSize: string;
  };
  kernels: SpiceKernelSpec[];
  notes: string[];
}

export interface BodyGeometryReference {
  earthRadiusKm: number;
  moonRadiusKm: number;
  frame: string;
  kernelIds: string[];
}

const manifests = {
  'artemis-ii': artemisIiManifest as SpiceKernelManifest
};

export function getSpiceKernelManifest(): SpiceKernelManifest {
  return manifests['artemis-ii'];
}

export function getSpiceKernelManifestForMission(missionId: string): SpiceKernelManifest {
  return manifests[missionId as keyof typeof manifests] ?? getSpiceKernelManifest();
}

export function getSpiceKernelIds(missionId = 'artemis-ii'): string[] {
  return getSpiceKernelManifestForMission(missionId).kernels.map((kernel) => kernel.id);
}

export function getBodyGeometryReference(manifest: SpiceKernelManifest = getSpiceKernelManifest()): BodyGeometryReference {
  return {
    earthRadiusKm: 6378.137,
    moonRadiusKm: 1737.4,
    frame: manifest.frame,
    kernelIds: manifest.kernels.map((kernel) => kernel.id)
  };
}

export function describeSpiceSupport(missionId = 'artemis-ii'): string {
  const manifest = getSpiceKernelManifestForMission(missionId);
  const kernelKinds = [...new Set(manifest.kernels.map((kernel) => kernel.type))].join(', ');
  return `SPICE-first kernel manifest for ${manifest.missionId}: ${manifest.kernels.length} kernels (${kernelKinds}) tracking Earth/Moon frame, constants, and ephemeris support.`;
}
