import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, Users, Briefcase, FolderOpen, User, X, Target, Code, Search, MessageCircle, Mail, Bot, Share2, Palette, ArrowUpRight } from "lucide-react";
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
      <nav className="fixed inset-x-0 bottom-0 z-[90] rounded-t-2xl bg-background/95 backdrop-blur-md border-t border-border shadow-lg lg:hidden overflow-hidden">
        <div className="flex items-center justify-between gap-1 p-2">
          {allItems.map((item) => {
            const isActive = location.pathname === item.path || 
              (item.path !== "/" && location.pathname.startsWith(item.path));
            
            return (
              <Link
                key={item.name}
                to={item.path}
                onClick={item.name === "Services" ? handleServiceClick : undefined}
                className={`flex flex-1 min-w-0 flex-col items-center justify-center rounded-lg px-1 py-2 transition-all duration-200 ${
                  isActive
                    ? "text-accent bg-accent/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                }`}
              >
                <item.icon className={`w-5 h-5 ${isActive ? "text-accent" : ""}`} />
                <span className={`mt-1 max-w-full truncate px-1 text-[10px] font-medium ${isActive ? "text-accent" : ""}`}>
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
              className="fixed inset-0 bg-black/55 backdrop-blur-[2px] z-[60] lg:hidden"
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed inset-x-2 bottom-2 z-[70] bg-background rounded-3xl border border-border shadow-2xl lg:hidden max-h-[82vh] overflow-hidden"
            >
              <div className="p-4 sm:p-5 pb-24">
                <div className="w-10 h-1 rounded-full bg-border mx-auto mb-4" />
                <div className="flex items-start justify-between mb-5">
                  <div>
                    <h3 className="text-xl font-bold text-foreground">Our Services</h3>
                    <p className="text-sm text-muted-foreground mt-0.5">Choose a service to continue</p>
                  </div>
                  <button
                    onClick={() => setShowServices(false)}
                    className="p-2 hover:bg-secondary rounded-full transition-colors"
                    aria-label="Close services popup"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-3 overflow-y-auto max-h-[62vh] pr-1">
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
                        className="group flex flex-col items-center justify-center p-3 sm:p-4 bg-card hover:bg-accent/10 rounded-2xl border border-border transition-all h-full min-h-[108px] hover:border-accent/30"
                      >
                        <div className={`w-11 h-11 sm:w-12 sm:h-12 rounded-xl ${service.color} flex items-center justify-center mb-2`}>
                          <service.icon className="w-5 h-5 sm:w-6 sm:h-6" />
                        </div>
                        <span className="font-medium text-foreground text-center text-xs sm:text-sm leading-tight">{service.name}</span>
                        <ArrowUpRight className="w-3.5 h-3.5 mt-1 text-muted-foreground group-hover:text-accent transition-colors" />
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
