import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Instagram, MessageCircle, Mail, Menu, ArrowRight, Leaf, ChevronLeft, ChevronRight } from 'lucide-react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import BlurText from './components/BlurText';
import ClickSpark from './components/ClickSpark';
import VideoPlayer from './components/VideoPlayer';
import Brands from './pages/Brands';
import BrandDetail from './pages/BrandDetail';

// Assets
import video1 from './assets/WhatsApp Video 2026-04-20 at 12.45.08 PM.mp4';
import video2 from './assets/WhatsApp Video 2026-04-20 at 12.45.29 PM.mp4';
import video3 from './assets/WhatsApp Video 2026-04-20 at 12.44.30 PM.mp4';
import mebanner from './assets/mebanner.jpg';
import me from './assets/me1.JPG';
import photo1 from './assets/IMG_0940.jpg';

import { animate } from 'framer-motion';

const smoothScrollTo = (element: Element) => {
  const offset = 85; 
  const elementPosition = element.getBoundingClientRect().top + window.scrollY;
  const offsetPosition = elementPosition - offset;

  animate(window.scrollY, offsetPosition, {
    type: "spring",
    stiffness: 80,
    damping: 15,
    onUpdate: (latest) => window.scrollTo(0, latest)
  });
};

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('inicio');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (location.pathname !== '/') {
      setActiveSection('');
      return;
    }

    const observerOptions = {
      root: null,
      rootMargin: '-40% 0px -40% 0px',
      threshold: 0
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    const sections = ['inicio', 'trabajos', 'contacto'];
    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [location.pathname]);


  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const id = href.replace('#', '');
    setIsMenuOpen(false);
    
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const element = document.querySelector(href);
        if (element) smoothScrollTo(element);
        setActiveSection(id);
      }, 150);
    } else {
      const element = document.querySelector(href);
      if (element) smoothScrollTo(element);
      setActiveSection(id);
    }
  };

  const isHome = location.pathname === '/';
  const showBg = scrolled || !isHome;

  return (
    <>
      <nav className={`fixed top-0 left-0 w-full h-24 z-[60] flex items-center transition-all duration-500 ${showBg ? 'bg-beige/80 backdrop-blur-lg border-b border-cocoa/5 shadow-sm' : ''}`}>
        <div className="container mx-auto px-8 md:px-16 flex justify-between items-center w-full">
        <button 
          onClick={() => { navigate('/'); window.scrollTo({ top: 0, behavior: 'smooth' }); setIsMenuOpen(false); }} 
          className="px-5 py-2.5 rounded-full border border-cocoa shadow-sm backdrop-blur-sm flex items-center gap-3 hover:shadow-md transition-all duration-300 group z-[70]"
        >
          <Leaf className="text-terracotta group-hover:rotate-12 transition-transform" size={20} />
          <span className="text-xl font-serif font-bold text-secondary">Valita CM</span>
        </button>
        
        <ul className="hidden md:flex gap-12">
          {['Inicio', 'Trabajos', 'Contacto'].map((name) => {
            const id = name.toLowerCase() === 'inicio' ? 'inicio' : name.toLowerCase();
            const isActive = activeSection === id;
            
            return (
              <li key={name}>
                <a 
                  href={`#${id}`} 
                  onClick={(e) => handleNavClick(e, `#${id}`)}
                  className={`text-sm font-medium tracking-wide transition-colors relative group font-sans ${isActive ? 'text-terracotta' : 'text-cocoa/70 hover:text-terracotta'}`}
                >
                  {name}
                  <span className={`absolute -bottom-1 left-1/2 -translate-x-1/2 h-0.5 bg-terracotta transition-all duration-500 rounded-full ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
                </a>
              </li>
            );
          })}
        </ul>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-cocoa z-[70] relative p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <ArrowRight className="rotate-180" size={28} /> : <Menu size={28} />}
        </button>
      </div>
    </nav>

    {/* Mobile Menu Overlay */}
    <div className={`fixed inset-0 bg-beige/98 backdrop-blur-2xl flex flex-col items-center justify-center gap-12 transition-all duration-500 md:hidden z-[100] ${isMenuOpen ? 'translate-x-0 opacity-100 pointer-events-auto' : 'translate-x-full opacity-0 pointer-events-none'}`}>
           {/* Close handle/area */}
           <div className="absolute top-8 right-8">
              <button className="text-secondary p-2" onClick={() => setIsMenuOpen(false)}>
                <ArrowRight className="rotate-180" size={32} />
              </button>
           </div>
           
           {['Inicio', 'Trabajos', 'Contacto'].map((name) => {
            const id = name.toLowerCase() === 'inicio' ? 'inicio' : name.toLowerCase();
            return (
              <a 
                key={name}
                href={`#${id}`} 
                onClick={(e) => handleNavClick(e, `#${id}`)}
                className="text-5xl font-serif font-bold text-secondary hover:text-terracotta transition-colors"
              >
                {name}
              </a>
            );
          })}
          <div className="flex gap-10 mt-8">
             <a href="https://www.instagram.com/valita.cm/" target="_blank" rel="noopener noreferrer" className="p-4 rounded-2xl bg-white shadow-sm text-terracotta hover:scale-110 transition-transform">
               <Instagram size={28} />
             </a>
             <a href="https://wa.me/5493416445915" target="_blank" rel="noopener noreferrer" className="p-4 rounded-2xl bg-white shadow-sm text-terracotta hover:scale-110 transition-transform">
               <MessageCircle size={28} />
             </a>
          </div>
        </div>
    </>
  );
};

const Home = () => {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);
  
  const samples = [
    { type: 'video', src: video1, title: 'UGC Rituals 1', category: 'Lifestyle' },
    { type: 'video', src: video2, title: 'UGC Rituals 2', category: 'Wellness' },
    { type: 'image', src: photo1, title: 'Estética Visual', category: 'UGC Photo' },
    { type: 'video', src: video3, title: 'Momentos Café', category: 'Instagram Reels' },
  ];

  return (
    <>
      {/* Hero */}
      <section id="inicio" className="relative min-h-screen flex flex-col justify-center items-center text-center px-6 pt-20 overflow-hidden">
        {/* Blurred Background Banner */}
        <div className="absolute inset-0 z-0">
          <img 
             src={mebanner} 
             alt="" 
             className="w-full h-full object-cover blur-sm opacity-20 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-beige via-transparent to-beige"></div>
        </div>
        <div className="organic-blob bg-terracotta top-1/4 left-1/4 w-[500px] h-[500px]"></div>
        <div className="organic-blob bg-sage bottom-1/4 right-1/4 w-[600px] h-[600px]"></div>
        
        <div className="container mx-auto relative">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }} className="mb-8">
            <span className="inline-block bg-terracotta/10 text-terracotta px-6 py-2 rounded-full font-serif italic text-sm border border-terracotta/20">
              Un espacio para tu marca
            </span>
          </motion.div>
          
          <div className="text-6xl md:text-8xl font-serif font-bold text-secondary mb-8 leading-[1.1] flex flex-col items-center px-4 w-full">
            <BlurText text="UGC Creator & CM" delay={150} animateBy="words" direction="bottom" className="justify-center italic text-terracotta w-full text-center" />
          </div>

          <motion.div className="flex gap-8 mb-16 justify-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
            {[
              { icon: <Instagram size={28} />, href: 'https://www.instagram.com/valita.cm/', label: 'Instagram' },
              { icon: (
                <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.94 3.659 1.437 5.634 1.437h.005c6.558 0 11.894-5.335 11.897-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
              ), href: 'https://wa.me/5493416445915', label: 'WhatsApp' },
              { icon: <Mail size={28} />, href: 'mailto:esencia.24.natural@gmail.com', label: 'Email' },
            ].map((item, idx) => (
              <a key={idx} href={item.href} target="_blank" rel="noopener noreferrer" className="w-16 h-16 flex items-center justify-center rounded-2xl bg-white/60 border border-cocoa/10 shadow-sm text-secondary transition-all duration-500 transform hover:scale-110 hover:-translate-y-2 hover:shadow-xl hover:text-terracotta active:scale-95">
                {item.icon}
              </a>
            ))}
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>
            <button 
              onClick={() => {
                const el = document.getElementById('trabajos');
                if (el) smoothScrollTo(el);
              }}
              className="btn-warm"
            >
              Explorá mi trabajo <ArrowRight size={18} />
            </button>
          </motion.div>
        </div>
      </section>

      {/* Presentation */}
      <section id="presentacion" className="py-20 md:py-32 bg-white/30">
        <div className="container mx-auto px-8 md:px-16 text-center lg:text-left">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <motion.div className="relative" initial={{ opacity: 0, rotate: -2 }} whileInView={{ opacity: 1, rotate: 0 }} viewport={{ once: true }}>
              <div className="absolute inset-0 bg-terracotta/10 rounded-[3rem] translate-x-4 translate-y-4 -z-10 border border-terracotta/10"></div>
              <div className="rounded-[3rem] overflow-hidden shadow-2xl h-[450px] md:h-[600px] border-[12px] border-white">
                <img src={me} alt="Sobre mí" className="w-full h-full object-cover" />
              </div>
            </motion.div>
            <motion.div className="space-y-8" initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <h2 className="text-4xl md:text-5xl font-serif text-secondary">Humanizando marcas <br /> <span className="italic text-terracotta font-normal">paso a paso</span></h2>
              <div className="space-y-6 text-lg text-cocoa/80 leading-relaxed font-sans">
                <p>Soy creadora de UGC, y mi mundo gira alrededor de los pequeños rituales: el hogar, el bienestar, la belleza y esos gestos cotidianos que hacen que la vida se sienta más suave.</p>
                <p>Me encanta acompañar a las marcas para crear contenido cálido y auténtico, que se sienta real y le dé a la experiencia visual esa calma linda de estar en el lugar correcto.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why UGC */}
      <section className="py-24 bg-terracotta/5 text-center">
        <div className="container mx-auto px-8 md:px-16">
          <div className="max-w-4xl mx-auto space-y-8">
            <h2 className="text-3xl md:text-4xl font-serif text-secondary italic">¿Por qué UGC?</h2>
            <p className="text-xl md:text-2xl text-cocoa/80 leading-relaxed font-serif">
              "El UGC le da a tu marca una voz más humana y cercana. Al colaborar conmigo como creadora, creamos contenido que se siente real, que conecta de verdad con tu audiencia y que refleja con cuidado la esencia de tu identidad visual."
            </p>
          </div>
        </div>
      </section>

      {/* Works */}
      <section id="trabajos" className="pt-8 md:pt-12 pb-32">
        <div className="container mx-auto px-0 md:px-16 text-center">
          <div className="flex flex-col items-center justify-center gap-4 mb-4 md:mb-8 px-8">
            <h2 className="text-4xl md:text-5xl font-serif text-secondary">Muestras de Trabajo</h2>
            <button 
              onClick={() => navigate('/marcas')}
              className="px-8 py-3 rounded-full bg-secondary text-white text-sm font-semibold hover:bg-terracotta transition-all duration-300 flex items-center gap-2 shadow-md hover:shadow-lg"
            >
              Ver todos los trabajos <ArrowRight size={16} />
            </button>
          </div>
          <p className="text-cocoa/60 max-w-xl mx-auto mb-8 md:mb-12 italic px-8">Un vistazo a las pequeñas historias que hemos contado.</p>
          
          {/* Desktop Grid */}
          <div className="hidden md:grid md:grid-cols-3 lg:grid-cols-4 gap-8 pb-12 px-8">
            {samples.map((sample, idx) => (
              <motion.div key={idx} className="w-full">
                <div className="rounded-[2.5rem] overflow-hidden aspect-[9/16] shadow-2xl border border-cocoa/5 bg-cocoa relative h-auto group">
                  {sample.type === 'video' ? (
                    <VideoPlayer src={sample.src as string} className="w-full h-full" />
                  ) : (
                    <img src={sample.src} alt={sample.title} className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" />
                  )}
                  <div className="absolute inset-x-0 top-0 p-8 text-left bg-gradient-to-b from-cocoa/80 via-cocoa/20 to-transparent pointer-events-none text-white">
                    <span className="text-[10px] uppercase tracking-widest text-terracotta font-bold mb-2 block">{sample.category}</span>
                    <h3 className="font-serif text-xl leading-tight italic">{sample.title}</h3>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Mobile Single Card View */}
          <div className="md:hidden flex justify-center py-4">
            <div className="relative w-[80vw] max-w-[320px]">
              <AnimatePresence mode="wait">
                <motion.div 
                  key={activeIndex}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="w-full"
                >
                  <div className="rounded-[2.5rem] overflow-hidden aspect-[9/16] shadow-2xl border border-cocoa/5 bg-cocoa relative h-[600px] max-h-[80vh]">
                    {samples[activeIndex].type === 'video' ? (
                      <VideoPlayer src={samples[activeIndex].src as string} className="w-full h-full" />
                    ) : (
                      <img src={samples[activeIndex].src} alt={samples[activeIndex].title} className="w-full h-full object-cover opacity-90" />
                    )}
                    <div className="absolute inset-x-0 top-0 p-8 text-left bg-gradient-to-b from-cocoa/80 via-cocoa/20 to-transparent pointer-events-none text-white">
                      <span className="text-[10px] uppercase tracking-widest text-terracotta font-bold mb-2 block">{samples[activeIndex].category}</span>
                      <h3 className="font-serif text-xl leading-tight italic">{samples[activeIndex].title}</h3>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Overlaid Navigation Arrows pinned to card borders */}
              <div className="absolute inset-y-0 -left-6 -right-6 flex items-center justify-between pointer-events-none z-10 w-[calc(100%+3rem)]">
                 <button 
                    onClick={() => setActiveIndex(prev => (prev > 0 ? prev - 1 : samples.length - 1))}
                    className="w-12 h-12 rounded-full bg-white border border-cocoa/10 flex items-center justify-center text-secondary shadow-xl pointer-events-auto active:scale-95 transition-all hover:bg-terracotta hover:text-white"
                 >
                    <ChevronLeft size={24} />
                 </button>
                 <button 
                    onClick={() => setActiveIndex(prev => (prev < samples.length - 1 ? prev + 1 : 0))}
                    className="w-12 h-12 rounded-full bg-white border border-cocoa/10 flex items-center justify-center text-secondary shadow-xl pointer-events-auto active:scale-95 transition-all hover:bg-terracotta hover:text-white"
                 >
                    <ChevronRight size={24} />
                 </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contacto" className="py-32 text-center">
        <div className="container mx-auto px-8 md:px-16">
          <div className="cozy-card p-12 md:p-24 border-none bg-secondary text-beige shadow-2xl">
            <h2 className="text-4xl md:text-6xl font-serif mb-8 text-white">¿Empezamos algo juntos?</h2>
            <p className="text-xl text-beige/80 max-w-2xl mx-auto mb-16 leading-relaxed">Tanto si tienes un proyecto definido como si apenas estás empezando, me encantaría escucharte y ver cómo podemos dar vida a tu marca.</p>
            <div className="flex flex-wrap justify-center items-center gap-10">
              <a href="https://wa.me/5493416445915" target="_blank" rel="noopener noreferrer" className="bg-terracotta text-white px-10 py-5 rounded-full font-bold shadow-lg hover:bg-white hover:text-secondary transition-all duration-500 scale-110">
                Enviame un WhatsApp
              </a>
              <a href="mailto:esencia.24.natural@gmail.com" className="flex items-center gap-2 text-beige font-semibold hover:text-white transition-colors">
                Enviame un mail <ArrowRight size={18} />
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

const Footer = () => (
  <footer className="py-16 bg-secondary text-beige text-center transition-colors duration-500">
    <div className="container mx-auto px-8">
      <div className="flex items-center justify-center gap-2 mb-6 font-serif font-bold text-beige text-xl">
        <Leaf size={18} className="text-amber-200" />
        <span>Valita CM</span>
      </div>
      <p className="text-beige/60 text-sm italic mb-4">"Cuidando cada detalle, como quien riega una planta."</p>
      <p className="text-beige/40 text-xs font-sans tracking-widest uppercase">&copy; {new Date().getFullYear()} &bull; Community Manager & Creator</p>
    </div>
  </footer>
);

function App() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="min-h-screen">
      <ClickSpark sparkColor="#9a3412" sparkSize={8} sparkRadius={20} sparkCount={10} duration={500} />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/marcas" element={<Brands />} />
        <Route path="/marcas/:id" element={<BrandDetail />} />
      </Routes>
    </div>
  );
}

export default App;
