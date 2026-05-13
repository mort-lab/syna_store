"use client";

import { useState } from "react";

export default function SubscribePage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-md">
      <h1 className="text-sm uppercase tracking-widest mb-6">Mailing List</h1>

      {submitted ? (
        <p className="text-xs">Thank you for subscribing.</p>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <p className="text-xs">
            Sign up to be the first to know about new drops and exclusive
            offers.
          </p>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email address"
            required
            className="h-10 px-3 border border-neutral-300 dark:border-neutral-600 bg-transparent text-xs focus:border-neutral-900 dark:focus:border-neutral-100 outline-none"
          />
          <button
            type="submit"
            className="h-12 px-4 border border-neutral-900 dark:border-neutral-100 text-center cursor-pointer uppercase tracking-widest text-sm hover:bg-neutral-900 dark:hover:bg-neutral-700 hover:text-neutral-50 transition-colors self-start"
          >
            Subscribe
          </button>
        </form>
      )}
    </div>
  );
}
