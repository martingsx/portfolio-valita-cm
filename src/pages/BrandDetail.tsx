import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Leaf, ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import VideoPlayer from "../components/VideoPlayer";

// Assets for Terra (only one fully implemented for now)
import terraLogo from "../assets/Trabajos/Terra/Logo.png";
import terraImg1 from "../assets/Trabajos/Terra/IMG_0610.jpg";
import terraImg2 from "../assets/Trabajos/Terra/IMG_0635.jpg";
import terraImg3 from "../assets/Trabajos/Terra/IMG_0732.jpg";
import terraRel1 from "../assets/Trabajos/Terra/Reel 1.mp4";
import terraRel2 from "../assets/Trabajos/Terra/Reel 2.mp4";
import terraRel3 from "../assets/Trabajos/Terra/Reel 3.mp4";

// Mutanta Assets
import mutantaImg1 from "../assets/Trabajos/Mutanta/IMG_0887.jpg";
import mutantaImg2 from "../assets/Trabajos/Mutanta/IMG_0985.jpg";
import mutantaImg3 from "../assets/Trabajos/Mutanta/IMG_0990.jpg";
import mutantaRel1 from "../assets/Trabajos/Mutanta/Reel 1.mp4";
import mutantaRel2 from "../assets/Trabajos/Mutanta/Reel 2.mp4";
import mutantaRel3 from "../assets/Trabajos/Mutanta/Reel 3.mp4";

// Geo Assets
import geoLogo from "../assets/Trabajos/Geo/logo.jpg";
import geoImg1 from "../assets/Trabajos/Geo/photo1.png";
import geoImg2 from "../assets/Trabajos/Geo/photo2.png";
import geoImg3 from "../assets/Trabajos/Geo/photo3.png";
import geoRel1 from "../assets/Trabajos/Geo/Reel1.mp4";
import geoRel2 from "../assets/Trabajos/Geo/Reel2.mp4";

const brandData: Record<string, any> = {
  terra: {
    name: "Terra",
    description: "Dietética & Bienestar",
    fullDescription:
      "Terra es un espacio dedicado a la alimentación consciente y el bienestar integral. Mi trabajo con ellos se centra en humanizar su presencia digital, destacando la frescura de sus productos y la calidez de su atención a través de contenido visual orgánico.",
    logo: terraLogo,
    images: [terraImg1, terraImg2, terraImg3],
    videos: [
      { src: terraRel1, title: "Espacio Terra", category: "Reel 1" },
      { src: terraRel2, title: "Calma y Bienestar", category: "Reel 2" },
      { src: terraRel3, title: "Clientes Felices", category: "Reel 3" },
    ],
  },
  mutanta: {
    name: "Mutanta",
    description: "Espiritualidad & Diseño",
    fullDescription:
      "Mutanta es una tienda alternativa que busca conectar con lo místico y lo espiritual. Especializada en dijes, piedras preciosas, sahumerios y herramientas de tarot, la marca ofrece un viaje hacia el interior y el bienestar energético a través de piezas de diseño con intención.",
    logo: "M", // Identifier for text logo
    images: [mutantaImg1, mutantaImg2, mutantaImg3],
    videos: [
      { src: mutantaRel1, title: "Magia en Detalles", category: "Reel 1" },
      { src: mutantaRel2, title: "Rituales Diarios", category: "Reel 2" },
      { src: mutantaRel3, title: "Energía Natural", category: "Reel 3" },
    ],
  },
  geo: {
    name: "Geo",
    description: "Ambientación de Eventos",
    fullDescription:
      "Geo se especializa en la ambientación integral de eventos, transformando espacios en escenarios inolvidables. Con mobiliario propio y un ojo detallista, crean atmósferas que reflejan la esencia de cada celebración, desde íntimas reuniones hasta grandes eventos corporativos.",
    logo: geoLogo,
    images: [geoImg1, geoImg2, geoImg3],
    videos: [
      { src: geoRel1, title: "Arte en Eventos", category: "Reel 1" },
      { src: geoRel2, title: "Espacios & Mobiliario", category: "Reel 2" },
    ],
  },
};

const BrandDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const brand = brandData[id || ""] || brandData.terra; // Fallback to terra for demo

  return (
    <div className="min-h-screen bg-beige pt-32 pb-24">
      <div className="container mx-auto px-8 md:px-16">
        {/* Navigation */}
        <div className="mb-12">
          <button
            onClick={() => navigate("/marcas")}
            className="flex items-center gap-2 text-cocoa/60 hover:text-terracotta transition-colors font-sans font-medium"
          >
            <ArrowLeft size={18} /> Volver a Clientes
          </button>
        </div>

        {/* Header */}
        <div className="flex flex-col md:flex-row items-center gap-12 mb-12 md:mb-24">
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-48 h-48 bg-white p-8 rounded-full shadow-xl border border-cocoa/5 flex items-center justify-center shrink-0"
          >
            {brand.logo === "M" ? (
              <span className="text-7xl font-serif font-bold text-terracotta">
                M
              </span>
            ) : (
              <img
                src={brand.logo}
                alt={brand.name}
                className="max-w-full max-h-full object-contain"
              />
            )}
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-center md:text-left"
          >
            <h1 className="text-5xl md:text-7xl font-serif font-bold text-secondary mb-4">
              {brand.name}
            </h1>
            <p className="text-xl text-terracotta font-serif italic mb-6">
              {brand.description}
            </p>
            <p className="text-cocoa/70 text-lg max-w-2xl leading-relaxed">
              {brand.fullDescription}
            </p>
          </motion.div>
        </div>

        {/* Gallery Section */}
        <div className="space-y-16 md:space-y-24">
          {/* Videos Grid / Carousel */}
          <section>
            <h2 className="text-3xl font-serif text-secondary mb-12 flex items-center gap-3">
              <Leaf className="text-terracotta" size={24} />
              Contenido Vertical (Reels)
            </h2>
            
            {/* Desktop Grid */}
            <div className="hidden md:grid md:grid-cols-3 gap-8 pb-12">
              {brand.videos.map((vid: any, idx: number) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="w-full"
                >
                  <div className="rounded-[2.5rem] overflow-hidden aspect-[9/16] shadow-2xl border border-cocoa/5 bg-cocoa relative h-auto">
                    <VideoPlayer src={vid.src} className="w-full h-full" />
                    <div className="absolute inset-x-0 top-0 p-8 text-left bg-gradient-to-b from-cocoa/80 via-cocoa/20 to-transparent pointer-events-none text-white">
                      <span className="text-[10px] uppercase tracking-[0.2rem] text-terracotta font-bold mb-2 block">{vid.category}</span>
                      <h3 className="font-serif text-xl italic">{vid.title}</h3>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Mobile Single Card View */}
            <div className="md:hidden flex justify-center py-4">
              <div className="relative w-[80vw] max-w-[320px]">
                <AnimatePresence mode="wait">
                  {brand.videos.length > 0 && (
                    <motion.div 
                      key={activeIndex}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3 }}
                      className="w-full"
                    >
                      <div className="rounded-[2.5rem] overflow-hidden aspect-[9/16] shadow-2xl border border-cocoa/5 bg-cocoa relative h-[600px] max-h-[80vh]">
                        <VideoPlayer src={brand.videos[activeIndex].src} className="w-full h-full" />
                        <div className="absolute inset-x-0 top-0 p-8 text-left bg-gradient-to-b from-cocoa/80 via-cocoa/20 to-transparent pointer-events-none text-white">
                          <span className="text-[10px] uppercase tracking-[0.2rem] text-terracotta font-bold mb-2 block">{brand.videos[activeIndex].category}</span>
                          <h3 className="font-serif text-xl italic">{brand.videos[activeIndex].title}</h3>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Overlaid Navigation Arrows pinned to card borders */}
                {brand.videos.length > 1 && (
                  <div className="absolute inset-y-0 -left-6 -right-6 flex items-center justify-between pointer-events-none z-10 w-[calc(100%+3rem)]">
                    <button 
                        onClick={() => setActiveIndex(prev => (prev > 0 ? prev - 1 : brand.videos.length - 1))}
                        className="w-12 h-12 rounded-full bg-white border border-cocoa/10 flex items-center justify-center text-secondary shadow-xl pointer-events-auto active:scale-95 transition-all hover:bg-terracotta hover:text-white"
                    >
                        <ChevronLeft size={24} />
                    </button>
                    <button 
                        onClick={() => setActiveIndex(prev => (prev < brand.videos.length - 1 ? prev + 1 : 0))}
                        className="w-12 h-12 rounded-full bg-white border border-cocoa/10 flex items-center justify-center text-secondary shadow-xl pointer-events-auto active:scale-95 transition-all hover:bg-terracotta hover:text-white"
                    >
                        <ChevronRight size={24} />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* Photos Grid */}
          <section>
            <h2 className="text-3xl font-serif text-secondary mb-12 flex items-center gap-3">
              <Leaf className="text-terracotta" size={24} />
              Fotografía Moodboard
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {brand.images.map((img: string, idx: number) => (
                <motion.div
                  key={idx}
                  className="rounded-[2rem] overflow-hidden shadow-xl aspect-square"
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <img
                    src={img}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default BrandDetail;
