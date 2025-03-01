"use client";

import { useEffect } from "react";

export default function ErrorDemo() {
  useEffect(() => {
    throw new Error("This is a demo error");
  }, []);

  return (
    <div>
      <h1>You won&#39;t see this content</h1>
    </div>
  );
}
