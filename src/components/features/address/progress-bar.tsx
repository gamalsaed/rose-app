"use client";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utilits/cn";

const ProgressBar = ({ step }: { step: string }) => {
    // Variables 
    const value = step === "1" ? 33.3333 : step === "2" ? 66.6666 : 0;


  return (
    <div className="w-full relative my-[1.25rem]">
      <Progress
        value={value}
        className={cn(
          "h-[0.5rem] bg-zinc-200 rounded-sm",
          "[&>div]:bg-maroon-600",
          "[&>div]:transition-all [&>div]:duration-500",
          "rtl:scale-x-[-1]"  
        )}
      />

      <div className="absolute top-[-0.4375rem] left-0 w-full flex justify-evenly px-[0.25rem] rtl:flex-row-reverse">
        {/* Step 1 */}
        <div
          className={cn(
            "w-[1.5rem] h-[1.5rem] rounded-full rtl:order-2 flex items-center justify-center text-[0.875rem] transition-colors duration-300",
            step === "1" || step === "2"
              ? "bg-maroon-600 text-white"
              : "bg-zinc-200 text-zinc-500"
          )}
        >
          1
        </div>

        {/* Step 2 */}
        <div
          className={cn(
            "w-[1.5rem] h-[1.5rem] rounded-full rtl:order-1 flex items-center justify-center text-[0.875rem] transition-colors duration-300",
            step === "2"
              ? "bg-maroon-600 text-white"
              : "bg-gray-300 text-gray-600"
          )}
        >
          2
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
