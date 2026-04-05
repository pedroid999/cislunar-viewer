'use client';
import React, { useMemo, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Html, OrbitControls, Stars } from '@react-three/drei';
import { type Vector3 } from '@cislunar/mission-engine';
import * as THREE from 'three';

type CameraMode = 'system' | 'earth' | 'moon' | 'spacecraft';
type ScaleMode = 'physical' | 'visual' | 'cinematic';

function scaleForMode(mode: ScaleMode) {
  switch (mode) {
    case 'physical': return 1 / 6000;
    case 'cinematic': return 1 / 22000;
    default: return 1 / 12000;
  }
}

function toScene([x, y, z]: Vector3, scale: number): Vector3 {
  return [x * scale, y * scale, z * scale];
}

function lerpVector(a: Vector3, b: Vector3, t: number): Vector3 {
  return [
    a[0] + (b[0] - a[0]) * t,
    a[1] + (b[1] - a[1]) * t,
    a[2] + (b[2] - a[2]) * t
  ];
}

function SceneCamera({ cameraMode, earth, moon, spacecraft }: { cameraMode: CameraMode; earth: Vector3; moon: Vector3; spacecraft: Vector3 }) {
  const { camera } = useThree();
  const controlsRef = useRef<any>(null);

  useFrame(() => {
    const targets: Record<CameraMode, { lookAt: Vector3; from: Vector3 }> = {
      system: { lookAt: lerpVector(earth, moon, 0.5), from: [spacecraft[0] + 16, spacecraft[1] + 10, spacecraft[2] + 14] },
      earth: { lookAt: earth, from: [earth[0] + 8, earth[1] + 4, earth[2] + 6] },
      moon: { lookAt: moon, from: [moon[0] + 4, moon[1] + 2.5, moon[2] + 4] },
      spacecraft: { lookAt: spacecraft, from: [spacecraft[0] + 3.6, spacecraft[1] + 1.6, spacecraft[2] + 2.8] }
    };

    const target = targets[cameraMode];
    camera.position.lerp(new THREE.Vector3(...target.from), 0.06);
    camera.lookAt(...target.lookAt);
    if (controlsRef.current) {
      controlsRef.current.target.lerp(new THREE.Vector3(...target.lookAt), 0.08);
      controlsRef.current.update();
    }
  });

  return <OrbitControls ref={controlsRef} enablePan enableZoom enableRotate />;
}

function Label({ position, children }: { position: Vector3; children: React.ReactNode }) {
  return (
    <Html position={position} center distanceFactor={10}>
      <div className="rounded-full border border-white/20 bg-slate-950/75 px-2 py-1 text-[10px] uppercase tracking-[0.2em] text-slate-100 shadow-lg shadow-black/30">
        {children}
      </div>
    </Html>
  );
}

export function SceneView({
  points,
  current,
  moon,
  currentIndex,
  scaleMode,
  cameraMode,
  highlightedEventLabel
}: {
  points: Vector3[];
  current: Vector3;
  moon: Vector3;
  currentIndex: number;
  scaleMode: ScaleMode;
  cameraMode: CameraMode;
  highlightedEventLabel?: string;
}) {
  const scale = scaleForMode(scaleMode);
  const scaledPoints = useMemo(() => points.map((point) => toScene(point, scale)), [points, scale]);
  const activeTrail = useMemo(() => scaledPoints.slice(0, Math.max(currentIndex + 1, 2)), [scaledPoints, currentIndex]);
  const currentPoint = toScene(current, scale);
  const moonPoint = toScene(moon, scale);
  const earthPoint: Vector3 = [0, 0, 0];
  const guideLine = useMemo(() => new Float32Array([...earthPoint, ...moonPoint]), [moonPoint]);

  return (
    <div className="h-[560px] overflow-hidden rounded-3xl border border-white/10 bg-slate-950/50">
      <Canvas camera={{ position: [22, 14, 18], fov: 45 }}>
        <color attach="background" args={['#020617']} />
        <fog attach="fog" args={['#020617', 20, 120]} />
        <ambientLight intensity={0.7} />
        <directionalLight position={[10, 8, 5]} intensity={2.4} />
        <pointLight position={moonPoint} intensity={0.6} color="#e2e8f0" />
        <Stars radius={160} depth={60} count={5000} factor={3} saturation={0} fade speed={0.7} />

        <mesh position={earthPoint}>
          <sphereGeometry args={[1.8, 64, 64]} />
          <meshStandardMaterial color="#2563eb" emissive="#1d4ed8" emissiveIntensity={0.28} roughness={0.9} />
        </mesh>
        <Label position={[0, 2.6, 0]}>Earth</Label>

        <mesh position={moonPoint}>
          <sphereGeometry args={[0.65, 48, 48]} />
          <meshStandardMaterial color="#cbd5e1" emissive="#94a3b8" emissiveIntensity={0.16} roughness={1} />
        </mesh>
        <Label position={[moonPoint[0], moonPoint[1] + 1.2, moonPoint[2]]}>Moon</Label>

        <line>
          <bufferGeometry attach="geometry">
            <bufferAttribute attach="attributes-position" args={[guideLine, 3]} count={2} itemSize={3} />
          </bufferGeometry>
          <lineBasicMaterial attach="material" color="#475569" linewidth={1} />
        </line>

        <line>
          <bufferGeometry attach="geometry">
            <bufferAttribute attach="attributes-position" args={[new Float32Array(scaledPoints.flat()), 3]} count={scaledPoints.length} itemSize={3} />
          </bufferGeometry>
          <lineBasicMaterial attach="material" color="#164e63" linewidth={1} />
        </line>

        <line>
          <bufferGeometry attach="geometry">
            <bufferAttribute attach="attributes-position" args={[new Float32Array(activeTrail.flat()), 3]} count={activeTrail.length} itemSize={3} />
          </bufferGeometry>
          <lineBasicMaterial attach="material" color="#67e8f9" linewidth={2} />
        </line>

        <mesh position={currentPoint}>
          <octahedronGeometry args={[0.22, 0]} />
          <meshStandardMaterial color="#f97316" emissive="#fb923c" emissiveIntensity={0.75} />
        </mesh>
        <Label position={[currentPoint[0], currentPoint[1] + 0.8, currentPoint[2]]}>Orion</Label>

        {highlightedEventLabel ? <Label position={[currentPoint[0], currentPoint[1] - 1, currentPoint[2]]}>{highlightedEventLabel}</Label> : null}

        <SceneCamera cameraMode={cameraMode} earth={earthPoint} moon={moonPoint} spacecraft={currentPoint} />
      </Canvas>
    </div>
  );
}
