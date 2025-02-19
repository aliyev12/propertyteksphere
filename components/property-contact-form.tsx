"use client";
import { useEffect } from "react";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import addMessage from "@/app/actions/add-message";
import { IProperty } from "@/types/property.types";
import { Plane } from "lucide-react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { Input } from "./ui/input";

const PropertyContactForm = ({ property }: { property: IProperty }) => {
  const { data: session } = useSession();

  const [state, formAction] = useActionState(addMessage, {
    submitted: false,
    error: undefined,
  });

  useEffect(() => {
    if (state.error) toast.error(state.error);
    if (state.submitted) toast.success("Message sent successfully");
  }, [state]);

  if (state.submitted) {
    return <p className="mb-4">Your message has been sent</p>;
  }

  return (
    session && (
      <form className="space-y-5 pt-4" action={formAction}>
        <input
          type="hidden"
          id="property"
          name="property"
          defaultValue={property._id}
        />
        <input
          type="hidden"
          id="recipient"
          name="recipient"
          defaultValue={property.owner.toString()}
        />
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
          <Label htmlFor="body">Message:</Label>
          <Textarea
            id="body"
            name="body"
            placeholder="Enter your message"
          ></Textarea>
        </div>
        <div>
          <Button type="submit">
            <Plane /> Send Message
          </Button>
        </div>
      </form>
    )
  );
};

export default PropertyContactForm;
