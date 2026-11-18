import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { gallery } from "../data/site";
import { Photo, Section, Title } from "./ui";

export function Gallery() {
  const [i, setI] = useState<number | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const n = gallery.length;
  const open = i !== null;
  const go = (d: number) => setI((v) => (v === null ? v : (v + d + n) % n));

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const k = (e: KeyboardEvent) => {
      if (e.key === "Escape") setI(null);
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", k);
    return () => { window.removeEventListener("keydown", k); document.body.style.overflow = ""; };
  }, [open]);

  const cur = i === null ? null : gallery[i];
  return (
    <Section id="galeria">
      <Title text="O clima do Butinas, em imagens." />
      <div className="mt-12 grid auto-rows-[150px] grid-flow-dense grid-cols-2 gap-3 sm:auto-rows-[200px] md:auto-rows-[230px] md:grid-cols-4">
        {gallery.map((g, idx) => (
          <button key={idx} onClick={() => setI(idx)} aria-label={`Ampliar foto: ${g.label}`} className={`block h-full w-full text-left ${g.span}`}>
            <Photo src={g.src} alt={g.alt} label={`Foto demonstrativa — ${g.label}`} className="h-full w-full" />
          </button>
        ))}
      </div>

      <AnimatePresence>
        {cur && (
          <motion.div
            role="dialog" aria-modal="true" aria-label={cur.label}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/95 p-4"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setI(null)}
          >
            <button ref={closeRef} aria-label="Fechar" onClick={() => setI(null)} className="absolute right-4 top-4 flex h-12 w-12 items-center justify-center text-cream hover:text-gold"><X /></button>
            <button aria-label="Foto anterior" onClick={(e) => { e.stopPropagation(); go(-1); }} className="absolute left-2 flex h-12 w-12 items-center justify-center text-cream hover:text-gold"><ChevronLeft size={32} /></button>
            <button aria-label="Próxima foto" onClick={(e) => { e.stopPropagation(); go(1); }} className="absolute right-2 flex h-12 w-12 items-center justify-center text-cream hover:text-gold"><ChevronRight size={32} /></button>
            <div onClick={(e) => e.stopPropagation()} className="max-h-[85vh] max-w-[calc(100vw-7rem)]">
              {cur.src ? (
                <img src={cur.src} alt={cur.alt} className="max-h-[85vh] max-w-full object-contain" />
              ) : (
                <Photo src="" alt={cur.alt} reveal={false} label={`Foto demonstrativa — ${cur.label}`} className="aspect-[4/3] w-[min(80vw,900px)]" />
              )}
              <p className="mt-3 text-center text-sm text-sand">{cur.label}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
}
