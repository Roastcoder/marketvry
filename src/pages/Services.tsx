import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { ArrowRight, Check } from "lucide-react";
import { CTABanner } from "@/components/shared/CTABanner";

import digitalMarketingImg from "@/assets/services/digital-marketing.jpg";
import webDevelopmentImg from "@/assets/services/web-development.jpg";
import brandingImg from "@/assets/services/branding.jpg";
import seoImg from "@/assets/services/seo.jpg";
import socialMediaImg from "@/assets/services/social-media.jpg";
import analyticsImg from "@/assets/services/analytics.jpg";

const services = [
  {
    title: "Digital Marketing",
    slug: "digital-marketing",
    description: "Data-driven campaigns that maximize ROI and drive qualified traffic to your business.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
    features: [
      "Google Ads Management",
      "Meta Ads (Facebook & Instagram)",
      "Performance Marketing",
      "E-commerce Marketing",
      "YouTube Marketing",
    ],
  },
  {
    title: "Web Development",
    slug: "web-development",
    description: "Custom websites and web applications built with cutting-edge technologies.",
    image: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=800&h=600&fit=crop",
    features: [
      "React & PHP Development",
      "Shopify & WordPress Sites",
      "Static & Dynamic Websites",
      "Landing Page Design",
      "Website Maintenance",
    ],
  },
  {
    title: "SEO Services",
    slug: "seo",
    description: "Boost your visibility and rank higher with our proven SEO strategies.",
    image: "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=800&h=600&fit=crop",
    features: [
      "Search Engine Optimization",
      "Social Media Optimization",
      "Google My Business Optimization",
      "Local SEO",
      "Technical SEO Audit",
    ],
  },
  {
    title: "WhatsApp Marketing",
    slug: "whatsapp-marketing",
    description: "Reach customers instantly with WhatsApp's 98% open rate and AI-powered automation.",
    image: "https://images.unsplash.com/photo-1611746872915-64382b5c76da?w=800&h=600&fit=crop",
    features: [
      "Official WhatsApp API Service",
      "Unofficial WhatsApp Software",
      "WhatsApp Virtual Number",
      "AI WhatsApp Automation",
      "AI Video Sending",
    ],
  },
  {
    title: "Bulk Messaging Services",
    slug: "bulk-messaging",
    description: "Mass communication solutions including SMS, Email, and Voice Call campaigns.",
    image: "https://images.unsplash.com/photo-1596526131083-e8c633c948d2?w=800&h=600&fit=crop",
    features: [
      "DLT Brand Registration",
      "SIM-Based SMS",
      "Bulk Email Marketing",
      "Database Marketing",
      "Bulk Voice Call DTMF",
    ],
  },
  {
    title: "AI Agent Services",
    slug: "ai-agent",
    description: "Intelligent AI agents that automate customer support, lead qualification, and tasks 24/7.",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop",
    features: [
      "Intelligent Chatbots",
      "24/7 Customer Support",
      "Lead Qualification",
      "Task Automation",
      "Multi-Channel Deployment",
    ],
  },
  {
    title: "Social Media",
    slug: "social-media",
    description: "Engage your audience and build community across all platforms.",
    image: "https://images.unsplash.com/photo-1611926653458-09294b3142bf?w=800&h=600&fit=crop",
    features: [
      "Social Media Strategy",
      "Content Creation",
      "Community Management",
      "Influencer Marketing",
      "Social Media Advertising",
    ],
  },
  {
    title: "Branding & UI/UX",
    slug: "branding",
    description: "Memorable brand identities and intuitive user experiences that captivate.",
    image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800&h=600&fit=crop",
    features: [
      "Brand Strategy & Identity",
      "Logo Design",
      "UI/UX Design",
      "Design Systems",
      "Graphic Design",
    ],
  },
];

const Services = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=1920&h=1080&fit=crop" 
            alt="Services" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy/95 via-navy/90 to-navy/85" />
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
              Comprehensive Digital Solutions
            </h1>
            <p className="text-xl text-primary-foreground/80">
              From strategy to execution, we provide end-to-end digital services 
              tailored to your business needs.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="space-y-24">
            {services.map((service, index) => (
              <motion.div
                key={service.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={`grid lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? "" : ""
                }`}
              >
                {/* Image */}
                <div className={`${index % 2 === 1 ? "lg:order-2" : ""}`}>
                  <div className="relative overflow-hidden rounded-2xl aspect-[4/3] group">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent" />
                  </div>
                </div>

                {/* Content */}
                <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                  <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                    {service.title}
                  </h2>
                  <p className="text-muted-foreground text-lg mb-6">
                    {service.description}
                  </p>
                  <ul className="space-y-3 mb-8">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                          <Check className="w-4 h-4 text-accent" />
                        </div>
                        <span className="text-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    to={`/services/${service.slug}`}
                    className="btn-hero inline-flex"
                  >
                    Learn More <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="section-padding bg-secondary">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-accent font-semibold tracking-wide uppercase text-sm">
              Our Process
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-4">
              How We Work
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Discovery", desc: "Understanding your goals and challenges" },
              { step: "02", title: "Strategy", desc: "Crafting a tailored approach" },
              { step: "03", title: "Execution", desc: "Bringing the strategy to life" },
              { step: "04", title: "Optimization", desc: "Continuous improvement and scaling" },
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-5xl font-bold text-accent/20 mb-4">{item.step}</div>
                <h3 className="text-xl font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTABanner
        title="Ready to Get Started?"
        description="Let's discuss your project and create a strategy that drives real results."
        buttonText="Request a Quote"
        variant="accent"
      />
    </Layout>
  );
};

export default Services;
