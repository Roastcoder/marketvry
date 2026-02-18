import { useState, useEffect } from "react";
import { AdminLayout } from "@/components/admin/layout/AdminLayout";
import { ContactSubmissionsTab } from "@/components/admin/ContactSubmissionsTab";
import { toast } from "sonner";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

const AdminContacts = () => {
  const [contacts, setContacts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_URL}/admin/contacts`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to fetch contacts");
      const data = await res.json();
      setContacts(data);
    } catch (error: any) {
      toast.error("Failed to fetch contacts");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div>
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-accent to-accent/60 bg-clip-text text-transparent mb-2">
            Contact Messages
          </h1>
          <p className="text-sm text-muted-foreground">Manage and respond to customer inquiries</p>
        </div>
        <ContactSubmissionsTab
          submissions={contacts}
          onRefresh={fetchContacts}
          isLoading={isLoading}
        />
      </div>
    </AdminLayout>
  );
};

export default AdminContacts;
