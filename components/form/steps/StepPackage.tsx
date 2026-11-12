import OptionCard from "../OptionCard";
import { PACKAGE_FORM_OPTIONS, SINGLE_ZONE_OPTIONS } from "@/lib/options";
import type { LeadFormData, PackageId } from "@/lib/types";

interface StepPackageProps {
  data: LeadFormData;
  onSelectPackage: (value: PackageId) => void;
  onSelectZone: (value: string) => void;
  error?: string;
}

export default function StepPackage({
  data,
  onSelectPackage,
  onSelectZone,
  error,
}: StepPackageProps) {
  return (
    <div>
      <h2 className="text-base font-bold text-navy sm:text-lg">
        شنو الباقة اللي مهتمة بها؟
      </h2>
      <div
        role="radiogroup"
        aria-label="شنو الباقة اللي مهتمة بها؟"
        className="mt-4 flex flex-col gap-2.5"
      >
        {PACKAGE_FORM_OPTIONS.map((opt) => (
          <OptionCard
            key={opt.id}
            title={opt.title}
            description={opt.description}
            price={opt.price}
            selected={data.package === opt.id}
            onSelect={() => onSelectPackage(opt.id)}
          />
        ))}
      </div>

      {data.package === "single_zone" && (
        <div className="mt-4 rounded-xl border border-border bg-turquoise-light/40 p-3">
          <label className="mb-2 block text-xs font-bold text-navy">
            (اختياري) أي منطقة كتهمك بالضبط؟
          </label>
          <select
            value={data.singleZone}
            onChange={(e) => onSelectZone(e.target.value)}
            className="w-full rounded-lg border border-border bg-white px-3 py-2 text-sm text-foreground"
          >
            <option value="">اختاري منطقة (اختياري)</option>
            {SINGLE_ZONE_OPTIONS.map((zone) => (
              <option key={zone} value={zone}>
                {zone}
              </option>
            ))}
          </select>
        </div>
      )}

      {error && <p className="mt-3 text-xs font-bold text-danger">{error}</p>}
    </div>
  );
}
