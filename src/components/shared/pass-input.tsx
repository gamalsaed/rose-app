"use client";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";
export default function PassInput() {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  function handleVisible() {
    setIsVisible((prev) => !prev);
  }
  return (
    <div className="relative flex items-center">
      <Input type={!isVisible ? "password" : "text"} placeholder="**********" />
      <span
        className="absolute right-4 cursor-pointer text-zinc-400 dark:text-zinc-500"
        onClick={handleVisible}
      >
        {isVisible ? (
          <Eye height={19} width={19} />
        ) : (
          <EyeOff height={19} width={19} />
        )}
      </span>
    </div>
  );
}
