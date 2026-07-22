/*
 * Akashic EIS — Top-to-Bottom Sky Atmosphere & Starfield Canvas
 * Inspired by Keytail.ai's atmospheric sky backdrop:
 * Deep blue-black sky base (#070A1C / #0A0E24), subtle twinkling star particles,
 * and ambient radial sky glows.
 */

"use client";

import { useEffect, useRef } from "react";

export default function EisSkyBackground({ children }: { children: React.ReactNode }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    // Star particles
    const starCount = Math.floor((width * height) / 12000);
    const stars: Array<{
      x: number;
      y: number;
      radius: number;
      alpha: number;
      baseAlpha: number;
      twinkleSpeed: number;
    }> = [];

    for (let i = 0; i < starCount; i++) {
      const baseAlpha = 0.2 + Math.random() * 0.65;
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: 0.6 + Math.random() * 1.4,
        alpha: baseAlpha,
        baseAlpha,
        twinkleSpeed: 0.005 + Math.random() * 0.015,
      });
    }

    let time = 0;
    const render = () => {
      time += 0.02;
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];
        star.alpha = star.baseAlpha + Math.sin(time * star.twinkleSpeed * 50 + i) * 0.25;
        const currentAlpha = Math.max(0.1, Math.min(0.9, star.alpha));

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(195, 215, 255, ${currentAlpha})`;
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-[#070A1C] text-white overflow-hidden">
      {/* Dynamic Starfield Canvas */}
      <canvas
        ref={canvasRef}
        className="pointer-events-none fixed inset-0 z-0 opacity-80"
        aria-hidden
      />

      {/* Ambient Top-to-Bottom Sky Radial Glows */}
      <div
        className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(120%_60%_at_50%_0%,rgba(62,99,221,0.22)_0%,rgba(138,120,255,0.10)_45%,transparent_80%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(100%_80%_at_50%_100%,rgba(10,14,36,0.8)_0%,transparent_100%)]"
        aria-hidden
      />
      <div className="dot-grid-dark pointer-events-none fixed inset-0 z-0 opacity-[0.12]" aria-hidden />

      {/* Content wrapper */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
