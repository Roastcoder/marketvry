import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { ArrowRight, Check, MessageCircle, Bot, Phone, Zap, Users, Shield } from "lucide-react";
import { ServiceFAQ } from "@/components/ServiceFAQ";

const faqs = [
  {
    question: "What's the difference between Official and Unofficial WhatsApp API?",
    answer: "Official WhatsApp API is approved by Meta, offers better deliverability and compliance, but has higher costs. Unofficial software is cost-effective for bulk messaging but has limitations on message volume and features."
  },
  {
    question: "Can I send bulk messages without getting banned?",
    answer: "Yes, with our Official WhatsApp API service, you can send bulk messages safely. We ensure compliance with WhatsApp's policies and implement proper opt-in mechanisms to prevent account suspension."
  },
  {
    question: "How does AI WhatsApp Automation work?",
    answer: "Our AI automation uses natural language processing to understand customer queries and respond automatically. It can handle FAQs, booking confirmations, order updates, and more, 24/7 without human intervention."
  },
  {
    question: "What is a WhatsApp Virtual Number?",
    answer: "A virtual number is a dedicated WhatsApp Business number that's not tied to a physical SIM card. It allows multiple team members to manage conversations and provides better scalability for your business."
  },
];

const features = [
  {
    icon: Shield,
    title: "Official WhatsApp API",
    description: "Meta-verified API service with high deliverability, green tick verification, and enterprise-grade reliability.",
  },
  {
    icon: MessageCircle,
    title: "Unofficial WhatsApp Software",
    description: "Cost-effective bulk messaging solution for small to medium businesses with flexible pricing.",
  },
  {
    icon: Phone,
    title: "WhatsApp Virtual Number",
    description: "Dedicated business number with multi-user access, cloud-based management, and seamless integration.",
  },
  {
    icon: Bot,
    title: "AI WhatsApp Automation",
    description: "Intelligent chatbot that handles customer queries, bookings, and support automatically 24/7.",
  },
  {
    icon: Zap,
    title: "AI Video Sending",
    description: "Automated personalized video messages at scale for enhanced customer engagement and conversions.",
  },
  {
    icon: Users,
    title: "Broadcast & Campaigns",
    description: "Targeted messaging campaigns with rich media support, templates, and detailed analytics.",
  },
];

const benefits = [
  "98% message open rate within 3 minutes",
  "Direct communication with customers",
  "Automated responses save time and resources",
  "Rich media support (images, videos, documents)",
  "Real-time delivery and read receipts",
  "Cost-effective compared to SMS",
];

const WhatsAppMarketing = () => {
  return (
    <Layout>
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1611746872915-64382b5c76da?w=1920&h=1080&fit=crop" 
            alt="WhatsApp Marketing" 
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
              WhatsApp Marketing Solutions
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mt-4 mb-6">
              WhatsApp Marketing Services
            </h1>
            <p className="text-xl text-white/90 mb-8">
              Reach your customers instantly with WhatsApp's 98% open rate. Official API, AI automation, and bulk messaging solutions.
            </p>
            <Link to="/request?service=whatsapp-marketing" className="btn-hero inline-flex">
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
              Complete WhatsApp Marketing Suite
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
                Why WhatsApp Marketing?
              </h2>
              <p className="text-muted-foreground text-lg mb-8">
                WhatsApp is the most effective channel for customer engagement with unmatched open rates and instant delivery.
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
                src="https://images.unsplash.com/photo-1611746872915-64382b5c76da?w=800&h=600&fit=crop"
                alt="WhatsApp Business"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 bg-accent text-white p-4 sm:p-6 rounded-2xl shadow-xl">
                <div className="text-4xl font-bold">98%</div>
                <div className="text-sm">Open Rate</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <ServiceFAQ 
        faqs={faqs}
        title="WhatsApp Marketing FAQs"
        subtitle="Common questions about our WhatsApp marketing services."
      />

      <section className="section-padding bg-navy">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-6">
              Ready to Start WhatsApp Marketing?
            </h2>
            <Link to="/request?service=whatsapp-marketing" className="btn-hero inline-flex">
              Request a Demo <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default WhatsAppMarketing;
