import Image from "next/image";

const PropertyHeaderImage = ({
  image,
  imageAlt,
}: {
  image: string;
  imageAlt: string;
}) => {
  if (!image) return null;

  return (
    <section>
      <div className="container-xl m-auto">
        <div className="grid grid-cols-1">
          <Image
            src={image}
            alt={imageAlt}
            className="object-cover h-[400px] w-full"
            width={0}
            height={0}
            sizes="100vw"
          />
        </div>
      </div>
    </section>
  );
};

export default PropertyHeaderImage;
