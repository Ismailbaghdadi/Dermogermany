import { NextRequest, NextResponse } from "next/server";
import { appendLeadRow } from "@/lib/googleSheets";
import { isValidMoroccanPhone, normalizeMoroccanPhone } from "@/lib/validation";
import type { WhatsAppLeadPayload } from "@/lib/types";

export const runtime = "nodejs";

function badRequest(error: string) {
  return NextResponse.json({ ok: false, error }, { status: 400 });
}

export async function POST(req: NextRequest) {
  let body: Partial<WhatsAppLeadPayload>;
  try {
    body = await req.json();
  } catch {
    return badRequest("Requête invalide.");
  }

  const nom = (body.nom ?? "").toString().trim();
  if (nom.length < 2) {
    return badRequest("Nom manquant ou invalide.");
  }

  if (!body.telephone || !isValidMoroccanPhone(body.telephone)) {
    return badRequest("Numéro de téléphone marocain invalide.");
  }

  const row = [
    new Intl.DateTimeFormat("fr-MA", {
      timeZone: "Africa/Casablanca",
      dateStyle: "medium",
      timeStyle: "short",
    }).format(new Date()),
    nom,
    normalizeMoroccanPhone(body.telephone),
    (body.offre ?? "").toString().slice(0, 200),
    (body.creneau ?? "").toString().slice(0, 200),
    (body.source ?? "").toString().slice(0, 200),
    (body.utmSource ?? "").toString().slice(0, 200),
    (body.utmCampaign ?? "").toString().slice(0, 200),
    (body.utmContent ?? "").toString().slice(0, 200),
    [
      (body.pageUrl ?? "").toString().slice(0, 500),
      body.referrer ? `مصدر الزيارة: ${body.referrer.toString().slice(0, 300)}` : "",
    ]
      .filter(Boolean)
      .join(" | "),
  ];

  try {
    await appendLeadRow(row);
  } catch (err) {
    console.error("Failed to append WhatsApp lead to Google Sheets:", err);
    return NextResponse.json({ ok: false, error: "Sheets save failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
