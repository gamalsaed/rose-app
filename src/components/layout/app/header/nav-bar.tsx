import {
  House,
  Gift,
  ClipboardList,
  PartyPopper,
  Headset,
  CircleAlert,
} from "lucide-react";
import NavLink from "./nav-link";

const NAV_DATA = [
  {
    icon: House,
    lable: "Home",
    path: "/",
  },
  {
    icon: Gift,
    lable: "Products",
    path: "/products",
  },
  {
    icon: ClipboardList,
    lable: "Categories",
    path: "#",
  },
  {
    icon: PartyPopper,
    lable: "Occasions",
    path: "#",
  },
  {
    icon: Headset,
    lable: "Contact",
    path: "#",
  },
  {
    icon: CircleAlert,
    lable: "About",
    path: "#",
  },
];

export default function NavBar() {
  return (
    <nav className="bg-maroon-700 dark:bg-softPink-200 mt-2">
      <ul className="flex gap-4 justify-center">
        {NAV_DATA.map((navLink) => {
          return (
            <NavLink path={navLink.path} key={navLink.lable}>
              <navLink.icon />
              <span className="text-base">{navLink.lable}</span>
            </NavLink>
          );
        })}
      </ul>
    </nav>
  );
}
