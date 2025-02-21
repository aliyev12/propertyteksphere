import connectDB from "@/config/database";
import Property from "@/models/Property";
import { IProperty } from "@/types/property.types";
import FeaturedPropertyCard from "./featured-property-card";

const FeaturedProperties = async () => {
  await connectDB();

  const properties = (await Property.find({
    is_featured: true,
  }).lean()) as unknown as IProperty[];

  return properties.length > 0 ? (
    <section className="px-4 pt-6 pb-10">
      <div className="container-xl lg:container m-auto">
        <h2 className="text-3xl font-bold mb-6 text-center">
          Featured Properties
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {properties.map((property, i) => (
            <FeaturedPropertyCard key={i} property={property} />
          ))}
        </div>
      </div>
    </section>
  ) : null;
};

export default FeaturedProperties;
