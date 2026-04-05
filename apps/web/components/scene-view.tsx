'use client';
import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import { useMemo } from 'react';
import { type Vector3 } from '@cislunar/mission-engine';

function scaleForMode(mode: 'physical' | 'visual' | 'cinematic') {
  switch (mode) {
    case 'physical': return 1 / 6000;
    case 'cinematic': return 1 / 22000;
    default: return 1 / 12000;
  }
}

function toScene([x, y, z]: Vector3, scale: number): Vector3 {
  return [x * scale, y * scale, z * scale];
}

export function SceneView({ points, current, scaleMode }: { points: Vector3[]; current: Vector3; scaleMode: 'physical' | 'visual' | 'cinematic' }) {
  const scale = scaleForMode(scaleMode);
  const scaledPoints = useMemo(() => points.map((point) => toScene(point, scale)), [points, scale]);
  const currentPoint = toScene(current, scale);

  return (
    <div className="h-[480px] overflow-hidden rounded-3xl border border-white/10 bg-slate-950/50">
      <Canvas camera={{ position: [22, 14, 18], fov: 45 }}>
        <color attach="background" args={['#020617']} />
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 8, 5]} intensity={2.2} />
        <Stars radius={160} depth={60} count={5000} factor={3} saturation={0} fade speed={0.7} />
        <mesh position={[0, 0, 0]}>
          <sphereGeometry args={[1.8, 48, 48]} />
          <meshStandardMaterial color="#2563eb" emissive="#1d4ed8" emissiveIntensity={0.25} />
        </mesh>
        <mesh position={[32, 0, 0]}>
          <sphereGeometry args={[0.65, 48, 48]} />
          <meshStandardMaterial color="#cbd5e1" emissive="#94a3b8" emissiveIntensity={0.15} />
        </mesh>
        <line>
          <bufferGeometry attach="geometry">
            <bufferAttribute
              attach="attributes-position"
              args={[new Float32Array(scaledPoints.flat()), 3]}
              count={scaledPoints.length}
              itemSize={3}
            />
          </bufferGeometry>
          <lineBasicMaterial attach="material" color="#67e8f9" linewidth={2} />
        </line>
        <mesh position={currentPoint}>
          <sphereGeometry args={[0.18, 32, 32]} />
          <meshStandardMaterial color="#f97316" emissive="#fb923c" emissiveIntensity={0.6} />
        </mesh>
        <OrbitControls enablePan enableZoom enableRotate />
      </Canvas>
    </div>
  );
}
