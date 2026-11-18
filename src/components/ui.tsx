import { ReactNode, useRef } from "react";
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import type { LucideIcon } from "lucide-react";

export const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

/** true quando efeitos pesados devem ficar desligados (reduced-motion, toque ou mobile) */
export function useCalm() {
  const reduced = useReducedMotion();
  return !!reduced || (typeof window !== "undefined" && window.matchMedia("(pointer:coarse), (max-width:767px)").matches);
}

export const Logo = () => (
  <span className="font-serif text-xl font-bold tracking-[.18em] text-cream">
    BUTINAS <span className="text-gold">BAR</span>
  </span>
);

export const Section = ({ id, className = "", children }: { id: string; className?: string; children: ReactNode }) => (
  <section id={id} className={`relative px-5 py-20 sm:px-8 md:py-28 ${className}`}>
    <div className="mx-auto max-w-7xl">{children}</div>
  </section>
);

/** Texto revelado por máscara, linha a linha */
export function Lines({ lines, delay = 0 }: { lines: string[]; delay?: number }) {
  const reduced = useReducedMotion();
  return (
    <>
      {lines.map((l, i) => (
        <span key={l} className="-my-[.12em] block overflow-hidden py-[.12em]">
          <motion.span
            className="block"
            initial={reduced ? false : { y: "110%" }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.1, ease, delay: delay + i * 0.12 }}
          >
            {l}
          </motion.span>
        </span>
      ))}
    </>
  );
}

export const Title = ({ text, className = "" }: { text: string; className?: string }) => (
  <div className={className}>
    <h2 className="font-serif text-3xl font-semibold uppercase leading-[1.1] sm:text-4xl lg:text-5xl">
      <Lines lines={[text]} />
    </h2>
    <span className="mt-6 block h-px w-24 bg-gold" aria-hidden />
  </div>
);

export function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduced ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8%" }}
      transition={{ duration: 0.9, ease, delay }}
    >
      {children}
    </motion.div>
  );
}

export function Magnetic({ children, className = "block sm:inline-block" }: { children: ReactNode; className?: string }) {
  const calm = useCalm();
  const x = useMotionValue(0), y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 16 }), sy = useSpring(y, { stiffness: 220, damping: 16 });
  if (calm) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      style={{ x: sx, y: sy }}
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - r.left - r.width / 2) * 0.25);
        y.set((e.clientY - r.top - r.height / 2) * 0.25);
      }}
      onMouseLeave={() => { x.set(0); y.set(0); }}
    >
      {children}
    </motion.div>
  );
}

export function Btn({ href, children, icon: Icon, variant = "gold" }: { href: string; children: ReactNode; icon?: LucideIcon; variant?: "gold" | "line" }) {
  const ext = /^https?:/.test(href);
  const tone = variant === "gold" ? "bg-gold text-ink hover:bg-sand" : "border border-gold/70 text-cream hover:bg-gold hover:text-ink";
  return (
    <Magnetic>
      <a
        href={href}
        {...(ext ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        className={`flex min-h-[48px] w-full items-center justify-center gap-2 rounded-sm px-7 py-3.5 text-sm font-semibold uppercase tracking-[.14em] transition-colors duration-300 sm:inline-flex sm:w-auto ${tone}`}
      >
        {Icon && <Icon size={18} aria-hidden />}
        {children}
      </a>
    </Magnetic>
  );
}

/** Foto com clip-path reveal, parallax sutil e zoom no hover. Sem src = espaço demonstrativo identificado. */
export function Photo({ src, alt, className = "", label = "Foto demonstrativa", parallax = false, reveal = true }: {
  src: string; alt: string; className?: string; label?: string; parallax?: boolean; reveal?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const calm = useCalm();
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-7%", "7%"]);
  const inner = src ? (
    <img src={src} alt={alt} loading="lazy" decoding="async" className="h-full w-full object-cover" />
  ) : (
    <div role="img" aria-label={alt} className="grain flex h-full w-full items-end bg-gradient-to-br from-wood via-coal to-ink p-4 text-xs text-sand/70">
      {label}
    </div>
  );
  return (
    <motion.div
      ref={ref}
      className={`relative overflow-hidden ${className}`}
      initial={reduced || !reveal ? false : { clipPath: "inset(0 0 100% 0)" }}
      whileInView={{ clipPath: "inset(0 0 0% 0)" }}
      viewport={{ once: true, margin: "-8%" }}
      transition={{ duration: 1.2, ease }}
    >
      <motion.div className="h-full w-full" style={parallax && !calm ? { y, scale: 1.16 } : undefined}>
        <div className="h-full w-full transition-transform duration-700 ease-out hover:scale-105">{inner}</div>
      </motion.div>
    </motion.div>
  );
}
