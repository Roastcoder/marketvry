import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { ArrowRight, Check, Bot, Brain, MessageSquare, Clock, Sparkles, TrendingUp } from "lucide-react";
import { ServiceFAQ } from "@/components/ServiceFAQ";

const faqs = [
  {
    question: "What can AI agents do for my business?",
    answer: "AI agents can handle customer support, lead qualification, appointment scheduling, data analysis, content generation, and automate repetitive tasks 24/7 without human intervention."
  },
  {
    question: "How long does it take to implement an AI agent?",
    answer: "Implementation typically takes 2-4 weeks depending on complexity. This includes training the AI on your data, integration with your systems, and testing."
  },
  {
    question: "Can AI agents integrate with my existing tools?",
    answer: "Yes! Our AI agents integrate with CRM systems, messaging platforms, email, databases, and most business tools through APIs."
  },
  {
    question: "What makes your AI agents different?",
    answer: "Our AI agents use advanced natural language processing, learn from interactions, and are customized specifically for your business needs and industry."
  },
];

const features = [
  {
    icon: Bot,
    title: "Intelligent Chatbots",
    description: "AI-powered conversational agents that understand context and provide human-like responses.",
  },
  {
    icon: Brain,
    title: "Machine Learning",
    description: "Self-improving AI that learns from every interaction to provide better responses over time.",
  },
  {
    icon: MessageSquare,
    title: "Multi-Channel Support",
    description: "Deploy AI agents across website, WhatsApp, email, and social media platforms.",
  },
  {
    icon: Clock,
    title: "24/7 Availability",
    description: "Round-the-clock customer support and lead engagement without human intervention.",
  },
  {
    icon: Sparkles,
    title: "Task Automation",
    description: "Automate repetitive tasks like data entry, scheduling, and follow-ups.",
  },
  {
    icon: TrendingUp,
    title: "Analytics & Insights",
    description: "Detailed reports on customer interactions, sentiment analysis, and performance metrics.",
  },
];

const benefits = [
  "Reduce customer support costs by up to 70%",
  "Handle unlimited conversations simultaneously",
  "Instant response time improves satisfaction",
  "Qualify leads automatically before human handoff",
  "Scale customer service without hiring",
  "Consistent brand voice across all interactions",
];

const AIAgent = () => {
  return (
    <Layout>
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1920&h=1080&fit=crop" 
            alt="AI Agent" 
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
              AI Agent Services
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mt-4 mb-6">
              Intelligent AI Agents
            </h1>
            <p className="text-xl text-white/90 mb-8">
              Transform your business with AI-powered automation. Intelligent agents that work 24/7 to support customers, qualify leads, and automate tasks.
            </p>
            <Link to="/request?service=ai-agent" className="btn-hero inline-flex">
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
              AI Agent Capabilities
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Powerful AI solutions that transform how you interact with customers and manage operations.
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

      <section className="section-padding bg-secondary">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Why AI Agents?
              </h2>
              <p className="text-muted-foreground text-lg mb-8">
                AI agents provide instant, intelligent responses while reducing costs and improving customer satisfaction.
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
                src="https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=800&h=600&fit=crop"
                alt="AI Chatbot"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -right-6 bg-accent text-white p-6 rounded-2xl shadow-xl">
                <div className="text-4xl font-bold">24/7</div>
                <div className="text-sm">AI Support</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <ServiceFAQ 
        faqs={faqs}
        title="AI Agent FAQs"
        subtitle="Common questions about our AI agent services."
      />

      <section className="section-padding bg-navy">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-6">
              Ready to Deploy AI Agents?
            </h2>
            <p className="text-primary-foreground/70 mb-8 max-w-xl mx-auto">
              Transform your business with intelligent automation. Let's discuss your AI agent needs.
            </p>
            <Link to="/request?service=ai-agent" className="btn-hero inline-flex">
              Schedule Consultation <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default AIAgent;
