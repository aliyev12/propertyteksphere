import properties from "@/properties.json";
import PropertyCard from "./property-card";
import { IProperty } from "@/types/property.types";
import Link from "next/link";
import { Button } from "./ui/button";

const HomeProperties = () => {
  const recentProperties = properties.slice(0, 3);

  return (
    <>
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="container-xl lg:container m-auto">
          <h2 className="text-3xl font-bold  mb-6 text-center">
            Recent Properties
          </h2>
          {properties.length === 0 ? (
            <p>No properties found</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {(recentProperties as IProperty[]).map((property) => (
                <PropertyCard key={property._id} property={property} />
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="flex flex-col items-center justify-center">
        <Button asChild size="lg">
          <Link href="/properties">View all properties</Link>
        </Button>
      </section>
    </>
  );
};

export default HomeProperties;
