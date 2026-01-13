import Image from "next/image";
import SearchInput from "@/components/shared/search-input";
import UserDropDown from "./user-dropdown";
import Divider from "@/components/custom-ui/divider";
import { Link } from "@/i18n/navigation";
import { Heart, ShoppingCart } from "lucide-react";
import NotificationDropDown from "./notification-dropdown";
import Language from "./language";
import LocationSelector from "./location-selector";
import NavBar from "./nav-bar";

export default function Header() {
  return (
    <>
      <header className="flex items-center text-zinc-700 dark:text-zinc-50  px-9 gap-6 pt-3">
        <Image
          width={85}
          height={80}
          alt="logo"
          src="/assets/images/logo.svg"
        />

        {/* Location Drop Down list */}
        <LocationSelector />
        <SearchInput
          className="h-[52px] grow"
          placeholder="What awesome gift are you looking for?"
        />
        {/* User Drop Down list */}
        <UserDropDown />
        {/* just divider */}
        <Divider />
        {/* Icons Section */}
        <div className="flex gap-2.5">
          <Link href="#">
            <Heart size={24} />
          </Link>
          <Link href="#">
            <ShoppingCart size={24} />
          </Link>
          <NotificationDropDown />
        </div>

        <Divider />
        {/* Lnaguage drop down list */}
        <Language />
      </header>
      <NavBar />
    </>
  );
}
