'use server';
import GetBestSeller from '@/app/(root)/_component/GetBestSeller';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import Perks from '@/components/Perks';
import { db } from '@/db/drizzle';
import { Products } from '@/db/schema';
import { eq } from 'drizzle-orm';
import ProductItem from '../../../_component/ProductItem';

export default async function Page({ params: { id } }: { params: { id: string } }) {
  const [product] = await db.select().from(Products).where(eq(Products.id, id));
  return (
    <MaxWidthWrapper className="max-w-screen-xl">
      <ProductItem product={product} />
      <div className="mt-20">
        <GetBestSeller />
        <Perks />
      </div>
    </MaxWidthWrapper>
  );
}
