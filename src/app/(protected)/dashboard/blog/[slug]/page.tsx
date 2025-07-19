import Link from "next/link";
import { ArrowLeft, CalendarIcon, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { prisma } from "@/lib/prisma";
import { format } from "date-fns";
import { notFound } from "next/navigation";

type BlogParams = {
  slug: string;
};

export default async function BlogDetailPage({
  params,
}: {
  params: BlogParams;
}) {
  const { slug } = params;

  // Fetch blog post from database
  const post = await prisma.blogPost.findUnique({
    where: { slug },
  });

  // Handle case where post doesn't exist
  if (!post) {
    notFound();
  }

  // Calculate read time based on content length
  const readTime = post.content
    ? `${Math.ceil(post.content.length / 1000)} min read`
    : "1 min read";

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

          <h1 className="text-3xl font-bold mb-4">{post.name}</h1>

          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
            <Badge variant="outline">Development</Badge>
            <div className="flex items-center">
              <CalendarIcon className="mr-1 size-4" />
              {format(new Date(post.createdAt), "MMM dd, yyyy")}
            </div>
            <div className="flex items-center">
              <Clock className="mr-1 size-4" />
              {readTime}
            </div>
          </div>
        </div>

        {post.content ? (
          <div
            className="prose prose-slate dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
          ></div>
        ) : (
          <div className="prose prose-slate dark:prose-invert max-w-none">
            <p>{post.description}</p>
          </div>
        )}
      </div>
    </div>
  );
}

// Create a not-found page for better UX
export function generateMetadata({ params }: { params: BlogParams }) {
  return {
    title: `Blog | ${params.slug}`,
  };
}
