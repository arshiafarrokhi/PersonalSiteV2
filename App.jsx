import { forwardRef, useEffect, useId, useRef, useState } from "react";
import {
  AnimatePresence,
  MotionConfig,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  ArrowRight,
  ArrowUp,
  ArrowUpRight,
  Atom,
  Braces,
  CodeXml,
  GitBranch,
  Github,
  ImageOff,
  Instagram,
  Linkedin,
  Menu,
  Layers,
  Palette,
  PanelsTopLeft,
  Wind,
  X,
} from "lucide-react";

// Professional content: the owner's latest resume. Original images and personal
// projects: arshiafarrokhi.github.io/PersonalWebsite/.
const IMAGE_BASE = `${import.meta.env?.BASE_URL ?? "/"}images/`;
const EASE = [0.22, 1, 0.36, 1];
const NAVIGATION = [
  { id: "work", label: "Work" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
];
const SOCIALS = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/arshiafarrokhi",
    Icon: Linkedin,
  },
  { label: "GitHub", href: "https://github.com/arshiafarrokhi", Icon: Github },
  {
    label: "Instagram",
    href: "https://www.instagram.com/arshia_farrokhi_web",
    Icon: Instagram,
  },
];
const PROFESSIONAL_PROJECTS = [
  {
    name: "Avid Payment",
    type: "User & admin panels",
    description: "Frontend interfaces for a payment platform.",
    href: "https://my.avidpayment.com/dashboard",
    linkLabel: "Visit platform",
    note: "Account access may be required",
  },
  {
    name: "Romand",
    type: "AI chatbot & admin panel",
    description: "Chatbot and administration interfaces.",
    href: "https://romand.ir/",
    linkLabel: "Visit website",
  },
  {
    name: "GH Company",
    type: "Company website",
    description: "A responsive web presence for the company.",
    href: "https://ghcompany.ir/",
    linkLabel: "Visit website",
  },
  {
    name: "Nevisa",
    type: "User & admin panels",
    description: "User-facing and administration interfaces.",
    href: "https://www.nevisasoft.com/",
    linkLabel: "Visit website",
  },
];
const PROJECTS = [
  {
    id: "snapp",
    title: "Snapp website",
    category: "Websites",
    detail: "Website · UI recreation",
    image: "snapp.png",
    href: "https://snapp-site.vercel.app/",
  },
  {
    id: "creative",
    title: "Creative website",
    category: "Websites",
    detail: "Website",
    image: "creative.png",
    href: "https://arshiafarrokhi.github.io/CreativeWebsite/",
  },
  {
    id: "music",
    title: "Music player",
    category: "Web apps",
    detail: "Web app",
    image: "music.png",
    href: "https://arshiafarrokhi.github.io/Music-player/",
  },
  {
    id: "weather",
    title: "Weather app",
    category: "Web apps",
    detail: "Web app",
    image: "weather.png",
    href: "https://arshiafarrokhi.github.io/WeatherSite/",
  },
  {
    id: "tasks",
    title: "To-do list",
    category: "Web apps",
    detail: "Web app",
    image: "todo.png",
    href: "https://arshiafarrokhi.github.io/ToDoList/",
  },
  {
    id: "metamask",
    title: "MetaMask website",
    category: "Websites",
    detail: "Website · UI recreation",
    image: "metamask.png",
    href: "https://arshiafarrokhi.github.io/MetaMaskSite/",
  },
  {
    id: "organization",
    title: "Organization website",
    category: "Websites",
    detail: "Website",
    image: "organization.png",
    href: "https://arshiafarrokhi.github.io/OrganizationWebsite/",
  },
  {
    id: "bank-card",
    title: "Bank card",
    category: "Web apps",
    detail: "Interface experiment",
    image: "bank-card.png",
    href: "https://arshiafarrokhi.github.io/BankCard/",
  },
  {
    id: "nft",
    title: "NFT website",
    category: "Websites",
    detail: "Website",
    image: "nft.png",
    href: "https://arshiafarrokhi.github.io/NFTwebSite/",
  },
  {
    id: "bitcoin",
    title: "Bitcoin price dashboard",
    category: "Web apps",
    detail: "Web app",
    image: "bitcoin.png",
    href: "https://arshiafarrokhi.github.io/BitCoinLivePrice/",
  },
  {
    id: "profiles",
    title: "Random profile generator",
    category: "Web apps",
    detail: "Web app",
    image: "profiles.png",
    href: "https://arshiafarrokhi.github.io/RandomPersonGenerator/",
  },
  {
    id: "youtube",
    title: "YouTube search",
    category: "Web apps",
    detail: "Web app",
    image: "youtube.png",
    href: "https://arshiafarrokhi.github.io/SearchYT/",
  },
];
const SKILLS = [
  { name: "TypeScript", Icon: CodeXml, description: "Typed development" },
  { name: "JavaScript", Icon: Braces, description: "Interaction" },
  { name: "React", Icon: Atom, description: "UI components" },
  { name: "Next.js", Icon: PanelsTopLeft, description: "React framework" },
  { name: "Tailwind CSS", Icon: Wind, description: "Utility-first CSS" },
  { name: "Bootstrap", Icon: Palette, description: "Responsive layouts" },
  { name: "Design patterns", Icon: Layers, description: "Code organization" },
  { name: "Git", Icon: GitBranch, description: "GitHub & GitLab" },
];
const EXPERIENCE = [
  {
    company: "Pavan",
    href: "https://pavan.ir/",
    start: "2025",
    title: "Frontend Developer",
    responsibilities: [
      "Develop user dashboards for crypto and digital product platforms.",
      "Build responsive interfaces for digital product sales and management.",
      "Implement core features for user accounts, transactions, and platform management.",
    ],
  },
  {
    company: "Asr Gooyesh Pardaz",
    href: "https://asr-gooyesh.com/fa/",
    start: "2024",
    end: "2025",
    title: "Frontend Developer & Project Lead",
    responsibilities: [
      "Led project planning, task assignment, and team coordination.",
      "Developed responsive frontend interfaces and implemented core project logic.",
      "Collaborated with the team to support smooth development and project delivery.",
    ],
  },
  {
    company: "GH Company",
    href: "https://ghcompany.ir/",
    start: "2022",
    end: "2023",
    title: "Frontend Developer",
    responsibilities: [
      "Developed responsive websites with a focus on performance and optimization.",
      "Worked with the team to improve digital user experiences.",
    ],
  },
];
const EDUCATION = [
  {
    name: "Frontend development",
    institution: "Parnian IT",
    href: "https://trainingsitedesign.ir/",
    date: "2022 — 2023",
    description: "Frontend bootcamp completion certificate",
  },
  {
    name: "Civil engineering",
    institution: "Islamic Azad University, North Tehran Branch",
    date: "2018 — 2022",
  },
];

const STYLES = `
  .portfolio-app {
    --accent: #d4f77d;
    --foreground: #f3f2ed;
    --muted: #a8adb1;
    --line: #34383a;
    background: #0d0f10;
    color: var(--foreground);
    font-family: Arial, "Helvetica Neue", sans-serif;
    color-scheme: dark;
  }
  .portfolio-app ::selection { color: #0d0f10; background: var(--accent); }
  .portfolio-shell {
    width: 100%;
    max-width: 1600px;
    margin-inline: auto;
    padding-inline: clamp(20px, 4.8vw, 76px);
  }
  .portfolio-app a, .portfolio-app button { -webkit-tap-highlight-color: transparent; }
  .portfolio-app :is(a, button):focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 6px;
  }
  .portfolio-app button { cursor: pointer; }
  .portfolio-app section[id] { scroll-margin-top: 32px; }
  html:has(.portfolio-app) { scroll-behavior: smooth; }
  .portfolio-headline {
    font-size: clamp(58px, 9.2vw, 146px);
    font-weight: 800;
    letter-spacing: -0.065em;
    line-height: 0.91;
  }
  .portfolio-section-title {
    font-size: clamp(36px, 4.9vw, 76px);
    font-weight: 700;
    letter-spacing: -0.055em;
    line-height: 1.06;
    text-wrap: balance;
  }
  .portfolio-contact-title {
    font-size: clamp(48px, 8.5vw, 132px);
    font-weight: 700;
    letter-spacing: -0.06em;
    line-height: 0.98;
    text-wrap: balance;
  }
  .portfolio-button {
    display: inline-flex;
    min-height: 50px;
    align-items: center;
    justify-content: center;
    gap: 12px;
    border-radius: 999px;
    padding: 12px 28px;
    font-size: 15px;
    font-weight: 600;
    line-height: 1.4;
    text-decoration: none;
  }
  .portfolio-section { padding-block: clamp(64px, 7vw, 112px); }
  .portfolio-menu {
    position: fixed;
    inset: 0;
    width: 100%;
    height: 100%;
    max-width: none;
    max-height: none;
    margin: 0;
    padding: 0;
    border: 0;
    background: #0d0f10;
    color: #f3f2ed;
    font-family: inherit;
  }
  .portfolio-menu:not([open]) { display: none; }
  .portfolio-menu[open] { display: flex; }
  .portfolio-menu::backdrop { background: rgb(0 0 0 / .75); }
  @supports (height: 100dvh) { .portfolio-menu { height: 100dvh; } }
  @media (max-width: 1023px) {
    .portfolio-headline { font-size: clamp(58px, 11vw, 100px); }
  }
  @media (max-width: 379px) {
    .portfolio-headline { font-size: clamp(44px, 16vw, 58px); }
  }
  @media (prefers-reduced-motion: reduce) {
    html:has(.portfolio-app) { scroll-behavior: auto; }
    .portfolio-app *, .portfolio-app *::before, .portfolio-app *::after {
      animation-duration: 0.01ms !important;
      transition-duration: 0.01ms !important;
    }
  }
`;

function Brand({ onClick }) {
  return (
    <a
      href="#top"
      onClick={onClick}
      aria-label="Arshia Farrokhi, back to home"
      className="inline-flex min-h-12 shrink-0 items-center gap-4 rounded-sm"
    >
      <span
        aria-hidden="true"
        className="text-[34px] leading-none font-bold tracking-[-0.075em]"
      >
        af<span className="text-[var(--accent)]">.</span>
      </span>
      <span className="text-[14px] font-normal sm:text-[18px]">
        Arshia Farrokhi
      </span>
    </a>
  );
}

function Reveal({ children, className = "", delay = 0, reducedMotion }) {
  return (
    <motion.div
      className={className}
      initial={reducedMotion ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: reducedMotion ? 0 : 0.7,
        ease: EASE,
        delay: reducedMotion ? 0 : delay,
      }}
    >
      {children}
    </motion.div>
  );
}

function ResponsiveImage({ file, alt, eager = false, portrait = false }) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  const imageRef = useRef(null);

  useEffect(() => {
    const image = imageRef.current;
    if (image?.complete && image.naturalWidth > 0) setLoaded(true);
  }, []);

  if (failed) {
    return (
      <div
        role="img"
        aria-label={`${alt} — image unavailable`}
        className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[#171a1c] text-[var(--muted)]"
      >
        <ImageOff size={28} aria-hidden="true" />
        <span className="text-sm">Image unavailable</span>
      </div>
    );
  }

  return (
    <img
      ref={imageRef}
      src={`${IMAGE_BASE}${file}`}
      alt={alt}
      width={portrait ? 3568 : 1920}
      height={portrait ? 4298 : 930}
      loading={eager ? "eager" : "lazy"}
      fetchPriority={eager ? "high" : "auto"}
      decoding="async"
      onLoad={() => setLoaded(true)}
      onError={() => setFailed(true)}
      className={`absolute inset-0 h-full w-full transition-opacity duration-700 ${portrait ? "object-cover object-[50%_45%]" : "object-contain"} ${loaded ? "opacity-100" : "opacity-0"}`}
    />
  );
}

const ProjectCard = forwardRef(function ProjectCard(
  { project, reducedMotion },
  ref,
) {
  return (
    <motion.article
      ref={ref}
      role="listitem"
      layout={!reducedMotion}
      initial={reducedMotion ? false : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: reducedMotion ? 0 : -12 }}
      transition={{ duration: reducedMotion ? 0 : 0.35, ease: EASE }}
      className="min-w-0"
    >
      <motion.a
        href={project.href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`View ${project.title} — opens in a new tab`}
        className="group block rounded-xl"
        whileHover={reducedMotion ? undefined : { y: -6 }}
        whileTap={reducedMotion ? undefined : { scale: 0.99 }}
        transition={{ duration: 0.25, ease: EASE }}
      >
        <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-white/10 bg-[#171a1c]">
          <div className="absolute inset-0 transition-transform duration-500 motion-safe:group-hover:scale-[1.025]">
            <ResponsiveImage
              file={project.image}
              alt={`Screenshot of ${project.title}`}
            />
          </div>
        </div>
        <div className="mt-5 flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h3 className="text-[clamp(21px,2.1vw,32px)] leading-tight font-bold tracking-[-0.035em] transition-colors group-hover:text-[var(--accent)]">
              {project.title}
            </h3>
            <p className="mt-2 text-[14px] leading-6 text-[var(--muted)] sm:text-[16px]">
              {project.detail}
            </p>
          </div>
          <span
            aria-hidden="true"
            className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#777d80] transition-colors group-hover:border-[var(--accent)] group-hover:bg-[var(--accent)] group-hover:text-[#0d0f10]"
          >
            <ArrowUpRight size={23} strokeWidth={1.5} />
          </span>
        </div>
      </motion.a>
    </motion.article>
  );
});

export default function App() {
  const reducedMotion = useReducedMotion();
  const [menuOpen, setMenuOpen] = useState(false);
  const [category, setCategory] = useState("All");
  const [showAll, setShowAll] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const heroRef = useRef(null);
  const menuRef = useRef(null);
  const closeButtonRef = useRef(null);
  const menuId = useId();
  const menuTitleId = useId();
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const portraitY = useTransform(scrollYProgress, [0, 1], [0, 36]);
  const filteredProjects =
    category === "All"
      ? PROJECTS
      : PROJECTS.filter((project) => project.category === category);
  const visibleProjects = showAll
    ? filteredProjects
    : filteredProjects.slice(0, 4);

  useEffect(() => {
    const previousTitle = document.title;
    document.title = "Arshia Farrokhi — Frontend Developer";
    return () => {
      document.title = previousTitle;
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        }
      },
      { rootMargin: "-15% 0px -60% 0px", threshold: 0 },
    );
    for (const id of [...NAVIGATION.map((item) => item.id), "contact"]) {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    }
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const dialog = menuRef.current;
    const body = document.body;
    const root = document.documentElement;
    const previousOverflow = body.style.overflow;
    const previousRootOverflow = root.style.overflow;
    const previousPadding = body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - root.clientWidth;
    const desktop = window.matchMedia("(min-width: 1024px)");
    const closeOnDesktop = () => {
      if (desktop.matches) setMenuOpen(false);
    };

    if (scrollbarWidth > 0) {
      const padding =
        parseFloat(window.getComputedStyle(body).paddingRight) || 0;
      body.style.paddingRight = `${padding + scrollbarWidth}px`;
    }
    body.style.overflow = "hidden";
    root.style.overflow = "hidden";
    dialog.showModal();
    closeButtonRef.current.focus({ preventScroll: true });
    desktop.addEventListener("change", closeOnDesktop);
    closeOnDesktop();

    return () => {
      desktop.removeEventListener("change", closeOnDesktop);
      if (dialog.open) dialog.close();
      body.style.overflow = previousOverflow;
      root.style.overflow = previousRootOverflow;
      body.style.paddingRight = previousPadding;
    };
  }, [menuOpen]);

  const navLink = ({ id, label }, mobile = false) => (
    <a
      key={id}
      href={`#${id}`}
      onClick={mobile ? () => setMenuOpen(false) : undefined}
      aria-current={activeSection === id ? "location" : undefined}
      className={`${mobile ? "min-h-12 px-4 text-[24px]" : "min-h-11 text-[14px]"} inline-flex items-center rounded-sm font-normal transition-colors hover:text-[var(--accent)] ${activeSection === id ? "text-[var(--accent)]" : "text-[#c6c9ca]"}`}
    >
      {label}
    </a>
  );

  return (
    <MotionConfig reducedMotion="user">
      <div
        id="top"
        lang="en"
        dir="ltr"
        className="portfolio-app relative min-h-screen w-full overflow-hidden antialiased"
      >
        <style>{STYLES}</style>
        <a
          href="#main-content"
          className="absolute top-3 left-5 z-50 -translate-y-24 rounded-lg bg-[var(--accent)] px-5 py-3 font-medium text-[#0d0f10] focus:translate-y-0"
        >
          Skip to content
        </a>

        <header className="portfolio-shell relative z-20 flex min-h-20 items-center justify-between gap-5 py-3">
          <Brand />
          <div className="hidden items-center gap-8 lg:flex">
            <nav
              aria-label="Main navigation"
              className="flex items-center gap-8"
            >
              {NAVIGATION.map((item) => navLink(item))}
            </nav>
            <motion.a
              href="#contact"
              className="portfolio-button border border-[var(--accent)] text-[var(--accent)] transition-colors hover:bg-[var(--accent)] hover:text-[#0d0f10]"
              whileTap={reducedMotion ? undefined : { scale: 0.97 }}
            >
              Let’s talk
            </motion.a>
          </div>
          <button
            type="button"
            aria-label="Open navigation menu"
            aria-haspopup="dialog"
            aria-expanded={menuOpen}
            aria-controls={menuId}
            onClick={() => setMenuOpen(true)}
            className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-md transition-colors hover:bg-white/10 lg:hidden"
          >
            <Menu size={25} aria-hidden="true" />
          </button>
        </header>

        <main id="main-content" tabIndex={-1}>
          <section
            ref={heroRef}
            aria-labelledby="hero-heading"
            className="portfolio-shell pt-5 lg:pt-3.5"
          >
            <div className="grid items-center gap-10 pb-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:gap-[4vw] lg:pb-9">
              <div className="min-w-0">
                <h1 id="hero-heading" className="portfolio-headline">
                  <span className="sr-only">Creative frontend developer.</span>
                  <span aria-hidden="true">
                    {["Creative", "frontend", "developer."].map(
                      (word, index) => (
                        <motion.span
                          key={word}
                          className={`block ${index === 1 ? "text-[var(--accent)]" : ""}`}
                          initial={
                            reducedMotion ? false : { opacity: 0, y: 28 }
                          }
                          animate={{ opacity: 1, y: 0 }}
                          transition={{
                            duration: reducedMotion ? 0 : 0.8,
                            delay: reducedMotion ? 0 : 0.25 + index * 0.14,
                            ease: EASE,
                          }}
                        >
                          {word}
                        </motion.span>
                      ),
                    )}
                  </span>
                </h1>
                <motion.p
                  className="mt-8 max-w-[640px] text-[clamp(16px,1.45vw,23px)] leading-[1.45] text-[#c0c5c8] lg:mt-10"
                  initial={reducedMotion ? false : { opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: reducedMotion ? 0 : 0.7,
                    delay: reducedMotion ? 0 : 0.85,
                    ease: EASE,
                  }}
                >
                  I’m Arshia Farrokhi, a frontend developer in Tehran. I build
                  responsive, performance-focused interfaces with React,
                  TypeScript, and Next.js.
                </motion.p>
                <motion.div
                  className="mt-7 flex flex-wrap items-center gap-x-8 gap-y-5 lg:mt-9"
                  initial={reducedMotion ? false : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: reducedMotion ? 0 : 0.6,
                    delay: reducedMotion ? 0 : 1.15,
                    ease: EASE,
                  }}
                >
                  <motion.a
                    href="#work"
                    className="portfolio-button bg-[var(--accent)] text-[#0d0f10] transition-colors hover:bg-[#e3ff9e]"
                    whileHover={reducedMotion ? undefined : { scale: 1.035 }}
                    whileTap={reducedMotion ? undefined : { scale: 0.97 }}
                  >
                    Explore my work{" "}
                    <ArrowUpRight
                      size={21}
                      strokeWidth={1.6}
                      aria-hidden="true"
                    />
                  </motion.a>
                  <a
                    href={SOCIALS[1].href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 items-center rounded-sm text-[17px] underline decoration-[#7c8183] underline-offset-8 transition-colors hover:text-[var(--accent)]"
                  >
                    GitHub<span className="sr-only"> — opens in a new tab</span>
                  </a>
                </motion.div>
              </div>
              <motion.figure
                className="relative mx-auto aspect-[0.925] w-full max-w-[650px] overflow-hidden rounded-[24px] bg-[#151819] lg:mx-0"
                style={{ y: reducedMotion ? 0 : portraitY }}
                initial={reducedMotion ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  duration: reducedMotion ? 0 : 1,
                  delay: reducedMotion ? 0 : 0.35,
                }}
              >
                <ResponsiveImage
                  file="portrait.jpg"
                  alt="Portrait of Arshia Farrokhi wearing glasses, photographed in red and blue light"
                  portrait
                  eager
                />
              </motion.figure>
            </div>
            <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-5 border-t border-[var(--line)] py-7 text-[14px] text-[var(--muted)] sm:text-[16px]">
              <div className="flex flex-wrap gap-x-6 gap-y-3 sm:gap-x-10">
                <span>React</span>
                <span>TypeScript</span>
                <span>Next.js</span>
              </div>
              <a
                href="#work"
                className="inline-flex min-h-11 items-center gap-3 rounded-sm transition-colors hover:text-[var(--accent)]"
              >
                Frontend &amp; project leadership{" "}
                <ArrowRight size={18} strokeWidth={1.5} aria-hidden="true" />
              </a>
            </div>
          </section>

          <section
            id="work"
            aria-labelledby="work-heading"
            className="portfolio-shell portfolio-section"
          >
            <Reveal reducedMotion={reducedMotion}>
              <p className="mb-5 text-[15px] text-[var(--muted)]">
                Professional projects
              </p>
              <h2 id="work-heading" className="portfolio-section-title">
                Interfaces for{" "}
                <span className="text-[var(--accent)]">real products.</span>
              </h2>
              <p className="mt-5 max-w-2xl text-[16px] leading-7 text-[#b8bec1] sm:text-[19px]">
                Selected work across payment platforms, AI products, and company
                websites, with a focus on user and admin experiences.
              </p>
            </Reveal>
            <div
              role="list"
              aria-label="Professional project references"
              className="mt-10 sm:mt-14"
            >
              {PROFESSIONAL_PROJECTS.map((project, index) => (
                <Reveal
                  key={project.name}
                  reducedMotion={reducedMotion}
                  delay={0.04 * index}
                >
                  <article
                    role="listitem"
                    className="border-t border-[var(--line)]"
                  >
                    <a
                      href={project.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${project.linkLabel}: ${project.name} — opens in a new tab${project.note ? `; ${project.note}` : ""}`}
                      className="group grid min-w-0 grid-cols-[28px_minmax(0,1fr)_32px] items-start gap-x-4 gap-y-5 rounded-sm py-8 transition-colors sm:grid-cols-[40px_minmax(0,1.1fr)_minmax(0,1fr)_48px] sm:items-center sm:gap-x-8 sm:py-10"
                    >
                      <span
                        aria-hidden="true"
                        className="pt-2 text-[14px] text-[var(--accent)]"
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <div className="min-w-0">
                        <h3 className="text-[clamp(27px,3.4vw,48px)] leading-tight font-semibold tracking-[-0.04em] transition-colors group-hover:text-[var(--accent)]">
                          {project.name}
                        </h3>
                        <p className="mt-3 text-[14px] leading-6 text-[#c5cacc] sm:text-[16px]">
                          {project.type}
                        </p>
                      </div>
                      <div className="col-start-2 row-start-2 min-w-0 text-[14px] leading-6 text-[var(--muted)] sm:col-start-3 sm:row-start-1 sm:text-[16px] sm:leading-7">
                        <p>{project.description}</p>
                        <p className="mt-3 text-[13px] text-[#d0d4d6]">
                          {project.linkLabel}
                          {project.note ? ` · ${project.note}` : ""}
                        </p>
                      </div>
                      <ArrowUpRight
                        size={28}
                        strokeWidth={1.4}
                        aria-hidden="true"
                        className="col-start-3 row-start-1 mt-1 transition-transform motion-safe:group-hover:translate-x-1 motion-safe:group-hover:-translate-y-1 sm:col-start-4 sm:mt-0 sm:h-9 sm:w-9"
                      />
                    </a>
                  </article>
                </Reveal>
              ))}
            </div>
          </section>

          <section
            id="personal-work"
            aria-labelledby="personal-work-heading"
            className="portfolio-shell portfolio-section border-t border-[var(--line)]"
          >
            <Reveal
              className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end"
              reducedMotion={reducedMotion}
            >
              <div>
                <h2
                  id="personal-work-heading"
                  className="portfolio-section-title"
                >
                  Personal projects
                </h2>
                <p className="mt-4 max-w-xl text-[16px] leading-7 text-[#b8bec1] sm:text-[19px]">
                  Earlier explorations in websites, UI recreations, and
                  interactive web apps.
                </p>
              </div>
              <div className="flex flex-col gap-5 lg:items-end">
                <span className="text-[14px] text-[var(--muted)]">
                  {filteredProjects.length} projects
                </span>
                <div
                  role="group"
                  aria-label="Filter projects"
                  className="flex flex-wrap gap-3"
                >
                  {["All", "Websites", "Web apps"].map((filter) => (
                    <motion.button
                      key={filter}
                      type="button"
                      aria-pressed={category === filter}
                      onClick={() => {
                        setCategory(filter);
                        setShowAll(false);
                      }}
                      whileTap={reducedMotion ? undefined : { scale: 0.96 }}
                      className={`min-h-11 rounded-full border px-4 py-2 text-[14px] font-medium transition-colors sm:px-6 ${category === filter ? "border-[var(--accent)] bg-[var(--accent)] text-[#0d0f10]" : "border-[#6b7276] text-[#d9dcdd] hover:border-[var(--accent)] hover:text-[var(--accent)]"}`}
                    >
                      {filter}
                    </motion.button>
                  ))}
                </div>
              </div>
            </Reveal>
            <p className="sr-only" role="status" aria-live="polite">
              Showing {visibleProjects.length} of {filteredProjects.length}{" "}
              projects
              {category === "All" ? "." : ` in ${category.toLowerCase()}.`}
            </p>
            <motion.div
              layout={!reducedMotion}
              role="list"
              aria-label="Project gallery"
              className="relative mt-10 grid grid-cols-1 gap-x-8 gap-y-12 sm:mt-12 md:grid-cols-2 lg:gap-y-16"
            >
              <AnimatePresence mode="popLayout" initial={false}>
                {visibleProjects.map((project) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    reducedMotion={reducedMotion}
                  />
                ))}
              </AnimatePresence>
            </motion.div>
            {filteredProjects.length > 4 ? (
              <div className="mt-12 flex justify-center border-t border-[var(--line)] pt-8 sm:mt-14">
                <motion.button
                  type="button"
                  aria-expanded={showAll}
                  onClick={() => setShowAll((value) => !value)}
                  className="portfolio-button border border-[var(--accent)] text-[var(--accent)] transition-colors hover:bg-[var(--accent)] hover:text-[#0d0f10]"
                  whileTap={reducedMotion ? undefined : { scale: 0.97 }}
                >
                  {showAll
                    ? "Show fewer projects"
                    : `View all ${filteredProjects.length} projects`}
                  {showAll ? (
                    <ArrowUp size={20} aria-hidden="true" />
                  ) : (
                    <ArrowUpRight size={20} aria-hidden="true" />
                  )}
                </motion.button>
              </div>
            ) : null}
          </section>

          <section
            id="about"
            aria-labelledby="about-heading"
            className="portfolio-shell"
          >
            <div className="portfolio-section grid gap-8 border-t border-[var(--line)] lg:grid-cols-[1.2fr_1fr] lg:gap-[4vw]">
              <Reveal reducedMotion={reducedMotion}>
                <p className="mb-5 text-[15px] text-[var(--muted)]">About</p>
                <h2 id="about-heading" className="portfolio-section-title">
                  <span className="block">Always curious.</span>
                  <span className="block text-[var(--accent)]">
                    Always building.
                  </span>
                </h2>
              </Reveal>
              <Reveal
                reducedMotion={reducedMotion}
                delay={0.12}
                className="lg:pt-10"
              >
                <p className="max-w-[600px] text-[18px] leading-[1.6] text-[#c5cacc] sm:text-[21px]">
                  I’m a frontend developer focused on responsive web
                  development, UI/UX, and website performance. My work includes
                  user dashboards, admin panels, and interfaces for digital
                  products.
                </p>
                <p className="mt-6 max-w-[600px] text-[18px] leading-[1.6] text-[#c5cacc] sm:text-[21px]">
                  Alongside development, I’ve led project planning, coordinated
                  teams, and managed task assignments. I value clear
                  communication, taking responsibility, and research that helps
                  the team deliver.
                </p>
                <p className="mt-8 text-[14px] leading-6 text-[var(--muted)] sm:text-[16px]">
                  Frontend Developer at Pavan · Tehran, Iran
                </p>
              </Reveal>
            </div>
          </section>

          <section
            id="skills"
            aria-labelledby="skills-heading"
            className="portfolio-shell"
          >
            <div className="portfolio-section border-t border-[var(--line)]">
              <Reveal reducedMotion={reducedMotion}>
                <p className="mb-5 text-[15px] text-[var(--muted)]">Skills</p>
                <h2 id="skills-heading" className="portfolio-section-title">
                  <span className="block">The tools behind</span>
                  <span className="block text-[var(--accent)]">the work.</span>
                </h2>
              </Reveal>
              <div className="mt-10 grid gap-x-12 sm:grid-cols-2 lg:gap-x-20">
                {SKILLS.map(({ name, Icon, description }, index) => (
                  <Reveal
                    key={name}
                    reducedMotion={reducedMotion}
                    delay={(index % 2) * 0.08}
                  >
                    <div className="flex min-h-24 items-center gap-5 border-b border-[var(--line)] py-5">
                      <Icon
                        size={30}
                        strokeWidth={1.5}
                        aria-hidden="true"
                        className="shrink-0 text-[var(--foreground)]"
                      />
                      <span className="text-[20px] font-medium tracking-[-0.025em] sm:text-[23px]">
                        {name}
                      </span>
                      <span className="ml-auto text-right text-[12px] text-[var(--muted)] sm:text-[13px]">
                        {description}
                      </span>
                    </div>
                  </Reveal>
                ))}
              </div>
              <Reveal
                reducedMotion={reducedMotion}
                className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-3 text-[14px] leading-6 text-[var(--muted)] sm:text-[16px]"
              >
                <span className="text-[var(--foreground)]">
                  Working together
                </span>
                <span>Communication</span>
                <span>Responsibility</span>
                <span>Research</span>
              </Reveal>
            </div>
          </section>

          <section
            id="experience"
            aria-labelledby="experience-heading"
            className="portfolio-shell"
          >
            <div className="portfolio-section border-t border-[var(--line)]">
              <Reveal reducedMotion={reducedMotion}>
                <p className="mb-5 text-[15px] text-[var(--muted)]">
                  Experience
                </p>
                <h2 id="experience-heading" className="portfolio-section-title">
                  Building products.{" "}
                  <span className="text-[var(--accent)]">Leading teams.</span>
                </h2>
              </Reveal>
              <div className="mt-10 sm:mt-12">
                {EXPERIENCE.map((item, index) => (
                  <Reveal
                    key={item.company}
                    reducedMotion={reducedMotion}
                    delay={index * 0.08}
                  >
                    <article
                      className={`grid gap-4 py-7 sm:grid-cols-[190px_1fr] sm:gap-8 ${index > 0 ? "border-t border-[var(--line)]" : ""}`}
                    >
                      <p className="text-[16px] leading-7 text-[var(--muted)] sm:text-[18px]">
                        <time dateTime={item.start}>{item.start}</time>
                        {" — "}
                        {item.end ? (
                          <time dateTime={item.end}>{item.end}</time>
                        ) : (
                          "Present"
                        )}
                      </p>
                      <div className="sm:border-l sm:border-[var(--line)] sm:pl-8">
                        <h3 className="text-[24px] leading-8 font-semibold tracking-[-0.025em] sm:text-[30px]">
                          <a
                            href={item.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-3 rounded-sm transition-colors hover:text-[var(--accent)]"
                          >
                            {item.company}
                            <ArrowUpRight size={19} aria-hidden="true" />
                            <span className="sr-only">
                              {" "}
                              — opens in a new tab
                            </span>
                          </a>
                        </h3>
                        <p className="mt-1 text-[16px] leading-7 text-[#c6cbce]">
                          {item.title}
                        </p>
                        <ul className="mt-4 max-w-3xl list-disc space-y-2 pl-5 text-[15px] leading-7 text-[var(--muted)] sm:text-[16px] marker:text-[#67735b]">
                          {item.responsibilities.map((responsibility) => (
                            <li key={responsibility}>{responsibility}</li>
                          ))}
                        </ul>
                      </div>
                    </article>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>

          <section
            id="education"
            aria-labelledby="education-heading"
            className="portfolio-shell"
          >
            <div className="portfolio-section grid gap-12 border-t border-[var(--line)] lg:grid-cols-[1.2fr_1fr] lg:gap-[4vw]">
              <Reveal reducedMotion={reducedMotion}>
                <h2
                  id="education-heading"
                  className="mb-8 text-[32px] font-semibold tracking-[-0.04em] sm:text-[44px]"
                >
                  Education
                </h2>
                <div className="space-y-8">
                  {EDUCATION.map((item) => (
                    <article
                      key={item.name}
                      className="border-l border-[var(--line)] pl-6"
                    >
                      <p className="text-[14px] text-[var(--muted)]">
                        {item.date}
                      </p>
                      <h3 className="mt-2 text-[20px] font-medium">
                        {item.name}
                      </h3>
                      <p className="mt-2 max-w-md text-[16px] leading-7 text-[#c5cacc]">
                        {item.href ? (
                          <a
                            href={item.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="rounded-sm underline decoration-[#6b7276] underline-offset-4 transition-colors hover:text-[var(--accent)]"
                          >
                            {item.institution}
                            <span className="sr-only">
                              {" "}
                              — opens in a new tab
                            </span>
                          </a>
                        ) : (
                          item.institution
                        )}
                      </p>
                      {item.description && (
                        <p className="mt-2 text-[14px] leading-6 text-[var(--muted)]">
                          {item.description}
                        </p>
                      )}
                    </article>
                  ))}
                </div>
              </Reveal>
              <Reveal reducedMotion={reducedMotion} delay={0.1}>
                <h2 className="mb-8 text-[32px] font-semibold tracking-[-0.04em] sm:text-[44px]">
                  Languages
                </h2>
                <dl className="max-w-lg text-[20px]">
                  <div className="flex justify-between gap-6 border-b border-[var(--line)] py-5">
                    <dt>English</dt>
                    <dd className="text-[var(--accent)]">B2</dd>
                  </div>
                  <div className="border-b border-[var(--line)] py-5">
                    <dt>French</dt>
                    <dd className="sr-only">Proficiency level not specified</dd>
                  </div>
                </dl>
              </Reveal>
            </div>
          </section>

          <section
            id="contact"
            aria-labelledby="contact-heading"
            className="portfolio-shell"
          >
            <div className="portfolio-section border-t border-[var(--line)]">
              <Reveal reducedMotion={reducedMotion}>
                <h2 id="contact-heading" className="portfolio-contact-title">
                  <span className="block">Let’s make</span>
                  <span className="block text-[var(--accent)]">
                    something click.
                  </span>
                </h2>
                <p className="mt-8 max-w-[680px] text-[17px] leading-[1.6] text-[#bdc4c8] sm:text-[22px]">
                  Have a project in mind, or just want to say hello?
                  <br className="hidden sm:block" /> Find me on the platforms
                  below.
                </p>
                <motion.a
                  href={SOCIALS[0].href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="portfolio-button mt-8 bg-[var(--accent)] text-[#0d0f10] transition-colors hover:bg-[#e3ff9e]"
                  whileHover={reducedMotion ? undefined : { scale: 1.025 }}
                  whileTap={reducedMotion ? undefined : { scale: 0.97 }}
                >
                  <Linkedin size={20} aria-hidden="true" />
                  Connect on LinkedIn
                  <ArrowUpRight size={20} aria-hidden="true" />
                  <span className="sr-only"> — opens in a new tab</span>
                </motion.a>
              </Reveal>
              <div className="mt-12 grid gap-6 sm:mt-16 sm:grid-cols-3">
                {SOCIALS.map(({ label, href, Icon }, index) => (
                  <Reveal
                    key={label}
                    reducedMotion={reducedMotion}
                    delay={index * 0.07}
                  >
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex min-h-12 items-center gap-5 rounded-sm text-[19px] transition-colors hover:text-[var(--accent)] sm:text-[23px]"
                    >
                      <Icon size={28} strokeWidth={1.5} aria-hidden="true" />
                      {label}
                      <ArrowUpRight
                        size={20}
                        strokeWidth={1.5}
                        aria-hidden="true"
                        className="transition-transform motion-safe:group-hover:translate-x-1 motion-safe:group-hover:-translate-y-1"
                      />
                      <span className="sr-only"> — opens in a new tab</span>
                    </a>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>
        </main>

        <footer className="portfolio-shell">
          <div className="flex flex-col justify-between gap-7 border-t border-[var(--line)] py-8 sm:flex-row sm:items-center sm:py-10">
            <Brand />
            <div className="flex flex-wrap items-center gap-x-8 gap-y-4 text-[13px] text-[var(--muted)] sm:text-[14px]">
              <span>© {new Date().getFullYear()} Arshia Farrokhi</span>
              <a
                href="#top"
                className="inline-flex min-h-11 items-center gap-3 rounded-sm transition-colors hover:text-[var(--accent)]"
              >
                Back to top{" "}
                <ArrowUp size={18} strokeWidth={1.5} aria-hidden="true" />
              </a>
            </div>
          </div>
        </footer>

        <dialog
          ref={menuRef}
          id={menuId}
          aria-labelledby={menuTitleId}
          className="portfolio-menu z-50 flex-col overflow-y-auto overscroll-contain"
          onCancel={(event) => {
            event.preventDefault();
            setMenuOpen(false);
          }}
          onClose={() => setMenuOpen(false)}
          onKeyDown={(event) => {
            if (event.key !== "Tab") return;
            const controls = event.currentTarget.querySelectorAll(
              "a[href], button:not([disabled])",
            );
            const first = controls[0];
            const last = controls[controls.length - 1];
            if (event.shiftKey && document.activeElement === first) {
              event.preventDefault();
              last.focus();
            } else if (!event.shiftKey && document.activeElement === last) {
              event.preventDefault();
              first.focus();
            }
          }}
        >
          <h2 id={menuTitleId} className="sr-only">
            Navigation menu
          </h2>
          <div className="portfolio-shell flex min-h-20 shrink-0 items-center justify-between gap-5 pt-[max(0.75rem,env(safe-area-inset-top))] pb-3">
            <Brand onClick={() => setMenuOpen(false)} />
            <button
              ref={closeButtonRef}
              type="button"
              aria-label="Close navigation menu"
              onClick={() => setMenuOpen(false)}
              className="inline-flex h-12 w-12 items-center justify-center rounded-md transition-colors hover:bg-white/10"
            >
              <X size={25} aria-hidden="true" />
            </button>
          </div>
          <motion.nav
            aria-label="Mobile navigation"
            initial={reducedMotion ? false : { opacity: 0 }}
            animate={{ opacity: menuOpen ? 1 : 0 }}
            transition={{ duration: reducedMotion ? 0 : 0.25 }}
            className="flex flex-1 flex-col items-center justify-center gap-5 px-6 py-8"
          >
            {NAVIGATION.map((item) => navLink(item, true))}
            <a
              href="#contact"
              onClick={() => setMenuOpen(false)}
              className="portfolio-button mt-3 bg-[var(--accent)] text-[#0d0f10]"
            >
              Let’s talk <ArrowUpRight size={20} aria-hidden="true" />
            </a>
          </motion.nav>
          <div className="portfolio-shell flex shrink-0 flex-wrap justify-center gap-8 pt-3 pb-[max(2rem,env(safe-area-inset-bottom))]">
            {SOCIALS.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMenuOpen(false)}
                aria-label={`${label} — opens in a new tab`}
                className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-[var(--line)] transition-colors hover:text-[var(--accent)]"
              >
                <Icon size={22} strokeWidth={1.5} aria-hidden="true" />
              </a>
            ))}
          </div>
        </dialog>
      </div>
    </MotionConfig>
  );
}
