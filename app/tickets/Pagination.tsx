import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  RxDoubleArrowLeft,
  RxDoubleArrowRight,
  RxChevronLeft,
  RxChevronRight,
} from "react-icons/rx";
export default function Pagination() {
  return (
    <nav
      className="flex items-center justify-between bg-background px-4 py-3 sm:px-6"
      aria-label="Pagination"
    >
      <div className="hidden sm:block">
        <p className="text-sm text-foreground">
          Showing <span className="font-medium">1</span> to{" "}
          <span className="font-medium">10</span> of{" "}
          <span className="font-medium">20</span> tickets
        </p>
      </div>
      <div className="flex flex-1 justify-between gap-2 sm:justify-end">
        <Button
          className="bg-accent hover:bg-input dark:hover:bg-muted-foreground"
          variant={"outline"}
          asChild
        >
          <Link href={"#"}>
            <RxDoubleArrowLeft />
          </Link>
        </Button>
        <Button
          className="bg-accent hover:bg-input dark:hover:bg-muted-foreground"
          variant={"outline"}
          asChild
        >
          <Link href={"#"}>
            <RxChevronLeft />
          </Link>
        </Button>
        <Button
          className="bg-accent hover:bg-input dark:hover:bg-muted-foreground"
          variant={"outline"}
          asChild
        >
          <Link href={"#"}>
            <RxChevronRight />
          </Link>
        </Button>
        <Button
          className="bg-accent hover:bg-input dark:hover:bg-muted-foreground"
          variant={"outline"}
          asChild
        >
          <Link href={"#"}>
            <RxDoubleArrowRight />
          </Link>
        </Button>
      </div>
    </nav>
  );
}
