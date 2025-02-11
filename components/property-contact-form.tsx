import { IProperty } from "@/types/property.types";
import { Plane } from "lucide-react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { Input } from "./ui/input";

const PropertyContactForm = ({ property }: { property: IProperty }) => {
  return (
    <form className="space-y-5 pt-4">
      <div>
        <Label htmlFor="name">Name:</Label>
        <Input
          id="name"
          name="name"
          type="text"
          placeholder="Enter your name"
          required
        />
      </div>
      <div>
        <Label htmlFor="email">Email:</Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="Enter your email"
          required
        />
      </div>
      <div>
        <Label htmlFor="phone">Phone:</Label>
        <Input
          id="phone"
          name="phone"
          type="text"
          placeholder="Enter your phone number"
        />
      </div>
      <div>
        <Label htmlFor="message">Message:</Label>
        <Textarea
          id="message"
          name="message"
          placeholder="Enter your message"
        ></Textarea>
      </div>
      <div>
        <Button type="submit">
          <Plane /> Send Message
        </Button>
      </div>
    </form>
  );
};

export default PropertyContactForm;
