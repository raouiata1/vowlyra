import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams.get("url");

  if (!url || !url.startsWith("https://audio.audynia.com/")) {
    return new NextResponse("Invalid URL", { status: 400 });
  }

  const res = await fetch(url);
  if (!res.ok) {
    return new NextResponse("File not found", { status: 404 });
  }

  const filename = url.split("/").pop() ?? "song.mp3";
  const body = await res.arrayBuffer();

  return new NextResponse(body, {
    headers: {
      "Content-Type": "audio/mpeg",
      "Content-Disposition": `attachment; filename="${filename}"`,
    },
  });
}
