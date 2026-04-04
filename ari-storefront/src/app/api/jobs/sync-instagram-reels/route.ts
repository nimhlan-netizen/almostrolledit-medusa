import { NextRequest, NextResponse } from "next/server"

import { syncInstagramReelsToSanity } from "@lib/cms/instagram-sync"

export async function POST(request: NextRequest) {
  const authHeader = request.headers.get("authorization")
  const bearerToken = authHeader?.replace(/^Bearer\s+/i, "")

  if (
    !process.env.INSTAGRAM_SYNC_SECRET ||
    bearerToken !== process.env.INSTAGRAM_SYNC_SECRET
  ) {
    return NextResponse.json({ ok: false }, { status: 401 })
  }

  try {
    const result = await syncInstagramReelsToSanity()
    return NextResponse.json({ ok: true, ...result })
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Instagram sync failed."
    return NextResponse.json({ ok: false, message }, { status: 500 })
  }
}
