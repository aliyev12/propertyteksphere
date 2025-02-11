import addProperty from "@/app/actions/add-property";
import PropertyForm from "./property-form";

const PropertyAddForm = () => {
  return <PropertyForm action={addProperty} header="Add Property" />;
};

export default PropertyAddForm;
