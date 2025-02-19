"use client";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Label } from "./ui/label";

const PropertySearchForm = () => {
  const [location, setLocation] = useState("");
  const [propertyType, setPropertyType] = useState("All");
  const router = useRouter();

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (location === "" && propertyType === "All") {
      router.push("/properties");
    } else {
      const query = `?location=${location}&propertyType=${propertyType}`;
      router.push(`/properties/search-results${query}`);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-3 mx-auto max-w-2xl w-full flex flex-col md:flex-row items-center"
    >
      <div className="w-full md:w-3/5 md:pr-2 mb-4 md:mb-0">
        <label htmlFor="location" className="sr-only">
          Location
        </label>
        <Input
          type="text"
          id="location"
          placeholder="Enter Location (City, State, Zip, etc)"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>
      <div className="w-full md:w-2/5 md:pl-2">
        <Label htmlFor="property-type" className="sr-only">
          Property Type
        </Label>
        <Select
          value={propertyType}
          onValueChange={(val) => setPropertyType(val)}
        >
          <SelectTrigger id="property-type">
            <SelectValue placeholder="Select property type" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Property Type</SelectLabel>
              <SelectItem value="All">All</SelectItem>
              <SelectItem value="Apartment">Apartment</SelectItem>
              <SelectItem value="Studio">Studio</SelectItem>
              <SelectItem value="Condo">Condo</SelectItem>
              <SelectItem value="House">House</SelectItem>
              <SelectItem value="Cabin Or Cottage">Cabin or Cottage</SelectItem>
              <SelectItem value="Loft">Loft</SelectItem>
              <SelectItem value="Room">Room</SelectItem>
              <SelectItem value="Other">Other</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <Button
        variant="outline"
        type="submit"
        className="md:ml-4 mt-4 md:mt-0 w-full md:w-auto"
      >
        Search
      </Button>
    </form>
  );
};

export default PropertySearchForm;
