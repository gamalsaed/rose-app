import Image from "next/image";
import Link from "next/link";
import { NAV_DATA } from "@/lib/constants/paths";
import Subscribe from "./subscribe";
const PATHS = [
  ...NAV_DATA,
  {
    lable: "Terms & Conditions",
    path: "#",
  },
  {
    lable: "Privacy Policy",
    path: "#",
  },
  {
    lable: "FAQs",
    path: "#",
  },
];

export default function Footer() {
  return (
    <footer className="bg-zinc-800 dark:bg-zinc-900 w-full px-20 py-10 flex justify-between">
      <div className="flex gap-8">
        <div className="flex flex-col items-center w-fit">
          <Image
            width={240}
            height={225}
            alt="logo"
            src="/assets/images/logo.svg"
            className="mb-5"
          />
          <p className="text-softPink-300 text-lg font-semibold">
            Rose E-Commerce App
          </p>
          <p className="text-zinc-100 text-sm">All rights reserved | 2025</p>
        </div>
        <div>
          <h3 className="text-softPink-300 text-lg font-semibold">
            Discover our website
          </h3>
          <ul>
            {PATHS.map((item) => {
              return (
                <li className="text-zinc-100">
                  <Link href={item.path}>{item.lable}</Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <div className="flex-1 max-w-96">
        <h1 className="text-softPink-300 font-semibold text-xl">
          Get <span className="text-maroon-50">20%</span> Off Discount Coupon
        </h1>
        <p className="text-zinc-500 text-sm mb-5">
          By subscribing to our newsletter
        </p>
        <Subscribe />
      </div>
    </footer>
  );
}
