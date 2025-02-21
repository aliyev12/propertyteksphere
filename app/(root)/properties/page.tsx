import connectDB from "@/config/database";
import Property from "@/models/Property";
import PropertyCard from "@/components/property-card";
import { IProperty } from "@/types/property.types";

const PropertiesPage = async ({
  searchParams,
}: {
  searchParams: Promise<{
    page: string;
    pageSize: string;
  }>;
}) => {
  const { page = "1", pageSize = "2" } = await searchParams;
  await connectDB();
  const skip = (Number(page) - 1) * Number(pageSize);
  const total = await Property.countDocuments({});

  const properties = (await Property.find({})
    .skip(skip)
    .limit(Number(pageSize))) as unknown as IProperty[];

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="container-xl lg:container m-auto py-6">
        {properties.length === 0 ? (
          <p>No properties found</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((property, i) => (
              <PropertyCard key={i} property={property} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default PropertiesPage;
