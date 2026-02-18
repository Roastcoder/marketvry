import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, Users, Briefcase, FolderOpen, User, X, Target, Code, Search, MessageCircle, Mail, Bot, Share2, Palette } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { name: "Home", path: "/", icon: Home },
  { name: "About", path: "/about", icon: Users },
  { name: "Services", path: "/services", icon: Briefcase },
  { name: "Portfolio", path: "/portfolio", icon: FolderOpen },
];

const serviceItems = [
  { name: "Digital Marketing", path: "/services/digital-marketing", icon: Target, color: "bg-orange-500/10 text-orange-600" },
  { name: "Web Development", path: "/services/web-development", icon: Code, color: "bg-blue-500/10 text-blue-600" },
  { name: "SEO Services", path: "/services/seo", icon: Search, color: "bg-purple-500/10 text-purple-600" },
  { name: "WhatsApp Marketing", path: "/services/whatsapp-marketing", icon: MessageCircle, color: "bg-green-500/10 text-green-600" },
  { name: "Bulk Messaging", path: "/services/bulk-messaging", icon: Mail, color: "bg-indigo-500/10 text-indigo-600" },
  { name: "AI Agent Services", path: "/services/ai-agent", icon: Bot, color: "bg-violet-500/10 text-violet-600" },
  { name: "Social Media", path: "/services/social-media", icon: Share2, color: "bg-pink-500/10 text-pink-600" },
  { name: "Branding & UI/UX", path: "/services/branding", icon: Palette, color: "bg-cyan-500/10 text-cyan-600" },
];

export const MobileBottomNav = () => {
  const location = useLocation();
  const { user } = useAuth();
  const [showServices, setShowServices] = useState(false);

  const handleServiceClick = (e: React.MouseEvent) => {
    if (location.pathname === "/services") {
      return;
    }
    e.preventDefault();
    setShowServices(true);
  };

  const allItems = [
    ...navItems,
    { 
      name: user ? "Profile" : "Login", 
      path: user ? "/profile" : "/login", 
      icon: User 
    },
  ];

  return (
    <>
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-t border-border lg:hidden">
        <div className="flex items-center justify-around py-2 px-2 safe-area-pb">
          {allItems.map((item) => {
            const isActive = location.pathname === item.path || 
              (item.path !== "/" && location.pathname.startsWith(item.path));
            
            return (
              <Link
                key={item.name}
                to={item.path}
                onClick={item.name === "Services" ? handleServiceClick : undefined}
                className={`flex flex-col items-center justify-center py-2 px-3 rounded-lg transition-all duration-200 min-w-[60px] ${
                  isActive
                    ? "text-accent bg-accent/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                }`}
              >
                <item.icon className={`w-5 h-5 ${isActive ? "text-accent" : ""}`} />
                <span className={`text-[10px] mt-1 font-medium ${isActive ? "text-accent" : ""}`}>
                  {item.name}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>

      <AnimatePresence>
        {showServices && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowServices(false)}
              className="fixed inset-0 bg-black/50 z-[60] lg:hidden"
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed bottom-0 left-0 right-0 z-[70] bg-background rounded-t-3xl shadow-2xl lg:hidden max-h-[80vh] overflow-hidden"
            >
              <div className="p-6 pb-24">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-foreground">Our Services</h3>
                  <button
                    onClick={() => setShowServices(false)}
                    className="p-2 hover:bg-secondary rounded-full transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-3 overflow-y-auto max-h-[60vh]">
                  {serviceItems.map((service, index) => (
                    <motion.div
                      key={service.path}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Link
                        to={service.path}
                        onClick={() => setShowServices(false)}
                        className="flex flex-col items-center justify-center p-4 bg-card hover:bg-accent/10 rounded-2xl border border-border transition-all h-full min-h-[100px]"
                      >
                        <div className={`w-12 h-12 rounded-xl ${service.color} flex items-center justify-center mb-2`}>
                          <service.icon className="w-6 h-6" />
                        </div>
                        <span className="font-medium text-foreground text-center text-sm">{service.name}</span>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
