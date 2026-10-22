import Link from "next/link";
import Atmosphere from "./components/Atmosphere";
import ThreeHero from "./components/ThreeHero";

const projects = [
  { n: "01", title: "ReachStream", desc: "Reframing a complex prospecting workflow through clearer search, filtering and information hierarchy.", tags: "B2B SAAS / PRODUCT DESIGN / UX", href: "/work/reachstream", tone: "cyan", type: "FEATURED CASE STUDY" },
  { n: "02", title: "DataCaptive", desc: "Structuring dense data and research tasks into a clearer, more actionable product experience.", tags: "DATA PRODUCT / DASHBOARD / UX", href: "#contact", tone: "red", type: "PRODUCT DESIGN" },
  { n: "03", title: "EasyGTM / ICPro", desc: "Making multi-step business workflows easier to scan, understand and complete.", tags: "ENTERPRISE UX / WORKFLOW / UI", href: "#contact", tone: "silver", type: "PRODUCT DESIGN" },
  { n: "04", title: "Archea", desc: "A premium digital experience taken from product design to a live website.", tags: "WEB / UI/UX / PROTOTYPE", href: "https://archea.co.in/", tone: "red", type: "LIVE PROJECT" },
  { n: "05", title: "F5 Services", desc: "Design → build: a responsive Framer experience delivered to production.", tags: "FRAMER / DESIGN + BUILD / WEB", href: "https://f5services.com/", tone: "cyan", type: "LIVE PROJECT" },
];

function ProjectVisual({ tone, number }) {
  return (
    <div className={`project-visual ${tone}`} aria-hidden="true">
      <div className="visual-topline"><span>FIG. {number} / INTERFACE STUDY</span><span>LIVE RENDER <i /></span></div>
      <div className="visual-orbit"><div className="orbit-ring orbit-ring-a" /><div className="orbit-ring orbit-ring-b" /><div className="orbit-core"><span>{number}</span></div><div className="orbit-cross">+</div></div>
      <div className="visual-terminal"><span>SYS / UX</span><b>INFORMATION ARCHITECTURE</b><i /><i /><i /></div>
      <div className="visual-corner corner-a" /><div className="visual-corner corner-b" />
    </div>
  );
}

function ProjectCard({ project }) {
  const external = project.href.startsWith("http");
  return (
    <article className="project">
      <div className="project-meta"><span>{project.n} <i>—</i> {project.type}</span><span>{project.tags}</span></div>
      <ProjectVisual tone={project.tone} number={project.n} />
      <div className="project-copy">
        <div><h3>{project.title}</h3><p>{project.desc}</p></div>
        <a href={project.href} target={external ? "_blank" : undefined} rel={external ? "noreferrer" : undefined}>{external ? "OPEN PROJECT" : project.href.startsWith("/work") ? "OPEN CASE FILE" : "DISCUSS A SIMILAR PROJECT"} <span>↗</span></a>
      </div>
    </article>
  );
}

export default function Home() {
  return (
    <main className="site-shell">
      <Atmosphere />
      <header className="nav wrap">
        <Link href="/" className="brand"><span className="brand-mark">M</span> MALICK<span className="brand-dot">.</span><small>DESIGN SYSTEMS</small></Link>
        <nav aria-label="Main navigation"><a href="#work">Work <span>01</span></a><a href="#services">Capabilities <span>02</span></a><a href="#about">Profile <span>03</span></a><a href="#contact">Contact <span>04</span></a></nav>
        <a className="resume" href="mailto:hello@mhdesign4u.com?subject=Portfolio%20enquiry">INITIATE CONTACT <span>↗</span></a>
      </header>

      <ThreeHero />



      <section id="work" data-motion-reveal className="work wrap section"><div className="section-head"><div><span className="kicker">01 / SELECTED MISSION FILES</span><h2>Complex problems.<br/><em>Clear outcomes.</em></h2></div><p>Product thinking, interaction design and digital delivery. I focus on the decisions behind the interface: what users need, what the business needs, and how the experience can make both clearer.</p></div><div className="work-filter-note"><span className="filter-live"><i /> SELECTED PROJECTS</span><span>CASE STUDIES · PRODUCT SYSTEMS · LIVE WEBSITES</span></div><div className="projects">{projects.map(project => <ProjectCard key={project.n} project={project} />)}</div><div className="work-footnote"><span>MORE THAN SCREENS</span><p>Every strong interface starts before the pixels — with the problem, the user journey, the content structure and the details that make a product feel effortless.</p></div></section>

      <section id="services" data-motion-reveal className="services section"><div className="wrap"><span className="kicker">02 / CAPABILITIES</span><div className="service-intro"><h2>Strategy to screen.<br/><em>Concept to launch.</em></h2><p>I connect product strategy, UX, visual systems and implementation — from untangling a complex flow to shipping a polished responsive experience.</p></div><div className="service-grid"><div><span>CAPABILITY / 01</span><h3>Product & UX Strategy</h3><p>Problem framing, user journeys, information architecture, research synthesis, wireframes and prototypes.</p></div><div><span>CAPABILITY / 02</span><h3>SaaS & Data Products</h3><p>Search and filtering, dense dashboards, enterprise workflows, admin tools and scalable product patterns.</p></div><div><span>CAPABILITY / 03</span><h3>Visual & Interaction Design</h3><p>High-fidelity interfaces, motion principles, design systems, responsive behaviour and accessibility.</p></div><div><span>CAPABILITY / 04</span><h3>Design Engineering</h3><p>Taking concepts into responsive websites with Figma, Framer, WordPress, HTML, CSS and modern frontend tools.</p></div></div><div className="process-rail"><div><span>01</span><b>DISCOVER</b><small>Context / constraints / users</small></div><i /><div><span>02</span><b>DEFINE</b><small>Flows / structure / priorities</small></div><i /><div><span>03</span><b>DESIGN</b><small>Prototype / test / refine</small></div><i /><div><span>04</span><b>DELIVER</b><small>Build / validate / improve</small></div></div></div></section>

      <section id="about" data-motion-reveal className="about wrap section"><div><span className="kicker">03 / PERSONNEL DOSSIER</span><h2>Curiosity in.<br/>Clarity out.<br/><em>Always.</em></h2><div className="about-index"><span>DESIGNER / 001</span><span>HUMAN-CENTRED SYSTEMS</span></div></div><div className="about-copy"><p className="lead">I'm Malick — a Senior Product Designer and UX Engineer with 7+ years of experience across digital products, SaaS platforms, dashboards, websites and brand experiences.</p><p>My work sits between product thinking, UX, visual design and technology. I enjoy complex workflows, messy information, legacy interfaces and products that need to become simpler without losing power.</p><div className="pill-list"><span>Product thinking</span><span>Figma / Adobe XD</span><span>Design systems</span><span>UX research</span><span>Prototyping</span><span>HTML / CSS</span><span>WordPress</span><span>AI-assisted workflow</span></div><a className="text-link" href="https://www.linkedin.com/" target="_blank" rel="noreferrer">CONNECT ON LINKEDIN ↗</a></div></section>

      <section id="contact" data-motion-reveal className="contact"><div className="wrap contact-inner"><span className="kicker">04 / ESTABLISH CONNECTION</span><div className="contact-orb" aria-hidden="true"><span>↗</span></div><h2>Have a problem<br/>worth <em>solving?</em></h2><p>Looking for a senior product designer, a design partner or help turning a digital idea into a real experience? Let's talk.</p><a className="big-link" href="mailto:hello@mhdesign4u.com?subject=Let's%20work%20together">START A CONVERSATION <span>↗</span></a><div className="contact-foot"><span>hello@mhdesign4u.com</span><span>BENGALURU / INDIA</span><span>REMOTE / WORLDWIDE</span></div></div></section>

      <footer className="wrap footer"><span>© 2026 MALICK / DESIGNED WITH INTENT</span><div><a href="https://www.linkedin.com/" target="_blank" rel="noreferrer">LINKEDIN</a><a href="https://www.behance.net/" target="_blank" rel="noreferrer">BEHANCE</a><a href="https://www.figma.com/" target="_blank" rel="noreferrer">FIGMA</a><a href="mailto:hello@mhdesign4u.com">EMAIL</a></div></footer>
    </main>
  );
}
