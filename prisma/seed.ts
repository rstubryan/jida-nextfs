import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.blogPost.createMany({
    data: [
      {
        name: "Getting Started with Next.js",
        slug: "getting-started-with-nextjs",
        description:
          "Learn the basics of Next.js and how to get started with this React framework.",
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
      {
        name: "Mastering Tailwind CSS",
        slug: "mastering-tailwind-css",
        description:
          "Discover how to use Tailwind CSS effectively in your projects.",
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
      {
        name: "Understanding TypeScript",
        slug: "understanding-typescript",
        description:
          "A comprehensive guide to TypeScript and its benefits for developers.",
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
    ],
    skipDuplicates: true,
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
