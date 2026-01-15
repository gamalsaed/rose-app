import Image from "next/image";
import SectionTitle from "./title-section";

export default function GallerySection() {
  // variables
  const images = [
    {
      src: "/assets/images/home/gallery1.png",
      aspect: "aspect-[418/615]",
    },
    {
      src: "/assets/images/home/gallery2.png",
      aspect: "aspect-[418/406]",
    },
    {
      src: "/assets/images/home/gallery3.png",
      aspect: "aspect-[419/411]",
    },
    {
      src: "/assets/images/home/gallery4.png",
      aspect: "aspect-[419/611]",
    },
    {
      src: "/assets/images/home/gallery5.png",
      aspect: "aspect-[419/411]",
    },
    {
      src: "/assets/images/home/gallery6.png",
      aspect: "aspect-[419/611]",
    },
  ];

  return (
    <section className="py-34.75">
      <div className=" mx-auto px-20 ">
        {/* gallery */}
        <SectionTitle
          label="Gallery"
          title="Check Out our Wonderful Gallery"
        />

        {/* gallery masonry  */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-x-[13px]">
          {images.map((image, index) => (
            <div
              key={index}
              className={`mb-[15px] relative w-full ${image.aspect} break-inside-avoid`}
            >
              <Image
                src={image.src}
                fill
                alt={`Gallery image ${index + 1}`}
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
