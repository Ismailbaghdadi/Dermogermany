import OptionCard from "../OptionCard";
import { CONTACT_TIMES } from "@/lib/options";
import type { ContactTimeId, LeadFormData } from "@/lib/types";

interface StepContactProps {
  data: LeadFormData;
  update: <K extends keyof LeadFormData>(key: K, value: LeadFormData[K]) => void;
  errors: Partial<Record<"name" | "phone" | "contactTime", string>>;
}

export default function StepContact({ data, update, errors }: StepContactProps) {
  return (
    <div>
      <h2 className="text-base font-bold text-navy sm:text-lg">
        المعلومات ديالك باش يتاصلوا بيك
      </h2>

      <div className="mt-4 flex flex-col gap-4">
        <div>
          <label htmlFor="lead-name" className="mb-1.5 block text-sm font-bold text-navy">
            الاسم الشخصي
          </label>
          <input
            id="lead-name"
            type="text"
            autoComplete="name"
            value={data.name}
            onChange={(e) => update("name", e.target.value)}
            placeholder="مثلا: فاطمة الزهراء"
            className="w-full rounded-xl border border-border bg-white px-4 py-3 text-sm text-foreground placeholder:text-muted/70"
          />
          {errors.name && (
            <p className="mt-1.5 text-xs font-bold text-danger">{errors.name}</p>
          )}
        </div>

        <div>
          <label htmlFor="lead-phone" className="mb-1.5 block text-sm font-bold text-navy">
            رقم الهاتف
          </label>
          <input
            id="lead-phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            dir="ltr"
            value={data.phone}
            onChange={(e) => update("phone", e.target.value)}
            placeholder="06XXXXXXXX"
            className="w-full rounded-xl border border-border bg-white px-4 py-3 text-right text-sm text-foreground placeholder:text-muted/70"
          />
          {errors.phone && (
            <p className="mt-1.5 text-xs font-bold text-danger">{errors.phone}</p>
          )}
        </div>

        <div>
          <p className="mb-1.5 text-sm font-bold text-navy">
            الوقت المناسب باش يتاصلوا بيك
          </p>
          <div
            role="radiogroup"
            aria-label="الوقت المناسب باش يتاصلوا بيك"
            className="flex flex-col gap-2.5"
          >
            {CONTACT_TIMES.map((opt) => (
              <OptionCard
                key={opt.id}
                title={opt.title}
                selected={data.contactTime === opt.id}
                onSelect={() => update("contactTime", opt.id as ContactTimeId)}
              />
            ))}
          </div>
          {errors.contactTime && (
            <p className="mt-1.5 text-xs font-bold text-danger">{errors.contactTime}</p>
          )}
        </div>
      </div>
    </div>
  );
}
