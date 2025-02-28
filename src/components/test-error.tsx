"use client";

import { useEffect } from "react";

export default function ErrorDemo() {
  useEffect(() => {
    // This will intentionally throw an error when the component mounts
    throw new Error("This is a demo error");
  }, []);

  // This won't render because the error will be thrown first
  return (
    <div>
      <h1>You won&#39;t see this content</h1>
    </div>
  );
}
