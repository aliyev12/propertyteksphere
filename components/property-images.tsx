import Image from "next/image";

const PropertyImages = ({ images }: { images: string[] }) => {
  if (!images || !Array.isArray(images) || !images.length) return null;

  return (
    <section className="">
      <div className="container mx-auto">
        {images.length === 1 ? (
          <Image
            src={images[0]}
            alt="Main Property Image"
            className="object-cover h-[400px] mx-auto rounded-xl"
            width={1800}
            height={400}
            priority={true}
          />
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {images.map((image, i) => (
              <div
                key={i}
                className={`${
                  images.length === 3 && i === 2 ? "col-span-2" : "col-span-1"
                }`}
              >
                <Image
                  src={image}
                  alt={`Property Image ${i + 1}`}
                  className="object-cover h-[400px] w-full rounded-xl"
                  width={1800}
                  height={400}
                  priority={true}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default PropertyImages;
