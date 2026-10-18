// Public portfolio content from the existing site and the owner-approved resume.
export const SOCIALS = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/arshiafarrokhi",
  },
  {
    label: "GitHub",
    href: "https://github.com/arshiafarrokhi",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/arshia_farrokhi_web",
  },
];
export const PROFESSIONAL_PROJECTS = [
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
export const PROJECTS = [
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
export const SKILLS = [
  {
    name: "TypeScript",
    description: "Typed development",
  },
  {
    name: "JavaScript",
    description: "Interaction",
  },
  {
    name: "React",
    description: "UI components",
  },
  {
    name: "Next.js",
    description: "React framework",
  },
  {
    name: "Tailwind CSS",
    description: "Utility-first CSS",
  },
  {
    name: "Bootstrap",
    description: "Responsive layouts",
  },
  {
    name: "Design patterns",
    description: "Code organization",
  },
  {
    name: "Git",
    description: "GitHub & GitLab",
  },
];
export const EXPERIENCE = [
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
export const EDUCATION = [
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

export const SITE = {
  name: "Arshia Farrokhi",
  shortName: "Arshia",
  directory: "ARSHIAFARROKHI",
  portrait: "/images/portrait.jpg",
  documents: "/documents",
  resume: "/resume",
  about: "/about",
  gallery: "/about/gallery",
  work: "/work",
  projects: "/projects",
  skills: "/skills",
  github: SOCIALS.find((item) => item.label === "GitHub").href,
  linkedin: SOCIALS.find((item) => item.label === "LinkedIn").href,
  socials: SOCIALS,
};

export const SKILL_GROUPS = [
  {
    id: "languages",
    title: "Languages",
    description: "The languages I use to build interactive, typed frontends.",
    names: ["TypeScript", "JavaScript"],
  },
  {
    id: "frameworks",
    title: "Frameworks",
    description: "Component-based interfaces and React applications.",
    names: ["React", "Next.js"],
  },
  {
    id: "styling",
    title: "Styling",
    description:
      "Responsive layouts, utility-first CSS, and interface styling.",
    names: ["Tailwind CSS", "Bootstrap"],
  },
  {
    id: "tools",
    title: "Tools & Architecture",
    description:
      "Code organization and version control with GitHub and GitLab.",
    names: ["Design patterns", "Git"],
  },
  {
    id: "collaboration",
    title: "Collaboration",
    description:
      "Communication, responsibility, and research are part of how I work with a team.",
    names: ["Communication", "Responsibility", "Research"],
  },
];
const slug = (name) =>
  name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
const file = (label, to, icon = "folder", extra = {}) => ({
  label,
  to,
  icon,
  ...extra,
});
const folder = (path, title, parent, description, items, extra = {}) => ({
  path,
  title,
  parent,
  description,
  items,
  kind: "explorer",
  icon: "folder",
  size: "Contents: " + items.length + (items.length === 1 ? " item" : " items"),
  ...extra,
});
const roleSections = EXPERIENCE.map((item) => ({
  title: item.company,
  meta: item.title + " · " + item.start + "–" + (item.end || "Present"),
  bullets: item.responsibilities,
  href: item.href,
}));
const educationSections = EDUCATION.map((item) => ({
  title: item.name,
  meta: item.institution + " · " + item.date,
  paragraphs: item.description ? [item.description] : [],
  href: item.href,
  linkLabel: item.institution,
}));
const languageSections = [
  { title: "English", paragraphs: ["B2"] },
  { title: "French" },
];
const skillSections = SKILL_GROUPS.map((group) => ({
  title: group.title,
  paragraphs: [group.names.join(", ")],
}));
const resumePages = [
  {
    path: "/resume/overview",
    title: "Full resume",
    sections: [
      ...roleSections,
      ...educationSections,
      ...languageSections,
      ...skillSections,
    ],
  },
  ...EXPERIENCE.map((role, index) => ({
    path: "/resume/" + slug(role.company),
    title: role.company + " — " + role.title,
    sections: [roleSections[index]],
  })),
  {
    path: "/resume/education",
    title: "Education",
    sections: educationSections,
  },
  { path: "/resume/languages", title: "Languages", sections: languageSections },
];
const workItems = PROFESSIONAL_PROJECTS.map((project) =>
  file(project.name, "/work/" + slug(project.name), "document"),
);
const projectItems = PROJECTS.map((project) =>
  file(project.title, "/projects/" + project.id, "video"),
);
const skillItems = SKILL_GROUPS.map((group) =>
  file(group.title, "/skills/" + group.id),
);
const socialItems = SOCIALS.map((item) =>
  file(
    item.label,
    item.href,
    item.label === "LinkedIn"
      ? "linkedin"
      : item.label === "GitHub"
        ? "/favicon.svg"
        : "web",
  ),
);

export const ROUTES = [
  { path: "/", title: "Welcome!", kind: "login" },
  { path: "/desktop", title: "Desktop", kind: "desktop" },
  folder(
    "/documents",
    "My Documents",
    "/desktop",
    "A look inside my frontend work. Explore professional projects, personal experiments, and the tools I build with.",
    [
      file("My Work", "/work"),
      file("My Projects", "/projects"),
      file("Skills", "/skills"),
    ],
  ),
  folder(
    "/work",
    "My Work",
    "/documents",
    "Professional frontend interfaces: payment platforms, an AI chatbot, company websites, and administration panels.",
    workItems,
  ),
  ...PROFESSIONAL_PROJECTS.map((project) => ({
    path: "/work/" + slug(project.name),
    title: project.name,
    parent: "/work",
    section: "/documents",
    kind: "notepad",
    icon: "document",
    description: project.description,
    projectType: project.type,
    href: project.href,
    linkLabel: project.linkLabel,
    note: project.note,
    related: [file("All professional projects", "/work")],
  })),
  folder(
    "/projects",
    "My Projects",
    "/documents",
    "Twelve personal websites, web apps, and interface experiments. Open a file to view the screenshot and visit its live demo.",
    projectItems,
  ),
  ...PROJECTS.map((project) => ({
    path: "/projects/" + project.id,
    title: project.title,
    parent: "/projects",
    section: "/documents",
    kind: "project",
    icon: "video",
    projectId: project.id,
    image: project.image,
    description: project.detail,
    href: project.href,
  })),
  folder(
    "/skills",
    "Skills",
    "/documents",
    "My frontend toolkit, organized by language, framework, styling, tools, and collaboration.",
    skillItems,
  ),
  ...SKILL_GROUPS.flatMap((group) => [
    folder(
      "/skills/" + group.id,
      group.title,
      "/skills",
      group.description,
      group.names.map((name) =>
        file(name, "/skills/" + group.id + "/" + slug(name), "document"),
      ),
    ),
    ...group.names.map((name) => ({
      path: "/skills/" + group.id + "/" + slug(name),
      title: name,
      parent: "/skills/" + group.id,
      section: "/documents",
      kind: "notepad",
      icon: "document",
      description:
        SKILLS.find((skill) => skill.name === name)?.description ||
        group.description,
      projectType: group.title,
      related: [
        file("Explore my work", "/work"),
        file("View my resume", "/resume"),
      ],
    })),
  ]),
  {
    path: "/resume",
    title: "My Resume",
    kind: "bookshelf",
    icon: "book",
    parent: "/desktop",
    items: resumePages.map((page) => file(page.title, page.path, "book")),
  },
  ...resumePages.map((page) => ({
    ...page,
    kind: "article",
    icon: "book",
    parent: "/resume",
    section: "/resume",
  })),
  {
    path: "/about",
    title: "About Arshia",
    kind: "about",
    icon: SITE.portrait,
    parent: "/desktop",
    heading: "Arshia Farrokhi",
    subtitle: "Frontend developer · Tehran",
    paragraphs: [
      "I build responsive web interfaces with React, TypeScript, and Next.js.",
      "My work includes user dashboards, administration panels, payment platforms, and an AI chatbot.",
      "I bring frontend development and experience in project planning, task assignment, and team coordination to the same table.",
    ],
  },
  {
    path: "/about/about",
    title: "About - Arshia",
    kind: "about",
    icon: SITE.portrait,
    parent: "/about",
    heading: "Behind the screen",
    subtitle: "A little about me",
    paragraphs: [
      "I'm Arshia Farrokhi, a frontend developer based in Tehran.",
      "After studying civil engineering at Islamic Azad University, North Tehran, I completed the frontend development bootcamp at Parnian IT.",
      "I've worked at GH Company, Asr Gooyesh Pardaz, and Pavan, building responsive interfaces and collaborating with development teams.",
    ],
  },
  {
    path: "/about/approach",
    title: "How I Work",
    kind: "approach",
    icon: SITE.portrait,
    parent: "/about",
    heading: "How I work",
    subtitle: "Communication. Responsibility. Research.",
    paragraphs: [
      "I care about responsive interfaces, performance, and clear code organization.",
      "My experience includes planning projects, assigning tasks, coordinating teams, and implementing core frontend features.",
      "I use communication and research to support the work, from the interface through to delivery.",
    ],
    sections: [
      {
        title: "Build with the team",
        text: "Collaborate on responsive frontend interfaces and improve the digital user experience.",
      },
      {
        title: "Keep the work organized",
        text: "Use design patterns and Git, with GitHub and GitLab, to organize development.",
      },
    ],
  },
  {
    path: "/about/gallery",
    title: "Project Gallery",
    kind: "gallery",
    icon: "video",
    parent: "/about",
    photos: PROJECTS.map((project) => ({
      src: "/images/" + project.image,
      label: project.title,
      to: "/projects/" + project.id,
    })),
  },
  {
    path: "/archive",
    title: "Arshia's Archive",
    kind: "archive",
    icon: "folder",
    parent: "/desktop",
    items: [
      file("ALL PERSONAL PROJECTS", "/archive/all-projects", "folder", {
        description:
          "All twelve websites, web apps, and interface experiments.",
      }),
      file("WEBSITES", "/archive/websites", "folder", {
        description: "Five personal website projects and UI recreations.",
      }),
      file("WEB APPS", "/archive/web-apps", "folder", {
        description: "Seven interactive web apps and interface experiments.",
      }),
    ],
  },
  ...[
    { id: "all-projects", title: "All Personal Projects" },
    { id: "websites", title: "Websites", category: "Websites" },
    { id: "web-apps", title: "Web Apps", category: "Web apps" },
  ].map((group) => ({
    path: "/archive/" + group.id,
    title: group.title,
    heading: group.title,
    kind: "archive",
    icon: "folder",
    parent: "/archive",
    items: PROJECTS.filter(
      (project) => !group.category || project.category === group.category,
    ).map((project) =>
      file(project.title, "/projects/" + project.id, "video", {
        description: project.detail,
      }),
    ),
  })),
  folder(
    "/personal",
    "Contact",
    "/desktop",
    "Find me on LinkedIn, GitHub, and Instagram.",
    [...socialItems, file("Arshia Only", "/personal/arshia-only")],
  ),
  folder(
    "/personal/arshia-only",
    "Arshia Only",
    "/personal",
    "You found the first hidden folder. Curious? Keep exploring.",
    [file("Private Files", "/personal/arshia-only/private-files")],
  ),
  folder(
    "/personal/arshia-only/private-files",
    "Private Files",
    "/personal/arshia-only",
    "One more folder. The mystery continues.",
    [file("CONFIDENTIAL", "/personal/arshia-only/private-files/confidential")],
  ),
  {
    path: "/personal/arshia-only/private-files/confidential",
    title: "Nothing confidential",
    kind: "notepad",
    icon: "notepad",
    parent: "/personal/arshia-only/private-files",
    section: "/personal",
    description: "No private files here. Just a shortcut to my public work.",
    related: [
      file("Explore my GitHub", SITE.github),
      file("Back to Contact", "/personal"),
    ],
  },
  {
    path: "/question",
    title: "MS-DOS Prompt",
    kind: "dos",
    parent: "/desktop",
    icon: "notepad",
  },
  {
    path: "/secret",
    title: "How did you get here?",
    kind: "secret",
    parent: "/desktop",
  },
];
