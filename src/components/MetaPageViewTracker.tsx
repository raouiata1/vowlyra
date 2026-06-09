// components/MetaPageViewTracker.tsx
// Automatically tracks PageView on every route change in Next.js App Router

"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { useMetaEvent } from "@/hooks/useMetaEvent";

export function MetaPageViewTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { sendEvent } = useMetaEvent();

  useEffect(() => {
    const url = window.location.href;

    sendEvent({
      eventName: "PageView",
      url,
    });
  }, [pathname, searchParams]); // fires on every route change

  return null; // renders nothing
}
