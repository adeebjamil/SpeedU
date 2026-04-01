"use client";

import { useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

/* ── Drone body built from primitives ── */
function DroneModel() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.3;
    }
  });

  const orange = "#F97316";
  const dark = "#1a1a1a";
  const gray = "#2a2a2a";

  return (
    <Float speed={1.5} rotationIntensity={0.15} floatIntensity={0.4}>
      <group ref={groupRef} scale={1.2}>
        {/* Central body */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[0.8, 0.2, 0.8]} />
          <meshStandardMaterial color={dark} metalness={0.8} roughness={0.3} />
        </mesh>

        {/* Top dome */}
        <mesh position={[0, 0.15, 0]}>
          <sphereGeometry args={[0.3, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshStandardMaterial color={gray} metalness={0.7} roughness={0.4} />
        </mesh>

        {/* Camera / sensor on front */}
        <mesh position={[0, -0.05, 0.35]}>
          <sphereGeometry args={[0.06, 16, 16]} />
          <meshStandardMaterial color={orange} emissive={orange} emissiveIntensity={0.5} metalness={0.9} roughness={0.1} />
        </mesh>

        {/* LED ring on top */}
        <mesh position={[0, 0.12, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.2, 0.015, 8, 32]} />
          <meshStandardMaterial color={orange} emissive={orange} emissiveIntensity={0.8} />
        </mesh>

        {/* Arms */}
        {[
          { pos: [0.55, 0, 0.55] as [number, number, number], rot: [0, Math.PI / 4, 0] as [number, number, number] },
          { pos: [-0.55, 0, 0.55] as [number, number, number], rot: [0, -Math.PI / 4, 0] as [number, number, number] },
          { pos: [0.55, 0, -0.55] as [number, number, number], rot: [0, -Math.PI / 4, 0] as [number, number, number] },
          { pos: [-0.55, 0, -0.55] as [number, number, number], rot: [0, Math.PI / 4, 0] as [number, number, number] },
        ].map((arm, i) => (
          <group key={i}>
            {/* Arm beam */}
            <mesh position={[(arm.pos[0]) * 0.5, 0, (arm.pos[2]) * 0.5]} rotation={arm.rot}>
              <boxGeometry args={[0.75, 0.06, 0.06]} />
              <meshStandardMaterial color={gray} metalness={0.7} roughness={0.4} />
            </mesh>
            {/* Motor housing */}
            <mesh position={arm.pos}>
              <cylinderGeometry args={[0.09, 0.09, 0.08, 16]} />
              <meshStandardMaterial color={dark} metalness={0.8} roughness={0.3} />
            </mesh>
            {/* Propeller disc - translucent */}
            <mesh position={[arm.pos[0], arm.pos[1] + 0.06, arm.pos[2]]} rotation={[0, 0, 0]}>
              <cylinderGeometry args={[0.22, 0.22, 0.01, 32]} />
              <meshStandardMaterial color={orange} transparent opacity={0.2} metalness={0.5} roughness={0.5} />
            </mesh>
          </group>
        ))}

        {/* Landing gear */}
        {[-0.25, 0.25].map((x) => (
          <group key={x}>
            <mesh position={[x, -0.2, 0]}>
              <boxGeometry args={[0.03, 0.12, 0.5]} />
              <meshStandardMaterial color={gray} metalness={0.6} roughness={0.5} />
            </mesh>
          </group>
        ))}

        {/* Package / payload */}
        <mesh position={[0, -0.35, 0]}>
          <boxGeometry args={[0.25, 0.15, 0.2]} />
          <meshStandardMaterial color={orange} metalness={0.3} roughness={0.6} />
        </mesh>
      </group>
    </Float>
  );
}

/* ── Fallback while loading ── */
function LoadingFallback() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="w-8 h-8 rounded-full border-2 border-[#F97316]/30 border-t-[#F97316] animate-spin" />
    </div>
  );
}

/* ── Main exported component ── */
export function Drone3D({ className = "" }: { className?: string }) {
  return (
    <div className={`relative ${className}`}>
      <Suspense fallback={<LoadingFallback />}>
        <Canvas
          camera={{ position: [2.5, 1.5, 2.5], fov: 35 }}
          gl={{ antialias: true, alpha: true }}
          style={{ background: "transparent" }}
        >
          <ambientLight intensity={0.4} />
          <hemisphereLight color="#ffffff" groundColor="#F97316" intensity={0.3} />
          <directionalLight position={[5, 5, 5]} intensity={1} color="#ffffff" />
          <directionalLight position={[-3, 2, -3]} intensity={0.4} color="#F97316" />
          <pointLight position={[0, -1, 0]} intensity={0.3} color="#F97316" />
          <DroneModel />
        </Canvas>
      </Suspense>

      {/* Glow effect behind the 3D scene */}
      <div className="absolute inset-0 -z-10 pointer-events-none" style={{
        background: "radial-gradient(ellipse 50% 50% at 50% 50%, rgba(249,115,22,0.1) 0%, transparent 70%)",
      }} />
    </div>
  );
}
