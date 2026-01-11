import { ModeToggle } from "@/components/mode-toggle";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <h1 className="text-2xl">App</h1>
      <ModeToggle />
    </div>
  );
}
