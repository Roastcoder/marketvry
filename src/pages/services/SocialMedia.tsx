import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { ArrowRight, Check, Instagram, Facebook, Twitter, Linkedin, Video, Users } from "lucide-react";
import { ServiceFAQ } from "@/components/ServiceFAQ";
import socialMediaImg from "@/assets/services/social-media.jpg";

const faqs = [
  {
    question: "Which social media platforms should my business be on?",
    answer: "It depends on your target audience and industry. We analyze where your customers spend time and recommend the platforms with the best ROI potential. Quality over quantity is key."
  },
  {
    question: "How often should we post on social media?",
    answer: "Posting frequency varies by platform. Generally, 1-2 posts per day on Facebook/Instagram, 3-5 on Twitter, and 2-3 per week on LinkedIn works well. We create a custom content calendar based on your goals."
  },
  {
    question: "Do you create content or do we need to provide it?",
    answer: "We handle everything! Our team creates engaging graphics, writes compelling copy, and can even produce video content. You just approve and we post. We can also repurpose your existing content."
  },
  {
    question: "How do you measure social media ROI?",
    answer: "We track engagement rates, follower growth, website traffic from social, leads generated, and conversions. Monthly reports show exactly how social media contributes to your business goals."
  },
  {
    question: "Can you help with influencer marketing?",
    answer: "Yes! We identify and vet influencers in your niche, manage outreach and negotiations, coordinate campaigns, and track results. We focus on authentic partnerships that resonate with your audience."
  },
];

const features = [
  {
    icon: Users,
    title: "Social Strategy",
    description: "Custom social media strategies aligned with your business goals.",
  },
  {
    icon: Video,
    title: "Content Creation",
    description: "Engaging posts, stories, and videos that captivate your audience.",
  },
  {
    icon: Instagram,
    title: "Instagram Marketing",
    description: "Build a stunning Instagram presence that drives engagement.",
  },
  {
    icon: Facebook,
    title: "Facebook Advertising",
    description: "Targeted ad campaigns that reach your ideal customers.",
  },
  {
    icon: Linkedin,
    title: "LinkedIn Marketing",
    description: "B2B social strategies that generate leads and build authority.",
  },
  {
    icon: Twitter,
    title: "Community Management",
    description: "Build and nurture an engaged community around your brand.",
  },
];

const platforms = [
  "Instagram", "Facebook", "LinkedIn", "Twitter/X", "TikTok", "YouTube", "Pinterest"
];

const benefits = [
  "Build brand awareness and recognition",
  "Engage directly with your audience",
  "Drive website traffic and leads",
  "Increase customer loyalty",
  "Stay ahead of competitors",
  "Generate measurable ROI",
];

const SocialMedia = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <img src={socialMediaImg} alt="Social Media Marketing" className="w-full h-full object-cover" />
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
              Social Media Marketing
            </h1>
            <p className="text-xl text-primary-foreground/80 mb-8">
              Build a powerful social media presence that engages your audience, 
              builds community, and drives real business results.
            </p>
            <Link to="/request?service=social-media" className="btn-hero inline-flex">
              Get Started <ArrowRight className="w-5 h-5 ml-2" />
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
              Our Social Media Services
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              End-to-end social media management to grow your brand online.
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

      {/* Platforms */}
      <section className="section-padding bg-secondary">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Platforms We Manage
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We help you succeed on all major social media platforms.
            </p>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-4">
            {platforms.map((platform, index) => (
              <motion.span
                key={platform}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="px-6 py-3 bg-card border border-border rounded-full text-foreground font-medium"
              >
                {platform}
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
                Why Social Media Matters
              </h2>
              <p className="text-muted-foreground text-lg mb-8">
                Social media is where your customers spend their time. 
                Meet them where they are and build lasting relationships.
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
              <img src={socialMediaImg} alt="Social Media" className="rounded-2xl shadow-lg" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <ServiceFAQ 
        faqs={faqs}
        title="Social Media FAQs"
        subtitle="Common questions about our social media marketing services."
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
              Ready to Go Viral?
            </h2>
            <p className="text-primary-foreground/70 mb-8 max-w-xl mx-auto">
              Let's create a social media strategy that grows your audience and drives results.
            </p>
            <Link to="/request?service=social-media" className="btn-hero inline-flex">
              Get Started <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default SocialMedia;
