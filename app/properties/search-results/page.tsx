import connectDB from "@/config/database";
import Property from "@/models/Property";
import { IProperty } from "@/types/property.types";
import { convertToSerializableObject } from "@/utils/convertToObject";
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
      { name: { $regex: location, $options: "i" } }, // Explicit RegExp
      { description: { $regex: location, $options: "i" } }, // Explicit RegExp
      { "location.street": { $regex: location, $options: "i" } }, // Explicit RegExp
      { "location.city": { $regex: location, $options: "i" } }, // Explicit RegExp
      { "location.state": { $regex: location, $options: "i" } }, // Explicit RegExp
      { "location.zipcode": { $regex: location, $options: "i" } }, // Explicit RegExp
    ],
  };

  if (propertyType && propertyType !== "All") {
    query.type = { $regex: propertyType, $options: "i" }; // Explicit RegExp
  }

  const propertiesQueryResults = await Property.find(query).lean();
  const properties = convertToSerializableObject(propertiesQueryResults);

  console.log("locationPattern = ", locationPattern);
  console.log("location = ", location);
  console.log("query = ", JSON.stringify(query, null, 2)); // Better logging

  console.log("properties = ", properties);
  return <div>SearchResultsPage</div>;
};

export default SearchResultsPage;
