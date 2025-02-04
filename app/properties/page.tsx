import properties from "@/properties.json";
import PropertyCard from "@/components/property-card";
import { IProperty } from "@/types/property.types";

const PropertiesPage = () => {
  console.log("properties = ", properties);
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="container-xl lg:container m-auto py-6">
        {properties.length === 0 ? (
          <p>No properties found</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(properties as IProperty[]).map((property) => (
              <PropertyCard key={property._id} property={property} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default PropertiesPage;
