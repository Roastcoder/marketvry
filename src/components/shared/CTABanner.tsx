import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

interface CTABannerProps {
  title: string;
  description: string;
  buttonText?: string;
  buttonLink?: string;
  variant?: "navy" | "accent" | "gradient" | "secondary";
}

export const CTABanner = ({
  title,
  description,
  buttonText = "Get in Touch",
  buttonLink = "/contact",
  variant = "navy",
}: CTABannerProps) => {
  const variantClasses = {
    navy: "bg-white",
    accent: "bg-white",
    gradient: "bg-white",
    secondary: "bg-white",
  };

  return (
    <section className={`section-padding ${variantClasses[variant]}`}>
      <div className="container-custom text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            {title}
          </h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto text-lg">
            {description}
          </p>
          <Link to={buttonLink} className="btn-hero inline-flex">
            {buttonText} <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};
