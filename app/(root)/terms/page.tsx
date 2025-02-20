import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Construction } from "lucide-react";

const TermsPage = () => {
  return (
    <section className="w-full px-6 flex justify-center">
      <div className=" max-w-3xl">
        <Alert variant="default">
          <Construction className="h-4 w-4" />
          <AlertTitle>Under Construction</AlertTitle>
          <AlertDescription>
            Sorry, this page is still being built. Please, check back soon.
          </AlertDescription>
        </Alert>
      </div>
    </section>
  );
};

export default TermsPage;
