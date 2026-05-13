export default function ContactPage() {
  return (
    <div className="max-w-md">
      <h1 className="text-sm uppercase tracking-widest mb-6">Support</h1>

      <div className="text-xs flex flex-col gap-6">
        <div>
          <h2 className="text-xs uppercase tracking-wider mb-2">Contact Us</h2>
          <p>
            For any queries, please email us at{" "}
            <a href="mailto:support@syna.store" className="underline">
              support@syna.store
            </a>
          </p>
        </div>

        <div>
          <h2 className="text-xs uppercase tracking-wider mb-2">Shipping</h2>
          <p>
            All orders are shipped via tracked delivery. UK orders are typically
            delivered within 3-5 working days. International orders may take
            7-14 working days.
          </p>
        </div>

        <div>
          <h2 className="text-xs uppercase tracking-wider mb-2">Returns</h2>
          <p>
            We accept returns within 14 days of delivery. Items must be unworn,
            unwashed, and in their original packaging. Please email us to
            initiate a return.
          </p>
        </div>

        <div>
          <h2 className="text-xs uppercase tracking-wider mb-2">
            Authenticity
          </h2>
          <p>
            This is the ONLY official seller of Syna clothing. Everything else
            is a cheap imitation.
          </p>
        </div>
      </div>
    </div>
  );
}
