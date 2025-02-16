import PropertyCard from "@/components/property-card";
import connectDB from "@/config/database";
import User from "@/models/User";
import { IProperty } from "@/types/property.types";
import { getSessionUser } from "@/utils/getSessionUser";

const SavedPropertiesPage = async () => {
  const sessionUser = await getSessionUser();
  const userId = sessionUser?.userId;

  if (!userId) {
    return null;
  }

  const user = await User.findById(userId).populate("bookmarks");
  const bookmarks = user?.bookmarks as unknown as IProperty[];

  return (
    <section className="px-4 py-6">
      <div className="container lg:container m-auto px-4 py-6">
        <h1 className="text-2xl mb-4">Saved Properties</h1>
        {bookmarks.length === 0 ? (
          <p>No saved properties</p>
        ) : (
          <div className="grid grid-cols1 md:grid-cols-3 gap-6">
            {bookmarks.map((property: IProperty, i) => (
              <PropertyCard key={property._id} property={property} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default SavedPropertiesPage;
