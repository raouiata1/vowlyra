// app/api/capi/route.ts
// Next.js App Router API route — server-side CAPI proxy
// POST /api/capi

import { NextRequest, NextResponse } from "next/server";
import { sendCAPIEvent, buildEvent, hashUserData } from "@/lib/meta-capi";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { eventName, eventId, url, user, customData } = body;

    if (!eventName || !url) {
      return NextResponse.json({ error: "eventName and url are required" }, { status: 400 });
    }

    // Hash PII server-side (never trust client-side hashing alone)
    const hashedUser = hashUserData({
      email: user?.email,
      phone: user?.phone,
      firstName: user?.firstName,
      lastName: user?.lastName,
      city: user?.city,
      state: user?.state,
      zip: user?.zip,
      country: user?.country,
      externalId: user?.externalId,
    });

    // Enrich with server-side signals
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
    const ua = req.headers.get("user-agent");
    const userData = {
      ...hashedUser,
      ...(ip && { client_ip_address: ip }),
      ...(ua && { client_user_agent: ua }),
      ...(user?.fbc && { fbc: user.fbc }),
      ...(user?.fbp && { fbp: user.fbp }),
    };

    const event = buildEvent(eventName, url, userData, customData, eventId);

    const result = await sendCAPIEvent([event]);

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[/api/capi]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
