import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { ArrowRight, Calendar, Clock, User } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

const Blog = () => {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`${API_URL}/blogs`);
      if (!res.ok) throw new Error("Failed to fetch blogs");
      const data = await res.json();
      setBlogs(data);
    } catch (error: any) {
      toast.error("Failed to load blogs");
    } finally {
      setIsLoading(false);
    }
  };

  const categories = ["All", ...Array.from(new Set(blogs.map(b => b.category).filter(Boolean)))];
  const filteredBlogs = selectedCategory === "All" 
    ? blogs 
    : blogs.filter(b => b.category === selectedCategory);
  const featuredBlog = filteredBlogs[0];
  const otherBlogs = filteredBlogs.slice(1);
  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-navy pt-32 pb-20">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <span className="text-accent font-semibold tracking-wide uppercase text-sm">
              Our Blog
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mt-4 mb-6">
              Insights & Resources
            </h1>
            <p className="text-xl text-primary-foreground/80">
              Stay updated with the latest trends, tips, and insights from our digital experts.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="section-padding">
        <div className="container-custom">
          {/* Categories */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-wrap gap-3 mb-12"
          >
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? "bg-accent text-accent-foreground"
                    : "bg-secondary text-foreground hover:bg-accent hover:text-accent-foreground"
                }`}
              >
                {category}
              </button>
            ))}
          </motion.div>

          {/* Featured Post */}
          {isLoading ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Loading blogs...</p>
            </div>
          ) : blogs.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No blogs available yet.</p>
            </div>
          ) : (
            <>
              {featuredBlog && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-16"
                >
                  <div className="grid lg:grid-cols-2 gap-8 items-center">
                    <div className="relative overflow-hidden rounded-2xl aspect-[16/10]">
                      <img
                        src={featuredBlog.image_url || "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop"}
                        alt={featuredBlog.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      {featuredBlog.category && (
                        <span className="text-accent font-medium text-sm">
                          {featuredBlog.category}
                        </span>
                      )}
                      <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4">
                        {featuredBlog.title}
                      </h2>
                      <p className="text-muted-foreground text-lg mb-6">
                        {featuredBlog.excerpt}
                      </p>
                      <div className="flex items-center gap-6 mb-6">
                        <div className="flex items-center gap-2 text-muted-foreground text-sm">
                          <User className="w-4 h-4" />
                          {featuredBlog.author || "Admin"}
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground text-sm">
                          <Calendar className="w-4 h-4" />
                          {new Date(featuredBlog.created_at).toLocaleDateString()}
                        </div>
                      </div>
                      <Link to={`/blog/${featuredBlog.id}`} className="btn-hero inline-flex">
                        Read Article <ArrowRight className="w-5 h-5 ml-2" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              )}

          {/* Posts Grid */}
          {otherBlogs.length > 0 && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {otherBlogs.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    to={`/blog/${post.id}`}
                    className="group cursor-pointer block"
                  >
                    <div className="relative overflow-hidden rounded-2xl aspect-[16/10] mb-4">
                      <img
                        src={post.image_url || "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop"}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    {post.category && (
                      <span className="text-accent font-medium text-sm">{post.category}</span>
                    )}
                    <h3 className="text-xl font-bold text-foreground mt-2 mb-2 group-hover:text-accent transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-muted-foreground mb-4 line-clamp-2">{post.excerpt}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>{post.author || "Admin"}</span>
                      <span>•</span>
                      <span>{new Date(post.created_at).toLocaleDateString()}</span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
            </>
          )}

          {/* Load More */}
          {/* <div className="text-center mt-12">
            <button className="btn-hero-outline">Load More Articles</button>
          </div> */}
        </div>
      </section>

      {/* Newsletter */}
      <section className="section-padding bg-secondary">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Subscribe to Our Newsletter
            </h2>
            <p className="text-muted-foreground mb-8">
              Get the latest articles, resources, and insights delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-4 rounded-full border border-border bg-card focus:outline-none focus:ring-2 focus:ring-accent"
              />
              <button className="btn-hero whitespace-nowrap">
                Subscribe <ArrowRight className="w-5 h-5 ml-2" />
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Blog;
