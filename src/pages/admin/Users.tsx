import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AdminLayout } from "@/components/admin/layout/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, MoreVertical, Trash2, Edit, Shield } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

const AdminUsers = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

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
      toast.error("Failed to fetch users");
    } finally {
      setIsLoading(false);
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
      u.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.phone?.includes(searchQuery)
  );

  return (
    <AdminLayout>
      <div>
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-accent to-accent/60 bg-clip-text text-transparent mb-2">
            User Management
          </h1>
          <p className="text-sm text-muted-foreground">View and manage all registered users</p>
        </div>

        <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search users..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 sm:pl-10 h-10 sm:h-11 rounded-xl border-border/50 focus:border-accent text-sm sm:text-base"
              />
            </div>
            <Button onClick={fetchUsers} variant="outline" className="rounded-xl hover:bg-accent/10 hover:border-accent h-10 sm:h-11 text-sm sm:text-base">
              Refresh
            </Button>
          </div>

          <div className="overflow-x-auto rounded-xl border border-border/50">
            <table className="w-full min-w-[640px]">
              <thead>
                <tr className="border-b border-border/50 bg-secondary/30">
                  <th className="text-left py-3 sm:py-4 px-3 sm:px-4 text-xs sm:text-sm font-semibold">Name</th>
                  <th className="text-left py-3 sm:py-4 px-3 sm:px-4 text-xs sm:text-sm font-semibold hidden md:table-cell">Email</th>
                  <th className="text-left py-3 sm:py-4 px-3 sm:px-4 text-xs sm:text-sm font-semibold hidden lg:table-cell">Phone</th>
                  <th className="text-left py-3 sm:py-4 px-3 sm:px-4 text-xs sm:text-sm font-semibold">Role</th>
                  <th className="text-left py-3 sm:py-4 px-3 sm:px-4 text-xs sm:text-sm font-semibold hidden sm:table-cell">Joined</th>
                  <th className="text-right py-3 sm:py-4 px-3 sm:px-4 text-xs sm:text-sm font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr>
                    <td colSpan={6} className="text-center py-8 text-muted-foreground text-sm">
                      Loading...
                    </td>
                  </tr>
                ) : filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center py-8 text-muted-foreground text-sm">
                      No users found
                    </td>
                  </tr>
                ) : (
                  filteredUsers.map((u) => (
                    <tr key={u.id} className="border-b border-border/50 hover:bg-accent/5">
                      <td className="py-3 sm:py-4 px-3 sm:px-4">
                        <div className="font-semibold text-sm sm:text-base">{u.full_name || "Unnamed"}</div>
                        <div className="text-xs text-muted-foreground md:hidden">{u.email}</div>
                      </td>
                      <td className="py-3 sm:py-4 px-3 sm:px-4 text-muted-foreground text-sm hidden md:table-cell">{u.email}</td>
                      <td className="py-3 sm:py-4 px-3 sm:px-4 text-muted-foreground text-sm hidden lg:table-cell">{u.phone || "-"}</td>
                      <td className="py-3 sm:py-4 px-3 sm:px-4">
                        <span
                          className={`px-2 sm:px-3 py-1 text-xs font-semibold rounded-full whitespace-nowrap ${
                            u.role === "admin"
                              ? "bg-purple-500/10 text-purple-600 border border-purple-500/20"
                              : "bg-secondary text-muted-foreground border border-border/50"
                          }`}
                        >
                          {u.role}
                        </span>
                      </td>
                      <td className="py-3 sm:py-4 px-3 sm:px-4 text-muted-foreground text-xs sm:text-sm hidden sm:table-cell">
                        {new Date(u.created_at).toLocaleDateString()}
                      </td>
                      <td className="py-3 sm:py-4 px-3 sm:px-4 text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="bg-card border border-border">
                            <DropdownMenuItem onClick={() => navigate(`/profile/${u.id}`)} className="text-sm">
                              <Edit className="w-4 h-4 mr-2" />
                              Edit
                            </DropdownMenuItem>
                            {u.role !== "admin" && (
                              <DropdownMenuItem onClick={() => handlePromoteToAdmin(u.id)} className="text-sm">
                                <Shield className="w-4 h-4 mr-2" />
                                Make Admin
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuItem
                              onClick={() => handleDeleteUser(u.id)}
                              className="text-destructive text-sm"
                            >
                              <Trash2 className="w-4 h-4 mr-2" />
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
      </div>
    </AdminLayout>
  );
};

export default AdminUsers;
