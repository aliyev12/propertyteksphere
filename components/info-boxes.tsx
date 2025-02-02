import Link from "next/link";
import { Button } from "./ui/button";
import InfoBox from "./info-box";

const InfoBoxes = () => {
  return (
    <section className="flex justify-center items-center ">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 ">
        <div className="container-xl lg:container m-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 rounded-lg">
            <InfoBox
              heading="For Renters"
              variant="default"
              href="/properties"
              linkText="Browse Properties"
            >
              Find your dream rental property. Bookmark properties and contact
              owners.
            </InfoBox>
            <InfoBox
              heading="For Property Owners"
              variant="outline"
              href="/properties/add"
              linkText="Add Property"
            >
              List your properties and reach potential tenants. Rent as an
              airbnb or long term.
            </InfoBox>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InfoBoxes;
