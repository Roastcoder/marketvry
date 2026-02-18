import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  Users, 
  BarChart3, 
  FileText, 
  Settings, 
  Search,
  MoreVertical,
  Trash2,
  Edit,
  Shield,
  UserCircle,
  Mail,
  Briefcase,
  Bell
} from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { ContactSubmissionsTab } from "@/components/admin/ContactSubmissionsTab";
import { ServiceRequestsTab } from "@/components/admin/ServiceRequestsTab";

interface UserWithRole {
  id: string;
  email: string;
  full_name: string | null;
  phone: string | null;
  role: string;
  created_at: string;
}

interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  company: string | null;
  service: string | null;
  message: string;
  status: string;
  is_read: boolean;
  created_at: string;
}

interface ServiceRequest {
  id: string;
  user_id: string | null;
  name: string;
  email: string;
  phone: string | null;
  service_type: string;
  budget: string | null;
  timeline: string | null;
  description: string | null;
  status: string;
  is_read: boolean;
  created_at: string;
}

const Admin = () => {
  const { user, isAdmin, isLoading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [users, setUsers] = useState<UserWithRole[]>([]);
  const [contactSubmissions, setContactSubmissions] = useState<ContactSubmission[]>([]);
  const [serviceRequests, setServiceRequests] = useState<ServiceRequest[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isContactsLoading, setIsContactsLoading] = useState(true);
  const [isRequestsLoading, setIsRequestsLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !isAdmin) {
      toast.error("Access denied. Admin only.");
      setTimeout(() => navigate("/"), 0);
    }
  }, [isAdmin, authLoading, navigate]);

  useEffect(() => {
    if (isAdmin) {
      fetchUsers();
      fetchContactSubmissions();
      fetchServiceRequests();
    }
  }, [isAdmin]);

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_URL}/admin/users`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to fetch users");
      const data = await res.json();
      setUsers(data);
    } catch (error: any) {
      console.error("Error fetching users:", error);
      toast.error("Failed to fetch users");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchContactSubmissions = async () => {
    setIsContactsLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_URL}/admin/contacts`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to fetch contacts");
      const data = await res.json();
      setContactSubmissions(data);
    } catch (error: any) {
      console.error("Error fetching contacts:", error);
    } finally {
      setIsContactsLoading(false);
    }
  };

  const fetchServiceRequests = async () => {
    setIsRequestsLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_URL}/admin/service-requests`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to fetch requests");
      const data = await res.json();
      setServiceRequests(data);
    } catch (error: any) {
      console.error("Error fetching requests:", error);
    } finally {
      setIsRequestsLoading(false);
    }
  };

  const handleDeleteUser = async (userId: string) => {
    if (!confirm("Are you sure you want to delete this user?")) return;

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_URL}/admin/users/${userId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to delete user");
      toast.success("User deleted successfully");
      fetchUsers();
    } catch (error: any) {
      toast.error(error.message || "Failed to delete user");
    }
  };

  const handlePromoteToAdmin = async (userId: string) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_URL}/admin/users/${userId}/role`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ role: "admin" }),
      });
      if (!res.ok) throw new Error("Failed to promote user");
      toast.success("User promoted to admin");
      fetchUsers();
    } catch (error: any) {
      toast.error(error.message || "Failed to promote user");
    }
  };

  const filteredUsers = users.filter(
    (u) =>
      u.full_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.phone?.includes(searchQuery)
  );

  const unreadContacts = contactSubmissions.filter((c) => !c.is_read).length;
  const pendingRequests = serviceRequests.filter((r) => r.status === "pending").length;

  const stats = {
    totalUsers: users.length,
    admins: users.filter((u) => u.role === "admin").length,
    customers: users.filter((u) => u.role === "customer").length,
    newContacts: unreadContacts,
    pendingRequests: pendingRequests,
  };

  if (authLoading || !isAdmin) {
    return (
      <Layout>
        <div className="min-h-screen pt-24 pb-16 flex items-center justify-center">
          <p>Loading...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="min-h-screen pt-24 pb-16 bg-gradient-to-br from-secondary/20 via-background to-accent/5">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
              <div>
                <h1 className="text-4xl font-bold text-foreground bg-gradient-to-r from-accent to-accent/60 bg-clip-text text-transparent">
                  Admin Dashboard
                </h1>
                <p className="text-muted-foreground mt-1">
                  Manage users, content, and analytics
                </p>
              </div>
              <Button
                variant="outline"
                onClick={() => navigate("/profile")}
                className="w-fit hover:bg-accent/10 hover:border-accent transition-all"
              >
                <UserCircle className="w-4 h-4 mr-2" />
                My Profile
              </Button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-gradient-to-br from-card to-card/50 border border-border/50 rounded-2xl p-5 hover:shadow-lg hover:border-accent/30 transition-all duration-300 group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-accent/20 to-accent/5 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Users className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs font-medium">Total Users</p>
                    <p className="text-2xl font-bold text-foreground">{stats.totalUsers}</p>
                  </div>
                </div>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="bg-gradient-to-br from-card to-card/50 border border-border/50 rounded-2xl p-5 hover:shadow-lg hover:border-purple-500/30 transition-all duration-300 group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500/20 to-purple-500/5 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Shield className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs font-medium">Admins</p>
                    <p className="text-2xl font-bold text-foreground">{stats.admins}</p>
                  </div>
                </div>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-gradient-to-br from-card to-card/50 border border-border/50 rounded-2xl p-5 hover:shadow-lg hover:border-blue-500/30 transition-all duration-300 group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500/20 to-blue-500/5 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <UserCircle className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs font-medium">Customers</p>
                    <p className="text-2xl font-bold text-foreground">{stats.customers}</p>
                  </div>
                </div>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                className="bg-gradient-to-br from-card to-card/50 border border-border/50 rounded-2xl p-5 hover:shadow-lg hover:border-destructive/30 transition-all duration-300 group relative overflow-hidden"
              >
                {stats.newContacts > 0 && (
                  <div className="absolute top-0 right-0 w-20 h-20 bg-destructive/10 rounded-full blur-2xl" />
                )}
                <div className="flex items-center gap-3 relative">
                  <div className="w-12 h-12 bg-gradient-to-br from-destructive/20 to-destructive/5 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform relative">
                    <Mail className="w-6 h-6 text-destructive" />
                    {stats.newContacts > 0 && (
                      <span className="absolute -top-1 -right-1 w-5 h-5 bg-destructive text-destructive-foreground text-[10px] font-bold rounded-full flex items-center justify-center animate-pulse">
                        {stats.newContacts}
                      </span>
                    )}
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs font-medium">New Messages</p>
                    <p className="text-2xl font-bold text-foreground">{stats.newContacts}</p>
                  </div>
                </div>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-gradient-to-br from-card to-card/50 border border-border/50 rounded-2xl p-5 hover:shadow-lg hover:border-yellow-500/30 transition-all duration-300 group relative overflow-hidden"
              >
                {stats.pendingRequests > 0 && (
                  <div className="absolute top-0 right-0 w-20 h-20 bg-yellow-500/10 rounded-full blur-2xl" />
                )}
                <div className="flex items-center gap-3 relative">
                  <div className="w-12 h-12 bg-gradient-to-br from-yellow-500/20 to-yellow-500/5 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform relative">
                    <Briefcase className="w-6 h-6 text-yellow-600" />
                    {stats.pendingRequests > 0 && (
                      <span className="absolute -top-1 -right-1 w-5 h-5 bg-yellow-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-pulse">
                        {stats.pendingRequests}
                      </span>
                    )}
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs font-medium">Pending</p>
                    <p className="text-2xl font-bold text-foreground">{stats.pendingRequests}</p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Tabs */}
            <Tabs defaultValue="contacts" className="space-y-6">
              <TabsList className="bg-card/50 backdrop-blur-sm border border-border/50 flex-wrap h-auto gap-2 p-2 rounded-2xl shadow-sm">
                <TabsTrigger value="contacts" className="gap-2 relative rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-destructive/10 data-[state=active]:to-destructive/5 data-[state=active]:shadow-sm">
                  <Mail className="w-4 h-4" />
                  <span className="hidden sm:inline">Contacts</span>
                  {stats.newContacts > 0 && (
                    <span className="ml-1 bg-destructive text-destructive-foreground text-xs px-2 py-0.5 rounded-full font-semibold">
                      {stats.newContacts}
                    </span>
                  )}
                </TabsTrigger>
                <TabsTrigger value="requests" className="gap-2 relative rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-yellow-500/10 data-[state=active]:to-yellow-500/5 data-[state=active]:shadow-sm">
                  <Briefcase className="w-4 h-4" />
                  <span className="hidden sm:inline">Requests</span>
                  {stats.pendingRequests > 0 && (
                    <span className="ml-1 bg-yellow-500 text-white text-xs px-2 py-0.5 rounded-full font-semibold">
                      {stats.pendingRequests}
                    </span>
                  )}
                </TabsTrigger>
                <TabsTrigger value="users" className="gap-2 rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-accent/10 data-[state=active]:to-accent/5 data-[state=active]:shadow-sm">
                  <Users className="w-4 h-4" />
                  <span className="hidden sm:inline">Users</span>
                </TabsTrigger>
                <TabsTrigger value="analytics" className="gap-2 rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-accent/10 data-[state=active]:to-accent/5 data-[state=active]:shadow-sm">
                  <BarChart3 className="w-4 h-4" />
                  <span className="hidden sm:inline">Analytics</span>
                </TabsTrigger>
                <TabsTrigger value="settings" className="gap-2 rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-accent/10 data-[state=active]:to-accent/5 data-[state=active]:shadow-sm">
                  <Settings className="w-4 h-4" />
                  <span className="hidden sm:inline">Settings</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="contacts">
                <ContactSubmissionsTab
                  submissions={contactSubmissions}
                  onRefresh={fetchContactSubmissions}
                  isLoading={isContactsLoading}
                />
              </TabsContent>

              <TabsContent value="requests">
                <ServiceRequestsTab
                  requests={serviceRequests}
                  onRefresh={fetchServiceRequests}
                  isLoading={isRequestsLoading}
                />
              </TabsContent>

              <TabsContent value="users">
                <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-6 shadow-sm">
                  {/* Search */}
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-6">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input
                        type="text"
                        placeholder="Search users by name or phone..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 h-11 rounded-xl border-border/50 focus:border-accent"
                      />
                    </div>
                    <Button onClick={fetchUsers} variant="outline" className="rounded-xl hover:bg-accent/10 hover:border-accent">
                      Refresh
                    </Button>
                  </div>

                  {/* Users Table */}
                  <div className="overflow-x-auto rounded-xl border border-border/50">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-border/50 bg-secondary/30">
                          <th className="text-left py-4 px-4 text-sm font-semibold text-foreground">
                            Name
                          </th>
                          <th className="text-left py-4 px-4 text-sm font-semibold text-foreground">
                            Phone
                          </th>
                          <th className="text-left py-4 px-4 text-sm font-semibold text-foreground">
                            Role
                          </th>
                          <th className="text-left py-4 px-4 text-sm font-semibold text-foreground">
                            Joined
                          </th>
                          <th className="text-right py-4 px-4 text-sm font-semibold text-foreground">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {isLoading ? (
                          <tr>
                            <td colSpan={5} className="text-center py-8 text-muted-foreground">
                              Loading...
                            </td>
                          </tr>
                        ) : filteredUsers.length === 0 ? (
                          <tr>
                            <td colSpan={5} className="text-center py-8 text-muted-foreground">
                              No users found
                            </td>
                          </tr>
                        ) : (
                          filteredUsers.map((u) => (
                            <tr key={u.id} className="border-b border-border/50 hover:bg-accent/5 transition-colors">
                              <td className="py-4 px-4">
                                <div className="font-semibold text-foreground">
                                  {u.full_name || "Unnamed User"}
                                </div>
                              </td>
                              <td className="py-4 px-4 text-muted-foreground">
                                {u.phone || "-"}
                              </td>
                              <td className="py-4 px-4">
                                <span
                                  className={`px-3 py-1 text-xs font-semibold rounded-full ${
                                    u.role === "admin"
                                      ? "bg-gradient-to-r from-purple-500/20 to-purple-500/10 text-purple-600 border border-purple-500/20"
                                      : "bg-secondary/50 text-muted-foreground border border-border/50"
                                  }`}
                                >
                                  {u.role}
                                </span>
                              </td>
                              <td className="py-4 px-4 text-muted-foreground text-sm">
                                {new Date(u.created_at).toLocaleDateString()}
                              </td>
                              <td className="py-4 px-4 text-right">
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="sm">
                                      <MoreVertical className="w-4 h-4" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end" className="bg-card border border-border">
                                    <DropdownMenuItem
                                      onClick={() => navigate(`/profile/${u.id}`)}
                                      className="gap-2"
                                    >
                                      <Edit className="w-4 h-4" />
                                      Edit
                                    </DropdownMenuItem>
                                    {u.role !== "admin" && (
                                      <DropdownMenuItem
                                        onClick={() => handlePromoteToAdmin(u.id)}
                                        className="gap-2"
                                      >
                                        <Shield className="w-4 h-4" />
                                        Make Admin
                                      </DropdownMenuItem>
                                    )}
                                    <DropdownMenuItem
                                      onClick={() => handleDeleteUser(u.id)}
                                      className="gap-2 text-destructive"
                                    >
                                      <Trash2 className="w-4 h-4" />
                                      Delete
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="analytics">
                <div className="bg-gradient-to-br from-card/50 to-accent/5 backdrop-blur-sm border border-border/50 rounded-2xl p-12 text-center shadow-sm">
                  <div className="w-20 h-20 bg-gradient-to-br from-accent/20 to-accent/5 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <BarChart3 className="w-10 h-10 text-accent" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-3">
                    Analytics Coming Soon
                  </h3>
                  <p className="text-muted-foreground max-w-md mx-auto">
                    View user engagement, page views, conversion metrics, and detailed insights.
                  </p>
                </div>
              </TabsContent>


              <TabsContent value="settings">
                <div className="bg-gradient-to-br from-card/50 to-accent/5 backdrop-blur-sm border border-border/50 rounded-2xl p-12 text-center shadow-sm">
                  <div className="w-20 h-20 bg-gradient-to-br from-accent/20 to-accent/5 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Settings className="w-10 h-10 text-accent" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-3">
                    Settings Coming Soon
                  </h3>
                  <p className="text-muted-foreground max-w-md mx-auto">
                    Configure site settings, integrations, notifications, and more.
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Admin;
