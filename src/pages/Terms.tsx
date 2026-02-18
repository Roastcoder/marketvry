import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";

const Terms = () => {
  return (
    <Layout>
      <section className="bg-navy pt-32 pb-20">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6">
              Terms of Service
            </h1>
            <p className="text-xl text-primary-foreground/80">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom max-w-4xl">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-2xl font-bold text-foreground mb-4">1. Acceptance of Terms</h2>
            <p className="text-muted-foreground mb-6">
              By accessing and using Marketvry's services, you accept and agree to be bound by the terms and provision of this agreement.
            </p>

            <h2 className="text-2xl font-bold text-foreground mb-4">2. Services</h2>
            <p className="text-muted-foreground mb-6">
              Marketvry provides digital marketing, web development, and related services. We reserve the right to modify or discontinue services at any time without notice.
            </p>

            <h2 className="text-2xl font-bold text-foreground mb-4">3. User Responsibilities</h2>
            <p className="text-muted-foreground mb-6">
              You agree to provide accurate information, maintain the security of your account, and comply with all applicable laws and regulations.
            </p>

            <h2 className="text-2xl font-bold text-foreground mb-4">4. Payment Terms</h2>
            <p className="text-muted-foreground mb-6">
              Payment terms will be specified in individual service agreements. All fees are non-refundable unless otherwise stated in writing.
            </p>

            <h2 className="text-2xl font-bold text-foreground mb-4">5. Intellectual Property</h2>
            <p className="text-muted-foreground mb-6">
              All content, trademarks, and intellectual property on our website and in our services remain the property of Marketvry unless otherwise specified.
            </p>

            <h2 className="text-2xl font-bold text-foreground mb-4">6. Limitation of Liability</h2>
            <p className="text-muted-foreground mb-6">
              Marketvry shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of our services.
            </p>

            <h2 className="text-2xl font-bold text-foreground mb-4">7. Contact</h2>
            <p className="text-muted-foreground">
              For questions about these Terms of Service, contact us at support@marketvry.com
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Terms;
