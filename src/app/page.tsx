"use client";

import { useRef, useCallback } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

const ENTRANCE = "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1920&q=85";
const DOOR = "https://images.unsplash.com/photo-1559647199-4666e9f89f4b?w=1920&q=85";
const INTERIOR = "https://images.unsplash.com/photo-1517248135467-4c7edcad8756?w=1920&q=85";
const EXTERIOR = "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=1920&q=85";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const zoom = useTransform(scrollYProgress, [0, 0.4], [1, 1.8]);
  const exteriorOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);
  const dollyOpacity = useTransform(scrollYProgress, [0.1, 0.3], [0, 1]);
  const doorOpacity = useTransform(scrollYProgress, [0.25, 0.4], [0, 1]);
  const doorClose = useTransform(scrollYProgress, [0.45, 0.55], [1, 0]);
  const doorLight = useTransform(scrollYProgress, [0.45, 0.55], [0, 1]);
  const interiorOpacity = useTransform(scrollYProgress, [0.5, 0.65], [0, 1]);
  const interiorScale = useTransform(scrollYProgress, [0.5, 0.7], [1.3, 1]);
  const interiorBright = useTransform(
    scrollYProgress,
    [0.5, 0.65],
    ["brightness(0.4) saturate(0.6)", "brightness(1) saturate(1)"]
  );
  const warmGlow = useTransform(scrollYProgress, [0.4, 0.6], [0, 1]);
  const scene5Opacity = useTransform(scrollYProgress, [0.8, 0.9], [0, 1]);
  const scene5Text = useTransform(scrollYProgress, [0.82, 0.92], [0, 1]);

  const enterText = useTransform(scrollYProgress, [0.38, 0.44], [0, 1]);
  const interiorTitle = useTransform(scrollYProgress, [0.6, 0.7], [0, 1]);
  const interiorDesc = useTransform(scrollYProgress, [0.63, 0.73], [0, 1]);

  const handleExplore = useCallback(() => {
    window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
  }, []);

  return (
    <main className="relative bg-[#1a0f0a]">
      <div ref={containerRef} className="h-[500vh] w-full" />

      <div className="fixed inset-0 h-screen w-full overflow-hidden bg-black">
        {/* Scene 1: Outside Cafe */}
        <motion.div className="absolute inset-0" style={{ opacity: exteriorOpacity }}>
          <Image
            src={EXTERIOR}
            alt="Cafe exterior at golden hour"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#1a0f0a]/60 via-transparent to-[#1a0f0a]/80" />
          <div className="absolute inset-0 bg-gradient-to-t from-amber-900/40 via-transparent to-transparent" />

          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <motion.span
              className="text-[clamp(0.75rem,1.5vw,1rem)] tracking-[0.3em] text-amber-300/70 mb-4 font-light uppercase"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 1 }}
            >
              Established 2025
            </motion.span>
            <motion.h1
              className="text-[clamp(2.5rem,8vw,7rem)] font-serif font-light text-white text-center leading-[1.1]"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 1.2, ease: "easeOut" }}
            >
              Happy Cup
            </motion.h1>
            <motion.p
              className="text-[clamp(0.875rem,1.5vw,1.25rem)] text-amber-200/60 mt-4 font-light tracking-wider"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 1 }}
            >
              Where every moment becomes a memory
            </motion.p>
          </div>

          <motion.button
            onClick={handleExplore}
            className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-amber-200/50 cursor-pointer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.5 }}
          >
            <span className="text-xs tracking-[0.25em] uppercase font-light">
              Scroll to enter
            </span>
            <motion.div
              className="w-px h-10 bg-gradient-to-b from-amber-400/60 to-transparent"
              animate={{ scaleY: [1, 0.6, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
            />
          </motion.button>
        </motion.div>

        {/* Scene 2: Dolly Zoom toward entrance */}
        <motion.div className="absolute inset-0" style={{ scale: zoom, opacity: dollyOpacity }}>
          <Image src={ENTRANCE} alt="Approaching cafe entrance" fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#1a0f0a]/40 via-transparent to-[#1a0f0a]/70" />
        </motion.div>

        {/* Scene 3: Door Transition */}
        <motion.div className="absolute inset-0" style={{ opacity: doorOpacity }}>
          <Image src={DOOR} alt="Cafe door entrance" fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#1a0f0a]/30 via-transparent to-[#1a0f0a]/60" />

          <motion.div className="absolute inset-0 flex" style={{ opacity: doorClose }}>
            <div className="h-full w-1/2 origin-right bg-black/70" />
            <div className="h-full w-1/2 origin-left bg-black/70" />
          </motion.div>

          <motion.div
            className="absolute inset-0"
            style={{
              opacity: doorLight,
              background:
                "radial-gradient(ellipse at 50% 50%, rgba(251,191,36,0.15) 0%, transparent 70%)",
            }}
          />

          <div className="absolute inset-0 flex items-center justify-center">
            <motion.p
              className="text-3xl md:text-5xl font-serif font-light text-white/90 tracking-wide"
              style={{ opacity: enterText }}
            >
              Enter
            </motion.p>
          </div>
        </motion.div>

        {/* Scene 4: Interior Reveal */}
        <motion.div
          className="absolute inset-0"
          style={{ opacity: interiorOpacity, scale: interiorScale, filter: interiorBright }}
        >
          <Image src={INTERIOR} alt="Luxury cafe interior" fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#1a0f0a]/80 via-transparent to-[#1a0f0a]/60" />

          <motion.div
            className="absolute inset-0"
            style={{
              opacity: warmGlow,
              background:
                "radial-gradient(ellipse at 50% 60%, rgba(212,168,83,0.12) 0%, transparent 70%)",
            }}
          />

          <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-[#1a0f0a]/90 to-transparent" />
          <div className="absolute top-0 left-0 right-0 h-1/4 bg-gradient-to-b from-[#1a0f0a]/40 to-transparent" />

          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              opacity: warmGlow,
              background:
                "radial-gradient(circle at 50% 40%, rgba(251,191,36,0.08) 0%, transparent 50%)",
            }}
          />

          <div className="absolute inset-0 flex flex-col items-center justify-end pb-24 md:pb-32">
            <div className="text-center px-6">
              <motion.span
                className="text-amber-400/70 text-xs md:text-sm tracking-[0.3em] uppercase font-light block mb-3"
                style={{ opacity: interiorTitle }}
              >
                Welcome to
              </motion.span>
              <motion.h2
                className="text-4xl md:text-6xl lg:text-7xl font-serif font-light text-white"
                style={{ opacity: interiorTitle }}
              >
                Happy Cup
              </motion.h2>
              <motion.p
                className="text-amber-200/60 text-base md:text-lg mt-4 max-w-xl mx-auto font-light leading-relaxed"
                style={{ opacity: interiorDesc }}
              >
                Sit back, relax, and let every sip tell a story
              </motion.p>
            </div>
          </div>
        </motion.div>

        {/* Scene 5: Continue scrolling content */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-[#1a0f0a] via-[#2d1e14] to-[#1a0f0a]"
          style={{ opacity: scene5Opacity }}
        >
          <div className="h-full flex flex-col items-center justify-center px-6 text-center">
            <motion.p
              className="text-amber-400/60 text-sm tracking-[0.3em] uppercase font-light mb-6"
              style={{ opacity: scene5Text }}
            >
              Continue your experience
            </motion.p>
            <motion.h3
              className="text-3xl md:text-5xl font-serif font-light text-white/90 mb-4"
              style={{ opacity: scene5Text }}
            >
              Crafted for you
            </motion.h3>
            <motion.p
              className="text-amber-200/50 max-w-lg text-base font-light leading-relaxed"
              style={{ opacity: scene5Text }}
            >
              From our carefully sourced beans to the warmth of our welcome,
              every detail is designed to make your visit unforgettable.
            </motion.p>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
