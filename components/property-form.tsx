import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { IProperty } from "@/types/property.types";
import ImagesInputs from "./images-inputs";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Checkbox } from "./ui/checkbox";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";

interface IPropertyFormProps {
  action: (formData: FormData) => Promise<void>;
  header: string;
  property?: IProperty;
  submitBtnTxt?: string;
}

const PropertyForm = ({
  action,
  header,
  property,
  submitBtnTxt = "Add property",
}: IPropertyFormProps) => {
  return (
    <form action={action}>
      <h2 className="text-3xl text-center font-semibold mb-6">{header}</h2>

      <div className="mb-4">
        <Label htmlFor="type" className="">
          Property Type
        </Label>
        <Select required name="type" defaultValue={property?.type}>
          <SelectTrigger id="type">
            <SelectValue placeholder="Select property type" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Property Type</SelectLabel>
              <SelectItem value="All">All</SelectItem>
              <SelectItem value="Apartment">Apartment</SelectItem>
              <SelectItem value="Studio">Studio</SelectItem>
              <SelectItem value="Condo">Condo</SelectItem>
              <SelectItem value="House">House</SelectItem>
              <SelectItem value="Cabin Or Cottage">Cabin or Cottage</SelectItem>
              <SelectItem value="Loft">Loft</SelectItem>
              <SelectItem value="Room">Room</SelectItem>
              <SelectItem value="Other">Other</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="mb-4">
        <Label className="">Listing Name</Label>
        <Input
          type="text"
          id="name"
          name="name"
          placeholder="eg. Beautiful Apartment In Miami"
          required
          defaultValue={property?.name}
        />
      </div>
      <div className="mb-4">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          rows={4}
          placeholder="Add an optional description of your property"
          defaultValue={property?.description}
        />
      </div>

      <Card className="mb-4 space-y-5 p-4">
        <h3 className="block  font-bold mb-2">Location</h3>
        <div>
          <Label htmlFor="street">Street</Label>
          <Input
            type="text"
            id="street"
            name="location.street"
            placeholder="Street"
            defaultValue={property?.location?.street}
          />
        </div>
        <div>
          <Label htmlFor="city">City</Label>
          <Input
            type="text"
            id="city"
            name="location.city"
            placeholder="City"
            required
            defaultValue={property?.location?.city}
          />
        </div>

        <div>
          <Label htmlFor="state">State</Label>
          <Input
            type="text"
            id="state"
            name="location.state"
            placeholder="State"
            required
            defaultValue={property?.location?.state}
          />
        </div>

        <div>
          <Label htmlFor="zipcode">Zipcode</Label>
          <Input
            type="text"
            id="zipcode"
            name="location.zipcode"
            placeholder="Zipcode"
            defaultValue={property?.location?.zipcode}
          />
        </div>
      </Card>

      <div className="mb-4 flex flex-wrap space-y-4 md:space-y-0">
        <div className="w-full sm:w-1/3 md:pr-2">
          <Label htmlFor="beds" className="block  font-bold mb-2">
            Beds
          </Label>
          <Input
            type="number"
            id="beds"
            name="beds"
            required
            defaultValue={property?.beds}
          />
        </div>
        <div className="w-full sm:w-1/3 md:px-2">
          <Label htmlFor="baths" className="block  font-bold mb-2">
            Baths
          </Label>
          <Input
            type="number"
            id="baths"
            name="baths"
            required
            defaultValue={property?.baths}
          />
        </div>
        <div className="w-full sm:w-1/3 md:pl-2">
          <Label htmlFor="square_feet" className="block  font-bold mb-2">
            Square Feet
          </Label>
          <Input
            type="number"
            id="square_feet"
            name="square_feet"
            required
            defaultValue={property?.square_feet}
          />
        </div>
      </div>

      <div className="mb-4">
        <label className="block  font-bold mb-2">Amenities</label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          <div>
            <input
              type="checkbox"
              id="amenity_wifi"
              name="amenities"
              value="Wifi"
              className="mr-2"
              defaultChecked={property?.amenities?.includes("Wifi")}
            />
            <label htmlFor="amenity_wifi">Wifi</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="amenity_kitchen"
              name="amenities"
              value="Full kitchen"
              className="mr-2"
              defaultChecked={property?.amenities?.includes("Full kitchen")}
            />
            <label htmlFor="amenity_kitchen">Full kitchen</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="amenity_washer_dryer"
              name="amenities"
              value="Washer & Dryer"
              className="mr-2"
              defaultChecked={property?.amenities?.includes("Washer & Dryer")}
            />
            <label htmlFor="amenity_washer_dryer">Washer & Dryer</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="amenity_free_parking"
              name="amenities"
              value="Free Parking"
              className="mr-2"
              defaultChecked={property?.amenities?.includes("Free Parking")}
            />
            <label htmlFor="amenity_free_parking">Free Parking</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="amenity_pool"
              name="amenities"
              value="Swimming Pool"
              className="mr-2"
              defaultChecked={property?.amenities?.includes("Swimming Pool")}
            />
            <label htmlFor="amenity_pool">Swimming Pool</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="amenity_hot_tub"
              name="amenities"
              value="Hot Tub"
              className="mr-2"
              defaultChecked={property?.amenities?.includes("Hot Tub")}
            />
            <label htmlFor="amenity_hot_tub">Hot Tub</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="amenity_24_7_security"
              name="amenities"
              value="24/7 Security"
              className="mr-2"
              defaultChecked={property?.amenities?.includes("24/7 Security")}
            />
            <label htmlFor="amenity_24_7_security">24/7 Security</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="amenity_wheelchair_accessible"
              name="amenities"
              value="Wheelchair Accessible"
              className="mr-2"
              defaultChecked={property?.amenities?.includes(
                "Wheelchair Accessible"
              )}
            />
            <label htmlFor="amenity_wheelchair_accessible">
              Wheelchair Accessible
            </label>
          </div>
          <div>
            <input
              type="checkbox"
              id="amenity_elevator_access"
              name="amenities"
              value="Elevator Access"
              className="mr-2"
              defaultChecked={property?.amenities?.includes("Elevator Access")}
            />
            <label htmlFor="amenity_elevator_access">Elevator Access</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="amenity_dishwasher"
              name="amenities"
              value="Dishwasher"
              className="mr-2"
              defaultChecked={property?.amenities?.includes("Dishwasher")}
            />
            <label htmlFor="amenity_dishwasher">Dishwasher</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="amenity_gym_fitness_center"
              name="amenities"
              value="Gym/Fitness Center"
              className="mr-2"
              defaultChecked={property?.amenities?.includes(
                "Gym/Fitness Center"
              )}
            />
            <label htmlFor="amenity_gym_fitness_center">
              Gym/Fitness Center
            </label>
          </div>
          <div>
            <input
              type="checkbox"
              id="amenity_air_conditioning"
              name="amenities"
              value="Air Conditioning"
              className="mr-2"
              defaultChecked={property?.amenities?.includes("Air Conditioning")}
            />
            <label htmlFor="amenity_air_conditioning">Air Conditioning</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="amenity_balcony_patio"
              name="amenities"
              value="Balcony/Patio"
              className="mr-2"
              defaultChecked={property?.amenities?.includes("Balcony/Patio")}
            />
            <label htmlFor="amenity_balcony_patio">Balcony/Patio</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="amenity_smart_tv"
              name="amenities"
              value="Smart TV"
              className="mr-2"
              defaultChecked={property?.amenities?.includes("Smart TV")}
            />
            <label htmlFor="amenity_smart_tv">Smart TV</label>
          </div>
          <div>
            <Checkbox
              id="amenity_coffee_maker"
              name="amenities"
              value="Coffee Maker"
              className="mr-2"
              defaultChecked={property?.amenities?.includes("Coffee Maker")}
            />
            <label htmlFor="amenity_coffee_maker">Coffee Maker</label>
          </div>
        </div>
      </div>

      <Card className="mb-4  p-4">
        <h3 className="block  font-bold mb-2">
          Rates (Leave blank if not applicable)
        </h3>
        <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
          <div className="flex items-center">
            <Label htmlFor="weekly_rate" className="mr-2">
              Weekly
            </Label>
            <Input
              type="number"
              id="weekly_rate"
              name="rates.weekly"
              defaultValue={property?.rates?.weekly}
            />
          </div>
          <div className="flex items-center">
            <Label htmlFor="monthly_rate" className="mr-2">
              Monthly
            </Label>
            <Input
              type="number"
              id="monthly_rate"
              name="rates.monthly"
              defaultValue={property?.rates?.monthly}
            />
          </div>
          <div className="flex items-center">
            <Label htmlFor="nightly_rate" className="mr-2">
              Nightly
            </Label>
            <Input
              type="number"
              id="nightly_rate"
              name="rates.nightly"
              defaultValue={property?.rates?.nightly}
            />
          </div>
        </div>
      </Card>

      <div className="mb-4">
        <Label htmlFor="seller_name">Seller Name</Label>
        <Input
          type="text"
          id="seller_name"
          name="seller_info.name"
          placeholder="Name"
          defaultValue={property?.seller_info?.name}
        />
      </div>
      <div className="mb-4">
        <Label htmlFor="seller_email">Seller Email</Label>
        <Input
          type="email"
          id="seller_email"
          name="seller_info.email"
          placeholder="Email address"
          required
          defaultValue={property?.seller_info?.email}
        />
      </div>

      <div className="mb-4">
        <Label htmlFor="seller_phone">Seller Phone</Label>
        <Input
          type="tel"
          id="seller_phone"
          name="seller_info.phone"
          placeholder="Phone"
          defaultValue={property?.seller_info?.phone}
        />
      </div>

      {/* <div className="mb-4">
        <Label htmlFor="images">Images (Select up to 4 images)</Label>
        <Input
          type="file"
          id="images"
          name="images"
          accept="image/*"
          required
        />
      </div> */}

      <ImagesInputs property={property} />

      <div className="mt-12">
        <Button type="submit" size="lg">
          {submitBtnTxt}
        </Button>
      </div>
    </form>
  );
};

export default PropertyForm;
