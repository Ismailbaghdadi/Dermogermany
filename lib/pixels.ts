declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    ttq?: { track: (event: string, params?: Record<string, unknown>) => void };
  }
}

export function trackMetaEvent(eventName: string): void {
  if (typeof window === "undefined") return;
  if (typeof window.fbq === "function") {
    window.fbq("track", eventName);
  }
}

export function trackMetaCustomEvent(eventName: string): void {
  if (typeof window === "undefined") return;
  if (typeof window.fbq === "function") {
    window.fbq("trackCustom", eventName);
  }
}

export function trackTikTokEvent(eventName: string): void {
  if (typeof window === "undefined") return;
  if (window.ttq && typeof window.ttq.track === "function") {
    window.ttq.track(eventName);
  }
}
