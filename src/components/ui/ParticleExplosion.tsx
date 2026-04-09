"use client";

import { useEffect, useRef } from "react";

const COLORS = [
  "#3b82f6", // blue-500
  "#6366f1", // indigo-500
  "#a855f7", // purple-500
  "#ec4899", // pink-500
  "#f43f5e", // rose-500
];

class Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseVx: number;
  baseVy: number;
  size: number;
  color: string;
  life: number;
  maxLife: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 1.5 + 0.2;
    
    this.baseVx = Math.cos(angle) * speed;
    this.baseVy = Math.sin(angle) * speed;
    
    this.vx = this.baseVx;
    this.vy = this.baseVy;
    
    this.size = Math.random() * 1.5 + 1;
    this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
    this.maxLife = Math.random() * 400 + 100;
    this.life = this.maxLife;
  }

  update(mouseX: number | null, mouseY: number | null) {
    // Mouse Repulsion Logic
    if (mouseX !== null && mouseY !== null) {
      const dx = this.x - mouseX;
      const dy = this.y - mouseY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const repulseRadius = 150;
      
      if (distance < repulseRadius) {
        // Calculate force (stronger closer to the mouse)
        const force = (repulseRadius - distance) / repulseRadius;
        const angle = Math.atan2(dy, dx);
        
        // Add push force
        this.vx += Math.cos(angle) * force * 1.5;
        this.vy += Math.sin(angle) * force * 1.5;
      }
    }
    
    // Friction (gradually return to base velocity)
    this.vx += (this.baseVx - this.vx) * 0.05;
    this.vy += (this.baseVy - this.vy) * 0.05;

    this.x += this.vx;
    this.y += this.vy;
    this.life--;
  }

  draw(ctx: CanvasRenderingContext2D) {
    if (this.life <= 0) return;
    
    ctx.save();
    let alpha = 1;
    if (this.life < 50) alpha = this.life / 50;
    if (this.maxLife - this.life < 50) alpha = (this.maxLife - this.life) / 50;
    
    ctx.globalAlpha = alpha * 0.8;
    ctx.fillStyle = this.color;
    
    ctx.translate(this.x, this.y);
    const rotation = Math.atan2(this.vy, this.vx);
    ctx.rotate(rotation);
    
    const length = this.size * 4 + Math.sqrt(this.vx*this.vx + this.vy*this.vy) * 2;
    
    ctx.beginPath();
    if (ctx.roundRect) {
      ctx.roundRect(-length/2, -this.size/2, length, this.size, this.size);
    } else {
      ctx.arc(-length/2, 0, this.size/2, Math.PI/2, Math.PI*1.5);
      ctx.arc(length/2, 0, this.size/2, -Math.PI/2, Math.PI/2);
      ctx.closePath();
    }
    ctx.fill();
    
    ctx.restore();
  }
}

export default function ParticleExplosion() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // Ref to track mouse position for layout performance without re-renders
  const mousePos = useRef<{ x: number | null, y: number | null }>({ x: null, y: null });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let particles: Particle[] = [];
    const PARTICLE_COUNT = 300;
    let animationFrameId: number;

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      const width = document.documentElement.clientWidth;
      const height = document.documentElement.clientHeight;
      
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      
      ctx.scale(dpr, dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
    };

    const initParticles = () => {
      particles = [];
      const centerX = document.documentElement.clientWidth / 2;
      const centerY = document.documentElement.clientHeight / 2;

      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const p = new Particle(centerX, centerY);
        const advance = Math.random() * p.maxLife;
        for (let j = 0; j < advance; j++) p.update(null, null);
        particles.push(p);
      }
    };

    resizeCanvas();
    initParticles();

    const handleResize = () => {
      resizeCanvas();
      initParticles();
    };
    
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };
    const handleMouseLeave = () => {
      mousePos.current = { x: null, y: null };
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    const animate = () => {
      const width = document.documentElement.clientWidth;
      const height = document.documentElement.clientHeight;
      ctx.clearRect(0, 0, width, height);
      
      const time = Date.now() * 0.0001;
      const centerX = width / 2;
      const centerY = height / 2;
      
      // We apply slow rotation globally to the canvas container for the explosion center drift
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(time);
      ctx.translate(-centerX, -centerY);

      // Track mouse position with reverse rotation (since mouse is screen-relative, but canvas is rotated)
      let relativeMouseX = mousePos.current.x;
      let relativeMouseX_Y = mousePos.current.y;
      
      if (relativeMouseX !== null && relativeMouseX_Y !== null) {
        // Translate mouse to center, rotate back, translate back
        const dx = relativeMouseX - centerX;
        const dy = relativeMouseX_Y - centerY;
        relativeMouseX = centerX + dx * Math.cos(-time) - dy * Math.sin(-time);
        relativeMouseX_Y = centerY + dx * Math.sin(-time) + dy * Math.cos(-time);
      }

      particles.forEach(p => {
        p.update(relativeMouseX, relativeMouseX_Y);
        p.draw(ctx);

        if (p.life <= 0) {
          const newP = new Particle(centerX + (Math.random() - 0.5) * 50, centerY + (Math.random() - 0.5) * 50);
          Object.assign(p, newP);
        }
      });
      
      ctx.restore();

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none -z-[10] bg-transparent mix-blend-screen"
    />
  );
}
