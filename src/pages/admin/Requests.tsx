import { useState, useEffect } from "react";
import { AdminLayout } from "@/components/admin/layout/AdminLayout";
import { ServiceRequestsTab } from "@/components/admin/ServiceRequestsTab";
import { toast } from "sonner";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

const AdminRequests = () => {
  const [requests, setRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_URL}/admin/service-requests`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to fetch requests");
      const data = await res.json();
      setRequests(data);
    } catch (error: any) {
      toast.error("Failed to fetch requests");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div>
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-accent to-accent/60 bg-clip-text text-transparent mb-2">
            Service Requests
          </h1>
          <p className="text-sm text-muted-foreground">Review and manage service inquiries</p>
        </div>
        <ServiceRequestsTab
          requests={requests}
          onRefresh={fetchRequests}
          isLoading={isLoading}
        />
      </div>
    </AdminLayout>
  );
};

export default AdminRequests;
