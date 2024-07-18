// 'use client'

// export const CartContext = createContext<{
//   cartItems: Product[];
//   setCartItems: Dispatch<SetStateAction<Product[]>>;
// }>({
//   cartItems: [],
//   setCartItems: () => {},
// });

// export default function CartItemsProvider({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const [cartItems, setCartItems] = useState<Product[]>([]);
//   useEffect(() => {
//     localStorage.setItem("cartItems", JSON.stringify(cartItems));
//   }, [cartItems]);
//   return (
//     <CartContext.Provider value={{cartItems, setCartItems}}>
//       {children}
//     </CartContext.Provider>
//   );
// }
