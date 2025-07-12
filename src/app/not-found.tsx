import Link from "next/link";
import { ArrowLeft, FileQuestion } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function NotFound() {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Card>
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-muted-foreground/20 flex size-20 items-center justify-center rounded-full">
                <FileQuestion className="size-10 text-muted-foreground" />
              </div>
            </div>
            <CardTitle className="text-2xl">Page Not Found</CardTitle>
            <CardDescription>
              The page you are looking for doesn&#39;t exist or has been moved.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <Button asChild className="w-full">
                <Link href="/">
                  <ArrowLeft />
                  Back to Home
                </Link>
              </Button>
              <Button variant="outline" asChild className="w-full">
                <Link href="/login">Go to Login</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
        <div className="text-muted-foreground text-center text-xs">
          If you believe this is an error, please contact support.
        </div>
      </div>
    </div>
  );
}
