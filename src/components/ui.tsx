import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

export function GlassCard({ children, className='', hover=true, ...props }: any){
  return (
    <div className={`group relative rounded-[22px] border border-white/[0.08] bg-white/[0.04] backdrop-blur-[22px] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08),0_20px_80px_-20px_rgba(0,0,0,0.6)] ${hover?'hover:bg-white/[0.06] hover:border-white/[0.12] transition-all duration-500':''} ${className}`} {...props}>
      <div className="pointer-events-none absolute inset-0 rounded-[22px] opacity-0 group-hover:opacity-100 transition-opacity duration-700" style={{background:'radial-gradient(600px circle at var(--mx,50%) var(--my,50%), rgba(0,229,255,0.08), transparent 40%)'}} />
      {children}
    </div>
  )
}

export function MagneticButton({ children, className='', ...props }: any){
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0); const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 300, damping: 20 });
  const sy = useSpring(y, { stiffness: 300, damping: 20 });
  return (
    <motion.button
      ref={ref}
      style={{ x: sx, y: sy }}
      onMouseMove={(e)=>{
        const r = ref.current?.getBoundingClientRect();
        if(!r) return;
        x.set((e.clientX - (r.left + r.width/2))*0.18);
        y.set((e.clientY - (r.top + r.height/2))*0.35);
      }}
      onMouseLeave={()=>{ x.set(0); y.set(0); }}
      className={`relative inline-flex items-center justify-center rounded-full font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 ${className}`}
      {...props}
    >{children}</motion.button>
  )
}

export function TiltCard({ children, className='', ...props }: any){
  const ref = useRef<HTMLDivElement>(null);
  const rx = useMotionValue(0); const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 200, damping: 18 });
  const sry = useSpring(ry, { stiffness: 200, damping: 18 });
  return (
    <motion.div
      ref={ref}
      style={{ rotateX: srx, rotateY: sry, transformStyle:'preserve-3d' }}
      onMouseMove={(e)=>{
        const r = ref.current?.getBoundingClientRect();
        if(!r) return;
        const px = (e.clientX - r.left)/r.width - 0.5;
        const py = (e.clientY - r.top)/r.height - 0.5;
        ry.set(px*8); rx.set(-py*8);
        ref.current?.style.setProperty('--mx', `${((px+0.5)*100).toFixed(1)}%`);
        ref.current?.style.setProperty('--my', `${((py+0.5)*100).toFixed(1)}%`);
      }}
      onMouseLeave={()=>{ rx.set(0); ry.set(0); }}
      className={`${className}`}
      {...props}
    >{children}</motion.div>
  )
}

export function Section({ id, kicker, title, desc, children, className='' }: any){
  return (
    <section id={id} className={`relative py-[88px] md:py-[132px] ${className}`}>
      <div className="mx-auto max-w-[1280px] px-6 md:px-8">
        {(kicker||title) && (
          <div className="max-w-[760px] mb-12 md:mb-16">
            {kicker && <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 text-[11px] tracking-[0.18em] uppercase text-white/60 mb-6"><span className="h-1.5 w-1.5 rounded-full bg-[#C6FF00] shadow-[0_0_12px_#C6FF00]"/>{kicker}</div>}
            {title && <h2 className="text-[32px] md:text-[48px] leading-[0.95] tracking-[-0.02em] font-[700] text-white">{title}</h2>}
            {desc && <p className="mt-5 text-[16px] md:text-[17px] leading-[1.7] text-white/60">{desc}</p>}
          </div>
        )}
        {children}
      </div>
    </section>
  )
}

export function Pill({ children, active=false }: any){
  return <span className={`inline-flex items-center rounded-full border px-3 py-1 text-[12px] tracking-wide ${active?'border-cyan-300/30 bg-cyan-300/10 text-cyan-200':'border-white/10 bg-white/[0.03] text-white/60'}`}>{children}</span>
}
