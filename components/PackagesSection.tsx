import { PACKAGES } from "@/lib/options";

export default function PackagesSection() {
  return (
    <section id="packages" className="mx-auto max-w-5xl px-4 py-6 sm:px-6">
      <h2 className="text-center text-lg font-bold text-navy sm:text-xl">
        الباقات والأثمنة
      </h2>
      <p className="mt-1 text-center text-xs text-muted sm:text-sm">
        بتقنية COCOON MEDICAL PrimeLase
      </p>

      <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {PACKAGES.map((pkg) => (
          <div
            key={pkg.id}
            className="rounded-2xl border border-border bg-card p-4 shadow-sm"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="text-sm font-bold text-navy sm:text-base">
                  {pkg.title}
                </h3>
                {pkg.description && (
                  <p className="mt-1 text-xs leading-relaxed text-muted sm:text-sm">
                    {pkg.description}
                  </p>
                )}
                {pkg.sessions && (
                  <p className="mt-1 text-xs font-bold text-navy/70 sm:text-sm">
                    عدد الجلسات: {pkg.sessions}
                  </p>
                )}
              </div>
              <span
                dir="ltr"
                className="shrink-0 whitespace-nowrap rounded-full bg-turquoise-light px-3 py-1 text-xs font-bold text-turquoise sm:text-sm"
              >
                {pkg.price}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
