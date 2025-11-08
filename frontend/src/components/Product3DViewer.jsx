import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment, Float } from '@react-three/drei';
import { Suspense } from 'react';
import Loader from './Loader';

// 3D Product Model Component
function ProductModel({ category }) {
  const getModelByCategory = () => {
    switch (category) {
      case 'Smartphones':
        return <SmartphoneModel />;
      case 'Laptops':
        return <LaptopModel />;
      case 'Audio':
        return <HeadphonesModel />;
      case 'Gaming':
        return <GameConsoleModel />;
      case 'Cameras':
        return <CameraModel />;
      case 'Tablets':
        return <TabletModel />;
      case 'Wearables':
        return <WatchModel />;
      default:
        return <GenericElectronicsModel />;
    }
  };

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
      {getModelByCategory()}
    </Float>
  );
}

// Smartphone 3D Model
function SmartphoneModel() {
  return (
    <group>
      {/* Phone body */}
      <mesh castShadow receiveShadow position={[0, 0, 0]}>
        <boxGeometry args={[1.2, 2.4, 0.15]} />
        <meshStandardMaterial
          color="#1a1a1a"
          metalness={0.9}
          roughness={0.2}
          envMapIntensity={1.5}
        />
      </mesh>
      {/* Screen */}
      <mesh position={[0, 0, 0.08]}>
        <boxGeometry args={[1.15, 2.3, 0.01]} />
        <meshStandardMaterial
          color="#0066ff"
          emissive="#0033ff"
          emissiveIntensity={0.3}
          metalness={0.1}
          roughness={0.1}
        />
      </mesh>
      {/* Camera notch */}
      <mesh position={[0, 1.1, 0.08]}>
        <cylinderGeometry args={[0.05, 0.05, 0.02, 16]} />
        <meshStandardMaterial color="#000000" />
      </mesh>
    </group>
  );
}

// Laptop 3D Model
function LaptopModel() {
  return (
    <group rotation={[0, Math.PI / 6, 0]}>
      {/* Base */}
      <mesh position={[0, -0.5, 0]} rotation={[-Math.PI * 0.05, 0, 0]}>
        <boxGeometry args={[2.5, 0.1, 1.8]} />
        <meshStandardMaterial color="#2a2a2a" metalness={0.8} roughness={0.3} />
      </mesh>
      {/* Screen */}
      <mesh position={[0, 0.5, -0.85]} rotation={[-Math.PI * 0.15, 0, 0]}>
        <boxGeometry args={[2.4, 1.5, 0.08]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.9} roughness={0.2} />
      </mesh>
      {/* Display */}
      <mesh position={[0, 0.5, -0.81]} rotation={[-Math.PI * 0.15, 0, 0]}>
        <planeGeometry args={[2.3, 1.4]} />
        <meshStandardMaterial
          color="#4a9eff"
          emissive="#1a5fb4"
          emissiveIntensity={0.4}
        />
      </mesh>
    </group>
  );
}

// Headphones 3D Model
function HeadphonesModel() {
  return (
    <group>
      {/* Headband */}
      <mesh position={[0, 0.8, 0]} rotation={[0, 0, Math.PI / 2]}>
        <torusGeometry args={[1, 0.08, 16, 32, Math.PI]} />
        <meshStandardMaterial color="#2a2a2a" metalness={0.7} roughness={0.3} />
      </mesh>
      {/* Left ear cup */}
      <mesh position={[-0.9, 0, 0]}>
        <cylinderGeometry args={[0.4, 0.4, 0.2, 32]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.2} />
      </mesh>
      {/* Right ear cup */}
      <mesh position={[0.9, 0, 0]}>
        <cylinderGeometry args={[0.4, 0.4, 0.2, 32]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.2} />
      </mesh>
      {/* Left cushion */}
      <mesh position={[-0.9, 0, 0]}>
        <cylinderGeometry args={[0.35, 0.35, 0.15, 32]} />
        <meshStandardMaterial color="#4a4a4a" roughness={0.8} />
      </mesh>
      {/* Right cushion */}
      <mesh position={[0.9, 0, 0]}>
        <cylinderGeometry args={[0.35, 0.35, 0.15, 32]} />
        <meshStandardMaterial color="#4a4a4a" roughness={0.8} />
      </mesh>
    </group>
  );
}

// Game Console 3D Model
function GameConsoleModel() {
  return (
    <group>
      {/* Console body */}
      <mesh castShadow>
        <boxGeometry args={[2, 0.3, 1.5]} />
        <meshStandardMaterial color="#f0f0f0" metalness={0.4} roughness={0.6} />
      </mesh>
      {/* Blue accent */}
      <mesh position={[0, 0.16, 0]}>
        <boxGeometry args={[1.8, 0.02, 1.3]} />
        <meshStandardMaterial color="#0066ff" emissive="#0033ff" emissiveIntensity={0.3} />
      </mesh>
      {/* Controller port */}
      <mesh position={[0.6, 0, 0.76]}>
        <cylinderGeometry args={[0.08, 0.08, 0.1, 16]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
    </group>
  );
}

// Camera 3D Model
function CameraModel() {
  return (
    <group rotation={[0, Math.PI / 4, 0]}>
      {/* Camera body */}
      <mesh>
        <boxGeometry args={[1.5, 1, 0.8]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.7} roughness={0.3} />
      </mesh>
      {/* Lens */}
      <mesh position={[0, 0, 0.5]}>
        <cylinderGeometry args={[0.45, 0.45, 0.4, 32]} />
        <meshStandardMaterial color="#0a0a0a" metalness={0.9} roughness={0.1} />
      </mesh>
      {/* Lens glass */}
      <mesh position={[0, 0, 0.7]}>
        <cylinderGeometry args={[0.4, 0.4, 0.02, 32]} />
        <meshStandardMaterial
          color="#ffffff"
          metalness={1}
          roughness={0}
          transparent
          opacity={0.8}
        />
      </mesh>
      {/* Viewfinder */}
      <mesh position={[0, 0.6, -0.2]}>
        <boxGeometry args={[0.3, 0.2, 0.2]} />
        <meshStandardMaterial color="#2a2a2a" />
      </mesh>
    </group>
  );
}

// Tablet 3D Model
function TabletModel() {
  return (
    <group rotation={[Math.PI * 0.1, Math.PI / 6, 0]}>
      {/* Body */}
      <mesh>
        <boxGeometry args={[2, 2.6, 0.12]} />
        <meshStandardMaterial color="#2a2a2a" metalness={0.8} roughness={0.2} />
      </mesh>
      {/* Screen */}
      <mesh position={[0, 0, 0.07]}>
        <planeGeometry args={[1.9, 2.5]} />
        <meshStandardMaterial
          color="#3a8eff"
          emissive="#1a5fb4"
          emissiveIntensity={0.4}
        />
      </mesh>
    </group>
  );
}

// Smartwatch 3D Model
function WatchModel() {
  return (
    <group>
      {/* Watch face */}
      <mesh>
        <cylinderGeometry args={[0.5, 0.5, 0.15, 32]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.9} roughness={0.2} />
      </mesh>
      {/* Screen */}
      <mesh position={[0, 0.08, 0]}>
        <cylinderGeometry args={[0.45, 0.45, 0.01, 32]} />
        <meshStandardMaterial
          color="#0066ff"
          emissive="#0033ff"
          emissiveIntensity={0.5}
        />
      </mesh>
      {/* Band left */}
      <mesh position={[-0.55, 0, 0]}>
        <boxGeometry args={[0.3, 0.1, 0.8]} />
        <meshStandardMaterial color="#2a2a2a" roughness={0.6} />
      </mesh>
      {/* Band right */}
      <mesh position={[0.55, 0, 0]}>
        <boxGeometry args={[0.3, 0.1, 0.8]} />
        <meshStandardMaterial color="#2a2a2a" roughness={0.6} />
      </mesh>
    </group>
  );
}

// Generic Electronics Model
function GenericElectronicsModel() {
  return (
    <group>
      <mesh>
        <boxGeometry args={[1.5, 1.5, 1.5]} />
        <meshStandardMaterial
          color="#3a3a3a"
          metalness={0.8}
          roughness={0.2}
          envMapIntensity={1.5}
        />
      </mesh>
      {/* LED indicator */}
      <mesh position={[0.7, 0.7, 0.76]}>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshStandardMaterial
          color="#00ff00"
          emissive="#00ff00"
          emissiveIntensity={2}
        />
      </mesh>
    </group>
  );
}

// Main Product 3D Viewer Component
export default function Product3DViewer({ category = 'Electronics', className = '' }) {
  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas shadows dpr={[1, 2]}>
        <Suspense fallback={null}>
          <PerspectiveCamera makeDefault position={[0, 0, 5]} />
          
          {/* Lights */}
          <ambientLight intensity={0.5} />
          <spotLight
            position={[10, 10, 10]}
            angle={0.15}
            penumbra={1}
            intensity={1}
            castShadow
          />
          <spotLight
            position={[-10, -10, -10]}
            angle={0.15}
            penumbra={1}
            intensity={0.5}
          />
          <pointLight position={[0, 5, 0]} intensity={0.5} />
          
          {/* 3D Model */}
          <ProductModel category={category} />
          
          {/* Environment for reflections */}
          <Environment preset="city" />
          
          {/* Controls */}
          <OrbitControls
            enablePan={false}
            enableZoom={true}
            minDistance={3}
            maxDistance={8}
            autoRotate
            autoRotateSpeed={2}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
