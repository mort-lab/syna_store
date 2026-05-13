"use client";

import Link from "next/link";
import { useCart } from "./CartContext";

export function CartDrawer() {
  const { items, isOpen, close, removeItem, updateQuantity, totalPrice } =
    useCart();

  if (!isOpen) return null;

  return (
    <div className="overlay expanded" role="dialog">
      <button className="close-outside" onClick={close} aria-label="Close cart overlay" />
      <aside className="cart-aside bg-white dark:bg-neutral-900">
        <header className="flex items-center justify-between px-4 py-3 border-b border-neutral-900 dark:border-neutral-100">
          <h3 className="text-sm uppercase tracking-widest">CART</h3>
          <button
            className="text-3xl leading-none"
            onClick={close}
            aria-label="Close"
          >
            &times;
          </button>
        </header>

        <main className="flex-1 overflow-y-auto p-4">
          {items.length === 0 ? (
            <p className="text-xs text-neutral-500">Cart is empty</p>
          ) : (
            <div className="flex flex-col gap-4">
              <ul className="flex flex-col gap-4">
                {items.map((item) => (
                  <li
                    key={`${item.product.handle}-${item.size}`}
                    className="flex gap-3 border-b border-neutral-200 dark:border-neutral-700 pb-4"
                  >
                    <Link
                      href={`/products/${item.product.handle}`}
                      onClick={close}
                      className="shrink-0"
                    >
                      <img
                        src={`${item.product.image}&width=200&height=300&crop=center`}
                        alt={item.product.title}
                        className="w-20 bg-neutral-100 dark:bg-neutral-800"
                        style={{ aspectRatio: "2/3" }}
                      />
                    </Link>
                    <div className="flex flex-col gap-1 flex-1 text-xs">
                      <Link
                        href={`/products/${item.product.handle}`}
                        onClick={close}
                        className="font-normal hover:underline"
                      >
                        {item.product.title}
                      </Link>
                      <span className="text-neutral-500">
                        Size: {item.size}
                      </span>
                      <span>{item.product.price}</span>
                      <div className="flex items-center gap-2 mt-1">
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.product.handle,
                              item.size,
                              item.quantity - 1
                            )
                          }
                          className="w-6 h-6 border border-neutral-300 dark:border-neutral-600 text-xs flex items-center justify-center"
                        >
                          −
                        </button>
                        <span className="text-xs w-4 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.product.handle,
                              item.size,
                              item.quantity + 1
                            )
                          }
                          className="w-6 h-6 border border-neutral-300 dark:border-neutral-600 text-xs flex items-center justify-center"
                        >
                          +
                        </button>
                        <button
                          onClick={() =>
                            removeItem(item.product.handle, item.size)
                          }
                          className="ml-auto text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 text-xs underline"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="border-t border-neutral-900 dark:border-neutral-100 pt-4 flex flex-col gap-3">
                <div className="flex justify-between text-xs">
                  <span className="uppercase tracking-wider">Subtotal</span>
                  <span>£{totalPrice.toFixed(2)}</span>
                </div>
                <button className="h-12 px-4 bg-neutral-900 dark:bg-neutral-100 text-neutral-50 dark:text-neutral-900 text-center cursor-pointer uppercase tracking-widest text-sm hover:bg-neutral-700 dark:hover:bg-neutral-300 transition-colors w-full">
                  Checkout
                </button>
              </div>
            </div>
          )}
        </main>
      </aside>
    </div>
  );
}
