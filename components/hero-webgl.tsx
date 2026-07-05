"use client"

import { Canvas, extend, useFrame } from "@react-three/fiber"
import { useAspect, useTexture } from "@react-three/drei"
import { useMemo, useRef, useState, useEffect } from "react"
import * as THREE from "three"

const TEXTUREMAP = { src: "https://i.postimg.cc/XYwvXN8D/img-4.png" }
const DEPTHMAP = { src: "https://i.postimg.cc/2SHKQh2q/raw-4.webp" }

extend(THREE as any)

const WIDTH = 300
const HEIGHT = 300

const Scene = () => {
  const [rawMap, depthMap] = useTexture([TEXTUREMAP.src, DEPTHMAP.src])
  const meshRef = useRef<THREE.Mesh>(null)

  const material = useMemo(() => {
    const vertexShader = `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `

    const fragmentShader = `
      uniform sampler2D uTexture;
      uniform sampler2D uDepthMap;
      uniform vec2 uPointer;
      uniform float uProgress;
      uniform float uTime;
      varying vec2 vUv;

      // Simple noise function
      float random(vec2 st) {
        return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
      }

      float noise(vec2 st) {
        vec2 i = floor(st);
        vec2 f = fract(st);
        float a = random(i);
        float b = random(i + vec2(1.0, 0.0));
        float c = random(i + vec2(0.0, 1.0));
        float d = random(i + vec2(1.0, 1.0));
        vec2 u = f * f * (3.0 - 2.0 * f);
        return mix(a, b, u.x) + (c - a)* u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
      }

      void main() {
        vec2 uv = vUv;
        
        // Depth-based displacement
        float depth = texture2D(uDepthMap, uv).r;
        vec2 displacement = depth * uPointer * 0.01;
        vec2 distortedUv = uv + displacement;
        
        // Base texture
        vec4 baseColor = texture2D(uTexture, distortedUv);
        
        // Create scanning effect
        float aspect = ${WIDTH}.0 / ${HEIGHT}.0;
        vec2 tUv = vec2(uv.x * aspect, uv.y);
        vec2 tiling = vec2(120.0);
        vec2 tiledUv = mod(tUv * tiling, 2.0) - 1.0;
        
        float brightness = noise(tUv * tiling * 0.5);
        float dist = length(tiledUv);
        float dot = smoothstep(0.5, 0.49, dist) * brightness;
        
        // Flow effect based on progress
        float flow = 1.0 - smoothstep(0.0, 0.02, abs(depth - uProgress));
        
        // Red scanning overlay
        vec3 mask = vec3(dot * flow * 10.0, 0.0, 0.0);
        
        // Combine effects
        vec3 final = baseColor.rgb + mask;
        
        gl_FragColor = vec4(final, 1.0);
      }
    `

    return new THREE.ShaderMaterial({
      uniforms: {
        uTexture: { value: rawMap },
        uDepthMap: { value: depthMap },
        uPointer: { value: new THREE.Vector2(0, 0) },
        uProgress: { value: 0 },
        uTime: { value: 0 },
      },
      vertexShader,
      fragmentShader,
    })
  }, [rawMap, depthMap])

  const [w, h] = useAspect(WIDTH, HEIGHT)

  useFrame(({ clock, pointer }) => {
    if (material.uniforms) {
      material.uniforms.uProgress.value = Math.sin(clock.getElapsedTime() * 0.5) * 0.5 + 0.5
      material.uniforms.uPointer.value = pointer
      material.uniforms.uTime.value = clock.getElapsedTime()
    }
  })

  const scaleFactor = 0.3
  return (
    <mesh ref={meshRef} scale={[w * scaleFactor, h * scaleFactor, 1]} material={material}>
      <planeGeometry />
    </mesh>
  )
}

export const Hero3DWebGL = () => {
  const titleWords = "VERCEL".split(" ")
  const [visibleWords, setVisibleWords] = useState(0)
  const [subtitleVisible, setSubtitleVisible] = useState(false)
  const [delays, setDelays] = useState<number[]>([])
  const [subtitleDelay, setSubtitleDelay] = useState(0)

  useEffect(() => {
    setDelays(titleWords.map(() => Math.random() * 0.07))
    setSubtitleDelay(Math.random() * 0.1)
  }, [titleWords.length])

  useEffect(() => {
    if (visibleWords < titleWords.length) {
      const timeout = setTimeout(() => setVisibleWords(visibleWords + 1), 600)
      return () => clearTimeout(timeout)
    } else {
      const timeout = setTimeout(() => setSubtitleVisible(true), 800)
      return () => clearTimeout(timeout)
    }
  }, [visibleWords, titleWords.length])

  return (
    <div className="h-svh bg-white relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none z-10">
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent" />
        <div className="absolute top-0 bottom-0 left-0 w-32 bg-gradient-to-r from-black to-transparent" />
        <div className="absolute top-0 bottom-0 right-0 w-32 bg-gradient-to-l from-black to-transparent" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 55% at 50% 45%, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.45) 45%, transparent 75%)",
          }}
        />
      </div>

      <div className="h-svh uppercase items-center w-full absolute z-60 pointer-events-none px-4 sm:px-6 flex justify-start pt-[16vh] md:justify-center md:pt-0 flex-col">
        <div
          className={`mb-3 md:mb-6 ${subtitleVisible ? "fade-in-subtitle" : ""}`}
          style={{ opacity: visibleWords > 0 ? undefined : 0 }}
        >
          <span className="inline-block animate-pulse rounded-full border border-red-500/60 bg-red-500/10 px-4 py-1.5 text-[10px] md:text-sm font-bold tracking-[0.25em] text-red-400 font-space-mono">
            ENEM 2026
          </span>
        </div>
        <h1 className="text-[2.25rem] sm:text-5xl md:text-6xl xl:text-7xl 2xl:text-8xl font-extrabold font-orbitron text-center leading-[0.95] w-full">
          <div className="flex flex-wrap gap-x-3 lg:gap-x-6 justify-center">
            {titleWords.map((word, index) => (
              <div
                key={index}
                className={index < visibleWords ? "fade-in" : ""}
                style={{
                  animationDelay: `${index * 0.13 + (delays[index] || 0)}s`,
                  opacity: index < visibleWords ? undefined : 0,
                  textShadow:
                    index === 1
                      ? "0 0 30px rgba(239,68,68,0.9), 0 4px 20px rgba(0,0,0,0.95), 0 2px 8px rgba(0,0,0,0.95)"
                      : "0 4px 20px rgba(0,0,0,0.95), 0 2px 8px rgba(0,0,0,0.95), 0 0 24px rgba(255,255,255,0.2)",
                }}
              >
                <span className={index === 1 ? "text-red-500" : "text-black"}>{word}</span>
              </div>
            ))}
          </div>
        </h1>
        <div
          className={subtitleVisible ? "fade-in-subtitle" : ""}
          style={{
            animationDelay: `${titleWords.length * 0.13 + 0.15 + subtitleDelay}s`,
            opacity: subtitleVisible ? undefined : 0,
          }}
        >
          <h2
            className="text-sm md:text-2xl xl:text-3xl 2xl:text-4xl mt-3 md:mt-4 text-black font-bold max-w-4xl mx-auto text-center px-2 normal-case"
            style={{ textShadow: "0 2px 20px rgba(0,0,0,0.15), 0 1px 6px rgba(0,0,0,0.1)" }}
          >
            O segredo do ENEM: identifique a <span className="text-red-500">resposta certa</span> em segundos.
          </h2>
        </div>

        <div
          className={`mt-auto mb-[8vh] md:mt-8 md:mb-0 flex flex-col items-center gap-4 ${
            subtitleVisible ? "fade-in-subtitle" : ""
          }`}
          style={{
            animationDelay: `${titleWords.length * 0.13 + 0.4 + subtitleDelay}s`,
            opacity: subtitleVisible ? undefined : 0,
          }}
        >
          <p
            className="max-w-md text-center text-xs md:text-base font-semibold text-gray-700 normal-case px-2"
            style={{ textShadow: "0 2px 20px rgba(0,0,0,1), 0 1px 6px rgba(0,0,0,1)" }}
          >
            Seja aprovado no ENEM, estudando menos de 30 dias com Inteligência Artificial e com ajuda de 7 professores
          </p>
          <a
            href="#pricing"
            className="pointer-events-auto inline-flex flex-col items-center rounded-xl bg-red-500 px-8 py-3.5 text-center font-orbitron text-sm md:text-base font-bold leading-tight text-white shadow-[0_0_30px_rgba(239,68,68,0.5)] transition-all duration-300 hover:scale-105 hover:bg-red-600"
          >
            <span>QUERO PASSAR NO</span>
            <span className="normal-case">👇ENEM 2026👇</span>
          </a>
        </div>
      </div>

      <Canvas
        flat
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: "high-performance",
        }}
        camera={{ position: [0, 0, 1] }}
        style={{ background: "#ffffff" }}
      >
        <Scene />
      </Canvas>
    </div>
  )
}

export default Hero3DWebGL
