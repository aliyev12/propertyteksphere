"use client";
import { IProperty } from "@/types/property.types";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import ImageGroup, { IImageGroupProps } from "./image-group";
import { Plus, Trash } from "lucide-react";

export interface IImageGroup {
  id: string;
  file: string;
  alt: string;
  active: boolean;
  isNew: boolean;
}

const ImagesInputs = ({ property }: { property?: IProperty }) => {
  const [imageGroups, setImageGroups] = useState<IImageGroup[]>([
    {
      id: "image1",
      file: "",
      alt: "",
      active: true,
      isNew: true,
    },
    {
      id: "image2",
      file: "",
      alt: "",
      active: false,
      isNew: true,
    },
    {
      id: "image3",
      file: "",
      alt: "",
      active: false,
      isNew: true,
    },
    {
      id: "image4",
      file: "",
      alt: "",
      active: false,
      isNew: true,
    },
  ]);

  useEffect(() => {
    if (
      property &&
      property.images &&
      Array.isArray(property.images) &&
      property.images.length
    ) {
      const newImageGroups = [...imageGroups];
      property.images.forEach((img, i) => {
        const foundIndex = newImageGroups.findIndex(
          (x) => x.id === `image${i + 1}`
        );
        if (foundIndex !== -1) {
          newImageGroups[foundIndex].active = true;
          newImageGroups[foundIndex].file = img;
          newImageGroups[foundIndex].isNew = false;
        }
      });

      setImageGroups(newImageGroups);
    }
  }, [property, setImageGroups]);

  function handleAddNewImgGroup() {
    const newImgGroups = [...imageGroups];
    let lastActiveIndex = 0;
    newImgGroups.forEach((x, i) => {
      if (x.active) {
        lastActiveIndex = i;
      }
    });

    if (lastActiveIndex === 3) return;

    newImgGroups[lastActiveIndex + 1].active = true;
    setImageGroups(newImgGroups);
  }

  function receiveImgData(
    type: "file" | "alt",
    imgNum: number,
    imgData: string
  ) {
    const newImageGroups = [...imageGroups];
    const foundIndex = newImageGroups.findIndex(
      (x) => x.id === `image${imgNum}`
    );
    if (foundIndex !== -1) {
      if (type === "file") {
        newImageGroups[foundIndex].file = imgData;
        newImageGroups[foundIndex].isNew = true;
      }
      if (type === "alt") {
        newImageGroups[foundIndex].alt = imgData;
      }
    }
    setImageGroups(newImageGroups);
  }

  function allActiveImgsAreValid() {
    let isValid = true;
    const activeImgs = imageGroups.filter((x) => x.active);
    activeImgs.forEach((img) => {
      if (img.file === "") {
        isValid = false;
      }
    });
    return isValid;
  }

  function isAddImgBtnDisabled() {
    const noMoreImgsToAdd = imageGroups.filter((x) => x.active).length === 4;
    if (noMoreImgsToAdd) return true;
    if (!allActiveImgsAreValid()) return true;
    return false;
  }

  function handleRemoveImgGroup(imgNum: number) {
    const newImageGroups = [...imageGroups];
    const foundIndex = newImageGroups.findIndex(
      (x) => x.id === `image${imgNum}`
    );

    newImageGroups[foundIndex].file = "";
    newImageGroups[foundIndex].alt = "";
    newImageGroups[foundIndex].active = false;

    setImageGroups(newImageGroups);
  }

  return (
    <div className="mt-8">
      <h3 className="text-2xl">Add at least 1 and up to 4 images</h3>
      <div className="space-y-4 mt-4">
        {imageGroups
          .filter((x) => x.active)
          .map((group, i) => {
            const defaultValue =
              group.isNew === false
                ? group
                : {
                    ...group,
                    file: "",
                    alt: "",
                  };

            return (
              <div
                key={i}
                className="flex flex-col items-center justify-center w-full shadow-lg border bg-gray-100 rounded-lg p-3"
              >
                <ImageGroup
                  num={i + 1}
                  cb={receiveImgData}
                  defaultValue={defaultValue}
                />
                {i > 0 && (
                  <div className="flex justify-end w-full mt-4 ">
                    <Button
                      variant="destructive"
                      type="button"
                      onClick={() => handleRemoveImgGroup(i + 1)}
                      disabled={i === 0}
                    >
                      <Trash /> Remove image
                    </Button>
                  </div>
                )}
              </div>
            );
          })}
      </div>
      <div className="flex justify-end mt-4">
        <Button
          type="button"
          onClick={handleAddNewImgGroup}
          disabled={isAddImgBtnDisabled()}
        >
          <Plus /> Add more images
        </Button>
      </div>
    </div>
  );
};

export default ImagesInputs;
