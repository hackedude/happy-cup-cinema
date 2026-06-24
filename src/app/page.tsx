"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

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
  const pinWrap = useRef<HTMLDivElement>(null);
  const s1 = useRef<HTMLDivElement>(null);
  const s2 = useRef<HTMLDivElement>(null);
  const s3 = useRef<HTMLDivElement>(null);
  const s4 = useRef<HTMLDivElement>(null);
  const t1 = useRef<HTMLDivElement>(null);
  const t2 = useRef<HTMLDivElement>(null);
  const t3 = useRef<HTMLDivElement>(null);
  const t4 = useRef<HTMLDivElement>(null);
  const dL = useRef<HTMLDivElement>(null);
  const dR = useRef<HTMLDivElement>(null);
  const dGlow = useRef<HTMLDivElement>(null);
  const cta = useRef<HTMLButtonElement>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: spacer.current,
          pin: pinWrap.current,
          start: "top top",
          end: "+=400%",
          scrub: 1.4,
        },
        defaults: { ease: "power1.inOut" },
      });

      tl.set(s1.current, { autoAlpha: 1 })
        .to(t1.current, { autoAlpha: 0, duration: 0.4 }, 0.08)
        .to(cta.current, { autoAlpha: 0, duration: 0.3 }, 0.12)
        .to(s1.current, { autoAlpha: 0, duration: 0.3 }, 0.2)

        .set(s2.current, { autoAlpha: 1, scale: 1 })
        .to(s2.current, { scale: 2, duration: 0.6 }, 0.1)
        .to(t2.current, { autoAlpha: 0, y: -20, duration: 0.25 }, 0.28)
        .to(s2.current, { autoAlpha: 0, duration: 0.25 }, 0.36)

        .set(s3.current, { autoAlpha: 1 })
        .to(dL.current, { scaleX: 0, duration: 0.4 }, 0.38)
        .to(dR.current, { scaleX: 0, duration: 0.4 }, 0.38)
        .to(dGlow.current, { autoAlpha: 1, duration: 0.25 }, 0.42)
        .to(t3.current, { autoAlpha: 1, duration: 0.25 }, 0.42)
        .to(t3.current, { autoAlpha: 0, duration: 0.2 }, 0.52)
        .to(s3.current, { autoAlpha: 0, duration: 0.2 }, 0.56)

        .set(s4.current, { autoAlpha: 1, scale: 1.3, filter: "brightness(0.4) saturate(0.6)" })
        .to(s4.current, { scale: 1, filter: "brightness(1) saturate(1)", duration: 0.45 }, 0.5)
        .to(t4.current, { autoAlpha: 1, duration: 0.35 }, 0.6);
    });
    return () => ctx.revert();
  }, []);

  return (
    <main className="relative bg-[#1a0f0a] text-[#f5e6d3] font-serif">
      {/* ============ CINEMATIC INTRO ============ */}
      <div ref={spacer} className="h-[500vh] w-full" />
      <div
        ref={pinWrap}
        className="fixed inset-0 h-screen w-full overflow-hidden bg-black"
      >
        <div ref={s1} className="absolute inset-0 invisible">
          <Image
            src="/images/1.png"
            alt="Outside Happy Cup Cafe"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40" />
          <div
            ref={t1}
            className="absolute inset-0 flex flex-col items-center justify-center text-center px-6"
          >
            <span className="text-sm md:text-base tracking-[0.3em] text-amber-300/90 font-light mb-3 uppercase">
              Welcome to
            </span>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-light text-white drop-shadow-xl">
              Happy Cup Cafe
            </h1>
            <p className="text-base md:text-lg text-amber-100/80 mt-4 max-w-xl font-light drop-shadow-lg">
              Step into a world of warmth, flavour, and comfort
            </p>
          </div>
          <button
            ref={cta}
            onClick={() => window.scrollTo({ top: window.innerHeight * 5, behavior: "smooth" })}
            className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-amber-200/70 cursor-pointer"
          >
            <span className="text-xs tracking-[0.25em] uppercase font-light">
              Begin your journey
            </span>
            <div className="w-px h-12 bg-gradient-to-b from-amber-400/60 to-transparent" />
          </button>
        </div>

        <div ref={s2} className="absolute inset-0 invisible">
          <Image
            src="/images/2.png"
            alt="Approaching the entrance"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/40" />
          <div
            ref={t2}
            className="absolute bottom-1/4 left-0 w-full px-8 md:px-16"
          >
            <span className="text-amber-300/80 text-xs tracking-wider uppercase font-light mb-2 block">
              Step 2
            </span>
            <h2 className="text-4xl md:text-5xl font-serif font-light text-white drop-shadow-xl">
              Walk Toward the Entrance
            </h2>
          </div>
        </div>

        <div ref={s3} className="absolute inset-0 invisible">
          <Image
            src="/images/3.png"
            alt="Cafe doors opening"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40" />
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
            ref={t3}
            className="absolute inset-0 flex items-center justify-center invisible"
          >
            <div className="text-center px-6">
              <span className="text-amber-300/80 text-xs tracking-wider uppercase font-light mb-2 block">
                Step 3
              </span>
              <h2 className="text-5xl md:text-6xl font-serif font-light text-white drop-shadow-xl">
                The Door Opens
              </h2>
            </div>
          </div>
        </div>

        <div ref={s4} className="absolute inset-0 invisible">
          <Image
            src="/images/4.png"
            alt="Inside Happy Cup Cafe"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/30" />
          <div className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(circle at 50% 50%, rgba(212,168,83,0.08) 0%, transparent 70%)",
            }}
          />
          <div
            ref={t4}
            className="absolute inset-0 flex flex-col items-center justify-center px-6 invisible"
          >
            <div className="text-center max-w-3xl">
              <span className="text-amber-300/80 text-xs tracking-wider uppercase font-light mb-3 block">
                Step 4
              </span>
              <h2 className="text-5xl md:text-7xl font-serif font-light text-white drop-shadow-xl mb-4">
                Inside the Cafe
              </h2>
              <p className="text-amber-100/80 text-lg md:text-xl font-light leading-relaxed drop-shadow-lg">
                Your sanctuary awaits — where every sip tells a story
              </p>
            </div>
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
