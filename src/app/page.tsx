"use client";

import { useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const IMG = {
  exterior:
    "https://images.unsplash.com/photo-1517248135467-4c7edcad8756",
  approach:
    "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
  door:
    "https://images.unsplash.com/photo-1559647199-4666e9f89f4b",
};

export default function Home() {
  const pinWrap = useRef<HTMLDivElement>(null);
  const spacer = useRef<HTMLDivElement>(null);

  const s1 = useRef<HTMLDivElement>(null);
  const s2 = useRef<HTMLDivElement>(null);
  const s3 = useRef<HTMLDivElement>(null);
  const s4 = useRef<HTMLDivElement>(null);

  const st1 = useRef<HTMLDivElement>(null);
  const st2 = useRef<HTMLDivElement>(null);
  const st3 = useRef<HTMLDivElement>(null);
  const st4 = useRef<HTMLDivElement>(null);

  const dL = useRef<HTMLDivElement>(null);
  const dR = useRef<HTMLDivElement>(null);
  const dGlow = useRef<HTMLDivElement>(null);

  const ctaRef = useRef<HTMLButtonElement>(null);

  const go = useCallback(() => {
    window.scrollTo({ top: window.innerHeight * 5, behavior: "smooth" });
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: spacer.current,
          pin: pinWrap.current,
          start: "top top",
          end: "+=400%",
          scrub: 1.2,
        },
        defaults: { ease: "power1.inOut" },
      });

      tl.set(s1.current, { autoAlpha: 1 })
        .to(st1.current, { autoAlpha: 0, duration: 0.3 }, 0.1)
        .to(ctaRef.current, { autoAlpha: 0, duration: 0.2 }, 0.15)
        .to(s1.current, { autoAlpha: 0, duration: 0.3 }, 0.22)

        .set(s2.current, { autoAlpha: 1, scale: 1 })
        .to(s2.current, { scale: 2, duration: 0.5 }, 0.1)
        .to(st2.current, { autoAlpha: 0, y: -20, duration: 0.2 }, 0.3)
        .to(s2.current, { autoAlpha: 0, duration: 0.2 }, 0.38)

        .set(s3.current, { autoAlpha: 1 })
        .to(dL.current, { scaleX: 0, duration: 0.35 }, 0.4)
        .to(dR.current, { scaleX: 0, duration: 0.35 }, 0.4)
        .to(dGlow.current, { autoAlpha: 1, duration: 0.2 }, 0.44)
        .to(st3.current, { autoAlpha: 1, duration: 0.2 }, 0.44)
        .to(st3.current, { autoAlpha: 0, duration: 0.15 }, 0.53)
        .to(s3.current, { autoAlpha: 0, duration: 0.2 }, 0.57)

        .set(s4.current, {
          autoAlpha: 1,
          scale: 1.3,
          filter: "brightness(0.3) saturate(0.5)",
        })
        .to(s4.current, {
          scale: 1,
          filter: "brightness(1) saturate(1)",
          duration: 0.4,
        }, 0.52)
        .to(st4.current, { autoAlpha: 1, duration: 0.3 }, 0.62);
    });

    return () => ctx.revert();
  }, []);

  return (
    <main className="relative bg-[#1a0f0a]">
      <div ref={spacer} className="h-[500vh] w-full" />

      <div
        ref={pinWrap}
        className="fixed inset-0 h-screen w-full overflow-hidden bg-black"
      >
        <div ref={s1} className="absolute inset-0 invisible">
          <Image
            src={IMG.exterior}
            alt="Cafe exterior"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#1a0f0a]/70 via-transparent to-[#1a0f0a]/80" />
          <div className="absolute inset-0 bg-gradient-to-t from-amber-900/50 via-transparent to-transparent" />

          <div
            ref={st1}
            className="absolute inset-0 flex flex-col items-center justify-center text-center px-6"
          >
            <span className="text-sm md:text-base tracking-[0.3em] text-amber-300/80 font-light mb-4 uppercase">
              Welcome to
            </span>
            <h1 className="text-6xl md:text-8xl lg:text-[8rem] font-serif font-light text-white">
              Happy Cup
            </h1>
            <p className="text-lg md:text-xl text-amber-200/60 mt-6 max-w-2xl font-light leading-relaxed">
              Step into a world where every detail is crafted with care
            </p>
          </div>

          <button
            ref={ctaRef}
            onClick={go}
            className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-amber-200/60 cursor-pointer"
          >
            <span className="text-xs tracking-[0.25em] uppercase font-light">
              Begin your journey
            </span>
            <div className="w-px h-12 bg-gradient-to-b from-amber-400/60 to-transparent" />
          </button>
        </div>

        <div ref={s2} className="absolute inset-0 invisible">
          <div className="relative h-full w-full">
            <Image
              src={IMG.approach}
              alt="Approaching entrance"
              fill
              className="object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-[#1a0f0a]/40 via-transparent to-[#1a0f0a]/60" />

          <div
            ref={st2}
            className="absolute bottom-1/4 left-0 w-full px-12"
          >
            <span className="text-amber-300/70 text-xs tracking-wider uppercase font-light mb-2 block">
              Step 2
            </span>
            <h2 className="text-4xl md:text-5xl font-serif font-light text-white">
              Walk toward the golden doors
            </h2>
          </div>
        </div>

        <div ref={s3} className="absolute inset-0 invisible">
          <div className="relative h-full w-full">
            <Image
              src={IMG.door}
              alt="Cafe entrance"
              fill
              className="object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-[#1a0f0a]/50 via-transparent to-[#1a0f0a]/70" />

          <div
            ref={dL}
            className="absolute top-0 left-0 h-full w-1/2 bg-black/60 origin-right"
          />
          <div
            ref={dR}
            className="absolute top-0 right-0 h-full w-1/2 bg-black/60 origin-left"
          />

          <div
            ref={dGlow}
            className="absolute inset-0 invisible"
            style={{
              background:
                "radial-gradient(ellipse at 50% 50%, rgba(251,191,36,0.15) 0%, transparent 70%)",
            }}
          />

          <div
            ref={st3}
            className="absolute inset-0 flex items-center justify-center invisible"
          >
            <div className="text-center px-6">
              <span className="text-amber-300/70 text-xs tracking-wider uppercase font-light mb-2 block">
                Step 3
              </span>
              <h2 className="text-5xl md:text-6xl font-serif font-light text-white">
                The doors open
              </h2>
            </div>
          </div>
        </div>

        <div ref={s4} className="absolute inset-0 invisible">
          <div className="relative h-full w-full">
            <Image
              src={IMG.exterior}
              alt="Luxury cafe interior"
              fill
              className="object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-[#1a0f0a]/80 via-transparent to-[#1a0f0a]/60" />

          <div
            ref={st4}
            className="absolute inset-0 flex flex-col items-center justify-center px-6 invisible"
          >
            <div className="text-center max-w-3xl">
              <span className="text-amber-300/70 text-xs tracking-wider uppercase font-light mb-3 block">
                Step 4
              </span>
              <h2 className="text-5xl md:text-7xl font-serif font-light text-white mb-6">
                Welcome inside
              </h2>
              <p className="text-amber-200/80 text-lg md:text-xl font-light leading-relaxed">
                Your sanctuary awaits, where every moment is designed to
                indulge and inspire.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
