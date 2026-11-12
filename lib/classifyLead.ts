import type { LeadFormData, LeadStatus } from "./types";

export interface LeadClassification {
  status: LeadStatus;
  statusLabel: string;
  reason: string;
}

const STATUS_LABELS: Record<LeadStatus, string> = {
  ready: "مهتمة وجاهزة للاتصال",
  needs_info: "خاصها معلومات أكثر",
  low_interest: "اهتمام ضعيف / خارج المنطقة",
};

export function classifyLead(data: LeadFormData): LeadClassification {
  const refusedContact = data.intent === "no_contact";
  const cannotCome = data.ability === "no";
  const isOutsideCasa = data.location === "outside_casa";

  if (refusedContact || cannotCome || isOutsideCasa) {
    const reasons: string[] = [];
    if (refusedContact) reasons.push("ما بغاتش يتاصلوا بها دابا");
    if (cannotCome) reasons.push("ما تقدرش تجي للسنتر");
    if (isOutsideCasa) reasons.push("ساكنة خارج الدار البيضاء (كتحتاج مراجعة، ماشي دليل على عدم الاهتمام)");
    return {
      status: "low_interest",
      statusLabel: STATUS_LABELS.low_interest,
      reason: reasons.join("، "),
    };
  }

  const hasChosenPackage = data.package !== "" && data.package !== "unsure";
  const readyIntent = data.intent === "ready";
  const readyTiming = data.timing === "this_week" || data.timing === "this_month";
  const readyAbility = data.ability === "yes";

  if (hasChosenPackage && readyIntent && readyTiming && readyAbility) {
    return {
      status: "ready",
      statusLabel: STATUS_LABELS.ready,
      reason:
        "اختارت باقة، باغية التواصل بخصوص الموعد، باغية تبدا فوقت قريب، وأكدت أنها تقدر تجي للسنتر.",
    };
  }

  const reasons: string[] = [];
  if (!hasChosenPackage) reasons.push("مازال ما اختاراتش باقة معينة");
  if (data.intent === "more_info") reasons.push("بغات معلومات أكثر قبل القرار");
  if (data.timing === "info_only") reasons.push("بغات تعرف معلومات أكثر قبل تحديد وقت البداية");
  if (data.ability === "unsure") reasons.push("مازال ما تأكداتش إلا تقدر تجي للسنتر");
  if (reasons.length === 0) {
    reasons.push("الجواب ديالها ما كيوصلش بشكل كامل لمعايير الجاهزية، خاصها معلومات أكثر قبل القرار");
  }

  return {
    status: "needs_info",
    statusLabel: STATUS_LABELS.needs_info,
    reason: reasons.join("، "),
  };
}
