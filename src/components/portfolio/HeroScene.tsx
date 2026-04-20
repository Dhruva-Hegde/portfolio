import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Icosahedron, TorusKnot, Sphere } from "@react-three/drei";
import { Suspense, useRef } from "react";
import type { Mesh } from "three";

const SpinningKnot = () => {
  const ref = useRef<Mesh>(null);
  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.x += delta * 0.2;
      ref.current.rotation.y += delta * 0.3;
    }
  });
  return (
    <Float speed={1.5} rotationIntensity={0.6} floatIntensity={1.2}>
      <TorusKnot ref={ref} args={[1.1, 0.32, 180, 28]} position={[0, 0, 0]}>
        <MeshDistortMaterial
          color="#a855f7"
          emissive="#a855f7"
          emissiveIntensity={0.6}
          distort={0.35}
          speed={2}
          roughness={0.15}
          metalness={0.85}
        />
      </TorusKnot>
    </Float>
  );
};

const FloatingShape = ({
  position,
  color,
  scale = 1,
  type = "ico",
}: {
  position: [number, number, number];
  color: string;
  scale?: number;
  type?: "ico" | "sphere";
}) => {
  return (
    <Float speed={2.2} rotationIntensity={1.2} floatIntensity={2}>
      {type === "ico" ? (
        <Icosahedron args={[0.5 * scale, 0]} position={position}>
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={0.7}
            wireframe
          />
        </Icosahedron>
      ) : (
        <Sphere args={[0.35 * scale, 32, 32]} position={position}>
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={0.5}
            roughness={0.2}
            metalness={0.9}
          />
        </Sphere>
      )}
    </Float>
  );
};

const HeroScene = () => {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 50 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={1.5} color="#a855f7" />
      <pointLight position={[-10, -5, -5]} intensity={1.2} color="#22d3ee" />
      <pointLight position={[0, 5, -10]} intensity={0.8} color="#ec4899" />

      <Suspense fallback={null}>
        <SpinningKnot />
        <FloatingShape position={[-2.5, 1.4, -1]} color="#22d3ee" scale={1.1} type="ico" />
        <FloatingShape position={[2.6, -1.3, -1]} color="#ec4899" scale={0.9} type="ico" />
        <FloatingShape position={[2.2, 1.6, 0]} color="#22d3ee" scale={0.6} type="sphere" />
        <FloatingShape position={[-2.4, -1.5, 0]} color="#a855f7" scale={0.7} type="sphere" />
      </Suspense>
    </Canvas>
  );
};

export default HeroScene;
