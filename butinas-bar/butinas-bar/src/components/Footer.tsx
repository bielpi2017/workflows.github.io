import { Instagram, MapPin, MessageCircle } from "lucide-react";
import { links, nav, site } from "../data/site";
import { Logo } from "./ui";

const more = [...nav, { href: "#experiencia", label: "Música e eventos" }, { href: "#localizacao", label: "Localização" }];

export function Footer() {
  const a = "inline-flex min-h-[44px] items-center gap-2 text-sand/80 transition-colors hover:text-gold";
  return (
    <footer className="border-t border-gold/20 bg-coal px-5 pb-24 pt-16 sm:px-8 md:pb-10">
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-4">
        <div className="md:col-span-2">
          <Logo />
          <p className="mt-4 max-w-sm leading-relaxed text-sand/80">Bar de identidade sertaneja em Goiânia: ambiente rústico, boa comida e música ao vivo.</p>
        </div>
        <nav aria-label="Rodapé">
          <ul>{more.map((n) => <li key={n.href}><a href={n.href} className={a}>{n.label}</a></li>)}</ul>
        </nav>
        <ul>
          {links.whatsapp && <li><a href={links.whatsapp} target="_blank" rel="noopener noreferrer" className={a}><MessageCircle size={18} aria-hidden /> WhatsApp</a></li>}
          <li><a href={links.instagram} target="_blank" rel="noopener noreferrer" className={a}><Instagram size={18} aria-hidden /> @{site.instagram}</a></li>
          <li><a href={links.maps} target="_blank" rel="noopener noreferrer" className={a}><MapPin size={18} aria-hidden /> {site.neighborhood}, {site.city}</a></li>
        </ul>
      </div>
      <p className="mx-auto mt-12 max-w-7xl border-t border-gold/10 pt-6 text-sm text-sand/60">© {new Date().getFullYear()} Butinas Bar. Todos os direitos reservados.</p>
    </footer>
  );
}

/** Botão flutuante (só no mobile): WhatsApp se configurado, senão Instagram */
export function FloatingCTA() {
  const Icon = links.whatsapp ? MessageCircle : Instagram;
  return (
    <a
      href={links.whatsapp ?? links.instagram} target="_blank" rel="noopener noreferrer"
      aria-label={links.whatsapp ? "Falar no WhatsApp" : "Abrir o Instagram do Butinas Bar"}
      style={{ marginBottom: "env(safe-area-inset-bottom)" }}
      className="fixed bottom-4 right-4 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-gold text-ink shadow-xl shadow-black/50 md:hidden"
    >
      <Icon aria-hidden />
    </a>
  );
}
