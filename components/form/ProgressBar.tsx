interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

export default function ProgressBar({ currentStep, totalSteps }: ProgressBarProps) {
  return (
    <div
      role="progressbar"
      aria-valuenow={currentStep}
      aria-valuemin={1}
      aria-valuemax={totalSteps}
      className="mb-5"
    >
      <div className="flex items-center gap-1.5">
        {Array.from({ length: totalSteps }, (_, i) => i + 1).map((step) => (
          <span
            key={step}
            className={`h-1.5 flex-1 rounded-full transition ${
              step <= currentStep ? "bg-turquoise" : "bg-border"
            }`}
          />
        ))}
      </div>
      <p className="mt-2 text-xs font-medium text-muted">
        الخطوة {currentStep} من {totalSteps}
      </p>
    </div>
  );
}
