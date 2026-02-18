import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Users, Mail, Briefcase, Shield, UserCircle } from "lucide-react";
import { AdminLayout } from "@/components/admin/layout/AdminLayout";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    admins: 0,
    customers: 0,
    newContacts: 0,
    pendingRequests: 0,
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem("token");
      const [usersRes, contactsRes, requestsRes] = await Promise.all([
        fetch(`${API_URL}/admin/users`, { headers: { Authorization: `Bearer ${token}` } }),
        fetch(`${API_URL}/admin/contacts`, { headers: { Authorization: `Bearer ${token}` } }),
        fetch(`${API_URL}/admin/service-requests`, { headers: { Authorization: `Bearer ${token}` } }),
      ]);

      const users = await usersRes.json();
      const contacts = await contactsRes.json();
      const requests = await requestsRes.json();

      setStats({
        totalUsers: users.length,
        admins: users.filter((u: any) => u.role === "admin").length,
        customers: users.filter((u: any) => u.role === "customer").length,
        newContacts: contacts.filter((c: any) => !c.is_read).length,
        pendingRequests: requests.filter((r: any) => r.status === "pending").length,
      });
    } catch (error) {
      console.error("Failed to fetch stats:", error);
    }
  };

  const statCards = [
    { icon: Users, label: "Total Users", value: stats.totalUsers, color: "accent", bgColor: "from-accent/20 to-accent/5" },
    { icon: Shield, label: "Admins", value: stats.admins, color: "purple-600", bgColor: "from-purple-500/20 to-purple-500/5" },
    { icon: UserCircle, label: "Customers", value: stats.customers, color: "blue-600", bgColor: "from-blue-500/20 to-blue-500/5" },
    { icon: Mail, label: "New Messages", value: stats.newContacts, color: "destructive", bgColor: "from-destructive/20 to-destructive/5" },
    { icon: Briefcase, label: "Pending", value: stats.pendingRequests, color: "yellow-600", bgColor: "from-yellow-500/20 to-yellow-500/5" },
  ];

  return (
    <AdminLayout>
      <div>
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-accent to-accent/60 bg-clip-text text-transparent mb-2">
            Dashboard Overview
          </h1>
          <p className="text-sm text-muted-foreground">Monitor your platform's key metrics</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-6">
          {statCards.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-4 sm:p-6 hover:shadow-lg hover:border-accent/30 transition-all group"
            >
              <div className="flex items-center gap-3 sm:gap-4">
                <div className={`w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br ${stat.bgColor} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform flex-shrink-0`}>
                  <stat.icon className={`w-6 h-6 sm:w-7 sm:h-7 text-${stat.color}`} />
                </div>
                <div className="min-w-0">
                  <p className="text-xs sm:text-sm text-muted-foreground font-medium truncate">{stat.label}</p>
                  <p className="text-2xl sm:text-3xl font-bold text-foreground">{stat.value}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
