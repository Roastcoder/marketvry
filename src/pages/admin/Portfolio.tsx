import { useState, useEffect } from "react";
import { AdminLayout } from "@/components/admin/layout/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Edit, Trash2, Upload, X } from "lucide-react";
import { toast } from "sonner";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

const AdminPortfolio = () => {
  const [portfolio, setPortfolio] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    client: "",
    image_url: "",
    project_url: "",
    technologies: "",
  });

  useEffect(() => {
    fetchPortfolio();
  }, []);

  const fetchPortfolio = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_URL}/admin/portfolio`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to fetch");
      setPortfolio(await res.json());
    } catch (error: any) {
      toast.error("Failed to fetch portfolio");
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const token = localStorage.getItem("token");
      const fd = new FormData();
      fd.append("image", file);

      const res = await fetch(`${API_URL}/admin/blogs/upload-image`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: fd,
      });

      if (!res.ok) throw new Error("Upload failed");
      const data = await res.json();
      setFormData({ ...formData, image_url: data.url });
      toast.success("Image uploaded");
    } catch (error: any) {
      toast.error("Failed to upload image");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const url = editing
        ? `${API_URL}/admin/portfolio/${editing.id}`
        : `${API_URL}/admin/portfolio`;

      const res = await fetch(url, {
        method: editing ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to save");
      toast.success(editing ? "Updated!" : "Created!");
      setShowForm(false);
      setEditing(null);
      setFormData({ title: "", description: "", category: "", client: "", image_url: "", project_url: "", technologies: "" });
      fetchPortfolio();
    } catch (error: any) {
      toast.error("Failed to save");
    }
  };

  const handleEdit = (item: any) => {
    setEditing(item);
    setFormData({
      title: item.title,
      description: item.description,
      category: item.category || "",
      client: item.client || "",
      image_url: item.image_url || "",
      project_url: item.project_url || "",
      technologies: item.technologies || "",
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this item?")) return;

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_URL}/admin/portfolio/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed");
      toast.success("Deleted!");
      fetchPortfolio();
    } catch (error: any) {
      toast.error("Failed to delete");
    }
  };

  return (
    <AdminLayout>
      <div className="p-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Portfolio Management</h1>
          <Button
            onClick={() => {
              setShowForm(!showForm);
              setEditing(null);
              setFormData({ title: "", description: "", category: "", client: "", image_url: "", project_url: "", technologies: "" });
            }}
            className="gap-2"
          >
            <Plus className="w-4 h-4" />
            New Project
          </Button>
        </div>

        {showForm && (
          <div className="bg-card border border-border rounded-2xl p-6 mb-8">
            <h2 className="text-xl font-bold mb-4">{editing ? "Edit" : "Create"} Project</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Project Title *"
                required
                className="rounded-xl"
              />
              <div className="grid md:grid-cols-2 gap-4">
                <Input
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  placeholder="Category"
                  className="rounded-xl"
                />
                <Input
                  value={formData.client}
                  onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                  placeholder="Client Name"
                  className="rounded-xl"
                />
              </div>
              <div>
                {formData.image_url && (
                  <div className="relative inline-block mb-3">
                    <img src={formData.image_url} alt="Preview" className="w-full h-48 object-cover rounded-xl" />
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, image_url: "" })}
                      className="absolute top-2 right-2 w-8 h-8 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}
                <label className="border-2 border-dashed border-border rounded-xl p-4 text-center cursor-pointer hover:bg-secondary/50 block">
                  <Upload className="w-6 h-6 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">{uploading ? "Uploading..." : "Upload Image"}</p>
                  <input type="file" accept="image/*" onChange={handleImageUpload} disabled={uploading} className="hidden" />
                </label>
              </div>
              <Input
                value={formData.project_url}
                onChange={(e) => setFormData({ ...formData, project_url: e.target.value })}
                placeholder="Project URL"
                className="rounded-xl"
              />
              <Input
                value={formData.technologies}
                onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
                placeholder="Technologies (comma separated)"
                className="rounded-xl"
              />
              <Textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Description *"
                required
                rows={4}
                className="rounded-xl"
              />
              <div className="flex gap-3">
                <Button type="submit" className="rounded-xl">{editing ? "Update" : "Create"}</Button>
                <Button type="button" variant="outline" onClick={() => setShowForm(false)} className="rounded-xl">Cancel</Button>
              </div>
            </form>
          </div>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading ? (
            <p className="col-span-full text-center py-8">Loading...</p>
          ) : portfolio.length === 0 ? (
            <p className="col-span-full text-center py-8">No projects yet</p>
          ) : (
            portfolio.map((item) => (
              <div key={item.id} className="bg-card border border-border rounded-2xl overflow-hidden hover:shadow-lg transition-all">
                {item.image_url && (
                  <img src={item.image_url} alt={item.title} className="w-full h-48 object-cover" />
                )}
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                  {item.category && <p className="text-sm text-accent mb-2">{item.category}</p>}
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{item.description}</p>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => handleEdit(item)}>
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="destructive" size="sm" onClick={() => handleDelete(item.id)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminPortfolio;
