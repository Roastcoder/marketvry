import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Eye, Trash2, Check, Clock, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

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

interface ContactSubmissionsTabProps {
  submissions: ContactSubmission[];
  onRefresh: () => void;
  isLoading: boolean;
}

export const ContactSubmissionsTab = ({
  submissions,
  onRefresh,
  isLoading,
}: ContactSubmissionsTabProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSubmission, setSelectedSubmission] = useState<ContactSubmission | null>(null);

  const filteredSubmissions = submissions.filter(
    (s) =>
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.message.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleMarkAsRead = async (id: string) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_URL}/admin/contacts/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ is_read: true, status: "read" }),
      });
      if (!res.ok) throw new Error("Failed to update");
      toast.success("Marked as read");
      onRefresh();
    } catch (error: any) {
      toast.error(error.message || "Failed to update");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this submission?")) return;

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_URL}/admin/contacts/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to delete");
      toast.success("Deleted successfully");
      setSelectedSubmission(null);
      onRefresh();
    } catch (error: any) {
      toast.error(error.message || "Failed to delete");
    }
  };

  const unreadCount = submissions.filter((s) => !s.is_read).length;

  return (
    <div className="grid lg:grid-cols-3 gap-6">
      {/* List */}
      <div className="lg:col-span-1 bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-5 shadow-sm">
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-bold text-foreground flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-destructive/20 to-destructive/5 rounded-lg flex items-center justify-center">
              <Mail className="w-4 h-4 text-destructive" />
            </div>
            Messages
            {unreadCount > 0 && (
              <span className="bg-gradient-to-r from-destructive to-destructive/80 text-destructive-foreground text-xs px-2.5 py-1 rounded-full font-semibold shadow-sm">
                {unreadCount} new
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
            placeholder="Search messages..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 h-10 rounded-xl border-border/50 focus:border-accent"
          />
        </div>

        <div className="space-y-2 max-h-[500px] overflow-y-auto pr-1">
          {isLoading ? (
            <p className="text-center text-muted-foreground py-8">Loading...</p>
          ) : filteredSubmissions.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">No messages</p>
          ) : (
            filteredSubmissions.map((submission) => (
              <motion.div
                key={submission.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                whileHover={{ scale: 1.02 }}
                className={`p-4 rounded-xl cursor-pointer transition-all duration-200 ${
                  selectedSubmission?.id === submission.id
                    ? "bg-gradient-to-r from-accent/15 to-accent/5 border-2 border-accent shadow-sm"
                    : submission.is_read
                    ? "bg-secondary/30 hover:bg-secondary/50 border border-transparent"
                    : "bg-gradient-to-r from-destructive/10 to-destructive/5 border-l-4 border-l-destructive hover:shadow-md"
                }`}
                onClick={() => setSelectedSubmission(submission)}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0 flex-1">
                    <p className={`text-sm truncate ${!submission.is_read ? "font-bold" : "font-medium"}`}>
                      {submission.name}
                    </p>
                    <p className="text-xs text-muted-foreground truncate mt-0.5">
                      {submission.email}
                    </p>
                  </div>
                  {!submission.is_read && (
                    <span className="w-2.5 h-2.5 bg-destructive rounded-full flex-shrink-0 mt-1.5 animate-pulse shadow-sm" />
                  )}
                </div>
                <p className="text-xs text-muted-foreground mt-2 line-clamp-2 leading-relaxed">
                  {submission.message}
                </p>
                <p className="text-xs text-muted-foreground/70 mt-2 flex items-center gap-1.5">
                  <Clock className="w-3 h-3" />
                  {new Date(submission.created_at).toLocaleDateString()}
                </p>
              </motion.div>
            ))
          )}
        </div>
      </div>

      {/* Detail View */}
      <div className="lg:col-span-2 bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-6 shadow-sm">
        {selectedSubmission ? (
          <motion.div
            key={selectedSubmission.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-start justify-between mb-6 pb-6 border-b border-border/50">
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-1">
                  {selectedSubmission.name}
                </h3>
                <p className="text-muted-foreground flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  {selectedSubmission.email}
                </p>
              </div>
              <div className="flex gap-2">
                {!selectedSubmission.is_read && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleMarkAsRead(selectedSubmission.id)}
                    className="rounded-xl hover:bg-green-500/10 hover:border-green-500 hover:text-green-600"
                  >
                    <Check className="w-4 h-4 mr-1" />
                    Mark Read
                  </Button>
                )}
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(selectedSubmission.id)}
                  className="rounded-xl"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-6">
              {selectedSubmission.company && (
                <div className="bg-secondary/30 rounded-xl p-4">
                  <p className="text-sm text-muted-foreground mb-1 font-medium">Company</p>
                  <p className="font-semibold text-foreground">{selectedSubmission.company}</p>
                </div>
              )}
              {selectedSubmission.service && (
                <div className="bg-secondary/30 rounded-xl p-4">
                  <p className="text-sm text-muted-foreground mb-1 font-medium">Service</p>
                  <p className="font-semibold text-foreground capitalize">
                    {selectedSubmission.service.replace("-", " ")}
                  </p>
                </div>
              )}
              <div className="bg-secondary/30 rounded-xl p-4">
                <p className="text-sm text-muted-foreground mb-1 font-medium">Received</p>
                <p className="font-semibold text-foreground">
                  {new Date(selectedSubmission.created_at).toLocaleString()}
                </p>
              </div>
              <div className="bg-secondary/30 rounded-xl p-4">
                <p className="text-sm text-muted-foreground mb-1 font-medium">Status</p>
                <span
                  className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${
                    selectedSubmission.is_read
                      ? "bg-secondary text-muted-foreground"
                      : "bg-gradient-to-r from-destructive/20 to-destructive/10 text-destructive border border-destructive/20"
                  }`}
                >
                  {selectedSubmission.is_read ? "Read" : "New"}
                </span>
              </div>
            </div>

            <div>
              <p className="text-sm text-muted-foreground mb-3 font-semibold">Message</p>
              <div className="bg-gradient-to-br from-secondary/50 to-secondary/30 rounded-xl p-5 border border-border/50">
                <p className="whitespace-pre-wrap leading-relaxed">{selectedSubmission.message}</p>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-border/50 flex gap-3">
              <Button
                variant="default"
                onClick={() =>
                  window.open(`mailto:${selectedSubmission.email}`, "_blank")
                }
                className="rounded-xl"
              >
                <Mail className="w-4 h-4 mr-2" />
                Reply via Email
              </Button>
            </div>
          </motion.div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center py-16">
            <div className="w-20 h-20 bg-gradient-to-br from-accent/20 to-accent/5 rounded-2xl flex items-center justify-center mb-6">
              <Mail className="w-10 h-10 text-accent" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-2">
              Select a Message
            </h3>
            <p className="text-muted-foreground">
              Click on a message to view details
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
