import { Button } from "@/components/ui/button";
import { TriangleAlert } from "lucide-react";
import Link from "next/link";

const NotFoundPage = () => {
  return (
    <section className="min-h-screen flex-grow">
      <div className="container m-auto max-w-2xl py-3 lg:py-24 mx-auto px-4 sm:px-6 lg:px-8 ">
        <div className="px-6 py-24 shadow-md rounded-md border md:m-0">
          <div className="flex justify-center">
            <TriangleAlert size={60} />
          </div>
          <div className="text-center">
            <h1 className="text-2xl font-bold mt-4 mb-4">Page Not Found</h1>
            <p className="mb-10">
              The page you are looking for does not exist.
            </p>
            <Button asChild size="lg">
              <Link href="/">Home</Link>
            </Button>
          </div>
        </div>
      </div>
      <div className="flex-grow"></div>
    </section>
  );
};

export default NotFoundPage;
