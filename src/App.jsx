import { useEffect, useRef } from 'react'
import './Portfoliotheme.css'

import anime from 'animejs/lib/anime.es.js';




const SECTIONS = [
  { id: 'hero' },
  { id: 'about' },
  { id: 'projects' },
  { id: 'contact' },
];


function VerticalLine() {
  const heroLineRef = useRef(null)
  const heroDotRef = useRef(null)
  const fullLineRef = useRef(null)
  const dotRefs = useRef([])
  const topFillRef = useRef(null);


  useEffect(() => {
    // grab the positions once up front
    const heroEl = document.getElementById('hero')
    const contactEl = document.getElementById('contact')
    if (!heroEl || !contactEl) return

    const heroRect = heroEl.getBoundingClientRect()
    const heroTop = heroRect.top + window.scrollY
    const heroCenterY = heroTop + heroRect.height / 2
    const heroHalfH = heroRect.height / 2

    const contactRect = contactEl.getBoundingClientRect()
    const contactBottom = contactRect.top + window.scrollY + contactRect.height

    const sectionCenters = SECTIONS.slice(1).map(sec => {
      const el = document.getElementById(sec.id)
      if (!el) return;
      const r = el.getBoundingClientRect();

      return r.top + window.scrollY + r.height / 2
    })

    // ✅ Set dot position statically before animation
  if (heroDotRef.current) {
    heroDotRef.current.style.top = `${heroCenterY}px`;
  }

    // Build an Anime.js timeline
    const tl = anime.timeline({
      autoplay: true,
      easing: 'cubicBezier(0.4,0,0.2,1)',
      delay: 100
    })

    // 1) Hero line grows from bottom → center
    tl.add({
      targets: heroLineRef.current,
      top: [`${heroTop + heroRect.height}px`, `${heroCenterY}px`],
      height: [0, `${heroHalfH}px`],
      duration: 2000,
    })

      // 2) Hero dot appears (fade in + scale)
      .add({
        targets: heroDotRef.current,
        opacity: [0, 1],      // fade in
        scale: [0.6, 1],      // smooth scale-up
        duration: 400,
        easing: 'easeOutQuad'
      }, '+=0')
      

      // 3) Full line grows from hero bottom → contact bottom
      .add({
        targets: fullLineRef.current,
        top: [`${heroTop + heroRect.height}px`, `${heroTop + heroRect.height}px`],
        height: [0, `${contactBottom - (heroTop + heroRect.height)}px`],
        duration: 1500,
      }, '+=200')

      // 4) Section dots slide in
      .add({
        targets: dotRefs.current,
        top: sectionCenters,
        opacity: [0, 0.8],
        duration: 600,
        delay: anime.stagger(150),
      }, '-=800')


    // clean‐up on unmount
    return () => tl.pause()
  }, [])

  
  useEffect(() => {
    const hero = document.getElementById('hero');
    if (!hero || !topFillRef.current) return;
  
    const heroRect     = hero.getBoundingClientRect();
    const heroTop      = heroRect.top + window.scrollY;
    const heroCenterY  = heroTop + heroRect.height / 2;
    const heroHalfH    = heroRect.height / 2;
  
    // Initialize: anchor at the dot, zero height
    topFillRef.current.style.top    = `${heroCenterY}px`;
    topFillRef.current.style.height = `0px`;
  
    const handleScroll = () => {
      const scrollPast = window.scrollY - heroTop;
      // clamp between 0 and heroHalfH
      const fillH = Math.max(0, Math.min(scrollPast, heroHalfH));
  
      // **grow upward**: new top = centerY - fillH
      topFillRef.current.style.top    = `${heroCenterY - fillH}px`;
      topFillRef.current.style.height = `${fillH}px`;
    };
  
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  
  

  return (
    <div className="vertical-line-container">
      <div ref={heroLineRef} className="hero-vertical-line" />
      <div ref={heroDotRef} className="hero-vertical-dot" />
      <div ref={fullLineRef} className="full-vertical-line" />
      {/* ✅ New top-filler line */}
      <div ref={topFillRef} className="top-fill-line" />
      {SECTIONS.slice(1).map((sec, i) => (
        <div
          key={sec.id}
          ref={el => (dotRefs.current[i] = el || null)}
          className="section-vertical-dot"
        />
      ))}
    </div>
  )
}


function HeroSection() {
  return (
    <section className="hero-section" id="hero">
      <div className="hero-content">
        <span className="whoami">whoami_</span>
        <h1 className="hero-name">Krishna Patel</h1>
        <h2 className="hero-subtitle">a fullstack developer</h2>
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section className="about-section" id="about">
      <h1>Curriculum Vitae</h1>
      <em>Latin for "course of life"...</em>
      <p className="about-text">This is a short placeholder about me. You can update this with your own bio.</p>
      <a className="resume-link" href="/Krishna_A_Patel.pdf" download>Download Resume</a>
    </section>
  );
}

function ProjectsSection() {
  return (
    <section className="projects-section" id="projects">
      <div className="flask-svg"></div>
      <h1>Crazy projects <span className="accent">& experiments</span></h1>
      <div className="project-card">
        <div className="monitor-svg"></div>
        <h2 className="project-title">_find_my_pixels_</h2>
        <p className="project-desc">A sample project description goes here. Replace with your own projects.</p>
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section className="contact-section" id="contact">
      <h1>The End</h1>
      <p>Check out my blog!</p>
    </section>
  );
}

function Navigation() {
  return (
    <nav className="main-nav">
      <ul className="nav-links">
        <li><a href="#hero">Work</a></li>
        <li><a href="#about">Awards</a></li>
        <li><a href="#projects">Projects</a></li>
        <li><a href="#contact">Blog</a></li>
      </ul>
    </nav>
  );
}

function FloatingShapes() {
  return (
    <ul className="shapes-bg">
      <li className="shape circle"></li>
      <li className="shape square"></li>
      <li className="shape triangle"></li>
      <li className="shape hexagon"></li>
      <li className="shape diamond"></li>
      <li className="shape circle"></li>
      <li className="shape square"></li>
      <li className="shape triangle"></li>
      <li className="shape hexagon"></li>
      <li className="shape diamond"></li>
      <li className="shape circle"></li>
      <li className="shape square"></li>
    </ul>
  );
}

function App() {
  return (
    <div className="portfolio-root">
      <Navigation />
      <VerticalLine />
      <FloatingShapes />
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <ContactSection />


    </div>
  );
}

export default App;