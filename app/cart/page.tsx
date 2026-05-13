"use client";

import Link from "next/link";

export default function CartPage() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-sm uppercase tracking-widest">Cart</h1>

      <div className="border-t border-neutral-200 dark:border-neutral-700 pt-6">
        <p className="text-xs text-neutral-500">Your cart is empty</p>
      </div>

      <Link
        href="/"
        className="inline-flex items-center h-12 px-4 border border-neutral-900 dark:border-neutral-100 text-center cursor-pointer uppercase tracking-widest text-sm hover:bg-neutral-900 dark:hover:bg-neutral-700 hover:text-neutral-50 focus:bg-neutral-900 dark:focus:bg-neutral-700 focus:text-neutral-50 transition-colors self-start"
      >
        Continue shopping
      </Link>
    </div>
  );
}
