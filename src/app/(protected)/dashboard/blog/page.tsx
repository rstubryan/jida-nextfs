import Link from "next/link";
import { CalendarIcon, Clock, ArrowRight } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// Mock data for blog posts
const blogPosts = [
  {
    id: "getting-started-with-nextjs",
    title: "Getting Started with Next.js",
    excerpt:
      "Learn how to build modern web applications with Next.js, React, and TypeScript.",
    date: "2023-10-15",
    readTime: "5 min read",
    category: "Development",
  },
  {
    id: "mastering-tailwind-css",
    title: "Mastering Tailwind CSS",
    excerpt:
      "A comprehensive guide to building beautiful interfaces with Tailwind CSS.",
    date: "2023-09-22",
    readTime: "8 min read",
    category: "Design",
  },
  {
    id: "understanding-typescript",
    title: "Understanding TypeScript",
    excerpt:
      "Why TypeScript is essential for modern web development and how to use it effectively.",
    date: "2023-08-30",
    readTime: "6 min read",
    category: "Development",
  },
];

export default function BlogPage() {
  return (
    <div className="container mx-auto py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Blog</h1>
          <p className="text-muted-foreground">
            Latest articles and tutorials on web development
          </p>
        </div>

        <div className="grid gap-6">
          {blogPosts.map((post) => (
            <Card key={post.id} className="overflow-hidden">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between mb-1">
                  <Badge variant="outline">{post.category}</Badge>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <CalendarIcon className="mr-1 size-4" />
                    {post.date}
                  </div>
                </div>
                <CardTitle className="text-xl">{post.title}</CardTitle>
              </CardHeader>
              <CardContent className="pb-3">
                <p className="text-muted-foreground">{post.excerpt}</p>
              </CardContent>
              <CardFooter className="flex justify-between items-center pt-0">
                <div className="flex items-center text-sm text-muted-foreground">
                  <Clock className="mr-1 size-4" />
                  {post.readTime}
                </div>
                <Button asChild variant="ghost" size="sm">
                  <Link href={`/dashboard/blog/${post.id}`}>
                    Read more <ArrowRight className="ml-1 size-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
