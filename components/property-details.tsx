import { IProperty } from "@/types/property.types";
import { Bath, Bed, Check, MapPin, Ruler, X } from "lucide-react";
import PropertyMap from "./property-map";

const PropertyDetails = ({ property }: { property: IProperty }) => {
  return (
    <main>
      <div className="border p-6 rounded-lg shadow-md text-center md:text-left">
        <div className="mb-4">{property.type}</div>
        <h1 className="text-3xl font-bold mb-4">{property.name}</h1>
        <div className="mb-4 flex align-middle justify-center md:justify-start items-center">
          <MapPin className="mr-2" />
          <p className="">
            {property.location.street}, {property.location.city}{" "}
            {property.location.zipcode}
          </p>
        </div>

        <h3 className="text-xl font-bold mt-12 mb-6">Rates & Options</h3>
        <div className="flex flex-col md:flex-row justify-around">
          <div className="flex items-center justify-center border-b border-gray-200 md:border-b-0 py-6 md:pb-0">
            <div className="mr-2 font-bold">Nightly</div>
            <div className="text-2xl font-bold">
              {property.rates.nightly ? (
                `$${property.rates.nightly.toLocaleString()}`
              ) : (
                <X className="text-destructive" />
              )}
            </div>
          </div>
          <div className="flex items-center justify-center border-b border-gray-200 md:border-b-0 py-6 md:pb-0">
            <div className="mr-2 font-bold">Weekly</div>
            <div className="text-2xl font-bold">
              {property.rates.weekly ? (
                `$${property.rates.weekly.toLocaleString()}`
              ) : (
                <X className="text-destructive" />
              )}
            </div>
          </div>
          <div className="flex items-center justify-center pt-6">
            <div className="mr-2 font-bold">Monthly</div>
            <div className="text-2xl font-bold">
              {property.rates.monthly ? (
                `$${property.rates.monthly.toLocaleString()}`
              ) : (
                <X className="text-destructive" />
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="border p-6 rounded-lg shadow-md mt-6">
        <h3 className="text-lg font-bold mb-6">Description & Details</h3>
        <div className="flex justify-center gap-4 mb-4 text-xl space-x-9">
          <div className="flex">
            <Bed className="mr-2" /> {property.beds}
            <span className="hidden sm:inline ml-1">Beds</span>
          </div>
          <div className="flex">
            <Bath className="mr-2" /> {property.baths}
            <span className="hidden sm:inline ml-1">Baths</span>
          </div>
          <div className="flex">
            <Ruler className="mr-2" />
            {property.square_feet}
            <span className="hidden sm:inline ml-1">sqft</span>
          </div>
        </div>
        <p className="mb-4">{property.description}</p>
      </div>

      <div className="border p-6 rounded-lg shadow-md mt-6">
        <h3 className="text-lg font-bold mb-6">Amenities</h3>

        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 list-none">
          {property.amenities.map((amenity, i) => (
            <li key={i} className="flex items-center">
              <Check className="mr-2" size={20} />
              {amenity}
            </li>
          ))}
        </ul>
      </div>
      {/* <!-- Map --> */}
      <div className="p-6 rounded-lg shadow-md mt-6">
        <PropertyMap property={property} />
      </div>
    </main>
  );
};

export default PropertyDetails;
