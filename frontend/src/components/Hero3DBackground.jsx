import { Canvas } from '@react-three/fiber';
import { Float, Sphere, Box, Torus, Cone } from '@react-three/drei';
import { Suspense, useRef } from 'react';
import { useFrame } from '@react-three/fiber';

// Animated 3D shapes
function FloatingShapes() {
  return (
    <>
      {/* Smartphone representation */}
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.8} position={[-3, 2, -2]}>
        <Box args={[0.6, 1.2, 0.1]}>
          <meshStandardMaterial
            color="#3b82f6"
            metalness={0.9}
            roughness={0.1}
            emissive="#1e40af"
            emissiveIntensity={0.3}
          />
        </Box>
      </Float>

      {/* Laptop representation */}
      <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.6} position={[3, 1, -1]}>
        <Box args={[1.2, 0.8, 0.05]}>
          <meshStandardMaterial
            color="#8b5cf6"
            metalness={0.8}
            roughness={0.2}
            emissive="#6d28d9"
            emissiveIntensity={0.2}
          />
        </Box>
      </Float>

      {/* Headphones representation */}
      <Float speed={1.8} rotationIntensity={0.4} floatIntensity={0.7} position={[-2, -1, 0]}>
        <Torus args={[0.5, 0.15, 16, 32]}>
          <meshStandardMaterial
            color="#ec4899"
            metalness={0.7}
            roughness={0.3}
            emissive="#be185d"
            emissiveIntensity={0.3}
          />
        </Torus>
      </Float>

      {/* Gaming controller representation */}
      <Float speed={2.2} rotationIntensity={0.6} floatIntensity={0.9} position={[2, -2, 1]}>
        <Box args={[0.8, 0.5, 0.2]} rotation={[0.3, 0.3, 0]}>
          <meshStandardMaterial
            color="#10b981"
            metalness={0.6}
            roughness={0.4}
            emissive="#047857"
            emissiveIntensity={0.2}
          />
        </Box>
      </Float>

      {/* Smart watch representation */}
      <Float speed={1.6} rotationIntensity={0.5} floatIntensity={0.7} position={[0, 2, -3]}>
        <Torus args={[0.3, 0.08, 16, 32]}>
          <meshStandardMaterial
            color="#f59e0b"
            metalness={0.9}
            roughness={0.1}
            emissive="#d97706"
            emissiveIntensity={0.4}
          />
        </Torus>
      </Float>

      {/* Sphere accents */}
      <Float speed={2.5} rotationIntensity={0.3} floatIntensity={1} position={[-1, 0, 2]}>
        <Sphere args={[0.3, 32, 32]}>
          <meshStandardMaterial
            color="#06b6d4"
            metalness={1}
            roughness={0}
            emissive="#0891b2"
            emissiveIntensity={0.5}
          />
        </Sphere>
      </Float>

      <Float speed={1.9} rotationIntensity={0.4} floatIntensity={0.8} position={[1, 1, 3]}>
        <Sphere args={[0.25, 32, 32]}>
          <meshStandardMaterial
            color="#f43f5e"
            metalness={1}
            roughness={0}
            emissive="#e11d48"
            emissiveIntensity={0.5}
          />
        </Sphere>
      </Float>
    </>
  );
}

// Rotating circuit board pattern
function CircuitBoard() {
  const meshRef = useRef();
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <group ref={meshRef} position={[0, 0, -5]}>
      {/* Circuit lines */}
      {[...Array(12)].map((_, i) => (
        <Box
          key={i}
          args={[0.05, 8, 0.05]}
          position={[Math.cos((i / 12) * Math.PI * 2) * 3, Math.sin((i / 12) * Math.PI * 2) * 3, 0]}
          rotation={[0, 0, (i / 12) * Math.PI * 2]}
        >
          <meshStandardMaterial
            color="#3b82f6"
            emissive="#1e40af"
            emissiveIntensity={0.2}
            transparent
            opacity={0.3}
          />
        </Box>
      ))}
      
      {/* Circuit nodes */}
      {[...Array(12)].map((_, i) => (
        <Sphere
          key={`node-${i}`}
          args={[0.1, 16, 16]}
          position={[Math.cos((i / 12) * Math.PI * 2) * 3, Math.sin((i / 12) * Math.PI * 2) * 3, 0]}
        >
          <meshStandardMaterial
            color="#60a5fa"
            emissive="#3b82f6"
            emissiveIntensity={0.8}
          />
        </Sphere>
      ))}
    </group>
  );
}

// Main Hero 3D Background Component
export default function Hero3DBackground({ className = '' }) {
  return (
    <div className={`absolute inset-0 ${className}`}>
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <Suspense fallback={null}>
          {/* Lights */}
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <pointLight position={[-10, -10, -10]} intensity={0.5} color="#3b82f6" />
          <pointLight position={[0, 0, 5]} intensity={0.8} color="#8b5cf6" />
          
          {/* 3D Elements */}
          <FloatingShapes />
          <CircuitBoard />
        </Suspense>
      </Canvas>
    </div>
  );
}
