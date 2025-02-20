import Image from "next/image";

export default function OllamaFooter() {
  return (
    <div className="flex items-center justify-center font-mono mt-8 space-x-2">
      <Image src="/ollama.svg" alt="ollama" width={50} height={50} />
      <p className="">Powered by OLLAMA</p>
    </div>
  );
}
