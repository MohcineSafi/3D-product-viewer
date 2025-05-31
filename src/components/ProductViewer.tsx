
import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, Text, Box } from '@react-three/drei';
import { Mesh } from 'three';

const ProductBox = ({ hovered, clicked }: { hovered: boolean; clicked: boolean }) => {
  const meshRef = useRef<Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += clicked ? 0.02 : 0.005;
      meshRef.current.position.y = hovered ? 0.2 : 0;
    }
  });

  return (
    <group>
      {/* Main Product Box */}
      <Box
        ref={meshRef}
        args={[2, 2.5, 1]}
        position={[0, 0, 0]}
      >
        <meshStandardMaterial 
          color={hovered ? "#4f46e5" : "#6366f1"} 
          roughness={0.1}
          metalness={0.8}
        />
      </Box>
      
      {/* Product Label */}
      <Text
        position={[0, 0, 0.51]}
        fontSize={0.3}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        font="/fonts/bold.woff"
      >
        PREMIUM
      </Text>
      
      <Text
        position={[0, -0.4, 0.51]}
        fontSize={0.2}
        color="#e5e7eb"
        anchorX="center"
        anchorY="middle"
      >
        PRODUCT
      </Text>

      {/* Side Details */}
      <Box args={[0.1, 2, 0.8]} position={[1.05, 0, 0]}>
        <meshStandardMaterial color="#1f2937" roughness={0.8} />
      </Box>
      
      <Box args={[0.1, 2, 0.8]} position={[-1.05, 0, 0]}>
        <meshStandardMaterial color="#1f2937" roughness={0.8} />
      </Box>
    </group>
  );
};

const Scene = () => {
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  return (
    <>
      <ambientLight intensity={0.4} />
      <spotLight 
        position={[10, 10, 10]} 
        angle={0.15} 
        penumbra={1} 
        intensity={1}
        castShadow
      />
      <pointLight position={[-10, -10, -10]} intensity={0.3} />
      
      <group
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={() => setClicked(!clicked)}
      >
        <ProductBox hovered={hovered} clicked={clicked} />
      </group>
      
      <ContactShadows 
        position={[0, -1.4, 0]} 
        opacity={0.4} 
        scale={10} 
        blur={1.5} 
        far={4.5} 
      />
      
      <Environment preset="city" />
      <OrbitControls 
        enablePan={false} 
        enableZoom={true} 
        enableRotate={true}
        minDistance={3}
        maxDistance={8}
        autoRotate={!clicked}
        autoRotateSpeed={0.5}
      />
    </>
  );
};

const ProductViewer = () => {
  const [isAutoRotate, setIsAutoRotate] = useState(true);

  return (
    <div className="relative w-full h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-10 p-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">3D Product Viewer</h1>
            <p className="text-slate-300">Interactive product visualization</p>
          </div>
          <div className="flex gap-4">
            <button
              onClick={() => setIsAutoRotate(!isAutoRotate)}
              className="px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white hover:bg-white/20 transition-all duration-300"
            >
              {isAutoRotate ? 'Stop Rotation' : 'Auto Rotate'}
            </button>
          </div>
        </div>
      </div>

      {/* 3D Canvas */}
      <Canvas
        shadows
        camera={{ position: [0, 0, 5], fov: 60 }}
        style={{ height: '100vh' }}
      >
        <Scene />
      </Canvas>

      {/* Controls Panel */}
      <div className="absolute bottom-6 left-6 right-6 z-10">
        <div className="max-w-md mx-auto bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-white mb-3">Controls</h3>
          <div className="space-y-2 text-sm text-slate-300">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
              <span>Drag to rotate • Scroll to zoom</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
              <span>Click product to toggle auto-rotation</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
              <span>Hover for interactive effects</span>
            </div>
          </div>
        </div>
      </div>

      {/* Feature Badge */}
      <div className="absolute top-6 right-6 z-10">
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg">
          Interactive 3D
        </div>
      </div>
    </div>
  );
};

export default ProductViewer;
