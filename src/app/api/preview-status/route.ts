import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(req: NextRequest) {
  const order_id = req.nextUrl.searchParams.get("order_id");

  if (!order_id) {
    return NextResponse.json({ error: "order_id fehlt" }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("leads")
    .select("preview_url")
    .eq("order_id", order_id)
    .single();

  if (error || !data?.preview_url) {
    return NextResponse.json({ ready: false });
  }

  return NextResponse.json({ ready: true, preview_url: data.preview_url });
}
