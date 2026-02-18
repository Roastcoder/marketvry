import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { ArrowRight, Check, Search, FileText, Link2, MapPin, BarChart3, Settings } from "lucide-react";
import { ServiceFAQ } from "@/components/ServiceFAQ";
import seoImg from "@/assets/services/seo.jpg";

const faqs = [
  {
    question: "How long does SEO take to show results?",
    answer: "SEO is a long-term strategy. You may see initial improvements in 3-4 months, but significant results typically appear within 6-12 months. The timeline depends on competition, current site health, and target keywords."
  },
  {
    question: "What's the difference between on-page and off-page SEO?",
    answer: "On-page SEO involves optimizing your website's content and structure (titles, meta descriptions, headers, content). Off-page SEO focuses on external factors like backlinks, social signals, and brand mentions."
  },
  {
    question: "Do you guarantee first page rankings?",
    answer: "We don't guarantee specific rankings as search algorithms constantly change. However, we guarantee our proven strategies, transparent reporting, and dedication to improving your organic visibility."
  },
  {
    question: "How do you measure SEO success?",
    answer: "We track multiple metrics including organic traffic, keyword rankings, click-through rates, conversions, and ROI. Monthly reports show progress across all these key performance indicators."
  },
  {
    question: "Is local SEO different from regular SEO?",
    answer: "Yes! Local SEO focuses on optimizing for location-based searches, Google Business Profile, local citations, and reviews. It's essential for businesses serving specific geographic areas."
  },
];

const features = [
  {
    icon: Settings,
    title: "Technical SEO",
    description: "Optimize site speed, structure, and crawlability for search engines.",
  },
  {
    icon: FileText,
    title: "On-Page SEO",
    description: "Content optimization, meta tags, and keyword strategy for rankings.",
  },
  {
    icon: Link2,
    title: "Link Building",
    description: "Quality backlink strategies to boost domain authority.",
  },
  {
    icon: MapPin,
    title: "Local SEO",
    description: "Dominate local search results and Google Maps listings.",
  },
  {
    icon: Search,
    title: "Keyword Research",
    description: "Identify high-value keywords that drive qualified traffic.",
  },
  {
    icon: BarChart3,
    title: "SEO Analytics",
    description: "Track rankings, traffic, and ROI with detailed reporting.",
  },
];

const benefits = [
  "Increase organic traffic by up to 200%",
  "Rank higher for competitive keywords",
  "Build long-term sustainable growth",
  "Reduce dependency on paid advertising",
  "Improve website user experience",
  "Generate qualified leads 24/7",
];

const SEO = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <img src={seoImg} alt="SEO Services" className="w-full h-full object-cover" />
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
              SEO Services
            </h1>
            <p className="text-xl text-primary-foreground/80 mb-8">
              Boost your search visibility and drive organic traffic with our 
              proven SEO strategies that deliver long-term results.
            </p>
            <Link to="/request?service=seo" className="btn-hero inline-flex">
              Get a Free SEO Audit <ArrowRight className="w-5 h-5 ml-2" />
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
              Our SEO Services
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Comprehensive SEO solutions to help you rank higher and attract more customers.
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
                Why Invest in SEO?
              </h2>
              <p className="text-muted-foreground text-lg mb-8">
                SEO is one of the most cost-effective marketing strategies with 
                compounding returns over time.
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
              <img src={seoImg} alt="SEO Results" className="rounded-2xl shadow-lg" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <ServiceFAQ 
        faqs={faqs}
        title="SEO FAQs"
        subtitle="Common questions about our SEO services."
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
              Ready to Rank Higher?
            </h2>
            <p className="text-primary-foreground/70 mb-8 max-w-xl mx-auto">
              Get a free SEO audit and discover opportunities to grow your organic traffic.
            </p>
            <Link to="/request?service=seo" className="btn-hero inline-flex">
              Get Free SEO Audit <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default SEO;
