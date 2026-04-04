import { revalidateTag } from "next/cache"
import { NextRequest, NextResponse } from "next/server"

import { cmsRevalidateTags } from "@lib/cms/loaders"

export async function POST(request: NextRequest) {
  const authHeader = request.headers.get("authorization")
  const bearerToken = authHeader?.replace(/^Bearer\s+/i, "")

  if (
    !process.env.SANITY_REVALIDATE_SECRET ||
    bearerToken !== process.env.SANITY_REVALIDATE_SECRET
  ) {
    return NextResponse.json({ ok: false }, { status: 401 })
  }

  for (const tag of cmsRevalidateTags) {
    revalidateTag(tag)
  }

  return NextResponse.json({ ok: true, revalidated: cmsRevalidateTags })
}
