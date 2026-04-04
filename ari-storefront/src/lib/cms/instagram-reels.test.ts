import test from "node:test"
import assert from "node:assert/strict"

import { transformInstagramMediaToSanityReel } from "./instagram-reels"

test("transformInstagramMediaToSanityReel maps a Reel into a stable Sanity document", () => {
  const doc = transformInstagramMediaToSanityReel({
    id: "179999999999",
    caption: "Moab climb line test\nSecond line",
    media_product_type: "REELS",
    media_type: "VIDEO",
    media_url: "https://instagram.cdn/video.mp4",
    thumbnail_url: "https://instagram.cdn/thumb.jpg",
    permalink: "https://www.instagram.com/reel/abc123/",
    timestamp: "2026-04-03T19:30:00+0000",
  })

  assert.equal(doc._id, "instagramReel.179999999999")
  assert.equal(doc._type, "instagramReel")
  assert.equal(doc.externalId, "179999999999")
  assert.equal(doc.title, "Moab climb line test")
  assert.equal(doc.caption, "Moab climb line test\nSecond line")
  assert.equal(doc.permalink, "https://www.instagram.com/reel/abc123/")
  assert.equal(doc.mediaUrl, "https://instagram.cdn/video.mp4")
  assert.equal(doc.thumbnailUrl, "https://instagram.cdn/thumb.jpg")
  assert.equal(doc.visible, true)
  assert.equal(doc.featured, false)
})

test("transformInstagramMediaToSanityReel falls back when caption is missing", () => {
  const doc = transformInstagramMediaToSanityReel({
    id: "188888888888",
    media_product_type: "REELS",
    media_type: "VIDEO",
    media_url: "https://instagram.cdn/video.mp4",
    thumbnail_url: "https://instagram.cdn/thumb.jpg",
    permalink: "https://www.instagram.com/reel/no-caption/",
    timestamp: "2026-04-03T19:30:00+0000",
  })

  assert.equal(doc.title, "Instagram Reel")
  assert.equal(doc.caption, "")
})
