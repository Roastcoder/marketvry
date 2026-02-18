import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ScrollToTop } from "@/components/ScrollToTop";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import About from "./pages/About";
import Services from "./pages/Services";
import Portfolio from "./pages/Portfolio";
import Blog from "./pages/Blog";
import BlogArticle from "./pages/BlogArticle";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import Admin from "./pages/Admin";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminContacts from "./pages/admin/Contacts";
import AdminRequests from "./pages/admin/Requests";
import AdminUsers from "./pages/admin/Users";
import AdminBlogs from "./pages/admin/Blogs";
import AdminPortfolio from "./pages/admin/Portfolio";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import Careers from "./pages/Careers";
import DigitalMarketing from "./pages/services/DigitalMarketing";
import WebDevelopment from "./pages/services/WebDevelopment";
import Branding from "./pages/services/Branding";
import SEO from "./pages/services/SEO";
import SocialMedia from "./pages/services/SocialMedia";
import WhatsAppMarketing from "./pages/services/WhatsAppMarketing";
import BulkMessaging from "./pages/services/BulkMessaging";
import AIAgent from "./pages/services/AIAgent";
import NotFound from "./pages/NotFound";
import RequestService from "./pages/RequestService";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/digital-marketing" element={<DigitalMarketing />} />
            <Route path="/services/web-development" element={<WebDevelopment />} />
            <Route path="/services/branding" element={<Branding />} />
            <Route path="/services/seo" element={<SEO />} />
            <Route path="/services/social-media" element={<SocialMedia />} />
            <Route path="/services/whatsapp-marketing" element={<WhatsAppMarketing />} />
            <Route path="/services/bulk-messaging" element={<BulkMessaging />} />
            <Route path="/services/ai-agent" element={<AIAgent />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<BlogArticle />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/request" element={<RequestService />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/contacts" element={<AdminContacts />} />
            <Route path="/admin/requests" element={<AdminRequests />} />
            <Route path="/admin/users" element={<AdminUsers />} />
            <Route path="/admin/blogs" element={<AdminBlogs />} />
            <Route path="/admin/portfolio" element={<AdminPortfolio />} />
            <Route path="/admin/analytics" element={<Admin />} />
            <Route path="/admin/settings" element={<Admin />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/careers" element={<Careers />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
