import kernelManifest from '../../../data/spice/artemis-ii/kernel-manifest.json';

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

const manifest = kernelManifest as SpiceKernelManifest;

export function getSpiceKernelManifest(): SpiceKernelManifest {
  return manifest;
}

export function getSpiceKernelIds(): string[] {
  return manifest.kernels.map((kernel) => kernel.id);
}

export function getBodyGeometryReference(): BodyGeometryReference {
  return {
    earthRadiusKm: 6378.137,
    moonRadiusKm: 1737.4,
    frame: manifest.frame,
    kernelIds: getSpiceKernelIds()
  };
}

export function describeSpiceSupport(): string {
  const kernelKinds = [...new Set(manifest.kernels.map((kernel) => kernel.type))].join(', ');
  return `SPICE-first kernel manifest for ${manifest.missionId}: ${manifest.kernels.length} kernels (${kernelKinds}) tracking Earth/Moon frame, constants, and ephemeris support.`;
}
