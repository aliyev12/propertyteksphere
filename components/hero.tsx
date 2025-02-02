import heroImg from "@/assets/images/hero-img.jpg";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Label } from "./ui/label";

const Hero = () => {
  return (
    <section
      className="relative py-20 mb-4 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/images/hero-img.jpg')" }}
    >
      <div className="absolute inset-0 bg-black/50"></div>{" "}
      {/* Dark overlay for better readability */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl">
            Find The Perfect Property
          </h1>
          <p className="my-4 text-xl text-white">
            Discover the perfect property that suits your needs.
          </p>
        </div>
        {/* <!-- Form Component --> */}
        <form className="mt-3 mx-auto max-w-2xl w-full flex flex-col md:flex-row items-center">
          <div className="w-full md:w-3/5 md:pr-2 mb-4 md:mb-0">
            <label htmlFor="location" className="sr-only">
              Location
            </label>
            <Input
              type="text"
              id="location"
              placeholder="Enter Location (City, State, Zip, etc)"
            />
          </div>
          <div className="w-full md:w-2/5 md:pl-2">
            <Label htmlFor="property-type" className="sr-only">
              Property Type
            </Label>
            <Select>
              <SelectTrigger id="property-type">
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
                  <SelectItem value="Cabin Or Cottage">
                    Cabin or Cottage
                  </SelectItem>
                  <SelectItem value="Loft">Loft</SelectItem>
                  <SelectItem value="Room">Room</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <Button
            variant="outline"
            type="submit"
            className="md:ml-4 mt-4 md:mt-0 w-full md:w-auto"
          >
            Search
          </Button>
        </form>
      </div>
    </section>
  );
};

export default Hero;
