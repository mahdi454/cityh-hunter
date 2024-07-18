import { Products } from "@/db/schema";
import { persist, createJSONStorage } from "zustand/middleware";
import { create } from "zustand";

type Product = typeof Products.$inferSelect;
interface CartItem extends Product {
  count: number;
}

type CartStore = {
  cart: CartItem[];
  count: () => number;
  add: (product: Product, amount: number) => void;
  increase: (idProduct: string) => void;
  decrease: (idProduct: string) => void;
  remove: (idProduct: string) => void;
};
export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      cart: [],
      count: () => {
        const { cart } = get();
        return cart.reduce((total, item) => total + item.count, 0);
      },
      add: (product: Product, amount: number) => {
        const { cart, count } = get();
        const updatedCart = addCart(product, cart, amount);
        set({ cart: updatedCart });
      },
      increase: (idProduct: string) => {
        const { cart } = get();
        const updatedCart = increaseItem(idProduct, cart);
        set({ cart: updatedCart });
      },
      decrease: (idProduct: string) => {
        const { cart } = get();
        const updatedCart = decreaseItem(idProduct, cart);
        set({ cart: updatedCart });
      },
      remove: (idProduct: string) => {
        const { cart } = get();
        const updatedCart = removeItem(idProduct, cart);
        set({ cart: updatedCart });
      },
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

function addCart(
  product: Product,
  cart: CartItem[],
  amount: number
): CartItem[] {
  const cartItem = { ...product, count: amount } as CartItem; // just here number of cart items
  const productOnCart = cart.some((item) => item.id === product.id);
  if (!productOnCart) {
    cart.push(cartItem);
  }
  return cart;
}

function decreaseItem(idProduct: string, cart: CartItem[]): CartItem[] {
  return cart.map((item) =>
    item.id === idProduct
      ? { ...item, count: item.count > 1 ? item.count - 1 : 1 }
      : item
  );
}
function increaseItem(idProduct: string, cart: CartItem[]): CartItem[] {
  return cart.map((item) =>
    item.id === idProduct
      ? { ...item, count: item.count < 3 ? item.count + 1 : 3 }
      : item
  );
}
function removeItem(idProduct: string, cart: CartItem[]): CartItem[] {
  return cart.filter((item) => item.id !== idProduct);
}

// import { createStore } from "zustand/vanilla";
// import { Products } from "@/db/schema";
// import { persist, createJSONStorage } from "zustand/middleware";
// import { create } from "zustand";

// type Product = typeof Products.$inferSelect;
// interface CartItem extends Product {
//   count: number;
// }

// type CartStore = {
//   cart: CartItem[];
//   count: () => number;
//   increaseItem: (product: Product) => void;
//   decreaseItem: (product: Product) => void;
//   add: (product: Product) => void;
//   remove: (idProduct: string) => void;
//   removeAll: () => void;
// };

// export const useCartStore = create<CartStore>()(
//   persist(
//     (set, get) => ({
//       cart: [],
//       count: () => {},
//       decreaseItem: (product:Product) => {},
//       increaseItem: (product: Product) => {
//         const { cart, count } = get();
//         const increment = increaseFromCart(product, cart);
//         set({ cart: increment });
//       },
//       add: (product: Product) => {
//         const { cart, count } = get();
//         const updatedCart = addCart(product, cart);
//         set({ cart: updatedCart });
//       },
//       remove: (idProduct: string) => {
//         const { cart } = get();

//         const updatedCart = removeCart(idProduct, cart);
//         set({ cart: updatedCart });
//       },
//       removeAll: () => set({ cart: [] }),
//     }),
//     {
//       name: "cart-storage", // unique name
//       storage: createJSONStorage(() => localStorage), // use localStorage
//     }
//   )
// );

// function addCart(
//   product: Product,
//   cart: CartItem[],
//   count: number
// ): CartItem[] {
//   const productOnCart = cart.map((item) => item.id).includes(product.id);

//   const cartItem = { ...product, count: count } as CartItem;
//   if (!productOnCart) cart.push(cartItem);

//   return cart;
// }

// function removeCart(idProduct: string, cart: CartItem[]): CartItem[] {
//   return cart.filter((item) => item.id !== idProduct);
// }
// function increaseFromCart(
//   product: Product,
//   cart: CartItem[],
// ): CartItem[] {
//   const cartItem = { ...product, count: count + 1 } as CartItem;

//   return cart;
// }

// import { createStore } from "zustand/vanilla";
// import { Products } from "@/db/schema";

// import { persist, createJSONStorage } from "zustand/middleware";
// import { create } from "zustand";

// type Product = typeof Products.$inferSelect;
// interface CartItem extends Product {
//   count: number;
// }

// type CartStore = {
//   cart: CartItem[];
//   count: () => number;
//   add: (product: Product) => void;
//   remove: (idProduct: string) => void;
//   removeAll: () => void;
// };

// export const useCartStore = create<CartStore>((set, get) => ({
//   cart: [],
//   count: () => {
//     const { cart } = get();
//     if (cart.length)
//       return cart.map((item) => item.count).reduce((prev, curr) => prev + curr);
//     return 0;
//   },
//   add: (product: Product) => {
//     const { cart } = get();
//     const updatedCart = updateCart(product, cart);
//     set({ cart: updatedCart });
//   },
//   remove: (idProduct: string) => {
//     const { cart } = get();
//     const updatedCart = removeCart(idProduct, cart);
//     set({ cart: updatedCart });
//   },
//   removeAll: () => set({ cart: [] }),
// }));

// function updateCart(product: Product, cart: CartItem[]): CartItem[] {
//   const cartItem = { ...product, count: 1 } as CartItem;

//   const productOnCart = cart.map((item) => item.id).includes(product.id);

//   if (!productOnCart) cart.push(cartItem);
//   else {
//     return cart.map((item) => {
//       if (item.id === product.id)
//         return { ...item, count: item.count + 1 } as CartItem;
//       return item;
//     });
//   }

//   return cart;
// }

// function removeCart(idProduct: string, cart: CartItem[]): CartItem[] {
//   return cart
//     .map((item) => {
//       if (item.id === idProduct) return { ...item, count: item.count - 1 };
//       return item;
//     })
//     .filter((item) => {
//       return item.count;
//     });
// }

// // type Cart = typeof Products.$inferSelect;
// // type CartState = {
// //   cart: Cart[];
// // };
// // type CartAction = {
// //   setCart: (cart: Cart[]) => void;
// // };

// // export type CartStore = CartState & CartAction;

// // export const defaultInitState: CartState = {
// //   cart: [],
// // };

// // export const createCartStore = (newCart: CartState = defaultInitState) =>{
// //  return createStore<CartStore>()(
// //     persist(
// //       (set) => ({
// //         ...newCart,
// //               setCart: (newCart: Cart[]) => set({ cart: newCart }),
// //       }),
// //       {
// //         name: "cart-storage",
// //         storage: createJSONStorage(() => localStorage),
// //       }
// //     )
// //     )};
