'use client';
import React, { useEffect, useMemo } from 'react';
import { Card, Metric } from '@cislunar/ui';
import { deriveMissionState, getMissionBundle } from '@cislunar/space-data';
import { formatDuration } from '@cislunar/mission-engine';
import { SceneView } from './scene-view';
import { useViewerStore } from '../lib/store';

const bundle = getMissionBundle();
const maxIndex = bundle.trajectory.samples.length - 1;

export function MissionDashboard() {
  const { sampleIndex, setSampleIndex, playing, togglePlaying, playbackMode, setPlaybackMode, cameraMode, setCameraMode, scaleMode, setScaleMode } = useViewerStore();

  const effectiveIndex = playbackMode === 'live' ? bundle.latestState.sampleIndex : sampleIndex;
  const sample = bundle.trajectory.samples[effectiveIndex];
  const telemetry = deriveMissionState(sample.timestamp);

  useEffect(() => {
    if (!playing || playbackMode !== 'replay') return;
    const timer = setInterval(() => {
      useViewerStore.setState((state) => ({ sampleIndex: state.sampleIndex >= maxIndex ? 0 : state.sampleIndex + 1 }));
    }, 220);
    return () => clearInterval(timer);
  }, [playing, playbackMode]);

  const nextEventCountdown = telemetry.nextEvent ? formatDuration((new Date(telemetry.nextEvent.timestamp).getTime() - new Date(sample.timestamp).getTime()) / 1000) : '—';
  const scenePoints = useMemo(() => bundle.trajectory.samples.map((entry) => entry.positionKm), []);

  return (
    <main className="mx-auto flex min-h-screen max-w-7xl flex-col gap-6 px-6 py-8">
      <header className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.35em] text-cyan-300">Artemis II · cislunar mission viewer</p>
          <h1 className="mt-2 text-4xl font-semibold">Crewed lunar flyby replay + live state</h1>
          <p className="mt-3 max-w-3xl text-slate-300">A production-minded monorepo demo with offline mission artifacts, telemetry derivation, event narrative overlays, and a real-time 3D scene built for future mission expansion.</p>
        </div>
        <div className="rounded-2xl border border-cyan-400/30 bg-cyan-400/10 px-4 py-3 text-sm text-cyan-100">
          <div>Mode: <strong>{playbackMode === 'live' ? 'Live/latest state' : 'Replay'}</strong></div>
          <div>Camera: <strong className="capitalize">{cameraMode}</strong></div>
          <div>Scale: <strong className="capitalize">{scaleMode}</strong></div>
        </div>
      </header>

      <div className="grid gap-6 xl:grid-cols-[1.6fr_1fr]">
        <div className="space-y-6">
          <SceneView points={scenePoints} current={sample.positionKm} scaleMode={scaleMode} />
          <Card title="Timeline + controls" eyebrow="Mission control">
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                <button className="rounded-full bg-cyan-400 px-4 py-2 font-medium text-slate-950" onClick={togglePlaying}>{playing ? 'Pause replay' : 'Play replay'}</button>
                <button className="rounded-full border border-white/15 px-4 py-2" onClick={() => setPlaybackMode(playbackMode === 'replay' ? 'live' : 'replay')}>{playbackMode === 'replay' ? 'Switch to live' : 'Switch to replay'}</button>
              </div>
              <input aria-label="Timeline scrubber" className="w-full" type="range" min={0} max={maxIndex} value={effectiveIndex} onChange={(event) => { setPlaybackMode('replay'); setSampleIndex(Number(event.target.value)); }} />
              <div className="flex flex-wrap gap-2 text-xs uppercase tracking-[0.2em] text-slate-400">
                {(['system', 'earth', 'moon', 'spacecraft'] as const).map((mode) => <button key={mode} className={`rounded-full px-3 py-1 ${cameraMode === mode ? 'bg-white text-slate-950' : 'border border-white/10'}`} onClick={() => setCameraMode(mode)}>{mode}</button>)}
              </div>
              <div className="flex flex-wrap gap-2 text-xs uppercase tracking-[0.2em] text-slate-400">
                {(['physical', 'visual', 'cinematic'] as const).map((mode) => <button key={mode} className={`rounded-full px-3 py-1 ${scaleMode === mode ? 'bg-cyan-300 text-slate-950' : 'border border-white/10'}`} onClick={() => setScaleMode(mode)}>{mode}</button>)}
              </div>
              <div className="grid gap-2 lg:grid-cols-2">
                {bundle.events.map((event) => (
                  <div key={event.id} className={`rounded-xl border p-3 ${event.timestamp === telemetry.nextEvent?.timestamp ? 'border-cyan-300 bg-cyan-300/10' : 'border-white/10 bg-white/5'}`}>
                    <div className="text-xs uppercase tracking-[0.25em] text-slate-400">{event.type}</div>
                    <div className="mt-1 font-medium text-white">{event.title}</div>
                    <div className="mt-1 text-sm text-slate-300">{event.description}</div>
                    <div className="mt-2 text-xs text-slate-500">{new Date(event.timestamp).toUTCString()}</div>
                  </div>
                ))}
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
              <Metric label="Next event ETA" value={nextEventCountdown} accent="text-fuchsia-300" />
              <Metric label="Round-trip light time" value={`${(telemetry.lightTimeSeconds * 2).toFixed(2)} s`} accent="text-yellow-200" />
            </div>
          </Card>
          <Card title="Mission narrative" eyebrow="Contextual overlays">
            <div className="space-y-3">
              <p><strong>Current timestamp:</strong> {new Date(sample.timestamp).toUTCString()}</p>
              <p><strong>Latest summary:</strong> {bundle.latestState.summary}</p>
              <p><strong>Next event:</strong> {telemetry.nextEvent ? `${telemetry.nextEvent.title} — ${telemetry.nextEvent.description}` : 'Completed'}</p>
              <div className="rounded-xl border border-white/10 bg-slate-950/40 p-3">
                <p className="text-xs uppercase tracking-[0.25em] text-slate-400">Photo / story markers</p>
                <ul className="mt-2 space-y-2 text-sm text-slate-300">
                  {bundle.media.map((item) => <li key={item.id}><strong>{item.title}:</strong> {item.caption}</li>)}
                </ul>
              </div>
            </div>
          </Card>
          <Card title="Architecture" eyebrow="Extensibility">
            <ul className="space-y-2 text-sm text-slate-300">
              <li>• Offline mission artifacts in <code>data/missions</code></li>
              <li>• Interpolation + timeline logic in <code>@cislunar/mission-engine</code></li>
              <li>• Data validation / loading in <code>@cislunar/space-data</code></li>
              <li>• Shared UI primitives in <code>@cislunar/ui</code></li>
              <li>• App state isolated in zustand store</li>
            </ul>
          </Card>
        </div>
      </div>
    </main>
  );
}
