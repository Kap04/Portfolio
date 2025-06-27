import { useEffect, useRef } from 'react';
import './Portfoliotheme.css'

const SECTIONS = [
  { id: 'hero' },
  { id: 'about' },
  { id: 'projects' },
  { id: 'contact' },
];

function VerticalLine() {
  const heroLineRef = useRef(null);
  const heroDotRef = useRef(null);
  const fullLineRef = useRef(null);
  const dotRefs = useRef([]);

  useEffect(() => {
    const updatePositions = () => {
      const heroSection = document.getElementById('hero');
      if (!heroSection || !heroLineRef.current || !heroDotRef.current || !fullLineRef.current) return;

      const heroRect = heroSection.getBoundingClientRect();
      const heroTop = heroRect.top + window.scrollY;
      const heroBottom = heroTop + heroRect.height;
      const heroCenter = heroTop + heroRect.height / 2;

      // Hero section line - from bottom to center
      heroLineRef.current.style.top = `${heroCenter}px`;
      heroLineRef.current.style.height = `${heroRect.height / 2}px`;

      // Hero dot at center
      heroDotRef.current.style.top = `${heroCenter}px`;

      // Full line for other sections - from hero bottom to end of page
      const lastSection = document.getElementById('contact');
      if (lastSection) {
        const lastRect = lastSection.getBoundingClientRect();
        const lastBottom = lastRect.top + window.scrollY + lastRect.height;
        
        fullLineRef.current.style.top = `${heroBottom}px`;
        fullLineRef.current.style.height = `${lastBottom - heroBottom}px`;
      }

      // Position dots for other sections
      SECTIONS.slice(1).forEach((section, index) => {
        const element = document.getElementById(section.id);
        const dot = dotRefs.current[index];
        if (element && dot) {
          const rect = element.getBoundingClientRect();
          const center = rect.top + window.scrollY + rect.height / 2;
          dot.style.top = `${center}px`;
        }
      });
    };

    // Initial positioning
    setTimeout(updatePositions, 100);
    
    window.addEventListener('resize', updatePositions);
    window.addEventListener('scroll', updatePositions);
    
    return () => {
      window.removeEventListener('resize', updatePositions);
      window.removeEventListener('scroll', updatePositions);
    };
  }, []);

  return (
    <div className="vertical-line-container">
      {/* Hero section animated line */}
      <div 
        ref={heroLineRef}
        className="hero-vertical-line"
      />
      
      {/* Hero section dot */}
      <div 
        ref={heroDotRef}
        className="hero-vertical-dot"
      />
      
      {/* Full line for other sections */}
      <div 
        ref={fullLineRef}
        className="full-vertical-line"
      />
      
      {/* Dots for other sections */}
      {SECTIONS.slice(1).map((section, index) => (
        <div
          key={`dot-${section.id}`}
          ref={el => (dotRefs.current[index] = el)}
          className="section-vertical-dot"
        />
      ))}
    </div>
  );
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