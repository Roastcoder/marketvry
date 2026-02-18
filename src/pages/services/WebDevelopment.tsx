import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { ArrowRight, Check, Code, Smartphone, ShoppingCart, Database, Globe, Layers } from "lucide-react";
import { ServiceFAQ } from "@/components/ServiceFAQ";
import { ServiceRequestForm } from "@/components/ServiceRequestForm";
import webDevelopmentImg from "@/assets/services/web-development.jpg";

const faqs = [
  {
    question: "How long does it take to build a website?",
    answer: "A typical website takes 4-8 weeks depending on complexity. Simple landing pages can be done in 2 weeks, while complex web applications may take 3-6 months. We'll provide a detailed timeline during our initial consultation."
  },
  {
    question: "Do you provide website maintenance and support?",
    answer: "Yes! We offer various maintenance packages including security updates, content updates, performance optimization, and 24/7 support. We ensure your website stays secure and up-to-date."
  },
  {
    question: "Will my website be mobile-friendly?",
    answer: "Absolutely! All our websites are built with a mobile-first approach, ensuring they look and work perfectly on all devices - smartphones, tablets, and desktops."
  },
  {
    question: "Can you redesign my existing website?",
    answer: "Yes, we specialize in website redesigns. We'll analyze your current site, identify areas for improvement, and create a modern design that better serves your business goals."
  },
  {
    question: "Do you provide SEO optimization with web development?",
    answer: "Yes, SEO best practices are built into every website we create. This includes proper structure, fast loading speeds, meta tags, and schema markup. We also offer comprehensive SEO services."
  },
];

const features = [
  {
    icon: Globe,
    title: "Custom Websites",
    description: "Bespoke website designs tailored to your brand and business objectives.",
  },
  {
    icon: ShoppingCart,
    title: "E-Commerce Solutions",
    description: "Powerful online stores with seamless checkout and inventory management.",
  },
  {
    icon: Code,
    title: "Web Applications",
    description: "Complex web apps built with modern frameworks and best practices.",
  },
  {
    icon: Smartphone,
    title: "Responsive Design",
    description: "Websites that look and work perfectly on all devices and screen sizes.",
  },
  {
    icon: Database,
    title: "CMS Development",
    description: "Easy-to-manage content systems that put you in control.",
  },
  {
    icon: Layers,
    title: "API Integration",
    description: "Seamless connections with third-party services and platforms.",
  },
];

const technologies = [
  "React", "Next.js", "TypeScript", "Node.js", "Python", "PostgreSQL", 
  "MongoDB", "AWS", "Tailwind CSS", "GraphQL"
];

const benefits = [
  "Lightning-fast page load speeds",
  "SEO-optimized architecture",
  "Secure and scalable infrastructure",
  "Mobile-first responsive design",
  "Easy content management",
  "Ongoing support and maintenance",
];

const WebDevelopment = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <img src={webDevelopmentImg} alt="Web Development" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/95 to-primary/80" />
        </div>
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <span className="text-accent font-semibold tracking-wide uppercase text-sm">
              Our Services
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mt-4 mb-6">
              Web Development
            </h1>
            <p className="text-xl text-primary-foreground/80 mb-8">
              Custom websites and web applications built with cutting-edge 
              technologies for performance, scalability, and exceptional user experience.
            </p>
            <Link to="/request?service=web-development" className="btn-hero inline-flex">
              Start Your Project <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="section-padding">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Our Development Services
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              From simple websites to complex applications, we build digital products that perform.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-card border border-border rounded-2xl p-6 card-hover"
              >
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technologies */}
      <section className="section-padding bg-secondary">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Technologies We Use
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We work with the latest and most reliable technologies to build your project.
            </p>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-4">
            {technologies.map((tech, index) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="px-6 py-3 bg-card border border-border rounded-full text-foreground font-medium"
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Why Choose Our Development?
              </h2>
              <p className="text-muted-foreground text-lg mb-8">
                We build websites that not only look great but also perform 
                exceptionally well and drive business results.
              </p>
              <ul className="space-y-4">
                {benefits.map((benefit, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <Check className="w-4 h-4 text-accent" />
                    </div>
                    <span className="text-foreground">{benefit}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <img src={webDevelopmentImg} alt="Web Development" className="rounded-2xl shadow-lg" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Service Request Form */}
      <section className="section-padding bg-secondary">
        <div className="container-custom max-w-2xl">
          <ServiceRequestForm 
            serviceType="web-development" 
            serviceName="Web Development" 
          />
        </div>
      </section>

      {/* FAQ Section */}
      <ServiceFAQ 
        faqs={faqs}
        title="Web Development FAQs"
        subtitle="Common questions about our web development services."
      />

      {/* CTA */}
      <section className="section-padding bg-navy">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-6">
              Ready to Build Something Amazing?
            </h2>
            <p className="text-primary-foreground/70 mb-8 max-w-xl mx-auto">
              Let's discuss your project and create a website that exceeds your expectations.
            </p>
            <Link to="/request?service=web-development" className="btn-hero inline-flex">
              Get a Free Quote <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default WebDevelopment;
