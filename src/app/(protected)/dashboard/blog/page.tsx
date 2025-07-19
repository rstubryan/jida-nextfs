"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  CalendarIcon,
  Clock,
  ArrowRight,
  PlusCircle,
  Pencil,
  Trash2,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { format } from "date-fns";

interface BlogPost {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  content: string | null;
  createdAt: string;
  updatedAt: string;
  excerpt?: string;
  readTime?: string;
  category?: string;
}

export default function BlogPage() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentBlog, setCurrentBlog] = useState<BlogPost | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    description: "",
    content: "",
  });

  // Fetch all blogs
  const fetchBlogs = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/blogs");
      if (!response.ok) throw new Error("Failed to fetch blogs");

      const data = await response.json();
      // Add excerpt and readTime properties
      const processedData = data.map((blog: BlogPost) => ({
        ...blog,
        excerpt: blog.content
          ? blog.content.substring(0, 100) + "..."
          : blog.description,
        readTime: blog.content
          ? `${Math.ceil((blog.content.length || 0) / 1000)} min read`
          : "1 min read",
        category: "Development",
      }));

      setBlogs(processedData);
    } catch (error) {
      console.error("Failed to load blogs:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Create a new blog
  const createBlog = async () => {
    try {
      const response = await fetch("/api/blogs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to create blog");

      setIsAddDialogOpen(false);
      setFormData({ name: "", slug: "", description: "", content: "" });
      console.log("Blog created successfully");
      fetchBlogs();
    } catch (error) {
      console.error("Failed to create blog:", error);
    }
  };

  // Update a blog
  const updateBlog = async () => {
    if (!currentBlog) return;

    try {
      const response = await fetch("/api/blogs", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, id: currentBlog.id }),
      });

      if (!response.ok) throw new Error("Failed to update blog");

      setIsEditDialogOpen(false);
      setCurrentBlog(null);
      setFormData({ name: "", slug: "", description: "", content: "" });
      console.log("Blog updated successfully");
      fetchBlogs();
    } catch (error) {
      console.error("Failed to update blog:", error);
    }
  };

  // Delete a blog
  const deleteBlog = async () => {
    if (!currentBlog) return;

    try {
      const response = await fetch(`/api/blogs?id=${currentBlog.id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete blog");

      setIsDeleteDialogOpen(false);
      setCurrentBlog(null);
      console.log("Blog deleted successfully");
      fetchBlogs();
    } catch (error) {
      console.error("Failed to delete blog:", error);
    }
  };

  // Load blogs on component mount
  useEffect(() => {
    fetchBlogs();
  }, []);

  // Handle form input changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Generate slug from name
  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^\w\s]/gi, "")
      .replace(/\s+/g, "-");
  };

  // Handle name change to auto-generate slug
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    setFormData((prev) => ({
      ...prev,
      name,
      slug: generateSlug(name),
    }));
  };

  // Open edit dialog with blog data
  const handleEditClick = (blog: BlogPost) => {
    setCurrentBlog(blog);
    setFormData({
      name: blog.name,
      slug: blog.slug,
      description: blog.description || "",
      content: blog.content || "",
    });
    setIsEditDialogOpen(true);
  };

  // Open delete confirmation dialog
  const handleDeleteClick = (blog: BlogPost) => {
    setCurrentBlog(blog);
    setIsDeleteDialogOpen(true);
  };

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold mb-2">Blog</h1>
            <p className="text-muted-foreground">
              Latest articles and tutorials on web development
            </p>
          </div>
          <Button onClick={() => setIsAddDialogOpen(true)}>
            <PlusCircle className="mr-2 size-4" />
            Add New Blog
          </Button>
        </div>

        {isLoading ? (
          <div className="text-center py-10">Loading blogs...</div>
        ) : blogs.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-muted-foreground mb-4">No blogs found</p>
            <Button onClick={() => setIsAddDialogOpen(true)}>
              Create your first blog
            </Button>
          </div>
        ) : (
          <div className="grid gap-6">
            {blogs.map((blog) => (
              <Card key={blog.id} className="overflow-hidden">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between mb-1">
                    <Badge variant="outline">{blog.category}</Badge>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <CalendarIcon className="mr-1 size-4" />
                      {format(new Date(blog.createdAt), "MMM dd, yyyy")}
                    </div>
                  </div>
                  <CardTitle className="text-xl">{blog.name}</CardTitle>
                </CardHeader>
                <CardContent className="pb-3">
                  <p className="text-muted-foreground">{blog.excerpt}</p>
                </CardContent>
                <CardFooter className="flex justify-between items-center pt-0">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="mr-1 size-4" />
                    {blog.readTime}
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEditClick(blog)}
                    >
                      <Pencil className="size-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteClick(blog)}
                    >
                      <Trash2 className="size-4" />
                    </Button>
                    <Button asChild variant="ghost" size="sm">
                      <Link href={`/dashboard/blog/${blog.slug}`}>
                        Read more <ArrowRight className="ml-1 size-4" />
                      </Link>
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Add Blog Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>Add New Blog</DialogTitle>
            <DialogDescription>
              Create a new blog post to share with your audience.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Title</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleNameChange}
                placeholder="Enter blog title"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="slug">Slug</Label>
              <Input
                id="slug"
                name="slug"
                value={formData.slug}
                onChange={handleInputChange}
                placeholder="url-friendly-slug"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Short description of your blog post"
                className="min-h-[80px]"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                name="content"
                value={formData.content}
                onChange={handleInputChange}
                placeholder="Write your blog content here"
                className="min-h-[150px]"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={createBlog}>Create Blog</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Blog Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>Edit Blog</DialogTitle>
            <DialogDescription>
              Make changes to your blog post.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-name">Title</Label>
              <Input
                id="edit-name"
                name="name"
                value={formData.name}
                onChange={handleNameChange}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-slug">Slug</Label>
              <Input
                id="edit-slug"
                name="slug"
                value={formData.slug}
                onChange={handleInputChange}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-description">Description</Label>
              <Textarea
                id="edit-description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="min-h-[80px]"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-content">Content</Label>
              <Textarea
                id="edit-content"
                name="content"
                value={formData.content}
                onChange={handleInputChange}
                className="min-h-[150px]"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsEditDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={updateBlog}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Delete Blog</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this blog? This action cannot be
              undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={deleteBlog}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
