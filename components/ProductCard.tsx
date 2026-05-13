import Link from "next/link";
import type { Product } from "@/data/products";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/products/${product.handle}`}
      className="product-item p-1 bg-[#f5f5f0] dark:bg-neutral-950"
    >
      <div className="relative">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt={product.title}
          loading="lazy"
          src={`${product.image}&width=600&height=900&crop=center`}
          width={600}
          height={900}
          className="bg-white dark:bg-neutral-900 w-full"
          style={{ aspectRatio: "2/3" }}
        />
        {product.soldOut && (
          <div className="absolute inset-0 flex items-center justify-center text-4xl leading-none">
            <h5 className="w-full font-bold text-center">
              SOLD
              <br />
              OUT
            </h5>
          </div>
        )}
      </div>
      <h4 className="mt-1 text-balance text-center text-xs">
        {product.title}{" "}
        <strong>
          <span>{product.price}</span>
        </strong>
      </h4>
    </Link>
  );
}
