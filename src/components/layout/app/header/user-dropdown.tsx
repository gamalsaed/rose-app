import { User } from "lucide-react";
import Link from "next/link";
export default function UserDropDown() {
  return (
    <Link href="#" className=" flex gap-1 cursor-pointer">
      <User size={24} />
      <span className="text-base">Login</span>
    </Link>
  );
}
