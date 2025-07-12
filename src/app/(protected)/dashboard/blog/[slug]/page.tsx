import Link from "next/link";
import { ArrowLeft, CalendarIcon, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// Mock blog data - in a real app, you would fetch this based on the slug
const blogPosts = {
  "getting-started-with-nextjs": {
    title: "Getting Started with Next.js",
    date: "2023-10-15",
    readTime: "5 min read",
    category: "Development",
    author: "John Doe",
    content: `
              <p>Next.js is a React framework that enables several extra features, including server-side rendering and generating static websites.</p>
              <p>Next.js provides a solution to all of the above problems. But more importantly, it puts you and your team in the pit of success when building React applications.</p>
              <h2>Why Next.js?</h2>
              <p>Here's why you should consider Next.js for your next project:</p>
              <ul>
                <li>Zero Configuration: Automatic compilation and bundling</li>
                <li>Hybrid: SSG and SSR</li>
                <li>Incremental Static Regeneration</li>
                <li>TypeScript Support</li>
                <li>Fast Refresh</li>
                <li>File-system Routing</li>
                <li>API Routes</li>
              </ul>
              <p>To start using Next.js, you don't need to learn a whole new framework. If you know React, you're already halfway there!</p>
            `,
  },
  "mastering-tailwind-css": {
    title: "Mastering Tailwind CSS",
    date: "2023-09-22",
    readTime: "8 min read",
    category: "Design",
    author: "Jane Smith",
    content: `
              <p>Tailwind CSS is a utility-first CSS framework that allows you to build custom designs without ever leaving your HTML.</p>
              <p>Unlike other CSS frameworks that provide pre-designed components, Tailwind gives you low-level utility classes that let you build completely custom designs.</p>
              <h2>Why Tailwind CSS?</h2>
              <p>Here are some reasons to consider Tailwind:</p>
              <ul>
                <li>No more naming classes</li>
                <li>Component-friendly</li>
                <li>Responsive to the core</li>
                <li>Customizable design system</li>
                <li>Optimized for production</li>
              </ul>
              <p>Tailwind CSS helps you write CSS faster and with more consistency than traditional methods.</p>
            `,
  },
  "understanding-typescript": {
    title: "Understanding TypeScript",
    date: "2023-08-30",
    readTime: "6 min read",
    category: "Development",
    author: "Alex Johnson",
    content: `
              <p>TypeScript is a strongly typed programming language that builds on JavaScript, giving you better tooling at any scale.</p>
              <p>It adds static type definitions to JavaScript, which can help you catch errors early in your editor and provide better documentation.</p>
              <h2>Why TypeScript?</h2>
              <p>TypeScript offers several advantages over plain JavaScript:</p>
              <ul>
                <li>Static typing</li>
                <li>Object-oriented features</li>
                <li>Compile-time errors</li>
                <li>Great tooling</li>
                <li>Predictability</li>
                <li>Readability</li>
                <li>Growing community</li>
              </ul>
              <p>TypeScript can help you build more robust applications and improve your developer experience.</p>
            `,
  },
};

type BlogParams = {
  slug: string;
};

export default function BlogDetailPage({ params }: { params: BlogParams }) {
  const { slug } = params;
  const post = blogPosts[slug as keyof typeof blogPosts];

  // Handle case where post doesn't exist
  if (!post) {
    return (
      <div className="container mx-auto py-10 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl font-bold mb-4">Post Not Found</h1>
          <p className="text-muted-foreground mb-6">
            The blog post you&#39;re looking for doesn&#39;t exist.
          </p>
          <Button asChild>
            <Link href="/dashboard/blog">
              <ArrowLeft className="mr-2 size-4" />
              Back to Blog
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="mb-6">
          <Button variant="ghost" asChild className="mb-4 -ml-2">
            <Link href="/dashboard/blog">
              <ArrowLeft className="mr-2 size-4" />
              Back to Blog
            </Link>
          </Button>

          <h1 className="text-3xl font-bold mb-4">{post.title}</h1>

          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
            <Badge variant="outline">{post.category}</Badge>
            <div className="flex items-center">
              <CalendarIcon className="mr-1 size-4" />
              {post.date}
            </div>
            <div className="flex items-center">
              <Clock className="mr-1 size-4" />
              {post.readTime}
            </div>
            <div>By {post.author}</div>
          </div>
        </div>

        <div
          className="prose prose-slate dark:prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content }}
        ></div>
      </div>
    </div>
  );
}
