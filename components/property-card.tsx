import { IProperty } from "@/types/property.types";
import Image from "next/image";
import Link from "next/link";
import {
  Bed,
  Bath,
  Ruler,
  Receipt,
  MapPin,
  CircleDollarSign,
} from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

const PropertyCard = ({ property }: { property: IProperty }) => {
  const getRateDisplay = () => {
    const { rates } = property;

    if (rates.monthly) {
      return `$${rates.monthly.toLocaleString()} month`;
    } else if (rates.weekly) {
      return `$${rates.weekly.toLocaleString()} week`;
    } else if (rates.nightly) {
      return `$${rates.nightly.toLocaleString()} night`;
    }
  };

  return (
    <div className="rounded-xl shadow-md border relative">
      {property.images[0] && (
        <Image
          src={property.images[0]}
          alt=""
          width={0}
          height={0}
          sizes="100vw"
          className="w-full h-[250px] rounded-t-xl"
        />
      )}
      <div className="p-4">
        <div className="text-left md:text-center lg:text-left mb-6">
          <Badge variant="outline" className="mb-3">
            {property.type}
          </Badge>
          <h3 className="text-xl font-bold">{property.name}</h3>
        </div>
        <Badge
          variant="secondary"
          className="absolute top-[10px] right-[10px] text-2xl"
        >
          {getRateDisplay()}
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
          <p className="flex items-center">
            <CircleDollarSign className="mr-2" /> Weekly
          </p>
          <p className="flex items-center">
            <CircleDollarSign className="mr-2" /> Monthly
          </p>
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

export default PropertyCard;
