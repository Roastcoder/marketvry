import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AdminLayout } from "@/components/admin/layout/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Edit, Trash2, Eye, Upload, X } from "lucide-react";
import { toast } from "sonner";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

const AdminBlogs = () => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingBlog, setEditingBlog] = useState<any>(null);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    image_url: "",
    category: "",
    author: "",
  });

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_URL}/admin/blogs`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to fetch blogs");
      const data = await res.json();
      setBlogs(data);
    } catch (error: any) {
      toast.error("Failed to fetch blogs");
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image must be less than 5MB");
      return;
    }

    setUploading(true);
    try {
      const token = localStorage.getItem("token");
      const formDataUpload = new FormData();
      formDataUpload.append("image", file);

      const res = await fetch(`${API_URL}/admin/blogs/upload-image`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formDataUpload,
      });

      if (!res.ok) throw new Error("Failed to upload image");
      const data = await res.json();
      setFormData({ ...formData, image_url: data.url });
      toast.success("Image uploaded successfully");
    } catch (error: any) {
      toast.error(error.message || "Failed to upload image");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const url = editingBlog
        ? `${API_URL}/admin/blogs/${editingBlog.id}`
        : `${API_URL}/admin/blogs`;
      
      const res = await fetch(url, {
        method: editingBlog ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to save blog");
      toast.success(editingBlog ? "Blog updated!" : "Blog created!");
      setShowForm(false);
      setEditingBlog(null);
      setFormData({ title: "", excerpt: "", content: "", image_url: "", category: "", author: "" });
      fetchBlogs();
    } catch (error: any) {
      toast.error(error.message || "Failed to save blog");
    }
  };

  const handleEdit = (blog: any) => {
    setEditingBlog(blog);
    setFormData({
      title: blog.title,
      excerpt: blog.excerpt,
      content: blog.content,
      image_url: blog.image_url || "",
      category: blog.category || "",
      author: blog.author || "",
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this blog?")) return;

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_URL}/admin/blogs/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to delete blog");
      toast.success("Blog deleted!");
      fetchBlogs();
    } catch (error: any) {
      toast.error(error.message || "Failed to delete blog");
    }
  };

  return (
    <AdminLayout>
      <div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 sm:mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-accent to-accent/60 bg-clip-text text-transparent mb-2">
              Blog Management
            </h1>
            <p className="text-sm text-muted-foreground">Create and manage blog posts</p>
          </div>
          <Button
            onClick={() => {
              setShowForm(!showForm);
              setEditingBlog(null);
              setFormData({ title: "", excerpt: "", content: "", image_url: "", category: "", author: "" });
            }}
            className="gap-2 rounded-xl w-full sm:w-auto"
          >
            <Plus className="w-4 h-4" />
            New Blog
          </Button>
        </div>

        {showForm && (
          <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-4 sm:p-6 mb-6 sm:mb-8">
            <h2 className="text-lg sm:text-xl font-bold mb-4">
              {editingBlog ? "Edit Blog" : "Create New Blog"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Title *</label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                  className="rounded-xl"
                />
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Category</label>
                  <Input
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    placeholder="e.g., Marketing, Development"
                    className="rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Author</label>
                  <Input
                    value={formData.author}
                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                    placeholder="Author name"
                    className="rounded-xl"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Image</label>
                <div className="space-y-3">
                  {formData.image_url && (
                    <div className="relative inline-block w-full">
                      <img
                        src={formData.image_url}
                        alt="Preview"
                        className="w-full h-48 object-cover rounded-xl"
                      />
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, image_url: "" })}
                        className="absolute top-2 right-2 w-8 h-8 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                  <div className="flex gap-2">
                    <label className="flex-1">
                      <div className="border-2 border-dashed border-border rounded-xl p-4 text-center cursor-pointer hover:bg-secondary/50 transition-colors">
                        <Upload className="w-6 h-6 mx-auto mb-2 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground">
                          {uploading ? "Uploading..." : "Click to upload image"}
                        </p>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          disabled={uploading}
                          className="hidden"
                        />
                      </div>
                    </label>
                  </div>
                  <Input
                    value={formData.image_url}
                    onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                    placeholder="Or paste image URL"
                    className="rounded-xl"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Excerpt *</label>
                <Textarea
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  required
                  rows={2}
                  className="rounded-xl"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Content *</label>
                <Textarea
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  required
                  rows={10}
                  className="rounded-xl"
                />
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button type="submit" className="rounded-xl">
                  {editingBlog ? "Update" : "Create"} Blog
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setShowForm(false);
                    setEditingBlog(null);
                  }}
                  className="rounded-xl"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        )}

        <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-4 sm:p-6">
          <div className="space-y-4">
            {isLoading ? (
              <p className="text-center py-8 text-muted-foreground text-sm">Loading...</p>
            ) : blogs.length === 0 ? (
              <p className="text-center py-8 text-muted-foreground text-sm">No blogs yet</p>
            ) : (
              blogs.map((blog) => (
                <div
                  key={blog.id}
                  className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 border border-border/50 rounded-xl hover:bg-secondary/50 transition-colors"
                >
                  {blog.image_url && (
                    <img
                      src={blog.image_url}
                      alt={blog.title}
                      className="w-full sm:w-20 h-40 sm:h-20 object-cover rounded-lg flex-shrink-0"
                    />
                  )}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-base sm:text-lg truncate">{blog.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">{blog.excerpt}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {new Date(blog.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex gap-2 w-full sm:w-auto">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigate(`/blog/${blog.id}`)}
                      className="flex-1 sm:flex-none"
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleEdit(blog)}
                      className="flex-1 sm:flex-none"
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(blog.id)}
                      className="flex-1 sm:flex-none"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminBlogs;
