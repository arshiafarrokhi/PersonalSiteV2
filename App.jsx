import {
  forwardRef,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import {
  AnimatePresence,
  LayoutGroup,
  MotionConfig,
  motion,
  useIsPresent,
  useMotionValue,
  useScroll,
  useSpring,
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
const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";
const readReducedMotion = () =>
  typeof window === "undefined" ||
  window.matchMedia(REDUCED_MOTION_QUERY).matches;
const reducedMotionOnServer = () => true;
function subscribeReducedMotion(onChange) {
  const media = window.matchMedia(REDUCED_MOTION_QUERY);
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
}
const MOTION = {
  quick: 0.2,
  reveal: 0.55,
  stagger: 0.055,
  spring: { type: "spring", stiffness: 380, damping: 30, mass: 0.7 },
};
const REVEAL_VARIANTS = {
  hidden: ({ direction }) => ({
    opacity: 0,
    x: direction === "left" ? -16 : 0,
    y: direction === "rise" ? 20 : 0,
  }),
  visible: ({ delay, reducedMotion }) => ({
    opacity: 1,
    x: 0,
    y: 0,
    transition: {
      duration: reducedMotion ? 0 : MOTION.reveal,
      delay: reducedMotion ? 0 : delay,
      ease: EASE,
    },
  }),
};
const WORD_VARIANTS = {
  hidden: { opacity: 0, y: "105%" },
  visible: (reducedMotion) => ({
    opacity: 1,
    y: 0,
    transition: { duration: reducedMotion ? 0 : 0.65, ease: EASE },
  }),
};
const STAGGER_VARIANTS = {
  hidden: {},
  visible: ({ reducedMotion, delay = 0, stagger = MOTION.stagger }) => ({
    transition: {
      delayChildren: reducedMotion ? 0 : delay,
      staggerChildren: reducedMotion ? 0 : stagger,
    },
  }),
  exit: ({ reducedMotion }) => ({
    transition: {
      staggerChildren: reducedMotion ? 0 : 0.02,
      staggerDirection: -1,
    },
  }),
};
const MENU_ITEM_VARIANTS = {
  hidden: { opacity: 0, y: 18 },
  visible: (reducedMotion) => ({
    opacity: 1,
    y: 0,
    transition: { duration: reducedMotion ? 0 : 0.4, ease: EASE },
  }),
  exit: (reducedMotion) => ({
    opacity: 0,
    y: reducedMotion ? 0 : -8,
    transition: { duration: reducedMotion ? 0 : 0.12, ease: EASE },
  }),
};
const CONTROL_VARIANTS = {
  idle: { y: 0, scale: 1 },
  hover: { y: -2, scale: 1.015 },
  pressed: { y: 0, scale: 0.97 },
};
const CARD_VARIANTS = {
  hidden: { opacity: 0, y: 22, scale: 0.985 },
  visible: ({ reducedMotion, index }) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: reducedMotion ? 0 : 0.45,
      delay: reducedMotion ? 0 : (index % 2) * MOTION.stagger,
      ease: EASE,
    },
  }),
  exit: ({ reducedMotion }) => ({
    opacity: 0,
    scale: reducedMotion ? 1 : 0.985,
    transition: { duration: reducedMotion ? 0 : 0.18, ease: EASE },
  }),
};
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
  .portfolio-app p { text-wrap: pretty; }
  .portfolio-app time { font-variant-numeric: tabular-nums; }
  .portfolio-word-mask {
    display: inline-block;
    vertical-align: bottom;
    overflow: hidden;
    padding-block: .08em .18em;
    margin-block: -.08em -.18em;
  }
  .portfolio-nav-link { position: relative; }
  .portfolio-nav-link::after {
    content: "";
    position: absolute;
    height: 1px;
    inset-inline: 0;
    bottom: 4px;
    background: currentColor;
    transform: scaleX(0);
    transform-origin: left;
    transition: transform .22s ease;
  }
  .portfolio-nav-link:is(:hover, :focus-visible)::after { transform: scaleX(1); }
  .portfolio-nav-link[aria-current]::after { opacity: 0; }
  .portfolio-button { position: relative; isolation: isolate; overflow: hidden; }
  .portfolio-button::before {
    content: "";
    position: absolute;
    z-index: -1;
    inset: 0;
    background: rgb(255 255 255 / .10);
    transform: translateX(-101%);
    transition: transform .3s ease;
  }
  .portfolio-button:is(:hover, :focus-visible)::before { transform: translateX(0); }
  .portfolio-button svg, .portfolio-interactive-link svg {
    flex-shrink: 0;
    transition: transform .25s ease;
  }
  .portfolio-professional-row { position: relative; isolation: isolate; }
  .portfolio-professional-row::before {
    content: "";
    position: absolute;
    z-index: -1;
    inset: 0;
    background: linear-gradient(90deg, rgb(212 247 125 / .045), transparent 80%);
    opacity: 0;
    transition: opacity .25s ease;
  }
  .portfolio-professional-row:is(:hover, :focus-visible)::before { opacity: 1; }
  .portfolio-skill-icon { transition: color .25s ease; }
  .portfolio-skill-row:hover .portfolio-skill-icon { color: var(--accent); }
  @media (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference) {
    .portfolio-button:is(:hover, :focus-visible) svg:last-of-type,
    .portfolio-interactive-link:is(:hover, :focus-visible) svg:last-of-type { transform: translate(3px, -3px); }
    .portfolio-professional-row h3 { transition: transform .3s ease, color .25s ease; }
    .portfolio-professional-row:is(:hover, :focus-visible) h3 { transform: translateX(5px); }
  }
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
  .portfolio-menu::backdrop { background: transparent; }
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
    .portfolio-button::before { transform: none; opacity: 0; }
    .portfolio-button:is(:hover, :focus-visible)::before { opacity: 1; }
    .portfolio-nav-link::after { transform: none; opacity: 0; }
    .portfolio-nav-link:is(:hover, :focus-visible)::after { opacity: 1; }
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

function Reveal({
  children,
  className = "",
  delay = 0,
  direction = "rise",
  reducedMotion,
}) {
  return (
    <motion.div
      className={className}
      custom={{ delay, direction, reducedMotion }}
      variants={REVEAL_VARIANTS}
      initial={reducedMotion ? false : "hidden"}
      animate={reducedMotion ? "visible" : undefined}
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
    >
      {children}
    </motion.div>
  );
}

function SplitHeading({
  as = "h2",
  id,
  text,
  lines,
  accentWords = [],
  accentLine,
  className,
  hero = false,
  reducedMotion,
}) {
  const Heading = as === "h1" ? motion.h1 : motion.h2;
  const content = lines ?? [text];
  return (
    <Heading
      id={id}
      className={className}
      initial={reducedMotion ? false : "hidden"}
      animate={hero || reducedMotion ? "visible" : undefined}
      whileInView={hero ? undefined : "visible"}
      viewport={{ once: true, amount: 0.3 }}
      custom={{ reducedMotion, delay: hero ? 0.12 : 0 }}
      variants={STAGGER_VARIANTS}
    >
      <span className="sr-only">{content.join(" ")}</span>
      <span aria-hidden="true">
        {content.map((line, lineIndex) => {
          const words = line.split(" ");
          return (
            <span
              key={`${lineIndex}-${line}`}
              className={lines ? "block" : undefined}
            >
              {words.map((word, wordIndex) => (
                <span key={`${wordIndex}-${word}`}>
                  <span
                    className={`portfolio-word-mask ${accentLine === lineIndex || accentWords.includes(word) ? "text-[var(--accent)]" : ""}`}
                  >
                    <motion.span
                      className="block"
                      variants={WORD_VARIANTS}
                      custom={reducedMotion}
                    >
                      {word}
                    </motion.span>
                  </span>
                  {wordIndex < words.length - 1 ? " " : null}
                </span>
              ))}
            </span>
          );
        })}
      </span>
    </Heading>
  );
}

const MotionButton = forwardRef(function MotionButton(
  { as = "a", className = "", reducedMotion, children, ...props },
  ref,
) {
  const Element = as === "button" ? motion.button : motion.a;
  return (
    <Element
      ref={ref}
      className={`portfolio-button ${className}`}
      variants={CONTROL_VARIANTS}
      initial="idle"
      animate="idle"
      whileHover={reducedMotion ? undefined : "hover"}
      whileTap={reducedMotion ? undefined : "pressed"}
      transition={reducedMotion ? { duration: 0 } : MOTION.spring}
      {...props}
    >
      {children}
    </Element>
  );
});

function NavigationLink({
  item,
  active,
  mobile = false,
  onNavigate,
  reducedMotion,
}) {
  return (
    <motion.a
      href={`#${item.id}`}
      onClick={onNavigate}
      aria-current={active ? "location" : undefined}
      variants={MENU_ITEM_VARIANTS}
      custom={reducedMotion}
      className={`portfolio-nav-link ${mobile ? "min-h-12 px-2 text-[clamp(28px,6.5vw,48px)] tracking-[-0.035em]" : "min-h-11 text-[14px]"} inline-flex items-center rounded-sm font-normal transition-colors hover:text-[var(--accent)] ${active ? "text-[var(--accent)]" : "text-[#c6c9ca]"}`}
    >
      {item.label}
      {active ? (
        <motion.span
          layoutId="active-navigation"
          aria-hidden="true"
          className="pointer-events-none absolute right-0 bottom-1 left-0 h-px bg-[var(--accent)]"
          transition={reducedMotion ? { duration: 0 } : MOTION.spring}
        />
      ) : null}
    </motion.a>
  );
}

function HeroPortrait({ scrollProgress, reducedMotion }) {
  const [finePointer, setFinePointer] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 130, damping: 24 });
  const springY = useSpring(y, { stiffness: 130, damping: 24 });
  const parallax = useTransform(scrollProgress, [0, 1], [0, 28]);
  const scale = useTransform(scrollProgress, [0, 1], [1.015, 1.065]);

  useEffect(() => {
    const media = window.matchMedia(
      "(min-width: 1024px) and (hover: hover) and (pointer: fine)",
    );
    const update = () => setFinePointer(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);
  useEffect(() => {
    if (!reducedMotion && finePointer) return;
    x.jump(0);
    y.jump(0);
    springX.jump(0);
    springY.jump(0);
  }, [finePointer, reducedMotion, x, y, springX, springY]);

  return (
    <motion.figure
      className="relative mx-auto aspect-[0.925] w-full max-w-[650px] overflow-hidden rounded-[24px] border border-white/[0.07] bg-[#151819] lg:mx-0"
      style={{
        y: !reducedMotion && finePointer ? parallax : 0,
        perspective: 1000,
      }}
      initial={reducedMotion ? false : { opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: reducedMotion ? 0 : 0.8,
        delay: reducedMotion ? 0 : 0.16,
        ease: EASE,
      }}
      onPointerMove={(event) => {
        if (reducedMotion || !finePointer || event.pointerType !== "mouse")
          return;
        const rect = event.currentTarget.getBoundingClientRect();
        x.set(((event.clientX - rect.left) / rect.width - 0.5) * 5);
        y.set(-((event.clientY - rect.top) / rect.height - 0.5) * 5);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      <motion.div
        className="absolute inset-0"
        style={{
          rotateY: reducedMotion || !finePointer ? 0 : springX,
          rotateX: reducedMotion || !finePointer ? 0 : springY,
          scale: reducedMotion || !finePointer ? 1 : scale,
        }}
      >
        <ResponsiveImage
          file="portrait.jpg"
          alt="Portrait of Arshia Farrokhi wearing glasses, photographed in red and blue light"
          portrait
          eager
        />
      </motion.div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[inherit] ring-1 ring-white/10 ring-inset"
      />
    </motion.figure>
  );
}

function MobileMenu({
  id,
  titleId,
  activeSection,
  reducedMotion,
  triggerRef,
  onRequestClose,
  onNavigate,
  onAfterClose,
}) {
  const dialogRef = useRef(null);
  const closeRef = useRef(null);
  const isPresent = useIsPresent();
  const navigationGroup = useId();
  useEffect(() => {
    const dialog = dialogRef.current;
    const body = document.body;
    const root = document.documentElement;
    const previous = {
      bodyOverflow: body.style.overflow,
      rootOverflow: root.style.overflow,
      padding: body.style.paddingRight,
    };
    const scrollbarWidth = window.innerWidth - root.clientWidth;
    if (scrollbarWidth > 0)
      body.style.paddingRight = `${(parseFloat(getComputedStyle(body).paddingRight) || 0) + scrollbarWidth}px`;
    body.style.overflow = "hidden";
    root.style.overflow = "hidden";
    dialog.showModal();
    closeRef.current.focus({ preventScroll: true });
    const desktop = window.matchMedia("(min-width: 1024px)");
    const onResize = () => {
      if (desktop.matches) onRequestClose();
    };
    desktop.addEventListener("change", onResize);
    onResize();
    return () => {
      desktop.removeEventListener("change", onResize);
      if (dialog.open) dialog.close();
      body.style.overflow = previous.bodyOverflow;
      root.style.overflow = previous.rootOverflow;
      body.style.paddingRight = previous.padding;
      const target = triggerRef.current?.getClientRects().length
        ? triggerRef.current
        : document.querySelector("header a");
      target?.focus({ preventScroll: true });
      onAfterClose();
    };
  }, [onRequestClose, onAfterClose, triggerRef]);

  return (
    <motion.dialog
      ref={dialogRef}
      id={id}
      aria-labelledby={titleId}
      className="portfolio-menu z-50 flex-col overflow-y-auto overscroll-contain"
      initial={reducedMotion ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: reducedMotion ? 0 : MOTION.quick, ease: EASE }}
      onCancel={(event) => {
        event.preventDefault();
        onRequestClose();
      }}
      onClose={() => {
        if (isPresent && !dialogRef.current?.open) onRequestClose();
      }}
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
      <h2 id={titleId} className="sr-only">
        Navigation menu
      </h2>
      <div className="portfolio-shell flex min-h-20 shrink-0 items-center justify-between gap-5 pt-[max(0.75rem,env(safe-area-inset-top))] pb-3">
        <Brand onClick={onNavigate} />
        <motion.button
          ref={closeRef}
          type="button"
          aria-label="Close navigation menu"
          onClick={onRequestClose}
          className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-[var(--line)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
          whileTap={reducedMotion ? undefined : { scale: 0.9 }}
          transition={reducedMotion ? { duration: 0 } : MOTION.spring}
        >
          <X size={25} aria-hidden="true" />
        </motion.button>
      </div>
      <LayoutGroup id={navigationGroup}>
        <motion.nav
          aria-label="Mobile navigation"
          initial={reducedMotion ? false : "hidden"}
          animate="visible"
          exit="exit"
          custom={{ reducedMotion }}
          variants={STAGGER_VARIANTS}
          className="flex flex-1 flex-col items-center justify-center gap-4 px-6 py-8"
        >
          {NAVIGATION.map((item) => (
            <NavigationLink
              key={item.id}
              item={item}
              active={activeSection === item.id}
              mobile
              reducedMotion={reducedMotion}
              onNavigate={onNavigate}
            />
          ))}
          <MotionButton
            href="#contact"
            onClick={onNavigate}
            reducedMotion={reducedMotion}
            className="mt-5 bg-[var(--accent)] text-[#0d0f10]"
          >
            Let’s talk <ArrowUpRight size={20} aria-hidden="true" />
          </MotionButton>
        </motion.nav>
      </LayoutGroup>
      <div className="portfolio-shell flex shrink-0 flex-wrap justify-center gap-8 pt-3 pb-[max(2rem,env(safe-area-inset-bottom))]">
        {SOCIALS.map(({ label, href, Icon }) => (
          <motion.a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onRequestClose}
            aria-label={`${label} — opens in a new tab`}
            className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-[var(--line)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
            whileHover={reducedMotion ? undefined : { y: -3 }}
            whileTap={reducedMotion ? undefined : { scale: 0.94 }}
            transition={reducedMotion ? { duration: 0 } : MOTION.spring}
          >
            <Icon size={22} strokeWidth={1.5} aria-hidden="true" />
          </motion.a>
        ))}
      </div>
    </motion.dialog>
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
  { project, reducedMotion, index },
  ref,
) {
  const isPresent = useIsPresent();
  return (
    <motion.article
      ref={ref}
      role="listitem"
      inert={!isPresent}
      aria-hidden={!isPresent || undefined}
      layout={!reducedMotion}
      custom={{ reducedMotion, index }}
      variants={CARD_VARIANTS}
      initial={reducedMotion ? false : "hidden"}
      animate={reducedMotion ? "visible" : undefined}
      whileInView="visible"
      viewport={{ once: true, amount: 0.12 }}
      exit="exit"
      transition={{ layout: reducedMotion ? { duration: 0 } : MOTION.spring }}
      className="min-w-0"
    >
      <motion.a
        href={project.href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`View ${project.title} — opens in a new tab`}
        className="portfolio-interactive-link group block rounded-xl"
        whileHover={reducedMotion ? undefined : { y: -5 }}
        whileTap={reducedMotion ? undefined : { scale: 0.99 }}
        transition={reducedMotion ? { duration: 0 } : MOTION.spring}
      >
        <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-white/10 bg-[#171a1c] transition-colors duration-300 group-hover:border-[var(--accent)]/50 group-focus-visible:border-[var(--accent)]/50">
          <div className="absolute inset-0 transition-transform duration-500 motion-safe:group-hover:scale-[1.025]">
            <ResponsiveImage
              file={project.image}
              alt={`Screenshot of ${project.title}`}
            />
          </div>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-black/[0.06] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          />
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
  // This Motion version's hook retains its first snapshot. A native subscription
  // lets the same mounted page respond immediately to preference changes.
  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    readReducedMotion,
    reducedMotionOnServer,
  );
  const [menuOpen, setMenuOpen] = useState(false);
  const [category, setCategory] = useState("All");
  const [showAll, setShowAll] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const heroRef = useRef(null);
  const menuTriggerRef = useRef(null);
  const pendingNavigation = useRef(null);
  const galleryToggleRef = useRef(null);
  const menuId = useId();
  const menuTitleId = useId();
  const desktopNavId = useId();
  const pageLayoutId = useId();
  const galleryId = useId();
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const galleryLayout = `${category}:${showAll}`;
  const sectionLayout = {
    layout: reducedMotion ? false : "position",
    layoutDependency: galleryLayout,
    transition: { layout: reducedMotion ? { duration: 0 } : MOTION.spring },
  };
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
          if (entry.isIntersecting)
            setActiveSection(
              entry.target.id === "personal-work" ? "work" : entry.target.id,
            );
        }
      },
      { rootMargin: "-15% 0px -60% 0px", threshold: 0 },
    );
    for (const id of [
      ...NAVIGATION.map((item) => item.id),
      "personal-work",
      "contact",
    ]) {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    }
    if (heroRef.current) observer.observe(heroRef.current);
    return () => observer.disconnect();
  }, []);

  const closeMenu = useCallback(() => setMenuOpen(false), []);
  const navigateFromMenu = useCallback((event) => {
    if (
      event.button !== 0 ||
      event.ctrlKey ||
      event.metaKey ||
      event.shiftKey ||
      event.altKey
    )
      return;
    event.preventDefault();
    pendingNavigation.current = event.currentTarget.getAttribute("href");
    setMenuOpen(false);
  }, []);
  const afterMenuClose = useCallback(() => {
    const href = pendingNavigation.current;
    pendingNavigation.current = null;
    if (!href) return;
    const target = document.getElementById(href.slice(1));
    if (window.location.hash !== href) window.location.hash = href;
    else
      target?.scrollIntoView({
        block: "start",
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "auto"
          : "smooth",
      });
    target?.focus({ preventScroll: true });
  }, []);

  // Apply the live preference explicitly, including custom spring values,
  // so preference changes never require remounting the page.
  return (
    <MotionConfig
      reducedMotion="never"
      transition={
        reducedMotion ? { duration: 0 } : { duration: MOTION.quick, ease: EASE }
      }
    >
      <div
        id="top"
        lang="en"
        dir="ltr"
        tabIndex={-1}
        className="portfolio-app relative min-h-screen w-full overflow-hidden antialiased"
      >
        <style>{STYLES}</style>
        <a
          href="#main-content"
          className="absolute top-3 left-5 z-50 -translate-y-24 rounded-lg bg-[var(--accent)] px-5 py-3 font-medium text-[#0d0f10] focus:translate-y-0"
        >
          Skip to content
        </a>

        <motion.header
          initial={reducedMotion ? false : { opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reducedMotion ? 0 : 0.4, ease: EASE }}
          className="portfolio-shell relative z-20 flex min-h-20 items-center justify-between gap-5 py-3"
        >
          <Brand />
          <div className="hidden items-center gap-8 lg:flex">
            <LayoutGroup id={desktopNavId}>
              <motion.nav
                aria-label="Main navigation"
                className="flex items-center gap-8"
                initial={reducedMotion ? false : "hidden"}
                animate="visible"
                custom={{ reducedMotion, stagger: 0.045 }}
                variants={STAGGER_VARIANTS}
              >
                {NAVIGATION.map((item) => (
                  <NavigationLink
                    key={item.id}
                    item={item}
                    active={activeSection === item.id}
                    reducedMotion={reducedMotion}
                  />
                ))}
              </motion.nav>
            </LayoutGroup>
            <MotionButton
              href="#contact"
              className="border border-[var(--accent)] text-[var(--accent)] transition-colors hover:bg-[var(--accent)] hover:text-[#0d0f10]"
              reducedMotion={reducedMotion}
            >
              Let’s talk
            </MotionButton>
          </div>
          <motion.button
            ref={menuTriggerRef}
            type="button"
            aria-label="Open navigation menu"
            aria-haspopup="dialog"
            aria-expanded={menuOpen}
            aria-controls={menuOpen ? menuId : undefined}
            onClick={() => setMenuOpen(true)}
            className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-md transition-colors hover:bg-white/10 lg:hidden"
            whileTap={reducedMotion ? undefined : { scale: 0.9 }}
            transition={reducedMotion ? { duration: 0 } : MOTION.spring}
          >
            <Menu size={25} aria-hidden="true" />
          </motion.button>
        </motion.header>

        <LayoutGroup id={pageLayoutId}>
          <main id="main-content" tabIndex={-1}>
            <section
              ref={heroRef}
              aria-labelledby="hero-heading"
              className="portfolio-shell pt-5 lg:pt-3.5"
            >
              <div className="grid items-center gap-10 pb-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:gap-[4vw] lg:pb-9">
                <div className="min-w-0">
                  <SplitHeading
                    as="h1"
                    id="hero-heading"
                    className="portfolio-headline"
                    lines={["Creative", "frontend", "developer."]}
                    accentLine={1}
                    hero
                    reducedMotion={reducedMotion}
                  />
                  <motion.p
                    className="mt-8 max-w-[640px] text-[clamp(16px,1.45vw,23px)] leading-[1.45] text-[#c0c5c8] lg:mt-10"
                    initial={reducedMotion ? false : { opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: reducedMotion ? 0 : MOTION.reveal,
                      delay: reducedMotion ? 0 : 0.3,
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
                      duration: reducedMotion ? 0 : 0.4,
                      delay: reducedMotion ? 0 : 0.45,
                      ease: EASE,
                    }}
                  >
                    <MotionButton
                      href="#work"
                      className="bg-[var(--accent)] text-[#0d0f10] transition-colors hover:bg-[#e3ff9e]"
                      reducedMotion={reducedMotion}
                    >
                      Explore my work{" "}
                      <ArrowUpRight
                        size={21}
                        strokeWidth={1.6}
                        aria-hidden="true"
                      />
                    </MotionButton>
                    <a
                      href={SOCIALS[1].href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-11 items-center rounded-sm text-[17px] underline decoration-[#7c8183] underline-offset-8 transition-colors hover:text-[var(--accent)]"
                    >
                      GitHub
                      <span className="sr-only"> — opens in a new tab</span>
                    </a>
                  </motion.div>
                </div>
                <HeroPortrait
                  scrollProgress={scrollYProgress}
                  reducedMotion={reducedMotion}
                />
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

            <motion.section
              {...sectionLayout}
              tabIndex={-1}
              id="work"
              aria-labelledby="work-heading"
              className="portfolio-shell portfolio-section"
            >
              <Reveal direction="fade" reducedMotion={reducedMotion}>
                <p className="mb-5 text-[15px] text-[var(--muted)]">
                  Professional projects
                </p>
                <SplitHeading
                  id="work-heading"
                  className="portfolio-section-title"
                  text="Interfaces for real products."
                  accentWords={["real", "products."]}
                  reducedMotion={reducedMotion}
                />
                <p className="mt-5 max-w-2xl text-[16px] leading-7 text-[#b8bec1] sm:text-[19px]">
                  Selected work across payment platforms, AI products, and
                  company websites, with a focus on user and admin experiences.
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
                      <motion.a
                        href={project.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${project.linkLabel}: ${project.name} — opens in a new tab${project.note ? `; ${project.note}` : ""}`}
                        className="portfolio-professional-row portfolio-interactive-link group grid min-w-0 grid-cols-[28px_minmax(0,1fr)_32px] items-start gap-x-4 gap-y-5 rounded-sm py-8 transition-colors sm:grid-cols-[40px_minmax(0,1.1fr)_minmax(0,1fr)_48px] sm:items-center sm:gap-x-8 sm:py-10"
                        whileTap={reducedMotion ? undefined : { scale: 0.995 }}
                        transition={
                          reducedMotion ? { duration: 0 } : MOTION.spring
                        }
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
                      </motion.a>
                    </article>
                  </Reveal>
                ))}
              </div>
            </motion.section>

            <motion.section
              {...sectionLayout}
              tabIndex={-1}
              id="personal-work"
              aria-labelledby="personal-work-heading"
              className="portfolio-shell portfolio-section border-t border-[var(--line)]"
            >
              <Reveal
                className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end"
                reducedMotion={reducedMotion}
              >
                <div>
                  <SplitHeading
                    id="personal-work-heading"
                    className="portfolio-section-title"
                    text="Personal projects"
                    reducedMotion={reducedMotion}
                  />
                  <p className="mt-4 max-w-xl text-[16px] leading-7 text-[#b8bec1] sm:text-[19px]">
                    Earlier explorations in websites, UI recreations, and
                    interactive web apps.
                  </p>
                </div>
                <div className="flex flex-col gap-5 lg:shrink-0 lg:items-end">
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
                        transition={
                          reducedMotion ? { duration: 0 } : MOTION.spring
                        }
                        className={`relative isolate min-h-11 rounded-full border px-4 py-2 text-[14px] font-medium transition-colors sm:px-6 ${category === filter ? "border-[var(--accent)] text-[#0d0f10]" : "border-[#6b7276] text-[#d9dcdd] hover:border-[var(--accent)] hover:text-[var(--accent)]"}`}
                      >
                        {category === filter ? (
                          <motion.span
                            aria-hidden="true"
                            layoutId="gallery-filter"
                            className="pointer-events-none absolute inset-0 -z-10 rounded-full bg-[var(--accent)]"
                            transition={
                              reducedMotion ? { duration: 0 } : MOTION.spring
                            }
                          />
                        ) : null}
                        <span>{filter}</span>
                      </motion.button>
                    ))}
                  </div>
                  {filteredProjects.length > 4 ? (
                    <MotionButton
                      ref={galleryToggleRef}
                      as="button"
                      reducedMotion={reducedMotion}
                      type="button"
                      aria-expanded={showAll}
                      aria-controls={galleryId}
                      onClick={() => setShowAll((value) => !value)}
                      className="w-[260px] max-w-full border border-[var(--accent)] text-[var(--accent)] transition-colors hover:bg-[var(--accent)] hover:text-[#0d0f10]"
                    >
                      {showAll
                        ? "Show fewer projects"
                        : `View all ${filteredProjects.length} projects`}
                      {showAll ? (
                        <ArrowUp size={20} aria-hidden="true" />
                      ) : (
                        <ArrowUpRight size={20} aria-hidden="true" />
                      )}
                    </MotionButton>
                  ) : null}
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
                id={galleryId}
                aria-label="Project gallery"
                className="relative mt-10 grid grid-cols-1 gap-x-8 gap-y-12 sm:mt-12 md:grid-cols-2 lg:gap-y-16"
              >
                <AnimatePresence mode="popLayout" initial={false}>
                  {visibleProjects.map((project, index) => (
                    <ProjectCard
                      key={project.id}
                      project={project}
                      reducedMotion={reducedMotion}
                      index={index}
                    />
                  ))}
                </AnimatePresence>
              </motion.div>
              {showAll && filteredProjects.length > 4 ? (
                <motion.div
                  layout={reducedMotion ? false : "position"}
                  layoutDependency={galleryLayout}
                  className="mt-12 flex justify-center border-t border-[var(--line)] pt-8 sm:mt-14"
                >
                  <MotionButton
                    as="button"
                    reducedMotion={reducedMotion}
                    type="button"
                    aria-label="Show fewer projects and return to filters"
                    aria-expanded={showAll}
                    aria-controls={galleryId}
                    onClick={() => {
                      setShowAll(false);
                      galleryToggleRef.current?.focus();
                    }}
                    className="border border-[var(--accent)] text-[var(--accent)] transition-colors hover:bg-[var(--accent)] hover:text-[#0d0f10]"
                  >
                    Show fewer projects <ArrowUp size={20} aria-hidden="true" />
                  </MotionButton>
                </motion.div>
              ) : null}
            </motion.section>

            <motion.section
              {...sectionLayout}
              tabIndex={-1}
              id="about"
              aria-labelledby="about-heading"
              className="portfolio-shell"
            >
              <div className="portfolio-section grid gap-8 border-t border-[var(--line)] lg:grid-cols-[1.2fr_1fr] lg:gap-[4vw]">
                <Reveal direction="fade" reducedMotion={reducedMotion}>
                  <p className="mb-5 text-[15px] text-[var(--muted)]">About</p>
                  <SplitHeading
                    id="about-heading"
                    className="portfolio-section-title"
                    lines={["Always curious.", "Always building."]}
                    accentLine={1}
                    reducedMotion={reducedMotion}
                  />
                </Reveal>
                <Reveal
                  direction="left"
                  reducedMotion={reducedMotion}
                  delay={0.12}
                  className="lg:pt-10"
                >
                  <p className="max-w-[600px] text-[18px] leading-[1.6] text-[#c5cacc] sm:text-[21px]">
                    I’m a frontend developer focused on responsive web
                    development, UI/UX, and website performance. My work
                    includes user dashboards, admin panels, and interfaces for
                    digital products.
                  </p>
                  <p className="mt-6 max-w-[600px] text-[18px] leading-[1.6] text-[#c5cacc] sm:text-[21px]">
                    Alongside development, I’ve led project planning,
                    coordinated teams, and managed task assignments. I value
                    clear communication, taking responsibility, and research
                    that helps the team deliver.
                  </p>
                  <p className="mt-8 text-[14px] leading-6 text-[var(--muted)] sm:text-[16px]">
                    Frontend Developer at Pavan · Tehran, Iran
                  </p>
                </Reveal>
              </div>
            </motion.section>

            <motion.section
              {...sectionLayout}
              tabIndex={-1}
              id="skills"
              aria-labelledby="skills-heading"
              className="portfolio-shell"
            >
              <div className="portfolio-section border-t border-[var(--line)]">
                <Reveal direction="fade" reducedMotion={reducedMotion}>
                  <p className="mb-5 text-[15px] text-[var(--muted)]">Skills</p>
                  <SplitHeading
                    id="skills-heading"
                    className="portfolio-section-title"
                    lines={["The tools behind", "the work."]}
                    accentLine={1}
                    reducedMotion={reducedMotion}
                  />
                </Reveal>
                <div className="mt-10 grid gap-x-12 sm:grid-cols-2 lg:gap-x-20">
                  {SKILLS.map(({ name, Icon, description }, index) => (
                    <Reveal
                      key={name}
                      reducedMotion={reducedMotion}
                      delay={(index % 2) * 0.08}
                    >
                      <motion.div
                        className="portfolio-skill-row flex min-h-24 items-center gap-5 border-b border-[var(--line)] py-5"
                        initial="idle"
                        animate="idle"
                        whileHover={reducedMotion ? undefined : "hover"}
                      >
                        <motion.span
                          className="portfolio-skill-icon shrink-0"
                          variants={{
                            idle: { rotate: 0, scale: 1 },
                            hover: { rotate: -6, scale: 1.06 },
                          }}
                          transition={
                            reducedMotion ? { duration: 0 } : MOTION.spring
                          }
                        >
                          <Icon
                            size={30}
                            strokeWidth={1.5}
                            aria-hidden="true"
                          />
                        </motion.span>
                        <span className="text-[20px] font-medium tracking-[-0.025em] sm:text-[23px]">
                          {name}
                        </span>
                        <span className="ml-auto text-right text-[12px] text-[var(--muted)] sm:text-[13px]">
                          {description}
                        </span>
                      </motion.div>
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
            </motion.section>

            <motion.section
              {...sectionLayout}
              tabIndex={-1}
              id="experience"
              aria-labelledby="experience-heading"
              className="portfolio-shell"
            >
              <div className="portfolio-section border-t border-[var(--line)]">
                <Reveal direction="fade" reducedMotion={reducedMotion}>
                  <p className="mb-5 text-[15px] text-[var(--muted)]">
                    Experience
                  </p>
                  <SplitHeading
                    id="experience-heading"
                    className="portfolio-section-title"
                    text="Building products. Leading teams."
                    accentWords={["Leading", "teams."]}
                    reducedMotion={reducedMotion}
                  />
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
                        <div className="relative sm:pl-8">
                          <motion.span
                            aria-hidden="true"
                            className="absolute top-0 bottom-0 left-0 hidden w-px origin-top bg-[var(--line)] sm:block"
                            initial={reducedMotion ? false : { scaleY: 0 }}
                            whileInView={{ scaleY: 1 }}
                            viewport={{ once: true }}
                            transition={{
                              duration: reducedMotion ? 0 : 0.7,
                              ease: EASE,
                            }}
                          />
                          <h3 className="text-[24px] leading-8 font-semibold tracking-[-0.025em] sm:text-[30px]">
                            <a
                              href={item.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="portfolio-interactive-link inline-flex items-center gap-3 rounded-sm transition-colors hover:text-[var(--accent)]"
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
            </motion.section>

            <motion.section
              {...sectionLayout}
              tabIndex={-1}
              id="education"
              aria-labelledby="education-heading"
              className="portfolio-shell"
            >
              <div className="portfolio-section grid gap-12 border-t border-[var(--line)] lg:grid-cols-[1.2fr_1fr] lg:gap-[4vw]">
                <Reveal reducedMotion={reducedMotion}>
                  <SplitHeading
                    id="education-heading"
                    text="Education"
                    className="mb-8 text-[32px] font-semibold tracking-[-0.04em] sm:text-[44px]"
                    reducedMotion={reducedMotion}
                  />
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
                  <SplitHeading
                    text="Languages"
                    className="mb-8 text-[32px] font-semibold tracking-[-0.04em] sm:text-[44px]"
                    reducedMotion={reducedMotion}
                  />
                  <dl className="max-w-lg text-[20px]">
                    <div className="flex justify-between gap-6 border-b border-[var(--line)] py-5">
                      <dt>English</dt>
                      <dd className="text-[var(--accent)]">B2</dd>
                    </div>
                    <div className="border-b border-[var(--line)] py-5">
                      <dt>French</dt>
                      <dd className="sr-only">
                        Proficiency level not specified
                      </dd>
                    </div>
                  </dl>
                </Reveal>
              </div>
            </motion.section>

            <motion.section
              {...sectionLayout}
              tabIndex={-1}
              id="contact"
              aria-labelledby="contact-heading"
              className="portfolio-shell"
            >
              <div className="portfolio-section border-t border-[var(--line)]">
                <Reveal direction="fade" reducedMotion={reducedMotion}>
                  <SplitHeading
                    id="contact-heading"
                    className="portfolio-contact-title"
                    lines={["Let’s make", "something click."]}
                    accentLine={1}
                    reducedMotion={reducedMotion}
                  />
                  <p className="mt-8 max-w-[680px] text-[17px] leading-[1.6] text-[#bdc4c8] sm:text-[22px]">
                    Have a project in mind, or just want to say hello?
                    <br className="hidden sm:block" /> Find me on the platforms
                    below.
                  </p>
                  <MotionButton
                    reducedMotion={reducedMotion}
                    href={SOCIALS[0].href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-8 bg-[var(--accent)] text-[#0d0f10] transition-colors hover:bg-[#e3ff9e]"
                  >
                    <Linkedin size={20} aria-hidden="true" />
                    Connect on LinkedIn
                    <ArrowUpRight size={20} aria-hidden="true" />
                    <span className="sr-only"> — opens in a new tab</span>
                  </MotionButton>
                </Reveal>
                <div className="mt-12 grid gap-6 sm:mt-16 sm:grid-cols-3">
                  {SOCIALS.map(({ label, href, Icon }, index) => (
                    <Reveal
                      key={label}
                      reducedMotion={reducedMotion}
                      delay={index * 0.07}
                    >
                      <motion.a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="portfolio-interactive-link group inline-flex min-h-12 items-center gap-5 rounded-sm text-[19px] transition-colors hover:text-[var(--accent)] sm:text-[23px]"
                        whileHover={reducedMotion ? undefined : { y: -2 }}
                        whileTap={reducedMotion ? undefined : { scale: 0.97 }}
                        transition={
                          reducedMotion ? { duration: 0 } : MOTION.spring
                        }
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
                      </motion.a>
                    </Reveal>
                  ))}
                </div>
              </div>
            </motion.section>
          </main>

          <motion.footer
            layout={reducedMotion ? false : "position"}
            layoutDependency={galleryLayout}
            className="portfolio-shell"
          >
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
          </motion.footer>
        </LayoutGroup>

        <AnimatePresence>
          {menuOpen ? (
            <MobileMenu
              key="mobile-navigation"
              id={menuId}
              titleId={menuTitleId}
              activeSection={activeSection}
              reducedMotion={reducedMotion}
              triggerRef={menuTriggerRef}
              onRequestClose={closeMenu}
              onNavigate={navigateFromMenu}
              onAfterClose={afterMenuClose}
            />
          ) : null}
        </AnimatePresence>
      </div>
    </MotionConfig>
  );
}
