import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import useEmblaCarousel from "embla-carousel-react";

// Import hero images
import slideMarketing from "@/assets/hero/slide-marketing.jpg";
import slideDevelopment from "@/assets/hero/slide-development.jpg";
import slideBranding from "@/assets/hero/slide-branding.jpg";

const slides = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1920&h=1080&fit=crop",
    tag: "Digital Marketing",
    headline: "Transform Your Business",
    headlineAccent: "With Digital Marketing",
    description: "Data-driven strategies, SEO, social media & performance marketing that deliver measurable results.",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1611746872915-64382b5c76da?w=1920&h=1080&fit=crop",
    tag: "WhatsApp Marketing",
    headline: "Reach Customers",
    headlineAccent: "Where They Are",
    description: "WhatsApp marketing with 98% open rates. Official API, AI automation, and bulk messaging solutions.",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1920&h=1080&fit=crop",
    tag: "Growth Strategy",
    headline: "Scale Your Brand",
    headlineAccent: "Drive Real Growth",
    description: "Comprehensive digital solutions from SEO to AI agents that accelerate your business growth.",
  },
];

export const HeroSection = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((index: number) => emblaApi && emblaApi.scrollTo(index), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  useEffect(() => {
    if (!emblaApi || !isAutoPlaying) return;
    const interval = setInterval(() => {
      emblaApi.scrollNext();
    }, 5000);
    return () => clearInterval(interval);
  }, [emblaApi, isAutoPlaying]);

  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      <div ref={emblaRef} className="w-full overflow-hidden">
        <div className="flex">
          {slides.map((slide, index) => (
            <div key={slide.id} className="relative flex-[0_0_100%] min-w-0 min-h-screen flex items-center">
              <div className="absolute inset-0">
                <img
                  src={slide.image}
                  alt={slide.tag}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/80 to-transparent" />
              </div>

              <div className="relative z-10 w-full">
                <div className="container-custom">
                  <AnimatePresence mode="wait">
                    {selectedIndex === index && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.6 }}
                        className="max-w-3xl"
                      >
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: 0.1 }}
                          className="mb-4"
                        >
                          <p className="text-accent text-sm font-semibold tracking-wide uppercase mb-2">
                            Marketvry - Where Markets Meet Mastery
                          </p>
                          <span className="inline-flex items-center gap-2 px-5 py-2.5 bg-accent/10 backdrop-blur-sm border border-accent/20 rounded-full text-sm font-semibold text-accent">
                            <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                            {slide.tag}
                          </span>
                        </motion.div>

                        <motion.h1
                          initial={{ opacity: 0, y: 30 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, delay: 0.15 }}
                          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[1.05] tracking-tight text-white mb-6"
                        >
                          {slide.headline}
                          <span className="block text-gradient mt-2">
                            {slide.headlineAccent}
                          </span>
                        </motion.h1>

                        <motion.p
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: 0.25 }}
                          className="text-xl md:text-2xl text-white/80 mb-10 max-w-2xl leading-relaxed"
                        >
                          {slide.description}
                        </motion.p>

                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: 0.35 }}
                          className="flex flex-col sm:flex-row gap-4"
                        >
                          <Link to="/contact">
                            <Button className="btn-hero group w-full sm:w-auto text-lg px-8 py-6">
                              Start Your Growth
                              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                            </Button>
                          </Link>
                          <Link to="/portfolio">
                            <Button
                              variant="outline"
                              className="w-full sm:w-auto px-8 py-6 text-lg bg-white/10 backdrop-blur-sm border-2 border-white/30 hover:border-white hover:bg-white/20 text-white group transition-all"
                            >
                              View Our Work
                              <ArrowUpRight className="w-5 h-5 ml-2 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                            </Button>
                          </Link>
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-12 left-0 right-0 z-20">
        <div className="container-custom">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="flex gap-3">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => scrollTo(index)}
                    className="group relative"
                  >
                    <div
                      className={`h-1.5 rounded-full transition-all duration-500 ${
                        selectedIndex === index
                          ? "w-12 bg-accent"
                          : "w-8 bg-white/40 group-hover:bg-white/60"
                      }`}
                    />
                  </button>
                ))}
              </div>
              <span className="text-sm text-white/60 font-mono hidden sm:block">
                0{selectedIndex + 1} <span className="text-white/30">/</span> 0{slides.length}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={scrollPrev}
                className="w-14 h-14 rounded-full border-2 border-white/30 bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-accent hover:border-accent transition-all"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={scrollNext}
                className="w-14 h-14 rounded-full border-2 border-white/30 bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-accent hover:border-accent transition-all"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 hidden lg:block"
      >
        <div className="w-7 h-12 rounded-full border-2 border-white/40 flex justify-center pt-2">
          <div className="w-1.5 h-3 bg-accent rounded-full" />
        </div>
      </motion.div>
    </section>
  );
};
