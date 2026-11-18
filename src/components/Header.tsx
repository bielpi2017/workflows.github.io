import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu as MenuIcon, X } from "lucide-react";
import { nav } from "../data/site";
import { Btn, Logo, ease } from "./ui";

export function Header() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const f = () => setSolid(window.scrollY > 40);
    f();
    window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const k = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, [open]);

  return (
    <header className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-500 ${solid || open ? "border-gold/20 bg-ink/95 backdrop-blur" : "border-transparent bg-transparent"}`}>
      <nav aria-label="Principal" className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 sm:px-8">
        <a href="#inicio" aria-label="Butinas Bar — início"><Logo /></a>
        <ul className="hidden items-center gap-8 lg:flex">
          {nav.map((n) => (
            <li key={n.href}>
              <a href={n.href} className="text-sm uppercase tracking-[.14em] text-sand transition-colors hover:text-gold">{n.label}</a>
            </li>
          ))}
        </ul>
        <div className="hidden lg:block"><Btn href="#sobre">Conheça o Butinas</Btn></div>
        <button
          className="flex h-12 w-12 items-center justify-center text-cream lg:hidden"
          aria-label={open ? "Fechar menu" : "Abrir menu"} aria-expanded={open} aria-controls="menu-mobile"
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <MenuIcon />}
        </button>
      </nav>
      <AnimatePresence>
        {open && (
          <motion.div
            id="menu-mobile"
            className="fixed inset-0 -z-10 flex flex-col justify-center gap-2 bg-ink px-8 pt-20"
            initial={{ clipPath: "inset(0 0 100% 0)" }} animate={{ clipPath: "inset(0 0 0% 0)" }} exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.6, ease }}
          >
            {nav.map((n, i) => (
              <motion.a
                key={n.href} href={n.href} onClick={() => setOpen(false)}
                initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 + i * 0.07, duration: 0.6, ease }}
                className="border-b border-gold/20 py-4 font-serif text-3xl text-cream hover:text-gold"
              >
                {n.label}
              </motion.a>
            ))}
            <div className="mt-6" onClick={() => setOpen(false)}><Btn href="#sobre">Conheça o Butinas</Btn></div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
