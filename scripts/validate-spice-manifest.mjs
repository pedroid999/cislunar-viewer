import { readFile } from 'node:fs/promises';

const manifestPath = new URL('../data/spice/artemis-ii/kernel-manifest.json', import.meta.url);

async function main() {
  const manifest = JSON.parse(await readFile(manifestPath, 'utf8'));
  for (const kernel of manifest.kernels) {
    const response = await fetch(kernel.url, { method: 'HEAD' });
    if (!response.ok) {
      throw new Error(`Kernel URL failed for ${kernel.id}: ${response.status} ${response.statusText}`);
    }
    console.log(`OK ${kernel.id} -> ${kernel.url}`);
  }
  console.log(`Validated ${manifest.kernels.length} SPICE kernel URLs for ${manifest.missionId}.`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
