import { useFormStatus } from "react-dom";
import { Plane } from "lucide-react";
import { Button } from "./ui/button";

const SubmitMessageButton = () => {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending}>
      <Plane /> {pending ? "Sending..." : "Send message"}
    </Button>
  );
};

export default SubmitMessageButton;
