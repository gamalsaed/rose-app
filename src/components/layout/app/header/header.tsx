'use client'
import Image from "next/image";
import SearchInput from "@/components/shared/search-input";
import UserDropDown from "./user-dropdown";
import { Link } from "@/i18n/navigation";
import { Heart, ShoppingCart } from "lucide-react";
import NotificationDropDown from "./notification-dropdown";
import LocationSelector from "./location-selector";
import NavBar from "./nav-bar";
import { Separator } from "@/components/ui/separator";
import { LanguageSwitcher } from "@/components/shared/language-switcher";
import { useContext } from "react";
import { CartContext } from "@/lib/context/CartContext";
import { getAllAddresses } from "@/lib/apis/address.api";
import { getUserToken } from '@/lib/utilits/get-token';

export default function Header() {
  const {numberOfCartItem} = useContext(CartContext) ?? {}
   const addresses = await getAllAddresses();
   const token = await getUserToken();
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
        {token && <LocationSelector addresses={addresses} />}
        <SearchInput
          className="h-14 grow"
          placeholder="What awesome gift are you looking for?"
        />
        {/* User Drop Down list & Login Popover */}
        <UserDropDown />
        {/* just divider */}
        <Separator orientation="vertical" className="h-12" />
        {/* Icons Section */}
        <div className="flex gap-2.5">
          <Link href="#">
            <Heart size={24} />
          </Link>
          <Link className=" abosulte" href="/cart">
            <ShoppingCart  size={24} /> <span className=" relative bottom-10 left-3 text-maroon-500">{numberOfCartItem}</span>
          </Link>
          <NotificationDropDown />
        </div>

        <Separator orientation="vertical" className="h-12" />
        {/* Language drop down list */}
        <LanguageSwitcher />
      </header>

      <NavBar />
    </>
  );
}
