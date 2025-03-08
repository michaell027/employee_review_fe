"use client";

import { useEffect } from "react";
import { AlertCircle } from "lucide-react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center">
      <div className="mb-6 text-destructive">
        <AlertCircle size={64} />
      </div>
      <h2 className="text-3xl font-bold mb-4">Internal Server Error</h2>
      <p className="text-muted-foreground mb-6 max-w-md">
        {error.message || "An unexpected error occurred"}
        {error.digest && (
          <span className="block mt-2 text-sm">
            Error ID:{" "}
            <code className="bg-muted p-1 rounded">{error.digest}</code>
          </span>
        )}
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          type="submit"
          className="bg-white mb-8 text-black px-4 py-2 rounded-md"
          onClick={reset}
        >
          Try again
        </button>
        <Link href="/">
          <button className="bg-white mb-8 text-black px-4 py-2 rounded-md">
            Go back
          </button>
        </Link>
      </div>
    </div>
  );
}
