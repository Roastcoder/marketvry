import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { ArrowRight, Check, MessageSquare, Mail, Phone, Database, Shield, Zap } from "lucide-react";
import { ServiceFAQ } from "@/components/ServiceFAQ";

const faqs = [
  {
    question: "What is DLT and why do I need it?",
    answer: "DLT (Distributed Ledger Technology) is mandatory for commercial SMS in India. It involves registering your brand name and message templates with telecom operators. We handle the entire DLT registration process for you."
  },
  {
    question: "What's the difference between SIM-based and API-based SMS?",
    answer: "SIM-based SMS uses physical SIM cards for sending messages, ideal for promotional campaigns. API-based SMS integrates directly with your systems for transactional messages like OTPs and alerts."
  },
  {
    question: "Can you provide targeted databases for marketing?",
    answer: "Yes, we offer verified and segmented databases based on industry, location, demographics, and interests. All databases comply with data privacy regulations."
  },
  {
    question: "What is DTMF in voice calls?",
    answer: "DTMF (Dual-Tone Multi-Frequency) allows recipients to interact with voice calls by pressing numbers on their keypad. Perfect for surveys, feedback collection, and interactive campaigns."
  },
];

const features = [
  {
    icon: Shield,
    title: "DLT Registration",
    description: "Complete brand name registration and template approval with all major telecom operators.",
  },
  {
    icon: MessageSquare,
    title: "SIM-Based SMS",
    description: "High-volume promotional SMS campaigns with multiple SIM support and delivery tracking.",
  },
  {
    icon: Mail,
    title: "Bulk Email Marketing",
    description: "Professional email campaigns with templates, scheduling, and detailed analytics.",
  },
  {
    icon: Database,
    title: "Database Marketing",
    description: "Verified contact databases segmented by industry, location, and demographics.",
  },
  {
    icon: Phone,
    title: "Bulk Voice Calls",
    description: "Automated voice call campaigns with pre-recorded messages and DTMF support.",
  },
  {
    icon: Zap,
    title: "DTMF Services",
    description: "Interactive voice response for surveys, polls, and customer feedback collection.",
  },
];

const benefits = [
  "Reach thousands of customers instantly",
  "Cost-effective mass communication",
  "Real-time delivery reports and analytics",
  "Personalized messaging at scale",
  "Multi-channel campaign management",
  "Compliance with telecom regulations",
];

const BulkMessaging = () => {
  return (
    <Layout>
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1596526131083-e8c633c948d2?w=1920&h=1080&fit=crop" 
            alt="Bulk Messaging" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/90 to-primary/85" />
        </div>
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <span className="text-accent font-semibold tracking-wide uppercase text-sm">
              Messaging & Bulk Services
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mt-4 mb-6">
              Bulk Messaging Services
            </h1>
            <p className="text-xl text-white/90 mb-8">
              Reach thousands of customers instantly with SMS, Email, and Voice Call campaigns.
            </p>
            <Link to="/request?service=bulk-messaging" className="btn-hero inline-flex">
              Get Started <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Complete Bulk Communication Suite
            </h2>
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

      <section className="section-padding bg-secondary">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Why Choose Our Bulk Messaging?
              </h2>
              <p className="text-muted-foreground text-lg mb-8">
                Reliable, compliant, and cost-effective bulk communication solutions for businesses of all sizes.
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
              className="relative"
            >
              <img
                src="https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&h=600&fit=crop"
                alt="Bulk Messaging"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 bg-accent text-white p-4 sm:p-6 rounded-2xl shadow-xl">
                <div className="text-4xl font-bold">1000+</div>
                <div className="text-sm">Messages/Min</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <ServiceFAQ 
        faqs={faqs}
        title="Bulk Messaging FAQs"
        subtitle="Common questions about our bulk messaging services."
      />

      <section className="section-padding bg-navy">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-6">
              Ready to Launch Your Campaign?
            </h2>
            <Link to="/request?service=bulk-messaging" className="btn-hero inline-flex">
              Request a Quote <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default BulkMessaging;
