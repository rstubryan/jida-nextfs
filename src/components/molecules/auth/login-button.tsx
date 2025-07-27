"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";

export default function LoginButton() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (session) {
    return (
      <div className="flex items-center gap-2">
        <span>Signed in as {session.user?.email}</span>
        <Button onClick={() => signOut()}>Sign out</Button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <span>Not signed in</span>
      <Button onClick={() => signIn()}>Sign in</Button>
    </div>
  );
}
