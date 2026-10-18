import {
  Component,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import {
  AnimatePresence,
  MotionConfig,
  motion,
  useDragControls,
  useMotionValue,
} from "framer-motion";
import {
  BrowserRouter,
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { PROJECTS, ROUTES, SITE } from "./content.js";

const REDUCED_QUERY = "(prefers-reduced-motion: reduce)";
const readReducedMotion = () =>
  typeof window === "undefined" || window.matchMedia(REDUCED_QUERY).matches;
function subscribeReducedMotion(callback) {
  const query = window.matchMedia(REDUCED_QUERY);
  query.addEventListener("change", callback);
  return () => query.removeEventListener("change", callback);
}
const MotionPreference = createContext(true);
const DesktopContext = createContext(null);
const EASE = [0.2, 0.65, 0.3, 1];
const routeMap = new Map(ROUTES.map((route) => [route.path, route]));
function normalizePath(path) {
  try {
    return decodeURIComponent(path).replace(/\/+$/, "") || "/";
  } catch {
    return "/404";
  }
}
const normalizedRoutes = new Map(
  ROUTES.map((route) => [normalizePath(route.path), route]),
);
const ERROR_ROUTE = { path: "/404", title: "404 ERROR", kind: "error" };
const iconPath = (name) =>
  `/retro/${name}.${name === "clouds" ? "avif" : "png"}`;
function folderAddress(route) {
  const segments = [];
  let current = route;
  while (current && ![SITE.documents, "/desktop"].includes(current.path)) {
    segments.unshift(current.title.toUpperCase());
    current = routeMap.get(current.parent);
  }
  return `C:\\WINDOWS\\DIRECTORY\\${SITE.directory}\\${segments.join("\\")}`;
}

function Icon({ name = "folder", size = 25, className = "" }) {
  return (
    <img
      className={`pixel-icon ${className}`}
      src={name.startsWith("/") ? name : iconPath(name)}
      alt=""
      width={size}
      height={size}
      style={{
        width: size,
        height: size,
        objectFit: name === SITE.portrait ? "cover" : undefined,
      }}
      draggable="false"
    />
  );
}
function SiteLink({ to, children, ...props }) {
  return /^https:\/\//.test(to) ? (
    <a href={to} target="_blank" rel="noopener noreferrer" {...props}>
      {children}
    </a>
  ) : (
    <Link to={to} {...props}>
      {children}
    </Link>
  );
}
function ShortcutArt({ name, shortcut = false }) {
  return (
    <span className="shortcut-art">
      <Icon name={name} size={50} />
      {shortcut && (
        <img
          className="shortcut-overlay"
          src={iconPath("shortcut")}
          width="15"
          height="15"
          alt=""
        />
      )}
    </span>
  );
}
function ResponsiveImage({ src, alt, className = "", eager = false }) {
  const [failed, setFailed] = useState(false);
  return failed ? (
    <span className={`image-fallback ${className}`} role="img" aria-label={alt}>
      Image unavailable
    </span>
  ) : (
    <img
      src={src}
      alt={alt}
      className={className}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      onError={() => setFailed(true)}
    />
  );
}
function ClassicButton({ children, className = "", ...props }) {
  const reduced = useContext(MotionPreference);
  return (
    <motion.button
      type="button"
      whileTap={reduced ? undefined : { scale: 0.985 }}
      transition={{ duration: 0.08 }}
      className={`classic-button ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
}

function WindowFrame({
  route,
  children,
  className = "",
  menu = true,
  compactMenu = false,
  headerExtra,
}) {
  const { workspace, closeWindow, minimizeWindow } = useContext(DesktopContext);
  const reduced = useContext(MotionPreference);
  const controls = useDragControls();
  const heading = useRef(null);
  const x = useMotionValue(0),
    y = useMotionValue(0);
  const fullscreen = route.kind === "secret";
  useEffect(() => {
    const resize = () => {
      x.set(0);
      y.set(0);
    };
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, [x, y]);
  useEffect(() => {
    heading.current?.focus({ preventScroll: true });
  }, [route.path]);
  return (
    <motion.section
      role={route.kind === "login" ? "dialog" : "region"}
      aria-labelledby="active-window-title"
      data-testid="active-window"
      className={`window window-${route.kind} ${className}`}
      drag={!fullscreen}
      dragControls={controls}
      dragListener={false}
      dragConstraints={workspace}
      dragElastic={0}
      dragMomentum={false}
      style={{ x, y }}
      initial={{ opacity: reduced ? 1 : 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: reduced ? 1 : 0 }}
      transition={{ duration: reduced ? 0 : 0.12, ease: EASE }}
    >
      <header
        className="title-bar"
        onPointerDown={(event) => {
          if (window.innerWidth > 809 && !fullscreen && event.button === 0)
            controls.start(event);
        }}
      >
        <h1 id="active-window-title" ref={heading} tabIndex={-1}>
          {route.kind !== "login" && route.icon && (
            <Icon
              name={route.icon === "folder" ? "folder-small" : route.icon}
            />
          )}
          <span>{route.windowTitle || route.title}</span>
        </h1>
        <div
          className="window-controls"
          onPointerDown={(event) => event.stopPropagation()}
        >
          {route.kind === "login" ? (
            <Link to="/question" aria-label="Help with this desktop">
              <Icon name="help" />
            </Link>
          ) : (
            !fullscreen && (
              <button onClick={minimizeWindow} aria-label="Minimize window">
                <Icon name="minimize" />
              </button>
            )
          )}
          {route.kind !== "login" &&
            !fullscreen &&
            (route.path === SITE.documents || route.kind === "personal" ? (
              <Link to="/secret" aria-label="Open hidden window">
                <Icon name="secret" />
              </Link>
            ) : (
              <span className="decorative-control" aria-hidden="true">
                <Icon name="maximize" />
              </span>
            ))}
          <button onClick={closeWindow} aria-label="Close window">
            <Icon name="close" />
          </button>
        </div>
      </header>
      {menu && (
        <MenuBar route={route} compact={compactMenu} extra={headerExtra} />
      )}
      {children}
    </motion.section>
  );
}
function MenuBar({ route, compact = false, extra }) {
  const words = compact
    ? ["File", "Edit", "Search", "Help"]
    : ["File", "Edit", "View", "Favorites", "Go", "Help"];
  return (
    <div className="menu-bar">
      {compact && (
        <Link to={route.parent || SITE.documents}>&lt;- Go Back</Link>
      )}
      <div className="decorative-menus" aria-hidden="true">
        {words.map((word) => (
          <span key={word}>
            <u>{word[0]}</u>
            {word.slice(1)}
          </span>
        ))}
      </div>
      {extra}
      {route.kind === "explorer" && (
        <img
          className="chrome-portrait"
          src={SITE.portrait}
          width="49"
          height="26"
          alt=""
        />
      )}
    </div>
  );
}
function ExplorerToolbar({ route, archive = false }) {
  const controls = archive
    ? [
        ["Stop", "stop"],
        ["Refresh", "refresh"],
        ["Download", "download"],
        ["Home", "house", "/archive"],
        ["Bookmark", "book"],
        ["Fullscreen", "maximize"],
        ["Print", "properties"],
      ]
    : [
        ["Back", "back", route.parent || "/desktop"],
        ["Forward", "back"],
        ["Up", "up", route.parent || "/desktop"],
        ["Copy", "copy"],
        ["Paste", "paste"],
        ["Undo", "undo"],
        ["Delete", "delete"],
        ["Properties", "properties"],
      ];
  return (
    <>
      <div className="explorer-toolbar">
        {controls.map(([label, icon, to], index) => {
          const content = (
            <>
              <Icon
                name={icon}
                className={label === "Forward" ? "flip-icon" : ""}
              />
              <span>{label}</span>
            </>
          );
          const cls = `toolbar-item ${index > 4 ? "desktop-tool" : ""} ${[3, 5, 7].includes(index) ? "tool-separator" : ""}`;
          return to ? (
            <Link key={label} to={to} className={cls}>
              {content}
            </Link>
          ) : (
            <span key={label} className={cls} aria-hidden="true">
              {content}
            </span>
          );
        })}
      </div>
      <div className="address-row">
        <span>Address</span>
        <div className="address-value" aria-label="Current folder path">
          {archive
            ? "arshiafarrokhi.ir/archive"
            : route.address || folderAddress(route)}
        </div>
      </div>
    </>
  );
}
function FileGrid({ items = [] }) {
  const reduced = useContext(MotionPreference);
  return (
    <motion.div
      className="file-grid"
      initial="hidden"
      animate="visible"
      variants={{
        visible: { transition: { staggerChildren: reduced ? 0 : 0.018 } },
      }}
    >
      {items.map((item) => (
        <motion.div
          key={item.to}
          variants={{
            hidden: { opacity: reduced ? 1 : 0 },
            visible: { opacity: 1 },
          }}
          transition={{ duration: reduced ? 0 : 0.12 }}
        >
          <SiteLink to={item.to} className="file-item">
            <Icon name={item.icon || "folder"} size={50} />
            <span>{item.label}</span>
          </SiteLink>
        </motion.div>
      ))}
    </motion.div>
  );
}
function Explorer({ route }) {
  return (
    <WindowFrame route={route}>
      <ExplorerToolbar route={route} />
      <div
        className="explorer-body retro-scroll"
        tabIndex={0}
        aria-label={`${route.title} contents`}
      >
        <aside className="explorer-sidebar">
          <Icon name="folder" size={50} />
          <h2>{route.title}</h2>
          <div className="rainbow-rule" />
          <p>{route.description}</p>
          {route.created && (
            <p className="folder-meta">
              Created:
              <br />
              {route.created}
            </p>
          )}
          {route.size && <p className="folder-size">{route.size}</p>}
          {route.note && <p className="folder-meta">{route.note}</p>}
        </aside>
        <FileGrid items={route.items} />
      </div>
    </WindowFrame>
  );
}
function Login({ route }) {
  const [clicked, setClicked] = useState(false);
  const navigate = useNavigate();
  return (
    <WindowFrame
      route={{ ...route, title: "Welcome to my Personal Site" }}
      menu={false}
    >
      <div className="login-body">
        <button
          className={`login-portrait inset-frame ${clicked ? "portrait-alternate" : ""}`}
          aria-label="Change portrait appearance"
          aria-pressed={clicked}
          onClick={() => setClicked(!clicked)}
        >
          <ResponsiveImage src={SITE.portrait} alt={SITE.name} eager />
        </button>
        <form
          className="login-form"
          onSubmit={(event) => {
            event.preventDefault();
            navigate("/desktop");
          }}
        >
          <p>
            Type in <strong>ANY</strong> username and password to log on to my
            computer. <strong>DO NOT</strong> click my face.
          </p>
          <label>
            <span>Username:</span>
            <input
              name="guest-name"
              aria-label="Username"
              autoComplete="off"
              spellCheck="false"
              maxLength={60}
            />
          </label>
          <label>
            <span>Password:</span>
            <input
              name="guest-code"
              type="password"
              aria-label="Password"
              autoComplete="off"
              maxLength={60}
            />
          </label>
          <button type="submit" className="sr-only" tabIndex={-1}>
            Enter desktop
          </button>
        </form>
        <div className="login-actions">
          <Link to="/desktop" className="classic-button">
            Enter
          </Link>
          <button type="button" className="classic-button" disabled>
            Cancel
          </button>
        </div>
      </div>
    </WindowFrame>
  );
}
function ProjectViewer({ route }) {
  const index = PROJECTS.findIndex((project) => project.id === route.projectId);
  const previous = PROJECTS[(index + PROJECTS.length - 1) % PROJECTS.length];
  const next = PROJECTS[(index + 1) % PROJECTS.length];
  return (
    <WindowFrame
      route={{ ...route, windowTitle: `${route.title} - Project Viewer` }}
      compactMenu
    >
      <div className="project-viewer-screen">
        <ResponsiveImage
          src={`/images/${route.image}`}
          alt={`${route.title} screenshot`}
          eager
        />
      </div>
      <div className="project-viewer-controls">
        <div>
          <h2>{route.title}</h2>
          <p>{route.description}</p>
        </div>
        <nav aria-label="Project gallery controls">
          <Link
            to={`/projects/${previous.id}`}
            className="classic-button"
            aria-label={`Previous project: ${previous.title}`}
          >
            Previous
          </Link>
          <output aria-label="Project number">
            {index + 1} / {PROJECTS.length}
          </output>
          <Link
            to={`/projects/${next.id}`}
            className="classic-button"
            aria-label={`Next project: ${next.title}`}
          >
            Next
          </Link>
          <SiteLink to={route.href} className="classic-button">
            Open live demo
          </SiteLink>
        </nav>
      </div>
    </WindowFrame>
  );
}
function Notepad({ route }) {
  return (
    <WindowFrame
      route={{
        ...route,
        windowTitle: `${route.title} - Notepad`,
        icon: "notepad",
      }}
      compactMenu
    >
      <div className="notepad-body retro-scroll" tabIndex={0}>
        <>
          <h2>{route.title}</h2>
          {route.description && <p>{route.description}</p>}
          {route.paragraphs?.map((text, i) => (
            <p key={i}>{text}</p>
          ))}
          {route.projectType && (
            <p>
              <strong>
                {route.path.startsWith("/skills") ? "Category" : "Project"}:
              </strong>{" "}
              {route.projectType}
            </p>
          )}
          {route.href && (
            <SiteLink className="classic-button project-visit" to={route.href}>
              {route.linkLabel || "Open live project"}
            </SiteLink>
          )}
          {route.note && <p className="project-note">{route.note}</p>}
          {route.related?.length > 0 && (
            <nav className="related-links" aria-label="Related pages">
              {route.related.map((item) => (
                <SiteLink to={item.to} key={item.to}>
                  {item.label}
                </SiteLink>
              ))}
            </nav>
          )}
        </>
      </div>
    </WindowFrame>
  );
}
function Bookshelf({ route }) {
  return (
    <WindowFrame
      route={route}
      headerExtra={<Link to={"/resume/overview"}>{"Full resume"}</Link>}
    >
      <div className="bookshelf-heading">
        <h2>{route.title}</h2>
        <div aria-hidden="true">
          {["document", "book", "folder"].map((icon) => (
            <Icon key={icon} name={icon} size={40} />
          ))}
        </div>
      </div>
      <div className="bookshelf-body retro-scroll" tabIndex={0}>
        <aside className="bookshelf-index">
          <strong>
            {"Experience, education, and the tools I build with."}
          </strong>
          <p>List:</p>
          <nav
            className="book-list inset-frame retro-scroll"
            aria-label="Resume contents"
          >
            {(route.items || []).map((item) => (
              <SiteLink to={item.to} key={item.to}>
                <Icon name="book" size={20} />
                <strong>{item.label}</strong>
              </SiteLink>
            ))}
          </nav>
        </aside>
        <div className="bookshelf-cover">
          <ResponsiveImage src={SITE.portrait} alt={SITE.name} eager />
          <p>
            {SITE.name}
            <br />
            <span>{"Frontend Developer"}</span>
          </p>
        </div>
      </div>
    </WindowFrame>
  );
}
function Article({ route }) {
  const siblings = routeMap.get(SITE.resume)?.items || [],
    index = siblings.findIndex((item) => item.to === route.path);
  return (
    <WindowFrame
      route={{
        ...route,
        windowTitle: `Resume - ${SITE.name}`,
        icon: "book",
      }}
    >
      <div className="article-heading">
        <h2>
          {SITE.name}
          {"'s Resume"}
        </h2>
        <nav aria-label="Resume navigation">
          {index > 0 && (
            <Link className="classic-button" to={siblings[index - 1].to}>
              Previous Page
            </Link>
          )}
          <Link className="classic-button" to={SITE.resume}>
            {"Resume Home"}
          </Link>
          {index >= 0 && index < siblings.length - 1 && (
            <Link className="classic-button" to={siblings[index + 1].to}>
              Next Page
            </Link>
          )}
        </nav>
      </div>
      <div className="article-label">
        <strong>TITLE: &nbsp;{route.title}</strong>
      </div>
      <article
        className="article-body retro-scroll"
        tabIndex={0}
        aria-label={route.title}
      >
        {route.sections?.map((section, index) => (
          <section key={index}>
            <h3>{section.title}</h3>
            {section.meta && <p className="resume-meta">{section.meta}</p>}
            {section.paragraphs?.map((text, i) => (
              <p key={i}>{text}</p>
            ))}
            {section.bullets && (
              <ul>
                {section.bullets.map((text) => (
                  <li key={text}>{text}</li>
                ))}
              </ul>
            )}
            {section.href && (
              <SiteLink to={section.href}>
                Visit {section.linkLabel || section.title}
              </SiteLink>
            )}
          </section>
        ))}
        {route.paragraphs?.map((text, index) => (
          <p key={index}>{text}</p>
        ))}
      </article>
    </WindowFrame>
  );
}
function AboutNavigation() {
  return (
    <nav className="about-navigation" aria-label="About pages">
      <Link to={SITE.about}>HOME</Link>
      <Link to={`${SITE.about}/about`}>ABOUT</Link>
      <Link to={`${SITE.about}/${"approach"}`}>{"APPROACH"}</Link>
      <Link to={SITE.gallery}>GALLERY</Link>
      <SiteLink to={SITE.socials.find((s) => s.label === "Instagram").href}>
        INSTAGRAM
      </SiteLink>
    </nav>
  );
}
function About({ route }) {
  const reduced = useContext(MotionPreference);
  return (
    <WindowFrame route={route}>
      <AboutNavigation />
      <div
        className="about-body retro-scroll"
        tabIndex={0}
        aria-label={route.title}
      >
        {route.kind === "gallery" ? (
          <div className="photo-gallery">
            {(route.photos || []).map((photo, i) => (
              <motion.figure
                key={photo.src}
                initial={{ opacity: reduced ? 1 : 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.02 }}
                transition={{ duration: reduced ? 0 : 0.18 }}
              >
                <SiteLink
                  to={photo.to || SITE.projects}
                  aria-label={`View ${photo.label}`}
                >
                  <ResponsiveImage
                    src={photo.src}
                    alt={photo.label}
                    eager={i < 4}
                  />
                  <figcaption>{photo.label}</figcaption>
                </SiteLink>
              </motion.figure>
            ))}
          </div>
        ) : (
          <>
            <h2 className="about-display">{route.heading || route.title}</h2>
            <div className="about-intro">
              <ResponsiveImage src={SITE.portrait} alt={route.title} eager />
              <div>
                <p className="dictionary-type">{route.subtitle || "(noun.)"}</p>
                {route.paragraphs?.map((text, i) => (
                  <p key={i}>{text}</p>
                ))}
              </div>
            </div>
            {route.sections?.map((section) => (
              <section className="about-section" key={section.title}>
                <h3>{section.title}</h3>
                <p>{section.text}</p>
              </section>
            ))}
            <div className="about-site-links">
              <Link to={`${SITE.about}/about`}>About {SITE.shortName}</Link>
              <Link to={`${SITE.about}/${"approach"}`}>{"How I work"}</Link>
              <Link to={SITE.gallery}>Photo Gallery</Link>
              <Link to="/desktop">Exit</Link>
            </div>
            <p className="site-credits">
              <a
                href="/retro/NOTICE.txt"
                target="_blank"
                rel="noopener noreferrer"
              >
                Site credits & font licenses
              </a>
            </p>
          </>
        )}
      </div>
    </WindowFrame>
  );
}
function Archive({ route }) {
  return (
    <WindowFrame route={route}>
      <ExplorerToolbar route={route} archive />
      <div className="archive-body retro-scroll" tabIndex={0}>
        <header className="archive-intro">
          <div className="archive-wordmark">
            {SITE.shortName}'s
            <br />
            Archive
          </div>
          <div>
            <h2>
              {route.heading || `Welcome to ${SITE.shortName}'s Archive.`}
            </h2>
            <p>
              <em>
                {
                  "A collection of websites, web apps, and interface experiments."
                }
              </em>
            </p>
          </div>
        </header>
        <div className="archive-content">
          <dl>
            {(route.items || []).map((item) => (
              <div key={item.to}>
                <dt>
                  <SiteLink to={item.to}>{item.label}</SiteLink>
                </dt>
                <dd>{item.description}</dd>
              </div>
            ))}
          </dl>
          <ResponsiveImage src={SITE.portrait} alt={SITE.name} />
        </div>
      </div>
    </WindowFrame>
  );
}
function Dos({ route }) {
  return (
    <WindowFrame
      route={{ ...route, title: "MS-DOS Prompt", icon: null }}
      menu={false}
    >
      <div className="dos-toolbar" aria-hidden="true">
        <span className="classic-button">Auto</span>
      </div>
      <div className="dos-body retro-scroll" tabIndex={0}>
        <p>
          {SITE.name} 98
          <br />
          &nbsp;&nbsp; (C) Copyright {SITE.name} {new Date().getFullYear()}
        </p>
        <p>C:\{SITE.directory}\Desktop&gt;\</p>
        <p>
          You found my SECRET! Welcome to my personal website. This is my
          container for {"my projects, my experience, and the things I build"}.
          Click around. You may find even more Easter eggs. :)
        </p>
        <Link to="/desktop">ENTER THE WEBSITE</Link>
        <ResponsiveImage
          className="dos-portrait"
          src={SITE.portrait}
          alt={SITE.name}
        />
      </div>
    </WindowFrame>
  );
}
function Secret({ route }) {
  return (
    <WindowFrame
      route={{ ...route, title: "How did you get here?", icon: null }}
    >
      <div className="secret-body">
        {
          <div>
            <p>C:\{SITE.directory}\SECRET&gt;</p>
            <h2>You found the hidden directory.</h2>
            <p>
              No private files here. Just a developer who still likes exploring.
            </p>
            <Link to="/question">Open MS-DOS Prompt</Link>
            <Link to="/404">Try the blue screen</Link>
            <Link to={SITE.documents}>Return to My Documents</Link>
          </div>
        }
      </div>
    </WindowFrame>
  );
}
function BlueScreen() {
  const heading = useRef(null);
  useEffect(() => heading.current?.focus(), []);
  return (
    <main className="blue-screen">
      <div>
        <h1 ref={heading} tabIndex={-1}>
          404 ERROR
        </h1>
        <p>A problem has been detected and this page could not be found.</p>
        <p>* Return to the desktop and open a folder to continue.</p>
        <p>* If this is your first blue screen, welcome to the club.</p>
        <Link to="/">RETURN TO LOGIN</Link>
        <Link to="/desktop">RETURN TO DESKTOP</Link>
      </div>
    </main>
  );
}
function HomeMenu({ onClose, buttonRef }) {
  const reduced = useContext(MotionPreference),
    menu = useRef(null);
  useEffect(() => {
    menu.current?.querySelector('[role="menuitem"]')?.focus();
  }, []);
  const items = [
    ["My Documents", SITE.documents, "folder"],
    ["My Resume", SITE.resume, "book"],
    ["About Arshia", SITE.about, SITE.portrait],
    ["My GitHub", SITE.github, "/favicon.svg"],
    ["My Archive", "/archive", "folder"],
    ["Shut Down", "/404", "stop"],
  ];
  return (
    <motion.nav
      ref={menu}
      role="menu"
      aria-label="Home"
      className="home-menu"
      initial={{ opacity: reduced ? 1 : 0, y: reduced ? 0 : 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: reduced ? 1 : 0, y: reduced ? 0 : 6 }}
      transition={{ duration: reduced ? 0 : 0.1 }}
      onKeyDown={(event) => {
        const links = [...menu.current.querySelectorAll('[role="menuitem"]')],
          index = links.indexOf(document.activeElement);
        if (["ArrowDown", "ArrowUp", "Home", "End"].includes(event.key)) {
          event.preventDefault();
          links[
            event.key === "Home"
              ? 0
              : event.key === "End"
                ? links.length - 1
                : (index +
                    (event.key === "ArrowDown" ? 1 : -1) +
                    links.length) %
                  links.length
          ]?.focus();
        }
        if (event.key === "Escape") {
          event.preventDefault();
          onClose();
          buttonRef.current?.focus();
        }
      }}
    >
      <div className="home-menu-spine" aria-hidden="true">
        {SITE.name} <span>98</span>
      </div>
      <div className="home-menu-items">
        {items.map(([label, to, icon], index) => (
          <SiteLink
            key={to}
            to={to}
            role="menuitem"
            className={index === 4 ? "menu-divider" : ""}
            onClick={onClose}
          >
            <Icon name={icon} size={50} />
            <span>{label}</span>
          </SiteLink>
        ))}
      </div>
    </motion.nav>
  );
}
function Clock() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(timer);
  }, []);
  return (
    <time
      dateTime={now.toISOString()}
      title={now.toLocaleDateString("en-US", { dateStyle: "full" })}
    >
      {now.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      })}
    </time>
  );
}
function Taskbar({ route, minimized, onRestore, onMinimize }) {
  const [open, setOpen] = useState(false),
    area = useRef(null);
  const location = useLocation();
  useEffect(() => {
    setOpen(false);
  }, [location.key]);
  useEffect(() => {
    if (!open) return;
    const outside = (event) => {
      if (!area.current?.contains(event.target)) setOpen(false);
    };
    document.addEventListener("pointerdown", outside);
    document.addEventListener("focusin", outside);
    return () => {
      document.removeEventListener("pointerdown", outside);
      document.removeEventListener("focusin", outside);
    };
  }, [open]);
  const active = route.kind !== "desktop" ? route : minimized;
  return (
    <footer className="taskbar">
      <div className="home-area" ref={area}>
        <ClassicButton
          id="home-button"
          className={`home-button ${open ? "pressed" : ""}`}
          aria-haspopup="menu"
          aria-expanded={open}
          onClick={() => setOpen(!open)}
          onKeyDown={(event) => {
            if (event.key === "ArrowUp") {
              event.preventDefault();
              setOpen(true);
            }
          }}
        >
          <Icon name="home" />
          Home
        </ClassicButton>
        <AnimatePresence>
          {open && (
            <HomeMenu
              buttonRef={{ current: area.current?.querySelector("button") }}
              onClose={() => setOpen(false)}
            />
          )}
        </AnimatePresence>
      </div>
      <div className="quick-launch" aria-label="Quick launch">
        <Link to={SITE.about} aria-label={`About ${SITE.shortName}`}>
          <Icon name={SITE.portrait} />
        </Link>
        <SiteLink to={SITE.github} aria-label="GitHub">
          <Icon name={"/favicon.svg"} />
        </SiteLink>
        <SiteLink to={SITE.linkedin} aria-label="LinkedIn">
          <Icon name="linkedin" />
        </SiteLink>
      </div>
      {active && (
        <button
          className={`task-item ${minimized ? "minimized" : ""}`}
          onClick={minimized ? onRestore : onMinimize}
          aria-label={
            minimized ? `Restore ${active.title}` : `Minimize ${active.title}`
          }
        >
          <Icon name={active.icon || "folder"} size={20} />
          <span>{active.taskLabel || active.title}</span>
        </button>
      )}
      <div className="system-tray inset-frame">
        <div className="tray-icons" aria-hidden="true">
          <Icon name="tray" size={20} />
          <Icon name="settings" size={20} />
        </div>
        <Clock />
      </div>
    </footer>
  );
}
function DesktopIcons() {
  const items = [
    ["My Documents", SITE.documents, "folder"],
    ["My Resume", SITE.resume, "book"],
    ["About Arshia", SITE.about, SITE.portrait],
    ["My GitHub", SITE.github, "/favicon.svg"],
    ["My LinkedIn", SITE.linkedin, "linkedin"],
  ];
  return (
    <>
      <nav className="desktop-icons" aria-label="Desktop shortcuts">
        {items.map(([label, to, icon]) => (
          <SiteLink className="desktop-shortcut" key={to} to={to}>
            <ShortcutArt name={icon} shortcut={to.startsWith("https://")} />
            <span>{label}</span>
          </SiteLink>
        ))}
      </nav>
      <Link to="/personal" className="desktop-shortcut personal-shortcut">
        <Icon name="folder" size={50} />
        <span>{"Contact"}</span>
      </Link>
    </>
  );
}
function ActiveWindow({ route }) {
  switch (route.kind) {
    case "login":
      return <Login route={route} />;
    case "explorer":
      return <Explorer route={route} />;
    case "notepad":
      return <Notepad route={route} />;
    case "bookshelf":
      return <Bookshelf route={route} />;
    case "article":
      return <Article route={route} />;
    case "about":
    case "gallery":
    case "approach":
      return <About route={route} />;
    case "archive":
      return <Archive route={route} />;
    case "project":
      return <ProjectViewer route={route} />;
    case "dos":
      return <Dos route={route} />;
    case "secret":
      return <Secret route={route} />;
    default:
      return null;
  }
}
function Desktop() {
  const location = useLocation(),
    navigate = useNavigate(),
    workspace = useRef(null);
  const focusReturn = useRef(null);
  const [minimized, setMinimized] = useState(null);
  const route =
    normalizedRoutes.get(normalizePath(location.pathname)) || ERROR_ROUTE;
  function rememberDesktopFocus() {
    const roots = new Set([
      SITE.documents,
      SITE.resume,
      SITE.about,
      "/personal",
    ]);
    let page = route;
    while (page?.parent && !roots.has(page.path))
      page = routeMap.get(page.parent);
    focusReturn.current = { target: roots.has(page?.path) ? page.path : null };
  }
  const closeWindow = () => {
    rememberDesktopFocus();
    setMinimized(null);
    navigate("/desktop");
  };
  const minimizeWindow = () => {
    if (route.kind !== "desktop") {
      rememberDesktopFocus();
      setMinimized(route);
      navigate("/desktop");
    }
  };
  useEffect(() => {
    document.title = `${SITE.name} '98${route.kind === "login" ? "" : ` - ${route.title}`}`;
    if (route.kind !== "desktop") setMinimized(null);
  }, [route]);
  useEffect(() => {
    if (route.kind !== "desktop" || !focusReturn.current) return;
    const frame = requestAnimationFrame(() => {
      const target = focusReturn.current?.target;
      const element = minimized
        ? document.querySelector(".task-item")
        : target &&
          document.querySelector(`.desktop-shortcut[href="${target}"]`);
      (element || document.getElementById("home-button"))?.focus({
        preventScroll: true,
      });
      focusReturn.current = null;
    });
    return () => cancelAnimationFrame(frame);
  }, [route, minimized]);
  useEffect(() => {
    const escape = (event) => {
      if (
        event.key === "Escape" &&
        !event.defaultPrevented &&
        !document.querySelector('[role="menu"]') &&
        !["desktop", "error"].includes(route.kind)
      ) {
        event.preventDefault();
        closeWindow();
      }
    };
    document.addEventListener("keydown", escape);
    return () => document.removeEventListener("keydown", escape);
  });
  if (route.kind === "error") return <BlueScreen />;
  return (
    <DesktopContext.Provider value={{ workspace, closeWindow, minimizeWindow }}>
      <main className="desktop-app min-h-dvh w-full overflow-hidden text-black">
        <a className="skip-link classic-button" href="#desktop-workspace">
          Skip to active window
        </a>
        <img
          className="desktop-wallpaper"
          src={iconPath("clouds")}
          alt=""
          fetchPriority="high"
        />
        <DesktopIcons />
        <div
          className="desktop-workspace"
          id="desktop-workspace"
          ref={workspace}
          tabIndex={-1}
        >
          <AnimatePresence mode="wait" initial={false}>
            <ActiveWindow key={route.path} route={route} />
          </AnimatePresence>
        </div>
        <Taskbar
          route={route}
          minimized={minimized}
          onRestore={() => minimized && navigate(minimized.path)}
          onMinimize={minimizeWindow}
        />
      </main>
    </DesktopContext.Provider>
  );
}
class DesktopErrorBoundary extends Component {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? (
      <main className="blue-screen">
        <div role="alert">
          <h1>DESKTOP ERROR</h1>
          <p>The desktop could not open. Reload the page to try again.</p>
          <a href="/">RETURN TO LOGIN</a>
        </div>
      </main>
    ) : (
      this.props.children
    );
  }
}
export default function App() {
  const reduced = useSyncExternalStore(
    subscribeReducedMotion,
    readReducedMotion,
    () => true,
  );
  return (
    <DesktopErrorBoundary>
      <MotionPreference.Provider value={reduced}>
        <MotionConfig reducedMotion="never">
          <BrowserRouter>
            <Desktop />
          </BrowserRouter>
        </MotionConfig>
      </MotionPreference.Provider>
    </DesktopErrorBoundary>
  );
}
