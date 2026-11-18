import { Instagram, Music } from "lucide-react";
import { events, links, site } from "../data/site";
import { Btn, Photo, Reveal, Section, Title } from "./ui";

export function Experience() {
  return (
    <Section id="experiencia" className="bg-coal">
      <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
        <div>
          <Title text="Seu próximo momento especial começa aqui." />
          <Reveal delay={0.2}>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-sand">
              Música ao vivo, mesa cheia e o clima sertanejo que dá identidade ao Butinas. Acompanhe a programação e os eventos da casa.
            </p>
            <div className="mt-8 grid grid-cols-2 gap-4">
              {site.images.music.map((src, k) => (
                <Photo key={k} src={src} alt="Apresentação musical no Butinas Bar" label="Foto demonstrativa — apresentação" className="aspect-[3/4]" />
              ))}
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="self-start">
          <h3 className="flex items-center gap-3 font-serif text-2xl text-cream"><Music className="text-gold" aria-hidden /> Agenda de apresentações</h3>
          {events.length ? (
            <ul className="mt-6 divide-y divide-gold/20 border-y border-gold/20">
              {events.map((e) => (
                <li key={e.date + e.title} className="py-5">
                  <p className="text-sm font-semibold text-gold">{e.date}</p>
                  <p className="mt-1 font-serif text-xl text-cream">{e.title}</p>
                  {e.description && <p className="mt-1 text-sm text-sand/80">{e.description}</p>}
                </li>
              ))}
            </ul>
          ) : (
            <div className="mt-6 border border-gold/30 p-8">
              <p className="leading-relaxed text-sand">
                A agenda de apresentações e eventos especiais será divulgada aqui. Enquanto isso, acompanhe a programação no Instagram do Butinas.
              </p>
              <div className="mt-6"><Btn href={links.instagram} icon={Instagram} variant="line">Ver programação</Btn></div>
            </div>
          )}
        </Reveal>
      </div>
    </Section>
  );
}
