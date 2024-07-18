import { Products } from "@/db/schema";
import { persist, createJSONStorage } from "zustand/middleware";
import { create } from "zustand";

type Product = typeof Products.$inferSelect;


type WishListStore = {
  cart: Product[];
  add: (product: Product) => void;
  remove: (idProduct: string) => void;
};
export const useAddWishList = create<WishListStore>()(
  persist(
    (set, get) => ({
      cart: [],
      add: (product: Product) => {
        const { cart } = get();
        const updatedCart = addWishList(product, cart);
        set({ cart: updatedCart });
      },

      remove: (idProduct: string) => {
        const { cart } = get();
        const updatedCart = removeItem(idProduct, cart);
        set({ cart: updatedCart });
      },
    }),
    {
      name: "wishlist-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

function addWishList(
  product: Product,
  cart: Product[],
): Product[] {
  const cartItem = { ...product } as Product;
  const productOnCart = cart.some((item) => item.id === product.id);
  if (!productOnCart) {
    cart.push(cartItem);
  }
  return cart;
}


function removeItem(idProduct: string, cart: Product[]): Product[] {
  return cart.filter((item) => item.id !== idProduct);
}