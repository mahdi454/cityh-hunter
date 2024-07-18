"use server";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { db } from "@/db/drizzle";
import { Products } from "@/db/schema";
import { formatPrice } from "@/lib/utils";
import { CheckCircle2, MoreVertical, XCircle } from "lucide-react";
import Link from "next/link";
import DeleteDropdownItem from "../_component/DeleteProduct";

export async function TableData() {
  const products = await db.select().from(Products);

  return (
    <Table>
      <TableCaption>A list of your product.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-0">
            <span className="sr-only">Available For Purchase</span>
          </TableHead>
          <TableHead className="w-[180px]">Name</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Price</TableHead>
          <TableHead className="w-0 text-right">
            <span className="sr-only">Actions</span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.map((product) => (
          <TableRow key={product.id}>
            <TableCell>
              {product.stockQuantity > 0 ? (
                <>
                  <span className="sr-only">Available</span>
                  <CheckCircle2 width="20" className="text-green-500" />
                </>
              ) : (
                <>
                  <span className="sr-only">Unavailable</span>
                  <XCircle className="stroke-destructive" width="20" />
                </>
              )}
            </TableCell>
            <TableCell className="font-medium">{product.productName}</TableCell>
            <TableCell>{product.stockQuantity}</TableCell>
            <TableCell>{product.category}</TableCell>
            <TableCell>
              {formatPrice(product.price, {
                currency: "USD",
                notation: "standard",
              })}
            </TableCell>
            <TableCell>
              <DropdownMenu>
                <DropdownMenuTrigger className="outline-none ">
                  <MoreVertical />
                  <span className="sr-only">Actions</span>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem
                    asChild
                    className="p-2 hover:bg-slate-200 dark:hover:bg-slate-800"
                  >
                    <Link href={`/admin/products/${product.id}/edit`}>
                      Edit
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    asChild
                    className="p-2 hover:bg-slate-200 dark:hover:bg-slate-800"
                  ></DropdownMenuItem>

                  <DeleteDropdownItem
                    id={product.id}
                   
                  />

                  {/* <ActiveToggleDropdownItem
                    id={product.id}
                    isAvailableForPurchase={product.isAvailableForPurchase}
                  />  */}
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right">$2,500.00</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
