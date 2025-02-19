import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import connectDB from "@/config/database";
import Property from "@/models/Property";
import { IProperty } from "@/types/property.types";
import { convertToSerializableObject } from "@/utils/convertToObject";
import { AlertCircle, ArrowLeft, Construction } from "lucide-react";
import { Query, Types } from "mongoose";
import Link from "next/link";
import PropertyCard from "@/components/property-card";
import PropertySearchForm from "@/components/property-search-form";
import { CircleArrowLeft } from "lucide-react";

interface ISearchResultsPageProps {
  searchParams: Promise<{
    location: string;
    propertyType: string;
  }>;
}

interface IPropertyQuery {
  $or?: [
    { name: RegExp },
    { description: RegExp },
    { "location.street": RegExp },
    { "location.city": RegExp },
    { "location.state": RegExp },
    { "location.zipcode": RegExp }
  ];
  type?: RegExp;
}

const SearchResultsPage = async ({ searchParams }: ISearchResultsPageProps) => {
  const { location, propertyType } = await searchParams;
  await connectDB();

  const locationPattern = new RegExp(location, "i");

  let query: IPropertyQuery = {
    $or: [
      { name: new RegExp(location, "i") },
      { description: new RegExp(location, "i") },
      { "location.street": new RegExp(location, "i") },
      { "location.city": new RegExp(location, "i") },
      { "location.state": new RegExp(location, "i") },
      { "location.zipcode": new RegExp(location, "i") },
    ],
  };

  if (propertyType && propertyType !== "All") {
    query.type = new RegExp(propertyType, "i");
  }

  const propertiesQueryResults = await Property.find(query).lean();
  const properties = convertToSerializableObject(
    propertiesQueryResults
  ) as IProperty[];

  return (
    <>
      <section className="py-4">
        <div className="max-w-7xl mx-auto px-4 flex flex-col items-start sm:px-6 lg:px-8">
          <PropertySearchForm />
        </div>
      </section>
      <section className="px-4 py-6">
        <div className="container-xl lg:container m-auto px-4 py-6">
          <Link href="/properties" className="link flex items-center mb-3">
            <ArrowLeft size={18} className="mr-2" />
            Back to properties
          </Link>
          <h1 className="text-2xl mb-4">Search Results</h1>
          {properties.length === 0 ? (
            <p>No search results</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {properties.map((property, i) => (
                <PropertyCard key={i} property={property} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default SearchResultsPage;
