import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { ArrowRight, Check, Palette, PenTool, Layout as LayoutIcon, Eye, Sparkles, Layers } from "lucide-react";
import { ServiceFAQ } from "@/components/ServiceFAQ";
import brandingImg from "@/assets/services/branding.jpg";

const faqs = [
  {
    question: "What's included in a complete brand identity package?",
    answer: "Our complete brand identity package includes logo design (with variations), color palette, typography guidelines, brand voice, visual elements, and a comprehensive brand guidelines document."
  },
  {
    question: "How long does a branding project take?",
    answer: "A full branding project typically takes 4-6 weeks. This includes discovery, concept development, revisions, and final delivery. Logo-only projects can be completed in 2-3 weeks."
  },
  {
    question: "How many logo concepts do you provide?",
    answer: "We typically provide 3 initial logo concepts based on our discovery session. After you select a direction, we refine it with 2-3 rounds of revisions to perfect the final design."
  },
  {
    question: "Do you provide brand guidelines documentation?",
    answer: "Yes! Every branding project includes a comprehensive brand guidelines document that ensures consistent application of your brand across all touchpoints."
  },
  {
    question: "Can you help refresh an existing brand?",
    answer: "Absolutely! We offer brand refresh services that modernize your existing identity while maintaining brand recognition. We'll identify what's working and what needs updating."
  },
];

const features = [
  {
    icon: Sparkles,
    title: "Brand Strategy",
    description: "Define your brand's positioning, voice, and values to stand out in the market.",
  },
  {
    icon: PenTool,
    title: "Logo Design",
    description: "Memorable logos that capture your brand essence and leave lasting impressions.",
  },
  {
    icon: Palette,
    title: "Visual Identity",
    description: "Complete visual systems including colors, typography, and imagery guidelines.",
  },
  {
    icon: LayoutIcon,
    title: "UI Design",
    description: "Beautiful, intuitive interfaces that delight users and drive engagement.",
  },
  {
    icon: Eye,
    title: "UX Design",
    description: "User-centered experiences that make complex tasks feel simple.",
  },
  {
    icon: Layers,
    title: "Design Systems",
    description: "Scalable component libraries for consistent brand experiences.",
  },
];

const benefits = [
  "Stand out from competitors",
  "Build brand recognition and trust",
  "Create emotional connections with customers",
  "Improve user engagement and satisfaction",
  "Ensure consistency across all touchpoints",
  "Increase conversion rates through better UX",
];

const Branding = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <img src={brandingImg} alt="Branding & UI/UX" className="w-full h-full object-cover" />
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
              Branding & UI/UX
            </h1>
            <p className="text-xl text-primary-foreground/80 mb-8">
              Create memorable brand identities and intuitive user experiences 
              that captivate audiences and drive business growth.
            </p>
            <Link to="/request?service=branding" className="btn-hero inline-flex">
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
              Our Design Services
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              From brand strategy to pixel-perfect interfaces, we create designs that inspire.
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

      {/* Benefits */}
      <section className="section-padding bg-secondary">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Why Great Design Matters
              </h2>
              <p className="text-muted-foreground text-lg mb-8">
                In today's competitive landscape, exceptional design is not a luxury – 
                it's a necessity for business success.
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
              <img src={brandingImg} alt="Branding" className="rounded-2xl shadow-lg" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <ServiceFAQ 
        faqs={faqs}
        title="Branding & UI/UX FAQs"
        subtitle="Common questions about our branding and design services."
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
              Ready to Transform Your Brand?
            </h2>
            <p className="text-primary-foreground/70 mb-8 max-w-xl mx-auto">
              Let's create a brand identity and user experience that sets you apart.
            </p>
            <Link to="/request?service=branding" className="btn-hero inline-flex">
              Get Started <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Branding;
