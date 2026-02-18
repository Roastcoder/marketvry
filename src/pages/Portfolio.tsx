import { motion, AnimatePresence } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { useState, useEffect } from "react";
import { ArrowUpRight, X, ExternalLink } from "lucide-react";
import { toast } from "sonner";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

const Portfolio = () => {
  const [portfolio, setPortfolio] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedProject, setSelectedProject] = useState<any>(null);

  useEffect(() => {
    fetchPortfolio();
  }, []);

  const fetchPortfolio = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`${API_URL}/portfolio`);
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setPortfolio(data);
    } catch (error: any) {
      toast.error("Failed to load portfolio");
    } finally {
      setIsLoading(false);
    }
  };

  const categories = ["All", ...Array.from(new Set(portfolio.map(p => p.category).filter(Boolean)))];
  const filteredProjects = activeCategory === "All" 
    ? portfolio 
    : portfolio.filter(p => p.category === activeCategory);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-navy pt-32 pb-20">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <span className="text-accent font-semibold tracking-wide uppercase text-sm">
              Our Work
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mt-4 mb-6">
              Portfolio
            </h1>
            <p className="text-xl text-primary-foreground/80">
              Explore our collection of successful projects that have helped 
              businesses achieve their digital goals.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="section-padding">
        <div className="container-custom">
          {/* Category Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-wrap justify-center gap-3 mb-12"
          >
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeCategory === category
                    ? "bg-accent text-accent-foreground"
                    : "bg-secondary text-foreground hover:bg-accent/10"
                }`}
              >
                {category}
              </button>
            ))}
          </motion.div>

          {/* Projects Grid */}
          {isLoading ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Loading portfolio...</p>
            </div>
          ) : portfolio.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No projects available yet.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  layout
                  className="group cursor-pointer"
                  onClick={() => setSelectedProject(project)}
                >
                  <div className="relative overflow-hidden rounded-2xl aspect-[4/3] bg-secondary">
                    {project.image_url && (
                      <img
                        src={project.image_url}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        {project.category && (
                          <span className="text-accent text-sm font-medium">
                            {project.category}
                          </span>
                        )}
                        <h3 className="text-xl font-bold text-primary-foreground mt-1">
                          {project.title}
                        </h3>
                        <p className="text-primary-foreground/70 text-sm mt-2 line-clamp-2">
                          {project.description}
                        </p>
                      </div>
                      <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-accent flex items-center justify-center transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                        <ArrowUpRight className="w-5 h-5 text-accent-foreground" />
                      </div>
                    </div>
                  </div>
                  <div className="mt-4">
                    <h3 className="font-semibold text-foreground group-hover:text-accent transition-colors">
                      {project.title}
                    </h3>
                    {project.client && (
                      <p className="text-muted-foreground text-sm">{project.client}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-card rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                {selectedProject.image_url && (
                  <img
                    src={selectedProject.image_url}
                    alt={selectedProject.title}
                    className="w-full h-64 md:h-96 object-cover rounded-t-2xl"
                  />
                )}
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 w-10 h-10 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center transition-colors"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
              </div>
              <div className="p-8">
                {selectedProject.category && (
                  <span className="text-accent text-sm font-medium">{selectedProject.category}</span>
                )}
                <h2 className="text-3xl font-bold text-foreground mt-2 mb-4">
                  {selectedProject.title}
                </h2>
                {selectedProject.client && (
                  <p className="text-muted-foreground mb-6">Client: {selectedProject.client}</p>
                )}
                <p className="text-foreground leading-relaxed mb-6">
                  {selectedProject.description}
                </p>
                {selectedProject.technologies && (
                  <div className="mb-6">
                    <h3 className="font-semibold text-foreground mb-3">Technologies Used</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.technologies.split(',').map((tech: string, i: number) => (
                        <span
                          key={i}
                          className="px-3 py-1 bg-accent/10 text-accent rounded-full text-sm"
                        >
                          {tech.trim()}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {selectedProject.project_url && (
                  <a
                    href={selectedProject.project_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-accent hover:underline"
                  >
                    View Live Project <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CTA */}
      <section className="section-padding bg-secondary">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Want to See Your Project Here?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Let's create something amazing together. Start your project today.
            </p>
            <a href="/contact" className="btn-hero inline-flex">
              Start Your Project <ArrowUpRight className="w-5 h-5 ml-2" />
            </a>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Portfolio;
