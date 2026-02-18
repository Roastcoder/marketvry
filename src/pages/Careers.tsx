import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { ArrowRight, Briefcase, Users, TrendingUp, Heart } from "lucide-react";

const benefits = [
  { icon: Briefcase, title: "Flexible Work", desc: "Remote-friendly with flexible hours" },
  { icon: Users, title: "Great Team", desc: "Work with talented professionals" },
  { icon: TrendingUp, title: "Growth", desc: "Career development opportunities" },
  { icon: Heart, title: "Work-Life Balance", desc: "We value your well-being" },
];

const Careers = () => {
  return (
    <Layout>
      <section className="bg-navy pt-32 pb-20">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <span className="text-accent font-semibold tracking-wide uppercase text-sm">
              Join Our Team
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mt-4 mb-6">
              Build Your Career at Marketvry
            </h1>
            <p className="text-xl text-primary-foreground/80">
              Join a team of passionate professionals dedicated to transforming businesses through digital innovation.
            </p>
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
              Why Work With Us?
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-card border border-border rounded-2xl p-6 text-center"
              >
                <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mx-auto mb-4">
                  <benefit.icon className="w-7 h-7 text-accent" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{benefit.title}</h3>
                <p className="text-muted-foreground text-sm">{benefit.desc}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-secondary rounded-2xl p-12 text-center"
          >
            <h3 className="text-2xl font-bold text-foreground mb-4">
              No Open Positions Right Now
            </h3>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              We're not currently hiring, but we're always interested in meeting talented people. 
              Send us your resume and we'll keep you in mind for future opportunities.
            </p>
            <Link to="/contact" className="btn-hero inline-flex">
              Get in Touch <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Careers;
