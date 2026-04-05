import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname } from 'node:path';

const repo = new URL('..', import.meta.url);
const missionsRoot = new URL('../data/missions/', import.meta.url);
const genTs = new URL('../packages/space-data/src/generated.ts', import.meta.url);
const genJs = new URL('../packages/space-data/src/generated.js', import.meta.url);

const artemisI = {
  missionId: 'artemis-i',
  start: '2022-11-16T09:03:00Z',
  end: '2022-12-11T17:20:00Z',
  step: '6 h'
};

async function fetchVectors(command, start, stop, step) {
  const p = new URLSearchParams({ format: 'json', COMMAND: `'${command}'`, CENTER: `'500@399'`, EPHEM_TYPE: `'VECTORS'`, START_TIME: `'${start.replace('T',' ').replace('Z','')}'`, STOP_TIME: `'${stop.replace('T',' ').replace('Z','')}'`, STEP_SIZE: `'${step}'`, OUT_UNITS: `'KM-S'`, REF_PLANE: `'FRAME'`, REF_SYSTEM: `'ICRF'` });
  const r = await fetch(`https://ssd.jpl.nasa.gov/api/horizons.api?${p}`);
  const j = await r.json();
  return parse(j.result);
}
function parse(txt) {
  const lines = txt.split('\n');
  const s = lines.findIndex(l=>l.includes('$$SOE')); const e = lines.findIndex(l=>l.includes('$$EOE'));
  const out=[];
  for (let i=s+1;i<e;i+=4){
    const d=lines[i]?.trim(); const p=lines[i+1]?.trim(); if(!d||!p) continue;
    const m=d.match(/A\.D\.\s+(\d{4})-([A-Za-z]{3})-(\d{2})\s+(\d{2}):(\d{2}):(\d{2})/);
    const mm={Jan:'01',Feb:'02',Mar:'03',Apr:'04',May:'05',Jun:'06',Jul:'07',Aug:'08',Sep:'09',Oct:'10',Nov:'11',Dec:'12'}[m[2]];
    const ts=`${m[1]}-${mm}-${m[3]}T${m[4]}:${m[5]}:${m[6]}Z`;
    const q=p.match(/X\s*=\s*([\-+0-9.E]+)\s+Y\s*=\s*([\-+0-9.E]+)\s+Z\s*=\s*([\-+0-9.E]+)/);
    out.push({timestamp:ts,positionKm:[+q[1].toFixed?+q[1]:Number(q[1]),+q[2],+q[3]]});
  }
  return out;
}
const round = n => Number(n.toFixed(3));
const nearest = (samples, ts) => samples.reduce((best, s, i)=> Math.abs(Date.parse(s.timestamp)-Date.parse(ts)) < Math.abs(Date.parse(samples[best].timestamp)-Date.parse(ts)) ? i : best, 0);
async function j(path){ return JSON.parse(await readFile(path,'utf8')); }
async function w(path, data){ await mkdir(dirname(new URL(path, repo).pathname),{recursive:true}); await writeFile(new URL(path, repo), JSON.stringify(data,null,2)+'\n'); }

const moon = await fetchVectors('301', artemisI.start, artemisI.end, artemisI.step);
const ship = await fetchVectors('-1023', artemisI.start, artemisI.end, artemisI.step);
const trajectory = {
  missionId:'artemis-i', frame:'earth-centered-icrf', units:{distance:'km', time:'iso8601'}, spacecraft:'Orion',
  source:{kind:'historical-horizons-spacecraft',generatedAt:new Date().toISOString(),description:'Historical Artemis I vectors are sampled from the public JPL Horizons spacecraft target.',fidelity:{earthMoonGeometry:'Moon vectors come from JPL Horizons in the same Earth-centered frame used for the spacecraft solution.',spacecraftEphemeris:'Artemis I / Orion spacecraft state vectors come directly from the public JPL Horizons spacecraft target (-1023).',viewerScene:'The path is mission-specific and flown, but the browser scene is still a stylized visualization.'},horizons:{target:'-1023',center:'500@399',ephemerisType:'VECTORS',stepSize:artemisI.step,referenceFrame:'ICRF'}},
  bodyCenters:{earth:[0,0,0],moon:moon[0].positionKm.map(round)},
  samples: ship.map((s,i)=>({timestamp:s.timestamp, positionKm:s.positionKm.map(round), moonPositionKm:moon[i].positionKm.map(round)}))
};
const events={missionId:'artemis-i',events:[{id:'launch',timestamp:'2022-11-16T06:47:44Z',title:'Launch',type:'mission',description:'SLS launches Artemis I from LC-39B.'},{id:'closest-approach',timestamp:'2022-11-21T12:44:00Z',title:'Closest lunar approach',type:'milestone',description:'Orion passes about 130 km above the Moon.'},{id:'dro-entry',timestamp:'2022-11-25T20:00:00Z',title:'Distant retrograde orbit entry',type:'mission',description:'Orion settles into distant retrograde orbit.'},{id:'return-flyby',timestamp:'2022-12-05T16:43:00Z',title:'Return lunar flyby',type:'milestone',description:'Final lunar flyby bends Orion onto Earth return.'},{id:'splashdown',timestamp:'2022-12-11T17:20:00Z',title:'Splashdown',type:'mission',description:'Artemis I returns to the Pacific.'}]};
const latest_state={missionId:'artemis-i',asOf:'2022-11-21T12:44:00Z',sampleIndex:nearest(trajectory.samples,'2022-11-21T12:44:00Z'),mode:'latest',summary:'Archive pointer is set to Artemis I closest lunar approach to foreground the flown ephemeris.',source:{kind:'generated',generatedAt:new Date().toISOString(),description:'Historical missions use a curated archive pointer instead of wall-clock live telemetry.'}};
const media={missionId:'artemis-i',items:[{id:'orion-selfie',eventId:'closest-approach',title:'Orion outbound selfie',caption:'Public Artemis I imagery during lunar transit.',url:'https://images-assets.nasa.gov/image/KSC-20221121-PH-KLS01_0011/KSC-20221121-PH-KLS01_0011~orig.jpg'}]};
await w('data/missions/artemis-i/trajectory.json', trajectory);
await w('data/missions/artemis-i/events.json', events);
await w('data/missions/artemis-i/latest-state.json', latest_state);
await w('data/missions/artemis-i/media.json', media);
const ar2={trajectory:await j(new URL('../data/missions/artemis-ii/trajectory.json', import.meta.url)),events:await j(new URL('../data/missions/artemis-ii/events.json', import.meta.url)),latest_state:await j(new URL('../data/missions/artemis-ii/latest-state.json', import.meta.url)),media:await j(new URL('../data/missions/artemis-ii/media.json', import.meta.url))};
const catalog={'artemis-ii':ar2,'artemis-i':{trajectory,events,latest_state,media}};
await writeFile(genTs, `// Auto-generated mission catalog.\n\nexport const missionCatalog = ${JSON.stringify(catalog,null,2)} as const;\n`);
await writeFile(genJs, `// Auto-generated mission catalog.\n\nexport const missionCatalog = ${JSON.stringify(catalog,null,2)};\n`);
console.log('synced missions');
