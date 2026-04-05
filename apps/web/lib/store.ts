'use client';
import { create } from 'zustand';

export type CameraMode = 'system' | 'earth' | 'moon' | 'spacecraft';
export type ScaleMode = 'physical' | 'visual' | 'cinematic';
export type PlaybackMode = 'replay' | 'live';

interface ViewerState {
  sampleIndex: number;
  playing: boolean;
  playbackMode: PlaybackMode;
  cameraMode: CameraMode;
  scaleMode: ScaleMode;
  setSampleIndex: (value: number) => void;
  togglePlaying: () => void;
  setPlaybackMode: (mode: PlaybackMode) => void;
  setCameraMode: (mode: CameraMode) => void;
  setScaleMode: (mode: ScaleMode) => void;
}

export const useViewerStore = create<ViewerState>((set) => ({
  sampleIndex: 0,
  playing: false,
  playbackMode: 'replay',
  cameraMode: 'system',
  scaleMode: 'visual',
  setSampleIndex: (sampleIndex) => set({ sampleIndex }),
  togglePlaying: () => set((state) => ({ playing: !state.playing })),
  setPlaybackMode: (playbackMode) => set({ playbackMode }),
  setCameraMode: (cameraMode) => set({ cameraMode }),
  setScaleMode: (scaleMode) => set({ scaleMode })
}));
