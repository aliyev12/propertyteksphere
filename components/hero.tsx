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
import PropertySearchForm from "./property-search-form";

const Hero = () => {
  return (
    <section
      className="relative py-20 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/images/hero-img.jpg')" }}
    >
      <div className="absolute inset-0 bg-black/50"></div>{" "}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl">
            Find The Perfect Property
          </h1>
          <p className="my-4 text-xl text-white">
            Discover the perfect property that suits your needs.
          </p>
        </div>
        <PropertySearchForm />
      </div>
    </section>
  );
};

export default Hero;
