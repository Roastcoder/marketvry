import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

import digitalMarketingImg from "@/assets/services/digital-marketing.jpg";
import webDevelopmentImg from "@/assets/services/web-development.jpg";
import brandingImg from "@/assets/services/branding.jpg";
import seoImg from "@/assets/services/seo.jpg";
import socialMediaImg from "@/assets/services/social-media.jpg";
import analyticsImg from "@/assets/services/analytics.jpg";

const services = [
  {
    title: "Digital Marketing",
    description: "Data-driven campaigns that maximize ROI and drive qualified traffic to your business.",
    path: "/services/digital-marketing",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
  },
  {
    title: "Web Development",
    description: "Custom websites and web applications built with cutting-edge technologies.",
    path: "/services/web-development",
    image: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=800&h=600&fit=crop",
  },
  {
    title: "WhatsApp Marketing",
    description: "Reach customers instantly with WhatsApp's 98% open rate and AI automation.",
    path: "/services/whatsapp-marketing",
    image: "https://images.unsplash.com/photo-1611746872915-64382b5c76da?w=800&h=600&fit=crop",
  },
  {
    title: "SEO Services",
    description: "Boost your visibility and rank higher with our proven SEO strategies.",
    path: "/services/seo",
    image: "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=800&h=600&fit=crop",
  },
  {
    title: "Bulk Messaging",
    description: "Mass communication via SMS, Email, and Voice Call campaigns.",
    path: "/services/bulk-messaging",
    image: "https://images.unsplash.com/photo-1596526131083-e8c633c948d2?w=800&h=600&fit=crop",
  },
  {
    title: "AI Agent Services",
    description: "Intelligent AI agents that automate support and qualify leads 24/7.",
    path: "/services/ai-agent",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop",
  },
];

export const ServicesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="section-padding bg-secondary">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-16 px-2"
        >
          <span className="text-accent font-semibold tracking-wide uppercase text-xs sm:text-sm">
            What We Offer
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-3 sm:mt-4 mb-4 sm:mb-6">
            Services That Drive Results
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-base sm:text-lg">
            From strategy to execution, we provide comprehensive digital solutions 
            tailored to your unique business goals.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link to={service.path}>
                <div className="group bg-card rounded-2xl overflow-hidden h-full card-hover border border-border hover:border-accent/30">
                  {/* Image */}
                  <div className="relative h-40 sm:h-48 overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  
                  {/* Content */}
                  <div className="p-4 sm:p-6">
                    <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-accent transition-colors">
                      {service.title}
                    </h3>
                    
                    <p className="text-muted-foreground mb-4">
                      {service.description}
                    </p>
                    
                    <div className="flex items-center text-accent font-medium">
                      Learn More
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
