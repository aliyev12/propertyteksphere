"use server";
import connectDB from "@/config/database";
import Property from "@/models/Property";
import { getSessionUser } from "@/utils/getSessionUser";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { IPropertyData, processImage } from "./add-property";

async function editProperty(propertyId: string, formData: FormData) {
  await connectDB();

  const sessionUser = await getSessionUser();

  if (!sessionUser || !sessionUser.userId) {
    throw new Error("User ID is required");
  }

  const { userId } = sessionUser;

  const existingProperty = await Property.findById(propertyId);

  // Verify ownership
  if (existingProperty && existingProperty?.owner.toString() !== userId) {
    throw new Error("Current user does not own this property");
  }

  const amenities = formData.getAll("amenities");

  const propertyData: IPropertyData = {
    owner: userId,
    type: formData.get("type"),
    name: formData.get("name"),
    description: formData.get("description"),
    location: {
      street: formData.get("location.street"),
      city: formData.get("location.city"),
      state: formData.get("location.state"),
      zipcode: formData.get("location.zipcode"),
    },
    beds: formData.get("beds"),
    baths: formData.get("baths"),
    square_feet: formData.get("square_feet"),
    amenities,
    rates: {
      nightly: formData.get("rates.nightly"),
      weekly: formData.get("rates.weekly"),
      monthly: formData.get("rates.monthly"),
    },
    seller_info: {
      name: formData.get("seller_info.name"),
      email: formData.get("seller_info.email"),
      phone: formData.get("seller_info.phone"),
    },
  };

  const imageInputs = {
    image1: {
      input: formData.get("image1"),
      existing: formData.get("existing_img1"),
    },
    image2: {
      input: formData.get("image2"),
      existing: formData.get("existing_img2"),
    },
    image3: {
      input: formData.get("image3"),
      existing: formData.get("existing_img3"),
    },
    image4: {
      input: formData.get("image4"),
      existing: formData.get("existing_img4"),
    },
  };

  const finalImgUrls: string[] = [];

  for (let index = 0; index < Object.keys(imageInputs).length; index++) {
    const key = Object.keys(imageInputs)[index];
    const item = imageInputs[key as keyof typeof imageInputs];

    if (item.existing) {
      finalImgUrls.push(item.existing.toString());
    } else if (item.input) {
      if (
        item.input instanceof File &&
        item.input.name !== "" &&
        item.input.size > 0
      ) {
        const uploadedImgUrl = await processImage(item.input);
        finalImgUrls.push(uploadedImgUrl);
      }
    }
  }

  propertyData.images = finalImgUrls;

  const updatedProperty = await Property.findByIdAndUpdate(
    propertyId,
    propertyData
  );

  revalidatePath("/", "layout");

  if (updatedProperty) {
    redirect(`/properties/${updatedProperty._id}`);
  }
}

export default editProperty;
