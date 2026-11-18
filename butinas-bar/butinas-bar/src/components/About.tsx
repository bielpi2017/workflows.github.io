import { Music, Smile, TreePine, Users, Utensils } from "lucide-react";
import { site } from "../data/site";
import { Btn, Photo, Reveal, Section, Title } from "./ui";

const points = [
  { icon: TreePine, text: "Ambiente rústico e temático" },
  { icon: Utensils, text: "Gastronomia com inspiração regional" },
  { icon: Music, text: "Música ao vivo" },
  { icon: Users, text: "Espaço para reunir amigos e família" },
  { icon: Smile, text: "Experiência descontraída" },
];

export function About() {
  return (
    <Section id="sobre" className="overflow-hidden">
      <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <div className="relative">
          <Photo src={site.images.about} alt="Ambiente rústico do Butinas Bar" label="Foto demonstrativa — ambiente" parallax className="aspect-[4/5] w-full" />
          <div aria-hidden className="absolute -bottom-4 -right-4 -z-10 hidden h-full w-full border border-gold/50 sm:block" />
        </div>
        <div>
          <Title text="Muito mais que um bar. Um lugar para viver bons momentos." />
          <Reveal delay={0.2}>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-sand">
              O Butinas Bar nasceu da identidade sertaneja: madeira, luz quente e um ambiente temático pensado para você ficar à vontade.
              Aqui a boa comida de inspiração regional encontra a música ao vivo e a mesa cheia de gente querida.
            </p>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2">
              {points.map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-center gap-3 text-cream">
                  <Icon className="shrink-0 text-gold" size={22} aria-hidden /> {text}
                </li>
              ))}
            </ul>
            <div className="mt-10"><Btn href="#cardapio" variant="line">Ver o cardápio</Btn></div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
