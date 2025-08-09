import React, { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Portfolio from './components/Portfolio';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  const [activeSection, setActiveSection] = useState('home');

  // Section observers
  const [homeRef, homeInView] = useInView({ threshold: 0.5 });
  const [aboutRef, aboutInView] = useInView({ threshold: 0.5 });
  const [portfolioRef, portfolioInView] = useInView({ threshold: 0.3 });
  const [contactRef, contactInView] = useInView({ threshold: 0.5 });

  // Update active section based on which section is in view
  useEffect(() => {
    if (homeInView) setActiveSection('home');
    else if (aboutInView) setActiveSection('about');
    else if (portfolioInView) setActiveSection('portfolio');
    else if (contactInView) setActiveSection('contact');
  }, [homeInView, aboutInView, portfolioInView, contactInView]);

  // Smooth scrolling behavior
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return (
    <div className="bg-gray-900 text-white overflow-x-hidden">
      <Navbar activeSection={activeSection} setActiveSection={setActiveSection} />
      
      <div ref={homeRef}>
        <Hero setActiveSection={setActiveSection} />
      </div>
      
      <div ref={aboutRef}>
        <About />
      </div>
      
      <div ref={portfolioRef}>
        <Portfolio />
      </div>
      
      <div ref={contactRef}>
        <Contact />
      </div>
      
      <Footer />
    </div>
  );
}

export default App;