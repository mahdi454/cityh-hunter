import { getBestSellerProducts } from "../_actions/getBestSeller";
import { BestSeller } from "./BestSeller";



export default async function GetBestSeller() {
  const { bestSellerMen, bestSellerWomen } = await getBestSellerProducts();
  return (
    <BestSeller
      bestSellerMen={bestSellerMen}
      bestSellerWomen={bestSellerWomen}
    />
  );
}