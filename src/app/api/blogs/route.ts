// app/api/blogs/route.ts
import { NextRequest, NextResponse } from "next/server";

// Static data store for blogs
let blogs = [
  {
    id: "1",
    title: "Getting Started with Next.js",
    content:
      "Next.js is a React framework that enables server-side rendering and more...",
    author: "John Doe",
    date: "2023-10-15",
  },
  {
    id: "2",
    title: "Mastering Tailwind CSS",
    content:
      "Tailwind CSS is a utility-first CSS framework that allows you to build custom designs...",
    author: "Jane Smith",
    date: "2023-09-22",
  },
  {
    id: "3",
    title: "Understanding TypeScript",
    content:
      "TypeScript is a strongly typed programming language that builds on JavaScript...",
    author: "Alex Johnson",
    date: "2023-08-30",
  },
];

// GET all blogs
export async function GET() {
  return NextResponse.json(blogs);
}

// POST create a new blog
export async function POST(request: NextRequest) {
  const body = await request.json();

  // Validate required fields
  if (!body.title || !body.content || !body.author) {
    return NextResponse.json(
      { error: "Title, content, and author are required" },
      { status: 400 },
    );
  }

  // Create new blog with generated ID
  const newBlog = {
    id: Date.now().toString(),
    title: body.title,
    content: body.content,
    author: body.author,
    date: new Date().toISOString().split("T")[0],
  };

  blogs.push(newBlog);
  return NextResponse.json(newBlog, { status: 201 });
}

// PUT update a blog
export async function PUT(request: NextRequest) {
  const body = await request.json();

  // Validate required fields
  if (!body.id || !body.title || !body.content || !body.author) {
    return NextResponse.json(
      { error: "ID, title, content, and author are required" },
      { status: 400 },
    );
  }

  // Find blog by ID
  const index = blogs.findIndex((blog) => blog.id === body.id);

  if (index === -1) {
    return NextResponse.json({ error: "Blog not found" }, { status: 404 });
  }

  // Update blog
  blogs[index] = {
    ...blogs[index],
    title: body.title,
    content: body.content,
    author: body.author,
  };

  return NextResponse.json(blogs[index]);
}

// DELETE a blog
export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "ID is required" }, { status: 400 });
  }

  const initialLength = blogs.length;
  blogs = blogs.filter((blog) => blog.id !== id);

  if (blogs.length === initialLength) {
    return NextResponse.json({ error: "Blog not found" }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}
