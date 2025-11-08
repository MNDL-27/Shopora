import { Canvas, useFrame } from '@react-three/fiber';
import { useRef } from 'react';

function SpinningCube() {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.7;
    }
  });

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial
        color="#3b82f6"
        metalness={0.8}
        roughness={0.2}
        emissive="#1e40af"
        emissiveIntensity={0.3}
      />
    </mesh>
  );
}

function SpinningRing() {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.5;
      meshRef.current.rotation.y = state.clock.elapsedTime;
    }
  });

  return (
    <mesh ref={meshRef}>
      <torusGeometry args={[1.5, 0.2, 16, 32]} />
      <meshStandardMaterial
        color="#8b5cf6"
        metalness={0.9}
        roughness={0.1}
        transparent
        opacity={0.6}
      />
    </mesh>
  );
}

export default function Loader3D() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="w-64 h-64">
        <Canvas camera={{ position: [0, 0, 5] }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <pointLight position={[-10, -10, -10]} intensity={0.5} color="#3b82f6" />
          
          <SpinningCube />
          <SpinningRing />
        </Canvas>
        <div className="text-center mt-4">
          <p className="text-lg font-semibold text-gray-700 dark:text-gray-300 animate-pulse">
            Loading...
          </p>
        </div>
      </div>
    </div>
  );
}
