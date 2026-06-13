"use client"

import { Suspense, useMemo } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, useGLTF } from "@react-three/drei"

type HeroGlbBackgroundProps = {
  modelUrl: string
}

function Model({ modelUrl }: HeroGlbBackgroundProps) {
  const gltf = useGLTF(modelUrl)
  const scene = useMemo(() => gltf.scene.clone(), [gltf.scene])

  return (
    <primitive object={scene} position={[0, -0.4, 0]} scale={1} />
  )
}

export function HeroGlbBackground({ modelUrl }: HeroGlbBackgroundProps) {
  return (
    <Canvas
      className="h-full w-full cursor-grab active:cursor-grabbing"
      dpr={[1, 1.5]}
      camera={{ position: [0, 0.1, 4.5], fov: 38 }}
      gl={{ alpha: false, antialias: true }}
      onCreated={({ gl }) => {
        gl.setClearColor("#000000", 1)
      }}
    >
      <ambientLight intensity={0.95} />
      <directionalLight position={[2, 3, 3]} intensity={1.2} />
      <directionalLight position={[-3, -2, -2]} intensity={0.45} />

      <Suspense fallback={null}>
        <Model modelUrl={modelUrl} />
      </Suspense>

      <OrbitControls
        makeDefault
        enableRotate
        enablePan={false}
        enableZoom={false}
        rotateSpeed={1}
        minPolarAngle={Math.PI * 0.25}
        maxPolarAngle={Math.PI * 0.75}
      />
    </Canvas>
  )
}
