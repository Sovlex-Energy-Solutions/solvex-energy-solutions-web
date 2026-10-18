"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"

export interface WebGLShaderProps {
  className?: string
  /**
   * Color theme:
   * - "mosa-monochrome": Pure white & silver ethereal light wave (Mosa AI dark design)
   * - "solar-emerald": Emerald green & golden energy
   * - "solar-amber": Radiant golden sunlight
   * - "classic-rgb": Original chromatic aberration
   */
  variant?: "mosa-monochrome" | "solar-emerald" | "solar-amber" | "classic-rgb"
  speed?: number
  opacity?: number
  transparent?: boolean
  yOffset?: number
}

export function WebGLShader({
  className = "absolute inset-0 w-full h-full block pointer-events-none",
  variant = "solar-emerald",
  speed = 0.008,
  opacity = 0.85,
  transparent = true,
  yOffset: customYOffset,
}: WebGLShaderProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const sceneRef = useRef<{
    scene: THREE.Scene | null
    camera: THREE.OrthographicCamera | null
    renderer: THREE.WebGLRenderer | null
    mesh: THREE.Mesh | null
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    uniforms: any
    animationId: number | null
  }>({
    scene: null,
    camera: null,
    renderer: null,
    mesh: null,
    uniforms: null,
    animationId: null,
  })

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const { current: refs } = sceneRef

    const vertexShader = `
      attribute vec3 position;
      void main() {
        gl_Position = vec4(position, 1.0);
      }
    `

    // Brand-tailored fragment shaders with yOffset and secondary wave
    const fragmentShader = `
      precision highp float;
      uniform vec2 resolution;
      uniform float time;
      uniform float xScale;
      uniform float yScale;
      uniform float distortion;
      uniform float yOffset;
      uniform int colorMode; // 0 = solar-emerald, 1 = solar-amber, 2 = classic-rgb, 3 = mosa-monochrome
      uniform float uOpacity;

      void main() {
        vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
        
        float d = length(p) * distortion;
        
        float rx = p.x * (1.0 + d);
        float gx = p.x;
        float bx = p.x * (1.0 - d);

        // Primary wave with responsive yOffset
        float rWave1 = 0.045 / abs((p.y - yOffset) + sin((rx + time) * xScale) * yScale);
        float gWave1 = 0.045 / abs((p.y - yOffset) + sin((gx + time) * xScale) * yScale);
        float bWave1 = 0.045 / abs((p.y - yOffset) + sin((bx + time) * xScale) * yScale);

        // Secondary harmonic wave to provide rich vertical illumination
        float yOffset2 = (abs(yOffset) > 0.15) ? (-yOffset * 0.5) : 0.0;
        float rWave2 = 0.022 / abs((p.y - yOffset2) + cos((rx * 0.85 - time * 0.75) * xScale) * (yScale * 0.8));
        float gWave2 = 0.022 / abs((p.y - yOffset2) + cos((gx * 0.85 - time * 0.75) * xScale) * (yScale * 0.8));
        float bWave2 = 0.022 / abs((p.y - yOffset2) + cos((bx * 0.85 - time * 0.75) * xScale) * (yScale * 0.8));

        float rWave = rWave1 + rWave2;
        float gWave = gWave1 + gWave2;
        float bWave = bWave1 + bWave2;
        
        vec3 finalColor;

        if (colorMode == 3) {
          // Mosa AI Monochromatic atmospheric white & silver refraction
          vec3 pureWhite = vec3(1.0, 1.0, 1.0);
          vec3 silver    = vec3(0.85, 0.88, 0.95);
          float combined = (rWave * 0.35 + gWave * 0.40 + bWave * 0.35);
          finalColor = mix(silver, pureWhite, 0.5) * combined;
        } else if (colorMode == 0) {
          // Vibrant Clean-Energy Primary #4edea3 Emerald Wave (Non-greyscale, rich green glow)
          vec3 primaryMint  = vec3(0.306, 0.871, 0.639); // #4edea3
          vec3 brightGlow   = vec3(0.250, 0.960, 0.680); // Luminous electric mint
          vec3 deepEmerald  = vec3(0.080, 0.680, 0.450); // Deep forest emerald

          finalColor = (rWave * primaryMint * 0.85) + (gWave * brightGlow * 1.15) + (bWave * deepEmerald * 0.75);
        } else if (colorMode == 1) {
          // Solar Golden Sunlight Wave
          vec3 amber  = vec3(0.95, 0.60, 0.08);
          vec3 orange = vec3(0.92, 0.40, 0.04);
          vec3 yellow = vec3(0.98, 0.82, 0.20);

          finalColor = (rWave * amber) + (gWave * orange) + (bWave * yellow);
        } else {
          // Classic RGB Chromatic
          finalColor = vec3(rWave, gWave, bWave);
        }

        float brightness = max(max(finalColor.r, finalColor.g), finalColor.b);
        float alpha = clamp(brightness * 1.5 * uOpacity, 0.0, 1.0);

        gl_FragColor = vec4(finalColor, alpha);
      }
    `

    const colorModeValue =
      variant === "mosa-monochrome" ? 3 : variant === "solar-emerald" ? 0 : variant === "solar-amber" ? 1 : 2

    const initScene = () => {
      refs.scene = new THREE.Scene()
      refs.renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: transparent,
        antialias: true,
        powerPreference: "high-performance",
      })
      refs.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

      if (transparent) {
        refs.renderer.setClearColor(0x000000, 0.0)
      } else {
        refs.renderer.setClearColor(new THREE.Color(0x000000), 1.0)
      }

      refs.camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, -1)

      const parent = canvas.parentElement
      const initialWidth = parent?.clientWidth || window.innerWidth
      const initialHeight = parent?.clientHeight || window.innerHeight

      refs.uniforms = {
        resolution: { value: [initialWidth, initialHeight] },
        time: { value: 0.0 },
        xScale: { value: 1.1 },
        yScale: { value: 0.45 },
        distortion: { value: 0.04 },
        yOffset: { value: 0.0 },
        colorMode: { value: colorModeValue },
        uOpacity: { value: opacity },
      }

      const position = [
        -1.0, -1.0, 0.0,
         1.0, -1.0, 0.0,
        -1.0,  1.0, 0.0,
         1.0, -1.0, 0.0,
        -1.0,  1.0, 0.0,
         1.0,  1.0, 0.0,
      ]

      const positions = new THREE.BufferAttribute(new Float32Array(position), 3)
      const geometry = new THREE.BufferGeometry()
      geometry.setAttribute("position", positions)

      const material = new THREE.RawShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms: refs.uniforms,
        side: THREE.DoubleSide,
        transparent: true,
      })

      refs.mesh = new THREE.Mesh(geometry, material)
      refs.scene.add(refs.mesh)

      handleResize()
    }

    const animate = () => {
      if (refs.uniforms) refs.uniforms.time.value += speed
      if (refs.renderer && refs.scene && refs.camera) {
        refs.renderer.render(refs.scene, refs.camera)
      }
      refs.animationId = requestAnimationFrame(animate)
    }

    const handleResize = () => {
      if (!refs.renderer || !refs.uniforms || !canvasRef.current) return
      const parent = canvasRef.current.parentElement
      const width = parent?.clientWidth || window.innerWidth
      const height = parent?.clientHeight || window.innerHeight
      refs.renderer.setSize(width, height, false)
      refs.uniforms.resolution.value = [width, height]

      if (customYOffset !== undefined) {
        refs.uniforms.yOffset.value = customYOffset
      } else if (width < 1024) {
        // On mobile/portrait layouts, content stacks vertically with text in top ~30-40%.
        // Align wave center to ~280-320px from top of hero canvas so it illuminates behind typography
        const targetTopFromCanvas = Math.min(300, height * 0.32)
        const targetGlY = height - targetTopFromCanvas
        const yOffsetValue = (targetGlY * 2.0 - height) / Math.min(width, height)
        refs.uniforms.yOffset.value = yOffsetValue
        refs.uniforms.yScale.value = 0.55
        refs.uniforms.xScale.value = 1.25
      } else {
        refs.uniforms.yOffset.value = 0.0
        refs.uniforms.yScale.value = 0.45
        refs.uniforms.xScale.value = 1.1
      }
    }

    initScene()
    animate()

    let resizeObserver: ResizeObserver | null = null
    if (canvas.parentElement) {
      resizeObserver = new ResizeObserver(() => handleResize())
      resizeObserver.observe(canvas.parentElement)
    }
    window.addEventListener("resize", handleResize)

    return () => {
      if (refs.animationId) cancelAnimationFrame(refs.animationId)
      window.removeEventListener("resize", handleResize)
      if (resizeObserver) resizeObserver.disconnect()
      if (refs.mesh) {
        refs.scene?.remove(refs.mesh)
        refs.mesh.geometry.dispose()
        if (refs.mesh.material instanceof THREE.Material) {
          refs.mesh.material.dispose()
        }
      }
      refs.renderer?.dispose()
    }
  }, [variant, speed, opacity, transparent, customYOffset])

  return (
    <canvas
      ref={canvasRef}
      className={className}
      aria-hidden="true"
    />
  )
}
