interface FormNavProps {
  onBack?: () => void;
  onNext: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
  isSubmitting?: boolean;
}

export default function FormNav({
  onBack,
  onNext,
  isFirstStep,
  isLastStep,
  isSubmitting,
}: FormNavProps) {
  return (
    <div className="mt-6 flex items-center gap-3">
      {!isFirstStep && (
        <button
          type="button"
          onClick={onBack}
          disabled={isSubmitting}
          className="rounded-xl border border-border bg-white px-5 py-3 text-sm font-bold text-navy transition hover:border-navy disabled:opacity-50"
        >
          رجوع
        </button>
      )}
      <button
        type="button"
        onClick={onNext}
        disabled={isSubmitting}
        className="flex-1 rounded-xl bg-navy px-5 py-3 text-sm font-bold text-white transition hover:bg-navy-dark disabled:opacity-60"
      >
        {isSubmitting ? "كنسجلو الطلب..." : isLastStep ? "إرسال الطلب" : "التالي"}
      </button>
    </div>
  );
}
