import { getBestSellerProducts } from "../../_actions/getBestSeller";
import { BestSeller } from "../../_component/BestSeller";


export default async function Page() {
  const { bestSellerMen, bestSellerWomen } = await getBestSellerProducts();
  return (
    <BestSeller
      bestSellerMen={bestSellerMen}
      bestSellerWomen={bestSellerWomen}
    />
  );
}
