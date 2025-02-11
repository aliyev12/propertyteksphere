"use client";
import { useState } from "react";
import { IProperty } from "@/types/property.types";
import Image from "next/image";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { X } from "lucide-react";

const ImageInput = ({ property }: { property: IProperty }) => {
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [existingImages, setExistingImages] = useState<string[]>(
    property?.images || []
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedImages([...selectedImages, ...Array.from(e.target.files)]);
    }
  };

  const removeImage = (index: number, type: "existing" | "new") => {
    if (type === "existing") {
      setExistingImages(existingImages.filter((_, i) => i !== index));
    } else {
      setSelectedImages(selectedImages.filter((_, i) => i !== index));
    }
  };

  return (
    <>
      <div className="mb-4">
        <Label htmlFor="images">Images (Select up to 4 images)</Label>
        <Input
          type="file"
          id="images"
          name="images"
          accept="image/*"
          multiple
          // required
          onChange={handleFileChange}
        />
      </div>
      {/* Display existing images */}
      {existingImages.length > 0 && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">Current Images</h3>
          <ul className="flex gap-4">
            {existingImages.map((img, i) => (
              <li key={i} className="relative">
                <Image
                  className="h-20 w-20 rounded-md object-cover"
                  src={img}
                  alt={`Property Image ${i + 1}`}
                  width={0}
                  height={0}
                  sizes="100vw"
                />
                <button
                  type="button"
                  onClick={() => removeImage(i, "existing")}
                  className="absolute -top-1 -right-1 bg-red-500 hover:bg-red-700 text-white p-1 rounded-full"
                >
                  <X />
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Display new images */}
      {selectedImages.length > 0 && (
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-2">New Images</h3>
          <ul className="flex gap-4">
            {selectedImages.map((file, i) => (
              <li key={i} className="relative">
                <Image
                  className="h-20 w-20 rounded-md object-cover"
                  src={URL.createObjectURL(file)}
                  alt={`New Image ${i + 1}`}
                  width={0}
                  height={0}
                  sizes="100vw"
                />
                <button
                  type="button"
                  onClick={() => removeImage(i, "new")}
                  className="absolute -top-1 -right-1 bg-red-500 hover:bg-red-700 text-white p-1 rounded-full"
                >
                  <X />
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default ImageInput;
