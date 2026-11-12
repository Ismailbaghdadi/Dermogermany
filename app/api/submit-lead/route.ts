import { NextRequest, NextResponse } from "next/server";
import { appendLeadRow } from "@/lib/googleSheets";
import { classifyLead } from "@/lib/classifyLead";
import { isValidMoroccanPhone, normalizeMoroccanPhone } from "@/lib/validation";
import {
  PACKAGE_FORM_OPTIONS,
  LOCATIONS,
  TIMINGS,
  INTENTS,
  ABILITIES,
  CONTACT_TIMES,
  findOption,
} from "@/lib/options";
import type { LeadSubmissionPayload } from "@/lib/types";

export const runtime = "nodejs";

const REQUIRED_FIELDS: (keyof LeadSubmissionPayload)[] = [
  "package",
  "location",
  "timing",
  "intent",
  "ability",
  "name",
  "phone",
  "contactTime",
];

function badRequest(error: string) {
  return NextResponse.json({ ok: false, error }, { status: 400 });
}

export async function POST(req: NextRequest) {
  let body: Partial<LeadSubmissionPayload>;
  try {
    body = await req.json();
  } catch {
    return badRequest("الطلب غير صالح. عاودي المحاولة.");
  }

  for (const field of REQUIRED_FIELDS) {
    const value = body[field];
    if (typeof value !== "string" || value.trim() === "") {
      return badRequest("خاص تعمري جميع المعلومات المطلوبة قبل الإرسال.");
    }
  }

  const name = body.name!.trim();
  if (name.length < 2) {
    return badRequest("خاصك تكتبي الاسم ديالك.");
  }

  if (!isValidMoroccanPhone(body.phone!)) {
    return badRequest("رقم الهاتف غير صحيح. دخلي رقم مغربي صحيح، مثلاً 06XXXXXXXX.");
  }

  const data: LeadSubmissionPayload = {
    package: body.package as LeadSubmissionPayload["package"],
    singleZone: (body.singleZone ?? "").toString().trim(),
    location: body.location as LeadSubmissionPayload["location"],
    timing: body.timing as LeadSubmissionPayload["timing"],
    intent: body.intent as LeadSubmissionPayload["intent"],
    ability: body.ability as LeadSubmissionPayload["ability"],
    name,
    phone: normalizeMoroccanPhone(body.phone!),
    contactTime: body.contactTime as LeadSubmissionPayload["contactTime"],
    utmSource: (body.utmSource ?? "").toString().slice(0, 200),
    utmCampaign: (body.utmCampaign ?? "").toString().slice(0, 200),
    utmContent: (body.utmContent ?? "").toString().slice(0, 200),
    pageUrl: (body.pageUrl ?? "").toString().slice(0, 500),
    referrer: (body.referrer ?? "").toString().slice(0, 500),
  };

  const { status, statusLabel, reason } = classifyLead(data);

  const timestamp = new Intl.DateTimeFormat("ar-MA", {
    timeZone: "Africa/Casablanca",
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date());

  const row = [
    timestamp,
    data.name,
    data.phone,
    findOption(PACKAGE_FORM_OPTIONS, data.package)?.title ?? data.package,
    data.package === "single_zone" ? data.singleZone : "",
    findOption(LOCATIONS, data.location)?.title ?? data.location,
    findOption(TIMINGS, data.timing)?.title ?? data.timing,
    findOption(INTENTS, data.intent)?.title ?? data.intent,
    findOption(ABILITIES, data.ability)?.title ?? data.ability,
    findOption(CONTACT_TIMES, data.contactTime)?.title ?? data.contactTime,
    "موافقة ضمنية عند إرسال الاستمارة",
    statusLabel,
    reason,
    data.utmSource,
    data.utmCampaign,
    data.utmContent,
    [data.pageUrl, data.referrer ? `مصدر الزيارة: ${data.referrer}` : ""]
      .filter(Boolean)
      .join(" | "),
  ];

  try {
    await appendLeadRow(row);
  } catch (err) {
    console.error("Failed to append lead to Google Sheets:", err);
    return NextResponse.json(
      {
        ok: false,
        error: "تعذر حفظ الطلب دابا. تأكدي من الاتصال بالإنترنت وعاودي المحاولة من بعد قليل.",
      },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true, status, statusLabel });
}
