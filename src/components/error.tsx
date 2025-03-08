import React from "react";
import Image from "next/image";

interface ErrorProps {
  message: string;
}

export default function ErrorComponent({ message }: ErrorProps) {
  return (
    <>
      <Image src="/error.png" alt="error" width={100} height={100} />
      <p className="text-lg font-bold">{message}</p>
    </>
  );
}
