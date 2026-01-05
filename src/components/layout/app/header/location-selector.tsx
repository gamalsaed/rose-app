import { MapPinPen } from "lucide-react";

export default function LocationSelector() {
  return (
    <div className="w-fit cursor-pointer">
      <div className="dark:text-zinc-500 w-20 pb-1">Deliver to:</div>
      <div className="flex text-maroon-700 dark:text-softPink-200">
        <MapPinPen size={24} />
        <span className="text-base ">Cairo</span>
      </div>
    </div>
  );
}
