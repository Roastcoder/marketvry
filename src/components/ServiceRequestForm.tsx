import { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

interface ServiceRequestFormProps {
  serviceType: string;
  serviceName: string;
}

export const ServiceRequestForm = ({ serviceType, serviceName }: ServiceRequestFormProps) => {
  const { user, profile } = useAuth();
  const [formData, setFormData] = useState({
    name: profile?.full_name || "",
    email: user?.email || "",
    phone: profile?.phone || "",
    budget: "",
    timeline: "",
    description: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch(`${API_URL}/service-requests`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: user?.id || null,
          name: formData.name,
          email: formData.email,
          phone: formData.phone || null,
          service_type: serviceType,
          budget: formData.budget || null,
          timeline: formData.timeline || null,
          description: formData.description || null,
        }),
      });

      if (!res.ok) throw new Error("Failed to submit request");

      setIsSubmitted(true);
      toast.success("Request submitted! We'll contact you soon.");
    } catch (error: any) {
      toast.error(error.message || "Failed to submit request");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-card border border-border rounded-2xl p-8 text-center"
      >
        <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-8 h-8 text-accent" />
        </div>
        <h3 className="text-2xl font-bold text-foreground mb-2">Request Submitted!</h3>
        <p className="text-muted-foreground mb-6">
          Thank you for your interest in our {serviceName} services. Our team will review your request and contact you within 24 hours.
        </p>
        <Button variant="outline" onClick={() => setIsSubmitted(false)}>
          Submit Another Request
        </Button>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-card border border-border rounded-2xl p-8"
    >
      <h3 className="text-2xl font-bold text-foreground mb-2">
        Request {serviceName} Service
      </h3>
      <p className="text-muted-foreground mb-6">
        Fill out the form below and we'll get back to you within 24 hours.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Full Name *
            </label>
            <Input
              type="text"
              placeholder="John Doe"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              className="h-11 rounded-xl"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Email *
            </label>
            <Input
              type="email"
              placeholder="john@example.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              className="h-11 rounded-xl"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Phone
            </label>
            <Input
              type="tel"
              placeholder="+1 234 567 890"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="h-11 rounded-xl"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Budget Range
            </label>
            <select
              value={formData.budget}
              onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
              className="w-full h-11 rounded-xl border border-input bg-background px-4 text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
            >
              <option value="">Select budget</option>
              <option value="under-4l">Under ₹4,00,000</option>
              <option value="4l-8l">₹4,00,000 - ₹8,00,000</option>
              <option value="8l-20l">₹8,00,000 - ₹20,00,000</option>
              <option value="20l-40l">₹20,00,000 - ₹40,00,000</option>
              <option value="40l+">₹40,00,000+</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Timeline
          </label>
          <select
            value={formData.timeline}
            onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
            className="w-full h-11 rounded-xl border border-input bg-background px-4 text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
          >
            <option value="">Select timeline</option>
            <option value="asap">ASAP</option>
            <option value="1-2-weeks">1-2 Weeks</option>
            <option value="1-month">Within a Month</option>
            <option value="2-3-months">2-3 Months</option>
            <option value="flexible">Flexible</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Project Details
          </label>
          <Textarea
            placeholder="Tell us about your project, goals, and any specific requirements..."
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="min-h-[120px] rounded-xl resize-none"
          />
        </div>

        <Button type="submit" disabled={isSubmitting} className="btn-hero w-full">
          {isSubmitting ? "Submitting..." : "Submit Request"}
          <Send className="w-4 h-4 ml-2" />
        </Button>
      </form>
    </motion.div>
  );
};
