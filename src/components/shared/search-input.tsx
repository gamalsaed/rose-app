import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { cn } from "@/lib/utilits/cn";
interface SearchInputProps {
  placeholder: string;
  className?: string;
}

export default function SearchInput({
  placeholder,
  className,
}: SearchInputProps) {
  return (
    <div className="relative text-zinc-800 w-full">
      <Search size={24} className="text-zinc-400 absolute top-3 left-2.5" />
      <Input className={cn("pl-11", className)} placeholder={placeholder} />
    </div>
  );
}
