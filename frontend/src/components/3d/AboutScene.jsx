/* ============================================
   AboutScene — 3D Scene สำหรับ About Section (Premium Metal/Glass)
   Code Bracket Shape + Orbital Rings + Light Animations
   ============================================ */

"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, Sparkles, OrbitControls } from "@react-three/drei";
import * as THREE from "three";

/* ---------- Code Bracket `</>` Shape ---------- */
function CodeBracket() {
  const groupRef = useRef();

  useFrame((state) => {
    if (groupRef.current) {
      // Slow rotation on Y, subtle wave on X
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.25;
      groupRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.1;
    }
  });

  // สร้าง shape สำหรับ bracket ด้วยการกำหนดจุดเวกเตอร์
  const bracketShape = (mirror = false) => {
    const shape = new THREE.Shape();
    const dir = mirror ? -1 : 1;

    shape.moveTo(0.4 * dir, 0.8);
    shape.lineTo(0, 0.8);
    shape.lineTo(-0.5 * dir, 0);
    shape.lineTo(0, -0.8);
    shape.lineTo(0.4 * dir, -0.8);
    shape.lineTo(0.35 * dir, -0.7);
    shape.lineTo(0, -0.7);
    shape.lineTo(-0.4 * dir, 0);
    shape.lineTo(0, 0.7);
    shape.lineTo(0.35 * dir, 0.7);
    shape.closePath();

    return shape;
  };

  const extrudeSettings = {
    depth: 0.22,
    bevelEnabled: true,
    bevelThickness: 0.04,
    bevelSize: 0.025,
    bevelSegments: 5, // High resolution curves
  };

  const materialProps = {
    color: "#a78bfa",
    emissive: "#4f46e5",
    emissiveIntensity: 0.4,
    metalness: 0.9,
    roughness: 0.15,
    clearcoat: 1.0,
    clearcoatRoughness: 0.1,
  };

  return (
    <Float speed={1.5} rotationIntensity={0.4} floatIntensity={0.6}>
      <group ref={groupRef} scale={1.3}>
        {/* Left bracket `<` */}
        <mesh position={[-0.62, 0, 0]}>
          <extrudeGeometry args={[bracketShape(false), extrudeSettings]} />
          <meshPhysicalMaterial {...materialProps} color="#818cf8" />
        </mesh>

        {/* Slash `/` */}
        <mesh position={[0, 0, 0]} rotation={[0, 0, -0.28]}>
          <boxGeometry args={[0.13, 1.25, 0.18]} />
          <meshPhysicalMaterial {...materialProps} color="#c084fc" />
        </mesh>

        {/* Right bracket `>` */}
        <mesh position={[0.62, 0, 0]}>
          <extrudeGeometry args={[bracketShape(true), extrudeSettings]} />
          <meshPhysicalMaterial {...materialProps} color="#818cf8" />
        </mesh>
      </group>
    </Float>
  );
}

/* ---------- Orbital Rings ---------- */
function OrbitalRings() {
  const ring1Ref = useRef();
  const ring2Ref = useRef();
  const ring3Ref = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (ring1Ref.current) {
      ring1Ref.current.rotation.x = Math.PI / 3.2;
      ring1Ref.current.rotation.y = t * 0.45;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.x = -Math.PI / 4.5;
      ring2Ref.current.rotation.z = t * -0.35;
    }
    if (ring3Ref.current) {
      ring3Ref.current.rotation.z = Math.PI / 5.5;
      ring3Ref.current.rotation.y = t * 0.28;
    }
  });

  const ringMaterial = (color) => (
    <meshPhysicalMaterial
      color={color}
      emissive={color}
      emissiveIntensity={0.8}
      transparent
      opacity={0.45}
      metalness={0.9}
      roughness={0.1}
    />
  );

  return (
    <>
      <mesh ref={ring1Ref}>
        <torusGeometry args={[1.65, 0.018, 16, 90]} />
        {ringMaterial("#6366f1")}
      </mesh>
      <mesh ref={ring2Ref}>
        <torusGeometry args={[1.95, 0.015, 16, 90]} />
        {ringMaterial("#a855f7")}
      </mesh>
      <mesh ref={ring3Ref}>
        <torusGeometry args={[2.25, 0.012, 16, 90]} />
        {ringMaterial("#ec4899")}
      </mesh>
    </>
  );
}

/* ---------- Animated Orbital Lights ---------- */
function AnimatedLights() {
  const lightRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (lightRef.current) {
      lightRef.current.position.x = Math.sin(t * 1.2) * 2.8;
      lightRef.current.position.y = Math.cos(t * 0.9) * 2.8;
    }
  });

  return (
    <>
      <pointLight ref={lightRef} intensity={1.8} color="#a855f7" distance={6} />
      <directionalLight position={[2, 2, 3]} intensity={0.6} color="#818cf8" />
    </>
  );
}

/* ---------- Main Export ---------- */
export default function AboutScene() {
  return (
    <>
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        enableDamping
        dampingFactor={0.05}
        autoRotate
        autoRotateSpeed={0.5}
      />
      <AnimatedLights />
      <group scale={0.82}>
        <CodeBracket />
        <OrbitalRings />
      </group>
      <Sparkles
        count={25}
        size={1.2}
        scale={4.2}
        speed={0.35}
        opacity={0.5}
        color="#c4b5fd"
      />
    </>
  );
}
