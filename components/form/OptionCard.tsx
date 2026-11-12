interface OptionCardProps {
  title: string;
  description?: string;
  price?: string;
  selected: boolean;
  onSelect: () => void;
}

export default function OptionCard({
  title,
  description,
  price,
  selected,
  onSelect,
}: OptionCardProps) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      onClick={onSelect}
      className={`w-full rounded-2xl border p-4 text-right transition ${
        selected
          ? "border-turquoise bg-turquoise-light ring-2 ring-turquoise"
          : "border-border bg-card hover:border-turquoise/60"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <span
            className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 ${
              selected ? "border-turquoise bg-turquoise" : "border-border bg-white"
            }`}
          >
            {selected && (
              <span className="h-2 w-2 rounded-full bg-white" aria-hidden="true" />
            )}
          </span>
          <div>
            <p className="text-sm font-bold text-navy sm:text-base">{title}</p>
            {description && (
              <p className="mt-0.5 text-xs leading-relaxed text-muted sm:text-sm">
                {description}
              </p>
            )}
          </div>
        </div>
        {price && (
          <span
            dir="ltr"
            className="shrink-0 whitespace-nowrap rounded-full bg-navy px-3 py-1 text-xs font-bold text-white sm:text-sm"
          >
            {price}
          </span>
        )}
      </div>
    </button>
  );
}
