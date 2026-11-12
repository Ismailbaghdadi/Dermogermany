import OptionCard from "./OptionCard";
import type { Option } from "@/lib/options";

interface ChoiceStepProps<T extends string> {
  question: string;
  options: Option<T>[];
  value: T | "";
  onSelect: (value: T) => void;
  error?: string;
}

export default function ChoiceStep<T extends string>({
  question,
  options,
  value,
  onSelect,
  error,
}: ChoiceStepProps<T>) {
  return (
    <div>
      <h2 className="text-base font-bold text-navy sm:text-lg">{question}</h2>
      <div role="radiogroup" aria-label={question} className="mt-4 flex flex-col gap-2.5">
        {options.map((opt) => (
          <OptionCard
            key={opt.id}
            title={opt.title}
            description={opt.description}
            selected={value === opt.id}
            onSelect={() => onSelect(opt.id)}
          />
        ))}
      </div>
      {error && <p className="mt-3 text-xs font-bold text-danger">{error}</p>}
    </div>
  );
}
