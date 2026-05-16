import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  Phone,
  MapPin,
  Clock,
  Instagram,
  Facebook,
  Star,
  Sparkles,
  Menu,
  X,
  ArrowUpRight,
} from "lucide-react";

import hero from "@/assets/hero.jpeg";
import sKos from "@/assets/service-kosmetologia.jpg";
import sMed from "@/assets/service-medycyna.jpg";
import sMas from "@/assets/service-masaze.jpg";
import sLas from "@/assets/service-laser.jpg";
import g1 from "@/assets/g1.jpeg";
import g2 from "@/assets/g2.jpeg";
import g3 from "@/assets/g3.jpeg";
import g4 from "@/assets/g4.jpeg";
import g5 from "@/assets/g5.jpeg";
import g6 from "@/assets/g6.jpeg";

const BOOKSY =
  "https://booksy.com/pl-pl/95281_devi-beauty_salon-kosmetyczny_3_warszawa#ba_s=seo";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Devi Beauty — Salon Kosmetyczny Warszawa, Praga-Południe" },
      {
        name: "description",
        content:
          "Devi Beauty to butikowy salon kosmetyczny na warszawskiej Saskiej Kępie. Kosmetologia, medycyna estetyczna, masaże, depilacja laserowa. Rezerwuj online.",
      },
      { property: "og:title", content: "Devi Beauty — Salon Kosmetyczny Warszawa" },
      {
        property: "og:description",
        content:
          "Piękno, które podkreśla Twoją naturalność. Zabiegi kosmetologiczne i medycyny estetycznej w sercu Saskiej Kępy.",
      },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BeautySalon",
          name: "Devi Beauty",
          image: "/og.jpg",
          telephone: "+48 518 917 372",
          address: {
            "@type": "PostalAddress",
            streetAddress: "Paryska 19/21 lok. 33",
            postalCode: "03-945",
            addressLocality: "Warszawa",
            addressCountry: "PL",
          },
          url: "/",
          priceRange: "$$",
          openingHoursSpecification: [
            {
              "@type": "OpeningHoursSpecification",
              dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
              opens: "10:00",
              closes: "21:00",
            },
          ],
        }),
      },
    ],
  }),
  component: Home,
});

const sections = [
  { id: "o-nas", label: "O nas" },
  { id: "oferta", label: "Oferta" },
  { id: "rezerwacja", label: "Rezerwacja" },
  { id: "galeria", label: "Galeria" },
  { id: "opinie", label: "Opinie" },
  { id: "kontakt", label: "Kontakt" },
];

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            (e.target as HTMLElement).classList.add("animate-fade-up");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 },
    );
    el.querySelectorAll("[data-reveal]").forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, []);
  return ref;
}

function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/85 backdrop-blur-md border-b border-border/60"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:py-5">
        <a href="#top" className="flex items-baseline gap-2">
          <span className="font-display text-2xl md:text-3xl tracking-tight">Devi</span>
          <span className="text-[10px] tracking-luxury uppercase text-gold">Beauty</span>
        </a>
        <nav className="hidden md:flex items-center gap-8 text-sm">
          {sections.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="relative text-foreground/80 hover:text-foreground transition-colors after:absolute after:left-0 after:-bottom-1 after:h-px after:w-0 after:bg-gold hover:after:w-full after:transition-all"
            >
              {s.label}
            </a>
          ))}
        </nav>
        <a
          href={BOOKSY}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:inline-flex items-center gap-2 border border-gold/60 px-5 py-2.5 text-xs tracking-luxury uppercase text-foreground hover:bg-gold hover:text-accent-foreground transition-all"
        >
          Rezerwuj <ArrowUpRight size={14} />
        </a>
        <button
          aria-label="Menu"
          className="md:hidden text-foreground"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <div className="md:hidden border-t border-border/60 bg-background/95 backdrop-blur">
          <div className="flex flex-col px-6 py-6 gap-4">
            {sections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                onClick={() => setOpen(false)}
                className="text-foreground/80 hover:text-gold py-1"
              >
                {s.label}
              </a>
            ))}
            <a
              href={BOOKSY}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center justify-center gap-2 bg-gold text-accent-foreground px-5 py-3 text-xs tracking-luxury uppercase"
            >
              Zarezerwuj wizytę
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="relative min-h-[100svh] w-full overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={hero}
          alt="Wnętrze salonu Devi Beauty"
          width={1920}
          height={1280}
          className="h-full w-full object-cover animate-ken-burns"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/10 to-background/85" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-6xl flex-col items-center justify-center px-6 pt-24 text-center">
        <span
          className="mb-6 inline-flex items-center gap-3 text-[10px] tracking-luxury uppercase text-foreground/70 animate-fade-in"
          style={{ animationDelay: "120ms" }}
        >
          <span className="h-px w-8 bg-gold" />
          Warszawa · Saska Kępa
          <span className="h-px w-8 bg-gold" />
        </span>

        <h1 className="font-display text-6xl md:text-8xl lg:text-9xl leading-[0.95] animate-fade-up">
          Devi <em className="italic text-gradient-gold">Beauty</em>
        </h1>

        <p
          className="mt-8 max-w-xl text-base md:text-lg text-foreground/75 font-light animate-fade-up"
          style={{ animationDelay: "200ms" }}
        >
          Piękno, które podkreśla Twoją naturalność.
        </p>

        <div
          className="mt-12 flex flex-col sm:flex-row gap-3 animate-fade-up"
          style={{ animationDelay: "320ms" }}
        >
          <a
            href={BOOKSY}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center justify-center gap-2 bg-foreground text-background px-8 py-4 text-xs tracking-luxury uppercase hover:bg-gold hover:text-accent-foreground transition-all duration-500"
          >
            Zarezerwuj wizytę
            <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
          <a
            href="#oferta"
            className="inline-flex items-center justify-center gap-2 border border-foreground/30 px-8 py-4 text-xs tracking-luxury uppercase text-foreground hover:border-gold hover:text-gold transition-all duration-500"
          >
            Zobacz ofertę
          </a>
        </div>

        <div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-[10px] tracking-luxury uppercase text-foreground/50 animate-fade-in"
          style={{ animationDelay: "600ms" }}
        >
          <span className="block h-12 w-px bg-foreground/30 mx-auto mb-3" />
          przewiń
        </div>
      </div>
    </section>
  );
}

function SectionHeading({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <div className="max-w-2xl" data-reveal>
      <span className="inline-flex items-center gap-3 text-[10px] tracking-luxury uppercase text-gold">
        <span className="h-px w-8 bg-gold" />
        {eyebrow}
      </span>
      <h2 className="mt-5 font-display text-4xl md:text-6xl leading-[1.05]">{title}</h2>
      {children && <p className="mt-6 text-foreground/70 leading-relaxed">{children}</p>}
    </div>
  );
}

function About() {
  const ref = useReveal();
  return (
    <section id="o-nas" ref={ref} className="relative py-28 md:py-40 px-6">
      <div className="mx-auto max-w-7xl grid md:grid-cols-12 gap-12 md:gap-20 items-center">
        <div className="md:col-span-7">
          <SectionHeading
            eyebrow="O nas"
            title={
              <>
                Butikowe miejsce
                <br />
                <em className="italic text-gradient-gold">pełne troski</em>
              </>
            }
          >
            Devi Beauty to kameralna przestrzeń na warszawskiej Saskiej Kępie, w której
            łączymy nowoczesną kosmetologię, medycynę estetyczną i sztukę relaksu.
            Pracujemy na sprawdzonych technologiach i markach, a każdy zabieg
            poprzedzamy szczerą rozmową i analizą Twoich potrzeb.
          </SectionHeading>

          <div className="mt-12 grid sm:grid-cols-3 gap-8" data-reveal>
            {[
              { n: "5+", l: "Lat doświadczenia" },
              { n: "4.9★", l: "281 opinii w Booksy" },
              { n: "60+", l: "Autorskich zabiegów" },
            ].map((s) => (
              <div key={s.l} className="border-t border-border pt-5">
                <div className="font-display text-4xl text-gradient-gold">{s.n}</div>
                <div className="mt-2 text-xs tracking-luxury uppercase text-muted-foreground">
                  {s.l}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="md:col-span-5 relative" data-reveal>
          <div className="relative aspect-[4/5] overflow-hidden">
            <img
              src={g4}
              alt="Gabinet Devi Beauty"
              width={1024}
              height={1280}
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="absolute -bottom-8 -left-8 hidden md:block aspect-square w-40 overflow-hidden border-8 border-background">
            <img
              src={g6}
              alt="Detal kwiatowy"
              width={1024}
              height={1024}
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="absolute -top-6 -right-6 hidden md:flex h-28 w-28 items-center justify-center rounded-full bg-gold/90 text-accent-foreground">
            <div className="text-center">
              <Sparkles size={18} className="mx-auto" />
              <div className="mt-1 text-[9px] tracking-luxury uppercase">Premium care</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

type Service = {
  title: string;
  desc: string;
  items: string[];
  from: string;
  img: string;
};

const services: Service[] = [
  {
    title: "Kosmetologia",
    desc: "Pielęgnacja, oczyszczanie i terapie kwasami dopasowane do potrzeb skóry.",
    items: [
      "Oczyszczanie wodorowe",
      "Oczyszczanie manualne",
      "Mikrodermabrazja + infuzja tlenowa",
      "AzAc Peel Therapy",
      "Karboksyterapia bezigłowa",
      "Eksfoliacja kwasami",
      "Biorepeel / PRX-T33",
      "PQ AGE peeling",
      "Kwas ferulowy, retinol wektorowy",
    ],
    from: "od 250 zł",
    img: sKos,
  },
  {
    title: "Medycyna estetyczna",
    desc: "Mezoterapia, radiofrekwencja mikroigłowa i autorskie protokoły rewitalizacji.",
    items: [
      "Dermapen + infuzja tlenowa",
      "Radiofrekwencja Mikroigłowa",
      "Dr.Cyj",
      "Mezoterapia Pink Glow",
      "Dark Circle Solution",
      "Mezoterapia Acneout Therapy",
      "Aquashine, Lipoliza",
      "Mezoterapia skóry głowy",
    ],
    from: "od 370 zł",
    img: sMed,
  },
  {
    title: "Masaże",
    desc: "Klasyczne, lecznicze i rytualne — z myślą o ciele i głowie.",
    items: [
      "Masaż klasyczny",
      "Masaż Kobido",
      "Masaż sportowy",
      "Drenaż limfatyczny",
      "Masaż gorącymi kamieniami",
      "Masaż bańką chińską",
      "Masaż relaksacyjny",
      "Masaż stóp i głowy",
    ],
    from: "od 100 zł",
    img: sMas,
  },
  {
    title: "Epilacja laserowa Vectus",
    desc: "Skuteczna, bezpieczna depilacja laserowa — wszystkie partie ciała.",
    items: [
      "Pachy, bikini, nogi",
      "Całe ciało",
      "Twarz: górna warga, broda, baki",
      "Plecy, tors, brzuch, kark",
      "Pakiety: nogi + bikini brazylijskie",
    ],
    from: "od 50 zł",
    img: sLas,
  },
  {
    title: "Stymulatory tkankowe",
    desc: "Profhilo, Sunekos, Nucleofill, Jalupro — głębokie nawilżenie i biostymulacja.",
    items: [
      "Profhilo",
      "Sunekos 200 / 1200",
      "Nucleofill medium / strong",
      "Jalupro Classic / HMW",
      "Biorej",
      "Xela Rederm pod oczy",
    ],
    from: "od 750 zł",
    img: g2,
  },
  {
    title: "Modelowanie ust",
    desc: "Naturalne, harmonijne efekty z użyciem certyfikowanych preparatów.",
    items: [
      "Apriline",
      "Juvederm Ultra 3",
      "Juvederm Ultra Smile",
      "Stylage M / Stylage S",
    ],
    from: "od 800 zł",
    img: g3,
  },
];

function Services() {
  const ref = useReveal();
  return (
    <section id="oferta" ref={ref} className="bg-cream py-28 md:py-40 px-6">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <SectionHeading
            eyebrow="Oferta"
            title={
              <>
                Zabiegi szyte
                <br />
                <em className="italic text-gradient-gold">na miarę</em>
              </>
            }
          >
            Pełna oferta i aktualne ceny dostępne są w Booksy. Poniżej najczęściej
            wybierane kategorie naszych zabiegów.
          </SectionHeading>
          <a
            href={BOOKSY}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs tracking-luxury uppercase text-foreground hover:text-gold transition-colors"
            data-reveal
          >
            Pełny cennik <ArrowUpRight size={14} />
          </a>
        </div>

        <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {services.map((s, i) => (
            <article
              key={s.title}
              data-reveal
              style={{ animationDelay: `${i * 80}ms` }}
              className="group hover-lift bg-background border border-border/70 overflow-hidden flex flex-col"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={s.img}
                  alt={s.title}
                  width={1024}
                  height={768}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-110"
                />
                <div className="absolute top-4 left-4 bg-background/85 backdrop-blur px-3 py-1 text-[10px] tracking-luxury uppercase text-gold">
                  {s.from}
                </div>
              </div>
              <div className="p-7 flex flex-col flex-1">
                <h3 className="font-display text-2xl">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                <ul className="mt-5 space-y-1.5 text-sm text-foreground/80">
                  {s.items.slice(0, 5).map((it) => (
                    <li key={it} className="flex gap-2">
                      <span className="text-gold mt-1.5 h-1 w-1 rounded-full bg-gold flex-shrink-0" />
                      {it}
                    </li>
                  ))}
                </ul>
                <a
                  href={BOOKSY}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center gap-2 text-xs tracking-luxury uppercase text-foreground/80 hover:text-gold transition-colors self-start"
                >
                  Umów <ArrowUpRight size={14} />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Booking() {
  const ref = useReveal();
  return (
    <section
      id="rezerwacja"
      ref={ref}
      className="relative py-28 md:py-40 px-6 overflow-hidden bg-foreground text-background"
    >
      <div className="absolute inset-0 opacity-25">
        <img
          src={g4}
          alt=""
          width={1024}
          height={1280}
          loading="lazy"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-foreground/70" />
      </div>
      <div className="relative mx-auto max-w-3xl text-center" data-reveal>
        <span className="inline-flex items-center gap-3 text-[10px] tracking-luxury uppercase text-gold-soft">
          <span className="h-px w-8 bg-gold" />
          Rezerwacja online
          <span className="h-px w-8 bg-gold" />
        </span>
        <h2 className="mt-6 font-display text-4xl md:text-6xl leading-[1.05]">
          Zarezerwuj swój moment <em className="italic text-gradient-gold">piękna</em>
        </h2>
        <p className="mt-6 text-background/75 font-light">
          Wybierz wygodny termin w Booksy — potwierdzenie otrzymasz natychmiast.
        </p>
        <a
          href={BOOKSY}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-10 inline-flex items-center gap-3 bg-gold text-accent-foreground px-10 py-5 text-xs tracking-luxury uppercase hover:bg-background hover:text-foreground transition-all duration-500"
        >
          Umów wizytę online <ArrowUpRight size={16} />
        </a>
      </div>
    </section>
  );
}

function Gallery() {
  const ref = useReveal();
  const items = [
    { src: g1, h: "row-span-2" },
    { src: g3, h: "" },
    { src: g2, h: "" },
    { src: g4, h: "row-span-2" },
    { src: g5, h: "" },
    { src: g6, h: "" },
  ];
  return (
    <section id="galeria" ref={ref} className="py-28 md:py-40 px-6">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Galeria"
          title={
            <>
              Atmosfera <em className="italic text-gradient-gold">Devi</em>
            </>
          }
        >
          Zerknij do naszego świata — wnętrza, detale i efekty zabiegów.
        </SectionHeading>

        <div
          className="mt-14 grid grid-cols-2 md:grid-cols-4 auto-rows-[180px] md:auto-rows-[220px] gap-3 md:gap-4"
          data-reveal
        >
          {items.map((it, i) => (
            <div
              key={i}
              className={`relative overflow-hidden group ${it.h}`}
            >
              <img
                src={it.src}
                alt={`Devi Beauty ${i + 1}`}
                width={1024}
                height={1280}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-[1500ms] group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/15 transition-colors" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const reviews = [
  {
    name: "Anna K.",
    text: "Najlepszy salon na Saskiej Kępie. Profesjonalizm, świetna atmosfera i widoczne efekty już po pierwszym zabiegu. Polecam całym sercem!",
  },
  {
    name: "Karolina M.",
    text: "Byłam na oczyszczaniu wodorowym — moja skóra wygląda obłędnie. Pani kosmetolog wyjaśniła każdy krok i dobrała pielęgnację idealnie pod moje potrzeby.",
  },
  {
    name: "Magdalena P.",
    text: "Masaż Kobido to coś niesamowitego. Atmosfera salonu otula od progu, dbałość o detal czuć w każdej minucie wizyty.",
  },
  {
    name: "Joanna W.",
    text: "Profhilo wykonane perfekcyjnie, bez bólu, z pełną wiedzą i kulturą. Skóra promienieje już 2 miesiąc.",
  },
  {
    name: "Beata S.",
    text: "Wracam regularnie na depilację laserową Vectus — szybko, skutecznie, bez dyskomfortu. Dziękuję!",
  },
  {
    name: "Natalia R.",
    text: "Indywidualne podejście, świetna konsultacja i piękne wnętrze. Czuję się tu zaopiekowana.",
  },
];

function Reviews() {
  const ref = useReveal();
  return (
    <section id="opinie" ref={ref} className="bg-cream py-28 md:py-40 px-6">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Opinie"
          title={
            <>
              4.9★ z 281 opinii <em className="italic text-gradient-gold">w Booksy</em>
            </>
          }
        >
          Najcenniejsze są dla nas powracające Klientki — dziękujemy za zaufanie.
        </SectionHeading>

        <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((r, i) => (
            <figure
              key={i}
              data-reveal
              style={{ animationDelay: `${i * 70}ms` }}
              className="bg-background p-8 border border-border/70 hover-lift flex flex-col"
            >
              <div className="flex gap-0.5 text-gold">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star key={j} size={14} fill="currentColor" strokeWidth={0} />
                ))}
              </div>
              <blockquote className="mt-5 font-display italic text-lg leading-relaxed text-foreground/85">
                „{r.text}"
              </blockquote>
              <figcaption className="mt-6 pt-5 border-t border-border text-xs tracking-luxury uppercase text-muted-foreground">
                {r.name}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

const hours = [
  ["Poniedziałek", "10:00 – 21:00"],
  ["Wtorek", "10:00 – 21:00"],
  ["Środa", "10:00 – 21:00"],
  ["Czwartek", "10:00 – 21:00"],
  ["Piątek", "10:00 – 21:00"],
  ["Sobota", "10:00 – 21:00"],
  ["Niedziela", "Zamknięte"],
];

function Contact() {
  const ref = useReveal();
  return (
    <section id="kontakt" ref={ref} className="py-28 md:py-40 px-6">
      <div className="mx-auto max-w-7xl grid lg:grid-cols-12 gap-12 lg:gap-16">
        <div className="lg:col-span-5">
          <SectionHeading
            eyebrow="Kontakt"
            title={
              <>
                Zapraszamy na
                <br />
                <em className="italic text-gradient-gold">Saską Kępę</em>
              </>
            }
          />

          <div className="mt-12 space-y-8" data-reveal>
            <div className="flex gap-5">
              <div className="flex-shrink-0 h-10 w-10 border border-gold/60 flex items-center justify-center text-gold">
                <MapPin size={16} />
              </div>
              <div>
                <div className="text-[10px] tracking-luxury uppercase text-muted-foreground">
                  Adres
                </div>
                <div className="mt-1 font-display text-xl">
                  Paryska 19/21 lok. 33
                  <br />
                  03-945 Warszawa
                </div>
              </div>
            </div>

            <a href="tel:+48518917372" className="flex gap-5 group">
              <div className="flex-shrink-0 h-10 w-10 border border-gold/60 flex items-center justify-center text-gold">
                <Phone size={16} />
              </div>
              <div>
                <div className="text-[10px] tracking-luxury uppercase text-muted-foreground">
                  Telefon
                </div>
                <div className="mt-1 font-display text-xl group-hover:text-gold transition-colors">
                  +48 518 917 372
                </div>
              </div>
            </a>

            <div className="flex gap-5">
              <div className="flex-shrink-0 h-10 w-10 border border-gold/60 flex items-center justify-center text-gold">
                <Clock size={16} />
              </div>
              <div className="w-full">
                <div className="text-[10px] tracking-luxury uppercase text-muted-foreground">
                  Godziny otwarcia
                </div>
                <dl className="mt-3 space-y-1.5 text-sm">
                  {hours.map(([d, h]) => (
                    <div
                      key={d}
                      className="flex justify-between border-b border-border/60 pb-1.5"
                    >
                      <dt className="text-foreground/80">{d}</dt>
                      <dd
                        className={
                          h === "Zamknięte" ? "text-muted-foreground" : "text-foreground"
                        }
                      >
                        {h}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <a
                href="https://www.instagram.com/devi.beauty.clinic/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="h-11 w-11 border border-border flex items-center justify-center hover:bg-gold hover:text-accent-foreground hover:border-gold transition-all"
              >
                <Instagram size={16} />
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=100069776438830"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="h-11 w-11 border border-border flex items-center justify-center hover:bg-gold hover:text-accent-foreground hover:border-gold transition-all"
              >
                <Facebook size={16} />
              </a>
              <a
                href={BOOKSY}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-auto inline-flex items-center gap-2 bg-foreground text-background px-6 py-3 text-xs tracking-luxury uppercase hover:bg-gold hover:text-accent-foreground transition-all"
              >
                Rezerwuj <ArrowUpRight size={14} />
              </a>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7" data-reveal>
          <div className="relative aspect-[4/5] lg:aspect-auto lg:h-full min-h-[500px] overflow-hidden border border-border">
            <iframe
              title="Mapa Devi Beauty"
              src="https://www.google.com/maps?q=Paryska+19%2F21%2C+03-945+Warszawa&output=embed"
              className="absolute inset-0 h-full w-full grayscale-[40%] contrast-[0.95]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-foreground text-background/80 px-6 pt-16 pb-10">
      <div className="mx-auto max-w-7xl">
        <div className="grid md:grid-cols-3 gap-10 pb-12 border-b border-background/15">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="font-display text-3xl text-background">Devi</span>
              <span className="text-[10px] tracking-luxury uppercase text-gold">Beauty</span>
            </div>
            <p className="mt-4 text-sm leading-relaxed">
              Salon kosmetyczny w sercu Saskiej Kępy. Kosmetologia, medycyna estetyczna i
              masaże w eleganckim, kameralnym wnętrzu.
            </p>
          </div>
          <div>
            <div className="text-[10px] tracking-luxury uppercase text-gold">Nawigacja</div>
            <ul className="mt-4 space-y-2 text-sm">
              {sections.map((s) => (
                <li key={s.id}>
                  <a href={`#${s.id}`} className="hover:text-gold transition-colors">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="text-[10px] tracking-luxury uppercase text-gold">Kontakt</div>
            <ul className="mt-4 space-y-2 text-sm">
              <li>Paryska 19/21 lok. 33</li>
              <li>03-945 Warszawa</li>
              <li>
                <a href="tel:+48518917372" className="hover:text-gold transition-colors">
                  +48 518 917 372
                </a>
              </li>
            </ul>
            <div className="mt-5 flex gap-3">
              <a
                href="https://www.instagram.com/devi.beauty.clinic/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="h-9 w-9 border border-background/30 flex items-center justify-center hover:bg-gold hover:border-gold hover:text-accent-foreground transition-all"
              >
                <Instagram size={14} />
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=100069776438830"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="h-9 w-9 border border-background/30 flex items-center justify-center hover:bg-gold hover:border-gold hover:text-accent-foreground transition-all"
              >
                <Facebook size={14} />
              </a>
            </div>
          </div>
        </div>
        <div className="pt-8 text-xs flex flex-col md:flex-row justify-between gap-3 text-background/60">
          <div>© {new Date().getFullYear()} Devi Beauty. Wszystkie prawa zastrzeżone.</div>
          <div className="tracking-luxury uppercase">Made with care · Warszawa</div>
        </div>
      </div>
    </footer>
  );
}

function Home() {
  return (
    <main className="bg-background text-foreground">
      <Nav />
      <Hero />
      <About />
      <Services />
      <Booking />
      <Gallery />
      <Reviews />
      <Contact />
      <Footer />
    </main>
  );
}
