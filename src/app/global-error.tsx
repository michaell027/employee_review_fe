"use client";

import { useEffect } from "react";
import { AlertTriangle } from "lucide-react";

export default function GlobalError({
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
    <html>
      <body className="flex flex-col items-center justify-center min-h-screen p-6 text-center bg-background text-foreground">
        <div className="mb-6 text-destructive">
          <AlertTriangle size={64} />
        </div>
        <h2 className="text-3xl font-bold mb-4">Application Error</h2>
        <p className="text-muted-foreground mb-6 max-w-md">
          A critical error has occurred in the application.
          {error.digest && (
            <span className="block mt-2 text-sm">
              Error ID:{" "}
              <code className="bg-muted p-1 rounded">{error.digest}</code>
            </span>
          )}
        </p>
        <button
          type="submit"
          className="bg-white mb-8 text-black px-4 py-2 rounded-md"
          onClick={reset}
        >
          Try again
        </button>
      </body>
    </html>
  );
}
