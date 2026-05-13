"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import { getProductByHandle, getRelatedProducts } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import { useCart } from "@/components/CartContext";

function ChevronLeft() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
    </svg>
  );
}

export default function ProductPage() {
  const params = useParams();
  const handle = params.handle as string;
  const product = getProductByHandle(handle);
  const [currentImage, setCurrentImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const { addItem } = useCart();

  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <p className="text-sm">Product not found</p>
      </div>
    );
  }

  const relatedProducts = getRelatedProducts(product.goesWithHandles);

  const prevImage = () => {
    setCurrentImage((i) => (i === 0 ? product.images.length - 1 : i - 1));
  };

  const nextImage = () => {
    setCurrentImage((i) => (i === product.images.length - 1 ? 0 : i + 1));
  };

  return (
    <div className="cart-main">
      {/* Image Gallery */}
      <div className="product-gallery">
        {product.images.length > 1 && (
          <button className="gallery-nav prev" onClick={prevImage} aria-label="Previous image">
            <ChevronLeft />
          </button>
        )}
        <div className="product-gallery-track" style={{ transform: `translateX(-${currentImage * 100}%)` }}>
          {product.images.map((img, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={i}
              src={`${img}&width=1200&height=1800&crop=center`}
              alt="Product Image"
              className="bg-white dark:bg-neutral-900"
            />
          ))}
        </div>
        {product.images.length > 1 && (
          <button className="gallery-nav next" onClick={nextImage} aria-label="Next image">
            <ChevronRight />
          </button>
        )}
      </div>

      {/* Product Details */}
      <div className="cart-details">
        <div>
          <h1 className="text-sm font-normal uppercase tracking-wider">
            {product.title}
          </h1>
          <div className="text-sm mt-1">{product.price}.00</div>
        </div>

        <div className="flex flex-col gap-4">
          <div>
            <h5 className="text-xs uppercase mb-2">Size</h5>
            <div className="flex gap-2 flex-wrap">
              {product.sizes.map((size) => (
                <button
                  key={size.name}
                  disabled={!size.available}
                  onClick={() => setSelectedSize(size.name)}
                  className={`h-10 min-w-10 px-3 border text-xs relative
                    ${
                      selectedSize === size.name
                        ? "border-neutral-900 dark:border-neutral-100 bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900"
                        : "border-neutral-300 dark:border-neutral-600"
                    }
                    ${
                      !size.available
                        ? "opacity-40 cursor-not-allowed line-through"
                        : "cursor-pointer hover:border-neutral-900 dark:hover:border-neutral-100"
                    }
                  `}
                >
                  {size.name}
                  {!size.available && (
                    <span className="absolute inset-0 flex items-center justify-center text-base">
                      &#10005;
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          <button
            disabled={product.soldOut || !selectedSize}
            onClick={() => {
              if (product && selectedSize) {
                addItem(product, selectedSize);
              }
            }}
            className="h-12 px-4 border border-neutral-900 dark:border-neutral-100 text-center cursor-pointer uppercase tracking-widest text-sm hover:bg-neutral-900 dark:hover:bg-neutral-700 hover:text-neutral-50 focus:bg-neutral-900 dark:focus:bg-neutral-700 focus:text-neutral-50 transition-colors disabled:pointer-events-none disabled:opacity-50"
          >
            {product.soldOut ? "Sold out" : "Add to cart"}
          </button>
        </div>

        <ul className="text-xs list-disc pl-4 flex flex-col gap-1">
          {product.description.map((line, i) => (
            <li key={i}>{line}</li>
          ))}
        </ul>

        {relatedProducts.length > 0 && (
          <div className="mt-6">
            <h2 className="col-span-full text-sm uppercase mb-3">Goes with</h2>
            <div className="grid grid-cols-3 gap-2">
              {relatedProducts.map((p) => (
                <ProductCard key={p.handle} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
