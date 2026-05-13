import { products } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";

export default function Home() {
  return (
    <div className="items-center flex flex-col gap-8">
      <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-6 gap-2">
        {products.map((product) => (
          <ProductCard key={product.handle} product={product} />
        ))}
      </div>
      <button
        type="button"
        className="flex items-center h-12 px-4 border border-neutral-900 dark:border-neutral-100 text-center cursor-pointer uppercase tracking-widest text-sm hover:bg-neutral-900 hover:text-neutral-50 dark:hover:bg-neutral-700 focus:bg-neutral-900 focus:text-neutral-50 transition-colors"
      >
        Load more
      </button>
    </div>
  );
}
