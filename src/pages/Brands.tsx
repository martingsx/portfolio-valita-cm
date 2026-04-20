import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Leaf } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Terra Assets
import terraLogo from '../assets/Trabajos/Terra/Logo.png';
import terraBg from '../assets/Trabajos/Terra/IMG_0610.jpg';

// Mutanta Assets
import mutantaBg from '../assets/Trabajos/Mutanta/IMG_0887.jpg';

// Geo Assets
import geoLogo from '../assets/Trabajos/Geo/logo.jpg';
import geoBg from '../assets/Trabajos/Geo/photo1.png';

const Brands = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const brands = [
    { 
      name: 'Terra', 
      description: 'Dietética & Bienestar', 
      logo: terraLogo, 
      bg: terraBg,
      rotation: -2,
      active: true
    },
    { 
      name: 'Mutanta', 
      description: 'Espiritualidad & Diseño', 
      logo: null, 
      bg: mutantaBg, 
      rotation: 1,
      isAlternative: true,
      active: true
    },
    { 
      name: 'Geo', 
      description: 'Ambientación de Eventos', 
      logo: geoLogo, 
      bg: geoBg, 
      rotation: -1.5,
      active: true
    },
    { name: 'Lo de Pri', description: 'Boutique & Café', logo: null, bg: null, rotation: 2, active: false },
    { name: 'Lo de la Peque', description: 'Emprendimiento Creativo', logo: null, bg: null, rotation: -1, active: false },
  ];

  return (
    <div className="min-h-screen bg-beige pt-32">
      <div className="container mx-auto px-8 md:px-16 mb-8">
        <button 
          onClick={() => navigate('/')} 
          className="flex items-center gap-2 text-cocoa/60 hover:text-terracotta transition-colors font-sans font-medium bg-white/40 px-4 py-2 rounded-full border border-cocoa/5 shadow-sm"
        >
          <ArrowLeft size={18} /> Volver al Inicio
        </button>
      </div>

      <section className="pb-32">
        <div className="container mx-auto px-8 md:px-16">
          <motion.div 
            className="text-center mb-12 md:mb-24 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-5xl md:text-6xl font-serif font-bold text-secondary mb-6">Nuestros clientes</h1>
            <p className="text-cocoa/70 text-lg leading-relaxed font-sans italic">
              Acompaño a marcas que buscan conectar desde la autenticidad. Cada proyecto es una historia capturada con cuidado y dedicación.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 sm:gap-16">
            {brands.map((brand, idx) => (
              <motion.div 
                key={idx}
                onClick={() => brand.active && navigate(`/marcas/${brand.name.toLowerCase().replace(/\s+/g, '-')}`)}
                className={`relative bg-white p-4 pb-12 shadow-2xl shadow-cocoa/10 border border-cocoa/5 transition-all duration-500 group ${brand.active ? 'cursor-pointer hover:scale-105' : 'cursor-default opacity-60'}`}
                style={{ rotate: `${brand.rotation}deg` }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                {/* Polaroid Photo Area */}
                <div className="relative aspect-square overflow-hidden bg-beige/50 border border-cocoa/5">
                  {brand.bg ? (
                    <img 
                      src={brand.bg} 
                      alt="" 
                      className={`w-full h-full object-cover grayscale-[10%] transition-all duration-700 ${brand.active ? 'hover:grayscale-0' : ''}`}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-terracotta/5">
                       <Leaf className="text-terracotta/20" size={40} />
                    </div>
                  )}
                  
                  {/* Small Circular Logo Overplay */}
                  {(brand.logo || brand.isAlternative) && (
                    <div className="absolute bottom-4 right-4 w-16 h-16 bg-white p-2 rounded-full shadow-lg border border-cocoa/5 flex items-center justify-center">
                       {brand.logo ? (
                         <img src={brand.logo} alt="" className="max-w-full max-h-full object-contain" />
                       ) : (
                         <span className="text-2xl font-serif font-bold text-terracotta">M</span>
                       )}
                    </div>
                  )}

                  {!brand.active && (
                    <div className="absolute inset-0 bg-secondary/5 backdrop-blur-[1px] flex items-center justify-center">
                      <span className="bg-white/90 text-secondary text-[10px] uppercase tracking-widest font-bold px-4 py-2 rounded-full border border-secondary/10 shadow-sm">Próximamente</span>
                    </div>
                  )}
                </div>

                {/* Polaroid Caption Area */}
                <div className="mt-8 text-center px-2">
                  <h3 className="text-2xl font-serif font-bold text-secondary leading-tight italic">{brand.name}</h3>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-terracotta/70 font-bold mt-2">{brand.description}</p>
                </div>

                {/* Aesthetic Detail */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-16 h-8 bg-beige/40 blur-sm -z-10"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer minimal for this page */}
      <footer className="py-12 text-center text-cocoa/30 text-xs tracking-widest uppercase border-t border-cocoa/5">
         &copy; {new Date().getFullYear()} &bull; Valita CM &bull; Portfolio de Marcas
      </footer>
    </div>
  );
};

export default Brands;
