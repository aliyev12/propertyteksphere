import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import connectDB from "@/config/database";
import Property from "@/models/Property";
import { IProperty } from "@/types/property.types";
import { convertToSerializableObject } from "@/utils/convertToObject";
import { AlertCircle, Construction } from "lucide-react";
import { Query, Types } from "mongoose";

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
      { name: new RegExp(location, "i") }, // Using RegExp directly
      { description: new RegExp(location, "i") }, // Using RegExp directly
      { "location.street": new RegExp(location, "i") }, // Using RegExp directly
      { "location.city": new RegExp(location, "i") }, // Using RegExp directly
      { "location.state": new RegExp(location, "i") }, // Using RegExp directly
      { "location.zipcode": new RegExp(location, "i") }, // Using RegExp directly
    ],
  };

  if (propertyType && propertyType !== "All") {
    query.type = new RegExp(propertyType, "i"); // Using RegExp directly
  }

  const propertiesQueryResults = await Property.find(query).lean();
  const properties = convertToSerializableObject(propertiesQueryResults);

  console.log("locationPattern = ", locationPattern);
  console.log("location = ", location);
  console.log("query = ", JSON.stringify(query, null, 2)); // Better logging

  console.log("properties = ", properties);
  return (
    <section className="w-full px-6 flex justify-center">
      <div className=" max-w-3xl">
        <Alert variant="default">
          <Construction className="h-4 w-4" />
          <AlertTitle>Under Construction</AlertTitle>
          <AlertDescription>
            Sorry, this page is still being built. Please, check back soon.
          </AlertDescription>
        </Alert>
      </div>
    </section>
  );
};

export default SearchResultsPage;
