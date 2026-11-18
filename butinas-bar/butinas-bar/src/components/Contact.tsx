import { Instagram, MapPin, MessageCircle, Navigation } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { links, site } from "../data/site";
import { Btn, Lines, Magnetic, Reveal, Section, Title } from "./ui";

type Channel = { href: string; label: string; sub: string; icon: LucideIcon };

export function Contact() {
  const channels: Channel[] = [
    ...(links.whatsapp ? [{ href: links.whatsapp, label: "WhatsApp", sub: "Fale com a gente", icon: MessageCircle }] : []),
    { href: links.instagram, label: "Instagram", sub: `@${site.instagram}`, icon: Instagram },
    { href: links.maps, label: "Google Maps", sub: "Ver no mapa", icon: MapPin },
  ];
  return (
    <Section id="contato">
      <Title text="Vem conhecer o Butinas!" />
      <Reveal delay={0.2} className="mt-12 grid gap-5 md:grid-cols-3">
        {channels.map(({ href, label, sub, icon: Icon }) => (
          <Magnetic key={label} className="block">
            <a href={href} target="_blank" rel="noopener noreferrer" className="group flex min-h-[110px] items-center gap-5 border border-gold/40 p-7 transition-colors duration-300 hover:bg-gold hover:text-ink">
              <Icon size={36} className="shrink-0 text-gold transition-colors group-hover:text-ink" aria-hidden />
              <span>
                <span className="block font-serif text-2xl">{label}</span>
                <span className="block text-sm text-sand/80 group-hover:text-ink/80">{sub}</span>
              </span>
            </a>
          </Magnetic>
        ))}
      </Reveal>
    </Section>
  );
}

export function Location() {
  return (
    <Section id="localizacao" className="bg-coal">
      <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.3fr]">
        <div>
          <Title text={`Estamos no bairro ${site.neighborhood}, em Goiânia.`} />
          <Reveal delay={0.2}>
            <address className="mt-8 flex items-start gap-3 text-lg not-italic leading-relaxed text-sand">
              <MapPin className="mt-1 shrink-0 text-gold" aria-hidden /> {site.address}
            </address>
            {site.hours && <p className="mt-4 text-sand">{site.hours}</p>}
            <div className="mt-8"><Btn href={links.directions} icon={Navigation}>Como chegar</Btn></div>
          </Reveal>
        </div>
        <Reveal delay={0.1}>
          <iframe title="Mapa do Butinas Bar no Google Maps" src={links.embed} loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="aspect-[4/3] w-full border border-gold/30 grayscale-[.5]" />
        </Reveal>
      </div>
    </Section>
  );
}

export function FinalCTA() {
  return (
    <section className="relative isolate overflow-hidden px-5 py-24 text-center sm:px-8 md:py-36">
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-b from-wood/60 to-ink"><div className="grain h-full w-full opacity-60" /></div>
      <h2 className="mx-auto max-w-4xl font-serif text-3xl font-semibold uppercase leading-[1.12] sm:text-4xl lg:text-6xl">
        <Lines lines={["Boa comida, boa companhia e momentos que merecem ser vividos."]} />
      </h2>
      <Reveal delay={0.3} className="mt-10"><Btn href="#contato">Conheça o Butinas Bar</Btn></Reveal>
    </section>
  );
}
