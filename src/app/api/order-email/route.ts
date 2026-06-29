import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(req: NextRequest) {
  const order_id = req.nextUrl.searchParams.get("order_id");
  if (!order_id) return NextResponse.json({ email: null });

  const { data } = await supabase
    .from("leads")
    .select("customer_email")
    .eq("order_id", order_id)
    .single();

  return NextResponse.json({ email: data?.customer_email ?? null });
}
