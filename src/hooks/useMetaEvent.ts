"use client";

import { useCallback } from "react";
import { v4 as uuidv4 } from "uuid";

function getCookie(name: string): string | undefined {
  if (typeof document === "undefined") return undefined;
  return document.cookie
    .split("; ")
    .find((row) => row.startsWith(name + "="))
    ?.split("=")[1];
}

function firePixel(eventName: string, eventId: string, customData?: Record<string, unknown>) {
  if (typeof window === "undefined" || !window.fbq) return;
  window.fbq("track", eventName, customData ?? {}, { eventID: eventId });
}

interface SendEventOptions {
  eventName: string;
  url?: string;
  user?: {
    email?: string;
    phone?: string;
    firstName?: string;
    lastName?: string;
    city?: string;
    state?: string;
    zip?: string;
    country?: string;
    externalId?: string;
  };
  customData?: {
    value?: number;
    currency?: string;
    content_ids?: string[];
    content_type?: "product" | "product_group";
    content_name?: string;
    content_category?: string;
    order_id?: string;
    num_items?: number;
  };
}

export function useMetaEvent() {
  const sendEvent = useCallback(async (options: SendEventOptions) => {
    const { eventName, url = window.location.href, user, customData } = options;
    const eventId = uuidv4();
    firePixel(eventName, eventId, customData as Record<string, unknown>);
    await fetch("/api/capi", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        eventName,
        eventId,
        url,
        user: {
          ...user,
          fbc: getCookie("_fbc"),
          fbp: getCookie("_fbp"),
        },
        customData,
      }),
    });
  }, []);

  return { sendEvent };
}

declare global {
  interface Window {
    fbq: (...args: unknown[]) => void;
  }
}
