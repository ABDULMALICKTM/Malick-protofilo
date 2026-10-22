import Link from "next/link";
import Atmosphere from "./components/Atmosphere";
import ThreeHero from "./components/ThreeHero";
import MotionDirector from "./components/MotionDirector";

const projects = [
  { number: "01", name: "ReachStream", kind: "PRODUCT DESIGN", year: "SAAS / DATA UX", description: "A B2B prospecting experience shaped around search, filtering and faster decisions.", href: "/work/reachstream", className: "project-reach", featured: true },
  { number: "02", name: "DataCaptive", kind: "PRODUCT DESIGN", year: "DATA / RESEARCH", description: "Making complex data workflows easier to scan, understand and act on.", href: "mailto:hello@mhdesign4u.com?subject=DataCaptive%20case%20study", className: "project-data" },
  { number: "03", name: "EasyGTM / ICPro", kind: "WORKFLOW SYSTEMS", year: "ENTERPRISE UX", description: "Connecting multi-step business workflows with clearer interaction logic.", href: "mailto:hello@mhdesign4u.com?subject=EasyGTM%20case%20study", className: "project-flow" },
  { number: "04", name: "Archea", kind: "WEB EXPERIENCE", year: "WEB / RESPONSIVE", description: "A live website built around a calm, considered digital presentation.", href: "https://archea.co.in/", className: "project-arch" }
];

export default function Home() {
  return <main className="rethink-shell">
    <Atmosphere />
    <MotionDirector />
    <header className="rethink-nav"><span className="fui-signal" aria-hidden="true">SYSTEM ONLINE <i/> PORTFOLIO / 01</span>
      <Link href="/" className="rethink-wordmark" aria-label="Malick home">M<span>.</span></Link>
      <nav aria-label="Main navigation"><a href="#about">About <i>01</i></a><a href="#work">Work <i>02</i></a><a href="#services">Services <i>03</i></a><a href="#journal">Journal <i>04</i></a></nav>
      <a className="nav-contact" href="mailto:hello@mhdesign4u.com?subject=Portfolio%20enquiry">LET'S TALK <span>↗</span></a>
    </header>
    <div className="fui-left-rail" aria-label="Section navigation"><a href="#home">01 / HOME</a><a href="#about">02 / ABOUT</a><a href="#work">03 / WORK</a><a href="#method">04 / PROCESS</a><a href="#contact">05 / CONTACT</a><span className="fui-rail-line"/></div><ThreeHero />
    <div className="rethink-marquee" aria-label="Product design, interaction, systems"><div>PRODUCT THINKING <b>✳</b> INTERACTION DESIGN <b>✳</b> SYSTEMS THAT SCALE <b>✳</b> PRODUCT THINKING <b>✳</b> INTERACTION DESIGN <b>✳</b> SYSTEMS THAT SCALE <b>✳</b></div></div>
    <section className="rethink-work section-wrap" id="work" data-motion-reveal>
      <div className="section-topline"><span>01 / SELECTED WORK</span><span>PRODUCTS · SYSTEMS · DIGITAL</span></div>
      <div className="work-intro"><h2>Make the hard<br/>things <em>clear.</em></h2><p>I design digital products for real-world complexity — where information, user needs and business logic have to work together.</p></div>
      <div className="rethink-projects">{projects.map((p) => <article className={`rethink-project ${p.featured ? "project-featured" : ""}`} key={p.number}>
        <a href={p.href} className="project-hit" target={p.href.startsWith("https://") ? "_blank" : undefined} rel={p.href.startsWith("https://") ? "noreferrer" : undefined}>
          <div className={`project-visual ${p.className}`} aria-hidden="true">
            <div className="visual-index"><span>MT / {p.number}</span><span>{p.year}</span></div>
            {p.className === "project-reach" ? <div className="reach-composition"><div className="reach-rail"><b>R.</b><i/><i/><i/><i/></div><div className="reach-window"><div className="window-top"><span>PROSPECT INTELLIGENCE</span><span>WORKSPACE / 01</span></div><h3>Search workspace</h3><div className="fake-search"><span>⌕</span> Find people, companies, signals… <b>⌘ K</b></div><div className="fake-chips"><i>Location</i><i>Industry</i><i>Company size</i><i>+ Filter</i></div><div className="fake-table"><div><span>CONTACT</span><span>COMPANY</span><span>ROLE</span><span>FIT</span></div>{["AM|Alex Morgan|Northstar|VP Growth|92","SK|Sana Khan|Signal Labs|Product Lead|88","JL|Jordan Lee|Fieldnote|Founder|84"].map((line) => { const [initials,name,company,role,score] = line.split("|"); return <div key={initials}><span><i>{initials}</i>{name}</span><span>{company}</span><span>{role}</span><b>{score}</b></div>; })}</div></div></div> :
              p.className === "project-data" ? <div className="data-composition"><span>OBSERVE / INTERPRET / DECIDE</span><h3>Find the<br/><em>signal.</em></h3><div className="data-bars">{[28,44,36,66,48,82,59,92,70,100,76,87,52,72,40,63].map((h,i)=><i key={i} style={{height:h+"%"}} />)}</div><div className="data-foot"><span>RAW INFORMATION</span><span>USEFUL CONTEXT →</span></div></div> :
              p.className === "project-flow" ? <div className="flow-composition"><span>WORKFLOW LOGIC / 03 NODES</span><div className="flow-track"><div><b>01</b><strong>Understand</strong><small>Context & intent</small></div><i>→</i><div className="flow-active"><b>02</b><strong>Resolve</strong><small>Rules & decisions</small></div><i>→</i><div><b>03</b><strong>Complete</strong><small>Feedback & next</small></div></div><div className="flow-orbit flow-orbit-a"/><div className="flow-orbit flow-orbit-b"/></div> :
              <div className="arch-composition"><span>ARCH / OBJECT / SPACE</span><div className="arch-shape"><i/><b>A</b></div><strong>Form follows<br/>feeling.</strong><small>LIVE WEB EXPERIENCE</small></div>}
            <span className="visual-corner">↗</span>
          </div>
          <div className="project-meta"><div className="project-heading"><span>{p.number} / {p.kind}</span><h3>{p.name}<b>↗</b></h3></div><p>{p.description}</p><span className="project-link">{p.href.startsWith("mailto:") ? "CASE STUDY AVAILABLE ON REQUEST" : p.href.startsWith("https://") ? "VIEW LIVE EXPERIENCE" : "EXPLORE CASE STUDY"} <b>↗</b></span></div>
        </a>
      </article>)}</div>
      <p className="work-footnote">Selected work shown with concept visuals where original project screens are not available. No performance metrics are implied.</p>
    </section>
    <section className="rethink-method section-wrap" id="method" data-motion-reveal>
      <div className="section-topline"><span>02 / THE METHOD</span><span>THINK CLEARLY. BUILD INTENTIONALLY.</span></div>
      <div className="method-intro"><h2>Not decoration.<br/><em>Direction.</em></h2><p>Good product design is a series of deliberate choices. The interface should make the next useful action feel obvious — without hiding the complexity the product actually needs.</p></div>
      <div className="method-steps"><article><span>01</span><h3>Understand</h3><p>Research the context, people, constraints and moments where the experience breaks down.</p><small>RESEARCH / DISCOVERY</small></article><article><span>02</span><h3>Structure</h3><p>Shape information architecture, decision paths and interaction rules before polishing screens.</p><small>FLOWS / HIERARCHY</small></article><article><span>03</span><h3>Explore</h3><p>Prototype meaningful alternatives and test the behaviour, not just the visual direction.</p><small>PROTOTYPES / SYSTEMS</small></article><article><span>04</span><h3>Refine</h3><p>Partner with engineering to account for states, responsive behaviour and real constraints.</p><small>DETAIL / DELIVERY</small></article></div>
    </section>
    <section className="rethink-profile section-wrap" id="about" data-motion-reveal>
      <div className="section-topline"><span>03 / A LITTLE ABOUT ME</span><span>BENGALURU, INDIA</span></div>
      <div className="profile-layout"><div className="profile-monogram" aria-hidden="true"><span>M</span><i>PRODUCT / INTERACTION / SYSTEMS</i><b>EST. 2018</b></div><div className="profile-copy"><h2>Curious by nature.<br/><em>Precise by design.</em></h2><p>I'm Malick — a product designer and UX-focused builder with 7+ years of experience across SaaS products, data-heavy interfaces, websites and digital experiences.</p><p>I enjoy the work behind the screen: untangling complex journeys, finding the right hierarchy, defining reusable patterns and bringing ideas to life with thoughtful detail.</p><div className="profile-skills"><span>PRODUCT DESIGN</span><span>UX RESEARCH</span><span>FIGMA / ADOBE XD</span><span>DESIGN SYSTEMS</span><span>PROTOTYPING</span><span>HTML / CSS</span><span>WORDPRESS</span></div><a className="text-link" href="mailto:hello@mhdesign4u.com?subject=Let's%20connect">LET'S START A CONVERSATION <b>↗</b></a></div></div>
    </section>

    <section className="signal-services section-wrap" id="services" data-motion-reveal>
      <div className="section-topline"><span>04 / CAPABILITIES</span><span>FROM CONCEPT TO SHIPPED EXPERIENCE</span></div>
      <div className="signal-section-heading"><div><p className="signal-kicker">WHAT I BRING TO THE TABLE</p><h2>Design with intent.<br/><em>Build for reality.</em></h2></div><p className="signal-intro">A connected practice across product thinking, interaction, visual systems and implementation — so the experience holds together beyond the mock-up.</p></div>
      <div className="signal-service-grid">
        <article><span>01 / PRODUCT</span><b>↗</b><h3>Product design</h3><p>From discovery and user flows to prototypes, interface systems and thoughtful product decisions.</p><small>RESEARCH · UX · UI · PROTOTYPING</small></article>
        <article><span>02 / EXPERIENCE</span><b>↗</b><h3>UX & interaction</h3><p>Clearer information architecture, useful feedback, accessible patterns and meaningful motion.</p><small>JOURNEYS · FLOWS · DESIGN SYSTEMS</small></article>
        <article><span>03 / DIGITAL</span><b>↗</b><h3>Web experiences</h3><p>Responsive websites and landing pages designed around clarity, performance and conversion.</p><small>RESPONSIVE · WORDPRESS · FRONT-END</small></article>
        <article><span>04 / IDENTITY</span><b>↗</b><h3>Brand & commerce</h3><p>Digital-first visual identities, packaging direction and ecommerce experiences that feel cohesive.</p><small>BRANDING · E-COMMERCE · CONTENT</small></article>
      </div>
    </section>
    <section className="signal-experience section-wrap" id="experience" data-motion-reveal>
      <div className="section-topline"><span>05 / EXPERIENCE</span><span>DESIGN · DELIVERY · COLLABORATION</span></div>
      <div className="signal-section-heading"><div><p className="signal-kicker">A PRACTICE BUILT OVER TIME</p><h2>Different problems.<br/><em>One design mindset.</em></h2></div><p className="signal-intro">Over 7 years across product design, SaaS, data-heavy interfaces and web experiences — partnering with teams to make complex things easier to use.</p></div>
      <div className="signal-timeline">
        <article><span className="signal-timeline-index">01</span><div><h3>Insnap Technologies / Spokesly</h3><p>UI/UX design across digital products, web apps and SaaS workflows.</p></div><small>PRODUCT · SAAS · WEB</small></article>
        <article><span className="signal-timeline-index">02</span><div><h3>DataCaptive & ReachStream</h3><p>Product experiences shaped around data, prospecting, search and filtering.</p></div><small>DATA · RESEARCH · UX</small></article>
        <article><span className="signal-timeline-index">03</span><div><h3>Independent design practice</h3><p>Branding, web design, ecommerce, packaging and digital experiences for growing businesses.</p></div><small>WEB · BRAND · COMMERCE</small></article>
      </div>
      <div className="signal-tool-strip"><span>TOOLS & TECHNOLOGY</span><div>FIGMA</div><div>ADOBE XD</div><div>PHOTOSHOP</div><div>ILLUSTRATOR</div><div>HTML / CSS</div><div>WORDPRESS</div><div>REACT / NEXT.JS</div></div>
    </section>
    <section className="signal-journal section-wrap" id="journal" data-motion-reveal>
      <div className="section-topline"><span>06 / NOTES FROM THE PROCESS</span><span>DESIGN · SYSTEMS · CRAFT</span></div>
      <div className="signal-journal-heading"><h2>Thinking out loud<span>.</span></h2><p>Ideas I keep coming back to while designing and building digital products.</p></div>
      <div className="signal-journal-grid">
        <article><div className="signal-journal-art journal-art-a"><span>01</span><b>UX ≠ UI</b><i>USER / SYSTEM / CONTEXT</i></div><small>PRODUCT THINKING / 01</small><h3>Designing beyond the screen</h3><p>Why the strongest interfaces start with the system, the context and the decision a person needs to make.</p></article>
        <article><div className="signal-journal-art journal-art-b"><span>02</span><b>LESS, BUT<br/>CLEARER.</b><i>INFORMATION / HIERARCHY</i></div><small>INTERACTION / 02</small><h3>Clarity is a design decision</h3><p>Using hierarchy, constraints and feedback to make complex workflows feel more understandable.</p></article>
        <article><div className="signal-journal-art journal-art-c"><span>03</span><b>DESIGN<br/>TO BUILD.</b><i>IDEA → PROTOTYPE → PRODUCT</i></div><small>BUILDING / 03</small><h3>Closing the gap to implementation</h3><p>How design systems, realistic states and collaboration help ideas survive the handoff.</p></article>
      </div>
    </section>
    <section className="rethink-contact" id="contact" data-motion-reveal><div className="contact-inner"><div className="section-topline"><span>07 / OPEN CHANNEL</span><span>AVAILABLE FOR SELECT PROJECTS</span></div><p>HAVE A COMPLEX PROBLEM?</p><h2>Let's make<br/><em>it make sense.</em></h2><div className="contact-bottom"><span>Product design, UX partnership, or a digital experience that needs a sharper point of view.</span><a href="mailto:hello@mhdesign4u.com?subject=Let's%20work%20together">START A PROJECT <b>↗</b></a></div></div></section>
    <footer className="rethink-footer"><Link href="/" className="rethink-wordmark">M<span>.</span></Link><span>© 2026 MALICK · BUILT WITH INTENT</span><div><a href="mailto:hello@mhdesign4u.com">EMAIL ↗</a><a href="https://www.linkedin.com/" target="_blank" rel="noreferrer">LINKEDIN ↗</a></div></footer>
  </main>;
}
