'use client';
import React, { useEffect, useMemo } from 'react';
import { Card, Metric } from '@cislunar/ui';
import { deriveMissionState, getMissionBundle, missionIds } from '@cislunar/space-data';
import { formatDuration } from '@cislunar/mission-engine';
import { SceneView } from './scene-view';
import { useViewerStore } from '../lib/store';

const missionLabels = {
  'artemis-ii': 'Artemis II',
  'artemis-i': 'Artemis I'
} as const;

const missionBlurbs = {
  'artemis-ii': 'Flagship hybrid mission: SPICE-oriented Earth/Moon geometry plus a maintainable Orion proxy path.',
  'artemis-i': 'Historical high-fidelity mission: flown Orion vectors sampled directly from the public JPL Horizons Artemis I target.'
} as const;

export function MissionDashboard() {
  const { missionId, setMissionId, sampleIndex, setSampleIndex, playing, togglePlaying, playbackMode, setPlaybackMode, cameraMode, setCameraMode, scaleMode, setScaleMode } = useViewerStore();

  const bundle = useMemo(() => getMissionBundle(missionId), [missionId]);
  const maxIndex = bundle.trajectory.samples.length - 1;
  const effectiveIndex = playbackMode === 'live' ? bundle.latestState.sampleIndex : Math.min(sampleIndex, maxIndex);
  const sample = bundle.trajectory.samples[effectiveIndex];
  const telemetry = deriveMissionState(missionId, sample.timestamp);
  const nextEventCountdown = telemetry.nextEvent ? formatDuration((new Date(telemetry.nextEvent.timestamp).getTime() - new Date(sample.timestamp).getTime()) / 1000) : '—';
  const scenePoints = useMemo(() => bundle.trajectory.samples.map((entry) => entry.positionKm), [bundle]);
  const eventStops = useMemo(() => bundle.events.map((event) => ({
    ...event,
    index: bundle.trajectory.samples.findIndex((trajectorySample) => trajectorySample.timestamp >= event.timestamp)
  })).filter((event) => event.index >= 0), [bundle]);

  useEffect(() => {
    if (!playing || playbackMode !== 'replay') return;
    const timer = setInterval(() => {
      useViewerStore.setState((state) => {
        const activeBundle = getMissionBundle(state.missionId);
        const activeMaxIndex = activeBundle.trajectory.samples.length - 1;
        return { sampleIndex: state.sampleIndex >= activeMaxIndex ? 0 : state.sampleIndex + 1 };
      });
    }, 220);
    return () => clearInterval(timer);
  }, [playing, playbackMode]);

  return (
    <main className="mx-auto flex min-h-screen max-w-7xl flex-col gap-6 px-6 py-8">
      <header className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.35em] text-cyan-300">Cislunar mission viewer · phase 3</p>
          <h1 className="mt-2 text-4xl font-semibold">Hybrid future mission + flown historical ephemeris</h1>
          <p className="mt-3 max-w-3xl text-slate-300">Artemis II stays the flagship hybrid mission, but phase 3 adds Artemis I as a materially more truthful historical reference: a public JPL spacecraft solution the viewer can replay end-to-end.</p>
        </div>
        <div className="rounded-2xl border border-cyan-400/30 bg-cyan-400/10 px-4 py-3 text-sm text-cyan-100">
          <div>Mission: <strong>{missionLabels[missionId]}</strong></div>
          <div>Mode: <strong>{playbackMode === 'live' ? 'Live/latest state' : 'Replay'}</strong></div>
          <div>Camera: <strong className="capitalize">{cameraMode}</strong></div>
          <div>Scale: <strong className="capitalize">{scaleMode}</strong></div>
          <div>Frame: <strong>{bundle.trajectory.frame}</strong></div>
        </div>
      </header>

      <div className="grid gap-6 xl:grid-cols-[1.6fr_1fr]">
        <div className="space-y-6">
          <SceneView
            points={scenePoints}
            current={sample.positionKm}
            moon={telemetry.moonPositionKm}
            currentIndex={effectiveIndex}
            scaleMode={scaleMode}
            cameraMode={cameraMode}
            highlightedEventLabel={telemetry.nextEvent ? `Next: ${telemetry.nextEvent.title}` : 'Mission complete'}
          />
          <Card title="Timeline + controls" eyebrow="Mission control">
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {missionIds.map((id) => (
                  <button key={id} className={`rounded-full px-4 py-2 ${missionId === id ? 'bg-white text-slate-950' : 'border border-white/15 text-white'}`} onClick={() => setMissionId(id)}>
                    {missionLabels[id]}
                  </button>
                ))}
              </div>
              <p className="text-sm text-slate-300">{missionBlurbs[missionId]}</p>
              <div className="flex flex-wrap gap-2">
                <button className="rounded-full bg-cyan-400 px-4 py-2 font-medium text-slate-950" onClick={togglePlaying}>{playing ? 'Pause replay' : 'Play replay'}</button>
                <button className="rounded-full border border-white/15 px-4 py-2" onClick={() => setPlaybackMode(playbackMode === 'replay' ? 'live' : 'replay')}>{playbackMode === 'replay' ? 'Switch to live/archive pointer' : 'Switch to replay'}</button>
                <button className="rounded-full border border-white/15 px-4 py-2" onClick={() => { setPlaybackMode('replay'); setSampleIndex(Math.max(effectiveIndex - 6, 0)); }}>−12 h</button>
                <button className="rounded-full border border-white/15 px-4 py-2" onClick={() => { setPlaybackMode('replay'); setSampleIndex(Math.min(effectiveIndex + 6, maxIndex)); }}>+12 h</button>
              </div>
              <input aria-label="Timeline scrubber" className="w-full" type="range" min={0} max={maxIndex} value={effectiveIndex} onChange={(event) => { setPlaybackMode('replay'); setSampleIndex(Number(event.target.value)); }} />
              <div className="flex flex-wrap gap-2 text-xs uppercase tracking-[0.2em] text-slate-400">
                {(['system', 'earth', 'moon', 'spacecraft'] as const).map((mode) => <button key={mode} className={`rounded-full px-3 py-1 ${cameraMode === mode ? 'bg-white text-slate-950' : 'border border-white/10'}`} onClick={() => setCameraMode(mode)}>{mode}</button>)}
              </div>
              <div className="flex flex-wrap gap-2 text-xs uppercase tracking-[0.2em] text-slate-400">
                {(['physical', 'visual', 'cinematic'] as const).map((mode) => <button key={mode} className={`rounded-full px-3 py-1 ${scaleMode === mode ? 'bg-cyan-300 text-slate-950' : 'border border-white/10'}`} onClick={() => setScaleMode(mode)}>{mode}</button>)}
              </div>
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card title="Telemetry" eyebrow="Derived state">
            <div className="grid gap-3 sm:grid-cols-2">
              <Metric label="Distance to Earth" value={`${Math.round(telemetry.distanceToEarthKm).toLocaleString()} km`} accent="text-cyan-200" />
              <Metric label="Distance to Moon" value={`${Math.round(telemetry.distanceToMoonKm).toLocaleString()} km`} accent="text-slate-100" />
              <Metric label="Velocity" value={`${telemetry.velocityKmS.toFixed(2)} km/s`} accent="text-orange-300" />
              <Metric label="Mission elapsed" value={formatDuration(telemetry.missionElapsedSeconds)} accent="text-emerald-300" />
              <Metric label="Earth-Moon range" value={`${Math.round(telemetry.earthMoonDistanceKm).toLocaleString()} km`} accent="text-violet-300" />
              <Metric label="Round-trip light time" value={`${(telemetry.lightTimeSeconds * 2).toFixed(2)} s`} accent="text-yellow-200" />
              <Metric label="Next event ETA" value={nextEventCountdown} accent="text-fuchsia-300" />
              <Metric label="Kernel set" value={`${bundle.spice.kernels.length} tracked`} accent="text-sky-300" />
            </div>
          </Card>
          <Card title="Data fidelity" eyebrow="Technically honest">
            <ul className="space-y-2 text-sm text-slate-300">
              <li>• <strong>Earth/Moon geometry:</strong> {bundle.trajectory.source.fidelity?.earthMoonGeometry}</li>
              <li>• <strong>Spacecraft ephemeris:</strong> {bundle.trajectory.source.fidelity?.spacecraftEphemeris}</li>
              <li>• <strong>Viewer scene:</strong> {bundle.trajectory.source.fidelity?.viewerScene}</li>
            </ul>
          </Card>
          <Card title="Fidelity ladder" eyebrow="Mission comparison">
            <ul className="space-y-3 text-sm text-slate-300">
              <li className="rounded-xl border border-white/10 bg-white/5 p-3"><strong>Artemis II:</strong> real Moon geometry + documented hybrid Orion proxy. Best for future-facing mission storytelling.</li>
              <li className="rounded-xl border border-cyan-300/30 bg-cyan-300/10 p-3"><strong>Artemis I:</strong> public mission-specific Orion spacecraft vectors from JPL Horizons, giving the viewer a flown cislunar path with materially higher trajectory truth.</li>
            </ul>
          </Card>
        </div>
      </div>
    </main>
  );
}
