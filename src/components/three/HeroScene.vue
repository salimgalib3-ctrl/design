<script setup>
import { onMounted, onBeforeUnmount, ref } from 'vue'
import * as THREE from 'three'

const canvasEl = ref(null)
const supported = ref(true)

let renderer, scene, camera, raf
let bottle, cap, ring, particles
const pointer = { x: 0, y: 0, tx: 0, ty: 0 }
let disposed = false

const reducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

function makeBottle() {
  const group = new THREE.Group()

  // Lathe a refined perfume-bottle silhouette.
  const profile = [
    [0.0, -1.5],
    [0.72, -1.5],
    [0.78, -1.35],
    [0.78, 0.35],
    [0.6, 0.72],
    [0.34, 0.95],
    [0.32, 1.2],
    [0.3, 1.28],
  ].map((p) => new THREE.Vector2(p[0], p[1]))
  const points = new THREE.CatmullRomCurve3(
    profile.map((p) => new THREE.Vector3(p.x, p.y, 0)),
  ).getPoints(60).map((p) => new THREE.Vector2(p.x, p.y))

  const glassGeo = new THREE.LatheGeometry(points, 96)
  const glassMat = new THREE.MeshPhysicalMaterial({
    color: 0x0f0f12,
    metalness: 0,
    roughness: 0.06,
    transmission: 0.92,
    thickness: 1.4,
    ior: 1.5,
    clearcoat: 1,
    clearcoatRoughness: 0.08,
    attenuationColor: new THREE.Color(0xc9a86a),
    attenuationDistance: 2.4,
    envMapIntensity: 1.4,
  })
  bottle = new THREE.Mesh(glassGeo, glassMat)
  group.add(bottle)

  // Gold cap.
  const capGeo = new THREE.CylinderGeometry(0.34, 0.36, 0.5, 64)
  const goldMat = new THREE.MeshStandardMaterial({
    color: 0xc9a86a,
    metalness: 1,
    roughness: 0.22,
    envMapIntensity: 1.5,
  })
  cap = new THREE.Mesh(capGeo, goldMat)
  cap.position.y = 1.5
  group.add(cap)

  // Floating gold accent ring.
  const ringGeo = new THREE.TorusGeometry(1.6, 0.012, 16, 160)
  ring = new THREE.Mesh(ringGeo, new THREE.MeshStandardMaterial({
    color: 0xe7cf9a, metalness: 1, roughness: 0.3,
  }))
  ring.rotation.x = Math.PI / 2.1
  group.add(ring)

  group.position.y = -0.15
  return group
}

function makeParticles() {
  const count = 90
  const geo = new THREE.BufferGeometry()
  const pos = new Float32Array(count * 3)
  for (let i = 0; i < count; i++) {
    pos[i * 3] = (Math.random() - 0.5) * 9
    pos[i * 3 + 1] = (Math.random() - 0.5) * 9
    pos[i * 3 + 2] = (Math.random() - 0.5) * 6 - 2
  }
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
  const mat = new THREE.PointsMaterial({
    color: 0xc9a86a,
    size: 0.028,
    transparent: true,
    opacity: 0.6,
  })
  return new THREE.Points(geo, mat)
}

function buildEnv() {
  // Studio-ish environment from a gradient so glass has something to refract.
  const pmrem = new THREE.PMREMGenerator(renderer)
  const envScene = new THREE.Scene()
  const grad = new THREE.Mesh(
    new THREE.SphereGeometry(12, 32, 32),
    new THREE.MeshBasicMaterial({ color: 0x1a1712, side: THREE.BackSide }),
  )
  envScene.add(grad)
  const key = new THREE.Mesh(
    new THREE.PlaneGeometry(8, 8),
    new THREE.MeshBasicMaterial({ color: 0xe7cf9a }),
  )
  key.position.set(4, 5, 4)
  key.lookAt(0, 0, 0)
  envScene.add(key)
  const rim = new THREE.Mesh(
    new THREE.PlaneGeometry(6, 10),
    new THREE.MeshBasicMaterial({ color: 0xffffff }),
  )
  rim.position.set(-5, 0, -3)
  rim.lookAt(0, 0, 0)
  envScene.add(rim)
  const tex = pmrem.fromScene(envScene, 0.04).texture
  pmrem.dispose()
  return tex
}

function init() {
  try {
    renderer = new THREE.WebGLRenderer({
      canvas: canvasEl.value,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    })
  } catch (e) {
    supported.value = false
    return
  }
  const parent = canvasEl.value.parentElement
  const w = parent.clientWidth
  const h = parent.clientHeight
  renderer.setSize(w, h)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  renderer.toneMappingExposure = 1.15

  scene = new THREE.Scene()
  camera = new THREE.PerspectiveCamera(38, w / h, 0.1, 100)
  camera.position.set(0, 0.2, 6.4)

  const env = buildEnv()
  scene.environment = env

  scene.add(new THREE.AmbientLight(0xffffff, 0.25))
  const key = new THREE.DirectionalLight(0xffe9c2, 2.2)
  key.position.set(4, 6, 5)
  scene.add(key)
  const rim = new THREE.DirectionalLight(0xc9a86a, 1.6)
  rim.position.set(-5, 2, -4)
  scene.add(rim)

  bottle = makeBottle()
  scene.add(bottle)
  particles = makeParticles()
  scene.add(particles)

  window.addEventListener('resize', onResize)
  window.addEventListener('pointermove', onPointer)
  animate()
}

function onResize() {
  if (!renderer) return
  const parent = canvasEl.value.parentElement
  const w = parent.clientWidth
  const h = parent.clientHeight
  camera.aspect = w / h
  camera.updateProjectionMatrix()
  renderer.setSize(w, h)
}

function onPointer(e) {
  pointer.tx = (e.clientX / window.innerWidth - 0.5) * 2
  pointer.ty = (e.clientY / window.innerHeight - 0.5) * 2
}

function animate() {
  raf = requestAnimationFrame(animate)
  const t = performance.now() * 0.001
  const still = reducedMotion()

  pointer.x += (pointer.tx - pointer.x) * 0.05
  pointer.y += (pointer.ty - pointer.y) * 0.05

  if (bottle) {
    bottle.rotation.y = still ? 0.4 : t * 0.32 + pointer.x * 0.35
    bottle.position.y = still ? -0.15 : -0.15 + Math.sin(t * 0.9) * 0.09
    bottle.rotation.x = still ? 0 : pointer.y * 0.12
    if (ring) ring.rotation.z = t * 0.15
  }
  if (particles && !still) {
    particles.rotation.y = t * 0.02
    particles.rotation.x = pointer.y * 0.08
  }
  renderer.render(scene, camera)
}

function cleanup() {
  disposed = true
  cancelAnimationFrame(raf)
  window.removeEventListener('resize', onResize)
  window.removeEventListener('pointermove', onPointer)
  scene?.traverse((obj) => {
    if (obj.geometry) obj.geometry.dispose()
    if (obj.material) {
      const mats = Array.isArray(obj.material) ? obj.material : [obj.material]
      mats.forEach((m) => m.dispose())
    }
  })
  renderer?.dispose()
}

onMounted(() => {
  // Guard against SSR / no WebGL.
  if (!window.WebGLRenderingContext) {
    supported.value = false
    return
  }
  init()
})

onBeforeUnmount(cleanup)
</script>

<template>
  <div class="relative h-full w-full">
    <canvas ref="canvasEl" class="block h-full w-full" aria-hidden="true" />
    <!-- Elegant static fallback if WebGL is unavailable -->
    <div
      v-if="!supported"
      class="absolute inset-0 flex items-center justify-center"
    >
      <div
        class="h-72 w-40 rounded-[3rem] border border-champagne/30 bg-gradient-to-b from-champagne/10 to-transparent backdrop-blur-sm"
      >
        <div class="mx-auto mt-[-1rem] h-10 w-16 rounded-b-lg rounded-t-sm bg-champagne/80" />
      </div>
    </div>
    <!-- Soft glow bed -->
    <div
      class="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[60%] w-[60%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-champagne/15 blur-[90px]"
    />
  </div>
</template>
