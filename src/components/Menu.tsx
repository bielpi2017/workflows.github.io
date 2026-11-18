import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { categories, menu } from "../data/site";
import { Photo, Reveal, Section, Title, ease } from "./ui";

const tabs = [{ id: "todos", label: "Todos" }, ...categories];

export function Menu() {
  const [cat, setCat] = useState("todos");
  const list = cat === "todos" ? menu : menu.filter((m) => m.category === cat);

  return (
    <Section id="cardapio" className="bg-coal">
      <Title text="Sabores que fazem parte da experiência." />
      <Reveal delay={0.2}>
        <p className="mt-8 max-w-xl text-lg leading-relaxed text-sand">Escolha uma categoria e explore o cardápio do Butinas.</p>
        {menu.some((m) => m.demo) && (
          <p className="mt-4 max-w-xl border-l-2 border-gold pl-4 text-sm text-sand/80">
            Conteúdo demonstrativo: nomes, fotos e preços serão substituídos pelo cardápio oficial da casa.
          </p>
        )}
      </Reveal>

      <div role="tablist" aria-label="Categorias do cardápio" className="-mx-5 mt-10 flex gap-2 overflow-x-auto px-5 pb-2 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:px-0">
        {tabs.map((t) => (
          <button
            key={t.id} role="tab" id={`tab-${t.id}`} aria-selected={cat === t.id} aria-controls="menu-panel"
            onClick={() => setCat(t.id)}
            className={`min-h-[44px] shrink-0 whitespace-nowrap rounded-sm border px-5 text-sm transition-colors ${cat === t.id ? "border-gold bg-gold font-semibold text-ink" : "border-gold/40 text-sand hover:border-gold"}`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div id="menu-panel" role="tabpanel" aria-labelledby={`tab-${cat}`} className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {list.map((m) => (
            <motion.article
              layout key={m.id}
              initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.45, ease }}
            >
              <div className="h-full border border-gold/20 bg-ink transition duration-300 hover:-translate-y-1 hover:border-gold/60 hover:shadow-2xl hover:shadow-black/50">
                <Photo src={m.image} alt={m.name} reveal={false} label="Foto demonstrativa" className="aspect-[4/3] w-full" />
                <div className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="font-serif text-xl text-cream">{m.name}</h3>
                    <span className="shrink-0 text-sm font-semibold text-gold">{m.price || "Preço a confirmar"}</span>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-sand/80">{m.description}</p>
                  {m.demo && <span className="mt-4 inline-block border border-gold/40 px-2 py-0.5 text-xs text-gold">Demonstrativo</span>}
                </div>
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </div>
    </Section>
  );
}
