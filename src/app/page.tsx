"use client";

import { useRef, useCallback, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    container: containerRef,
    offset: ["start start", "end end"],
  });

  const scene1Opacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);
  const scene2Opacity = useTransform(scrollYProgress, [0.1, 0.4], [0, 1]);
  const scene3Opacity = useTransform(scrollYProgress, [0.35, 0.55], [0, 1]);
  const scene4Opacity = useTransform(scrollYProgress, [0.5, 0.7], [0, 1]);

  const scene1TitleOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scene1SubtitleOpacity = useTransform(scrollYProgress, [0.05, 0.25], [1, 0]);
  const scene1EnterBtnOpacity = useTransform(scrollYProgress, [0.15, 0.3], [1, 0]);

  const scene2Zoom = useTransform(scrollYProgress, [0.1, 0.35], [1, 2]);
  const scene2Light = useTransform(scrollYProgress, [0.2, 0.35], [1, 0.5]);

  const scene3DoorOpen = useTransform(scrollYProgress, [0.45, 0.65], [0, 1]);
  const scene3DoorLight = useTransform(scrollYProgress, [0.6, 0.65], [0, 1]);

  const scene4Bright = useTransform(scrollYProgress, [0.55, 0.75], [0.3, 1]);
  const scene4Warm = useTransform(scrollYProgress, [0.6, 0.8], [0.5, 1]);
  const scene4TextOpacity = useTransform(scrollYProgress, [0.7, 0.9], [0, 1]);

  const scrollUpRef = useRef<HTMLDivElement>(null);

  const scrollToContent = useCallback(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    if (scrollUpRef.current) {
      const animation = setInterval(() => {
        scrollUpRef.current?.classList.toggle("animate-bounce");
      }, 2000);
      return () => clearInterval(animation);
    }
  }, []);

  return (
    <main className="relative h-screen w-full overflow-hidden bg-[#1a0f0a]">
      <div
        ref={containerRef}
        className="h-full w-full overflow-y-scroll touch-pan-y"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        <div className="relative h-[300vh] w-full">
          <div className="sticky top-0 h-screen w-full overflow-hidden">
            <motion.div
              className="absolute inset-0"
              style={{ opacity: scene1Opacity.get() }}
            >
              <Image
                src="https://images.unsplash.com/photo-1517248135467-4c7edcad8756"
                alt="Luxury cafe exterior at dusk"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-b from-[#1a0f0a]/70 via-transparent to-[#1a0f0a]/80" />
              <div className="absolute inset-0 bg-gradient-to-t from-amber-900/50 via-transparent to-transparent" />

              <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
                <motion.span
                  className="text-sm md:text-base tracking-[0.3em] text-amber-300/80 font-light mb-4 uppercase"
                  style={{ opacity: scene1SubtitleOpacity.get() }}
                >
                  Welcome to
                </motion.span>
                <motion.h1
                  className="text-6xl md:text-8xl lg:text-[8rem] font-serif font-light text-white"
                  style={{ opacity: scene1TitleOpacity.get() }}
                >
                  Happy Cup
                </motion.h1>
                <motion.p
                  className="text-lg md:text-xl text-amber-200/60 mt-6 max-w-2xl font-light leading-relaxed"
                  style={{ opacity: scene1SubtitleOpacity.get() }}
                >
                  Step into a world where every detail is crafted with care
                </motion.p>

                <motion.button
                  onClick={scrollToContent}
                  className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-amber-200/60 cursor-pointer"
                  style={{ opacity: scene1EnterBtnOpacity.get() }}
                >
                  <span className="text-xs tracking-[0.25em] uppercase font-light">
                    Begin your journey
                  </span>
                  <motion.div
                    ref={scrollUpRef}
                    className="w-px h-12 bg-gradient-to-b from-amber-400/60 to-transparent"
                    animate={{ scaleY: [1, 0.6, 1] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                  />
                </motion.button>
              </div>
            </motion.div>

            <motion.div
              className="absolute inset-0"
              style={{ opacity: scene2Opacity.get() }}
            >
              <motion.div
                className="relative h-full w-full"
                style={{ scale: scene2Zoom.get(), filter: `brightness(${scene2Light.get()})` }}
              >
                <Image
                  src="https://images.unsplash.com/photo-1501785888041-af3ef285b470"
                  alt="Approaching cafe entrance"
                  fill
                  className="object-cover"
                />
              </motion.div>
              <div className="absolute inset-0 bg-gradient-to-b from-[#1a0f0a]/40 via-transparent to-[#1a0f0a]/60" />

              <motion.div
                className="absolute bottom-1/4 left-0 w-full px-12"
                style={{ scale: scene2Zoom.get() }}
              >
                <div className="max-w-2xl">
                  <span className="text-amber-300/70 text-xs tracking-wider uppercase font-light mb-2 block">
                    Step 2
                  </span>
                  <motion.h2 className="text-4xl md:text-5xl font-serif font-light text-white">
                    Walk toward the golden doors
                  </motion.h2>
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              className="absolute inset-0"
              style={{ opacity: scene3Opacity.get() }}
            >
              <motion.div
                className="relative h-full w-full"
                style={{ filter: `brightness(${scene3DoorLight.get()})` }}
              >
                <Image
                  src="https://images.unsplash.com/photo-1559647199-4666e9f89f4b"
                  alt="Cafe entrance with golden doors"
                  fill
                  className="object-cover"
                />
              </motion.div>
              <div className="absolute inset-0 bg-gradient-to-b from-[#1a0f0a]/50 via-transparent to-[#1a0f0a]/70" />

              <motion.div
                className="absolute inset-0 flex"
                style={{ opacity: scene3DoorOpen.get() }}
              >
                <div className="h-full w-1/2 origin-right bg-black/60" />
                <div className="h-full w-1/2 origin-left bg-black/60 ml-auto" />
              </motion.div>

              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                style={{ opacity: useTransform(scrollYProgress, [0.5, 0.6], [0, 1]).get() }}
              >
                <div className="text-center px-6">
                  <span className="text-amber-300/70 text-xs tracking-wider uppercase font-light mb-2 block">
                    Step 3
                  </span>
                  <h2 className="text-5xl md:text-6xl font-serif font-light text-white">
                    The doors open
                  </h2>
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              className="absolute inset-0"
              style={{ opacity: scene4Opacity.get() }}
            >
              <motion.div
                className="relative h-full w-full"
                style={{
                  filter: `brightness(${scene4Bright.get()}) hue-rotate(${scene4Warm.get()}turn)`,
                }}
              >
                <Image
                  src="https://images.unsplash.com/photo-1517248135467-4c7edcad8756"
                  alt="Luxury cafe interior"
                  fill
                  className="object-cover"
                />
              </motion.div>
              <div className="absolute inset-0 bg-gradient-to-b from-[#1a0f0a]/80 via-transparent to-[#1a0f0a]/60" />
              <motion.div
                className="absolute inset-0 pointer-events-none"
                style={{
                  opacity: useTransform(scrollYProgress, [0.65, 0.75], [0, 0.5]).get(),
                  background:
                    "radial-gradient(circle at 50% 50%, rgba(251,191,36,0.15) 0%, transparent 70%)",
                }}
              />

              <div className="absolute inset-0 flex flex-col items-center justify-center px-6">
                <motion.div
                  className="text-center max-w-3xl"
                  style={{ opacity: scene4TextOpacity.get() }}
                >
                  <span className="text-amber-300/70 text-xs tracking-wider uppercase font-light mb-3 block">
                    Step 4
                  </span>
                  <h2 className="text-5xl md:text-7xl font-serif font-light text-white mb-6">
                    Welcome inside
                  </h2>
                  <p className="text-amber-200/80 text-lg md:text-xl font-light leading-relaxed">
                    Your sanctuary awaits, where every moment is designed to indulge and inspire.
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <div ref={scrollRef} className="h-screen w-full bg-[#1a0f0a]" />

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className="w-px h-16 bg-gradient-to-b from-amber-400/50 to-transparent" />
      </div>
    </main>
  );
}
