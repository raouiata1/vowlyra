// lib/meta-capi.ts
// Meta Conversions API - Core utility for Next.js on Vercel

import crypto from "crypto";

const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID!;
const ACCESS_TOKEN = process.env.META_CAPI_ACCESS_TOKEN!;
const API_VERSION = "v19.0";
const CAPI_URL = `https://graph.facebook.com/${API_VERSION}/${PIXEL_ID}/events`;

// ─── Types ─────────────────────────────────────────────────────────────────

export interface UserData {
  em?: string;        // email
  ph?: string;        // phone
  fn?: string;        // first name
  ln?: string;        // last name
  ct?: string;        // city
  st?: string;        // state
  zp?: string;        // zip
  cn?: string;        // 2-letter country code (ISO)
  external_id?: string;
  client_ip_address?: string;
  client_user_agent?: string;
  fbc?: string;       // Facebook Click ID (_fbc cookie)
  fbp?: string;       // Facebook Browser ID (_fbp cookie)
}

export interface CustomData {
  value?: number;
  currency?: string;
  content_name?: string;
  content_category?: string;
  content_ids?: string[];
  content_type?: "product" | "product_group";
  order_id?: string;
  num_items?: number;
  search_string?: string;
  status?: string;
}

export interface CAPIEvent {
  event_name: string;
  event_time: number;
  event_source_url: string;
  action_source: "website" | "email" | "app" | "phone_call" | "chat" | "physical_store" | "system_generated" | "other";
  event_id: string;
  user_data: UserData;
  custom_data?: CustomData;
}

// ─── Hashing ───────────────────────────────────────────────────────────────

export function hash(value: string): string {
  return crypto
    .createHash("sha256")
    .update(value.trim().toLowerCase())
    .digest("hex");
}

export function hashUserData(raw: {
  email?: string;
  phone?: string;
  firstName?: string;
  lastName?: string;
  city?: string;
  state?: string;
  zip?: string;
  country?: string;
  externalId?: string;
}): UserData {
  return {
    ...(raw.email && { em: hash(raw.email) }),
    ...(raw.phone && { ph: hash(raw.phone.replace(/\D/g, "")) }),
    ...(raw.firstName && { fn: hash(raw.firstName) }),
    ...(raw.lastName && { ln: hash(raw.lastName) }),
    ...(raw.city && { ct: hash(raw.city) }),
    ...(raw.state && { st: hash(raw.state) }),
    ...(raw.zip && { zp: hash(raw.zip) }),
    ...(raw.country && { cn: hash(raw.country) }),
    ...(raw.externalId && { external_id: hash(raw.externalId) }),
  };
}

// ─── Send Event ────────────────────────────────────────────────────────────

export async function sendCAPIEvent(events: CAPIEvent[]): Promise<{ success: boolean; error?: string }> {
  try {
    const body: Record<string, unknown> = { data: events };
    if (process.env.META_TEST_EVENT_CODE) {
      body.test_event_code = process.env.META_TEST_EVENT_CODE;
    }

    const res = await fetch(CAPI_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
      body: JSON.stringify(body),
    });

    const json = await res.json();

    if (!res.ok) {
      console.error("[CAPI] Error:", json);
      return { success: false, error: JSON.stringify(json) };
    }

    console.log("[CAPI] Success:", json);
    return { success: true };
  } catch (err) {
    console.error("[CAPI] Fetch failed:", err);
    return { success: false, error: String(err) };
  }
}

// ─── Helpers to build standard events ─────────────────────────────────────

export function buildEvent(
  eventName: string,
  sourceUrl: string,
  userData: UserData,
  customData?: CustomData,
  eventId?: string
): CAPIEvent {
  return {
    event_name: eventName,
    event_time: Math.floor(Date.now() / 1000),
    event_source_url: sourceUrl,
    action_source: "website",
    event_id: eventId ?? crypto.randomUUID(),
    user_data: userData,
    ...(customData && { custom_data: customData }),
  };
}
