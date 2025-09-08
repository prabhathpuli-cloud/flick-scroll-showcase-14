import { useState, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Text3D, Box, Plane, useTexture, Html } from "@react-three/drei";
import * as THREE from "three";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

// Floating ticket component
function FloatingTicket({ position }: { position: [number, number, number] }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <boxGeometry args={[3, 1.8, 0.1]} />
      <meshStandardMaterial 
        color="#f5f5dc"
        metalness={0.1}
        roughness={0.3}
      />
      {/* Ticket perforations */}
      <mesh position={[-1.3, 0, 0.06]}>
        <cylinderGeometry args={[0.05, 0.05, 0.2]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>
      <mesh position={[1.3, 0, 0.06]}>
        <cylinderGeometry args={[0.05, 0.05, 0.2]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>
    </mesh>
  );
}

// Red carpet plane
function RedCarpet() {
  return (
    <Plane args={[20, 30]} rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]}>
      <meshStandardMaterial 
        color="#8B0000"
        roughness={0.8}
        metalness={0.1}
      />
    </Plane>
  );
}

// Spotlight component
function Spotlight({ position, target }: { position: [number, number, number], target: [number, number, number] }) {
  const lightRef = useRef<THREE.SpotLight>(null);
  
  useFrame((state) => {
    if (lightRef.current) {
      lightRef.current.target.position.set(...target);
      lightRef.current.target.updateMatrixWorld();
    }
  });

  return (
    <>
      <spotLight
        ref={lightRef}
        position={position}
        angle={0.3}
        penumbra={0.5}
        intensity={2}
        color="#FFD700"
        distance={20}
        decay={2}
      />
      {/* Spotlight beam visualization */}
      <mesh position={position}>
        <coneGeometry args={[0.2, 1, 8]} />
        <meshBasicMaterial color="#FFD700" transparent opacity={0.3} />
      </mesh>
    </>
  );
}

// Floating golden particles
function GoldenParticles() {
  const particlesRef = useRef<THREE.Points>(null);
  
  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  const particles = new Array(50).fill(0).map(() => ({
    position: [
      (Math.random() - 0.5) * 20,
      Math.random() * 10,
      (Math.random() - 0.5) * 20
    ]
  }));

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particles.length}
          array={new Float32Array(particles.flatMap(p => p.position))}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.05} color="#FFD700" transparent opacity={0.6} />
    </points>
  );
}

// Login form overlay
function LoginForm({ onLogin }: { onLogin: (username: string, password: string) => void }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(username, password);
  };

  return (
    <Html center>
      <Card className="w-96 p-8 bg-gradient-ticket shadow-ticket border-2 border-primary/20 relative">
        {/* Ticket perforations */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-6 h-6 bg-background rounded-full -translate-x-1/2"></div>
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-6 h-6 bg-background rounded-full translate-x-1/2"></div>
        
        {/* Ticket stub line */}
        <div className="absolute left-8 top-0 bottom-0 w-px bg-muted-foreground/20 border-l border-dashed"></div>
        
        <div className="ml-6">
          <div className="text-center mb-8">
            <h1 className="font-cinematic text-4xl font-bold text-primary mb-2">
              PREMIERE ACCESS
            </h1>
            <p className="text-sm text-muted-foreground uppercase tracking-wider">
              Exclusive Script Library
            </p>
            <div className="mt-4 flex justify-center items-center gap-2">
              <div className="w-8 h-1 bg-primary"></div>
              <span className="text-xs text-muted-foreground">ADMIT ONE</span>
              <div className="w-8 h-1 bg-primary"></div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground uppercase tracking-wide">
                Producer ID
              </label>
              <Input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="bg-background/50 border-primary/30 focus:border-primary text-foreground"
                placeholder="Enter your producer ID"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground uppercase tracking-wide">
                Access Code
              </label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-background/50 border-primary/30 focus:border-primary text-foreground"
                placeholder="Enter access code"
                required
              />
            </div>

            <Button 
              type="submit" 
              className="w-full bg-primary hover:bg-accent text-primary-foreground font-semibold py-3 uppercase tracking-wide transition-all duration-300 hover:shadow-glow"
            >
              Enter Premiere
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-xs text-muted-foreground">
              Exclusive access for verified film producers only
            </p>
          </div>
        </div>
      </Card>
    </Html>
  );
}

// Main premiere login scene
function PremiereScene({ onLogin }: { onLogin: (username: string, password: string) => void }) {
  return (
    <>
      {/* Ambient lighting */}
      <ambientLight intensity={0.3} color="#1a1a2e" />
      
      {/* Main directional light */}
      <directionalLight position={[5, 10, 5]} intensity={1} color="#FFD700" />
      
      {/* Spotlights */}
      <Spotlight position={[-8, 8, 5]} target={[0, 0, 0]} />
      <Spotlight position={[8, 8, 5]} target={[0, 0, 0]} />
      <Spotlight position={[0, 10, -8]} target={[0, 0, 0]} />
      
      {/* Red carpet */}
      <RedCarpet />
      
      {/* Floating decorative tickets */}
      <FloatingTicket position={[-6, 2, -3]} />
      <FloatingTicket position={[6, 1.5, -2]} />
      <FloatingTicket position={[-4, 3, 2]} />
      <FloatingTicket position={[5, 2.5, 3]} />
      
      {/* Golden particles */}
      <GoldenParticles />
      
      {/* Login form */}
      <LoginForm onLogin={onLogin} />
      
      {/* Camera controls */}
      <OrbitControls 
        enableZoom={true}
        enablePan={false}
        maxPolarAngle={Math.PI / 2}
        minDistance={5}
        maxDistance={15}
        target={[0, 0, 0]}
      />
    </>
  );
}

interface PremiereLoginProps {
  onLogin: (username: string, password: string) => void;
}

export default function PremiereLogin({ onLogin }: PremiereLoginProps) {
  return (
    <div className="w-full h-screen relative overflow-hidden">
      {/* Background gradient */}
      <div 
        className="absolute inset-0 opacity-80"
        style={{
          background: `
            radial-gradient(circle at 20% 80%, hsl(0 75% 45% / 0.3) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, hsl(43 96% 60% / 0.2) 0%, transparent 50%),
            var(--gradient-premier)
          `
        }}
      />
      
      {/* 3D Scene */}
      <Canvas
        camera={{ position: [0, 5, 8], fov: 60 }}
        style={{ background: 'transparent' }}
      >
        <PremiereScene onLogin={onLogin} />
      </Canvas>
      
      {/* Decorative elements */}
      <div className="absolute top-8 left-8 text-primary/60">
        <div className="font-cinematic text-2xl">★</div>
      </div>
      <div className="absolute top-12 right-12 text-primary/40">
        <div className="font-cinematic text-3xl">★</div>
      </div>
      <div className="absolute bottom-8 left-1/4 text-primary/30">
        <div className="font-cinematic text-xl">★</div>
      </div>
      <div className="absolute bottom-16 right-1/3 text-primary/50">
        <div className="font-cinematic text-2xl">★</div>
      </div>
    </div>
  );
}