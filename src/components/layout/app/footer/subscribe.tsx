import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function Subscribe() {
  return (
    <div className="w-full relative flex">
      <Input
        placeholder="Enter Your Email"
        type="email"
        className="rounded-2xl w-full border-none bg-zinc-600 text-zinc-400"
      />
      <Button
        variant="secondary"
        className="rounded-2xl  max-w-32 absolute right-0 dark:bg-softPink-300 dark:text-zinc-800"
      >
        <span>Subscribe</span> <ArrowRight width={16} height={16} />
      </Button>
    </div>
  );
}
