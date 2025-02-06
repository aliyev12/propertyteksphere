"use client";
import { useState } from "react";
import { IProperty } from "@/types/property.types";
import { Button } from "./ui/button";
import Link from "next/link";
import Image from "next/image";

const ProfileProperties = ({
  properties: initialProperties,
}: {
  properties: IProperty[];
}) => {
  const [properties, setProperties] = useState(initialProperties);

  return properties.map((property, i) => (
    <div className="mb-10" key={i}>
      <a href="/property.html">
        <Image
          className="h-32 w-full rounded-md object-cover"
          src={property.images[0]}
          alt={`Property ${i + 1}`}
          width={0}
          height={0}
          sizes="100vw"
        />
      </a>
      <div className="mt-2">
        <p className="text-lg font-semibold">{property.name}</p>
        <p className="">
          Address: {property.location.street}, {property.location.city},{" "}
          {property.location.state}
        </p>
      </div>
      <div className="mt-2 space-x-3">
        <Button asChild variant="default">
          <Link href="/properties/add">Edit</Link>
        </Button>
        <Button variant="destructive">Delete</Button>
      </div>
    </div>
  ));
};

export default ProfileProperties;
