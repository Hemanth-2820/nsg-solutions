import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, MeshDistortMaterial, Sphere, Float } from '@react-three/drei';

const AbstractShape = () => {
  const meshRef = useRef();

  useFrame((state, delta) => {
    // Slow cinematic rotation
    meshRef.current.rotation.x += delta * 0.2;
    meshRef.current.rotation.y += delta * 0.25;
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1.5}>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[2, 1]} />
        <MeshDistortMaterial 
          color="#00acc1" 
          attach="material" 
          distort={0.4} 
          speed={1.5} 
          roughness={0} 
          wireframe={true} 
        />
      </mesh>
      <mesh>
        <sphereGeometry args={[1.5, 32, 32]} />
        <MeshDistortMaterial 
          color="#1a4b6e" 
          attach="material" 
          distort={0.2} 
          speed={2} 
          roughness={0.2} 
          metalness={0.8}
        />
      </mesh>
    </Float>
  );
};

export default function ThreeDGraphic() {
  return (
    <div className="w-full h-full relative cursor-grab active:cursor-grabbing">
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }} gl={{ alpha: true, antialias: true }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} />
        <spotLight position={[-10, -10, -5]} intensity={0.5} />
        <AbstractShape />
        <OrbitControls enableZoom={false} autoRotate={true} autoRotateSpeed={0.5} />
      </Canvas>
    </div>
  );
}
