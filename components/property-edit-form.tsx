import addProperty from "@/app/actions/add-property";
import PropertyForm from "./property-form";
import editProperty from "@/app/actions/edit-property";

const PropertyEditForm = ({ property }: any) => {
  const editPropertyById = editProperty.bind(null, property._id);

  return (
    <PropertyForm
      action={editPropertyById}
      header="Update Property"
      property={property}
      submitBtnTxt="Update property"
    />
  );
};

export default PropertyEditForm;
