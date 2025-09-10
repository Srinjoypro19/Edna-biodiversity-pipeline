"use client"

import { useEffect, useRef } from "react"

export function OceanBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Ocean wave animation
    let animationId: number
    let time = 0

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Create gradient background
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
      gradient.addColorStop(0, "rgba(8, 145, 178, 0.1)")
      gradient.addColorStop(0.5, "rgba(8, 145, 178, 0.05)")
      gradient.addColorStop(1, "rgba(139, 92, 246, 0.1)")

      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw animated waves
      ctx.strokeStyle = "rgba(8, 145, 178, 0.2)"
      ctx.lineWidth = 2

      for (let i = 0; i < 3; i++) {
        ctx.beginPath()
        const amplitude = 50 + i * 20
        const frequency = 0.01 + i * 0.005
        const phase = time * 0.002 + (i * Math.PI) / 3

        for (let x = 0; x <= canvas.width; x += 5) {
          const y =
            canvas.height * 0.3 +
            Math.sin(x * frequency + phase) * amplitude +
            Math.sin(x * frequency * 2 + phase * 1.5) * amplitude * 0.5

          if (x === 0) {
            ctx.moveTo(x, y)
          } else {
            ctx.lineTo(x, y)
          }
        }
        ctx.stroke()
      }

      // Draw floating particles
      ctx.fillStyle = "rgba(8, 145, 178, 0.3)"
      for (let i = 0; i < 20; i++) {
        const x = (time * 0.5 + i * 100) % (canvas.width + 50)
        const y = 100 + Math.sin(time * 0.003 + i) * 200
        const size = 2 + Math.sin(time * 0.002 + i) * 2

        ctx.beginPath()
        ctx.arc(x, y, size, 0, Math.PI * 2)
        ctx.fill()
      }

      time += 16
      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationId)
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" style={{ zIndex: 0 }} />
}
