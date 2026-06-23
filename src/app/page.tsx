"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll } from "framer-motion";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const ParallaxSection = ({ 
  children, 
  className = "", 
  y = [0, 100], 
  opacity = [1, 0], 
  scale = 1,
  direction = "up"
}: { 
  children: React.ReactNode; 
  className?: string; 
  y?: [number, number]; 
  opacity?: [number, number]; 
  scale?: number; 
  direction?: "up" | "down"; 
}) => {
  const ref = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!ref.current) return;
    
    const yOffset = direction === "up" ? y[1] : y[0];
    
    gsap.fromTo(
      ref.current,
      { 
        y: yOffset, 
        opacity: opacity[0], 
        scale: scale 
      },
      {
        y: y[0],
        opacity: opacity[1],
        scale: scale,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 80%",
          end: "bottom 20%",
          scrub: 1,
        }
      }
    );
  }, [y, opacity, scale, direction]);
  
  return (
    <div ref={ref} className={className} style={{ willChange: "transform, opacity" }}>
      {children}
    </div>
  );
};

const CinematicSection = ({ 
  imageSrc, 
  alt, 
  title, 
  description,
  overlayColor = "from-amber-900/30",
  textPosition = "center",
  textAlign = "center",
  className = ""
}: { 
  imageSrc: string; 
  alt: string; 
  title: string; 
  description: string;
  overlayColor?: string;
  textPosition?: "top" | "center" | "bottom";
  textAlign?: "left" | "center" | "right";
  className?: string;
}) => {
  return (
    <section className={`relative w-full h-screen overflow-hidden ${className}`}>
      <div className="absolute inset-0 z-0">
        <Image
          src={imageSrc}
          alt={alt}
          fill
          className="object-cover object-center transition-transform duration-700 hover:scale-105"
          priority
        />
        <div className={`absolute inset-0 bg-gradient-to-b ${overlayColor} to-transparent`} />
      </div>
      
      <div className={`relative z-10 flex flex-col h-full justify-${textPosition} px-6 md:px-16 lg:px-24`}> 
        <div className={`max-w-3xl ${textAlign === "center" ? "mx-auto" : textAlign === "left" ? "mr-auto" : "ml-auto"}`}> 
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl font-serif font-light text-white mb-6 drop-shadow-lg"
          >
            {title}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            viewport={{ once: true }}
            className="text-lg md:text-xl text-white/90 leading-relaxed font-light drop-shadow-md"
          >
            {description}
          </motion.p>
        </div>
      </div>
    </section>
  );
};

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  useScroll();
  
  return (
    <main ref={containerRef} className="relative w-full overflow-x-hidden bg-[#1a0f0a]">
      <div className="absolute inset-0 bg-gradient-to-b from-[#1a0f0a] via-[#2d1e14] to-[#1a0f0a] z-0" />
      
      <div style={{ willChange: "opacity" }}>
        <ParallaxSection
          y={[0, -50]}
          opacity={[1, 0.8]}
          scale={1.1}
          direction="up"
          className="relative w-full h-screen"
        >
          <CinematicSection
            imageSrc="https://images.unsplash.com/photo-1541518763875-0cfymm2w7e2c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80"
            alt="Luxury cafe exterior at dusk"
            title="Welcome to Happy Cup"
            description="Where every moment becomes a memory worth savoring"
            overlayColor="from-[#2d1e14]/60 via-transparent to-[#1a0f0a]/80"
            textAlign="center"
          />
        </ParallaxSection>
        
        <ParallaxSection
          y={[0, -30]}
          opacity={[1, 0.9]}
          scale={1.05}
          direction="up"
          className="relative w-full h-screen"
        >
          <CinematicSection
            imageSrc="https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
            alt="Luxury cafe street view approaching entrance"
            title="Step Inside"
            description="As you walk toward the golden doors, anticipation builds in the warm evening air"
            overlayColor="from-[#1a0f0a]/70 via-transparent to-[#2d1e14]/90"
            textAlign="center"
          />
        </ParallaxSection>
        
        <ParallaxSection
          y={[0, -20]}
          opacity={[1, 0.95]}
          scale={1.02}
          direction="up"
          className="relative w-full h-screen"
        >
          <CinematicSection
            imageSrc="https://images.unsplash.com/photo-1559647199-4666e9f89f4b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80"
            alt="Luxury cafe entrance with golden doors"
            title="The Invitation"
            description="Elegant doors open, inviting you into a world of sophistication and comfort"
            overlayColor="from-[#2d1e14]/80 via-transparent to-[#1a0f0a]/95"
            textAlign="center"
          />
        </ParallaxSection>
        
        <ParallaxSection
          y={[0, 0]}
          opacity={[0.5, 1]}
          scale={1}
          direction="up"
          className="relative w-full h-screen"
        >
          <CinematicSection
            imageSrc="https://images.unsplash.com/photo-1517248135467-4c7edcad8756?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
            alt="Luxury cafe interior reveal"
            title="Your sanctuary awaits"
            description="Discover refined ambiance where every detail is crafted for your comfort"
            overlayColor="from-[#1a0f0a]/90 to-transparent"
            textAlign="center"
            textPosition="bottom"
          />
        </ParallaxSection>
      </div>
      
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex flex-col items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <div className="w-px h-12 bg-gradient-to-b from-amber-400/50 to-transparent" />
        <motion.p 
          className="text-amber-200/60 text-sm mt-2 tracking-wider uppercase font-light"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          Scroll to explore
        </motion.p>
      </motion.div>
    </main>
  );
}