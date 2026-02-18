import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Calendar, User, Share2 } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

const BlogArticle = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchBlog();
    }
  }, [id]);

  const fetchBlog = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`${API_URL}/blogs/${id}`);
      if (!res.ok) throw new Error("Blog not found");
      const data = await res.json();
      setBlog(data);
    } catch (error: any) {
      toast.error("Failed to load blog");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="min-h-screen pt-32 flex items-center justify-center">
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </Layout>
    );
  }

  if (!blog) {
    return (
      <Layout>
        <div className="min-h-screen pt-32 flex items-center justify-center">
          <div className="text-center">
            <p className="text-muted-foreground mb-4">Blog not found</p>
            <Link to="/blog" className="text-accent hover:underline">
              Back to Blog
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <article className="pt-32 pb-20">
        <div className="container-custom max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Link to="/blog" className="inline-flex items-center gap-2 text-accent hover:underline mb-8">
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
            </Link>

            {blog.category && (
              <span className="text-accent font-medium text-sm">{blog.category}</span>
            )}
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mt-2 mb-6">
              {blog.title}
            </h1>

            <div className="flex items-center gap-6 mb-8 text-muted-foreground">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                {blog.author || "Admin"}
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {new Date(blog.created_at).toLocaleDateString()}
              </div>
            </div>

            {blog.image_url && (
              <img
                src={blog.image_url}
                alt={blog.title}
                className="w-full rounded-2xl mb-12 object-cover max-h-[500px]"
              />
            )}

            <div className="prose prose-lg max-w-none">
              <p className="text-xl text-muted-foreground mb-8">
                {blog.excerpt}
              </p>

              <div 
                className="text-muted-foreground whitespace-pre-wrap"
                dangerouslySetInnerHTML={{ __html: blog.content.replace(/\n/g, '<br />') }}
              />
            </div>

            <div className="flex items-center justify-between pt-8 mt-8 border-t border-border">
              <div className="flex items-center gap-4">
                <span className="text-sm text-muted-foreground">Share this article:</span>
                <button className="w-10 h-10 rounded-full bg-secondary hover:bg-accent hover:text-accent-foreground transition-colors flex items-center justify-center">
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </article>
    </Layout>
  );
};

export default BlogArticle;
