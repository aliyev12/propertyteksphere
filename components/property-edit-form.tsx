import addProperty from "@/app/actions/add-property";
import PropertyForm from "./property-form";
import editProperty from "@/app/actions/edit-property";

const PropertyEditForm = ({ property }: any) => {
  return (
    <PropertyForm
      action={editProperty}
      header="Add Property"
      property={property}
    />
  );
};

export default PropertyEditForm;
