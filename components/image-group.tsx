"use client";
import { IProperty } from "@/types/property.types";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { ChangeEvent, useEffect, useState } from "react";
import Image from "next/image";
import { IImageGroup } from "./images-inputs";

export interface IImageGroupProps {
  file: string;
  alt: string;
}

const ImageGroup = ({
  defaultValue,
  num,
  cb,
}: {
  defaultValue: IImageGroup;
  num: number;
  cb: (type: "file" | "alt", num: number, val: string) => void;
}) => {
  const [imgFile, setImgFile] = useState("");
  const [imgAlt, setImgAlt] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    if (defaultValue && imgFile === "") {
      setImagePreview(defaultValue.file);
    }
  }, [defaultValue.file, setImagePreview, imgFile]);

  function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      setImgFile(file.name);
      cb("file", num, file.name);

      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  }

  function handleAltChange(e: ChangeEvent<HTMLInputElement>) {
    setImgAlt(e.target.value);
    cb("alt", num, e.target.value);
  }

  return (
    <div className=" w-full">
      <div className="mb-3">
        <Label htmlFor={`image${num}`}>{`Image ${num}`}</Label>
        {imagePreview && (
          <div className="my-3">
            <Image
              src={imagePreview}
              // alt={existingImg.alt}
              alt={`Image ${num}`}
              width={0}
              height={0}
              sizes="100vw"
              className="w-24 object-cover rounded-lg"
            />
          </div>
        )}

        <Input
          type="file"
          id={`image${num}`}
          name={`image${num}`}
          accept="image/*"
          onChange={handleFileChange}
        />
        <input
          className="sr-only"
          name={`existing_img${num}`}
          value={defaultValue.file}
          onChange={(e) => null}
        />
      </div>

      <div>
        <Label htmlFor={`image${num}_alt`}>{`Image ${num} description`}</Label>
        <Input
          type="text"
          id={`image${num}_alt`}
          name={`image${num}_alt`}
          placeholder="Single family house"
          value={imgAlt}
          onChange={handleAltChange}
        />
      </div>
    </div>
  );
};

export default ImageGroup;
