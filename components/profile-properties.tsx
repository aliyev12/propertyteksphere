"use client";
import { useState } from "react";
import { IProperty } from "@/types/property.types";
import { Button } from "./ui/button";
import Link from "next/link";
import Image from "next/image";
import deleteProperty from "@/app/actions/delete-property";
import { toast } from "react-toastify";

const ProfileProperties = ({
  properties: initialProperties,
}: {
  properties: IProperty[];
}) => {
  const [properties, setProperties] = useState<IProperty[]>(initialProperties);

  async function handleDeleteProperty(propertyId: string) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this property?"
    );

    if (!confirmed) return;

    await deleteProperty(propertyId);

    const updatedProperties = properties.filter(
      (x) => x._id.toString() !== propertyId
    );

    setProperties(updatedProperties);

    toast.success("Property deleted successfully");
  }

  return properties.map((property, i) => (
    <div className="mb-10" key={i}>
      <Link href={`/properties/${property._id}`}>
        <Image
          className="h-32 w-full rounded-md object-cover"
          src={property.images[0]}
          alt={`Property ${i + 1}`}
          width={0}
          height={0}
          sizes="100vw"
        />
      </Link>
      <div className="mt-2">
        <p className="text-lg font-semibold">{property.name}</p>
        <p className="">
          Address: {property.location.street}, {property.location.city},{" "}
          {property.location.state}
        </p>
      </div>
      <div className="mt-2 space-x-3">
        <Button asChild variant="default">
          <Link href={`/properties/${property._id}/edit`}>Edit</Link>
        </Button>
        <Button
          variant="destructive"
          onClick={() => handleDeleteProperty(property._id.toString())}
        >
          Delete
        </Button>
      </div>
    </div>
  ));
};

export default ProfileProperties;
