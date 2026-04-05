'use client';
import { create } from 'zustand';
import type { MissionId } from '@cislunar/space-data';

export type CameraMode = 'system' | 'earth' | 'moon' | 'spacecraft';
export type ScaleMode = 'physical' | 'visual' | 'cinematic';
export type PlaybackMode = 'replay' | 'live';

interface ViewerState {
  missionId: MissionId;
  sampleIndex: number;
  playing: boolean;
  playbackMode: PlaybackMode;
  cameraMode: CameraMode;
  scaleMode: ScaleMode;
  setMissionId: (value: MissionId) => void;
  setSampleIndex: (value: number) => void;
  togglePlaying: () => void;
  setPlaybackMode: (mode: PlaybackMode) => void;
  setCameraMode: (mode: CameraMode) => void;
  setScaleMode: (mode: ScaleMode) => void;
}

export const useViewerStore = create<ViewerState>((set) => ({
  missionId: 'artemis-ii',
  sampleIndex: 0,
  playing: false,
  playbackMode: 'replay',
  cameraMode: 'system',
  scaleMode: 'visual',
  setMissionId: (missionId) => set({ missionId, sampleIndex: 0, playbackMode: 'replay', playing: false }),
  setSampleIndex: (sampleIndex) => set({ sampleIndex }),
  togglePlaying: () => set((state) => ({ playing: !state.playing })),
  setPlaybackMode: (playbackMode) => set({ playbackMode }),
  setCameraMode: (cameraMode) => set({ cameraMode }),
  setScaleMode: (scaleMode) => set({ scaleMode })
}));
