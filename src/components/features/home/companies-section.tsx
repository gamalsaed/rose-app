import Image from "next/image";
import { Link } from "@/i18n/navigation";

export default function CompaniesSection() {
  // Companies
  const companies = [
    {
      title: "Coconut",
      image: "coconut.png",
      href: "#",
    },
    {
      title: "Ginyard",
      image: "ginyard.png",
      href: "#",
    },
    {
      title: "Lngoude",
      image: "lngoude.png",
      href: "#",
    },
    {
      title: "Velvet",
      image: "velvet.png",
      href: "#",
    },
    {
      title: "InGoude",
      image: "ingoude.png",
      href: "#",
    },
    {
      title: "habus",
      image: "habus.png",
      href: "#",
    },
  ];

  return (
    <section className="pt-34.75 pb-[359px]">
      <div className="mx-auto px-20">
        <div className=" bg-maroon-50 dark:bg-zinc-700 px-6 py-10 rounded-[20px] text-center">
          {/* Title */}
          <h2 className=" font-bold text-4xl text-maroon-700 dark:text-softPink-200">
            Trusted by over{" "}
            <span className="text-pink-500 dark:text-maroon-400">4.5k+</span>{" "}
            companies
          </h2>

          {/* Logos*/}
          <div className="flex justify-between gap-10 mt-10">
            {companies.map((company) => (
              <Link href={company.href} key={company.title}>
                <Image
                  width={149}
                  height={100}
                  alt={company.title}
                  src={`/assets/images/home/${company.image}`}
                  className="cursor-pointer"
                  key={company.title}
                />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
