import type {
  AbilityId,
  ContactTimeId,
  IntentId,
  LocationId,
  PackageId,
  TimingId,
} from "./types";

export interface Option<T extends string> {
  id: T;
  title: string;
  description?: string;
  price?: string;
  sessions?: string;
}

export const PACKAGES: Option<PackageId>[] = [
  {
    id: "single_zone",
    title: "جلسة واحدة – الجسم كامل",
    description: "جلسة واحدة لإزالة الشعر بالليزر للجسم كامل.",
    price: "1 000 درهم",
    sessions: "جلسة واحدة",
  },
  {
    id: "mini",
    title: "باقة ميني",
    description: "3 مناطق صغيرة من اختيارك",
    price: "1 900 درهم",
    sessions: "7 جلسات",
  },
  {
    id: "duo",
    title: "باقة ديو",
    description: "الإبطان + منطقة البيكيني",
    price: "2 500 درهم",
    sessions: "7 جلسات",
  },
  {
    id: "trio",
    title: "باقة تريو",
    description: "الإبطان + منطقة البيكيني + نصف الساقين",
    price: "3 900 درهم",
    sessions: "7 جلسات",
  },
  {
    id: "silhouette",
    title: "باقة سيلويت",
    description: "الإبطان + منطقة البيكيني + الساقان كاملتان",
    price: "4 700 درهم",
    sessions: "7 جلسات",
  },
  {
    id: "full_body",
    title: "باقة الجسم كامل",
    description: "الجسم كامل",
    price: "5 000 درهم",
    sessions: "7 جلسات",
  },
];

export const PACKAGE_FORM_OPTIONS: Option<PackageId>[] = [
  ...PACKAGES,
  { id: "unsure", title: "مازال ما عرفتش، بغيت ناخد نصيحة" },
];

export const LOCATIONS: Option<LocationId>[] = [
  { id: "ain_sebaa", title: "عين السبع" },
  { id: "sidi_bernoussi", title: "سيدي البرنوصي" },
  { id: "hay_mohammadi", title: "الحي المحمدي" },
  { id: "maarif", title: "المعاريف" },
  { id: "ain_chock", title: "عين الشق" },
  { id: "other_casa", title: "حي آخر فالدار البيضاء" },
  { id: "outside_casa", title: "خارج الدار البيضاء" },
];

export const TIMINGS: Option<TimingId>[] = [
  { id: "this_week", title: "هاد السيمانة" },
  { id: "this_month", title: "خلال هاد الشهر" },
  { id: "info_only", title: "بغيت غير نعرف معلومات أكثر دابا" },
];

export const INTENTS: Option<IntentId>[] = [
  { id: "ready", title: "مهتمة وبغيت يتاصلوا بيا باش نطلب موعد" },
  { id: "more_info", title: "بغيت معلومات أكثر قبل ما نقرر" },
  { id: "no_contact", title: "ما بغيتش يتاصلوا بيا دابا" },
];

export const ABILITIES: Option<AbilityId>[] = [
  { id: "yes", title: "إييه" },
  { id: "no", title: "لا" },
  { id: "unsure", title: "خاصني نتأكد" },
];

export const CONTACT_TIMES: Option<ContactTimeId>[] = [
  { id: "morning", title: "الصباح" },
  { id: "afternoon", title: "العشية" },
  { id: "evening", title: "المساء" },
];

export function findOption<T extends string>(
  options: Option<T>[],
  id: string,
): Option<T> | undefined {
  return options.find((o) => o.id === id);
}
