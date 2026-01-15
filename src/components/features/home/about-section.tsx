import Image from "next/image";
import { SectionTitleLabel } from "./title-section";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check } from "lucide-react";

export default function AboutSection() {
  // variables
  const features = [
    {
      id: 1,
      text: "Competitive Prices & Easy Shopping",
    },
    {
      id: 2,
      text: "Premium Quality & Elegant Packaging",
    },
    {
      id: 3,
      text: "Perfect for Every Occasion",
    },
    {
      id: 4,
      text: "Fast & Reliable Delivery",
    },
  ];

  return (
    <section className="pt-34.75 px-20 flex gap-20">
      <div className=" mx-auto flex gap-2.5  ">
        {/* first */}
        <div
          className="relative w-[329.4px] before:content-['']
         before:absolute before:bottom-[8.5px] before:left-0 before:w-[268.8812343976346px]
          before:h-[363.00001189613016px] before:border-[4px] before:border-maroon-700
        before:dark:border-softPink-100 before:z-10 before:rounded-[120px] before:rounded-ss-[50px]
         before:rotate-[3.09deg] "
        >
          <Image
            width={302}
            height={0}
            alt="about1"
            src="/assets/images/home/about1.png"
            className="aspect-[302/344] absolute bottom-[8.5px] right-2 z-10 rounded-ss-[50px] rounded-[120px]  "
          />
        </div>

        {/* second */}
        <div className="flex flex-col gap-2.5 justify-center w-48">
          <Image
            width={193}
            height={0}
            alt="about2"
            src="/assets/images/home/about2.png"
            className="rounded-full w-full aspect-square"
          />

          <Image
            width={193}
            height={0}
            alt="about3"
            src="/assets/images/home/about3.png"
            className="rounded-s-[50px] rounded-e-[100px] w-full aspect-[193/144] object-cover "
          />
        </div>
      </div>

      {/* content */}
      <div className="relative flex-1 flex flex-col justify-center gap-6 mr-[42.5px]">
        <SectionTitleLabel label="About" />
        <div>
          <h2 className="text-3xl mb-1.5 leading-[100%] font-bold  pr-6 text-maroon-700 dark:text-softPink-200">
            Delivering the <span className="text-softPink-500"> Finest</span>{" "}
            Gift Boxes for Your{" "}
            <span className="text-softPink-500">Special</span>
            Moments
          </h2>
          <p className=" font-normal text-base text-zinc-500 dark:text-zinc-400">
            Make every moment memorable with our premium gift boxes. Carefully
            curated and beautifully packaged, each box is filled with handpicked
            items designed to impress. Whether it's for a birthday, wedding, or
            a simple “thank you,” our gift boxes are crafted to leave a lasting
            impression — because thoughtful gifting starts here.
          </p>
        </div>

        <Button className="flex align-center py-2.5 px-[18px] gap-2 mr-auto">
          Discover <ArrowRight className="w-4 h-4" />
        </Button>

        {/* features */}
        <ul className="grid grid-cols-2 gap-x-6 gap-y-6 text-zinc-800 dark:text-softPink-50">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center gap-2">
              <span className="flex items-center justify-center w-[42px] shrink-0">
                <Check className="w-5 h-5 text-maroon-700 dark:text-softPink-400" />
              </span>
              <p className="text-sm font-normal py-3.5">{feature.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
