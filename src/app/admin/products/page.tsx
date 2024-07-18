import { Button } from "@/components/ui/button";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { TableData } from "./DataTable";
import Link from "next/link";

export default function Page() {
  return (
    <MaxWidthWrapper>
      <div className="pt-4 flex justify-between items-center">
        <p className="text-lg font-semibold tracking-wide">All Products</p>

        <Link href="/admin/products/new" scroll={false}>
          <Button size="sm">Add Product</Button>
        </Link>
      </div>

      <TableData />
    </MaxWidthWrapper>
  );
}
