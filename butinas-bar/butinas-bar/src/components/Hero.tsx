import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { site } from "../data/site";
import { Btn, Lines, Reveal, useCalm } from "./ui";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const calm = useCalm();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);

  return (
    <section id="inicio" ref={ref} className="relative isolate flex min-h-[100svh] items-end overflow-hidden px-5 pb-28 pt-32 sm:items-center sm:px-8">
      <motion.div aria-hidden style={calm ? undefined : { y }} className="absolute inset-x-0 -top-[15%] -z-20 h-[130%]">
        {site.images.hero ? (
          <img src={site.images.hero} alt="" className="h-full w-full object-cover" />
        ) : (
          <div className="h-full w-full" style={{ background: "radial-gradient(60% 45% at 18% 12%,rgba(195,154,85,.38),transparent 70%),radial-gradient(40% 35% at 85% 22%,rgba(195,154,85,.24),transparent 70%),linear-gradient(160deg,#513522,#191714 62%,#10100E)" }}>
            <div className="grain h-full w-full opacity-70" />
          </div>
        )}
      </motion.div>
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/70 to-ink/40" />

      <div className="mx-auto w-full max-w-7xl">
        <h1 className="font-serif text-[1.85rem] font-semibold uppercase leading-[1.08] min-[400px]:text-[2.2rem] sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl">
          <Lines lines={["Onde a tradição", "goiana encontra", "bons momentos."]} />
        </h1>
        <Reveal delay={0.5} className="mt-8 max-w-xl">
          <p className="text-lg leading-relaxed text-sand">
            Comida saborosa, ambiente sertanejo e experiências para compartilhar. Conheça o Butinas Bar.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Btn href="#cardapio">Conhecer o cardápio</Btn>
            <Btn href="#sobre" variant="line">Conhecer o Butinas</Btn>
          </div>
        </Reveal>
      </div>

      <a href="#sobre" aria-label="Rolar para a próxima seção" className="absolute bottom-6 left-1/2 flex h-12 w-8 -translate-x-1/2 justify-center">
        <span className="relative block h-full w-px bg-gold/40">
          <motion.span className="absolute -left-[2px] top-0 block h-[5px] w-[5px] rounded-full bg-gold" animate={calm ? undefined : { y: [0, 38, 0] }} transition={{ repeat: Infinity, duration: 2.4, ease: "easeInOut" }} />
        </span>
      </a>
    </section>
  );
}
