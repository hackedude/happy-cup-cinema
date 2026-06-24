"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const EXT = ".png";

function clamp(v: number, min: number, max: number) {
  return Math.max(min, Math.min(max, v));
}

function smoothstep(edge0: number, edge1: number, x: number) {
  const t = clamp((x - edge0) / (edge1 - edge0), 0, 1);
  return t * t * (3 - 2 * t);
}

const menuItems = [
  { name: "Signature Espresso", desc: "Rich double shot with caramel finish", price: "₹250" },
  { name: "Golden Latte", desc: "Turmeric-infused oat milk latte", price: "₹320" },
  { name: "Hazelnut Cappuccino", desc: "Topped with toasted hazelnut crumb", price: "₹290" },
  { name: "Cold Brew Tonic", desc: "Sparkling tonic with cold brew float", price: "₹310" },
  { name: "Butter Croissant", desc: "Golden, flaky, baked fresh daily", price: "₹180" },
  { name: "Tiramisu Jar", desc: "Layered espresso-soaked indulgence", price: "₹280" },
];

const deliveryAreas = [
  "Bandra West", "Khar", "Santacruz", "Vile Parle",
  "Andheri West", "Juhu", "Powai", "Worli",
];

const faqs = [
  { q: "What are your cafe hours?", a: "We're open daily from 7:00 AM to 11:00 PM. Weekend brunch runs until 3:00 PM." },
  { q: "Do you take reservations?", a: "Yes, we recommend reserving for weekend tables. Call or WhatsApp us." },
  { q: "Is there vegan or gluten-free options?", a: "Absolutely. Our menu clearly marks vegan, GF, and dairy-free choices." },
  { q: "How does WhatsApp ordering work?", a: "Browse our menu, send us your order via WhatsApp, and we'll have it ready for pickup or delivery." },
  { q: "Do you deliver outside the listed areas?", a: "We can accommodate special requests for larger orders. Reach out and we'll try to help." },
  { q: "Can I host an event at the cafe?", a: "Yes! We host private events, small celebrations, and pop-ups. Contact us for details." },
];

const steps = [
  { title: "Browse", desc: "Pick your favourites from our menu" },
  { title: "Chat", desc: "Send your order on WhatsApp" },
  { title: "Confirm", desc: "We'll confirm ETA and any customisations" },
  { title: "Enjoy", desc: "Pick up or get it delivered fresh" },
];

export default function Home() {
  const spacer = useRef<HTMLDivElement>(null);
  const s1 = useRef<HTMLDivElement>(null);
  const s2 = useRef<HTMLDivElement>(null);
  const s3 = useRef<HTMLDivElement>(null);
  const s4 = useRef<HTMLDivElement>(null);
  const t1t = useRef<HTMLDivElement>(null);
  const t2t = useRef<HTMLDivElement>(null);
  const t3t = useRef<HTMLDivElement>(null);
  const t4t = useRef<HTMLDivElement>(null);
  const dL = useRef<HTMLDivElement>(null);
  const dR = useRef<HTMLDivElement>(null);
  const dGlow = useRef<HTMLDivElement>(null);
  const warm = useRef<HTMLDivElement>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    const state = { p: 0 };

    gsap.to(state, {
      p: 1,
      ease: "none",
      scrollTrigger: {
        trigger: spacer.current,
        start: "top top",
        end: "+=280%",
        scrub: 1.2,
      },
      onUpdate() {
        const p = state.p;
        const easeZoom = 1 - Math.pow(1 - p, 1.5);
        const zoom = 1 + easeZoom * 0.55;

        const s1o = 1 - smoothstep(0, 0.22, p);
        const s2o = smoothstep(0.1, 0.22, p) - smoothstep(0.35, 0.5, p);
        const s3o = smoothstep(0.35, 0.5, p) - smoothstep(0.58, 0.7, p);
        const s4o = smoothstep(0.55, 0.7, p);

        const doorP = smoothstep(0.42, 0.58, p);
        const angle = doorP * 85;

        const brightVal = 1 - smoothstep(0.35, 0.5, p) * 0.25 + smoothstep(0.55, 0.7, p) * 0.25;
        const warmO = smoothstep(0.5, 0.7, p);

        const t1o = 1 - smoothstep(0.04, 0.16, p);
        const t2o = smoothstep(0.14, 0.22, p) - smoothstep(0.32, 0.42, p);
        const t3o = smoothstep(0.42, 0.52, p) - smoothstep(0.56, 0.64, p);
        const t4o = smoothstep(0.6, 0.72, p);

        const setVis = (el: HTMLDivElement | null, o: number, sc?: number, extra?: string) => {
          if (!el) return;
          el.style.opacity = String(Math.max(0, Math.min(1, o)));
          el.style.visibility = o > 0.01 ? "visible" : "hidden";
          if (sc !== undefined) {
            el.style.transform = `scale(${sc})${extra ? " " + extra : ""}`;
          } else {
            el.style.transform = extra || "none";
          }
        };

        setVis(s1.current, s1o, zoom);
        setVis(s2.current, s2o, zoom);
        setVis(s3.current, s3o, zoom);
        setVis(s4.current, s4o, zoom, `brightness(${brightVal})`);

        setVis(t1t.current, t1o);
        setVis(t2t.current, t2o);
        setVis(t3t.current, t3o);
        setVis(t4t.current, t4o);

        if (s3o > 0.01) {
          setVis(dL.current, 1, undefined, `perspective(1200px) rotateY(${angle}deg)`);
          setVis(dR.current, 1, undefined, `perspective(1200px) rotateY(${-angle}deg)`);
        } else {
          setVis(dL.current, 0);
          setVis(dR.current, 0);
        }

        setVis(dGlow.current, smoothstep(0.42, 0.55, p) - smoothstep(0.62, 0.75, p));
        setVis(warm.current, warmO * 0.6);
      },
    });
  }, []);

  return (
    <main className="relative bg-[#1a0f0a] text-[#f5e6d3] font-serif">
      <div ref={spacer} className="h-[280vh] w-full" />
      <div className="fixed inset-0 h-screen w-full overflow-hidden bg-black" style={{ perspective: "1200px" }}>
        <div ref={s4} className="absolute inset-0" style={{ willChange: "transform, opacity" }}>
          <Image
            src={`/images/4${EXT}`}
            alt="Inside Happy Cup Cafe"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/20" />
          <div
            ref={warm}
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "radial-gradient(circle at 50% 50%, rgba(212,168,83,0.13) 0%, transparent 60%)",
            }}
          />
          <div ref={t4t} className="absolute inset-0 flex flex-col items-center justify-center px-6">
            <div className="text-center max-w-3xl">
              <span className="text-amber-300/80 text-xs tracking-wider uppercase font-light mb-3 block drop-shadow-lg">
                Inside
              </span>
              <h2 className="text-5xl md:text-7xl font-serif font-light text-white drop-shadow-xl">
                Welcome to Happy Cup
              </h2>
            </div>
          </div>
        </div>

        <div ref={s3} className="absolute inset-0" style={{ willChange: "transform, opacity" }}>
          <Image
            src={`/images/3${EXT}`}
            alt="Cafe doors opening"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/15 via-transparent to-black/25" />
          <div
            ref={dGlow}
            className="absolute inset-0"
            style={{
              background: "radial-gradient(ellipse at 50% 50%, rgba(251,191,36,0.18) 0%, transparent 70%)",
            }}
          />
          <div ref={t3t} className="absolute inset-0 flex items-center justify-center">
            <div className="text-center px-6">
              <span className="text-amber-300/80 text-xs tracking-wider uppercase font-light mb-2 block drop-shadow-lg">
                Step 3
              </span>
              <h2 className="text-5xl md:text-6xl font-serif font-light text-white drop-shadow-xl">
                Step Inside
              </h2>
            </div>
          </div>
        </div>

        <div
          ref={dL}
          className="absolute top-0 left-0 h-full w-1/2 z-10"
          style={{ background: "rgba(0,0,0,0.55)", transformOrigin: "right center", willChange: "transform" }}
        />
        <div
          ref={dR}
          className="absolute top-0 right-0 h-full w-1/2 z-10"
          style={{ background: "rgba(0,0,0,0.55)", transformOrigin: "left center", willChange: "transform" }}
        />

        <div ref={s2} className="absolute inset-0" style={{ willChange: "transform, opacity" }}>
          <Image
            src={`/images/2${EXT}`}
            alt="Approaching the entrance"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/20" />
          <div ref={t2t} className="absolute bottom-1/4 left-0 w-full px-8 md:px-16">
            <span className="text-amber-300/80 text-xs tracking-wider uppercase font-light mb-2 block drop-shadow-lg">
              Step 2
            </span>
            <h2 className="text-4xl md:text-5xl font-serif font-light text-white drop-shadow-xl">
              Come Closer
            </h2>
          </div>
        </div>

        <div ref={s1} className="absolute inset-0" style={{ willChange: "transform, opacity" }}>
          <Image
            src={`/images/1${EXT}`}
            alt="Outside Happy Cup Cafe"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/15 via-transparent to-black/25" />
          <div ref={t1t} className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
            <span className="text-sm md:text-base tracking-[0.3em] text-amber-300/90 font-light mb-3 uppercase drop-shadow-lg">
              Step 1
            </span>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-light text-white drop-shadow-xl">
              You&apos;ve Arrived.
            </h1>
          </div>
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-amber-200/70">
            <span className="text-xs tracking-[0.25em] uppercase font-light">
              Scroll
            </span>
            <div className="w-px h-10 bg-gradient-to-b from-amber-400/60 to-transparent" />
          </div>
        </div>
      </div>

      {/* ============ POPULAR MENU ============ */}
      <section className="relative z-10 py-24 md:py-32 px-6 md:px-16 lg:px-24 bg-gradient-to-b from-[#2d1e14] to-[#1a0f0a]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-serif font-light text-white text-center mb-4">
            Popular Menu
          </h2>
          <p className="text-center text-amber-200/60 text-lg font-light max-w-xl mx-auto mb-16">
            Handcrafted with love, served with warmth
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {menuItems.map((item, i) => (
              <div
                key={i}
                className="group relative bg-[#3d2a1c]/60 border border-amber-900/20 rounded-2xl p-6 hover:bg-[#3d2a1c]/80 transition-all duration-500 hover:-translate-y-1"
              >
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-500/20 to-amber-700/20 flex items-center justify-center mb-4">
                  <span className="text-amber-400/80 text-lg">{["☕","🥐","🍰","🧋","🥪","🍮"][i]}</span>
                </div>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-serif font-light text-white mb-1">{item.name}</h3>
                    <p className="text-amber-200/50 text-sm font-light">{item.desc}</p>
                  </div>
                  <span className="text-amber-300/90 font-light whitespace-nowrap">{item.price}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ WHY ORDER DIRECT ============ */}
      <section className="relative z-10 py-24 md:py-32 px-6 md:px-16 lg:px-24 bg-[#1a0f0a]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-serif font-light text-white text-center mb-4">
            Why Order Direct
          </h2>
          <p className="text-center text-amber-200/60 text-lg font-light max-w-xl mx-auto mb-16">
            Skip the wait. Order straight from us.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { icon: "✨", title: "Freshly Made", desc: "Prepared the moment you order, not sitting on a shelf." },
              { icon: "🎁", title: "Exclusive Perks", desc: "Direct orders get complimentary treats and priority service." },
              { icon: "💬", title: "Personal Touch", desc: "Chat with us directly for customisations and special requests." },
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-2xl font-serif font-light text-white mb-3">{item.title}</h3>
                <p className="text-amber-200/50 font-light leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ WHATSAPP ORDERING FLOW ============ */}
      <section className="relative z-10 py-24 md:py-32 px-6 md:px-16 lg:px-24 bg-gradient-to-b from-[#1a0f0a] to-[#2d1e14]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-serif font-light text-white text-center mb-4">
            Order via WhatsApp
          </h2>
          <p className="text-center text-amber-200/60 text-lg font-light max-w-xl mx-auto mb-16">
            Four simple steps to your Happy Cup
          </p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {steps.map((step, i) => (
              <div key={i} className="text-center relative">
                <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-amber-500/20 to-amber-700/20 border border-amber-500/20 flex items-center justify-center mb-4">
                  <span className="text-2xl text-amber-300/80">{i + 1}</span>
                </div>
                <h3 className="text-xl font-serif font-light text-white mb-2">{step.title}</h3>
                <p className="text-amber-200/50 text-sm font-light">{step.desc}</p>
                {i < 3 && (
                  <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-px bg-gradient-to-r from-amber-500/30 to-transparent" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ DELIVERY AREAS ============ */}
      <section className="relative z-10 py-24 md:py-32 px-6 md:px-16 lg:px-24 bg-[#1a0f0a]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-serif font-light text-white text-center mb-4">
            We Deliver To
          </h2>
          <p className="text-center text-amber-200/60 text-lg font-light max-w-xl mx-auto mb-12">
            Fresh coffee delivered to your doorstep
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {deliveryAreas.map((area, i) => (
              <div
                key={i}
                className="text-center py-3 px-4 rounded-xl bg-[#3d2a1c]/40 border border-amber-900/10 text-amber-200/80 font-light text-sm tracking-wide"
              >
                {area}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ GALLERY ============ */}
      <section className="relative z-10 py-24 md:py-32 px-6 md:px-16 lg:px-24 bg-gradient-to-b from-[#2d1e14] to-[#1a0f0a]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-serif font-light text-white text-center mb-4">
            Our Space
          </h2>
          <p className="text-center text-amber-200/60 text-lg font-light max-w-xl mx-auto mb-16">
            A glimpse into the Happy Cup experience
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="aspect-[4/5] rounded-2xl overflow-hidden bg-[#3d2a1c]/40 border border-amber-900/10">
                <Image
                  src={`/images/${n}.png`}
                  alt={`Happy Cup Cafe gallery ${n}`}
                  width={400}
                  height={500}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ FAQ ============ */}
      <section className="relative z-10 py-24 md:py-32 px-6 md:px-16 lg:px-24 bg-[#1a0f0a]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-serif font-light text-white text-center mb-4">
            Frequently Asked
          </h2>
          <p className="text-center text-amber-200/60 text-lg font-light max-w-xl mx-auto mb-16">
            Everything you need to know
          </p>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="rounded-2xl bg-[#3d2a1c]/30 border border-amber-900/10 overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left"
                >
                  <span className="text-white font-light tracking-wide">{faq.q}</span>
                  <span className={`text-amber-400/70 text-xl transition-transform duration-300 ${openFaq === i ? "rotate-45" : ""}`}>
                    +
                  </span>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openFaq === i ? "max-h-48 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <p className="px-6 pb-5 text-amber-200/60 font-light leading-relaxed text-sm">
                    {faq.a}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ FINAL CTA ============ */}
      <section className="relative z-10 py-24 md:py-32 px-6 md:px-16 lg:px-24 bg-gradient-to-b from-[#1a0f0a] to-[#2d1e14]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl md:text-7xl font-serif font-light text-white mb-6">
            Ready for your <br />
            <span className="text-amber-300/90">Happy Cup</span>?
          </h2>
          <p className="text-amber-200/60 text-lg md:text-xl font-light max-w-2xl mx-auto mb-10 leading-relaxed">
            Come in, order online, or say hello on WhatsApp. Your perfect cup is waiting.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-amber-600/20 border border-amber-500/40 text-amber-200 hover:bg-amber-600/30 transition-all duration-300 font-light tracking-wide"
            >
              Visit Us
            </a>
            <a
              href="#"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#25D366]/20 border border-[#25D366]/40 text-[#25D366]/90 hover:bg-[#25D366]/30 transition-all duration-300 font-light tracking-wide"
            >
              Order on WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* ============ FOOTER ============ */}
      <footer className="relative z-10 py-12 px-6 md:px-16 lg:px-24 bg-[#1a0f0a] border-t border-amber-900/10">
        <div className="max-w-6xl mx-auto text-center">
          <div className="mb-6">
            <h3 className="text-2xl font-serif font-light text-white">Happy Cup Cafe</h3>
            <p className="text-amber-200/40 text-sm font-light mt-1">Where every moment becomes a memory</p>
          </div>
          <div className="flex justify-center gap-6 text-amber-200/40 text-sm font-light mb-6">
            <span>Instagram</span>
            <span>Facebook</span>
            <span>WhatsApp</span>
          </div>
          <div className="text-amber-200/30 text-xs font-light leading-relaxed border-t border-amber-900/10 pt-6">
            Demo Website Concept created by ArcTech Solutions for presentation purposes.
          </div>
        </div>
      </footer>
    </main>
  );
}
