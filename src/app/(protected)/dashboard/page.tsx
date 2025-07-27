"use client";

import { useSession } from "next-auth/react";

export default function DashboardPage() {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      window.location.href = "/api/auth/signin";
    },
  });

  return (
    <div>
      <h1>Protected Content</h1>
      <p>Welcome {session?.user?.name}!</p>
    </div>
  );
}
