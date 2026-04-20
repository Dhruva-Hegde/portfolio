import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Torus, Sphere, Stars } from "@react-three/drei";
import { Suspense, useRef } from "react";
import type { Mesh, Group } from "three";
import * as THREE from "three";

/* ============================================================
   BLACK HOLE / PORTAL — glowing accretion disk + event horizon
   ============================================================ */
const BlackHole = () => {
  const diskRef = useRef<Mesh>(null);
  const ringRef = useRef<Mesh>(null);
  const coreRef = useRef<Mesh>(null);

  useFrame((state, delta) => {
    if (diskRef.current) diskRef.current.rotation.z += delta * 0.6;
    if (ringRef.current) ringRef.current.rotation.z -= delta * 0.4;
    if (coreRef.current) {
      const pulse = 1 + Math.sin(state.clock.elapsedTime * 1.5) * 0.08;
      coreRef.current.scale.setScalar(pulse);
    }
  });

  return (
    <group rotation={[Math.PI / 2.4, 0, 0]}>
      {/* Outer accretion disk — glowing distorted ring */}
      <Torus ref={diskRef} args={[1.6, 0.08, 32, 200]}>
        <MeshDistortMaterial
          color="#a855f7"
          emissive="#c084fc"
          emissiveIntensity={2.5}
          distort={0.3}
          speed={2}
          toneMapped={false}
        />
      </Torus>

      {/* Inner ring — cyan */}
      <Torus ref={ringRef} args={[1.15, 0.05, 32, 160]}>
        <meshStandardMaterial
          color="#22d3ee"
          emissive="#22d3ee"
          emissiveIntensity={2}
          toneMapped={false}
        />
      </Torus>

      {/* Event horizon — dark sphere */}
      <Sphere ref={coreRef} args={[0.75, 64, 64]}>
        <meshStandardMaterial color="#000000" roughness={1} metalness={0} />
      </Sphere>

      {/* Glow halo */}
      <Sphere args={[0.95, 32, 32]}>
        <meshBasicMaterial
          color="#a855f7"
          transparent
          opacity={0.12}
          toneMapped={false}
        />
      </Sphere>
    </group>
  );
};

/* ============================================================
   ORBITING TECH ICONS — particles circling the black hole
   ============================================================ */
const OrbitingParticle = ({
  radius,
  speed,
  offset,
  color,
  size = 0.12,
  tilt = 0,
}: {
  radius: number;
  speed: number;
  offset: number;
  color: string;
  size?: number;
  tilt?: number;
}) => {
  const ref = useRef<Mesh>(null);
  useFrame((state) => {
    if (ref.current) {
      const t = state.clock.elapsedTime * speed + offset;
      ref.current.position.x = Math.cos(t) * radius;
      ref.current.position.z = Math.sin(t) * radius;
      ref.current.position.y = Math.sin(t * 0.7) * tilt;
    }
  });
  return (
    <Sphere ref={ref} args={[size, 16, 16]}>
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={1.5}
        toneMapped={false}
      />
    </Sphere>
  );
};

/* ============================================================
   BACKGROUND SHAPES — wireframe icosahedrons for depth
   ============================================================ */
const FloatingWireframe = ({
  position,
  color,
  scale = 1,
}: {
  position: [number, number, number];
  color: string;
  scale?: number;
}) => {
  const ref = useRef<Group>(null);
  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.x += delta * 0.3;
      ref.current.rotation.y += delta * 0.2;
    }
  });
  return (
    <Float speed={1.8} rotationIntensity={0.6} floatIntensity={1.5}>
      <group ref={ref} position={position}>
        <mesh>
          <icosahedronGeometry args={[0.5 * scale, 0]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={0.6}
            wireframe
            toneMapped={false}
          />
        </mesh>
      </group>
    </Float>
  );
};

/* ============================================================
   MAIN SCENE
   ============================================================ */
const HeroScene = () => {
  return (
    <Canvas
      camera={{ position: [0, 0.3, 5], fov: 55 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true, toneMapping: THREE.ACESFilmicToneMapping }}
    >
      {/* Lighting */}
      <ambientLight intensity={0.3} />
      <pointLight position={[5, 5, 5]} intensity={1.5} color="#a855f7" />
      <pointLight position={[-5, -3, -3]} intensity={1.2} color="#22d3ee" />
      <pointLight position={[0, 0, 0]} intensity={2} color="#ec4899" distance={4} />

      <Suspense fallback={null}>
        {/* Distant stars */}
        <Stars radius={50} depth={30} count={1500} factor={3} saturation={0} fade speed={0.5} />

        {/* Centerpiece */}
        <BlackHole />

        {/* Orbiting tech particles — different orbits, speeds, colors */}
        <OrbitingParticle radius={2.0} speed={0.8} offset={0} color="#22d3ee" size={0.14} tilt={0.3} />
        <OrbitingParticle radius={2.0} speed={0.8} offset={Math.PI * 0.66} color="#a855f7" size={0.13} tilt={0.3} />
        <OrbitingParticle radius={2.0} speed={0.8} offset={Math.PI * 1.33} color="#ec4899" size={0.14} tilt={0.3} />

        <OrbitingParticle radius={2.6} speed={-0.5} offset={0} color="#a855f7" size={0.1} tilt={0.6} />
        <OrbitingParticle radius={2.6} speed={-0.5} offset={Math.PI * 0.5} color="#22d3ee" size={0.11} tilt={0.6} />
        <OrbitingParticle radius={2.6} speed={-0.5} offset={Math.PI} color="#ec4899" size={0.1} tilt={0.6} />
        <OrbitingParticle radius={2.6} speed={-0.5} offset={Math.PI * 1.5} color="#c084fc" size={0.12} tilt={0.6} />

        <OrbitingParticle radius={3.2} speed={0.35} offset={0} color="#22d3ee" size={0.08} tilt={0.9} />
        <OrbitingParticle radius={3.2} speed={0.35} offset={Math.PI * 0.4} color="#a855f7" size={0.09} tilt={0.9} />
        <OrbitingParticle radius={3.2} speed={0.35} offset={Math.PI * 0.8} color="#ec4899" size={0.08} tilt={0.9} />
        <OrbitingParticle radius={3.2} speed={0.35} offset={Math.PI * 1.2} color="#c084fc" size={0.1} tilt={0.9} />
        <OrbitingParticle radius={3.2} speed={0.35} offset={Math.PI * 1.6} color="#22d3ee" size={0.08} tilt={0.9} />

        {/* Decorative wireframes */}
        <FloatingWireframe position={[-3, 1.8, -2]} color="#22d3ee" scale={0.7} />
        <FloatingWireframe position={[3, -1.8, -2]} color="#ec4899" scale={0.6} />
      </Suspense>
    </Canvas>
  );
};

export default HeroScene;
