import PropertyAddForm from "@/components/property-add-form";
import { getSessionUser } from "@/utils/getSessionUser";
import { redirect } from "next/navigation";

const AddPropertyPage = async () => {
  const sessionUser = await getSessionUser();
  const userId = sessionUser?.userId;

  if (!userId) {
    redirect(`/login?back_to=${encodeURIComponent("/properties/add")}`);
  }

  return (
    <section className="">
      <div className="container m-auto max-w-2xl py-24">
        <div className="px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <PropertyAddForm />
        </div>
      </div>
    </section>
  );
};

export default AddPropertyPage;
