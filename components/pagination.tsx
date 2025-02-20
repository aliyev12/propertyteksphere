import Link from "next/link";
import { Button } from "./ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";

const Pagination = ({
  page,
  pageSize,
  totalItems,
}: {
  page: number;
  pageSize: number;
  totalItems: number;
}) => {
  const totalPages = Math.ceil(totalItems / pageSize);

  return (
    <section className="container mx-auto flex justify-center items-center my-8">
      {page > 1 ? (
        <Button variant="secondary" asChild>
          <Link
            href={`/properties?page=${page - 1}`}
            className="mr-2 px-2 py-1"
          >
            <ArrowLeft /> Previous
          </Link>
        </Button>
      ) : null}

      <span className="mx-2">
        Page {page} of {totalPages}
      </span>

      {page < totalPages ? (
        <Button variant="secondary" asChild>
          <Link
            href={`/properties?page=${page + 1}`}
            className="ml-2 px-2 py-1"
          >
            Next <ArrowRight />
          </Link>
        </Button>
      ) : null}
    </section>
  );
};

export default Pagination;
