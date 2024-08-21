import { Button } from "@/components/ui/button";
import { Priority, Status } from "@prisma/client";
import Link from "next/link";
import {
  RxDoubleArrowLeft,
  RxDoubleArrowRight,
  RxChevronLeft,
  RxChevronRight,
} from "react-icons/rx";

interface Props {
  searchParams: {
    page: string;
    status: Status;
    priority: Priority;
  };
  pageCount: number;
  currentPage: number;
  pageSize: number;
  ticketCount: number;
}
export default function Pagination({
  searchParams,
  pageCount,
  currentPage,
  pageSize,
  ticketCount,
}: Props) {
  return (
    <nav
      className="flex items-center justify-between bg-background px-4 py-3 sm:px-6"
      aria-label="Pagination"
    >
      <div className="hidden sm:block">
        <p className="text-sm text-foreground">
          Showing{" "}
          <span className="font-medium">
            {(currentPage - 1) * pageSize + 1}
          </span>{" "}
          to{" "}
          <span className="font-medium">
            {Math.min(currentPage * pageSize, ticketCount)}
          </span>{" "}
          of <span className="font-medium">{ticketCount}</span> tickets
        </p>
      </div>
      <div className="flex flex-1 justify-between gap-2 sm:justify-end">
        <Button
          className={`${currentPage === 1 ? "pointer-events-none" : "bg-accent hover:bg-input dark:hover:bg-muted-foreground"}`}
          variant={"outline"}
          asChild
        >
          <Link
            href={{
              query: { ...searchParams, page: 1 },
            }}
          >
            <RxDoubleArrowLeft />
          </Link>
        </Button>
        <Button
          className={`${currentPage === 1 ? "pointer-events-none" : "bg-accent hover:bg-input dark:hover:bg-muted-foreground"}`}
          variant={"outline"}
          asChild
        >
          <Link
            href={{
              query: {
                ...searchParams,
                page: currentPage > 2 ? currentPage - 1 : 1,
              },
            }}
          >
            <RxChevronLeft />
          </Link>
        </Button>
        <Button
          className={`${currentPage === pageCount ? "pointer-events-none" : "bg-accent hover:bg-input dark:hover:bg-muted-foreground"}`}
          variant={"outline"}
          asChild
        >
          <Link
            href={{
              query: {
                ...searchParams,
                page: currentPage < pageCount ? currentPage + 1 : pageCount,
              },
            }}
          >
            <RxChevronRight />
          </Link>
        </Button>
        <Button
          className={`${currentPage === pageCount ? "pointer-events-none" : "bg-accent hover:bg-input dark:hover:bg-muted-foreground"}`}
          variant={"outline"}
          asChild
        >
          <Link
            href={{
              query: { ...searchParams, page: pageCount },
            }}
          >
            <RxDoubleArrowRight />
          </Link>
        </Button>
      </div>
    </nav>
  );
}
