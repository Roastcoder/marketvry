import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { ArrowRight, Check, Target, BarChart3, Users, Zap, Mail, MousePointer } from "lucide-react";
import { ServiceFAQ } from "@/components/ServiceFAQ";
import digitalMarketingImg from "@/assets/services/digital-marketing.jpg";

const faqs = [
  {
    question: "How long does it take to see results from digital marketing?",
    answer: "Results vary depending on the strategy. PPC campaigns can show results within days, while SEO and content marketing typically take 3-6 months to show significant improvements. We provide monthly reports to track progress."
  },
  {
    question: "What's your minimum budget for digital marketing campaigns?",
    answer: "We work with businesses of all sizes. Our minimum retainer starts at $2,000/month, but we customize packages based on your goals and budget. We'll help you allocate your budget for maximum ROI."
  },
  {
    question: "Do you provide reports on campaign performance?",
    answer: "Yes! We provide detailed monthly reports including key metrics, insights, and recommendations. You'll also have access to a real-time dashboard to monitor your campaigns."
  },
  {
    question: "Can you help with both B2B and B2C marketing?",
    answer: "Absolutely! Our team has extensive experience in both B2B and B2C marketing across various industries. We tailor our strategies to match your target audience and business model."
  },
  {
    question: "What makes your digital marketing different from other agencies?",
    answer: "We focus on data-driven strategies with transparent reporting. Our team stays updated with the latest trends, and we prioritize ROI over vanity metrics. Plus, you get a dedicated account manager."
  },
];

const features = [
  {
    icon: Target,
    title: "Google Ads Management",
    description: "Strategic Google Ads campaigns that maximize ROI and drive qualified traffic.",
  },
  {
    icon: Users,
    title: "Meta Ads (Facebook & Instagram)",
    description: "Targeted social media advertising on Facebook and Instagram platforms.",
  },
  {
    icon: Zap,
    title: "Performance Marketing",
    description: "Multi-channel performance campaigns across Google, Facebook, and Instagram.",
  },
  {
    icon: MousePointer,
    title: "E-commerce Marketing",
    description: "Specialized marketing strategies for online stores and e-commerce businesses.",
  },
  {
    icon: BarChart3,
    title: "Search Engine Optimization (SEO)",
    description: "Improve organic rankings and drive sustainable long-term traffic.",
  },
  {
    icon: Users,
    title: "Social Media Optimization (SMO)",
    description: "Optimize your social media presence for maximum engagement and reach.",
  },
  {
    icon: Target,
    title: "YouTube Marketing",
    description: "Video marketing strategies and YouTube advertising campaigns.",
  },
  {
    icon: Mail,
    title: "Google My Business (GMB)",
    description: "Optimize your GMB profile for local search visibility and customer engagement.",
  },
];

const benefits = [
  "Increase qualified leads by up to 300%",
  "Reduce cost per acquisition",
  "Improve brand visibility and awareness",
  "Drive measurable ROI on every campaign",
  "Scale your marketing efforts efficiently",
  "Get detailed analytics and insights",
];

const process = [
  { step: "01", title: "Audit & Analysis", desc: "Deep dive into your current marketing efforts and competitive landscape." },
  { step: "02", title: "Strategy Development", desc: "Custom marketing strategy aligned with your business goals." },
  { step: "03", title: "Campaign Execution", desc: "Launch and manage campaigns across multiple channels." },
  { step: "04", title: "Optimize & Scale", desc: "Continuous optimization based on data and performance." },
];

const DigitalMarketing = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <img src={digitalMarketingImg} alt="Digital Marketing" className="w-full h-full object-cover" />
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
              Digital Marketing
            </h1>
            <p className="text-xl text-primary-foreground/80 mb-8">
              Data-driven digital marketing strategies that amplify your brand, 
              engage your audience, and deliver measurable business results.
            </p>
            <Link to="/request?service=digital-marketing" className="btn-hero inline-flex">
              Request This Service <ArrowRight className="w-5 h-5 ml-2" />
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
              Our Digital Marketing Services
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Comprehensive marketing solutions designed to grow your business online.
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

      {/* Benefits Section */}
      <section className="section-padding bg-secondary">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Why Choose Our Digital Marketing?
              </h2>
              <p className="text-muted-foreground text-lg mb-8">
                We don't just run campaigns – we build marketing engines that 
                drive sustainable growth for your business.
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
                src={digitalMarketingImg}
                alt="Digital Marketing Results"
                className="rounded-2xl shadow-lg"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="section-padding">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Our Process
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A proven methodology that delivers consistent results.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8">
            {process.map((item, index) => (
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

      {/* FAQ Section */}
      <ServiceFAQ 
        faqs={faqs}
        title="Digital Marketing FAQs"
        subtitle="Common questions about our digital marketing services."
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
              Ready to Grow Your Business?
            </h2>
            <p className="text-primary-foreground/70 mb-8 max-w-xl mx-auto">
              Let's discuss how our digital marketing services can drive more leads and sales for your business.
            </p>
            <Link to="/request?service=digital-marketing" className="btn-hero inline-flex">
              Request This Service <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default DigitalMarketing;
