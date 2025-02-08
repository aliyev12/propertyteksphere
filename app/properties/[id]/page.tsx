import connectDB from "@/config/database";
import Property from "@/models/Property";
import PropertyHeaderImage from "@/components/property-header-image";
import { IProperty } from "@/types/property.types";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import PropertyDetails from "@/components/property-details";
import PropertyImages from "@/components/property-images";
import { convertToSerializableObject } from "@/utils/convertToObject";

interface IPropertyPageProps {
  params: Promise<{ id: string }>;
}

const PropertyPage = async ({ params }: IPropertyPageProps) => {
  await connectDB();
  const id = (await params).id;
  const propertyDoc = await Property.findById(id).lean();

  const property = convertToSerializableObject(propertyDoc);

  if (!property)
    return (
      <h1 className="text-center text-2xl font-bold mt-10">
        Property Not Found
      </h1>
    );

  return (
    <div className="space-y-10 lg:space-y-16">
      <PropertyHeaderImage
        image={property.images[0]}
        imageAlt={property.name}
      />
      <section>
        <div className="container m-auto  max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/properties" className="flex  items-center">
            <ArrowLeft className="mr-2" size={18} /> Back to Properties
          </Link>
        </div>
      </section>

      <section className="">
        <div className="container m-auto  max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-70/30 w-full gap-6">
            <PropertyDetails property={property} />
          </div>
        </div>
      </section>
      <PropertyImages images={property.images} />
    </div>
  );
};

export default PropertyPage;
