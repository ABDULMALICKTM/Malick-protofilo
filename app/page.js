import Link from "next/link";
import Atmosphere from "./components/Atmosphere";

const projects = [
  { n: "01", title: "ReachStream", desc: "Evolving a complex B2B data platform across multiple product generations.", tags: "B2B SAAS / PRODUCT DESIGN / UX", href: "/work/reachstream", tone: "cyan", type: "CASE FILE" },
  { n: "02", title: "DataCaptive", desc: "Making data-heavy workflows easier to understand, navigate and act on.", tags: "DATA PRODUCT / DASHBOARD / UX", href: "#contact", tone: "red", type: "PRODUCT DESIGN" },
  { n: "03", title: "EasyGTM / ICPro", desc: "Designing complex B2B workflows across dashboards and business tools.", tags: "ENTERPRISE UX / WORKFLOW / UI", href: "#contact", tone: "silver", type: "PRODUCT DESIGN" },
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

      <section className="hero wrap">
        <div className="hero-visual" aria-hidden="true"><div className="hero-ring ring-one" /><div className="hero-ring ring-two" /><div className="hero-ring ring-three" /><div className="hero-cross cross-one">+</div><div className="hero-cross cross-two">+</div><div className="hero-core"><span>MT</span></div><div className="hero-visual-label">HUMAN-CENTRED / SYSTEM-DRIVEN</div><div className="hero-visual-code">NODE_001<br/>DESIGN × TECHNOLOGY</div></div>
        <div className="hero-content">
          <div className="eyebrow"><span className="status" /> BENGALURU, INDIA <span className="eyebrow-divider">/</span> AVAILABLE FOR SELECTED OPPORTUNITIES</div>
          <h1>I design digital<br/>systems with <em>purpose.</em></h1>
          <p className="hero-lede">Senior Product Designer & UX Engineer translating complex workflows into clear, high-performance digital experiences.</p>
          <div className="hero-actions"><a className="button-primary" href="#work">EXPLORE SELECTED WORK <span>↘</span></a><a className="button-quiet" href="mailto:hello@mhdesign4u.com">HIRE / COLLABORATE <span>↗</span></a></div>
          <div className="hero-bottom"><p>7+ YEARS IN DESIGN<br/><span>PRODUCT / B2B SAAS / WEB</span></p><p className="hero-note">DESIGN THINKING<br/><span>ENGINEERED FOR PEOPLE</span></p></div>
        </div>
      </section>

      <section className="system-strip"><div className="wrap system-strip-inner"><span><i /> SYSTEM STATUS: ONLINE</span><span>PRODUCT DESIGN <b>×</b> INTERACTION <b>×</b> IMPLEMENTATION</span><span className="strip-right">PORTFOLIO BUILD / 2026</span></div></section>

      <section className="proof"><div className="wrap proof-grid"><div><strong>07<span>+</span></strong><span>YEARS OF<br/>EXPERIENCE</span></div><div><strong>B2B</strong><span>SAAS &<br/>ENTERPRISE</span></div><div><strong>UX<span>/</span>UI</strong><span>STRATEGY →<br/>INTERFACE</span></div><div><strong>BUILD</strong><span>DESIGN →<br/>PRODUCTION</span></div></div></section>

      <section id="work" className="work wrap section"><div className="section-head"><div><span className="kicker">01 / SELECTED MISSION FILES</span><h2>Complex problems.<br/><em>Clear outcomes.</em></h2></div><p>Selected work across product thinking, systems design and digital delivery. Each project shows how I frame problems, make decisions and bring interfaces closer to real use.</p></div><div className="projects">{projects.map(project => <ProjectCard key={project.n} project={project} />)}</div></section>

      <section id="services" className="services section"><div className="wrap"><span className="kicker">02 / CAPABILITIES</span><div className="service-intro"><h2>Strategy to screen.<br/><em>Concept to launch.</em></h2><p>I work across UX strategy, product interfaces and implementation — helping teams reduce complexity and ship digital experiences with intention.</p></div><div className="service-grid"><div><span>CAPABILITY / 01</span><h3>Product Design</h3><p>UX strategy, information architecture, user flows, wireframes, prototyping and design systems.</p></div><div><span>CAPABILITY / 02</span><h3>SaaS & B2B</h3><p>Dashboards, data products, enterprise workflows, admin platforms and AI product experiences.</p></div><div><span>CAPABILITY / 03</span><h3>Web Experience</h3><p>Premium websites, landing pages, conversion-focused redesigns, Framer and WordPress.</p></div><div><span>CAPABILITY / 04</span><h3>Design → Build</h3><p>Turning Figma concepts into responsive interfaces with Framer, WordPress, HTML and CSS.</p></div></div></div></section>

      <section id="about" className="about wrap section"><div><span className="kicker">03 / PERSONNEL DOSSIER</span><h2>Curiosity in.<br/>Clarity out.<br/><em>Always.</em></h2><div className="about-index"><span>DESIGNER / 001</span><span>HUMAN-CENTRED SYSTEMS</span></div></div><div className="about-copy"><p className="lead">I'm Malick — a Senior Product Designer and UX Engineer with 7+ years of experience across digital products, SaaS platforms, dashboards, websites and brand experiences.</p><p>My work sits between product thinking, UX, visual design and technology. I enjoy complex workflows, messy information, legacy interfaces and products that need to become simpler without losing power.</p><div className="pill-list"><span>Product thinking</span><span>Figma</span><span>Design systems</span><span>Web delivery</span><span>AI-assisted workflow</span></div><a className="text-link" href="https://www.linkedin.com/" target="_blank" rel="noreferrer">CONNECT ON LINKEDIN ↗</a></div></section>

      <section id="contact" className="contact"><div className="wrap contact-inner"><span className="kicker">04 / ESTABLISH CONNECTION</span><div className="contact-orb" aria-hidden="true"><span>↗</span></div><h2>Have a problem<br/>worth <em>solving?</em></h2><p>Looking for a senior product designer, a design partner or help turning a digital idea into a real experience? Let's talk.</p><a className="big-link" href="mailto:hello@mhdesign4u.com?subject=Let's%20work%20together">START A CONVERSATION <span>↗</span></a><div className="contact-foot"><span>hello@mhdesign4u.com</span><span>BENGALURU / INDIA</span><span>REMOTE / WORLDWIDE</span></div></div></section>

      <footer className="wrap footer"><span>© 2026 MALICK / DESIGNED WITH INTENT</span><div><a href="https://www.linkedin.com/" target="_blank" rel="noreferrer">LINKEDIN</a><a href="https://www.behance.net/" target="_blank" rel="noreferrer">BEHANCE</a><a href="https://www.figma.com/" target="_blank" rel="noreferrer">FIGMA</a><a href="https="mailto:hello@mhdesign4u.com">EMAIL</a></div></footer>
    </main>
  );
}
