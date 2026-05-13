"use client";

const countries = [
  { code: "GB", name: "United Kingdom", currency: "GBP £" },
  { code: "AD", name: "Andorra", currency: "EUR €" },
  { code: "AT", name: "Austria", currency: "EUR €" },
  { code: "AU", name: "Australia", currency: "AUD $" },
  { code: "BE", name: "Belgium", currency: "EUR €" },
  { code: "CA", name: "Canada", currency: "CAD $" },
  { code: "CN", name: "China", currency: "CNY ¥" },
  { code: "DE", name: "Germany", currency: "EUR €" },
  { code: "ES", name: "Spain", currency: "EUR €" },
  { code: "FR", name: "France", currency: "EUR €" },
  { code: "IE", name: "Ireland", currency: "EUR €" },
  { code: "IT", name: "Italy", currency: "EUR €" },
  { code: "JP", name: "Japan", currency: "JPY ¥" },
  { code: "NL", name: "Netherlands", currency: "EUR €" },
  { code: "US", name: "United States", currency: "USD $" },
];

export function Footer() {
  return (
    <footer className="col-span-2 mt-8 sm:mt-0 md:fixed md:bottom-8 md:left-8 z-20">
      <details className="text-xs max-w-48">
        <summary className="cursor-pointer">United Kingdom (GBP £)</summary>
        <div className="overflow-auto border-t py-2 bg-white dark:bg-neutral-900 w-full max-h-36">
          {countries.map((country) => (
            <button
              key={country.code}
              type="button"
              className="p-1 hover:bg-neutral-100 dark:hover:bg-neutral-500 focus:bg-neutral-100 dark:focus:bg-neutral-500 w-full text-left"
            >
              {country.name} ({country.currency})
            </button>
          ))}
        </div>
      </details>
    </footer>
  );
}
