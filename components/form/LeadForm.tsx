"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import ProgressBar from "./ProgressBar";
import FormNav from "./FormNav";
import ChoiceStep from "./ChoiceStep";
import StepPackage from "./steps/StepPackage";
import StepContact from "./steps/StepContact";
import { ABILITIES, INTENTS, LOCATIONS, TIMINGS } from "@/lib/options";
import { isValidMoroccanPhone } from "@/lib/validation";
import { trackMetaCustomEvent, trackMetaEvent, trackTikTokEvent } from "@/lib/pixels";
import { EMPTY_LEAD_FORM, type LeadFormData, type PackageId } from "@/lib/types";

const TOTAL_STEPS = 6;

type ContactErrors = Partial<Record<"name" | "phone" | "contactTime", string>>;

interface TrackingInfo {
  utmSource: string;
  utmCampaign: string;
  utmContent: string;
  pageUrl: string;
  referrer: string;
}

export default function LeadForm() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [data, setData] = useState<LeadFormData>(EMPTY_LEAD_FORM);
  const [stepError, setStepError] = useState<string | undefined>();
  const [contactErrors, setContactErrors] = useState<ContactErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | undefined>();
  const trackingRef = useRef<TrackingInfo>({
    utmSource: "",
    utmCampaign: "",
    utmContent: "",
    pageUrl: "",
    referrer: "",
  });
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      trackingRef.current = {
        utmSource: params.get("utm_source") || "",
        utmCampaign: params.get("utm_campaign") || "",
        utmContent: params.get("utm_content") || params.get("utm_term") || "",
        pageUrl: window.location.href,
        referrer: document.referrer || "",
      };
    } catch {
      // ignore, tracking info is optional
    }
  }, []);

  function update<K extends keyof LeadFormData>(key: K, value: LeadFormData[K]) {
    setData((prev) => ({ ...prev, [key]: value }));
  }

  function validateChoiceStep(): string | undefined {
    if (step === 1) return data.package ? undefined : "خاصك تختاري باقة باش تكملي.";
    if (step === 2) return data.location ? undefined : "خاصك تختاري الحي فين ساكنة.";
    if (step === 3) return data.timing ? undefined : "خاصك تختاري جواب باش تكملي.";
    if (step === 4) return data.intent ? undefined : "خاصك تختاري جواب باش تكملي.";
    if (step === 5) return data.ability ? undefined : "خاصك تختاري جواب باش تكملي.";
    return undefined;
  }

  function validateContactStep(): ContactErrors {
    const errors: ContactErrors = {};
    if (data.name.trim().length < 2) {
      errors.name = "خاصك تكتبي الاسم ديالك.";
    }
    if (!isValidMoroccanPhone(data.phone)) {
      errors.phone = "رقم الهاتف غير صحيح. دخلي رقم مغربي صحيح، مثلاً 06XXXXXXXX.";
    }
    if (!data.contactTime) {
      errors.contactTime = "خاصك تختاري الوقت المناسب للاتصال.";
    }
    return errors;
  }

  function handleBack() {
    setStepError(undefined);
    setSubmitError(undefined);
    setStep((s) => Math.max(1, s - 1));
  }

  async function handleNext() {
    if (step < TOTAL_STEPS) {
      const error = validateChoiceStep();
      if (error) {
        setStepError(error);
        return;
      }
      setStepError(undefined);
      setStep((s) => s + 1);
      return;
    }

    const errors = validateContactStep();
    if (Object.keys(errors).length > 0) {
      setContactErrors(errors);
      return;
    }
    setContactErrors({});
    await submitLead();
  }

  async function submitLead() {
    setSubmitting(true);
    setSubmitError(undefined);
    try {
      const res = await fetch("/api/submit-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, ...trackingRef.current }),
      });
      const json = await res.json();

      if (!res.ok || !json.ok) {
        setSubmitError(
          json.error || "تعذر إرسال الطلب دابا. تأكدي من الاتصال بالإنترنت وعاودي المحاولة.",
        );
        setSubmitting(false);
        return;
      }

      trackMetaEvent("Lead");
      trackTikTokEvent("SubmitForm");
      if (json.status === "ready") {
        trackMetaCustomEvent("QualifiedLead");
        trackTikTokEvent("QualifiedLead");
      }

      try {
        sessionStorage.setItem("dermo_lead_status", json.status);
      } catch {
        // sessionStorage may be unavailable; thank-you page falls back gracefully
      }

      router.push("/thank-you");
    } catch {
      setSubmitError(
        "تعذر إرسال الطلب دابا. تأكدي من الاتصال بالإنترنت وعاودي المحاولة من بعد قليل.",
      );
      setSubmitting(false);
    }
  }

  return (
    <section id="lead-form" className="mx-auto max-w-xl px-4 py-6 sm:px-6">
      <div className="rounded-3xl border border-border bg-card p-5 shadow-sm sm:p-7">
        <ProgressBar currentStep={step} totalSteps={TOTAL_STEPS} />

        {step === 1 && (
          <StepPackage
            data={data}
            onSelectPackage={(value: PackageId) => update("package", value)}
            onSelectZone={(value) => update("singleZone", value)}
            error={stepError}
          />
        )}
        {step === 2 && (
          <ChoiceStep
            question="فين ساكنة؟"
            options={LOCATIONS}
            value={data.location}
            onSelect={(value) => update("location", value)}
            error={stepError}
          />
        )}
        {step === 3 && (
          <ChoiceStep
            question="فوقاش باغية تبداي؟"
            options={TIMINGS}
            value={data.timing}
            onSelect={(value) => update("timing", value)}
            error={stepError}
          />
        )}
        {step === 4 && (
          <ChoiceStep
            question="من بعد ما شفتي ثمن الباقة، شنو بغيتي؟"
            options={INTENTS}
            value={data.intent}
            onSelect={(value) => update("intent", value)}
            error={stepError}
          />
        )}
        {step === 5 && (
          <ChoiceStep
            question="إلا لقينا ليك موعد مناسب، واش تقدري تجي للسنتر فعين السبع؟"
            options={ABILITIES}
            value={data.ability}
            onSelect={(value) => update("ability", value)}
            error={stepError}
          />
        )}
        {step === 6 && <StepContact data={data} update={update} errors={contactErrors} />}

        {submitError && (
          <div className="mt-4 rounded-xl border border-danger/30 bg-danger/5 p-3.5">
            <p className="text-sm font-bold text-danger">{submitError}</p>
            <p className="mt-1 text-xs text-danger/80">
              الجواب ديالك محفوظ، ماشي خاصك تعاودي تعمري الاستمارة.
            </p>
          </div>
        )}

        <FormNav
          onBack={handleBack}
          onNext={handleNext}
          isFirstStep={step === 1}
          isLastStep={step === TOTAL_STEPS}
          isSubmitting={submitting}
        />
      </div>
    </section>
  );
}
