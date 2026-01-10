import NavLink from "./nav-link";
import { NAV_DATA } from "@/lib/constants/paths";

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
