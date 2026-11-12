export type PackageId =
  | "single_zone"
  | "mini"
  | "duo"
  | "trio"
  | "silhouette"
  | "full_body"
  | "unsure";

export type LocationId =
  | "ain_sebaa"
  | "sidi_bernoussi"
  | "hay_mohammadi"
  | "maarif"
  | "ain_chock"
  | "other_casa"
  | "outside_casa";

export type TimingId = "this_week" | "this_month" | "info_only";

export type IntentId = "ready" | "more_info" | "no_contact";

export type AbilityId = "yes" | "no" | "unsure";

export type ContactTimeId = "morning" | "afternoon" | "evening";

export type LeadStatus = "ready" | "needs_info" | "low_interest";

export interface LeadFormData {
  package: PackageId | "";
  singleZone: string;
  location: LocationId | "";
  timing: TimingId | "";
  intent: IntentId | "";
  ability: AbilityId | "";
  name: string;
  phone: string;
  contactTime: ContactTimeId | "";
}

export interface LeadSubmissionPayload extends LeadFormData {
  utmSource: string;
  utmCampaign: string;
  utmContent: string;
  pageUrl: string;
  referrer: string;
}

export const EMPTY_LEAD_FORM: LeadFormData = {
  package: "",
  singleZone: "",
  location: "",
  timing: "",
  intent: "",
  ability: "",
  name: "",
  phone: "",
  contactTime: "",
};
