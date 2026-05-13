import { getProductsByCollection, collections } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return collections.map((c) => ({ handle: c.handle }));
}

export default async function CollectionPage({
  params,
}: {
  params: Promise<{ handle: string }>;
}) {
  const { handle } = await params;
  const collection = collections.find((c) => c.handle === handle);
  const collectionProducts = getProductsByCollection(handle);

  if (!collection) {
    notFound();
  }

  return (
    <div className="items-center flex flex-col gap-8">
      <h1 className="text-sm uppercase tracking-widest self-start">
        {collection.title}
      </h1>
      {collectionProducts.length === 0 ? (
        <p className="text-xs text-neutral-500">No products in this collection</p>
      ) : (
        <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-6 gap-2 w-full">
          {collectionProducts.map((product) => (
            <ProductCard key={product.handle} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
