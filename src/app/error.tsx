"use client";

import { useEffect } from "react";
import { AlertCircle } from "lucide-react";

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
    <div className="flex flex-col items-center justify-center min-h-[50vh] p-6 text-center">
      <div className="mb-6 text-destructive">
        <AlertCircle size={64} />
      </div>
      <h2 className="text-3xl font-bold mb-4">Something went wrong!</h2>
      <p className="text-muted-foreground mb-6 max-w-md">
        We apologize for the inconvenience. An unexpected error has occurred.
        {error.digest && (
          <span className="block mt-2 text-sm">
            Error ID:{" "}
            <code className="bg-muted p-1 rounded">{error.digest}</code>
          </span>
        )}
      </p>
      <button
        onClick={() => reset()}
        className="bg-white mb-8 text-black px-4 py-2 rounded-md"
      >
        Try again
      </button>
    </div>
  );
}
