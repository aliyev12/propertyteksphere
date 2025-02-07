import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import connectDB from "@/config/database";
import Property from "@/models/Property";
import { getSessionUser } from "@/utils/getSessionUser";
import ProfileProperties from "@/components/profile-properties";
import { IProperty } from "@/types/property.types";

const ProfilePage = async () => {
  await connectDB();

  const sessionUser = await getSessionUser();

  const userId = sessionUser?.userId;

  if (!userId) throw new Error("User ID is required");

  const properties = (await Property.find({
    owner: userId,
  }).lean()) as unknown as IProperty[];

  return (
    <section className="">
      <div className="container mx-auto mt-2 md:mt-6 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="p-6 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <h1 className="text-2xl font-bold mb-4 text-center md:text-left">
            Your Profile
          </h1>
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/4 mt-4 md:mt-10">
              <div className="mb-4">
                {sessionUser.user?.image ? (
                  <Image
                    className="h-20 w-20 md:h-28 md:w-28 rounded-md mx-auto md:mx-0"
                    src={sessionUser.user.image}
                    alt="User"
                    width={0}
                    height={0}
                    sizes="100vw"
                  />
                ) : null}
              </div>

              <h2 className="mb-4">
                <span className="font-bold block">Name: </span>{" "}
                {sessionUser?.user?.name}
              </h2>
              <h2 className="">
                <span className="font-bold block">Email: </span>{" "}
                {sessionUser?.user?.email}
              </h2>
            </div>

            <div className="md:w-3/4 md:pl-4">
              <h2 className="text-xl font-semibold mb-4">Your Listings</h2>
              <ProfileProperties properties={properties} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfilePage;
