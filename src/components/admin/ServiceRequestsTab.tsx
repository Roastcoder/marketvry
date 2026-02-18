import { useState } from "react";
import { motion } from "framer-motion";
import { Briefcase, Eye, Trash2, Check, Clock, Search, DollarSign, Calendar, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

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

interface ServiceRequestsTabProps {
  requests: ServiceRequest[];
  onRefresh: () => void;
  isLoading: boolean;
}

const statusColors: Record<string, string> = {
  pending: "bg-yellow-500/10 text-yellow-600",
  contacted: "bg-blue-500/10 text-blue-600",
  in_progress: "bg-accent/10 text-accent",
  completed: "bg-green-500/10 text-green-600",
  cancelled: "bg-destructive/10 text-destructive",
};

export const ServiceRequestsTab = ({
  requests,
  onRefresh,
  isLoading,
}: ServiceRequestsTabProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRequest, setSelectedRequest] = useState<ServiceRequest | null>(null);

  const filteredRequests = requests.filter(
    (r) =>
      r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.service_type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleUpdateStatus = async (id: string, status: string) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_URL}/admin/service-requests/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status, is_read: true }),
      });
      if (!res.ok) throw new Error("Failed to update");
      toast.success(`Status updated to ${status}`);
      onRefresh();
    } catch (error: any) {
      toast.error(error.message || "Failed to update");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this request?")) return;

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_URL}/admin/service-requests/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to delete");
      toast.success("Deleted successfully");
      setSelectedRequest(null);
      onRefresh();
    } catch (error: any) {
      toast.error(error.message || "Failed to delete");
    }
  };

  const pendingCount = requests.filter((r) => r.status === "pending").length;

  return (
    <div className="grid lg:grid-cols-3 gap-6">
      {/* List */}
      <div className="lg:col-span-1 bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-5 shadow-sm">
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-bold text-foreground flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-yellow-500/20 to-yellow-500/5 rounded-lg flex items-center justify-center">
              <Briefcase className="w-4 h-4 text-yellow-600" />
            </div>
            Requests
            {pendingCount > 0 && (
              <span className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white text-xs px-2.5 py-1 rounded-full font-semibold shadow-sm">
                {pendingCount} pending
              </span>
            )}
          </h3>
          <Button variant="ghost" size="sm" onClick={onRefresh} className="hover:bg-accent/10">
            Refresh
          </Button>
        </div>

        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search requests..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 h-10 rounded-xl border-border/50 focus:border-accent"
          />
        </div>

        <div className="space-y-2 max-h-[500px] overflow-y-auto pr-1">
          {isLoading ? (
            <p className="text-center text-muted-foreground py-8">Loading...</p>
          ) : filteredRequests.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">No requests</p>
          ) : (
            filteredRequests.map((request) => (
              <motion.div
                key={request.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                whileHover={{ scale: 1.02 }}
                className={`p-4 rounded-xl cursor-pointer transition-all duration-200 ${
                  selectedRequest?.id === request.id
                    ? "bg-gradient-to-r from-accent/15 to-accent/5 border-2 border-accent shadow-sm"
                    : request.status === "pending"
                    ? "bg-gradient-to-r from-yellow-500/10 to-yellow-500/5 border-l-4 border-l-yellow-500 hover:shadow-md"
                    : "bg-secondary/30 hover:bg-secondary/50 border border-transparent"
                }`}
                onClick={() => setSelectedRequest(request)}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0 flex-1">
                    <p className={`text-sm truncate ${request.status === "pending" ? "font-bold" : "font-medium"}`}>
                      {request.name}
                    </p>
                    <p className="text-xs text-muted-foreground truncate mt-0.5 capitalize">
                      {request.service_type.replace("-", " ")}
                    </p>
                  </div>
                  <span className={`text-xs px-2.5 py-1 rounded-full capitalize font-semibold ${statusColors[request.status] || "bg-secondary"}`}>
                    {request.status}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground/70 mt-2 flex items-center gap-1.5">
                  <Clock className="w-3 h-3" />
                  {new Date(request.created_at).toLocaleDateString()}
                </p>
              </motion.div>
            ))
          )}
        </div>
      </div>

      {/* Detail View */}
      <div className="lg:col-span-2 bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-6 shadow-sm">
        {selectedRequest ? (
          <motion.div
            key={selectedRequest.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-start justify-between mb-6 pb-6 border-b border-border/50">
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-1">
                  {selectedRequest.name}
                </h3>
                <p className="text-muted-foreground flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  {selectedRequest.email}
                </p>
                {selectedRequest.phone && (
                  <p className="text-muted-foreground flex items-center gap-2 mt-1">
                    📞 {selectedRequest.phone}
                  </p>
                )}
              </div>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => handleDelete(selectedRequest.id)}
                className="rounded-xl"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="bg-secondary/30 rounded-xl p-4">
                <p className="text-sm text-muted-foreground mb-1 font-medium">Service</p>
                <p className="font-semibold text-foreground capitalize">
                  {selectedRequest.service_type.replace("-", " ")}
                </p>
              </div>
              {selectedRequest.budget && (
                <div className="bg-secondary/30 rounded-xl p-4">
                  <p className="text-sm text-muted-foreground flex items-center gap-1 mb-1 font-medium">
                    <DollarSign className="w-3 h-3" /> Budget
                  </p>
                  <p className="font-semibold text-foreground">{selectedRequest.budget}</p>
                </div>
              )}
              {selectedRequest.timeline && (
                <div className="bg-secondary/30 rounded-xl p-4">
                  <p className="text-sm text-muted-foreground flex items-center gap-1 mb-1 font-medium">
                    <Calendar className="w-3 h-3" /> Timeline
                  </p>
                  <p className="font-semibold text-foreground">{selectedRequest.timeline}</p>
                </div>
              )}
              <div className="bg-secondary/30 rounded-xl p-4">
                <p className="text-sm text-muted-foreground mb-1 font-medium">Received</p>
                <p className="font-semibold text-foreground">
                  {new Date(selectedRequest.created_at).toLocaleString()}
                </p>
              </div>
            </div>

            {selectedRequest.description && (
              <div className="mb-6">
                <p className="text-sm text-muted-foreground mb-3 font-semibold">Description</p>
                <div className="bg-gradient-to-br from-secondary/50 to-secondary/30 rounded-xl p-5 border border-border/50">
                  <p className="whitespace-pre-wrap leading-relaxed">{selectedRequest.description}</p>
                </div>
              </div>
            )}

            <div className="border-t border-border/50 pt-6">
              <p className="text-sm text-muted-foreground mb-4 font-semibold">Update Status</p>
              <div className="flex flex-wrap gap-2">
                {["pending", "contacted", "in_progress", "completed", "cancelled"].map(
                  (status) => (
                    <Button
                      key={status}
                      variant={selectedRequest.status === status ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleUpdateStatus(selectedRequest.id, status)}
                      className="capitalize rounded-xl"
                    >
                      {status.replace("_", " ")}
                    </Button>
                  )
                )}
              </div>
            </div>
          </motion.div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center py-16">
            <div className="w-20 h-20 bg-gradient-to-br from-yellow-500/20 to-yellow-500/5 rounded-2xl flex items-center justify-center mb-6">
              <Briefcase className="w-10 h-10 text-yellow-600" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-2">
              Select a Request
            </h3>
            <p className="text-muted-foreground">
              Click on a request to view details
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
