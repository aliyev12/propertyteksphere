import { IProperty } from "@/types/property.types";
import { Bath, Bed, CircleDollarSign, MapPin, Ruler } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { getRateDisplay } from "./property-card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

const FeaturedPropertyCard = ({ property }: { property: IProperty }) => {
  return (
    <div className="rounded-xl shadow-md border relative flex flex-col md:flex-row">
      <Image
        src={property.images[0]}
        alt="Property Image"
        className="w-full h-auto rounded-t-xl md:rounded-tr-none md:rounded-l-xl md:w-2/5 object-cover"
        width={0}
        height={0}
        sizes="100vw"
      />
      <div className="p-4">
        <div className="text-left md:text-center lg:text-left mb-6">
          <Badge variant="outline" className="mb-3">
            {property.type}
          </Badge>
          <h3 className="text-xl font-bold">{property.name}</h3>
        </div>
        <Badge
          variant="secondary"
          className="absolute top-[10px] left-[10px] text-2xl"
        >
          {getRateDisplay(property)}
        </Badge>

        <div className="flex justify-center gap-4  mb-4">
          <div className="flex flex-col items-center border border-gray-100 rounded-xl p-2">
            <Bed size={30} className="mb-1" />
            <span className="whitespace-nowrap">{property.beds} Beds</span>
          </div>
          <div className="flex flex-col items-center border border-gray-100 rounded-xl p-2">
            <Bath size={30} className="mb-1" />
            <span className="whitespace-nowrap">{property.baths} Baths</span>
          </div>
          <div className="flex flex-col items-center border border-gray-100 rounded-xl p-2">
            <Ruler size={30} className="mb-1" />
            <span className="whitespace-nowrap">
              {property.square_feet} sqft
            </span>
          </div>
        </div>

        <div className="flex justify-center gap-5 text-sm mb-4">
          {property.rates.nightly && (
            <p className="flex items-center">
              <CircleDollarSign className="mr-2" /> Nightly
            </p>
          )}
          {property.rates.weekly && (
            <p className="flex items-center">
              <CircleDollarSign className="mr-2" /> Weekly
            </p>
          )}
          {property.rates.monthly && (
            <p className="flex items-center">
              <CircleDollarSign className="mr-2" /> Monthly
            </p>
          )}
        </div>

        <div className="border-b border-b-gray-100 mb-4"></div>

        <div className="flex flex-col lg:flex-row justify-between lg:items-center">
          <div className="flex align-middle gap-2 mb-4 lg:mb-0">
            <MapPin />
            <span className="">
              {property.location.city} {property.location.state}
            </span>
          </div>
          <Button asChild>
            <Link href={`/properties/${property._id}`}>Details</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FeaturedPropertyCard;

// <div className="p-6">
// <h3 className="text-xl font-bold">{property.name}</h3>
// <p className="mb-4">{property.type}</p>
// <h3 className="absolute top-[10px] left-[10px] px-4 py-2 rounded-lg font-bold text-right md:text-center lg:text-right">
//   {property.rates.weekly}
// </h3>
// <div className="flex justify-center gap-4 mb-4">
//   <p>
//     <Bed /> {property.beds}{" "}
//     <span className="md:hidden lg:inline">Beds</span>
//   </p>
//   <p>
//     <Bath /> {property.baths}{" "}
//     <span className="md:hidden lg:inline">Baths</span>
//   </p>
//   <p>
//     <Ruler /> {property.square_feet}{" "}
//     <span className="md:hidden lg:inline">sqft</span>
//   </p>
// </div>
// <div className="flex justify-center gap-4 test-sm mb-4">
//   <p>
//     <DollarSign /> Nightly
//   </p>
//   <p>
//     <DollarSign /> Weekly
//   </p>
// </div>

// <div className="border mb-5"></div>

// <div className="flex flex-col lg:flex-row justify-between">
//   <div className="flex align-middle gap-2 mb-4 lg:mb-0">
//     <MapPin />
//     <span>
//       {property.location.city} {property.location.state}
//     </span>
//   </div>
//   <Button asChild>
//     <Link href={`/properties/${property._id}`}>Details</Link>
//   </Button>
// </div>
// </div>
