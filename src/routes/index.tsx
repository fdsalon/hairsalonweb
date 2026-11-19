import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Check,
  Clock3,
  Facebook,
  Instagram,
  Menu,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { buildWhatsAppBookingUrl, SALON_WHATSAPP_NUMBER, salonBookingSchema, type SalonBooking } from "@/lib/salon-booking";
import {
  salonDetails,
  salonGallery,
  salonProcessVideos,
  salonServices,
  studioValues,
} from "@/lib/salon-content";

gsap.registerPlugin(ScrollTrigger);

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "FRIENDLY SALON | Hair & Nails in Soshanguve" },
      {
        name: "description",
        content:
          "Hair and nail care at FRIENDLY SALON in Soshanguve Crossing. Discover braids, styling, manicures, and request your next appointment.",
      },
      { property: "og:title", content: "FRIENDLY SALON | Hair & Nails in Soshanguve" },
      {
        property: "og:description",
        content:
          "Thoughtful hair and nail care at FRIENDLY SALON in Soshanguve Crossing, South Africa.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SalonPage,
});

const galleryFilters = ["All work", "Manicures", "Gel nails", "Acrylic nails", "Nail art", "Pedicures", "Hairstyles", "Haircuts"];
const navigationLinks = [
  { label: "Our story", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Gallery", href: "#gallery" },
  { label: "Visit us", href: "#contact" },
];

function SalonPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All work");
  const [selectedArtwork, setSelectedArtwork] = useState<(typeof salonGallery)[number] | null>(null);
  const [selectedService, setSelectedService] = useState("");
  const [preferredDate, setPreferredDate] = useState("");
  const [preferredTime, setPreferredTime] = useState("");
  const [details, setDetails] = useState("");
  const [bookingError, setBookingError] = useState("");
  const [bookingMessage, setBookingMessage] = useState("");
  const [bookingPending, setBookingPending] = useState(false);
  const [minimumDate, setMinimumDate] = useState("");
  const pageRef = useRef<HTMLDivElement>(null);

  const filteredGallery = useMemo(
    () =>
      activeFilter === "All work"
        ? salonGallery
        : salonGallery.filter((work) => work.category.toLowerCase() === activeFilter.toLowerCase()),
    [activeFilter],
  );

  useEffect(() => {
    const now = new Date();
    setMinimumDate(
      `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`,
    );
  }, []);

  useEffect(() => {
    const root = pageRef.current;
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const context = gsap.context(() => {
      gsap.fromTo(
        ".salon-hero-image",
        { scale: 1.08 },
        { scale: 1, duration: 1.8, ease: "power2.out" },
      );
      gsap.fromTo(
        ".salon-hero-entrance",
        { opacity: 0, y: 26 },
        { opacity: 1, y: 0, duration: 1.05, stagger: 0.16, delay: 0.16, ease: "power2.out" },
      );

      const reveals = gsap.utils.toArray<HTMLElement>(".salon-reveal:not(.salon-gallery-item)");
      reveals.forEach((element) => {
        gsap.to(element, {
          autoAlpha: 1,
          y: 0,
          duration: 0.74,
          ease: "power2.out",
          scrollTrigger: { trigger: element, start: "top 88%", once: true },
        });
      });

      const serviceCards = gsap.utils.toArray<HTMLElement>(".salon-service-card");
      const serviceTrigger = serviceCards[0];
      if (serviceTrigger) {
        gsap.fromTo(
          serviceCards,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.62,
            stagger: 0.11,
            ease: "power2.out",
            scrollTrigger: { trigger: serviceTrigger, start: "top 88%", once: true },
          },
        );
      }
    }, root);

    return () => context.revert();
  }, []);

  useEffect(() => {
    const root = pageRef.current;
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const context = gsap.context(() => {
      const galleryItems = gsap.utils.toArray<HTMLElement>(".salon-gallery-item");
      galleryItems.forEach((item) => {
        gsap.to(item, {
          autoAlpha: 1,
          y: 0,
          duration: 0.74,
          ease: "power2.out",
          scrollTrigger: { trigger: item, start: "top 88%", once: true },
        });
      });
    }, root);

    return () => context.revert();
  }, [activeFilter]);

  function requestAppointment(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBookingMessage("");
    setBookingPending(false);
    const result = salonBookingSchema.safeParse({
      service: selectedService,
      preferredDate,
      preferredTime,
      details,
    });

    if (!result.success) {
      setBookingError(result.error.issues[0]?.message ?? "Please check your appointment details.");
      return;
    }

    setBookingError("");
    setBookingMessage("Your WhatsApp message is ready. Send it to the salon to request your appointment.");
    setBookingPending(true);
    window.open(buildWhatsAppBookingUrl(result.data as SalonBooking), "_blank", "noopener,noreferrer");
  }

  function chooseService(serviceName: string) {
    setSelectedService(serviceName);
    document.getElementById("booking")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function dismissMenu() {
    setMenuOpen(false);
  }

  return (
    <div ref={pageRef} className="overflow-x-clip bg-background text-foreground">
      <header className="sticky top-0 z-30 border-b border-salon-ink/10 bg-background/95 backdrop-blur-md">
        <div className="salon-shell relative flex min-h-16 items-center justify-between gap-5">
          <a href="#home" aria-label="FRIENDLY SALON home" className="flex shrink-0 items-center">
            <span className="font-sans text-xs font-semibold uppercase tracking-[.18em]">Friendly Salon</span>
          </a>

          <nav aria-label="Main navigation" className="hidden items-center gap-7 lg:flex">
            {navigationLinks.map((link) => (
              <a className="salon-nav-link" href={link.href} key={link.href}>
                {link.label}
              </a>
            ))}
          </nav>

          <a className="hidden sm:inline-flex" href="#booking">
            <Button variant="salon" size="default" className="min-h-10 px-5 text-[.62rem]">
              Book an appointment <ArrowUpRight aria-hidden="true" />
            </Button>
          </a>

          <Button
            variant="ghost"
            size="icon"
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            className="lg:hidden"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </Button>

          {menuOpen && (
            <nav aria-label="Mobile navigation" className="salon-mobile-menu lg:hidden">
              {navigationLinks.map((link) => (
                <a className="salon-nav-link" href={link.href} key={link.href} onClick={dismissMenu}>
                  {link.label}
                </a>
              ))}
              <a className="mt-3 sm:hidden" href="#booking" onClick={dismissMenu}>
                <Button variant="salon" className="w-full">
                  Book an appointment <ArrowUpRight aria-hidden="true" />
                </Button>
              </a>
            </nav>
          )}
        </div>
      </header>

      <main>
        <section id="home" aria-labelledby="hero-title" className="salon-hero">
          <img
            className="salon-hero-image"
            src={salonServices[1].image}
            alt="Long red gel nails with a glossy finish"
            width={1600}
            height={1200}
            fetchPriority="high"
          />
          <div className="salon-hero-copy">
            <div className="salon-hero-entrance salon-eyebrow mb-7 text-salon-blush">
              A little beauty, made personal
            </div>
            <h1 id="hero-title" className="salon-hero-entrance salon-hero-title">
              A softer kind
              <br />
              of <em>polish.</em>
            </h1>
            <p className="salon-hero-entrance mt-7 max-w-md text-salon-paper/90">
              Thoughtful hair and nail care, creative details and a warm welcome — right here in Soshanguve Crossing.
            </p>
            <div className="salon-hero-entrance mt-9 flex flex-wrap items-center gap-5">
              <a href="#booking">
                <Button variant="salonLight" size="lg">
                  Find your moment <ArrowRight aria-hidden="true" />
                </Button>
              </a>
              <a className="text-[.69rem] uppercase tracking-[.12em] text-salon-paper/90 underline decoration-salon-paper/35 underline-offset-4" href="#services">
                Explore our services
              </a>
            </div>
            <a aria-label="Scroll to the salon story" className="mt-16 inline-flex items-center gap-2 text-[.64rem] uppercase tracking-[.15em] text-salon-paper/75" href="#about">
              <ArrowDown aria-hidden="true" className="size-3" />
              A studio to slow down in
            </a>
          </div>
          <div className="absolute bottom-7 right-8 z-10 hidden flex-col items-center gap-3 text-[.6rem] uppercase tracking-[.18em] text-salon-paper/75 md:flex">
            <span className="[writing-mode:vertical-rl]">Soshanguve Crossing</span>
            <span className="h-10 w-px bg-salon-paper/55" />
          </div>
        </section>

        <section id="about" className="salon-section bg-background" aria-labelledby="about-title">
          <div className="salon-shell grid items-center gap-14 lg:grid-cols-[1.04fr_.96fr] lg:gap-24">
            <div className="salon-reveal relative mx-auto w-full max-w-[34rem]">
              <div className="relative z-10 mr-8 overflow-hidden">
                <img
                  src={salonServices[0].image}
                  alt="Gentle, detail-focused manicure work in a bright studio"
                  className="aspect-[.9] w-full object-cover"
                  width={912}
                  height={1104}
                  loading="lazy"
                />
              </div>
              <div className="absolute bottom-5 right-0 z-20 w-[45%] border border-salon-champagne/70 bg-background p-2.5 sm:p-4">
                <img
                  src={salonServices[2].image}
                  alt="A close-up of delicate custom nail art"
                  className="aspect-square w-full object-cover"
                  width={912}
                  height={1104}
                  loading="lazy"
                />
                <p className="mt-3 text-center font-display text-lg italic text-salon-ink sm:text-xl">
                  A moment for you
                </p>
              </div>
              <span aria-hidden="true" className="absolute -left-4 top-12 -z-0 size-20 rounded-full border border-salon-champagne/60" />
            </div>

            <div className="salon-reveal max-w-xl lg:py-10">
              <p className="salon-section-label">The studio story</p>
              <h2 id="about-title" className="salon-heading mt-6">
                Beauty in the <em className="text-salon-rose">little things.</em>
              </h2>
              <p className="mt-7 text-sm leading-8 text-muted-foreground">
                FRIENDLY SALON in Soshanguve Crossing is a welcoming hair and nail salon created for thoughtful beauty and a little time to yourself. We believe a beautiful style is more than a finish — it’s the care, creativity and small details that make every visit feel personal.
              </p>
              <p className="mt-4 text-sm leading-8 text-muted-foreground">
                Come as you are, bring your ideas, and leave feeling a little more like you. We’ll be happy to welcome you.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-5">
                <a href="#services">
                  <Button variant="salonBare" className="gap-2 border-b border-salon-champagne pb-2 text-xs uppercase tracking-[.1em]">
                    A closer look at our services <ArrowRight aria-hidden="true" />
                  </Button>
                </a>
                <span className="text-[.7rem] text-muted-foreground">{salonDetails.location}</span>
              </div>
              <div className="mt-9 flex items-center gap-3 border-t border-salon-ink/10 pt-6">
                <div>
                  <p className="text-xs font-medium">A personal touch, always</p>
                  <p className="mt-1 text-xs text-muted-foreground">Owner portrait and personal story to be added</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="services" className="salon-section bg-secondary/55" aria-labelledby="services-title">
          <div className="salon-shell">
            <div className="salon-reveal flex flex-col justify-between gap-7 md:flex-row md:items-end">
              <div>
                <p className="salon-section-label">A little something for you</p>
                <h2 id="services-title" className="salon-heading mt-5 max-w-2xl">
                  Find your <em className="text-salon-rose">kind of lovely.</em>
                </h2>
              </div>
              <p className="max-w-sm text-sm leading-7 text-muted-foreground">
                From a simple reset to a fresh set, every service is finished with care. Pricing and timings are shown as editable details for the studio to confirm.
              </p>
            </div>

            <div className="mt-12 grid gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
              {salonServices.map((service, index) => (
                <article className="salon-service-card group" key={service.name}>
                  <button
                    type="button"
                    aria-label={`Choose ${service.name} for an appointment request`}
                    onClick={() => chooseService(service.name)}
                    className="mb-4 block w-full cursor-pointer overflow-hidden bg-transparent p-0 text-left"
                  >
                    <img
                      src={service.image}
                      alt={service.imageAlt}
                      className="salon-service-image"
                      width={service.category === "Hair" ? 1122 : index === 1 ? 1600 : 912}
                      height={service.category === "Hair" ? 1402 : index === 1 ? 1200 : 1104}
                      loading="lazy"
                    />
                  </button>
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="salon-eyebrow">{service.category}</p>
                      <h3 className="mt-2 font-display text-[1.85rem] leading-none">{service.name}</h3>
                    </div>
                    <span aria-hidden="true" className="pt-1 text-salon-rose">0{index + 1}</span>
                  </div>
                  <p className="mt-3 min-h-[3.25rem] text-xs leading-6 text-muted-foreground">{service.description}</p>
                  <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-salon-ink/10 pt-3 text-[.66rem] text-muted-foreground">
                    <span className="inline-flex items-center gap-1"><Clock3 aria-hidden="true" className="size-3" />{service.duration}</span>
                    <span>{service.price}</span>
                  </div>
                  <Button
                    variant="salonBare"
                    aria-label={`Request ${service.name}`}
                    onClick={() => chooseService(service.name)}
                    className="mt-4 min-h-9 gap-2 text-[.68rem] uppercase tracking-[.11em] text-salon-ink"
                  >
                    Request this service <ArrowUpRight aria-hidden="true" className="size-3" />
                  </Button>
                </article>
              ))}
            </div>
            <div className="salon-divider mt-12" />
            <p className="mt-4 text-xs text-muted-foreground">Service descriptions, prices and timings can be updated once confirmed by the salon.</p>
          </div>
        </section>

        <section id="process" className="salon-section bg-secondary/55" aria-labelledby="process-title">
          <div className="salon-shell">
            <div className="salon-reveal mx-auto max-w-3xl text-center">
              <p className="salon-section-label justify-center">Made with care</p>
              <h2 id="process-title" className="salon-heading mt-5">
                A little look <em className="text-salon-rose">behind the finish.</em>
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-muted-foreground">
                From braids made strand by strand to the small details in every nail set, see our work come together.
              </p>
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {salonProcessVideos.map((video) => (
                <article className="salon-reveal min-w-0" key={video.title}>
                  <video
                    className="salon-process-video"
                    controls
                    playsInline
                    preload="none"
                    poster={video.poster}
                    aria-label={video.title}
                  >
                    <source src={video.src} type="video/mp4" />
                    Your browser does not support embedded videos.
                  </video>
                  <h3 className="mt-4 font-display text-2xl">{video.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{video.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="gallery" className="salon-section bg-background" aria-labelledby="gallery-title">
          <div className="salon-shell">
            <div className="salon-reveal mx-auto max-w-3xl text-center">
              <p className="salon-section-label justify-center">Little details, lovely finishes</p>
              <h2 id="gallery-title" className="salon-heading mt-5">The art of <em className="text-salon-rose">feeling polished.</em></h2>
              <p className="mx-auto mt-5 max-w-lg text-sm leading-7 text-muted-foreground">
                A peek at the colours, care and creative touches we love. Tap any image to take a closer look.
              </p>
            </div>

            <div className="salon-reveal mt-9 flex flex-wrap justify-center gap-2" aria-label="Filter gallery by service">
              {galleryFilters.map((filter) => (
                <Button
                  key={filter}
                  type="button"
                  variant={activeFilter === filter ? "salonFilterActive" : "salonFilter"}
                  aria-pressed={activeFilter === filter}
                  onClick={() => setActiveFilter(filter)}
                >
                  {filter}
                </Button>
              ))}
            </div>

            <div aria-live="polite" className="mt-8 grid grid-cols-2 items-start gap-4 sm:gap-6 lg:grid-cols-3">
              {filteredGallery.map((work, index) => (
                <button
                  key={`${work.title}-${index}`}
                  type="button"
                  className="salon-gallery-item salon-reveal group block w-full cursor-zoom-in bg-transparent p-0 text-left"
                  onClick={() => setSelectedArtwork(work)}
                  aria-label={`View ${work.title}, ${work.category}`}
                >
                  <img
                    className="salon-gallery-image"
                    src={work.image}
                    alt={work.alt}
                    width={work.category === "Gel nails" ? 1600 : 912}
                    height={work.category === "Gel nails" ? 1200 : 1104}
                    loading="lazy"
                  />
                  <span className="mt-3 flex items-center justify-between gap-2">
                    <span className="font-display text-lg sm:text-xl">{work.title}</span>
                    <span className="text-right text-[.62rem] text-muted-foreground">{work.category}</span>
                  </span>
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-salon-ink py-14 text-salon-paper" aria-label="The FRIENDLY SALON approach">
          <div className="salon-shell">
            <div className="salon-reveal grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {studioValues.map((value) => (
                <div className="border-t border-salon-paper/20 pt-5" key={value.number}>
                  <span className="font-display text-xl italic text-salon-champagne">{value.number}</span>
                  <h2 className="mt-3 font-display text-2xl">{value.title}</h2>
                  <p className="mt-2 max-w-xs text-xs leading-6 text-salon-paper/75">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="kind-words" className="salon-section bg-salon-blush/30" aria-labelledby="kind-words-title">
          <div className="salon-shell">
            <div className="salon-reveal grid items-center gap-9 lg:grid-cols-[.78fr_1.22fr]">
              <div>
                <p className="salon-section-label">Kind words</p>
                <h2 id="kind-words-title" className="salon-heading mt-5">
                  Your story, <em className="text-salon-rose">in your words.</em>
                </h2>
                <p className="mt-5 max-w-md text-sm leading-7 text-muted-foreground">
                  We’d love to share what your visit meant to you. Client reviews will appear here once the salon adds them.
                </p>
              </div>
              <div className="border-y border-salon-champagne/55 py-8 sm:px-8 sm:py-10">
                <span aria-hidden="true" className="font-display text-6xl leading-none text-salon-rose">“</span>
                <p className="salon-booking-status ml-2 mt-3 max-w-lg font-display text-3xl italic leading-snug sm:text-4xl">
                  A space for a real client’s kind words.
                </p>
                <p className="ml-2 mt-4 text-[.68rem] uppercase tracking-[.11em] text-muted-foreground">Client review to be added</p>
              </div>
            </div>
          </div>
        </section>

        <section id="booking" className="salon-section bg-background" aria-labelledby="booking-title">
          <div className="salon-shell grid items-start gap-12 lg:grid-cols-[.82fr_1.18fr] lg:gap-24">
            <div className="salon-reveal lg:sticky lg:top-28">
              <p className="salon-section-label">Your next little ritual</p>
              <h2 id="booking-title" className="salon-heading mt-5">Let’s find <em className="text-salon-rose">your time.</em></h2>
              <p className="mt-6 max-w-lg text-sm leading-7 text-muted-foreground">
                Tell us what you have in mind. We’ll prepare a message for WhatsApp so the salon can get back to you and confirm a time.
              </p>
              <div className="mt-7 flex items-start gap-3 border-l-2 border-salon-rose pl-4">
                <span aria-hidden="true" className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-full bg-salon-blush text-salon-ink"><Check className="size-3.5" /></span>
                <p className="max-w-sm text-xs leading-6 text-muted-foreground">This is an appointment request, not a confirmed booking. Your visit is confirmed only after the salon replies.</p>
              </div>
              <div className="mt-8 border-t border-salon-ink/10 pt-5 text-xs leading-6 text-muted-foreground">
                <p><span className="font-medium text-foreground">Our studio</span> · {salonDetails.location}</p>
                <p className="mt-1">WhatsApp: {salonDetails.whatsapp}</p>
              </div>
            </div>

            <form className="salon-reveal border-y border-salon-champagne/55 py-8 sm:py-10" onSubmit={requestAppointment} noValidate>
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label className="salon-field-label" htmlFor="service">What would you love?</label>
                  <select className="salon-input" id="service" value={selectedService} onChange={(event) => setSelectedService(event.target.value)} required>
                    <option value="">Choose a service</option>
                    {salonServices.map((service) => <option key={service.name} value={service.name}>{service.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="salon-field-label" htmlFor="preferred-date">A day that suits you</label>
                  <input className="salon-input" id="preferred-date" type="date" min={minimumDate} value={preferredDate} onChange={(event) => setPreferredDate(event.target.value)} required />
                </div>
                <div>
                  <label className="salon-field-label" htmlFor="preferred-time">A time that suits you</label>
                  <input className="salon-input" id="preferred-time" type="time" value={preferredTime} onChange={(event) => setPreferredTime(event.target.value)} required />
                </div>
                <div className="sm:col-span-2">
                  <label className="salon-field-label" htmlFor="booking-details">Anything else we should know? <span className="font-normal text-muted-foreground">(Optional)</span></label>
                  <textarea className="salon-input min-h-28 resize-y" id="booking-details" maxLength={500} placeholder="Your ideas, preferred nail shape, or a little note…" value={details} onChange={(event) => setDetails(event.target.value)} />
                  <p className="mt-2 text-right text-[.62rem] text-muted-foreground">{details.length}/500</p>
                </div>
              </div>
              {bookingError && <p role="alert" className="mt-5 text-sm text-destructive">{bookingError}</p>}
              {bookingMessage && <p role="status" className="mt-5 text-sm leading-6 text-foreground">{bookingMessage}</p>}
              <div className="mt-6">
                <Button type="submit" variant="salon" size="lg" className="w-full sm:w-auto">
                  {bookingPending ? "Open WhatsApp again" : "Request via WhatsApp"} <ArrowUpRight aria-hidden="true" />
                </Button>
              </div>
            </form>
          </div>
        </section>

        <section id="contact" className="bg-secondary/55 py-16 sm:py-20" aria-labelledby="contact-title">
          <div className="salon-shell">
            <div className="salon-reveal mb-10 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
              <div>
                <p className="salon-section-label">A warm welcome awaits</p>
                <h2 id="contact-title" className="salon-heading mt-5">Come find <em className="text-salon-rose">us.</em></h2>
              </div>
              <span className="text-sm text-muted-foreground">{salonDetails.address}</span>
            </div>

            <div className="salon-reveal grid gap-7 lg:grid-cols-[1.12fr_.88fr]">
              <div className="overflow-hidden border border-salon-ink/10">
                <iframe
                  title="Map showing the salon's exact location near Soshanguve Crossing"
                  src={salonDetails.mapUrl}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="salon-map-frame"
                />
                <a
                  className="inline-flex items-center gap-2 px-4 py-3 text-xs font-medium text-foreground transition-colors hover:text-salon-green"
                  href={salonDetails.mapLink}
                  target="_blank"
                  rel="noreferrer"
                >
                  Open exact location in Google Maps <ArrowUpRight aria-hidden="true" className="size-3" />
                </a>
              </div>
              <div className="flex flex-col justify-between gap-7 border-y border-salon-champagne/60 py-7 lg:py-8">
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-1">
                  <ContactDetail label="Visit" value={salonDetails.location} detail={salonDetails.address} />
                  <ContactDetail label="Call or WhatsApp" value={salonDetails.phone} detail="Business phone and WhatsApp" />
                  <ContactDetail label="Hours" value={salonDetails.hours} detail="Message us to request your appointment." />
                  <div className="border-b border-salon-ink/10 pb-4 last:border-b-0">
                    <p className="salon-eyebrow">Follow us</p>
                    <a
                      className="mt-2 inline-flex items-center gap-2 text-sm font-medium hover:text-salon-green"
                      href={salonDetails.instagram}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <Instagram aria-hidden="true" className="size-4" /> @friendly_salon
                    </a>
                    <a
                      className="mt-2 inline-flex items-center gap-2 text-sm font-medium hover:text-salon-green sm:ml-4"
                      href={salonDetails.facebook}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <Facebook aria-hidden="true" className="size-4" /> Facebook
                    </a>
                  </div>
                </div>
                <a href="#booking">
                  <Button variant="salonOutline" className="w-full justify-between sm:w-auto">
                    Send an appointment request <ArrowRight aria-hidden="true" />
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-salon-ink py-10 text-salon-paper sm:py-12">
        <div className="salon-shell">
          <div className="grid gap-8 border-b border-salon-paper/20 pb-8 sm:grid-cols-[1.1fr_.9fr_1fr]">
            <div>
              <a href="#home" className="inline-flex items-center" aria-label="FRIENDLY SALON home">
                <span className="font-sans text-xs font-semibold uppercase tracking-[.18em]">Friendly Salon</span>
              </a>
              <p className="mt-4 max-w-xs text-xs leading-6 text-salon-paper/70">A little beauty, made personal.<br />Soshanguve Crossing.</p>
            </div>
            <div>
              <p className="salon-eyebrow text-salon-blush">Explore</p>
              <nav aria-label="Footer navigation" className="mt-4 grid justify-start gap-3">
                {[{ label: "Our story", href: "#about" }, { label: "Services", href: "#services" }, { label: "Gallery", href: "#gallery" }, { label: "Visit us", href: "#contact" }].map((link) => (
                  <a className="w-fit text-xs text-salon-paper/80 transition-colors hover:text-salon-blush" href={link.href} key={link.href}>{link.label}</a>
                ))}
              </nav>
            </div>
            <div>
              <p className="salon-eyebrow text-salon-blush">Stay in touch</p>
              <p className="mt-4 text-xs leading-6 text-salon-paper/80">Call or WhatsApp {salonDetails.phone}<br />Open daily, 9:00 AM – 6:00 PM.</p>
              <a className="mt-4 inline-flex items-center gap-2 text-xs text-salon-paper" href={`https://wa.me/${SALON_WHATSAPP_NUMBER}`} target="_blank" rel="noreferrer">
                Message us on WhatsApp <ArrowUpRight aria-hidden="true" className="size-3" />
              </a>
              <a className="mt-3 inline-flex items-center gap-2 text-xs text-salon-paper/80 transition-colors hover:text-salon-blush" href={salonDetails.instagram} target="_blank" rel="noreferrer">
                <Instagram aria-hidden="true" className="size-3.5" /> Instagram
              </a>
              <a className="mt-3 inline-flex items-center gap-2 text-xs text-salon-paper/80 transition-colors hover:text-salon-blush" href={salonDetails.facebook} target="_blank" rel="noreferrer">
                <Facebook aria-hidden="true" className="size-3.5" /> Facebook
              </a>
            </div>
          </div>
          <div className="flex flex-col gap-2 pt-5 text-[.63rem] text-salon-paper/60 sm:flex-row sm:items-center sm:justify-between">
            <span>© {new Date().getFullYear()} FRIENDLY SALON. With care, in Soshanguve.</span>
            <span>Appointment requests are confirmed directly by the salon.</span>
          </div>
        </div>
      </footer>

      <Dialog open={selectedArtwork !== null} onOpenChange={(open) => !open && setSelectedArtwork(null)}>
        <DialogContent className="max-h-[92svh] max-w-3xl overflow-auto border-salon-champagne/60 bg-background p-4 sm:p-6">
          {selectedArtwork && (
            <>
              <DialogHeader>
                <DialogTitle className="font-display text-3xl font-normal">{selectedArtwork.title}</DialogTitle>
                <DialogDescription>{selectedArtwork.category} · FRIENDLY SALON, Soshanguve</DialogDescription>
              </DialogHeader>
              <img src={selectedArtwork.image} alt={selectedArtwork.alt} width={912} height={1104} className="max-h-[70svh] w-full object-contain" />
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

function ContactDetail({ label, value, detail }: { label: string; value: string; detail: string }) {
  return (
    <div className="border-b border-salon-ink/10 pb-4 last:border-b-0">
      <p className="salon-eyebrow">{label}</p>
      <p className="mt-2 text-sm font-medium">{value}</p>
      <p className="mt-1 text-xs leading-5 text-muted-foreground">{detail}</p>
    </div>
  );
}