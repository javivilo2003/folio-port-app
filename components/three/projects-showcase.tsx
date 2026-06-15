"use client"

import { Suspense, useEffect, useMemo, useRef, type RefObject } from "react"
import { Canvas, useFrame, useLoader } from "@react-three/fiber"
import * as THREE from "three"

export const SHOWCASE_PHONE_COUNT = 23

const PHONE_PATHS = Array.from({ length: SHOWCASE_PHONE_COUNT }, (_, i) => {
  const num = String(11 + i).padStart(4, "0")
  return `/images/projects/healthcare-app/IMG_${num}-portrait.webp`
})

// Screenshot aspect (1419:2796) is preserved so we never letterbox. The
// canvas itself is bounded between the navbar and the bottom caption block
// in app/page.tsx, so the row sits at y=0 and just fills its container.
const PHONE_WIDTH = 1.05
const PHONE_HEIGHT = 2.07
const PHONE_SPACING = 1.55
const ROW_Y_OFFSET = 0

type PhoneProps = {
  src: string
  index: number
  total: number
  progressRef: RefObject<number>
}

function Phone({ src, index, total, progressRef }: PhoneProps) {
  const meshRef = useRef<THREE.Mesh>(null)
  const loadedTexture = useLoader(THREE.TextureLoader, src)

  const texture = useMemo(() => {
    const configuredTexture = loadedTexture.clone()
    configuredTexture.anisotropy = 8
    configuredTexture.colorSpace = THREE.SRGBColorSpace
    configuredTexture.minFilter = THREE.LinearMipmapLinearFilter
    configuredTexture.generateMipmaps = true
    configuredTexture.needsUpdate = true
    return configuredTexture
  }, [loadedTexture])

  useEffect(() => {
    return () => {
      texture.dispose()
    }
  }, [texture])

  useFrame((state, dt) => {
    const mesh = meshRef.current
    if (!mesh) return

    const progress = progressRef.current
    const center = progress * (total - 1)
    const offset = index - center
    const dist = Math.abs(offset)
    const sign = Math.sign(offset)

    const targetX = offset * PHONE_SPACING
    const targetZ = -Math.min(dist, 4) * 0.55
    const focus = Math.max(0, 1 - dist * 0.85)
    const targetScale = 1 + focus * 0.18
    const targetRotY = -sign * Math.min(dist, 1.4) * 0.32
    const bob = Math.sin(state.clock.elapsedTime * 0.6 + index * 0.7) * 0.04 * (1 - Math.min(dist, 1))
    const targetY = ROW_Y_OFFSET + bob

    const lambda = 6.5
    mesh.position.x = THREE.MathUtils.damp(mesh.position.x, targetX, lambda, dt)
    mesh.position.y = THREE.MathUtils.damp(mesh.position.y, targetY, lambda, dt)
    mesh.position.z = THREE.MathUtils.damp(mesh.position.z, targetZ, lambda, dt)
    mesh.rotation.y = THREE.MathUtils.damp(mesh.rotation.y, targetRotY, lambda, dt)
    const s = THREE.MathUtils.damp(mesh.scale.x, targetScale, lambda, dt)
    mesh.scale.set(s, s, s)

    const mat = mesh.material as THREE.MeshBasicMaterial
    const targetOpacity = Math.max(0.06, 1 - Math.min(dist, 3.5) * 0.24)
    mat.opacity = THREE.MathUtils.damp(mat.opacity, targetOpacity, lambda, dt)
  })

  return (
    <mesh ref={meshRef} position={[index * PHONE_SPACING, ROW_Y_OFFSET, 0]}>
      <planeGeometry args={[PHONE_WIDTH, PHONE_HEIGHT, 1, 1]} />
      <meshBasicMaterial map={texture} transparent depthWrite={false} toneMapped={false} />
    </mesh>
  )
}

function PhoneRow({ progressRef }: { progressRef: RefObject<number> }) {
  return (
    <group>
      {PHONE_PATHS.map((src, index) => (
        <Phone
          key={src}
          src={src}
          index={index}
          total={PHONE_PATHS.length}
          progressRef={progressRef}
        />
      ))}
    </group>
  )
}

export type ProjectsShowcaseProps = {
  progressRef: RefObject<number>
}

export function ProjectsShowcase({ progressRef }: ProjectsShowcaseProps) {
  return (
    <Canvas
      className="h-full w-full"
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 4.6], fov: 36 }}
      gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
      onCreated={({ gl }) => {
        gl.setClearColor("#0B0B0B", 0)
      }}
    >
      <ambientLight intensity={1} />
      <directionalLight position={[2, 3, 4]} intensity={0.6} color="#E8DCC4" />
      <directionalLight position={[-3, -2, 2]} intensity={0.25} color="#736343" />

      <Suspense fallback={null}>
        <PhoneRow progressRef={progressRef} />
      </Suspense>
    </Canvas>
  )
}
