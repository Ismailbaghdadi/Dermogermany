import OptionCard from "../OptionCard";
import { PACKAGE_FORM_OPTIONS } from "@/lib/options";
import type { LeadFormData, PackageId } from "@/lib/types";

interface StepPackageProps {
  data: LeadFormData;
  onSelectPackage: (value: PackageId) => void;
  error?: string;
}

export default function StepPackage({
  data,
  onSelectPackage,
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
            sessions={opt.sessions}
            selected={data.package === opt.id}
            onSelect={() => onSelectPackage(opt.id)}
          />
        ))}
      </div>

      {error && <p className="mt-3 text-xs font-bold text-danger">{error}</p>}
    </div>
  );
}
