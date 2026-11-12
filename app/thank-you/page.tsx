"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import type { LeadStatus } from "@/lib/types";

const MESSAGES: Record<LeadStatus, { title: string; body: string }> = {
  ready: {
    title: "شكراً، توصلنا بالطلب ديالك",
    body:
      "غادي يتاصل بيك فريق Centre Dermogermany باش يهضر معاك على الموعد. الطلب ديالك مازال ما كيعنيش أن الموعد تأكد.",
  },
  needs_info: {
    title: "شكراً، توصلنا بالطلب ديالك",
    body: "يقدر يتاصل بيك الفريق باش يجاوبك على الأسئلة ديالك.",
  },
  low_interest: {
    title: "شكراً، توصلنا بالمعلومات ديالك",
    body: "فريقنا غادي يراجعها، وإلا كانت الزيارة ممكنة غادي يتاصلوا بيك.",
  },
};

const DEFAULT_MESSAGE = {
  title: "شكراً على زيارتك",
  body: "إلا كنتي عبّيتي الاستمارة، توصلنا بالطلب ديالك وغادي يتاصل بيك فريقنا من بعد المراجعة.",
};

function subscribe() {
  return () => {};
}

function getSnapshot(): LeadStatus | null {
  try {
    const stored = sessionStorage.getItem("dermo_lead_status");
    if (stored === "ready" || stored === "needs_info" || stored === "low_interest") {
      return stored;
    }
  } catch {
    // sessionStorage unavailable; fall back to the generic message
  }
  return null;
}

function getServerSnapshot(): LeadStatus | null {
  return null;
}

export default function ThankYouPage() {
  const status = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const message = status ? MESSAGES[status] : DEFAULT_MESSAGE;

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section className="mx-auto max-w-xl px-4 py-14 text-center sm:px-6">
          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-turquoise-light text-2xl">
            ✓
          </span>
          <h1 className="mt-5 text-xl font-extrabold text-navy sm:text-2xl">
            {message.title}
          </h1>
          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted sm:text-base">
            {message.body}
          </p>
          <Link
            href="/"
            className="mt-8 inline-block rounded-xl border border-border bg-white px-5 py-3 text-sm font-bold text-navy hover:border-navy"
          >
            رجوع للصفحة الرئيسية
          </Link>
        </section>
      </main>
      <Footer />
    </div>
  );
}
