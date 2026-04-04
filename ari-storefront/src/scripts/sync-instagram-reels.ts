import { syncInstagramReelsToSanity } from "../lib/cms/instagram-sync"

async function main() {
  const result = await syncInstagramReelsToSanity()
  console.log(JSON.stringify(result, null, 2))
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
