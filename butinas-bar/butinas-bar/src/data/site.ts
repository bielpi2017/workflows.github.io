/**
 * ÚNICO ARQUIVO DE CONTEÚDO DO SITE.
 * Edite aqui: contatos, imagens, cardápio, galeria e agenda.
 * Fotos: coloque os arquivos em /public/images e use o caminho, ex.: "/images/hero.jpg".
 * Campos vazios ("") mostram um espaço demonstrativo identificado na tela.
 */
export const site = {
  name: "Butinas Bar",
  city: "Goiânia, GO",
  neighborhood: "Capuava",
  address: "Av. Anhanguera, bairro Capuava — Goiânia, GO", // TODO: incluir número/complemento oficial
  mapsQuery: "Butinas Bar, Av. Anhanguera, Capuava, Goiânia, GO",
  whatsapp: "", // TODO: número oficial confirmado pela casa — 55 + DDD + número, só dígitos
  whatsappMessage: "Olá! Vim pelo site e gostaria de falar com o Butinas Bar.",
  instagram: "butinasbar",
  hours: "", // TODO: horários oficiais (aparece na seção Localização quando preenchido)
  images: { hero: "", about: "", music: ["", ""] as string[] },
};

export const links = {
  whatsapp: site.whatsapp ? `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(site.whatsappMessage)}` : null,
  instagram: `https://www.instagram.com/${site.instagram}/`,
  maps: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.mapsQuery)}`,
  directions: `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(site.mapsQuery)}`,
  embed: `https://www.google.com/maps?q=${encodeURIComponent(site.mapsQuery)}&output=embed`,
};

export const nav = [
  { href: "#inicio", label: "Início" },
  { href: "#sobre", label: "Sobre nós" },
  { href: "#cardapio", label: "Cardápio" },
  { href: "#galeria", label: "Galeria" },
  { href: "#contato", label: "Contato" },
];

export interface MenuItem { id: string; category: string; name: string; description: string; price: string; image: string; demo?: boolean }
export const categories = [
  { id: "petiscos", label: "Petiscos e porções" },
  { id: "brasa", label: "Carnes e pratos na brasa" },
  { id: "panelinhas", label: "Panelinhas" },
  { id: "caldos", label: "Caldos" },
  { id: "feijoada", label: "Feijoada" },
  { id: "bebidas", label: "Bebidas não alcoólicas" },
];

/**
 * CARDÁPIO — conteúdo DEMONSTRATIVO até o cardápio oficial ser enviado.
 * Para cada item real, use o formato (e remova "demo: true"):
 * { id: "x1", category: "petiscos", name: "Nome", description: "Descrição curta", price: "R$ 00,00", image: "/images/x1.jpg" }
 * Deixe price: "" para exibir "Preço a confirmar".
 */
const demo = (category: string, n: number): MenuItem => ({
  id: `${category}-${n}`, category, name: "Item demonstrativo",
  description: "Descrição curta do item. Substitua pelo prato oficial do cardápio.", price: "", image: "", demo: true,
});
export const menu: MenuItem[] = categories.flatMap((c) => [1, 2].map((n) => demo(c.id, n)));

export interface GalleryItem { src: string; alt: string; label: string; span: string }
export const gallery: GalleryItem[] = [
  { src: "", alt: "Ambiente interno do Butinas Bar", label: "Ambiente interno", span: "col-span-2 row-span-2" },
  { src: "", alt: "Decoração rústica do Butinas Bar", label: "Decoração rústica", span: "" },
  { src: "", alt: "Espaço do Butinas Bar", label: "Espaços", span: "row-span-2" },
  { src: "", alt: "Prato servido no Butinas Bar", label: "Gastronomia", span: "" },
  { src: "", alt: "Apresentação musical no Butinas Bar", label: "Apresentações musicais", span: "col-span-2" },
  { src: "", alt: "Detalhe da decoração em madeira", label: "Detalhes", span: "" },
  { src: "", alt: "Mesas do Butinas Bar", label: "Ambiente", span: "" },
];

export interface EventItem { date: string; title: string; description?: string }
/** AGENDA — adicione apresentações reais: { date: "Sáb · 20h", title: "Nome da atração", description: "Opcional" } */
export const events: EventItem[] = [];
