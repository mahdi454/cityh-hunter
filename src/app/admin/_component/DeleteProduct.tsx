"use client"
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { deleteProduct } from "../_actions/products";
import { useTransition } from "react";

export default function DeleteDropdownItem({
  id,
}: {
  id: string;
}) {
  const [isPending, startTransition] = useTransition();
  return (
    <DropdownMenuItem
    disabled={isPending }
      className="p-2 hover:bg-slate-200 dark:hover:bg-slate-800 text-red-500"
      onClick={() => {
        startTransition(async () => await deleteProduct(id));
      }}
    >
      Delete
    </DropdownMenuItem>
  );
}
