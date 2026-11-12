const STEPS = [
  {
    title: "عمري الاستمارة",
    text: "جاوبي على شوية أسئلة قصار باش نفهمو احتياجك.",
  },
  {
    title: "فريقنا كيتصل بيك",
    text: "غادي يتصل بيك فريق Centre Dermogermany باش يهضر معاك على الباقة والموعد.",
  },
  {
    title: "تأكيد الموعد",
    text: "الموعد كيتأكد غير من بعد ما يتصل بيك الفريق ويتفقو معاك.",
  },
];

export default function HowItWorks() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-6 sm:px-6">
      <h2 className="text-center text-lg font-bold text-navy sm:text-xl">
        شنو كيصرا من بعد ما تبعتي الطلب؟
      </h2>
      <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
        {STEPS.map((step, index) => (
          <div
            key={step.title}
            className="rounded-2xl border border-border bg-card p-4 text-center"
          >
            <span className="mx-auto flex h-8 w-8 items-center justify-center rounded-full bg-navy text-sm font-bold text-white">
              {index + 1}
            </span>
            <h3 className="mt-3 text-sm font-bold text-navy">{step.title}</h3>
            <p className="mt-1 text-xs leading-relaxed text-muted">
              {step.text}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
