/* ============================================
   HeroScene — 3D Scene สำหรับ Hero Section (Premium Glassmorphism)
   TorusKnot + MeshTransmissionMaterial + Wireframe Shell + Animated Lights
   ============================================ */

"use client";

import { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Float, MeshTransmissionMaterial, Sparkles, OrbitControls } from "@react-three/drei";
import * as THREE from "three";

/* ---------- Glass TorusKnot with Inner Glow ---------- */
function CoreShape() {
  const meshRef = useRef();
  const innerRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.x = t * 0.2;
      meshRef.current.rotation.y = t * 0.15;
    }
    if (innerRef.current) {
      innerRef.current.scale.setScalar(1 + Math.sin(t * 2) * 0.1);
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      {/* Outer Glass TorusKnot */}
      <mesh ref={meshRef} scale={1.3}>
        <torusKnotGeometry args={[0.85, 0.26, 150, 20]} />
        <MeshTransmissionMaterial
          backside
          samples={8}
          thickness={0.7}
          chromaticAberration={0.08}
          anisotropy={0.2}
          distortion={0.3}
          distortionScale={0.5}
          temporalDistortion={0.15}
          clearcoat={1}
          clearcoatRoughness={0.1}
          transmission={1.0}
          roughness={0.12}
          metalness={0.1}
          ior={1.3}
          color="#a855f7" // Purple tint
          gazeFilter={true}
        />
      </mesh>

      {/* Inner Glowing Core */}
      <mesh ref={innerRef}>
        <sphereGeometry args={[0.32, 32, 32]} />
        <meshBasicMaterial
          color="#6366f1"
          transparent
          opacity={0.8}
        />
      </mesh>
    </Float>
  );
}

/* ---------- Orbiting Tech Wireframe Shell ---------- */
function WireframeShell() {
  const shellRef = useRef();

  useFrame((state) => {
    if (shellRef.current) {
      shellRef.current.rotation.x = state.clock.getElapsedTime() * -0.08;
      shellRef.current.rotation.y = state.clock.getElapsedTime() * -0.12;
      shellRef.current.rotation.z = state.clock.getElapsedTime() * 0.05;
    }
  });

  return (
    <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.5}>
      <mesh ref={shellRef} scale={2.1}>
        <dodecahedronGeometry args={[1, 1]} />
        <meshBasicMaterial
          color="#818cf8"
          wireframe
          transparent
          opacity={0.18}
        />
      </mesh>
    </Float>
  );
}

/* ---------- Animated Orbital Lights ---------- */
function AnimatedLights() {
  const light1Ref = useRef();
  const light2Ref = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (light1Ref.current) {
      light1Ref.current.position.x = Math.sin(t * 0.8) * 3.5;
      light1Ref.current.position.y = Math.cos(t * 0.6) * 3.5;
      light1Ref.current.position.z = Math.sin(t * 0.4) * 2 + 1;
    }
    if (light2Ref.current) {
      light2Ref.current.position.x = Math.cos(t * 0.7) * -3.5;
      light2Ref.current.position.y = Math.sin(t * 0.5) * -3.5;
      light2Ref.current.position.z = Math.cos(t * 0.3) * 2 + 1;
    }
  });

  return (
    <>
      <pointLight ref={light1Ref} intensity={2.0} color="#818cf8" distance={8} />
      <pointLight ref={light2Ref} intensity={1.5} color="#ec4899" distance={8} />
    </>
  );
}

/* ---------- Floating Small Particle Dots ---------- */
function FloatingDots() {
  const groupRef = useRef();
  const dots = useMemo(() => {
    const positions = [];
    for (let i = 0; i < 10; i++) {
      const angle = (i / 10) * Math.PI * 2;
      const r = 2.4 + Math.random() * 0.6;
      positions.push({
        x: Math.cos(angle) * r,
        y: (Math.random() - 0.5) * 2.2,
        z: Math.sin(angle) * r,
        scale: 0.03 + Math.random() * 0.04,
        speed: 0.4 + Math.random() * 0.4,
      });
    }
    return positions;
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      {dots.map((dot, i) => (
        <Float key={i} speed={dot.speed} floatIntensity={0.6}>
          <mesh position={[dot.x, dot.y, dot.z]}>
            <sphereGeometry args={[dot.scale, 8, 8]} />
            <meshStandardMaterial
              color="#c084fc"
              emissive="#a855f7"
              emissiveIntensity={1.2}
            />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

/* ---------- Mouse Parallax ---------- */
function MouseParallax({ children }) {
  const groupRef = useRef();
  const { viewport } = useThree();

  useFrame((state) => {
    if (groupRef.current) {
      const x = (state.pointer.x * viewport.width) / 25;
      const y = (state.pointer.y * viewport.height) / 25;
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        x * 0.12,
        0.05
      );
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        -y * 0.08,
        0.05
      );
    }
  });

  return <group ref={groupRef}>{children}</group>;
}

/* ---------- Main Export ---------- */
export default function HeroScene() {
  return (
    <>
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        enableDamping
        dampingFactor={0.05}
        autoRotate
        autoRotateSpeed={0.8}
      />
      <AnimatedLights />
      <group scale={0.84}>
        <CoreShape />
        <WireframeShell />
        <FloatingDots />
      </group>
      <Sparkles
        count={50}
        size={1.8}
        scale={5.5}
        speed={0.45}
        opacity={0.6}
        color="#c4b5fd"
      />
    </>
  );
}
